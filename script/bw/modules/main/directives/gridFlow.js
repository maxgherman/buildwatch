/// <reference path='../../../../../d.ts/angular.d' />
/// <reference path='../../../../../d.ts/bw.d.ts' />
/// <reference path='../../../../../d.ts/jquery.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Directives) {
                var GridFlow = (function () {
                    function GridFlow() {
                    }
                    GridFlow.prototype.execute = function () {
                        var self = this;

                        return {
                            restrict: 'E',
                            scope: {
                                totalColumns: '=',
                                builds: '=',
                                margin: '=',
                                itemHeight: '='
                            },
                            templateUrl: 'templates/grid/gridFlow.html',
                            controller: ['$scope', '$window', 'buildListHelperService', 'buildStatusConverter', GridFlowController],
                            link: self.link.bind(self)
                        };
                    };

                    GridFlow.prototype.link = function ($scope, element, attrs) {
                        $scope.setResize(element);

                        $scope.$watch('totalColumns', function (newValue, oldValue) {
                            if (newValue === oldValue)
                                return;

                            if (newValue === oldValue || !newValue || newValue <= 0 || newValue > 9)
                                return;

                            $scope.load(element);
                        });

                        $scope.$watch('builds', function (newValue, oldValue) {
                            if (angular.equals(newValue, oldValue))
                                return;

                            $scope.filter(newValue);

                            $scope.statusChangedBuilds = [];
                            $scope.builds.filter(function (b1) {
                                return oldValue.some(function (b2) {
                                    return b2.id == b1.id && b2.status !== b1.status;
                                });
                            }).forEach(function (b) {
                                return $scope.statusChangedBuilds[b.id] = true;
                            });

                            $scope.load(element);
                            $scope.show = true;
                        }, true);
                    };
                    return GridFlow;
                })();
                Directives.GridFlow = GridFlow;

                function GridFlowController($scope, $window, buildListService, buildStatusConverter) {
                    var self = this;
                    self._$dashBoard = null;
                    self._$gridster = null;

                    $scope.show = false;
                    $scope.statusCss = function (status) {
                        return buildStatusConverter.getCss(status);
                    };

                    $scope.filter = function (value) {
                        $scope.builds = buildListService.filterDefinitions(value);
                    };

                    $scope.load = function (element) {
                        self._$dashBoard = $('.dashboardjs', element);
                        self._$gridster = $(".gridsterjs", element);

                        var boardSize = self.resetBoardSize();
                        var frameSize = self.resetFrameSize(boardSize);
                        var gridSize = self.calcGridSize();

                        var widgetSize = self.calcWidgetSize(frameSize, gridSize);

                        var header1Height = Math.min(widgetSize.height / 4, 50);
                        var header2Height = Math.min(widgetSize.height / 6.0, 30);
                        var header3Height = Math.min(widgetSize.height / 6.5, 20);
                        var textWidth = widgetSize.width - 20;

                        var header1FontSize = header1Height - 10;
                        var header2FontSize = header2Height - 7;
                        var header3FontSize = header3Height - 5;

                        $scope.header1Style = { width: textWidth + 'px', height: header1Height + 'px', 'font-size': header1FontSize + 'px' };
                        $scope.header2Style = { width: textWidth + 'px', height: header2Height + 'px', 'font-size': header2FontSize + 'px' };
                        $scope.header3Style = { width: textWidth + 'px', height: header3Height + 'px', 'font-size': header3FontSize + 'px' };

                        $scope.widgetFrameStyle = { margin: $scope.margin + 'px', 'font-size': header2FontSize + 'px' };
                        $scope.widgetStyle = { width: widgetSize.width + 'px', height: widgetSize.height + 'px' };
                    };

                    $scope.setResize = function (element) {
                        $($window).resize(function () {
                            $scope.$apply(function () {
                                $scope.load(element);
                            });
                        });
                    };

                    this.calcGridSize = function () {
                        var total = $scope.builds.length;
                        return {
                            columns: $scope.totalColumns,
                            rows: Math.ceil(total / $scope.totalColumns)
                        };
                    };

                    this.calcWindowSize = function () {
                        return {
                            width: $($window).width(),
                            height: $($window).height()
                        };
                    };

                    this.resetBoardSize = function () {
                        var windowSize = self.calcWindowSize();

                        var boardHeight = windowSize.height - 25;
                        var borderWidth = windowSize.width - 75;

                        self._$dashBoard.height(boardHeight);
                        self._$dashBoard.width(borderWidth);

                        return {
                            width: borderWidth,
                            height: boardHeight
                        };
                    };

                    this.resetFrameSize = function (boardSize) {
                        var frameHeight = boardSize.height - 10;

                        self._$gridster.height(frameHeight);

                        return {
                            width: self._$gridster.width(),
                            height: frameHeight
                        };
                    };

                    this.calcWidgetSize = function (frameSize, gridSize) {
                        var total = $scope.builds.length;
                        var columns = gridSize.columns;
                        var rows = gridSize.rows;

                        var height = frameSize.height;
                        var width = frameSize.width;

                        var widgetWidth = Math.floor(width / columns) - 20;
                        var widgetHeight = Math.floor(height / rows) - $scope.margin * 2;

                        widgetHeight = Math.min(widgetHeight, $scope.itemHeight);

                        return {
                            width: widgetWidth,
                            height: widgetHeight
                        };
                    };
                }
            })(Main.Directives || (Main.Directives = {}));
            var Directives = Main.Directives;
        })(Modules.Main || (Modules.Main = {}));
        var Main = Modules.Main;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=gridFlow.js.map
