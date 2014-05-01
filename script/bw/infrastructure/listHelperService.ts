
/// <reference path='../../../d.ts/bw.d' />

'use strict';

module BW.Infrastructure {

    export class ListHelperService implements BW.IListHelperService {

        public update<R>(source : Array<R>,
                         target : Array<R>,
                         comparer : (item1 : R, item2 : R) => boolean,
                         updateElement : (source : R, target : R) => void) {


            if(target.length <= 0) {
                target.push.apply(target, source);
                return;
            }


            var targetBefore = target;
            target.splice(0, target.length);
            target.push.apply(target, source);

            targetBefore.forEach(itemBefore => {

                target.forEach(itemAfter => {

                    if(comparer(itemBefore, itemAfter)) {
                        updateElement(itemAfter, itemBefore);
                    }
                });


            });



//            source.forEach(sourceItem => {
//
//                target.filter(targetItem => comparer(targetItem, sourceItem))
//                    .forEach(targetItem => updateElement(sourceItem, targetItem));
//
//                target.filter(targetItem => !comparer(targetItem, sourceItem))
//                    .forEach(targetItem => source.push(targetItem));
//            });
//
//
//            source.forEach(sourceItem => {
//
//                target.filter(targetItem => !comparer(sourceItem, targetItem))
//                    .forEach(targetItem => {
//                        var index = target.indexOf(targetItem);
//                        target.splice(index, 1);
//                    });
//            });


//            target.forEach(targetItem => {
//
//                source.filter(sourceItem => !comparer(sourceItem, targetItem))
//                    .forEach(sourceItem => {
//                        var index = source.indexOf(sourceItem);
//                        source.splice(index, 1);
//                    });
//            });
        }

        public equals<R>(listA : Array<R>, listB : Array<R>, comparer : (a : R, b : R) => boolean) : boolean {

            if(!listA || !listB) return false;

            return listA.some((itemA, indexA, arrayA) =>
                listB.some((itemB, indexB, arrayB) => !comparer(itemA, itemB)));

        }
    }

}