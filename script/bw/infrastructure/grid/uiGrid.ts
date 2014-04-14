
/// <reference path='../../../../d.ts/bw.d' />
/// <reference path='../../../../d.ts/jquery.d' />

module BW.Infrastructure.Grid {

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

        private  _gridComponent: IGridComponent;
        private _$dashBoasrd : JQuery;
        private _$gridster : JQuery;
        private _$gridsterList : IGridElement;


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
            gridsterEl.height(dashBoardEl.height() - 5);

            return {
                width : gridsterEl.width(),
                height : gridsterEl.height()
            };
        }

        public renderGrid(widgetSize : BW.ISize, margin : number) {

            var self = this;

            self.destroyGrid();

            self._gridComponent = self._$gridsterList.gridster({
                widget_margins: [margin, margin],
                widget_base_dimensions: [widgetSize.width, widgetSize.height]
            }).data('gridster');
        }

        public addWidget(build : BW.IBuild, size : BW.IGridSize, x : number, y : number) {

            var buildEl = ['<li data-id="',  build.id ,'"> <div class="shine">  ', build.name, ' </div>  </li>'].join('');

            this._gridComponent.add_widget(buildEl, size.columns, size.rows, x, y);
        }

        public removeWidget(build : BW.IBuild) {
            var gridItem = this.getGridItem(build);

            this._gridComponent.remove_widget(gridItem);
        }

        public updateWidget(build : BW.IBuild) {
            var gridItem = this.getGridItem(build);

            $("div", gridItem).html(build.name);
        }

        private getGridItem(build : BW.IBuild) {
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
                width : $(window).width(),
                height : $(window).height()
            };
        }
    }
}
