
/// <reference path='../../../d.ts/bw.d' />

'use strict';

module BW.Infrastructure {

    export class BuildService implements BW.IBuildService {

        private _statusNotificationHandler : BW.IStatusNotification;

        public setStatusNotificationHandler(handler : BW.IStatusNotification){
            this._statusNotificationHandler = handler;
        }

        public start() {

            var i = 0;

            setInterval(() => {
                if(this._statusNotificationHandler) {

                    var builds = <BW.IBuild[]>[

                        { id : 1, name : 'Test 1' + i, isSelected : false, status : BW.BuildStatus.InProgress },
                        { id : 2, name : 'Test 2'+ i, isSelected : false, status : BW.BuildStatus.InProgress },
                        { id : 3, name : 'Test 3'+ i, isSelected : false, status : BW.BuildStatus.InProgress },
                        { id : 4, name : 'Test 4'+ i, isSelected : false, status : BW.BuildStatus.InProgress },
                        { id : 5, name : 'Test 5'+ i, isSelected : false, status : BW.BuildStatus.InProgress },
                        { id : 6, name : 'Test 6'+ i, isSelected : false, status : BW.BuildStatus.InProgress },
                        { id : 7, name : 'Test 7'+ i, isSelected : false, status : BW.BuildStatus.InProgress }
                    ];

                    this._statusNotificationHandler(builds, undefined);

                    i++;
                }


            }, 1000);
        }
    }
}