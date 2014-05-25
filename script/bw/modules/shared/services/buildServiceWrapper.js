/// <reference path='../../../../../d.ts/bw.d' />
/// <reference path='../../../../../d.ts/angular.d.ts' />
/// <reference path='../../../infrastructure/buildService' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Services) {
                var BuildServiceWrapper = (function () {
                    function BuildServiceWrapper() {
                    }
                    BuildServiceWrapper.prototype.execute = function () {
                        var body = this.body.bind(this);

                        return {
                            $get: ['$rootScope', '$timeout', 'buildService', body]
                        };
                    };

                    BuildServiceWrapper.prototype.body = function ($rootScope, $timeout, buildService) {
                        var self = this;

                        return {
                            connectNotification: function (onData, onError) {
                                buildService.connectNotification().subscribe(function (data) {
                                    self.applyScope($timeout, $rootScope, data, onData);
                                }, function (error) {
                                    console.error(error.toString());

                                    self.applyScope($timeout, $rootScope, error, onError);
                                });
                            },
                            disconnectNotification: function (onData, onError) {
                                buildService.disconnectNotification().subscribe(function (data) {
                                    self.applyScope($timeout, $rootScope, data, onData);
                                }, function (error) {
                                    console.error(error.toString());

                                    self.applyScope($timeout, $rootScope, error, onError);
                                });
                            },
                            statusNotification: function (onData, onError) {
                                buildService.statusNotification().subscribe(function (data) {
                                    self.applyScope($timeout, $rootScope, data, onData);
                                }, function (error) {
                                    console.error(error.toString());

                                    self.applyScope($timeout, $rootScope, error, onError);
                                });
                            },
                            listNotification: function (onData, onError) {
                                buildService.listNotification().subscribe(function (data) {
                                    self.applyScope($timeout, $rootScope, data, onData);
                                }, function (error) {
                                    console.error(error.toString());

                                    self.applyScope($timeout, $rootScope, error, onError);
                                });
                            },
                            filterListNotifications: function (value) {
                                buildService.setListNotificationFilter(value);
                            }
                        };
                    };

                    BuildServiceWrapper.prototype.applyScope = function ($timeout, $rootScope, data, action) {
                        $timeout(function () {
                            action(data);
                        });
                    };
                    return BuildServiceWrapper;
                })();
                Services.BuildServiceWrapper = BuildServiceWrapper;
            })(Shared.Services || (Shared.Services = {}));
            var Services = Shared.Services;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=buildServiceWrapper.js.map
