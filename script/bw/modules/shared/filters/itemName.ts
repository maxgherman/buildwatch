
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';


module BW.Modules.Shared.Filters {

    export interface IItemName {
        execute : BW.INameFilter;
    }

    export class ItemName implements IItemName {

        public execute(data : Array<BW.IBuildDefinition>,  name : string) : Array<BW.IBuildDefinition> {

            var searchValue = name.toLowerCase();

            return data.filter(item => {

                return item &&
                ( (item.displayName && item.displayName.toLowerCase().indexOf(searchValue) >= 0) ||
                   (item.requestedBy && item.requestedBy.toLowerCase().indexOf(searchValue) >= 0)
                );
            });

        }
    }
}