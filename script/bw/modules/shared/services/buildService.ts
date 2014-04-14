/// <reference path='../../../../../d.ts/bw.d' />
/// <reference path='../../../infrastructure/buildService' />

'use strict';

module BW.Modules.Shared.Services {


    export class BuildService {

        public execute() {

            var body = this.body.bind(this);

            return {
               $get : ['$rootScope', 'buildService',  body]
            };

        }

        private body($rootScope, buildService : BW.IBuildService) {
            return <BW.IBuildService> {
                setStatusNotificationHandler : (value : BW.IStatusNotification) => {

                    buildService.setStatusNotificationHandler((builds : Array<BW.IBuild>, error : Error) => {

                        $rootScope.$apply(() => {
                            value(builds, error);
                        });

                    });
                },

                start : buildService.start.bind(buildService)
            }
        }
    }


    export class BuildService2 {

        public execute() : ($rootScope, buildService : BW.IBuildService) => BW.IBuildService {

            return  this.body.bind(this);

        }

        private body($rootScope, buildService : BW.IBuildService) {
            return <BW.IBuildService> {
                setStatusNotificationHandler : (value : BW.IStatusNotification) => {

                    buildService.setStatusNotificationHandler((builds : Array<BW.IBuild>, error : Error) => {

                        $rootScope.$apply(() => {
                            value(builds, error);
                        });

                    });
                },

                start : buildService.start.bind(buildService)
            }
        }
    }
}
