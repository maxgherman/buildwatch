/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var BuildService = (function () {
            function BuildService() {
            }
            BuildService.prototype.setStatusNotificationHandler = function (handler) {
                this._statusNotificationHandler = handler;
            };

            BuildService.prototype.start = function () {
                var _this = this;
                var i = 0;

                setInterval(function () {
                    if (_this._statusNotificationHandler) {
                        var builds = [
                            { id: 1, name: 'Test 1' + i, isSelected: false, status: 3 /* InProgress */ },
                            { id: 2, name: 'Test 2' + i, isSelected: false, status: 3 /* InProgress */ },
                            { id: 3, name: 'Test 3' + i, isSelected: false, status: 3 /* InProgress */ },
                            { id: 4, name: 'Test 4' + i, isSelected: false, status: 3 /* InProgress */ },
                            { id: 5, name: 'Test 5' + i, isSelected: false, status: 3 /* InProgress */ },
                            { id: 6, name: 'Test 6' + i, isSelected: false, status: 3 /* InProgress */ },
                            { id: 7, name: 'Test 7' + i, isSelected: false, status: 3 /* InProgress */ }
                        ];

                        _this._statusNotificationHandler(builds, undefined);

                        i++;
                    }
                }, 1000);
            };
            return BuildService;
        })();
        Infrastructure.BuildService = BuildService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildService.js.map
