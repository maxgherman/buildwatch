/// <reference path='../../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Directives) {
                (function (NavTab) {
                    var Tab = (function () {
                        function Tab() {
                        }
                        Tab.prototype.execute = function () {
                            var self = this;

                            return {
                                restrict: 'E',
                                require: '^navtabs',
                                replace: true,
                                transclude: true,
                                scope: {
                                    headerIcon: '@',
                                    name: '@',
                                    isActive: '@'
                                },
                                templateUrl: 'templates/navtab/tab.html',
                                link: self.link.bind(self)
                            };
                        };

                        Tab.prototype.link = function ($scope, element, attrs, parentCtrl) {
                            var tab = {
                                id: undefined,
                                header: $scope.headerIcon,
                                name: $scope.name,
                                isActive: $scope.isActive === 'true'
                            };

                            parentCtrl.addTab(tab);

                            $scope.isActiveTab = parentCtrl.isActiveTab;
                            $scope.id = tab.id;
                        };
                        return Tab;
                    })();
                    NavTab.Tab = Tab;
                })(Directives.NavTab || (Directives.NavTab = {}));
                var NavTab = Directives.NavTab;
            })(Shared.Directives || (Shared.Directives = {}));
            var Directives = Shared.Directives;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=tab.js.map
