/// <reference path='../../../../../../d.ts/bw.d.ts' />
/// <reference path='../../../../../../d.ts/jquery.d' />

'use strict';


module BW.Modules.Main.Directives.Grid {

    interface IGridComponent {
        remove_all_widgets() : void;
        remove_widget(item : JQuery);
        destroy() : void;
        add_widget(htmlString : string, sizeColumns : number, sizeRows : number, column : number, row: number);
        widgets : Object[];
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
        public buildClick : (id: number) => void;

        private widgetSize : BW.ISize;
        private headerHeight : number;
        private itemHeight : number;
        private subItemHeight : number;
        private cssStatuses;

        constructor(private _window :JQuery) {

            this.cssStatuses = [];
            this.cssStatuses[ BW.BuildStatus.None] = 'none';
            this.cssStatuses[ BW.BuildStatus.All ] = 'all';
            this.cssStatuses[ BW.BuildStatus.Failed ] = 'failed';
            this.cssStatuses[ BW.BuildStatus.InProgress ] = 'in-progress';
            this.cssStatuses[ BW.BuildStatus.NotStarted ] = 'not-started';
            this.cssStatuses[ BW.BuildStatus.PartiallySucceeded ] = 'partially-succeeded';
            this.cssStatuses[ BW.BuildStatus.Stopped ] = 'stopped';
            this.cssStatuses[ BW.BuildStatus.Succeeded ] = 'succeeded';
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

            setInterval(() => {

                $("div.in-progress").css('-webkit-background-size', this.widgetSize.height + 'px');

                $(".gridster > ul > li").click(function(e) {

                    if(self.buildClick) {
                        var id = $(this).data('id');
                        self.buildClick(id);
                    }

                });
            }, 1000);
        }

        private addWidget(build : BW.IBuildDefinition, size : BW.IGridSize, x : number, y : number) {

            var self = this;

            var statusCss = this.cssStatuses[build.status];

            var buildEl = ['<li class="', statusCss ,'"  data-id="',  build.id ,'"  data-status="'+ build.status +'"  style="font-size:' +this.subItemHeight + 'px">',
                ' <div class="', statusCss ,'">  ',
                ' <div class="text-item header" style="height: ', this.headerHeight ,'px; width:', this.widgetSize.width - 20 ,'px; font-size: ', this.headerHeight -10 ,'px" > ',
                    ' <span>' , build.displayName,'</span> ',
                ' </div>',
                ' <div class="text-item status" style="height: ', this.itemHeight ,'px; width:', this.widgetSize.width- 20 ,'px; font-size: ', this.itemHeight -7 ,'px">',
                    ' <span> Status : </span> <span class="text">' , build.statusText,' </span> </div>',
                ' <div class="text-item requested-by" style="height: ', this.itemHeight ,'px; width:', this.widgetSize.width - 20,'px; font-size: ', this.itemHeight -7 ,'px"> ' +
                    '<span> Requested by : </span> <span class="text"> ' , build.requestedBy,' </span> ' +
                    '</div>',
                ' <div class="text-item start-date" style="height: ', this.subItemHeight ,'px; width:', this.widgetSize.width - 20,'px; font-size: ', this.subItemHeight -5 ,'px"> ' +
                    '<span> Start Date : </span> <span class="text"> ' ,build.startDate ?  build.startDate.toFormattedString() : '',' </span> ' +
                    '</div>',
                ' <div class="text-item finish-date" style="height: ', this.subItemHeight ,'px; width:', this.widgetSize.width - 20,'px; font-size: ', this.subItemHeight -5 ,'px"> ' +
                    '<span> Finish Date : </span> <span class="text"> ' , build.finishDate ? build.finishDate.toFormattedString() : '',' </span> ' +
                    '</div>',
                ' </div> ',
                ' </li>'].join('');

            var element = this._gridComponent.add_widget(buildEl, size.columns, size.rows, x, y);
        }

        public removeWidget(build : BW.IBuildDefinition) {
            var gridItem = this.getGridItem(build);

            if(this._gridComponent.widgets.length > 0) {
                this._gridComponent.remove_widget(gridItem);
            }

            var gridItem = this.getGridItem(build);
            gridItem.remove();
        }

        public updateWidget(build : BW.IBuildDefinition) {
            var gridItem = this.getGridItem(build);
            var prevStatus = gridItem.data('status');

            if(prevStatus == build.status) {
                this.updateWidgetData(gridItem, build);
                return;
            }

            gridItem.data('status', build.status);
            var statusCss = this.cssStatuses[build.status];

            gridItem.removeClass("fade-in");
            gridItem.addClass("fade-out");

            setTimeout(() => {
                this.updateCssStatus(gridItem, statusCss, false);
                this.updateCssStatus(gridItem.find("div:first"), statusCss);

                this.updateWidgetData(gridItem, build);

                gridItem.removeClass("fade-out")
                gridItem.addClass("fade-in");
            }, 1000);

        }

        private updateWidgetData(gridItem : JQuery, build : BW.IBuildDefinition) {
            $("div.header span.text", gridItem).html(build.displayName);
            $("div.status span.text", gridItem).html(build.statusText);
            $("div.requested-by span.text", gridItem).html(build.requestedBy);
            $("div.start-date span.text", gridItem).html(build.startDate.toFormattedString());
            $("div.finish-date span.text", gridItem).html(build.finishDate.toFormattedString());
        }

        private updateCssStatus(element : JQuery, statusCss: string, clean = true) {

            if(clean) {
                element.removeClass();
            } else {

                this.cssStatuses.forEach(item => {
                    if(element.hasClass(item)) {
                        element.removeClass(item);
                    }
                });
            }

            element.addClass(statusCss);
        }

        private getGridItem(build : BW.IBuildDefinition) : JQuery {
            var selector = ["li[data-id='", build.id, "']"].join('');
            return $(selector, this._$gridsterList);
        }

        private destroyGrid() {
            if (!this._gridComponent) return

            if(this._gridComponent.widgets.length > 0) {

                this._gridComponent.remove_all_widgets();
            }
            this._gridComponent.destroy();
            this._$gridsterList.empty();
        }

        private getWindowSize() : BW.ISize {
            return {
                width : $(this._window).width(),
                height : $(this._window).height()
            };
        }
    }
}
