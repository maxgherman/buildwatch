/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var BuildService = (function () {
            function BuildService() {
                this._definitions = [
                    { id: 1, name: 'Test 1', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 2, name: 'Test 2', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 4, name: 'Test 4', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 6, name: 'Test 6', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 3, name: 'Test 3', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 5, name: 'Test 5', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 7, name: 'Test 6', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 8, name: 'Test 7', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 9, name: 'Test 8', isSelected: undefined, status: 3 /* InProgress */, url: '' },
                    { id: 10, name: 'Test 9', isSelected: undefined, status: 3 /* InProgress */, url: '' }
                ];
            }
            BuildService.prototype.statusNotification = function () {
                var _this = this;
                return Rx.Observable.interval(5000).map(function (value, index, source) {
                    return _this._definitions.filter(function (item) {
                        return item.isSelected;
                    }).map(function (item) {
                        return _this.copyDefinitionData(item);
                    });
                });
            };

            BuildService.prototype.listNotification = function () {
                var _this = this;
                return Rx.Observable.interval(5000).map(function (value, index, source) {
                    if (index % 5 == 0) {
                        return _this._definitions.filter(function (item) {
                            return item.id % 2 === 0;
                        }).map(function (item) {
                            return _this.copyDefinitionData(item);
                        });
                    }

                    if (index % 9 == 0) {
                        return _this._definitions.filter(function (item) {
                            return item.id % 3 === 0;
                        }).map(function (item) {
                            return _this.copyDefinitionData(item);
                        });
                    }

                    return _this._definitions.map(function (item) {
                        return _this.copyDefinitionData(item);
                    });
                });
            };

            BuildService.prototype.setListNotificationFilter = function (definitions) {
                var _this = this;
                definitions.forEach(function (item) {
                    _this._definitions.filter(function (serviceDefinition) {
                        return serviceDefinition.id === item.id;
                    }).forEach(function (serviceDefinition) {
                        return serviceDefinition.isSelected = item.isSelected;
                    });
                });
            };

            BuildService.prototype.copyDefinitionData = function (definition) {
                return {
                    id: definition.id,
                    name: definition.name,
                    isSelected: definition.isSelected,
                    status: definition.status,
                    url: definition.url
                };
            };
            return BuildService;
        })();
        Infrastructure.BuildService = BuildService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildService.js.map
