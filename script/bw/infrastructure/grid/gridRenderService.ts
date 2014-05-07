
/// <reference path='../../../../d.ts/bw.d' />

module BW.Infrastructure.Grid {

    export class GridRenderService implements BW.IGridRenderService{
        private _grid:BW.IUIGrid;
        private _columns:number;
        private _builds:Array<BW.IBuildDefinition>;
        private _margin:number;
        private _maxItemHeight:number;

        public get columns():number {
            return this._columns;
        }

        public set columns(value:number) {
            this._columns = value;
        }

        public get builds():Array<BW.IBuildDefinition> {
            return this._builds;
        }

        public set builds(value:Array<BW.IBuildDefinition>) {
            this._builds = value;
        }

        public get margin():number {
            return this._margin;
        }

        public set margin(value:number) {
            this._margin = value;
        }

        public get maxItemHeight():number {
            return this._maxItemHeight;
        }

        public set maxItemHeight(value:number) {
            this._maxItemHeight = value;
        }

        public load(renderData:BW.IGreedRenderData, grid:BW.IUIGrid) {
            this._columns = renderData.columns;
            this._builds = renderData.builds;
            this._margin = renderData.margin;
            this._maxItemHeight = renderData.maxItemHeight;
            this._grid = grid;
        }


        public render() {

            var self = this;

            var frameSize = self._grid.resetFrameSize();
            var gridSize = self.getGridSize();
            var widgetSize = self.getWidgetSize(frameSize, gridSize);

            setTimeout(() => {

                self.renderGrid(widgetSize, gridSize);

            }, 10);
        }

        private getGridSize():BW.IGridSize {

            var self = this;
            var total = self._builds.length;
            return {
                columns: self._columns,
                rows: Math.ceil(total / self._columns)
            };
        }

        private getWidgetSize(frameSize:BW.ISize, gridSize:BW.IGridSize):BW.ISize {
            var total = this._builds.length;
            var columns = gridSize.columns;
            var rows = gridSize.rows;

            var height = frameSize.height;
            var width = frameSize.width;

            var widgetWidth = Math.floor(width / columns) - 20;
            var widgetHeight = Math.floor(height / rows) - this._margin * 2;

            if (widgetHeight > this._maxItemHeight) {
                widgetHeight = this._maxItemHeight
            }

            return {
                width: widgetWidth,
                height: widgetHeight
            };
        }

        private renderGrid(widgetSize:BW.ISize, gridSize:BW.IGridSize) {

            var self = this;

            self._grid.renderGrid(widgetSize, self._margin);

            var index = 0;
            for (var i = 1; i <= gridSize.rows; i++) {
                for (var j = 1; j <= gridSize.columns; j++) {

                    if (index === self._builds.length) continue;

                    var build = self._builds[index++];

                    self._grid.addWidget(build, { rows: 1, columns: 1}, j, i);
                }
            }
        }

        public update(builds) {

            if (this.updateGridForRender(builds)) return;

            this.updateGridContent(builds);
        }

        private updateGridContent(builds) {
            var self = this;

            builds.filter(prevBuild => {

                var newBuilds = self._builds.filter(newBuild => {

                    return newBuild.id === prevBuild.id;
                });

                if (newBuilds.length <= 0) {

                    self._grid.removeWidget(prevBuild);
                } else {
                    var newBuild = newBuilds[0];

                    if (newBuild.name !== prevBuild.name) {
                        self._grid.updateWidget(newBuild);
                    }
                }
            });
        }

        private updateGridForRender(oldBuilds) {
            var self = this;
            var builds = self._builds;

            var added = builds.filter(newBuild => {

                return oldBuilds.filter(prevBuild => {
                    return newBuild.id === prevBuild.id;
                }).length <= 0;
            });

            if (added.length > 0) {
                self.render();
                return true;
            }

            return false;
        }

        private filterBuilds(builds) {
            return builds.filter(function (build) {
                return build.isSelected;
            });
        }
    }
}