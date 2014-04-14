
declare module BW {

    enum BuildStatus {
        Success = 1,
        Failed = 2,
        InProgress = 3
    }

    interface IBuild {
        id : number;
        name : string;
        isSelected : boolean;
        status : BuildStatus;
    }

    interface IStatusNotification {
        (builds : Array<IBuild>, error : Error) : void;
    }

    interface IBuildService {
        setStatusNotificationHandler(handler : IStatusNotification) : void;
        start() : void;
    }


    interface IGreedRenderData {

        columns: number;
        builds: Array<BW.IBuild>;
        margin: number;
        maxItemHeight : number;
    }

    interface ISize {
        width : number;
        height : number;
    }

    interface IGridSize {
        columns : number;
        rows : number;
    }

    interface IUIGrid {
        load(parent : HTMLElement) : void;
        resetFrameSize() : BW.ISize;
        renderGrid(widgetSize : BW.ISize, margin : number) : void;
        addWidget(build : BW.IBuild, size : BW.IGridSize, x : number, y : number) : void;
        removeWidget(build : BW.IBuild) : void;
        updateWidget(build : BW.IBuild) : void;
    }

    export interface IGridRenderService {
        columns : number;
        builds : Array<BW.IBuild>;
        margin : number;
        maxItemHeight : number;
        load(renderData: IGreedRenderData, grid:BW.IUIGrid) : void;
        render();
        update(builds);
    }

}



