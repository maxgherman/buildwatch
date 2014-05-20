
///<reference path='../../../d.ts/bw.d' />

'use strict';

module BW.Infrastructure {

    export interface ILocalStorage {
        add(key : string, value : Object): void;
        get(key : string) : Object;
        remove(key : string) : void;
    }

    interface IResourceEntry {
        key : string;
        method? : () => Object;
        data? : Object;
    }

    export class StorageHelperService implements BW.ILocalStorageService {

        private _resources;

        public mainKey : string;


        constructor(private _localStorage : ILocalStorage) {

            this._resources = {};
            this.mainKey = "config";
        }

        public addResource<R>(key : string, method : () => R) : void {

            this._resources[key] = <IResourceEntry>{ key : key, method : method};
        }


        public getResource<R>(key : string) : R {

            var entry = <IResourceEntry>this._resources[key];

            return entry ? <R>entry.data : undefined;
        }

        public save() : void {

            var result = Object.getOwnPropertyNames(this._resources)
                .map(key => {
                    var item = this._resources[key];
                    return <IResourceEntry>{ key : key, data : item.method() };
                });

            this._localStorage.add(this.mainKey, result);
        }

        public restore() {

            this._resources = {};

            var data = <Array<IResourceEntry>>this._localStorage.get(this.mainKey);

            if(data) {
                data.forEach(item => {
                    this._resources[item.key] = item;
                });
            }
        }
    }

}