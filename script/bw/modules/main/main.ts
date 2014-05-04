
/// <reference path='../../../../d.ts/angular.d' />
/// <reference path='./controllers/main' />
/// <reference path='../shared/directives/grid/uiGrid' />
/// <reference path='../shared/directives/grid/screenGrid' />

'use strict';

(function(ang) {

    var mainModule = ang.module('main', ['builds']);

    mainModule.controller('MainCtrl',
        ['buildServiceWrapper','buildListHelperService', (x, y) => new BW.Modules.Main.Controllers.MainController(x, y) ]);

    mainModule.factory('uiGrid',  () => BW.Modules.Main.Directives.Grid.UIGrid);

    mainModule.directive('screenGrid',
        ['uiGrid', 'gridRenderService', (UIGrid, GridRenderService) => {
            return new BW.Modules.Main.Directives.Grid.ScreenGrid(new UIGrid(), new GridRenderService())
                .execute();
        }] );

})(angular);

