
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';


module BW.Modules.Main.Controllers {

    export class MainController {

        private _totalColumns : number;
        private _trackBroken : boolean;
        private _blocker : IBlocker;
        private _builds : Array<IBuildDefinition> = null;
        private _currentBuildId : number;

        public currentBuild : BW.IBuildDefinition;
        public definitions : Array<IBuildDefinitionInfo> = null;
        public buildsNotification : BW.INotificationResult<Array<IBuildDefinition>>;


        public get currentBuildId() : number {
            return this._currentBuildId;
        }

        public set currentBuildId(value: number) {
            this._currentBuildId = value;

            this.updateCurrentBuild();
        }


        public get totalColumns() : number {
            return this._totalColumns;
        }

        public set totalColumns(value: number) {
            this._totalColumns = value;

            this.saveSettings();
        }

        public get trackBroken() : boolean {
            return this._trackBroken;

            this._storageService.save();
        }

        public set trackBroken(value: boolean) {
            this._trackBroken = value;

            this.saveSettings();

            if(value) {
                this._listHelperService.updateBroken(this._builds);
            } else {
                this._listHelperService.updateAll(this._builds);
            }
        }

        public get blocker() : IBlocker {
            return this._blocker;
        }

        public get builds() : Array<IBuildDefinition> {
            return this._builds;
        }

        public set builds(value : Array<IBuildDefinition>) {
            this._builds = value;
        }

        constructor(private _buildServiceWrapper : BW.IBuildServiceExternal,
                    private _listHelperService : BW.IBuildListHelperService,
                    private _storageService : BW.ILocalStorageService) {

            this.definitions = [];
            this._blocker = new Blocker('Waiting connection ...', true);

            this.restoreSettings();

            this.setStatusNotifications();
            this.getDefinitionNotifications();
        }

        public submitFilter() {
            this._buildServiceWrapper.filterListNotifications(this.definitions);
        }

        private statusNotification(notification : BW.INotificationResult<Array<IBuildDefinition>>) {

            if(notification.success) {

                var result = this._listHelperService.updateDefinition(notification.data, this.builds);

                if(this.trackBroken) {

                    this._listHelperService.updateBroken(result);
                }

                this._builds = result;

                this.updateCurrentBuild();

                this.buildsNotification = {
                    data : result,
                    success :true
                };

            } else {
                this.blocker.subText = notification.error.message;
            }

            this._blocker.show(!notification.success);
        }

        private listNotification(notification : BW.INotificationResult<Array<IBuildDefinitionInfo>>) {

            if(notification.success) {
                this.definitions =
                    this._listHelperService.updateDefinitionInfo(notification.data, this.definitions);
            } else {
                this.blocker.subText = notification.error.message;
            }

            if(!notification.success) {
                this._blocker.show(true);
            }
        }

        private statusNotificationError(error : Error) {

            var message = 'Error getting build status notification';
            this._blocker.subText = message;

            this._blocker.show(true);

            this.setStatusNotifications();
        }

        private listNotificationError(error : Error) {

            var message = 'Error getting definition list notification';
            this._blocker.subText = message;

            this._blocker.show(true);

            this.getDefinitionNotifications();
        }

        private setStatusNotifications() {
            this._buildServiceWrapper.statusNotification(this.statusNotification.bind(this),
                this.statusNotificationError.bind(this));
        }

        public getDefinitionNotifications() {
            this._buildServiceWrapper.listNotification(this.listNotification.bind(this),
                this.listNotificationError.bind(this));
        }

        public saveSettings() {
            this._storageService.save();
        }

        private restoreSettings() {
            this._storageService.restore();

            var totalColumns = this._storageService.getResource<number>("totalColumns");
            this._totalColumns = totalColumns || 3;

            var trackBroken = this._storageService.getResource<boolean>("trackBroken");
            this._trackBroken = trackBroken || false;


            var builds =  this._storageService.getResource<Array<BW.IBuildDefinition>>("builds");
            if(builds) {
                this._builds = builds.map(item => {
                    return {
                        id : item.id,
                        displayName : item.displayName,
                        definition :  undefined,
                        status : BW.BuildStatus.None,
                        statusText : 'None',
                        filtered : true,
                        definitionUrl : undefined,
                        requestedBy : undefined,
                        startDate : undefined,
                        finishDate : undefined
                    };
                })
            } else {
                this._builds = [];
            }

            this._storageService.addResource("totalColumns", () => this._totalColumns);
            this._storageService.addResource("trackBroken", () => this._trackBroken);
            this._storageService.addResource("builds", () => {

                var filtered = this._listHelperService.filter(this._builds);

                return filtered.map(item => { return {id : item.id, displayName : item.displayName}});
            });
        }

        private updateCurrentBuild() {

            var builds = this._listHelperService.filterDefinitions(this._builds, item => item.id === this._currentBuildId);

            if(builds.length > 0) {
                this.currentBuild = builds[0];
            }
        }

    }



    export interface IBlocker {
        text : string;
        subText : string;
        isVisible : boolean;
        show(show: boolean) : void;
    }


    class Blocker implements IBlocker {

        public subText : string;

        constructor(public text :string, public isVisible :boolean) { }

        public show(display : boolean) {

            if(!display) {
                this.subText = '';
            }

            this.isVisible = display;
        }
    }
}
