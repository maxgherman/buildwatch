/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Filters) {
                var OrderByNameFilter = (function () {
                    function OrderByNameFilter() {
                    }
                    OrderByNameFilter.prototype.execute = function (data, reverse) {
                        var result = data.map(function (item) {
                            return item;
                        });

                        result.sort(function (a, b) {
                            if (a && b && a.name && b.name) {
                                return a.name > b.name ? 1 : (a.name > b.name ? -1 : 0);
                            }

                            if (a && a.name) {
                                return 1;
                            }

                            return -1;
                        });

                        if (reverse) {
                            result.reverse();
                        }

                        return result;
                    };
                    return OrderByNameFilter;
                })();
                Filters.OrderByNameFilter = OrderByNameFilter;
            })(Shared.Filters || (Shared.Filters = {}));
            var Filters = Shared.Filters;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=orderName.js.map
