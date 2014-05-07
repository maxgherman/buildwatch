/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Controllers) {
                var MainController = (function () {
                    function MainController(_buildServiceWrapper, _listHelperService) {
                        this._buildServiceWrapper = _buildServiceWrapper;
                        this._listHelperService = _listHelperService;
                        this.builds = null;
                        this.definitions = null;
                        this.builds = [];
                        this.definitions = [];
                        this._settings = {
                            totalColumns: 3,
                            trackBroken: false
                        };

                        this._blocker = new Blocker('Waiting connection ...', true);

                        _buildServiceWrapper.statusNotification(this.statusNotification.bind(this), this.statusNotificationError.bind(this));

                        _buildServiceWrapper.listNotification(this.listNotification.bind(this), this.listNotificationError.bind(this));
                    }
                    Object.defineProperty(MainController.prototype, "settings", {
                        get: function () {
                            return this._settings;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(MainController.prototype, "blocker", {
                        get: function () {
                            return this._blocker;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    MainController.prototype.submitFilter = function () {
                        this._buildServiceWrapper.filterListNotifications(this.definitions);
                    };

                    MainController.prototype.statusNotification = function (builds) {
                        this.builds = this._listHelperService.updateDefinition(builds, this.builds);

                        this._blocker.show(false);
                    };

                    MainController.prototype.listNotification = function (definitions) {
                        this.definitions = this._listHelperService.updateDefinitionInfo(definitions, this.definitions);

                        this._blocker.show(false);
                    };

                    MainController.prototype.statusNotificationError = function (error) {
                        this._blocker.show(true);
                    };

                    MainController.prototype.listNotificationError = function (error) {
                        this._blocker.show(true);
                    };
                    return MainController;
                })();
                Controllers.MainController = MainController;

                var Blocker = (function () {
                    function Blocker(text, isVisible) {
                        this.text = text;
                        this.isVisible = isVisible;
                    }
                    Blocker.prototype.show = function (display) {
                        this.isVisible = display;
                    };
                    return Blocker;
                })();
            })(Main.Controllers || (Main.Controllers = {}));
            var Controllers = Main.Controllers;
        })(Modules.Main || (Modules.Main = {}));
        var Main = Modules.Main;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=main.js.map
