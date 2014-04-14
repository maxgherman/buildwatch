/// <reference path='../../../d.ts/bw.d' />

'use strict';


module BW.Entities {
    export class Build implements BW.IBuild{
        private _id : number;
        private _name : string;
        private _isSelected : boolean;
        private _status : BW.BuildStatus;

        public get id() : number {
            return this._id;
        }

        public set id(value : number) {
            this._id = value;
        }

        public get name() : string {
            return this._name;
        }

        public set name(value : string) {
            this._name = value;
        }

        public get isSelected() : boolean {
            return this._isSelected;
        }

        public set isSelected(value : boolean) {
            this._isSelected = value;
        }

        public get status() : BW.BuildStatus {
            return this._status;
        }

        public set status(value : BW.BuildStatus ) {
            this._status = value;
        }

    }
}
