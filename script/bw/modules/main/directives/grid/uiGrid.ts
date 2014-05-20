/// <reference path='../../../../../../d.ts/bw.d.ts' />
/// <reference path='../../../../../../d.ts/jquery.d' />

'use strict';


module BW.Modules.Main.Directives.Grid {

    interface IGridComponent {
        remove_all_widgets() : void;
        remove_widget(item : JQuery);
        destroy() : void;
        add_widget(htmlString : string, sizeColumns : number, sizeRows : number, column : number, row: number);
    }

    interface IGridElement extends JQuery {
        gridster(options :{
            widget_margins: Array<number>;
            widget_base_dimensions: Array<number>
        }) : { data : (value : string) => IGridComponent };
    }


    export class UIGrid implements BW.IUIGrid {

        private maxWidgetHeaderSize  : number = 50;
        private maxWidgetItemSize : number = 30;
        private maxWidgetSubItemSize : number = 20;
        private  _gridComponent: IGridComponent;
        private _$dashBoasrd : JQuery;
        private _$gridster : JQuery;
        private _$gridsterList : IGridElement;
        public buildStatusToCss : (buildStatus : BuildStatus) => string;
        public buildClick : (id: number) => void;

        private widgetSize : BW.ISize;
        private headerHeight : number;
        private itemHeight : number;
        private subItemHeight : number;

        constructor(private _window :JQuery) {

        }

        public load(parent : HTMLElement) {
            this._$dashBoasrd =  $('.dashboardjs', parent);
            this._$gridster = $(".gridsterjs", parent);
            this._$gridsterList = <IGridElement>$(".gridsterListjs", parent);
        }

        public resetFrameSize() : BW.ISize {
            var windowSize = this.getWindowSize();

            var dashBoardEl =  this._$dashBoasrd;
            var gridsterEl = this._$gridster;

            dashBoardEl.height(windowSize.height - 25);
            dashBoardEl.width(windowSize.width - 75);
            gridsterEl.height(dashBoardEl.height() - 10);

            return {
                width : gridsterEl.width(),
                height : gridsterEl.height()
            };
        }

        public renderGrid(widgetSize : BW.ISize, size : BW.IGridSize, margin : number, builds : Array<BW.IBuildDefinition>) {

            var self = this;
            self.widgetSize = widgetSize;
            self.headerHeight = Math.min(widgetSize.height / 4, this.maxWidgetHeaderSize);
            self.itemHeight = Math.min(widgetSize.height / 6.0 , this.maxWidgetItemSize);
            self.subItemHeight = Math.min(widgetSize.height / 6.5 , this.maxWidgetSubItemSize);

            self.destroyGrid();

            self._gridComponent = self._$gridsterList.gridster({
                widget_margins: [margin, margin],
                widget_base_dimensions: [widgetSize.width, widgetSize.height]
            }).data('gridster');


            var index = 0;
            for (var i = 1; i <= size.rows; i++) {
                for (var j = 1; j <= size.columns; j++) {

                    if (index === builds.length) continue;

                    var build = builds[index++];

                    self.addWidget(build, { rows: 1, columns: 1}, j, i);
                }
            }

            $(".gridster > ul > li div.in-progress").css('-webkit-background-size', self.widgetSize.height + 'px');

            $(".gridster > ul > li").click(function(e) {

                if(self.buildClick) {
                    var id = $(this).data('id');
                    self.buildClick(id);
                }

            });
        }

        private addWidget(build : BW.IBuildDefinition, size : BW.IGridSize, x : number, y : number) {

            var statusCss = this.buildStatusToCss(build.status);

            var buildEl = ['<li class="', statusCss ,'"  data-id="',  build.id ,'">',
                             ' <div class="', statusCss ,'">  ',
                                ' <div class="text-item" style="height: ', this.headerHeight ,'px; width:', this.widgetSize.width - 20 ,'px; font-size: ', this.headerHeight -10 ,'px" > ',
                                    ' <span>' , build.displayName,'</span> ',
                                ' </div>',
                                ' <div class="text-item" style="height: ', this.itemHeight ,'px; width:', this.widgetSize.width- 20 ,'px; font-size: ', this.itemHeight -7 ,'px">',
                                    ' <span> Status : ' , build.statusText,' </span> </div>',
                                ' <div class="text-item" style="height: ', this.itemHeight ,'px; width:', this.widgetSize.width - 20,'px; font-size: ', this.itemHeight -7 ,'px"> ' +
                                    '<span> Requested by : ' , build.requestedBy,' </span> ' +
                                '</div>',
                                ' <div class="text-item" style="height: ', this.subItemHeight ,'px; width:', this.widgetSize.width - 20,'px; font-size: ', this.subItemHeight -5 ,'px"> ' +
                                    '<span> Start Date : ' ,build.startDate ?  build.startDate.toFormattedString() : '',' </span> ' +
                                '</div>',
                                ' <div class="text-item" style="height: ', this.subItemHeight ,'px; width:', this.widgetSize.width - 20,'px; font-size: ', this.subItemHeight -5 ,'px"> ' +
                                    '<span> Finish Date : ' , build.finishDate ? build.finishDate.toFormattedString() : '',' </span> ' +
                                '</div>',
                             ' </div> ',
                          ' </li>'].join('');

            this._gridComponent.add_widget(buildEl, size.columns, size.rows, x, y);
        }

        public removeWidget(build : BW.IBuildDefinition) {
            var gridItem = this.getGridItem(build);

            this._gridComponent.remove_widget(gridItem);

            var gridItem = this.getGridItem(build);
            gridItem.remove();
        }

        public updateWidget(build : BW.IBuildDefinition) {
            var gridItem = this.getGridItem(build);

            $("div", gridItem).html(build.displayName);
        }

        private getGridItem(build : BW.IBuildDefinition) {
            var selector = ["li[data-id='", build.id, "']"].join('');
            return $(selector, this._$gridsterList);
        }

        private destroyGrid() {
            if (this._gridComponent) {
                this._gridComponent.remove_all_widgets();
                this._gridComponent.destroy();
                this._$gridsterList.empty();
            }
        }

        private getWindowSize() : BW.ISize {
            return {
                width : $(this._window).width(),
                height : $(this._window).height()
            };
        }
    }
}
