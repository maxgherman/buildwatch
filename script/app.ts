
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


(function(ang) {

    var mainModule = ang.module('main', []);

    mainModule.controller('MainCtrl',
        ['buildServiceWrapper', _ => new BW.Modules.Main.Controllers.MainController(_) ]);

    mainModule.factory('buildService',  () => new BW.Infrastructure.BuildService());

    mainModule.provider('buildServiceWrapper', () =>  new BW.Modules.Shared.Services.BuildService().execute());

    mainModule.factory('uiGrid',  () => new BW.Infrastructure.Grid.UIGrid());

    mainModule.factory('gridRenderService',  () => new BW.Infrastructure.Grid.GridRenderService());

    mainModule.filter('buildName', () => new BW.Modules.Shared.Filters.BuildNameFilter().execute);

    mainModule.filter('orderByName', () => new BW.Modules.Shared.Filters.OrderByNameFilter().execute);

    mainModule.directive('settings', () => new BW.Modules.Main.Directives.Settings().execute());

    mainModule.directive('screenGrid',
        ['uiGrid', 'gridRenderService', (p1, p2) => new BW.Modules.Main.Directives.ScreenGrid().execute(p1, p2)]);

})(angular);

