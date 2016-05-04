# The administrative interface plugin

The admin interface is an Angular/SystemJS/JSPM-based web application.
Its most important function is to expose the tree that keeps all settings and entities that matter to the configuration of the framework.

It is thought of as being the starting point of an administrative interface to any system that is build upon the framework.
Hence, it is build to be easily extended.


## Installing

Just clone this repository into the plugins-folder.
```sh
git clone https://github.com/OptimalBPM/of-admin.git admin
```

### Requirements:

Note, as the installation uses npm and jspm, there is a certain memory requirement.
For example, box needs about 800 megabytes of *free* memory to run npm and jspm properly, having less may result in strange and unnoticable errors.

## Extending

When building any system, it is highly likely that it needs an an administrative interface.

The main administrative interface is extended by another plugin by:
* adding any definitions in the [schema folder](https://github.com/OptimalBPM/optimalbpm/tree/master/schemas) 
* [adding any nodes](https://github.com/OptimalBPM/optimalbpm/tree/master/testing) into the administrative tree 
* definining what menu items, angular directives/controller/routes to add in the [definitions.json](https://github.com/OptimalBPM/optimalbpm/blob/master/definitions.json) 
* publishing their source in the [admin-ui folder](https://github.com/OptimalBPM/optimalbpm/tree/master/admin-ui) of the plugin

