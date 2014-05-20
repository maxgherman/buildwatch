///<reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var StorageHelperService = (function () {
            function StorageHelperService(_localStorage) {
                this._localStorage = _localStorage;
                this._resources = {};
                this.mainKey = "config";
            }
            StorageHelperService.prototype.addResource = function (key, method) {
                this._resources[key] = { key: key, method: method };
            };

            StorageHelperService.prototype.getResource = function (key) {
                var entry = this._resources[key];

                return entry ? entry.data : undefined;
            };

            StorageHelperService.prototype.save = function () {
                var _this = this;
                var result = Object.getOwnPropertyNames(this._resources).map(function (key) {
                    var item = _this._resources[key];
                    return { key: key, data: item.method() };
                });

                this._localStorage.add(this.mainKey, result);
            };

            StorageHelperService.prototype.restore = function () {
                var _this = this;
                this._resources = {};

                var data = this._localStorage.get(this.mainKey);

                if (data) {
                    data.forEach(function (item) {
                        _this._resources[item.key] = item;
                    });
                }
            };
            return StorageHelperService;
        })();
        Infrastructure.StorageHelperService = StorageHelperService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=storageService.js.map
