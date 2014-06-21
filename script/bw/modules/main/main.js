/// <reference path='../../../../d.ts/angular.d' />
/// <reference path='./controllers/main' />
/// <reference path='./directives/gridFlow' />
'use strict';
(function (ang) {
    var mainModule = ang.module('main', ['builds']);

    mainModule.controller('MainCtrl', [
        'buildServiceWrapper', 'buildListHelperService', 'storageHelperService',
        function (x, y, z) {
            return new BW.Modules.Main.Controllers.MainController(x, y, z);
        }]);

    mainModule.directive('gridFlow', function () {
        return new BW.Modules.Main.Directives.GridFlow().execute();
    });
})(angular);
//# sourceMappingURL=main.js.map
