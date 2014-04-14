
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';


module BW.Modules.Main.Controllers {

    export class MainController {
        public totalColumns : number = 3;
        public builds : Array<IBuild> = null;

        constructor(buildServiceWrapper : BW.IBuildService) {

            this.builds = <Array<IBuild>>[];

            buildServiceWrapper.setStatusNotificationHandler(this.statusNotificationHandler.bind(this));
            buildServiceWrapper.start();

        }

        private statusNotificationHandler(builds : Array<BW.IBuild>, error : Error) {

            this.builds = builds;

        }

    }

}
