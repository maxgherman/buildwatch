/// <reference path='../../../../../../d.ts/bw.d.ts' />
/// <reference path='../../../../../../d.ts/jquery.d' />
/// <reference path='../../../../infrastructure/grid/gridRenderService' />

'use strict';

module BW.Modules.Main.Directives.Grid {

    export class ScreenGrid {

        constructor(private _grid : BW.IUIGrid,
                    private _gridRenderService : BW.IGridRenderService,
                    private _buildListService : BW.IBuildListHelperService,
                    private _window :JQuery) {}

        public execute() {

            var self = this;

            return {
                restrict: 'E',
                scope: {
                    currentBuildId : '=',
                    totalColumns: '=',
                    builds: '=',
                    margin: '=',
                    maxItemHeigth : '='
                },
                templateUrl: 'templates/grid/grid.html',
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
                maxItemHeight : $scope.maxItemHeigth
            }, self._grid);

            self._grid.buildClick = id => {

                $scope.$apply(() => {
                    $scope.currentBuildId = id;
                });
            };


            $(self._window).resize(function() {
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

            });

            $scope.$watch('builds', function(newValue, oldValue) {

                self._gridRenderService.builds = <Array<BW.IBuildDefinition>>self._buildListService.filter(newValue);
                self._gridRenderService.update(self._buildListService.filter(oldValue));

            }, true);

            self._gridRenderService.render();
        }
    }
}