
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';

module BW.Modules.Main.Controllers {

    export interface  ISettings {
        totalColumns : number;
        trackBroken : boolean;
    }

    export class MainController {

        private _settings : ISettings;

        public builds : Array<IBuildDefinition> = null;
        public definitions : Array<IBuildDefinitionInfo> = null;

        public get settings() : ISettings {
            return this._settings;
        }

        constructor(private _buildServiceWrapper : BW.IBuildServiceExternal,
                    private _listHelperService : BW.IBuildListHelperService) {

            this.builds = [];
            this.definitions = [];
            this._settings = {
                totalColumns : 3,
                trackBroken : false
            };

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

        }

        private statusNotificationError(error : Error) {

        }

        private listNotification(definitions : Array<IBuildDefinitionInfo>) {

            this.definitions =
                this._listHelperService.updateDefinitionInfo(definitions, this.definitions);
        }

        private listNotificationError(error : Error) {

        }



    }

}
