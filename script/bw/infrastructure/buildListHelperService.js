///<reference path='./listHelperService' />
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BW;
(function (BW) {
    (function (Infrastructure) {
        var BuildListHelperService = (function (_super) {
            __extends(BuildListHelperService, _super);
            function BuildListHelperService() {
                _super.apply(this, arguments);
                this._defaultComparer = function (a, b) {
                    return a.id == b.id;
                };
                this._defaultUpdater = function (source, target) {
                    return source.filtered = target.filtered;
                };
                this._defaultPredicate = function (a) {
                    return a.filtered;
                };
            }
            BuildListHelperService.prototype.all = function (list, predicate) {
                if (typeof predicate === "undefined") { predicate = this._defaultPredicate; }
                return _super.prototype.all.call(this, list, predicate);
            };

            BuildListHelperService.prototype.updateDefinitionInfo = function (sourceList, targetList, comparer, updater) {
                if (typeof comparer === "undefined") { comparer = this._defaultComparer; }
                if (typeof updater === "undefined") { updater = this._defaultUpdater; }
                return _super.prototype.update.call(this, sourceList, targetList, comparer, updater);
            };

            BuildListHelperService.prototype.updateDefinition = function (sourceList, targetList, comparer, updater) {
                if (typeof comparer === "undefined") { comparer = this._defaultComparer; }
                if (typeof updater === "undefined") { updater = this._defaultUpdater; }
                return _super.prototype.update.call(this, sourceList, targetList, comparer, updater);
            };

            BuildListHelperService.prototype.filter = function (list, predicate) {
                if (typeof predicate === "undefined") { predicate = this._defaultPredicate; }
                return _super.prototype.filter.call(this, list, predicate);
            };

            BuildListHelperService.prototype.filterDefinitions = function (list, predicate) {
                if (typeof predicate === "undefined") { predicate = this._defaultPredicate; }
                return _super.prototype.filter.call(this, list, predicate);
            };
            return BuildListHelperService;
        })(BW.Infrastructure.ListHelperService);
        Infrastructure.BuildListHelperService = BuildListHelperService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildListHelperService.js.map
