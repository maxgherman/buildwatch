/// <reference path='../d.ts/angular.d' />
/// <reference path='bw/modules/main/controllers/main' />
/// <reference path='bw/infrastructure/buildService' />
/// <reference path='bw/modules/shared/services/buildService' />
/// <reference path='bw/modules/shared/filters/buildName' />
/// <reference path='bw/modules/shared/filters/orderBuildName' />
/// <reference path='bw/modules/shared/directives/settings' />
/// <reference path='bw/infrastructure/grid/uiGrid' />
/// <reference path='bw/infrastructure/grid/gridRenderService' />
/// <reference path='bw/modules/shared/directives/screenGrid' />
(function (ang) {
    var mainModule = ang.module('main', []);

    mainModule.controller('MainCtrl', ['buildServiceWrapper', function (_) {
            return new BW.Modules.Main.Controllers.MainController(_);
        }]);

    mainModule.factory('buildService', function () {
        return new BW.Infrastructure.BuildService();
    });

    mainModule.provider('buildServiceWrapper', function () {
        return new BW.Modules.Shared.Services.BuildService().execute();
    });

    mainModule.factory('uiGrid', function () {
        return new BW.Infrastructure.Grid.UIGrid();
    });

    mainModule.factory('gridRenderService', function () {
        return new BW.Infrastructure.Grid.GridRenderService();
    });

    mainModule.filter('buildName', function () {
        return new BW.Modules.Shared.Filters.BuildNameFilter().execute;
    });

    mainModule.filter('orderByName', function () {
        return new BW.Modules.Shared.Filters.OrderByNameFilter().execute;
    });

    mainModule.directive('settings', function () {
        return new BW.Modules.Main.Directives.Settings().execute();
    });

    mainModule.directive('screenGrid', ['uiGrid', 'gridRenderService', function (p1, p2) {
            return new BW.Modules.Main.Directives.ScreenGrid().execute(p1, p2);
        }]);
})(angular);
//# sourceMappingURL=app.js.map
