/// <reference path='../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Infrastructure) {
        var BuildService = (function () {
            function BuildService() {
                this._definitions = [
                    { id: '2', displayName: 'Test Name 1', definition: 'Test Name 1', statusText: 'InProgress', filtered: true, status: 1 /* InProgress */, definitionUrl: 'http://InProgress.com.au', requestedBy: 'AAA BBB', startDate: new Date(), finishDate: new Date() },
                    { id: '1', displayName: 'Some very long build name', definition: 'Test Name 1', statusText: 'Succeeded', filtered: true, status: 2 /* Succeeded */, definitionUrl: 'http://success.com.au', requestedBy: 'CCC DDD', startDate: new Date(), finishDate: new Date() },
                    { id: '4', displayName: 'Another long name', definition: 'Test Name 1', statusText: 'Failed', filtered: true, status: 8 /* Failed */, definitionUrl: 'http://failed.com.au', requestedBy: 'DD EEEE', startDate: new Date(), finishDate: new Date() },
                    { id: '6', displayName: 'Truk.Ci.Cti.Local', definition: 'Test Name 1', statusText: 'NotStarted', filtered: true, status: 32 /* NotStarted */, definitionUrl: 'http://not-started.com.au', requestedBy: 'GFFF GGG', startDate: new Date(), finishDate: new Date() },
                    { id: '3', displayName: 'Trunc.SIT.CI.CTI. Testing build length', definition: 'Test Name 1', statusText: 'Stopped', filtered: true, status: 16 /* Stopped */, definitionUrl: 'http://stopped.com.au', requestedBy: 'KKK LLL', startDate: new Date(), finishDate: new Date() },
                    { id: '5', displayName: 'Test Build definition name', definition: 'Test Name 1', statusText: 'PartiallySucceeded', filtered: true, status: 4 /* PartiallySucceeded */, definitionUrl: 'http://partially-succeded.com.au', requestedBy: 'MMM ooo', startDate: new Date(), finishDate: new Date() },
                    { id: '7', displayName: 'Buid Definition', definition: 'Test Name 1', statusText: 'All', filtered: true, status: 63 /* All */, definitionUrl: 'http://all.com.au', requestedBy: 'Test User', startDate: new Date(), finishDate: new Date() },
                    { id: '8', displayName: 'On CheckIn Build', definition: 'Test Name 1', statusText: 'None', filtered: true, status: 0 /* None */, definitionUrl: 'http://none.com.au', requestedBy: 'User with Name', startDate: new Date(), finishDate: new Date() },
                    { id: '9', displayName: 'Aggregated build', definition: 'Test Name 1', statusText: 'InProgress', filtered: true, status: 1 /* InProgress */, definitionUrl: 'http://not-started.com.au', requestedBy: 'Another User', startDate: new Date(), finishDate: new Date() },
                    { id: '10', displayName: 'Test for build definition name', definition: 'Test Name 1', statusText: 'Succeeded', filtered: true, status: 2 /* Succeeded */, definitionUrl: 'http://succeded.com.au', requestedBy: 'One more User', startDate: new Date(), finishDate: new Date() }
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
                    _this._lastSentBuilds = _this._definitions.map(function (item) {
                        return _this.copyDefinitionData(item);
                    });

                    observer.onNext({
                        data: _this._lastSentBuilds,
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
                    finishDate: definition.finishDate,
                    filtered: definition.filtered
                };
            };
            return BuildService;
        })();
        Infrastructure.BuildService = BuildService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildService.js.map
