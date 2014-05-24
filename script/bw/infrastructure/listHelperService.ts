
/// <reference path='../../../d.ts/bw.d' />

'use strict';

module BW.Infrastructure {

    export class ListHelperService implements BW.IListHelperService {

        public all<R>(list : Array<R>, predicate : (a : R) => boolean) : boolean {

            if(!list || list.length <= 0) return false;

            return list.every(predicate);

        }

        public any<R>(list : Array<R>, predicate : (a : R) => boolean) : boolean {

            if(!list || list.length <= 0) return false;

            return list.some(predicate);

        }

        public filter<R>(list : Array<R>, predicate : (a : R) => boolean) : Array<R> {

            if(!list) return undefined;

            return list.filter(predicate);
        }


        public update<R>(sourceList : Array<R>,
                         targetList : Array<R>,
                         comparer : (a : R, b : R) => boolean,
                         update: (source : R, target : R) => void) : Array<R> {


            if(!sourceList) return targetList;

            if(!targetList) return sourceList;

            targetList.forEach(targetItem => {

                sourceList.filter(sourceItem => comparer(targetItem, sourceItem))
                   .forEach(sourceItem => update(sourceItem, targetItem));
            });

            return sourceList;
        }
    }

}