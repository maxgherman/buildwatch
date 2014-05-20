
/// <reference path='rx.lite.d' />


declare module BW {

    interface IDate extends Date {
        toFormattedString() : string;
    }

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
        displayName : string;
        filtered? : boolean;
    }

    interface IBuildDefinition extends  IBuildDefinitionInfo {
        definition : string;
        definitionUrl : string;
        statusText: string;
        status : BuildStatus;
        requestedBy : string;
        startDate: IDate;
        finishDate : IDate;
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

        filter(list : Array<BW.IBuildDefinitionInfo>, predicate? : (a : BW.IBuildDefinitionInfo) => boolean) : Array<BW.IBuildDefinitionInfo>;
        filterDefinitions(list : Array<BW.IBuildDefinition>, predicate? : (a : BW.IBuildDefinition) => boolean) : Array<BW.IBuildDefinition>;
    }

    interface INotificationResult<T> {
        data : T;
        success : boolean;
        error : Error;
    }


    interface IBuildService {
        statusNotification() : Rx.IObservable<INotificationResult<Array<IBuildDefinition>>>;
        listNotification() : Rx.IObservable<INotificationResult<Array<IBuildDefinitionInfo>>>;
        setListNotificationFilter(definitions : Array<BW.IBuildDefinitionInfo>) : void;
    }

    interface IBuildServiceExternal {
        statusNotification(onData : (result : INotificationResult<Array<BW.IBuildDefinition>>) => void,
                           onError : (error : Error) => void) : void;

        listNotification(onData : (result : INotificationResult<Array<BW.IBuildDefinitionInfo>>) => void,
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
        renderGrid(widgetSize : BW.ISize, size : BW.IGridSize, margin : number, builds : Array<BW.IBuildDefinition>);
        removeWidget(build : BW.IBuildDefinition) : void;
        updateWidget(build : BW.IBuildDefinition) : void;
        buildStatusToCss : (buildStatus : BuildStatus) => string;
        buildClick : (id: number) => void;
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
        (data:Array<BW.IBuildDefinition>, name:string) : Array<BW.IBuildDefinition>;
    }

    interface ILocalStorageService {
        addResource<R>(key : string, method : () => R) : void;
        getResource<R>(key : string) : R;
        save() : void;
        restore() : void;
    }

}



