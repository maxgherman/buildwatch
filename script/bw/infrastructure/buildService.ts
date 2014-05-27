
/// <reference path='../../../d.ts/bw.d' />

'use strict';



module BW.Infrastructure {

    export class BuildService implements BW.IBuildService {

        private _definitions = [
            { id : '2', displayName : 'Test Name 1',  definition : 'Test Name 1', statusText : 'InProgress', filtered : true , status : BW.BuildStatus.InProgress, definitionUrl: 'http://InProgress.com.au', requestedBy : 'AAA BBB',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '1', displayName : 'Some very long build name',  definition : 'Test Name 1',  statusText : 'Succeeded', filtered : true , status : BW.BuildStatus.Succeeded, definitionUrl: 'http://success.com.au', requestedBy : 'CCC DDD',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '4', displayName : 'Another long name',  definition : 'Test Name 1',   statusText : 'Failed', filtered : true , status : BW.BuildStatus.Failed, definitionUrl: 'http://failed.com.au', requestedBy : 'DD EEEE',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '6', displayName : 'Truk.Ci.Cti.Local',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : true , status : BW.BuildStatus.NotStarted, definitionUrl: 'http://not-started.com.au', requestedBy : 'GFFF GGG',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '3', displayName : 'Trunc.SIT.CI.CTI. Testing build length',  definition : 'Test Name 1',   statusText : 'Stopped', filtered : true, status : BW.BuildStatus.Stopped , definitionUrl: 'http://stopped.com.au', requestedBy : 'KKK LLL',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '5', displayName : 'Test Build definition name',  definition : 'Test Name 1',   statusText : 'PartiallySucceeded', filtered : true , status : BW.BuildStatus.PartiallySucceeded, definitionUrl: 'http://partially-succeded.com.au', requestedBy : 'MMM ooo',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '7', displayName : 'Buid Definition',  definition : 'Test Name 1',   statusText : 'All', filtered : true , status : BW.BuildStatus.All, definitionUrl: 'http://all.com.au', requestedBy : 'Test User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '8', displayName : 'On CheckIn Build',  definition : 'Test Name 1',   statusText : 'None', filtered : true , status : BW.BuildStatus.None, definitionUrl: 'http://none.com.au', requestedBy : 'User with Name',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '9', displayName : 'Aggregated build',  definition : 'Test Name 1',   statusText : 'InProgress', filtered : true , status : BW.BuildStatus.InProgress, definitionUrl: 'http://not-started.com.au', requestedBy : 'Another User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : '10', displayName : 'Test for build definition name',  definition : 'Test Name 1',   statusText : 'Succeeded', filtered :true, status : BW.BuildStatus.Succeeded, definitionUrl: 'http://succeded.com.au', requestedBy : 'One more User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
        ];

        private _lastSentDefinitions = [];
        private _lastSentBuilds = [];

        public connectNotification() : Rx.IObservable<BW.INotificationResult<boolean>>{
            return Rx.Observable.create(observer => {

                observer.onNext({
                    data : true,
                    success : true,
                    error : undefined
                });
            });
        }

        public disconnectNotification() : Rx.IObservable<BW.INotificationResult<boolean>>{
            return Rx.Observable.create(observer => {

                observer.onNext({
                    data : true,
                    success : true,
                    error : undefined
                });
            });
        }

        public statusNotification() : Rx.IObservable<BW.INotificationResult<Array<BW.IBuildDefinition>>> {

            return Rx.Observable.interval(5000)
                .map<BW.INotificationResult<Array<BW.IBuildDefinition>>>((value, index : number, source) => {

                this._lastSentBuilds.forEach(item => {
                    if(item.status === BW.BuildStatus.InProgress) {
                        item.status = BW.BuildStatus.Failed;
                        item.statusText = "Failed";
                    } else
                    if(item.status === BW.BuildStatus.Failed) {
                        item.status = BW.BuildStatus.InProgress;
                        item.statusText = "InProgress";
                    }
                });

                return {
                    data : this._lastSentBuilds.map(item => this.copyDefinitionData(item)),
                    success : true,
                    error : undefined
                };
            });
        }

        public listNotification() : Rx.IObservable<BW.INotificationResult<Array<BW.IBuildDefinitionInfo>>> {


            return Rx.Observable.create(observer => {

                this._lastSentBuilds =  this._definitions
                    .map(item => this.copyDefinitionData(item));

                observer.onNext({
                    data : this._lastSentBuilds,
                    success : true,
                    error : undefined
                });
                observer.onCompleted();
            });
        }

        public setListNotificationFilter(definitions : Array<BW.IBuildDefinitionInfo>) : void {

            this._lastSentBuilds = this._definitions.filter(item => definitions.some(fItem => fItem.id == item.id))
                .map(item => this.copyDefinitionData(item));

        }

        private copyDefinitionData(definition : IBuildDefinition) : IBuildDefinition {
            return {
                id : definition.id,
                displayName : definition.displayName,
                status : definition.status,
                statusText : definition.statusText,
                definitionUrl: definition.definitionUrl,
                requestedBy: definition.requestedBy,
                definition : definition.definition,
                startDate : definition.startDate,
                finishDate : definition.finishDate,
                filtered: definition.filtered
            };
        }
    }
}