///<reference path='../../../../d.ts/angular.d' />
///<reference path='../../infrastructure/buildService' />
///<reference path='../../infrastructure/buildListHelperService' />
///<reference path='../../modules/shared/services/buildServiceWrapper' />
'use strict';
(function (ang) {
    var mainModule = ang.module('builds', ['shared']);

    mainModule.config([
        'localStorageServiceProvider', function (localStorageServiceProvider) {
            localStorageServiceProvider.setPrefix('BW');
        }]);

    var Infrastructure = BW.Infrastructure;
    if (Infrastructure.SignalRBuildService.isInUse) {
        mainModule.factory('buildService', function () {
            return new Infrastructure.SignalRBuildService();
        });
    } else {
        mainModule.factory('buildService', function () {
            return new BW.Infrastructure.BuildService();
        });
    }

    mainModule.provider('buildServiceWrapper', function () {
        return new BW.Modules.Shared.Services.BuildServiceWrapper().execute();
    });

    mainModule.factory('buildListHelperService', function () {
        return new BW.Infrastructure.BuildListHelperService();
    });
})(angular);
//# sourceMappingURL=builds.js.map
