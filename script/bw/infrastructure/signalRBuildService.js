

'use strict';
var BW;

(function (BW) {
    (function (Infrastructure) {
        var SignalRBuildService = (function () {
            function SignalRBuildService() {

                this.tfsHub = $.connection.tfsHub;
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

                var self = this;

                return Rx.Observable.create(function (observer) {

                    self.tfsHub.disconnect(function() {

                        observer.onNext({
                            data: true,
                            success: true,
                            error: undefined
                        });
                    });
                });
            };

            SignalRBuildService.prototype.statusNotification = function () {

                var self = this;

                return Rx.Observable.create(function (observer) {

                    self.tfsHub.client.updateBuildStatuses = function (data) {

                        data.forEach(function(item) {
                           item.startDate = new Date(item.startDate);
                           item.finishDate = item.finishDate ? new Date(item.startDate) : undefined;
                        });


                        observer.onNext({
                            data: data,
                            success: true,
                            error: undefined
                        });
                    }
                });

            };

            SignalRBuildService.prototype.listNotification = function () {

                var self = this;

                return Rx.Observable.create(function (observer) {

                    self.tfsHub.server.getBuildDefinitions = function(data) {
                        observer.onNext({
                            data: data,
                            success: true,
                            error: undefined
                        });
                    }
                });
            };


            SignalRBuildService.prototype.setListNotificationFilter = function (definitions) {
                var data = definitions.map(function(item) { return item.id; });

                tfsHub.server.saveFilter(data);

            };



            return SignalRBuildService;
        })();
        Infrastructure.SignalRBuildService = SignalRBuildService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));

