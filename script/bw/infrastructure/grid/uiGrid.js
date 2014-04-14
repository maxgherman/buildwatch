/// <reference path='../../../../d.ts/bw.d' />
/// <reference path='../../../../d.ts/jquery.d' />
var BW;
(function (BW) {
    (function (Infrastructure) {
        (function (Grid) {
            var UIGrid = (function () {
                function UIGrid() {
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
                    gridsterEl.height(dashBoardEl.height() - 5);

                    return {
                        width: gridsterEl.width(),
                        height: gridsterEl.height()
                    };
                };

                UIGrid.prototype.renderGrid = function (widgetSize, margin) {
                    var self = this;

                    self.destroyGrid();

                    self._gridComponent = self._$gridsterList.gridster({
                        widget_margins: [margin, margin],
                        widget_base_dimensions: [widgetSize.width, widgetSize.height]
                    }).data('gridster');
                };

                UIGrid.prototype.addWidget = function (build, size, x, y) {
                    var buildEl = ['<li data-id="', build.id, '"> <div class="shine">  ', build.name, ' </div>  </li>'].join('');

                    this._gridComponent.add_widget(buildEl, size.columns, size.rows, x, y);
                };

                UIGrid.prototype.removeWidget = function (build) {
                    var gridItem = this.getGridItem(build);

                    this._gridComponent.remove_widget(gridItem);
                };

                UIGrid.prototype.updateWidget = function (build) {
                    var gridItem = this.getGridItem(build);

                    $("div", gridItem).html(build.name);
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
                        width: $(window).width(),
                        height: $(window).height()
                    };
                };
                return UIGrid;
            })();
            Grid.UIGrid = UIGrid;
        })(Infrastructure.Grid || (Infrastructure.Grid = {}));
        var Grid = Infrastructure.Grid;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=uiGrid.js.map
