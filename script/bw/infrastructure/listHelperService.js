/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var ListHelperService = (function () {
            function ListHelperService() {
            }
            ListHelperService.prototype.update = function (source, target, comparer, updateElement) {
                if (target.length <= 0) {
                    target.push.apply(target, source);
                    return;
                }

                var targetBefore = target;
                target.splice(0, target.length);
                target.push.apply(target, source);

                targetBefore.forEach(function (itemBefore) {
                    target.forEach(function (itemAfter) {
                        if (comparer(itemBefore, itemAfter)) {
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
            };

            ListHelperService.prototype.equals = function (listA, listB, comparer) {
                if (!listA || !listB)
                    return false;

                return listA.some(function (itemA, indexA, arrayA) {
                    return listB.some(function (itemB, indexB, arrayB) {
                        return !comparer(itemA, itemB);
                    });
                });
            };
            return ListHelperService;
        })();
        Infrastructure.ListHelperService = ListHelperService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=listHelperService.js.map
