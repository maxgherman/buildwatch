/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Filters) {
                var BuildNameFilter = (function () {
                    function BuildNameFilter() {
                    }
                    BuildNameFilter.prototype.execute = function (data, name) {
                        return data.filter(function (item) {
                            return item && item.name ? item.name.indexOf(name) >= 0 : false;
                        });
                    };
                    return BuildNameFilter;
                })();
                Filters.BuildNameFilter = BuildNameFilter;
            })(Shared.Filters || (Shared.Filters = {}));
            var Filters = Shared.Filters;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=buildName.js.map
