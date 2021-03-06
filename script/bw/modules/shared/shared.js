///<reference path='../../../../d.ts/angular.d' />
///<reference path='../../infrastructure/listHelperService' />
///<reference path='./directives/navtab/navtabs' />
///<reference path='./directives/navtab/tab' />
///<reference path='./directives/checkList' />
///<reference path='./directives/buildDetails' />
///<reference path='./directives/blocker' />
///<reference path='./filters/itemName' />
///<reference path='./filters/orderName' />
///<reference path='../../infrastructure/storageService' />
///<reference path='../../infrastructure/buildStatusConverter' />
(function (ang) {
    var mainModule = ang.module('shared', ['LocalStorageModule']);

    mainModule.directive('navtabs', function () {
        return new BW.Modules.Shared.Directives.NavTab.NavTabs().execute();
    });

    mainModule.directive('tab', function () {
        return new BW.Modules.Shared.Directives.NavTab.Tab().execute();
    });

    mainModule.directive('checkList', function () {
        return new BW.Modules.Shared.Directives.CheckList().execute();
    });

    mainModule.directive('buildDetails', function () {
        return new BW.Modules.Shared.Directives.BuildDetails().execute();
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

    mainModule.factory('listHelperService', function () {
        return new BW.Infrastructure.ListHelperService();
    });

    mainModule.factory('storageHelperService', [
        'localStorageService',
        function (_) {
            return new BW.Infrastructure.StorageHelperService(_);
        }]);

    mainModule.factory('buildStatusConverter', function () {
        return new BW.Infrastructure.BuildStatusConverter();
    });
})(angular);
//# sourceMappingURL=shared.js.map
