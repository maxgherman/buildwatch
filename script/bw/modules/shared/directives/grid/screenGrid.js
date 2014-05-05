/// <reference path='../../../../../../d.ts/bw.d.ts' />
/// <reference path='../../../../../../d.ts/jquery.d' />
/// <reference path='../../../../infrastructure/grid/gridRenderService' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Directives) {
                (function (Grid) {
                    var ScreenGrid = (function () {
                        function ScreenGrid(_grid, _gridRenderService, _buildListService) {
                            this._grid = _grid;
                            this._gridRenderService = _gridRenderService;
                            this._buildListService = _buildListService;
                        }
                        ScreenGrid.prototype.execute = function () {
                            var self = this;

                            return {
                                restrict: 'E',
                                scope: {
                                    totalColumns: '=',
                                    builds: '=',
                                    margin: '=',
                                    maxItemHeigth: '='
                                },
                                templateUrl: 'templates/grid.html',
                                link: self.link.bind(self)
                            };
                        };

                        ScreenGrid.prototype.link = function ($scope, element, attrs) {
                            var self = this;

                            self._grid.load(element);
                            self._gridRenderService.load({
                                columns: $scope.totalColumns,
                                builds: $scope.builds,
                                margin: $scope.margin,
                                maxItemHeight: $scope.maxItemHeight
                            }, self._grid);

                            $(window).resize(function () {
                                self._gridRenderService.render();
                            });

                            $scope.$watch('totalColumns', function (newValue, oldValue) {
                                if (newValue === oldValue)
                                    return;

                                if (newValue === oldValue || !newValue || newValue <= 0 || newValue > 9)
                                    return;

                                self._gridRenderService.columns = newValue;
                                self._gridRenderService.render();
                            });

                            $scope.$watch('builds', function (newValue, oldValue) {
                                self._gridRenderService.builds = self._buildListService.filter(newValue);
                                self._gridRenderService.update(self._buildListService.filter(oldValue));
                            }, true);

                            self._gridRenderService.render();
                        };
                        return ScreenGrid;
                    })();
                    Grid.ScreenGrid = ScreenGrid;
                })(Directives.Grid || (Directives.Grid = {}));
                var Grid = Directives.Grid;
            })(Main.Directives || (Main.Directives = {}));
            var Directives = Main.Directives;
        })(Modules.Main || (Modules.Main = {}));
        var Main = Modules.Main;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=screenGrid.js.map
