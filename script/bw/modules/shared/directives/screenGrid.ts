
/// <reference path='../../../../../d.ts/bw.d' />
/// <reference path='../../../../../d.ts/jquery.d' />
/// <reference path='../../../infrastructure/grid/gridRenderService' />

'use strict';

module BW.Modules.Main.Directives {

    export class ScreenGrid {

        private _grid : BW.IUIGrid;
        private _gridRenderService : BW.IGridRenderService;

        public execute(uiGrid : BW.IUIGrid, greedRenderService : BW.IGridRenderService) {

            var self = this;
            self._grid = uiGrid;
            self._gridRenderService = greedRenderService;

            return {
                restrict: 'E',
                scope: {
                    totalColumns: '=',
                    builds: '=',
                    margin: '=',
                    maxItemHeigth : '='
                },
                templateUrl: 'templates/grid.html',
                link: self.link.bind(self)
            };
        }

        private link($scope, element, attrs) {

            var self = this;

            self._grid.load(element);
            self._gridRenderService.load({
                columns: $scope.totalColumns,
                builds: $scope.builds,
                margin: $scope.margin,
                maxItemHeight : $scope.maxItemHeight
            }, self._grid);

            $(window).resize(function() {
                self._gridRenderService.render();
            });

            $scope.$watch('totalColumns', function(newValue, oldValue) {
                if (newValue === oldValue) return;

                if (newValue === oldValue ||
                    !newValue ||
                    newValue <= 0 ||
                    newValue > 9) return;

                self._gridRenderService.columns = newValue;
                self._gridRenderService.render();

//            renderHolder.columns = newValue;
//            renderHolder.builds = filterBuilds($scope.builds);
//
//            render(renderHolder);
            });

            $scope.$watch('builds', function(newValue, oldValue) {


                self._gridRenderService.builds = newValue;
                self._gridRenderService.update(oldValue);

                //renderHolder.builds = filterBuilds(newValue);
                //oldValue = filterBuilds(oldValue);

                //updateGrid(renderHolder, oldValue);

            }, true);

            self._gridRenderService.render();
        }
    }
}