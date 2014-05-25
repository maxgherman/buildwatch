

'use strict';
var BW;

(function (BW) {
    (function (Infrastructure) {
        var SignalRBuildService = (function () {
            function SignalRBuildService() {

                var tfsHub = $.connection.tfsHub;
            };


            SignalRBuildService.isInUse = false;

            SignalRBuildService.prototype.connectNotification = function () {

                return Rx.Observable.create(function (observer) {

                    $.connection.hub.start()
                    .done(function () {
                        observer.onNext({
                            data: true,
                            success: true,
                            error: undefined
                        });
                    })
                    .fail(function(){
                        observer.onNext({
                            data: false,
                            success: true,
                            error: undefined
                        });

                     });

                });
            };


            SignalRBuildService.prototype.disconnectNotification = function () {

                return Rx.Observable.create(function (observer) {

                    tfsHub.disconnect(function() {

                        observer.onNext({
                            data: true,
                            success: true,
                            error: undefined
                        });
                    });
                });
            };

            SignalRBuildService.prototype.statusNotification = function () {

                return Rx.Observable.create(function (observer) {

                    tfsHub.client.updateBuildStatuses = function (data) {

                        observer.onNext({
                            data: data,
                            success: true,
                            error: undefined
                        });
                    }
                });

            };

            SignalRBuildService.prototype.listNotification = function () {

                return Rx.Observable.create(function (observer) {

                    var data =  tfsHub.server.getBuildDefinitions();

                    observer.onNext({
                        data: data,
                        success: true,
                        error: undefined
                    });

                });
            };


            SignalRBuildService.prototype.setListNotificationFilter = function (definitions) {
                var data = definitions.map(function(item) { return item.id; })

                tfsHub.server.saveFilter(data);

            };



            return SignalRBuildService;
        })();
        Infrastructure.SignalRBuildService = SignalRBuildService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));

