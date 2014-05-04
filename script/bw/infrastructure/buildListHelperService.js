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
                    return source.isSelected = target.isSelected;
                };
                this._allPredicate = function (a) {
                    return a.isSelected;
                };
            }
            BuildListHelperService.prototype.all = function (list) {
                return _super.prototype.all.call(this, list, this._allPredicate);
            };

            BuildListHelperService.prototype.updateDefinitionInfo = function (sourceList, targetList) {
                return _super.prototype.update.call(this, sourceList, targetList, this._defaultComparer, this._defaultUpdater);
            };

            BuildListHelperService.prototype.updateDefinition = function (sourceList, targetList) {
                return _super.prototype.update.call(this, sourceList, targetList, this._defaultComparer, this._defaultUpdater);
            };
            return BuildListHelperService;
        })(BW.Infrastructure.ListHelperService);
        Infrastructure.BuildListHelperService = BuildListHelperService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildListHelperService.js.map
