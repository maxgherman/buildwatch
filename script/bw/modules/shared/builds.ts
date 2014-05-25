///<reference path='../../../../d.ts/angular.d' />
///<reference path='../../infrastructure/buildService' />
///<reference path='../../infrastructure/buildListHelperService' />
///<reference path='../../modules/shared/services/buildServiceWrapper' />


'use strict';

(function(ang) {

    var mainModule = ang.module('builds', ['shared']);

    mainModule.config(['localStorageServiceProvider', localStorageServiceProvider => {
        localStorageServiceProvider.setPrefix('BW');
    }]);


    var Infrastructure : any = BW.Infrastructure;
    if(Infrastructure.SignalRBuildService.isInUse) {
        mainModule.factory('buildService', () => new Infrastructure.SignalRBuildService());
    } else {
        mainModule.factory('buildService', () => new BW.Infrastructure.BuildService());
    }

    mainModule.provider('buildServiceWrapper', () =>  new BW.Modules.Shared.Services.BuildServiceWrapper().execute());

    mainModule.factory('buildListHelperService', () => new BW.Infrastructure.BuildListHelperService());

})(angular);
