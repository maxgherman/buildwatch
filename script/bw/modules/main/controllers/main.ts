
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';

module BW.Modules.Main.Controllers {

    export class MainController {
        public totalColumns : number = 3;
        public builds : Array<IBuild> = null;
        public definitions : Array<IBuildDefinitionInfo> = null;

        constructor(private _buildServiceWrapper : BW.IBuildServiceExternal, private listHelperService : BW.IListHelperService) {

            this.builds = <Array<IBuild>>[];
            this.definitions = <Array<IBuildDefinition>>[];

            _buildServiceWrapper.statusNotification(this.statusNotification.bind(this),
                                                   this.statusNotificationError.bind(this));

            _buildServiceWrapper.listNotification(this.listNotification.bind(this),
                                                 this.listNotificationError.bind(this));

        }

        public submitFilter() {
            this._buildServiceWrapper.filterListNotifications(this.definitions);
        }

        private statusNotification(builds : Array<IBuild>) {

            this.builds = builds;
        }

        private statusNotificationError(error : Error) {

        }

        private listNotification(definitions : Array<IBuildDefinitionInfo>) {

            this.definitions = definitions;
        }

        private listNotificationError(error : Error) {

        }



    }

}
