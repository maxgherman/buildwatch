
/// <reference path='../../../d.ts/bw.d' />

'use strict';



module BW.Infrastructure {

    export class BuildService implements BW.IBuildService {

        private _definitions = [
            { id : 2, displayName : 'Test Name 1',  definition : 'Test Name 1', statusText : 'InProgress', filtered : undefined , status : BW.BuildStatus.InProgress, definitionUrl: 'http://InProgress.com.au', requestedBy : 'AAA BBB',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 1, displayName : 'Test Name 1. Some very long build name',  definition : 'Test Name 1',  statusText : 'Succeeded', filtered : undefined , status : BW.BuildStatus.Succeeded, definitionUrl: 'http://success.com.au', requestedBy : 'CCC DDD',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 4, displayName : 'Test Name 1. Another long name',  definition : 'Test Name 1',   statusText : 'Failed', filtered : undefined , status : BW.BuildStatus.Failed, definitionUrl: 'http://failed.com.au', requestedBy : 'DD EEEE',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 6, displayName : 'Test Name 1. Truk.Ci.Cti.Local',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: 'http://not-started.com.au', requestedBy : 'GFFF GGG',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 3, displayName : 'Test Name 1. Testing build length',  definition : 'Test Name 1',   statusText : 'Stopped', filtered : undefined, status : BW.BuildStatus.Stopped , definitionUrl: 'http://stopped.com.au', requestedBy : 'KKK LLL',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 5, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'PartiallySucceeded', filtered : undefined , status : BW.BuildStatus.PartiallySucceeded, definitionUrl: 'http://partially-succeded.com.au', requestedBy : 'MMM ooo',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 7, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'All', filtered : undefined , status : BW.BuildStatus.All, definitionUrl: 'http://all.com.au', requestedBy : 'Test User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 8, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'None', filtered : undefined , status : BW.BuildStatus.None, definitionUrl: 'http://none.com.au', requestedBy : 'User with Name',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 9, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: 'http://not-started.com.au', requestedBy : 'Another User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 10, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'Succeeded', filtered :undefined, status : BW.BuildStatus.Succeeded, definitionUrl: 'http://succeded.com.au', requestedBy : 'One more User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},


            { id : 11, displayName : 'Test Name 1',  definition : 'Test Name 1', statusText : 'InProgress', filtered : undefined , status : BW.BuildStatus.InProgress, definitionUrl: 'http://InProgress.com.au', requestedBy : 'AAA BBB',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 12, displayName : 'Test Name 1. Some very long build name',  definition : 'Test Name 1',  statusText : 'Succeeded', filtered : undefined , status : BW.BuildStatus.Succeeded, definitionUrl: 'http://succeded.com.au', requestedBy : 'CCC DDD',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 13, displayName : 'Test Name 1. Another long name',  definition : 'Test Name 1',   statusText : 'Failed', filtered : undefined , status : BW.BuildStatus.Failed, definitionUrl: 'http://failed.com.au', requestedBy : 'DD EEEE',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 14, displayName : 'Test Name 1. Truk.Ci.Cti.Local',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: 'http://not-started.com.au', requestedBy : 'GFFF GGG',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 15, displayName : 'Test Name 1. Testing build length',  definition : 'Test Name 1',   statusText : 'Stopped', filtered : undefined, status : BW.BuildStatus.Stopped , definitionUrl: 'http://dtopped.com.au', requestedBy : 'KKK LLL',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 16, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'PartiallySucceeded', filtered : undefined , status : BW.BuildStatus.PartiallySucceeded, definitionUrl: 'http://partially-succeded.com.au', requestedBy : 'MMM ooo',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 17, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'All', filtered : undefined , status : BW.BuildStatus.All, definitionUrl: 'http://all.com.au', requestedBy : 'Test User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 18, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'None', filtered : undefined , status : BW.BuildStatus.None, definitionUrl: 'http://none.com.au', requestedBy : 'User with Name',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 19, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: 'http://not-started.com.au', requestedBy : 'Another User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 20, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'Succeeded', filtered :undefined, status : BW.BuildStatus.Succeeded, definitionUrl: 'http://succeded.com.au', requestedBy : 'One more User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()}

        ];

        private _lastSentDefinitions = [];
        private _lastSentBuilds = [];


        public statusNotification() : Rx.IObservable<BW.INotificationResult<Array<BW.IBuildDefinition>>> {

            return Rx.Observable.interval(5000)
                .map<BW.INotificationResult<Array<BW.IBuildDefinition>>>((value, index : number, source) => {

                this._lastSentBuilds.forEach(item => {
                    if(item.status === BW.BuildStatus.InProgress) {
                        item.status = BW.BuildStatus.Failed;
                        item.statusText = "Failed";
                    } else
                    if(item.status === BW.BuildStatus.Succeeded) {
                        item.status = BW.BuildStatus.InProgress;
                        item.statusText = "InProgress";
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

                var lastSentDefinitions =  this._definitions
                    .map(item => this.copyDefinitionData(item));

                observer.onNext({
                    data : lastSentDefinitions,
                    success : true,
                    error : undefined
                });
                observer.onCompleted();
            });
        }

        public setListNotificationFilter(definitions : Array<BW.IBuildDefinitionInfo>) : void {


            var filtered =  definitions.filter(item => item.filtered);

            this._lastSentBuilds = this._definitions.filter(item => filtered.some(fItem => fItem.id == item.id))
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
                finishDate : definition.finishDate
            };
        }
    }
}