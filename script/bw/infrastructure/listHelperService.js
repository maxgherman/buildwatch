/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var ListHelperService = (function () {
            function ListHelperService() {
            }
            ListHelperService.prototype.all = function (list, predicate) {
                if (!list || list.length <= 0)
                    return false;

                return list.every(predicate);
            };

            ListHelperService.prototype.any = function (list, predicate) {
                if (!list || list.length <= 0)
                    return false;

                return list.some(predicate);
            };

            ListHelperService.prototype.filter = function (list, predicate) {
                if (!list)
                    return undefined;

                return list.filter(predicate);
            };

            ListHelperService.prototype.update = function (sourceList, targetList, comparer, update) {
                if (!sourceList)
                    return targetList;

                if (!targetList)
                    return sourceList;

                targetList.forEach(function (targetItem) {
                    sourceList.filter(function (sourceItem) {
                        return comparer(targetItem, sourceItem);
                    }).forEach(function (sourceItem) {
                        return update(sourceItem, targetItem);
                    });
                });

                return sourceList;
            };
            return ListHelperService;
        })();
        Infrastructure.ListHelperService = ListHelperService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=listHelperService.js.map
