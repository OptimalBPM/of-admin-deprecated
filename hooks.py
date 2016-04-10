from .lib.admin import CherryPyAdmin
import of.common.messaging.websocket


def init_web(_broker_scope):
    # Initialize admin user interface /admin
    _broker_scope["web_root"].admin = CherryPyAdmin(_database_access=_broker_scope["database_access"],
                                                    _process_id=_broker_scope["web_root"].process_id,
                                                    _address=_broker_scope["address"],
                                                    _stop_broker=_broker_scope["stop_broker"],
                                                    _monitor=of.common.messaging.websocket.monitor,
                                                    _root_object=_broker_scope["web_root"],
                                                    _web_config=_broker_scope["web_config"],
                                                    _plugins=_broker_scope["plugins"].plugins)

    # Call our own hooks
    _broker_scope["plugins"].call_hook("init_admin_ui",
                                    _root_object=_broker_scope["web_root"].admin,
                                    _namespaces=_broker_scope["namespaces"])
