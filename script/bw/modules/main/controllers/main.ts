
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';


module BW.Modules.Main.Controllers {

    export interface  ISettings {
        totalColumns : number;
        trackBroken : boolean;
    }

    export interface IBlocker {
        text : string;
        subText : string;
        isVisible : boolean;
        show(show: boolean) : void;
    }

    export class MainController {

        private _settings : ISettings;

        private _blocker : IBlocker;

        public builds : Array<IBuildDefinition> = null;
        public definitions : Array<IBuildDefinitionInfo> = null;

        public get settings() : ISettings {
            return this._settings;
        }

        public get blocker() : IBlocker {
            return this._blocker;
        }

        constructor(private _buildServiceWrapper : BW.IBuildServiceExternal,
                    private _listHelperService : BW.IBuildListHelperService) {

            this.builds = [];
            this.definitions = [];
            this._settings = {
                totalColumns : 3,
                trackBroken : false
            };

            this._blocker = new Blocker('Waiting connection ...', true);

            _buildServiceWrapper.statusNotification(this.statusNotification.bind(this),
                                                   this.statusNotificationError.bind(this));

            _buildServiceWrapper.listNotification(this.listNotification.bind(this),
                                                 this.listNotificationError.bind(this));

        }

        public submitFilter() {
            this._buildServiceWrapper.filterListNotifications(this.definitions);
        }

        private statusNotification(builds : Array<IBuildDefinition>) {

           this.builds =
                this._listHelperService.updateDefinition(builds, this.builds);

            this._blocker.show(false);

        }

        private listNotification(definitions : Array<IBuildDefinitionInfo>) {

           this.definitions =
                this._listHelperService.updateDefinitionInfo(definitions, this.definitions);

            this._blocker.show(false);
        }

        private statusNotificationError(error : Error) {
            this._blocker.show(true);
        }

        private listNotificationError(error : Error) {
            this._blocker.show(true);
        }
    }

    class Blocker implements IBlocker {

        public subText : string;

        constructor(public text :string, public isVisible :boolean) { }

        public show(display : boolean) {
            this.isVisible = display;
        }
    }
}
