
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';


 module BW.Modules.Shared.Filters {


     export class OrderByNameFilter {
         public execute(data : Array<BW.IBuildDefinitionInfo>, reverse : boolean) : Array<BW.IBuildDefinitionInfo>{

             var result = data.map(item => {
                 return item;
             });

             result.sort((a, b) => {

                 if (a && b &&
                     a.name && b.name) {
                     return a.name > b.name ? 1 : (a.name > b.name ? -1 : 0);
                 }

                 if (a &&
                     a.name) {
                     return 1;
                 }

                 return -1;

             });

             if(reverse) {
                 result.reverse();
             }

             return result;
         }
     }
 }