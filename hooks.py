from .lib.admin import CherryPyAdmin


def init_web(_broker_scope):
    # Initialize admin user interface /admin
    _broker_scope["web_root"].admin = CherryPyAdmin(_process_id=_broker_scope["web_root"].process_id,
                                                    _address=_broker_scope["address"],
                                                    _stop_broker=_broker_scope["stop_broker"],
                                                    _root_object=_broker_scope["web_root"],
                                                    _web_config=_broker_scope["web_config"],
                                                    _plugins=_broker_scope["plugins"].plugins)

    # Call our own hooks
    _broker_scope["plugins"].call_hook("after_admin_ui", _broker_scope = _broker_scope,
                                       _admin_object = _broker_scope["web_root"].admin)
