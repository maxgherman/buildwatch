
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';

module BW.Modules.Shared.Filters {

    export class BuildNameFilter {

        public execute(data : Array<IBuild>,  name : string) : Array<BW.IBuild> {

            return data.filter(item => {

                return item && item.name ? item.name.indexOf(name) >= 0 : false;

            });

        }
    }
}