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
                    this._grid.buildStatusToCss = this.buildStatusToCss;
                };

                GridRenderService.prototype.render = function () {
                    var self = this;

                    var frameSize = self._grid.resetFrameSize();
                    var gridSize = self.getGridSize();
                    var widgetSize = self.getWidgetSize(frameSize, gridSize);

                    setTimeout(function () {
                        self.renderGrid(widgetSize, gridSize);
                    }, 5);
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

                GridRenderService.prototype.update = function (builds) {
                    if (this.updateGridForRender(builds))
                        return;

                    this.updateGridContent(builds);
                };

                GridRenderService.prototype.updateGridContent = function (builds) {
                    var self = this;

                    builds.filter(function (prevBuild) {
                        var newBuilds = self._builds.filter(function (newBuild) {
                            return newBuild.id === prevBuild.id;
                        });

                        if (newBuilds.length <= 0) {
                            self._grid.removeWidget(prevBuild);
                        } else {
                            var newBuild = newBuilds[0];

                            if (newBuild.displayName !== prevBuild.displayName) {
                                self._grid.updateWidget(newBuild);
                            }
                        }
                    });
                };

                GridRenderService.prototype.updateGridForRender = function (oldBuilds) {
                    var self = this;
                    var builds = self._builds;

                    var added = builds.filter(function (newBuild) {
                        return oldBuilds.filter(function (prevBuild) {
                            return newBuild.id === prevBuild.id;
                        }).length <= 0;
                    });

                    if (added.length > 0) {
                        self.render();
                        return true;
                    }

                    return false;
                };

                GridRenderService.prototype.filterBuilds = function (builds) {
                    return builds.filter(function (build) {
                        return build.isSelected;
                    });
                };

                GridRenderService.prototype.buildStatusToCss = function (buildStatus) {
                    switch (buildStatus) {
                        case 0 /* None */:
                            return 'none';
                        case 63 /* All */:
                            return 'all';
                        case 8 /* Failed */:
                            return 'failed';
                        case 1 /* InProgress */:
                            return 'in-progress';
                        case 32 /* NotStarted */:
                            return 'not-started';
                        case 4 /* PartiallySucceeded */:
                            return 'partially-succeeded';
                        case 16 /* Stopped */:
                            return 'stopped';
                        case 2 /* Succeeded */:
                            return 'succeeded';
                        default:
                            return '';
                    }
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
