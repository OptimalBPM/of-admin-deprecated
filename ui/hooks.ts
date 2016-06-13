

import {SchemaTreeController} from "./controllers/schemaTreeController";
import {schemaTree} from "./directives/schemaTree";
import {NodesController} from "./controllers/nodesController";
import {nodes} from "./directives/nodes";

import {AboutController} from "./controllers/about";
import {AdminController} from "./controllers/admin";
import {MainController} from "./controllers/main";

export function initFramework(app) {
    // Register all controllers
    
    app.controller("SchemaTreeController", ["$scope", "$q", "$timeout", SchemaTreeController])
        .directive("schemaTree", schemaTree)
        .directive("ngRightClick", function ($parse) {
            return function (scope, element, attrs) {
                let fn: any = $parse(attrs.ngRightClick);
                element.bind("contextmenu", function (event) {
                    scope.$apply(function () {
                        event.preventDefault();
                        fn(scope, {$event: event});
                    });
                });
            };
        });


    app.controller("NodesController", ["$scope", "$http", "$q", NodesController])
    app.directive("nodes", nodes)
    

    
    app.controller("AdminController", ["$scope", "$timeout", AdminController]);
    app.controller("MainController", ["$scope", "$http", "$route", MainController]);
    app.controller("AboutController", ["$scope", "$http", AboutController]);

    app.directive("afterRepeat", function () {
        // Do what is specified in "after-repeat" after a repeat is done.
        return function (scope, element, attrs) {
            if (scope.$last) {
                angular.element(element).scope().$eval(attrs.afterRepeat);
            }
        };
    });

    console.log("initFramework for OF Admin was run");

};

export function initRoutes($routeProvider) {
    // Configure all routes

    $routeProvider
        .when("/analysis", {
            templateUrl: "views/analysis.html",

        })
        .when("/admin", {
            templateUrl: "views/admin.html",
            // This is the mbe-nodes external directive, it needs an associated controller
            controller: "AdminController"
        })
        .when("/about", {
            templateUrl: "views/about.html",
            controller: "AboutController"
        })
        .otherwise({
            redirectTo: "/about"
        });
    console.log("initRoutes for OF Admin was run");
}