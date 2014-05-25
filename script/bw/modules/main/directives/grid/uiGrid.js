/// <reference path='../../../../../../d.ts/bw.d.ts' />
/// <reference path='../../../../../../d.ts/jquery.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Directives) {
                (function (Grid) {
                    var UIGrid = (function () {
                        function UIGrid(_window) {
                            this._window = _window;
                            this.maxWidgetHeaderSize = 50;
                            this.maxWidgetItemSize = 30;
                            this.maxWidgetSubItemSize = 20;
                            this.cssStatuses = [];
                            this.cssStatuses[0 /* None */] = 'none';
                            this.cssStatuses[63 /* All */] = 'all';
                            this.cssStatuses[8 /* Failed */] = 'failed';
                            this.cssStatuses[1 /* InProgress */] = 'in-progress';
                            this.cssStatuses[32 /* NotStarted */] = 'not-started';
                            this.cssStatuses[4 /* PartiallySucceeded */] = 'partially-succeeded';
                            this.cssStatuses[16 /* Stopped */] = 'stopped';
                            this.cssStatuses[2 /* Succeeded */] = 'succeeded';
                        }
                        UIGrid.prototype.load = function (parent) {
                            this._$dashBoasrd = $('.dashboardjs', parent);
                            this._$gridster = $(".gridsterjs", parent);
                            this._$gridsterList = $(".gridsterListjs", parent);
                        };

                        UIGrid.prototype.resetFrameSize = function () {
                            var windowSize = this.getWindowSize();

                            var dashBoardEl = this._$dashBoasrd;
                            var gridsterEl = this._$gridster;

                            dashBoardEl.height(windowSize.height - 25);
                            dashBoardEl.width(windowSize.width - 75);
                            gridsterEl.height(dashBoardEl.height() - 10);

                            return {
                                width: gridsterEl.width(),
                                height: gridsterEl.height()
                            };
                        };

                        UIGrid.prototype.renderGrid = function (widgetSize, size, margin, builds) {
                            var _this = this;
                            var self = this;
                            self.widgetSize = widgetSize;
                            self.headerHeight = Math.min(widgetSize.height / 4, this.maxWidgetHeaderSize);
                            self.itemHeight = Math.min(widgetSize.height / 6.0, this.maxWidgetItemSize);
                            self.subItemHeight = Math.min(widgetSize.height / 6.5, this.maxWidgetSubItemSize);

                            self.destroyGrid();

                            self._gridComponent = self._$gridsterList.gridster({
                                widget_margins: [margin, margin],
                                widget_base_dimensions: [widgetSize.width, widgetSize.height]
                            }).data('gridster');

                            var index = 0;
                            for (var i = 1; i <= size.rows; i++) {
                                for (var j = 1; j <= size.columns; j++) {
                                    if (index === builds.length)
                                        continue;

                                    var build = builds[index++];

                                    self.addWidget(build, { rows: 1, columns: 1 }, j, i);
                                }
                            }

                            setInterval(function () {
                                $("div.in-progress").css('-webkit-background-size', _this.widgetSize.height + 'px');

                                $(".gridster > ul > li").click(function (e) {
                                    if (self.buildClick) {
                                        var id = $(this).data('id');
                                        self.buildClick(id);
                                    }
                                });
                            }, 1000);
                        };

                        UIGrid.prototype.addWidget = function (build, size, x, y) {
                            var self = this;

                            var statusCss = this.cssStatuses[build.status];

                            var buildEl = [
                                '<li class="', statusCss, '"  data-id="', build.id, '"  data-status="' + build.status + '"  style="font-size:' + this.subItemHeight + 'px">',
                                ' <div class="', statusCss, '">  ',
                                ' <div class="text-item header" style="height: ', this.headerHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.headerHeight - 10, 'px" > ',
                                ' <span>', build.displayName, '</span> ',
                                ' </div>',
                                ' <div class="text-item status" style="height: ', this.itemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.itemHeight - 7, 'px">',
                                ' <span> Status : </span> <span class="text">', build.statusText, ' </span> </div>',
                                ' <div class="text-item requested-by" style="height: ', this.itemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.itemHeight - 7, 'px"> ' + '<span> Requested by : </span> <span class="text"> ', build.requestedBy, ' </span> ' + '</div>',
                                ' <div class="text-item start-date" style="height: ', this.subItemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.subItemHeight - 5, 'px"> ' + '<span> Start Date : </span> <span class="text"> ', build.startDate ? build.startDate.toFormattedString() : '', ' </span> ' + '</div>',
                                ' <div class="text-item finish-date" style="height: ', this.subItemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.subItemHeight - 5, 'px"> ' + '<span> Finish Date : </span> <span class="text"> ', build.finishDate ? build.finishDate.toFormattedString() : '', ' </span> ' + '</div>',
                                ' </div> ',
                                ' </li>'].join('');

                            var element = this._gridComponent.add_widget(buildEl, size.columns, size.rows, x, y);
                        };

                        UIGrid.prototype.removeWidget = function (build) {
                            var gridItem = this.getGridItem(build);

                            if (this._gridComponent.widgets.length > 0) {
                                this._gridComponent.remove_widget(gridItem);
                            }

                            var gridItem = this.getGridItem(build);
                            gridItem.remove();
                        };

                        UIGrid.prototype.updateWidget = function (build) {
                            var _this = this;
                            var gridItem = this.getGridItem(build);
                            var prevStatus = gridItem.data('status');

                            if (prevStatus == build.status) {
                                this.updateWidgetData(gridItem, build);
                                return;
                            }

                            gridItem.data('status', build.status);
                            var statusCss = this.cssStatuses[build.status];

                            gridItem.removeClass("fade-in");
                            gridItem.addClass("fade-out");

                            setTimeout(function () {
                                _this.updateCssStatus(gridItem, statusCss, false);
                                _this.updateCssStatus(gridItem.find("div:first"), statusCss);

                                _this.updateWidgetData(gridItem, build);

                                gridItem.removeClass("fade-out");
                                gridItem.addClass("fade-in");
                            }, 1000);
                        };

                        UIGrid.prototype.updateWidgetData = function (gridItem, build) {
                            $("div.header span.text", gridItem).html(build.displayName);
                            $("div.status span.text", gridItem).html(build.statusText);
                            $("div.requested-by span.text", gridItem).html(build.requestedBy);
                            $("div.start-date span.text", gridItem).html(build.startDate.toFormattedString());
                            $("div.finish-date span.text", gridItem).html(build.finishDate.toFormattedString());
                        };

                        UIGrid.prototype.updateCssStatus = function (element, statusCss, clean) {
                            if (typeof clean === "undefined") { clean = true; }
                            if (clean) {
                                element.removeClass();
                            } else {
                                this.cssStatuses.forEach(function (item) {
                                    if (element.hasClass(item)) {
                                        element.removeClass(item);
                                    }
                                });
                            }

                            element.addClass(statusCss);
                        };

                        UIGrid.prototype.getGridItem = function (build) {
                            var selector = ["li[data-id='", build.id, "']"].join('');
                            return $(selector, this._$gridsterList);
                        };

                        UIGrid.prototype.destroyGrid = function () {
                            if (!this._gridComponent)
                                return;

                            if (this._gridComponent.widgets.length > 0) {
                                this._gridComponent.remove_all_widgets();
                            }
                            this._gridComponent.destroy();
                            this._$gridsterList.empty();
                        };

                        UIGrid.prototype.getWindowSize = function () {
                            return {
                                width: $(this._window).width(),
                                height: $(this._window).height()
                            };
                        };
                        return UIGrid;
                    })();
                    Grid.UIGrid = UIGrid;
                })(Directives.Grid || (Directives.Grid = {}));
                var Grid = Directives.Grid;
            })(Main.Directives || (Main.Directives = {}));
            var Directives = Main.Directives;
        })(Modules.Main || (Modules.Main = {}));
        var Main = Modules.Main;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=uiGrid.js.map
