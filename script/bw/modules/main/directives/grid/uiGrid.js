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

                            $(".gridster > ul > li div.in-progress").css('-webkit-background-size', self.widgetSize.height + 'px');

                            $(".gridster > ul > li").click(function (e) {
                                if (self.buildClick) {
                                    var id = $(this).data('id');
                                    self.buildClick(id);
                                }
                            });
                        };

                        UIGrid.prototype.addWidget = function (build, size, x, y) {
                            var statusCss = this.buildStatusToCss(build.status);

                            var buildEl = [
                                '<li class="', statusCss, '"  data-id="', build.id, '">',
                                ' <div class="', statusCss, '">  ',
                                ' <div class="text-item" style="height: ', this.headerHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.headerHeight - 10, 'px" > ',
                                ' <span>', build.displayName, '</span> ',
                                ' </div>',
                                ' <div class="text-item" style="height: ', this.itemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.itemHeight - 7, 'px">',
                                ' <span> Status : ', build.statusText, ' </span> </div>',
                                ' <div class="text-item" style="height: ', this.itemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.itemHeight - 7, 'px"> ' + '<span> Requested by : ', build.requestedBy, ' </span> ' + '</div>',
                                ' <div class="text-item" style="height: ', this.subItemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.subItemHeight - 5, 'px"> ' + '<span> Start Date : ', build.startDate ? build.startDate.toFormattedString() : '', ' </span> ' + '</div>',
                                ' <div class="text-item" style="height: ', this.subItemHeight, 'px; width:', this.widgetSize.width - 20, 'px; font-size: ', this.subItemHeight - 5, 'px"> ' + '<span> Finish Date : ', build.finishDate ? build.finishDate.toFormattedString() : '', ' </span> ' + '</div>',
                                ' </div> ',
                                ' </li>'].join('');

                            this._gridComponent.add_widget(buildEl, size.columns, size.rows, x, y);
                        };

                        UIGrid.prototype.removeWidget = function (build) {
                            var gridItem = this.getGridItem(build);

                            this._gridComponent.remove_widget(gridItem);

                            var gridItem = this.getGridItem(build);
                            gridItem.remove();
                        };

                        UIGrid.prototype.updateWidget = function (build) {
                            var gridItem = this.getGridItem(build);

                            $("div", gridItem).html(build.displayName);
                        };

                        UIGrid.prototype.getGridItem = function (build) {
                            var selector = ["li[data-id='", build.id, "']"].join('');
                            return $(selector, this._$gridsterList);
                        };

                        UIGrid.prototype.destroyGrid = function () {
                            if (this._gridComponent) {
                                this._gridComponent.remove_all_widgets();
                                this._gridComponent.destroy();
                                this._$gridsterList.empty();
                            }
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
