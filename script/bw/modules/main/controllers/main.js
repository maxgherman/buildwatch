/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Controllers) {
                var MainController = (function () {
                    function MainController(_buildServiceWrapper, listHelperService) {
                        this._buildServiceWrapper = _buildServiceWrapper;
                        this.listHelperService = listHelperService;
                        this.totalColumns = 3;
                        this.builds = null;
                        this.definitions = null;
                        this.builds = [];
                        this.definitions = [];

                        _buildServiceWrapper.statusNotification(this.statusNotification.bind(this), this.statusNotificationError.bind(this));

                        _buildServiceWrapper.listNotification(this.listNotification.bind(this), this.listNotificationError.bind(this));
                    }
                    MainController.prototype.submitFilter = function () {
                        this._buildServiceWrapper.filterListNotifications(this.definitions);
                    };

                    MainController.prototype.statusNotification = function (builds) {
                        this.builds = builds;
                    };

                    MainController.prototype.statusNotificationError = function (error) {
                    };

                    MainController.prototype.listNotification = function (definitions) {
                        this.definitions = definitions;
                    };

                    MainController.prototype.listNotificationError = function (error) {
                    };
                    return MainController;
                })();
                Controllers.MainController = MainController;
            })(Main.Controllers || (Main.Controllers = {}));
            var Controllers = Main.Controllers;
        })(Modules.Main || (Modules.Main = {}));
        var Main = Modules.Main;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=main.js.map
