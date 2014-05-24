/// <reference path='../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        (function (Grid) {
            var GridRenderService = (function () {
                function GridRenderService() {
                }
                Object.defineProperty(GridRenderService.prototype, "columns", {
                    get: function () {
                        return this._columns;
                    },
                    set: function (value) {
                        this._columns = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(GridRenderService.prototype, "builds", {
                    get: function () {
                        return this._builds;
                    },
                    set: function (value) {
                        this._builds = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(GridRenderService.prototype, "margin", {
                    get: function () {
                        return this._margin;
                    },
                    set: function (value) {
                        this._margin = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(GridRenderService.prototype, "maxItemHeight", {
                    get: function () {
                        return this._maxItemHeight;
                    },
                    set: function (value) {
                        this._maxItemHeight = value;
                    },
                    enumerable: true,
                    configurable: true
                });


                GridRenderService.prototype.load = function (renderData, grid) {
                    this._columns = renderData.columns;
                    this._builds = renderData.builds;
                    this._margin = renderData.margin;
                    this._maxItemHeight = renderData.maxItemHeight;
                    this._grid = grid;
                };

                GridRenderService.prototype.render = function () {
                    var self = this;

                    var frameSize = self._grid.resetFrameSize();
                    var gridSize = self.getGridSize();
                    var widgetSize = self.getWidgetSize(frameSize, gridSize);

                    setTimeout(function () {
                        self.renderGrid(widgetSize, gridSize);
                    });
                };

                GridRenderService.prototype.getGridSize = function () {
                    var self = this;
                    var total = self._builds.length;
                    return {
                        columns: self._columns,
                        rows: Math.ceil(total / self._columns)
                    };
                };

                GridRenderService.prototype.getWidgetSize = function (frameSize, gridSize) {
                    var total = this._builds.length;
                    var columns = gridSize.columns;
                    var rows = gridSize.rows;

                    var height = frameSize.height;
                    var width = frameSize.width;

                    var widgetWidth = Math.floor(width / columns) - 20;
                    var widgetHeight = Math.floor(height / rows) - this._margin * 2;

                    if (widgetHeight > this._maxItemHeight) {
                        widgetHeight = this._maxItemHeight;
                    }

                    return {
                        width: widgetWidth,
                        height: widgetHeight
                    };
                };

                GridRenderService.prototype.renderGrid = function (widgetSize, gridSize) {
                    this._grid.renderGrid(widgetSize, gridSize, this._margin, this.builds);
                };

                GridRenderService.prototype.update = function (oldBuilds) {
                    if (this.updateGridForRender(oldBuilds))
                        return;

                    this.updateGridContent();
                };

                GridRenderService.prototype.updateGridContent = function () {
                    var self = this;

                    self.builds.forEach(function (build) {
                        self._grid.updateWidget(build);
                    });
                };

                GridRenderService.prototype.updateGridForRender = function (oldBuilds) {
                    var self = this;
                    var builds = self._builds;

                    if (oldBuilds.length === builds.length)
                        return false;

                    self.render();
                    return true;
                };
                return GridRenderService;
            })();
            Grid.GridRenderService = GridRenderService;
        })(Infrastructure.Grid || (Infrastructure.Grid = {}));
        var Grid = Infrastructure.Grid;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=gridRenderService.js.map
