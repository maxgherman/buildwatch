/// <reference path='../../../../../d.ts/bw.d' />
/// <reference path='../../../../../d.ts/angular.d.ts' />
/// <reference path='../../../infrastructure/buildService' />

'use strict';

module BW.Modules.Shared.Services {

   export class BuildServiceWrapper {

        public execute() {

            var body = this.body.bind(this);

            return {
               $get : ['$rootScope', 'buildService', body]
            };

        }

        private body($rootScope : ng.IScope, buildService : BW.IBuildService) : BW.IBuildServiceExternal {

            var self = this;

            return  <BW.IBuildServiceExternal>{

                statusNotification(onData : (result : BW.INotificationResult<Array<BW.IBuildDefinitionInfo>>) => void,
                                   onError : (error : Error) => void) : void {

                    buildService.statusNotification()
                    .subscribe(
                        states => {

                           self.applyScope($rootScope, states, onData);
                        },
                        error => {

                            console.error(error.toString());

                            self.applyScope($rootScope, error, onError);
                        }
                    );
                },

                listNotification(onData : (result : BW.INotificationResult<Array<BW.IBuildDefinitionInfo>>) => void,
                                 onError : (error : Error) => void) : void {

                    buildService.listNotification()
                        .subscribe(
                        list => {

                            self.applyScope($rootScope, list, onData);
                        },
                        error => {

                            console.error(error.toString());

                            self.applyScope($rootScope, error, onError);
                        }
                    );

                },

                filterListNotifications(value : Array<BW.IBuildDefinitionInfo>) : void {

                    buildService.setListNotificationFilter(value);
                }
            }
        }

        private applyScope<R>($rootScope : ng.IScope, data : R, action : (data : R) => void) {

            var phase = $rootScope.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                action(data);
            } else {

                $rootScope.$apply(() => {
                    action(data);
                });
            }
        }
    }

}
