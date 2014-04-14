/// <reference path='../../../../../d.ts/bw.d' />
/// <reference path='../../../infrastructure/buildService' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Services) {
                var BuildService = (function () {
                    function BuildService() {
                    }
                    BuildService.prototype.execute = function () {
                        var body = this.body.bind(this);

                        return {
                            $get: ['$rootScope', 'buildService', body]
                        };
                    };

                    BuildService.prototype.body = function ($rootScope, buildService) {
                        return {
                            setStatusNotificationHandler: function (value) {
                                buildService.setStatusNotificationHandler(function (builds, error) {
                                    $rootScope.$apply(function () {
                                        value(builds, error);
                                    });
                                });
                            },
                            start: buildService.start.bind(buildService)
                        };
                    };
                    return BuildService;
                })();
                Services.BuildService = BuildService;

                var BuildService2 = (function () {
                    function BuildService2() {
                    }
                    BuildService2.prototype.execute = function () {
                        return this.body.bind(this);
                    };

                    BuildService2.prototype.body = function ($rootScope, buildService) {
                        return {
                            setStatusNotificationHandler: function (value) {
                                buildService.setStatusNotificationHandler(function (builds, error) {
                                    $rootScope.$apply(function () {
                                        value(builds, error);
                                    });
                                });
                            },
                            start: buildService.start.bind(buildService)
                        };
                    };
                    return BuildService2;
                })();
                Services.BuildService2 = BuildService2;
            })(Shared.Services || (Shared.Services = {}));
            var Services = Shared.Services;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=buildService.js.map
