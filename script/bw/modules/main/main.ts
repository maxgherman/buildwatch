
/// <reference path='../../../../d.ts/angular.d' />
/// <reference path='./controllers/main' />
/// <reference path='./directives/grid/uiGrid' />
/// <reference path='./directives/grid/screenGrid' />

'use strict';

(function(ang) {

    var mainModule = ang.module('main', ['builds']);

    mainModule.controller('MainCtrl',
        ['buildServiceWrapper','buildListHelperService', 'storageHelperService', 'dateService',
            (x, y, z, d) => new BW.Modules.Main.Controllers.MainController(x, y, z) ]);

    mainModule.factory('uiGrid',  () => BW.Modules.Main.Directives.Grid.UIGrid);

    mainModule.directive('screenGrid',
        ['uiGrid', 'gridRenderService', 'buildListHelperService', '$window',
            (UIGrid, GridRenderService, buildServiceHelper, $window) => {
                return new BW.Modules.Main.Directives.Grid.ScreenGrid(
                    new UIGrid($window),
                    new GridRenderService(),
                    buildServiceHelper,
                    $window)
                    .execute()
        }]);

})(angular);

