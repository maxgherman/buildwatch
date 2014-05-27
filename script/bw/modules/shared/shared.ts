
///<reference path='../../../../d.ts/angular.d' />
///<reference path='../../infrastructure/grid/gridRenderService' />
///<reference path='../../infrastructure/listHelperService' />
///<reference path='../../infrastructure/dateService' />
///<reference path='./directives/navtab/navtabs' />
///<reference path='./directives/navtab/tab' />
///<reference path='./directives/checkList' />
///<reference path='./directives/buildDetails' />
///<reference path='./directives/blocker' />
///<reference path='./filters/itemName' />
///<reference path='./filters/orderName' />
///<reference path='../../infrastructure/storageService' />

(function(ang) {

    var mainModule = ang.module('shared', ['LocalStorageModule']);

    mainModule.directive('navtabs', () => new BW.Modules.Shared.Directives.NavTab.NavTabs().execute());

    mainModule.directive('tab', () => new BW.Modules.Shared.Directives.NavTab.Tab().execute());

    mainModule.directive('checkList', () => new BW.Modules.Shared.Directives.CheckList().execute());

    mainModule.directive('buildDetails', () => new BW.Modules.Shared.Directives.BuildDetails().execute());

    mainModule.directive('blocker', () => new BW.Modules.Shared.Directives.Blocker().execute());

    mainModule.filter('itemName', () => new BW.Modules.Shared.Filters.ItemName().execute);

    mainModule.filter('orderByName', () => new BW.Modules.Shared.Filters.OrderByNameFilter().execute);

    mainModule.factory('gridRenderService',  () => BW.Infrastructure.Grid.GridRenderService);

    mainModule.factory('listHelperService', () => new BW.Infrastructure.ListHelperService());

    mainModule.factory('storageHelperService', ['localStorageService',
        _ => new BW.Infrastructure.StorageHelperService(_)]);


})(angular);
