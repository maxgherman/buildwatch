/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Filters) {
                var ItemName = (function () {
                    function ItemName() {
                    }
                    ItemName.prototype.execute = function (data, name) {
                        var searchValue = name.toLowerCase();

                        return data.filter(function (item) {
                            return item && ((item.displayName && item.displayName.toLowerCase().indexOf(searchValue) >= 0) || (item.requestedBy && item.requestedBy.toLowerCase().indexOf(searchValue) >= 0));
                        });
                    };
                    return ItemName;
                })();
                Filters.ItemName = ItemName;
            })(Shared.Filters || (Shared.Filters = {}));
            var Filters = Shared.Filters;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=itemName.js.map
