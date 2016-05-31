"""
    Initialization for OF broker tests.
"""
import os
from admin.lib.admin import CherryPyAdmin

__author__ = 'Nicklas Borjesson'




id_right_admin_nodes = "000000010000010001e64d01"

script_dir = os.path.dirname(__file__)

def before_all(context):
    _plugins =

    context.admin = CherryPyAdmin(_address="test", _plugins=)

def init_broker_cycles(context, feature):
    print("\nRunning Broker startup and shutdown scenarios\n=========================================================\n")


def before_feature(context, feature):
    """
    Initialisation for all features.

    :param context:
    :param feature:
    :return:

    """

    if feature.name in ["Broker startup and shutdown scenarios"]:
        init_broker_cycles(context, feature)

def after_feature(context, feature):
    pass
