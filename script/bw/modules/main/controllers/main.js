/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Controllers) {
                var MainController = (function () {
                    function MainController(_buildServiceWrapper, _listHelperService, _storageService) {
                        this._buildServiceWrapper = _buildServiceWrapper;
                        this._listHelperService = _listHelperService;
                        this._storageService = _storageService;
                        this._builds = null;
                        this.definitions = null;
                        this.definitions = [];
                        this._blocker = new Blocker('Waiting connection ...', true);

                        this.restoreSettings();

                        this.setStatusNotifications();
                        this.getDefinitionNotifications();
                    }
                    Object.defineProperty(MainController.prototype, "currentBuildId", {
                        get: function () {
                            return this._currentBuildId;
                        },
                        set: function (value) {
                            this._currentBuildId = value;

                            this.updateCurrentBuild();
                        },
                        enumerable: true,
                        configurable: true
                    });


                    Object.defineProperty(MainController.prototype, "totalColumns", {
                        get: function () {
                            return this._totalColumns;
                        },
                        set: function (value) {
                            this._totalColumns = value;

                            this.saveSettings();
                        },
                        enumerable: true,
                        configurable: true
                    });


                    Object.defineProperty(MainController.prototype, "trackBroken", {
                        get: function () {
                            return this._trackBroken;

                            this._storageService.save();
                        },
                        set: function (value) {
                            this._trackBroken = value;

                            this.saveSettings();

                            if (value) {
                                this._listHelperService.updateBroken(this._builds);
                            } else {
                                this._listHelperService.updateAll(this._builds);
                            }
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

                    Object.defineProperty(MainController.prototype, "builds", {
                        get: function () {
                            return this._builds;
                        },
                        set: function (value) {
                            this._builds = value;
                        },
                        enumerable: true,
                        configurable: true
                    });


                    MainController.prototype.submitFilter = function () {
                        this._buildServiceWrapper.filterListNotifications(this.definitions);
                    };

                    MainController.prototype.statusNotification = function (notification) {
                        if (notification.success) {
                            var result = this._listHelperService.updateDefinition(notification.data, this.builds);

                            if (this.trackBroken) {
                                this._listHelperService.updateBroken(result);
                            }

                            this._builds = result;

                            this.updateCurrentBuild();

                            this.buildsNotification = {
                                data: result,
                                success: true
                            };
                        } else {
                            this.blocker.subText = notification.error.message;
                        }

                        this._blocker.show(!notification.success);
                    };

                    MainController.prototype.listNotification = function (notification) {
                        if (notification.success) {
                            this.definitions = this._listHelperService.updateDefinitionInfo(notification.data, this.definitions);
                        } else {
                            this.blocker.subText = notification.error.message;
                        }

                        if (!notification.success) {
                            this._blocker.show(true);
                        }
                    };

                    MainController.prototype.statusNotificationError = function (error) {
                        var message = 'Error getting build status notification';
                        this._blocker.subText = message;

                        this._blocker.show(true);

                        this.setStatusNotifications();
                    };

                    MainController.prototype.listNotificationError = function (error) {
                        var message = 'Error getting definition list notification';
                        this._blocker.subText = message;

                        this._blocker.show(true);

                        this.getDefinitionNotifications();
                    };

                    MainController.prototype.setStatusNotifications = function () {
                        this._buildServiceWrapper.statusNotification(this.statusNotification.bind(this), this.statusNotificationError.bind(this));
                    };

                    MainController.prototype.getDefinitionNotifications = function () {
                        this._buildServiceWrapper.listNotification(this.listNotification.bind(this), this.listNotificationError.bind(this));
                    };

                    MainController.prototype.saveSettings = function () {
                        this._storageService.save();
                    };

                    MainController.prototype.restoreSettings = function () {
                        var _this = this;
                        this._storageService.restore();

                        var totalColumns = this._storageService.getResource("totalColumns");
                        this._totalColumns = totalColumns || 3;

                        var trackBroken = this._storageService.getResource("trackBroken");
                        this._trackBroken = trackBroken || false;

                        var builds = this._storageService.getResource("builds");
                        if (builds) {
                            this._builds = builds.map(function (item) {
                                return {
                                    id: item.id,
                                    displayName: item.displayName,
                                    definition: undefined,
                                    status: 0 /* None */,
                                    statusText: 'None',
                                    filtered: true,
                                    definitionUrl: undefined,
                                    requestedBy: undefined,
                                    startDate: undefined,
                                    finishDate: undefined
                                };
                            });
                        } else {
                            this._builds = [];
                        }

                        this._storageService.addResource("totalColumns", function () {
                            return _this._totalColumns;
                        });
                        this._storageService.addResource("trackBroken", function () {
                            return _this._trackBroken;
                        });
                        this._storageService.addResource("builds", function () {
                            var filtered = _this._listHelperService.filter(_this._builds);

                            return filtered.map(function (item) {
                                return { id: item.id, displayName: item.displayName };
                            });
                        });
                    };

                    MainController.prototype.updateCurrentBuild = function () {
                        var _this = this;
                        var builds = this._listHelperService.filterDefinitions(this._builds, function (item) {
                            return item.id === _this._currentBuildId;
                        });

                        if (builds.length > 0) {
                            this.currentBuild = builds[0];
                        }
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
                        if (!display) {
                            this.subText = '';
                        }

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
