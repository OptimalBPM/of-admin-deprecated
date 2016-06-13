///<reference path="../typings/angularjs/angular.d.ts" />


import IAugmentedJQueryStatic = angular.IAugmentedJQueryStatic;
/**
 * @ngdoc overview
 * @name mainApp
 * @description
 * # Optimal Framework
 *
 * Main module of the application.
 */
// sourceMappingUrl=init.js.map


console.log("Before app defines");
import "jquery";


import "bootstrap";
import "bootstrap/css/bootstrap.css!";

import "angular";
import "angular-route";
import "angular-cookies";
import "angular-touch";
import "angular-sanitize";
import "angular-animate";
import "angular-schema-form";
import "angular-schema-form-bootstrap";
import "font-awesome";

import "bootstrap3-dialog";

import {initNodes} from "./nodes";

// These files are generated dynamically in runtime, ignore error
// noinspection TypeScriptCheckImport
import {hook_initFramework, hook_initRoutes} from "../hook_wrapper";


import {CustomRootScope} from "../types/schemaTreeTypes";
import IAugmentedJQuery = angular.IAugmentedJQuery;


// BootstrapDialog ambient declaration as there is no type definition
declare var BootstrapDialog: any;

function initApp() {


    // First initialize the app
    //initNodes();
    let app: any = angular
        .module("mainApp",
            [
                "ngAnimate",
                "ngRoute",
                "ngSanitize",
                "ngTouch",
                "ngCookies",
                "ngAnimate",
                "mgcrea.ngStrap",
                "ui.tree",
                "ui.ace",
                "schemaForm"
            ]);
    // Call the init framework hook
    hook_initFramework(app);

    app.config(($routeProvider) => {
        // Initialize all routes
        hook_initRoutes($routeProvider);
    });

    // Find the html angular element.
    let $html: IAugmentedJQuery = angular.element(document.getElementsByTagName("html")[0]);

    angular.element().ready(() => {
        // bootstrap the app manually
        console.log("Bootstrap the application.");

        angular.bootstrap($html, ["mainApp"]);

        let $scope: CustomRootScope = angular.element($html).scope() as CustomRootScope;

        $scope.BootstrapDialog = (window as any).BootstrapDialog;

    });

}

// Initialize
initApp();