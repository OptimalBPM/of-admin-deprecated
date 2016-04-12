# The Optimal Framework Administrative interface plugin

The admin interface is an Angular/SystemJS/JSPM-based web application.
Its most important function is to expose the tree that keeps all settings and entities that matter to the configuration of the framework.

It is thought of as being the starting point of an administrative interface to any system that is build upon the framework.
Hence, it is build to be easily extended.

## Extending

When building any system, it is highly likely that it needs an an administrative interface.

The main administrative interface is extended in the following ways:
* By [adding definitions in the schema folder](https://github.com/OptimalBPM/optimalbpm/tree/master/schemas) and by [adding nodes into the administrative tree](https://github.com/OptimalBPM/optimalbpm/tree/master/testing). 
* By definining what [menu items, angular directives/controller/routes to add in the definitions.json](https://github.com/OptimalBPM/optimalbpm/blob/master/definitions.json) and [publishing then in the admin-ui folder](https://github.com/OptimalBPM/optimalbpm/tree/master/admin-ui) of the plugin.

