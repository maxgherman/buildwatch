
/// <reference path='rx.lite.d' />


declare module BW {

    enum BuildStatus {
        Success = 1,
        Failed = 2,
        InProgress = 3
    }

    interface IBuildDefinitionInfo {
        id : number;
        name : string;
        isSelected? : boolean;
    }

    interface IBuildDefinition extends  IBuildDefinitionInfo {

        url : string;
        status : BuildStatus;
    }

    interface IBuild extends  IBuildDefinitionInfo {

    }

    interface IListHelperService {
        update<R>(source : Array<R>,
                  target : Array<R>,
                  comparer : (item1 : R, item2 : R) => boolean,
                  updateElement : (source : R, target : R) => void);

        equals<R>(listA : Array<R>, listB : Array<R>, comparer : (a : R, b : R) => boolean) : boolean;
    }


    interface IBuildService {
        statusNotification() : Rx.IObservable<Array<IBuildDefinition>>;
        listNotification() : Rx.IObservable<Array<IBuildDefinitionInfo>>;
        setListNotificationFilter(definitions : Array<BW.IBuildDefinitionInfo>) : void;
    }

    interface IBuildServiceExternal {
        statusNotification(onData : (states : Array<BW.IBuildDefinition>) => void,
                           onError : (error : Error) => void) : void;

        listNotification(onData : (states : Array<BW.IBuildDefinitionInfo>) => void,
                           onError : (error : Error) => void) : void;

        filterListNotifications(value : Array<BW.IBuildDefinitionInfo>) : void;
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

    interface IGridRenderService {
        columns : number;
        builds : Array<BW.IBuild>;
        margin : number;
        maxItemHeight : number;
        load(renderData: IGreedRenderData, grid:BW.IUIGrid) : void;
        render();
        update(builds);
    }

    interface ITab {
        id : number;
        name : string;
        header : string;
        isActive : boolean;
    }

    interface INameFilter {
        (data:Array<BW.IBuildDefinitionInfo>, name:string) : Array<BW.IBuildDefinitionInfo>;
    }
}



