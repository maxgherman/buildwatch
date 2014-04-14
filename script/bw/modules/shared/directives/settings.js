/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Main) {
            (function (Directives) {
                var Settings = (function () {
                    function Settings() {
                    }
                    Settings.prototype.execute = function () {
                        var self = this;

                        var controller = self.controller;

                        return {
                            restrict: 'E',
                            scope: {
                                totalColumns: '=',
                                builds: '='
                            },
                            controller: ['$scope', 'buildNameFilter', controller],
                            templateUrl: 'templates/settings.html'
                        };
                    };

                    Settings.prototype.controller = function ($scope, buildNameFilter) {
                        $scope.visible = false;
                        $scope.queryBuildName = '';
                        $scope.reverseOrder = false;
                        $scope.selectAll = false;

                        $scope.orderBuildChange = function () {
                            $scope.reverseOrder = !$scope.reverseOrder;
                        };

                        $scope.selectAllChange = function () {
                            var selectedValue = $scope.selectAll;

                            var filtered = buildNameFilter($scope.builds, $scope.queryBuildName);

                            filtered.forEach(function (item) {
                                item.isSelected = selectedValue;
                            });
                        };
                    };
                    return Settings;
                })();
                Directives.Settings = Settings;
            })(Main.Directives || (Main.Directives = {}));
            var Directives = Main.Directives;
        })(Modules.Main || (Modules.Main = {}));
        var Main = Modules.Main;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=settings.js.map
