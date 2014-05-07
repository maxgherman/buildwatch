
/// <reference path='rx.lite.d' />


declare module BW {

    enum BuildStatus {
        None = 0,
        InProgress = 1,
        Succeeded = 2,
        PartiallySucceeded = 4,
        Failed = 8,
        Stopped = 16,
        NotStarted = 32,
        All = 63
    }

    interface IBuildDefinitionInfo {
        id : number;
        name : string;
        isSelected? : boolean;
    }

    interface IBuildDefinition extends  IBuildDefinitionInfo {

        url : string;
        status : BuildStatus;
        triggeredBy : string
    }

    interface IListHelperService {

        update<R>(newList : Array<R>,
                  oldList : Array<R>,
                  comparer : (a : R, b : R) => boolean,
                  update: (newEl : R, oldEl : R) => void) : Array<R>;

        all<R>(list : Array<R>, predicate : (a : R) => boolean);

        filter<R>(list : Array<R>, predicate : (a : R) => boolean) : Array<R>;
    }

    interface IBuildListHelperService {
        all(list : Array<BW.IBuildDefinition>, predicate? : (a : BW.IBuildDefinition) => boolean) : boolean;

        updateDefinitionInfo(sourceList : Array<BW.IBuildDefinitionInfo>,
                             targetList : Array<BW.IBuildDefinitionInfo>,
                             comparer? : (a : BW.IBuildDefinitionInfo, b : BW.IBuildDefinitionInfo) => boolean,
                             updater? : (a : BW.IBuildDefinitionInfo, b : BW.IBuildDefinitionInfo) => void) : Array<BW.IBuildDefinitionInfo>;

        updateDefinition(sourceList : Array<BW.IBuildDefinition>,
                         targetList : Array<BW.IBuildDefinition>,
                         comparer? : (a : BW.IBuildDefinition, b : BW.IBuildDefinition) => boolean,
                         updater? : (a : BW.IBuildDefinition, b : BW.IBuildDefinition) => void) : Array<BW.IBuildDefinition>;

        filter(list : Array<BW.IBuildDefinitionInfo>, predicate? : (a : BW.IBuildDefinitionInfo) => boolean) : Array<BW.IBuildDefinitionInfo>
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
        builds: Array<BW.IBuildDefinition>;
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
        addWidget(build : BW.IBuildDefinition, size : BW.IGridSize, x : number, y : number) : void;
        removeWidget(build : BW.IBuildDefinition) : void;
        updateWidget(build : BW.IBuildDefinition) : void;
    }

    interface IGridRenderService {
        columns : number;
        builds : Array<BW.IBuildDefinition>;
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



