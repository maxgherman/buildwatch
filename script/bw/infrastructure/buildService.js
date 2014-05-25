/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var BuildService = (function () {
            function BuildService() {
                this._definitions = [
                    { id: 2, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'InProgress', filtered: undefined, status: 1 /* InProgress */, definitionUrl: 'http://InProgress.com.au', requestedBy: 'AAA BBB', startDate: new Date(), finishDate: new Date() },
                    { id: 1, displayName: 'Test Name 1. Some very long build name', definition: 'Test Name 1', statusText: 'Succeeded', filtered: undefined, status: 2 /* Succeeded */, definitionUrl: 'http://success.com.au', requestedBy: 'CCC DDD', startDate: new Date(), finishDate: new Date() },
                    { id: 4, displayName: 'Test Name 1. Another long name', definition: 'Test Name 1', statusText: 'Failed', filtered: undefined, status: 8 /* Failed */, definitionUrl: 'http://failed.com.au', requestedBy: 'DD EEEE', startDate: new Date(), finishDate: new Date() },
                    { id: 6, displayName: 'Test Name 1. Truk.Ci.Cti.Local', definition: 'Test Name 1', statusText: 'NotStarted', filtered: undefined, status: 32 /* NotStarted */, definitionUrl: 'http://not-started.com.au', requestedBy: 'GFFF GGG', startDate: new Date(), finishDate: new Date() },
                    { id: 3, displayName: 'Test Name 1. Testing build length', definition: 'Test Name 1', statusText: 'Stopped', filtered: undefined, status: 16 /* Stopped */, definitionUrl: 'http://stopped.com.au', requestedBy: 'KKK LLL', startDate: new Date(), finishDate: new Date() },
                    { id: 5, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'PartiallySucceeded', filtered: undefined, status: 4 /* PartiallySucceeded */, definitionUrl: 'http://partially-succeded.com.au', requestedBy: 'MMM ooo', startDate: new Date(), finishDate: new Date() },
                    { id: 7, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'All', filtered: undefined, status: 63 /* All */, definitionUrl: 'http://all.com.au', requestedBy: 'Test User', startDate: new Date(), finishDate: new Date() },
                    { id: 8, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'None', filtered: undefined, status: 0 /* None */, definitionUrl: 'http://none.com.au', requestedBy: 'User with Name', startDate: new Date(), finishDate: new Date() },
                    { id: 9, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'NotStarted', filtered: undefined, status: 32 /* NotStarted */, definitionUrl: 'http://not-started.com.au', requestedBy: 'Another User', startDate: new Date(), finishDate: new Date() },
                    { id: 10, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'Succeeded', filtered: undefined, status: 2 /* Succeeded */, definitionUrl: 'http://succeded.com.au', requestedBy: 'One more User', startDate: new Date(), finishDate: new Date() },
                    { id: 11, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'InProgress', filtered: undefined, status: 1 /* InProgress */, definitionUrl: 'http://InProgress.com.au', requestedBy: 'AAA BBB', startDate: new Date(), finishDate: new Date() },
                    { id: 12, displayName: 'Test Name 1. Some very long build name', definition: 'Test Name 1', statusText: 'Succeeded', filtered: undefined, status: 2 /* Succeeded */, definitionUrl: 'http://succeded.com.au', requestedBy: 'CCC DDD', startDate: new Date(), finishDate: new Date() },
                    { id: 13, displayName: 'Test Name 1. Another long name', definition: 'Test Name 1', statusText: 'Failed', filtered: undefined, status: 8 /* Failed */, definitionUrl: 'http://failed.com.au', requestedBy: 'DD EEEE', startDate: new Date(), finishDate: new Date() },
                    { id: 14, displayName: 'Test Name 1. Truk.Ci.Cti.Local', definition: 'Test Name 1', statusText: 'NotStarted', filtered: undefined, status: 32 /* NotStarted */, definitionUrl: 'http://not-started.com.au', requestedBy: 'GFFF GGG', startDate: new Date(), finishDate: new Date() },
                    { id: 15, displayName: 'Test Name 1. Testing build length', definition: 'Test Name 1', statusText: 'Stopped', filtered: undefined, status: 16 /* Stopped */, definitionUrl: 'http://dtopped.com.au', requestedBy: 'KKK LLL', startDate: new Date(), finishDate: new Date() },
                    { id: 16, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'PartiallySucceeded', filtered: undefined, status: 4 /* PartiallySucceeded */, definitionUrl: 'http://partially-succeded.com.au', requestedBy: 'MMM ooo', startDate: new Date(), finishDate: new Date() },
                    { id: 17, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'All', filtered: undefined, status: 63 /* All */, definitionUrl: 'http://all.com.au', requestedBy: 'Test User', startDate: new Date(), finishDate: new Date() },
                    { id: 18, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'None', filtered: undefined, status: 0 /* None */, definitionUrl: 'http://none.com.au', requestedBy: 'User with Name', startDate: new Date(), finishDate: new Date() },
                    { id: 19, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'NotStarted', filtered: undefined, status: 32 /* NotStarted */, definitionUrl: 'http://not-started.com.au', requestedBy: 'Another User', startDate: new Date(), finishDate: new Date() },
                    { id: 20, displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'Succeeded', filtered: undefined, status: 2 /* Succeeded */, definitionUrl: 'http://succeded.com.au', requestedBy: 'One more User', startDate: new Date(), finishDate: new Date() }
                ];
                this._lastSentDefinitions = [];
                this._lastSentBuilds = [];
            }
            BuildService.prototype.connectNotification = function () {
                return Rx.Observable.create(function (observer) {
                    observer.onNext({
                        data: true,
                        success: true,
                        error: undefined
                    });
                });
            };

            BuildService.prototype.disconnectNotification = function () {
                return Rx.Observable.create(function (observer) {
                    observer.onNext({
                        data: true,
                        success: true,
                        error: undefined
                    });
                });
            };

            BuildService.prototype.statusNotification = function () {
                var _this = this;
                return Rx.Observable.interval(5000).map(function (value, index, source) {
                    _this._lastSentBuilds.forEach(function (item) {
                        if (item.status === 1 /* InProgress */) {
                            item.status = 8 /* Failed */;
                            item.statusText = "Failed";
                        } else if (item.status === 2 /* Succeeded */) {
                            item.status = 1 /* InProgress */;
                            item.statusText = "InProgress";
                        } else if (item.status === 8 /* Failed */) {
                            item.status = 1 /* InProgress */;
                            item.statusText = "InProgress";
                        }
                    });

                    return {
                        data: _this._lastSentBuilds.map(function (item) {
                            return _this.copyDefinitionData(item);
                        }),
                        success: true,
                        error: undefined
                    };
                });
            };

            BuildService.prototype.listNotification = function () {
                var _this = this;
                return Rx.Observable.create(function (observer) {
                    var lastSentDefinitions = _this._definitions.map(function (item) {
                        return _this.copyDefinitionData(item);
                    });

                    observer.onNext({
                        data: lastSentDefinitions,
                        success: true,
                        error: undefined
                    });
                    observer.onCompleted();
                });
            };

            BuildService.prototype.setListNotificationFilter = function (definitions) {
                var _this = this;
                this._lastSentBuilds = this._definitions.filter(function (item) {
                    return definitions.some(function (fItem) {
                        return fItem.id == item.id;
                    });
                }).map(function (item) {
                    return _this.copyDefinitionData(item);
                });
            };

            BuildService.prototype.copyDefinitionData = function (definition) {
                return {
                    id: definition.id,
                    displayName: definition.displayName,
                    status: definition.status,
                    statusText: definition.statusText,
                    definitionUrl: definition.definitionUrl,
                    requestedBy: definition.requestedBy,
                    definition: definition.definition,
                    startDate: definition.startDate,
                    finishDate: definition.finishDate
                };
            };
            return BuildService;
        })();
        Infrastructure.BuildService = BuildService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildService.js.map
