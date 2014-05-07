/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var BuildService = (function () {
            function BuildService() {
                this._definitions = [
                    { id: 1, name: 'Test 1', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 2, name: 'Test 2', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 4, name: 'Test 4', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 6, name: 'Test 6', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 3, name: 'Test 3', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 5, name: 'Test 5', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 7, name: 'Test 6', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 8, name: 'Test 7', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 9, name: 'Test 8', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' },
                    { id: 10, name: 'Test 9', isSelected: undefined, status: 1 /* InProgress */, url: '', triggeredBy: 'Test User' }
                ];
                this._lastSent = [];
            }
            BuildService.prototype.statusNotification = function () {
                var _this = this;
                return Rx.Observable.interval(5000).map(function (value, index, source) {
                    return _this._lastSent.filter(function (item) {
                        return item.isSelected;
                    }).map(function (item) {
                        return _this.copyDefinitionData(item, false);
                    });
                });
            };

            BuildService.prototype.listNotification = function () {
                var _this = this;
                return Rx.Observable.interval(5000).map(function (value, index, source) {
                    if (index % 5 == 0) {
                        _this._lastSent = _this._definitions.filter(function (item) {
                            return item.id % 2 === 0;
                        }).map(function (item) {
                            return _this.copyDefinitionData(item);
                        });
                    } else if (index % 9 == 0) {
                        _this._lastSent = _this._definitions.filter(function (item) {
                            return item.id % 3 === 0;
                        }).map(function (item) {
                            return _this.copyDefinitionData(item);
                        });
                    } else
                        _this._lastSent = _this._definitions.map(function (item) {
                            return _this.copyDefinitionData(item);
                        });

                    return _this._lastSent;
                });
            };

            BuildService.prototype.setListNotificationFilter = function (definitions) {
                var _this = this;
                definitions.forEach(function (item) {
                    _this._lastSent.filter(function (serviceDefinition) {
                        return serviceDefinition.id === item.id;
                    }).forEach(function (serviceDefinition) {
                        return serviceDefinition.isSelected = item.isSelected;
                    });
                });
            };

            BuildService.prototype.copyDefinitionData = function (definition, copySelectedField) {
                if (typeof copySelectedField === "undefined") { copySelectedField = true; }
                return {
                    id: definition.id,
                    name: definition.name,
                    isSelected: copySelectedField ? definition.isSelected : undefined,
                    status: definition.status,
                    url: definition.url,
                    triggeredBy: definition.triggeredBy
                };
            };
            return BuildService;
        })();
        Infrastructure.BuildService = BuildService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildService.js.map
