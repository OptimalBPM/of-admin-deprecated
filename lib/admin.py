"""
The admin module holds the CherryPy implementation of the admin interface.
Note that most of its initialisation happens in the broker init script, ../broker.py
"""
import copy
import os
import threading

import cherrypy
import json

from of.broker.cherrypy_api.node import aop_check_session,CherryPyNode

from of.schemas.constants import id_right_admin_everything
from of.common.security.groups import aop_has_right
from of.common.logging import write_to_log, EC_SERVICE, SEV_DEBUG, EC_NOTIFICATION, SEV_ERROR


class CherryPyAdmin(object):
    """
    The CherryPyAdmin class is a plugin for CherryPy that shows the admin UI for the Optimal Framework
    """

    #: Plugin management
    plugins = None

    #: A reference to the stop broker function in the main thread
    stop_broker = None

    #: A reference to root object (broker)
    root = None

    #: Node management web service(MBE)
    node = None

    #: A init string for the client
    admin_ui_init = None

    #: A init string for SystemJS
    admin_systemjs_init = None

    #: A list of the available menus
    admin_menus = None

    def __init__(self, _database_access, _process_id, _address, _stop_broker, _monitor, _root_object,
                 _plugins, _web_config):
        write_to_log(_category=EC_SERVICE, _severity=SEV_DEBUG, _process_id=_process_id,
                     _data="Initializing administrative REST API.")

        self.stop_broker = _stop_broker
        self.monitor = _monitor

        self.process_id = _process_id
        self.address = _address
        self.database_access = _database_access
        self.node = CherryPyNode(_database_access=_database_access)
        self.root = _root_object
        self.plugins = _plugins

        # Mount the static content at a mount point /admin
        _web_config.update({
            "/admin" : {
                "tools.staticdir.on": True,
                "tools.staticdir.dir": os.path.join(os.path.dirname(__file__), "../ui"),
                "tools.trailing_slash.on": True
            }
        })


        self.refresh_static(_web_config=_web_config)

    def broker_ctrl(self, _command, _reason, _user):
        """
        Controls the broker's running state

        :param _command: Can be "stop" or "restart".
        :param _user: A user instance
        """
        write_to_log("broker.broker_control: Got the command " + str(_command), _category=EC_SERVICE,
                     _process_id=self.process_id)

        # TODO: There should be a log item written with reason and userid.(PROD-32)
        # TODO: UserId should also be appended to reason below.(PROD-32)

        def _command_local(_local_command):

            if _local_command == "restart":
                self.stop_broker(_reason=_reason, _restart=True)
            if _local_command == "stop":
                self.stop_broker(_reason=_reason, _restart=False)

        _restart_thread = threading.Thread(target=_command_local, args=[_command])
        _restart_thread.start()

        return {}

    @cherrypy.expose
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out(content_type='application/json')
    @aop_check_session
    def broker_control(self, **kwargs):
        return self.broker_ctrl(cherrypy.request.json["command"],
                                cherrypy.request.json["reason"],
                                kwargs["_user"])

    @cherrypy.expose
    @cherrypy.tools.json_out(content_type='application/json')
    @aop_check_session
    @aop_has_right([id_right_admin_everything])
    def get_peers(self, **kwargs):
        """
        Returns a list of all logged in peers
        :param kwargs: Unused here so far, but injected by get session
        :return: A list of all logged in peers
        """

        _result = []
        # Filter out the unserializable web socket
        for _session in self.root.peers.values():
            _new_session = copy.copy(_session)
            _new_session["web_socket"] = "removed for serialization"
            _new_session["queue"] = "removed for serialization"
            _result.append(_new_session)

        write_to_log(_process_id=self.process_id, _category=EC_NOTIFICATION, _severity=SEV_DEBUG,
             _data="Returning a list of peers:" + str(_result))
        return _result


    def refresh_static(self, _web_config):
        """
        This function regenerates all the static content that is used to initialize the user interface
        plugins.
        :param _web_config: An instance of the CherryPy web configuration
        """

        _empty_routes = "export function initRoutes($routeProvider) { console.log('admin_ui_init.ts: No plugins installed, so no routes to add.'); return $routeProvider; }"

        if len(self.plugins.keys()) == 1:
            # If there are no plugins add dummy functions that log the status
            # *this* plugin has to be loaded if this is happening so we can safely assume that no plugins extend the interface if count i 1.
            self.admin_ui_init = _empty_routes
            self.admin_ui_init+= "export function initPlugins(app) { console.log('admin_ui_init.ts: No plugins installed, so nothing to initialize.'); }"
            self.admin_systemjs_init = "console.log('admin_jspm_config.js: No plugins installed, so no packages to add overrides for.');"
            self.admin_menus = "{}"
            return

        def make_deps(_controller):
            _result = "[" + str(",").join(['"' + _curr_dep + '"' for _curr_dep in _controller["dependencies"]])
            return _result + ", " + _curr_controller["name"] + "]"

        _imports = ""
        _controllers = ""
        _directives = ""
        _routes = ""
        _systemjs = ""
        _admin_menus = []
        # has_right(id_right_admin_everything, kwargs["user"])
        for _curr_plugin_key, _curr_plugin_info in self.plugins.items():
            # Add any plugin configuration for the Admin user interface
            if "admin-ui" in _curr_plugin_info:

                _curr_ui_def = _curr_plugin_info["admin-ui"]
                if "mountpoint" not in _curr_ui_def:
                    write_to_log("Error loading admin-ui for " + _curr_plugin_key + " no mount point.",
                                 _category=EC_SERVICE, _severity=SEV_ERROR)
                    continue
                _mount_point = _curr_ui_def["mountpoint"]

                if _mount_point[0] == "/":
                    write_to_log(
                        "Not mounting " + _mount_point + ", cannot mount admin-specific ui under root(root can "
                                                         "never depend on admin), use root-ui instead.",
                        _category=EC_SERVICE, _severity=SEV_ERROR)
                    continue
                # Mount the static content at a mount point somewhere under /admin
                _web_config.update({
                    "/admin/" + _mount_point: {
                        "tools.staticdir.on": True,
                        "tools.staticdir.dir": os.path.join(_curr_plugin_info["baseDirectoryName"], "admin-ui"),
                        "tools.trailing_slash.on": True
                    }
                })

                _systemjs += "System.config({\"packages\": {\"" + _mount_point + "\": {\"defaultExtension\": \"ts\"}}});\n"

                # Create imports and declarations for controllers and their dependencies
                if "controllers" in _curr_ui_def:
                    for _curr_controller in _curr_ui_def["controllers"]:
                        _imports += "import {" + _curr_controller["name"] + "} from \"" + _curr_controller[
                            "module"] + "\"\n"
                        _controllers += '    app.controller("' + _curr_controller["name"] + '", ' + make_deps(
                            _curr_controller) + ");\n"

                # Create imports and declarations for directives
                if "directives" in _curr_ui_def:
                    for _curr_directive in _curr_ui_def["directives"]:
                        _imports += "import {" + _curr_directive["name"] + "} from \"" + _curr_directive[
                            "module"] + "\"\n"
                        _directives += '    app.directive("' + _curr_directive["name"] + '", ' + _curr_directive[
                            "name"] + ");\n"

                # Add any angular routes
                if "routes" in _curr_ui_def:
                    for _curr_route in _curr_ui_def["routes"]:
                        _routes += "    .when(\"" + _curr_route["path"] + "\", " + json.dumps(
                            _curr_route["route"]) + ")\n"

                # Add menus
                if "menus" in _curr_ui_def:
                    _admin_menus += _curr_ui_def["menus"]

        if _routes == "":
            _routes = _empty_routes

        _result = _imports + "\nexport function initPlugins(app){\n" + _controllers + "\n" + _directives + "\n};\n" + \
                  "export function initRoutes($routeProvider) {\n$routeProvider" + _routes + "return $routeProvider }"

        self.admin_ui_init = _result
        self.admin_systemjs_init = _systemjs
        self.admin_menus = _admin_menus

    @cherrypy.expose(alias="admin_init.ts")
    @aop_check_session
    def initialize_admin_plugins(self, **kwargs):
        return self.admin_ui_init

    @cherrypy.expose(alias="admin_menus.json")
    @cherrypy.tools.json_out(content_type='application/json')
    @aop_check_session
    def initialize_admin_menu(self, **kwargs):
        # TODO: Mirror rights here?
        return self.admin_menus

    @cherrypy.expose(alias="admin_jspm_config.js")
    def initialize_admin_systemjs(self, **kwargs):
        return self.admin_systemjs_init
