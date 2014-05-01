/// <reference path='../../../../../d.ts/bw.d' />
/// <reference path='../../../infrastructure/buildService' />

'use strict';

module BW.Modules.Shared.Services {


    interface IRootScope {
        $apply(action : () => void);
    }

    export class BuildService {

        public execute() {

            var body = this.body.bind(this);

            return {
               $get : ['$rootScope', 'buildService',  body]
        };

        }

        private body($rootScope : IRootScope, buildService : BW.IBuildService) : BW.IBuildServiceExternal {

            var self = this;

            return  <BW.IBuildServiceExternal>{

                statusNotification(onData : (states : Array<BW.IBuildDefinitionInfo>) => void,
                                   onError : (error : Error) => void) : void {

                    buildService.statusNotification()
                    .subscribe(
                        states => {

                           self.applyScope($rootScope, states, onData);
                        },
                        error => {

                            self.applyScope($rootScope, error, onError);
                        }
                    );
                },

                listNotification(onData : (states : Array<BW.IBuildDefinitionInfo>) => void,
                                 onError : (error : Error) => void) : void {

                    buildService.listNotification()
                        .subscribe(
                        list => {

                            self.applyScope($rootScope, list, onData);
                        },
                        error => {

                            self.applyScope($rootScope, error, onError);
                        }
                    );

                },

                filterListNotifications(value : Array<BW.IBuildDefinitionInfo>) : void {

                    buildService.setListNotificationFilter(value);
                }
            }
        }

        private applyScope<R>($rootScope : IRootScope, data : R, action : (data : R) => void) {

            $rootScope.$apply(() => {
                action(data);
            });

        }
    }

}
