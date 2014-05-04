/// <reference path='../../../../../../d.ts/angular.d' />
/// <reference path='../../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Directives) {
                (function (NavTab) {
                    var NavTabs = (function () {
                        function NavTabs() {
                        }
                        NavTabs.prototype.execute = function () {
                            return {
                                restrict: 'E',
                                transclude: true,
                                templateUrl: 'templates/navtab/navtab.html',
                                controller: ['$scope', NavTabsController]
                            };
                        };
                        return NavTabs;
                    })();
                    NavTab.NavTabs = NavTabs;

                    function NavTabsController($scope) {
                        $scope.tabs = [];

                        $scope.isCollapsed = true;
                        $scope.activeTab = undefined; //  $scope.tabs[0];

                        $scope.changeNavState = function () {
                            $scope.isCollapsed = !$scope.isCollapsed;
                        };

                        $scope.openNav = function () {
                            $scope.isCollapsed = false;
                        };

                        $scope.isActiveTab = function (id) {
                            return $scope.activeTab.id === id;
                        };

                        $scope.activateTab = function (id, openNav) {
                            if (typeof openNav === "undefined") { openNav = false; }
                            $scope.activeTab = $scope.tabs[id];

                            if (openNav) {
                                $scope.openNav();
                            }
                        };

                        this.addTab = function (tab) {
                            $scope.tabs.push(tab);
                            tab.id = $scope.tabs.indexOf(tab);

                            if (tab.isActive) {
                                $scope.activateTab(tab.id);
                            }
                        };

                        this.isActiveTab = $scope.isActiveTab;
                    }
                })(Directives.NavTab || (Directives.NavTab = {}));
                var NavTab = Directives.NavTab;
            })(Shared.Directives || (Shared.Directives = {}));
            var Directives = Shared.Directives;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=navtabs.js.map
