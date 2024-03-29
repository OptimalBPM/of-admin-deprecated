System.config({
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "/admin": {
      "defaultExtension": "ts"
    },
    "/admin/jspm_packages": {
      "defaultExtension": "js"
    },
     "/": {
      "defaultExtension": "ts"
    }
  },

  map: {
    "OptimalBPM/angular-schema-form-complex-ui": "github:OptimalBPM/angular-schema-form-complex-ui@master",
    "ace": "github:ajaxorg/ace-builds@1.2.3",
    "ajaxorg/ace-builds": "github:ajaxorg/ace-builds@1.2.3",
    "angular": "github:angular/bower-angular@1.5.6",
    "angular-animate": "github:angular/bower-angular-animate@1.5.6",
    "angular-cookies": "github:angular/bower-angular-cookies@1.5.6",
    "angular-route": "github:angular/bower-angular-route@1.5.6",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.5.6",
    "angular-schema-form": "npm:angular-schema-form@0.8.13",
    "angular-schema-form-bootstrap": "npm:angular-schema-form-bootstrap@0.2.0",
    "angular-schema-form-dynamic-select": "npm:angular-schema-form-dynamic-select@0.13.1",
    "angular-strap": "github:mgcrea/angular-strap@2.3.9",
    "angular-touch": "github:angular/bower-angular-touch@1.5.6",
    "angular-ui-select": "github:angular-ui/ui-select@0.12.1",
    "angular-ui-tree": "github:angular-ui-tree/angular-ui-tree@2.15.0",
    "angular-ui/ui-ace": "github:angular-ui/ui-ace@0.2.3",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "bootstrap3-dialog": "github:nakupanda/bootstrap3-dialog@1.35.1",
    "css": "github:systemjs/plugin-css@0.1.23",
    "fatlinesofcode/ngDraggable": "github:fatlinesofcode/ngDraggable@0.1.8",
    "font-awesome": "npm:font-awesome@4.6.3",
    "jquery": "npm:jquery@2.2.4",
    "networknt/angular-schema-form-ui-ace": "github:networknt/angular-schema-form-ui-ace@0.1.2",
    "typescript": "npm:typescript@1.8.10",
    "github:angular/bower-angular-animate@1.5.6": {
      "angular": "github:angular/bower-angular@1.5.6"
    },
    "github:angular/bower-angular-cookies@1.5.6": {
      "angular": "github:angular/bower-angular@1.5.6"
    },
    "github:angular/bower-angular-route@1.5.6": {
      "angular": "github:angular/bower-angular@1.5.6"
    },
    "github:angular/bower-angular-sanitize@1.5.6": {
      "angular": "github:angular/bower-angular@1.5.6"
    },
    "github:angular/bower-angular-touch@1.5.6": {
      "angular": "github:angular/bower-angular@1.5.6"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.4"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:mgcrea/angular-strap@2.3.9": {
      "angular": "github:angular/bower-angular@1.5.6"
    },
    "github:nakupanda/bootstrap3-dialog@1.35.1": {
      "bootstrap": "github:twbs/bootstrap@3.3.6"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "npm:jquery@2.2.4"
    },
    "npm:angular-schema-form-bootstrap@0.2.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:angular-schema-form-dynamic-select@0.13.1": {
      "angular-schema-form": "npm:angular-schema-form@0.8.13",
      "angular-strap": "npm:angular-strap@2.3.9",
      "bootstrap": "npm:bootstrap@3.3.6",
      "ui-select": "npm:ui-select@0.14.10"
    },
    "npm:angular-schema-form@0.8.13": {
      "angular": "npm:angular@1.5.6",
      "angular-sanitize": "npm:angular-sanitize@1.5.6",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "objectpath": "npm:objectpath@1.2.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "tv4": "npm:tv4@1.0.18"
    },
    "npm:angular-strap@2.3.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:bootstrap@3.3.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:font-awesome@4.6.3": {
      "css": "github:systemjs/plugin-css@0.1.23"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:typescript@1.8.10": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:ui-select@0.14.10": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
