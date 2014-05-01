
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';

module BW.Modules.Shared.Filters {

    export interface IItemName {
        execute : BW.INameFilter;
    }

    export class ItemName implements IItemName {

        public execute(data : Array<BW.IBuildDefinitionInfo>,  name : string) : Array<BW.IBuildDefinitionInfo> {

            return data.filter(item => {

                return item && item.name ? item.name.indexOf(name) >= 0 : false;

            });

        }
    }
}