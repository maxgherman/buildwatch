/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Entities) {
        var Build = (function () {
            function Build() {
            }
            Object.defineProperty(Build.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Build.prototype, "name", {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Build.prototype, "isSelected", {
                get: function () {
                    return this._isSelected;
                },
                set: function (value) {
                    this._isSelected = value;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Build.prototype, "status", {
                get: function () {
                    return this._status;
                },
                set: function (value) {
                    this._status = value;
                },
                enumerable: true,
                configurable: true
            });

            return Build;
        })();
        Entities.Build = Build;
    })(BW.Entities || (BW.Entities = {}));
    var Entities = BW.Entities;
})(BW || (BW = {}));
//# sourceMappingURL=build.js.map
