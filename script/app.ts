
/// <reference path='../d.ts/angular.d' />
/// <reference path='bw/modules/main/controllers/main' />
/// <reference path='bw/infrastructure/buildService' />
/// <reference path='bw/infrastructure/listHelperService' />
/// <reference path='bw/modules/shared/services/buildService' />
/// <reference path='bw/modules/shared/filters/itemName' />
/// <reference path='bw/modules/shared/filters/orderName' />

/// <reference path='bw/modules/shared/directives/settings' />
/// <reference path='bw/modules/shared/directives/navtab/navtabs' />
/// <reference path='bw/modules/shared/directives/navtab/tab' />

/// <reference path='bw/modules/shared/directives/checkList' />
/// <reference path='bw/infrastructure/grid/uiGrid' />
/// <reference path='bw/infrastructure/grid/gridRenderService' />
/// <reference path='bw/modules/shared/directives/screenGrid' />


(function(ang) {

    var mainModule = ang.module('main', []);

    mainModule.controller('MainCtrl',
        ['buildServiceWrapper','listHelperService', (x, y) => new BW.Modules.Main.Controllers.MainController(x, y) ]);

    mainModule.factory('listHelperService', () => new BW.Infrastructure.ListHelperService());

    mainModule.factory('buildService', () => new BW.Infrastructure.BuildService());

    mainModule.provider('buildServiceWrapper', () =>  new BW.Modules.Shared.Services.BuildService().execute());

    mainModule.factory('uiGrid',  () => BW.Infrastructure.Grid.UIGrid);

    mainModule.factory('gridRenderService',  () => BW.Infrastructure.Grid.GridRenderService);

    mainModule.filter('itemName', () => new BW.Modules.Shared.Filters.ItemName().execute);

    mainModule.filter('orderByName', () => new BW.Modules.Shared.Filters.OrderByNameFilter().execute);

    mainModule.directive('settings', () => new BW.Modules.Main.Directives.Settings().execute());

    mainModule.directive('navtabs', () => new BW.Modules.Shared.Directives.NavTab.NavTabs().execute());

    mainModule.directive('tab', () => new BW.Modules.Shared.Directives.NavTab.Tab().execute());

    mainModule.directive('checkList', () => new BW.Modules.Shared.Directives.CheckList().execute());

    mainModule.directive('screenGrid',
        ['uiGrid', 'gridRenderService', (UIGrid, GridRenderService) => {
            return new BW.Modules.Main.Directives.ScreenGrid(new UIGrid(), new GridRenderService())
                .execute();
        }] );

})(angular);

