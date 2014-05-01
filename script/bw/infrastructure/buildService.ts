
/// <reference path='../../../d.ts/bw.d' />

'use strict';


module BW.Infrastructure {

    export class BuildService implements BW.IBuildService {

        private _definitions = [
            { id : 1, name : 'Test 1', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 2, name : 'Test 2', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 4, name : 'Test 4', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 6, name : 'Test 6', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 3, name : 'Test 3', isSelected : undefined, status : BW.BuildStatus.InProgress , url: ''},
            { id : 5, name : 'Test 5', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 7, name : 'Test 6', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 8, name : 'Test 7', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 9, name : 'Test 8', isSelected : undefined , status : BW.BuildStatus.InProgress, url: ''},
            { id : 10, name : 'Test 9', isSelected :undefined, status : BW.BuildStatus.InProgress, url: ''}
        ];


        public statusNotification() : Rx.IObservable<Array<BW.IBuildDefinition>> {

            return Rx.Observable.interval(5000)
                .map<Array<BW.IBuildDefinition>>((value, index : number, source) => {
                return this._definitions.filter(item => item.isSelected)
                            .map(item => this.copyDefinitionData(item));
            });
        }

        public listNotification() : Rx.IObservable<Array<BW.IBuildDefinitionInfo>> {

            return Rx.Observable.interval(5000)
                .map<Array<BW.IBuildDefinitionInfo>>((value, index : number, source) => {

                if(index % 5 == 0) {
                    return this._definitions.filter(item => item.id % 2 === 0)
                        .map(item => this.copyDefinitionData(item));
                }

                if(index % 9 == 0) {
                    return this._definitions.filter(item => item.id % 3 === 0)
                        .map(item => this.copyDefinitionData(item));
                }

                return this._definitions
                    .map(item => this.copyDefinitionData(item));
            });
        }

        public setListNotificationFilter(definitions : Array<BW.IBuildDefinitionInfo>) : void {

            definitions.forEach(item => {

               this._definitions.filter(serviceDefinition => serviceDefinition.id === item.id)
                .forEach(serviceDefinition  => serviceDefinition.isSelected = item.isSelected);

            });
        }

        private copyDefinitionData(definition : IBuildDefinition) : IBuildDefinition {
            return {
                id : definition.id,
                name : definition.name ,
                isSelected : definition.isSelected ,
                status : definition.status,
                url: definition.url
            };
        }
    }
}