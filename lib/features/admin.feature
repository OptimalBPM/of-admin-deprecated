# Created by nicklasborjesson at 30/05/16
Feature: Administrative functions and interface
  The admin web backend is basically just a web facing API frontend, broker restarting and similar features are actually
  tested in the broker library implementation instead. Here, mostly UI-supporting functionality is tested

  Scenario: Generate initialisation file
    Given several plugins have loaded
    And refresh_init has been run
    Then admin_ui_init should be properly structured