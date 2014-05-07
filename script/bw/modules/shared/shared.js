///<reference path='../../../../d.ts/angular.d' />
///<reference path='../../infrastructure/grid/gridRenderService' />
///<reference path='../../infrastructure/listHelperService' />
///<reference path='./directives/navtab/navtabs' />
///<reference path='./directives/navtab/tab' />
///<reference path='./directives/checkList' />
///<reference path='./directives/blocker' />
///<reference path='./filters/itemName' />
///<reference path='./filters/orderName' />
(function (ang) {
    var mainModule = ang.module('shared', []);

    mainModule.directive('navtabs', function () {
        return new BW.Modules.Shared.Directives.NavTab.NavTabs().execute();
    });

    mainModule.directive('tab', function () {
        return new BW.Modules.Shared.Directives.NavTab.Tab().execute();
    });

    mainModule.directive('checkList', function () {
        return new BW.Modules.Shared.Directives.CheckList().execute();
    });

    mainModule.directive('blocker', function () {
        return new BW.Modules.Shared.Directives.Blocker().execute();
    });

    mainModule.filter('itemName', function () {
        return new BW.Modules.Shared.Filters.ItemName().execute;
    });

    mainModule.filter('orderByName', function () {
        return new BW.Modules.Shared.Filters.OrderByNameFilter().execute;
    });

    mainModule.factory('gridRenderService', function () {
        return BW.Infrastructure.Grid.GridRenderService;
    });

    mainModule.factory('listHelperService', function () {
        return new BW.Infrastructure.ListHelperService();
    });
})(angular);
//# sourceMappingURL=shared.js.map
