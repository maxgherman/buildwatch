/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Controllers) {
                var MainController = (function () {
                    function MainController(buildServiceWrapper) {
                        this.totalColumns = 3;
                        this.builds = null;
                        this.builds = [];

                        buildServiceWrapper.setStatusNotificationHandler(this.statusNotificationHandler.bind(this));
                        buildServiceWrapper.start();
                    }
                    MainController.prototype.statusNotificationHandler = function (builds, error) {
                        this.builds = builds;
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
