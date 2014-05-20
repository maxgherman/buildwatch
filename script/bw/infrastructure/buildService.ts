
/// <reference path='../../../d.ts/bw.d' />

'use strict';



module BW.Infrastructure {

    export class BuildService implements BW.IBuildService {

        private _definitions = [
            { id : 2, displayName : 'Test Name 1',  definition : 'Test Name 1', statusText : 'InProgress', filtered : undefined , status : BW.BuildStatus.InProgress, definitionUrl: '', requestedBy : 'AAA BBB',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 1, displayName : 'Test Name 1. Some very long build name',  definition : 'Test Name 1',  statusText : 'Succeeded', filtered : undefined , status : BW.BuildStatus.Succeeded, definitionUrl: '', requestedBy : 'CCC DDD',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 4, displayName : 'Test Name 1. Another long name',  definition : 'Test Name 1',   statusText : 'Failed', filtered : undefined , status : BW.BuildStatus.Failed, definitionUrl: '', requestedBy : 'DD EEEE',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 6, displayName : 'Test Name 1. Truk.Ci.Cti.Local',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: '', requestedBy : 'GFFF GGG',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 3, displayName : 'Test Name 1. Testing build length',  definition : 'Test Name 1',   statusText : 'Stopped', filtered : undefined, status : BW.BuildStatus.Stopped , definitionUrl: '', requestedBy : 'KKK LLL',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 5, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'PartiallySucceeded', filtered : undefined , status : BW.BuildStatus.PartiallySucceeded, definitionUrl: '', requestedBy : 'MMM ooo',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 7, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'All', filtered : undefined , status : BW.BuildStatus.All, definitionUrl: '', requestedBy : 'Test User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 8, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'None', filtered : undefined , status : BW.BuildStatus.None, definitionUrl: '', requestedBy : 'User with Name',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 9, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: '', requestedBy : 'Another User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 10, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'Succeeded', filtered :undefined, status : BW.BuildStatus.Succeeded, definitionUrl: '', requestedBy : 'One more User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},


            { id : 11, displayName : 'Test Name 1',  definition : 'Test Name 1', statusText : 'InProgress', filtered : undefined , status : BW.BuildStatus.InProgress, definitionUrl: '', requestedBy : 'AAA BBB',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 12, displayName : 'Test Name 1. Some very long build name',  definition : 'Test Name 1',  statusText : 'Succeeded', filtered : undefined , status : BW.BuildStatus.Succeeded, definitionUrl: '', requestedBy : 'CCC DDD',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 13, displayName : 'Test Name 1. Another long name',  definition : 'Test Name 1',   statusText : 'Failed', filtered : undefined , status : BW.BuildStatus.Failed, definitionUrl: '', requestedBy : 'DD EEEE',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 14, displayName : 'Test Name 1. Truk.Ci.Cti.Local',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: '', requestedBy : 'GFFF GGG',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 15, displayName : 'Test Name 1. Testing build length',  definition : 'Test Name 1',   statusText : 'Stopped', filtered : undefined, status : BW.BuildStatus.Stopped , definitionUrl: '', requestedBy : 'KKK LLL',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 16, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'PartiallySucceeded', filtered : undefined , status : BW.BuildStatus.PartiallySucceeded, definitionUrl: '', requestedBy : 'MMM ooo',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 17, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'All', filtered : undefined , status : BW.BuildStatus.All, definitionUrl: '', requestedBy : 'Test User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 18, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'None', filtered : undefined , status : BW.BuildStatus.None, definitionUrl: '', requestedBy : 'User with Name',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 19, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'NotStarted', filtered : undefined , status : BW.BuildStatus.NotStarted, definitionUrl: '', requestedBy : 'Another User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()},
            { id : 20, displayName : 'Test Name 1',  definition : 'Test Name 1',   statusText : 'Succeeded', filtered :undefined, status : BW.BuildStatus.Succeeded, definitionUrl: '', requestedBy : 'One more User',  startDate : <BW.IDate>new Date(), finishDate : <BW.IDate>new Date()}

        ];

        private _lastSentDefinitions = [];
        private _lastSentBuilds = [];


        public statusNotification() : Rx.IObservable<BW.INotificationResult<Array<BW.IBuildDefinition>>> {

            return Rx.Observable.interval(5000)
                .map<BW.INotificationResult<Array<BW.IBuildDefinition>>>((value, index : number, source) => {

                return {
                    data : this._lastSentBuilds,
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