/// <reference path='../../../../../d.ts/angular.d' />
/// <reference path='../../../../../d.ts/bw.d' />
'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Directives) {
                var CheckList = (function () {
                    function CheckList() {
                    }
                    CheckList.prototype.execute = function () {
                        return {
                            restrict: 'E',
                            templateUrl: 'templates/checkList.html',
                            scope: {
                                items: '=',
                                displayName: '@',
                                checkName: '@',
                                checkChanged: '&'
                            },
                            controller: [
                                '$scope',
                                'itemNameFilter',
                                'buildListHelperService',
                                'storageHelperService', this.controller]
                        };
                    };

                    CheckList.prototype.controller = function ($scope, itemNameFilter, listHelperService, storageHelperService) {
                        $scope.filteredItemName = '';
                        $scope.reverseOrder = false;
                        $scope.selectAll = false;

                        $scope.orderBuildChange = function () {
                            $scope.reverseOrder = !$scope.reverseOrder;
                        };

                        $scope.selectAllChange = function () {
                            var selectedValue = $scope.selectAll;

                            var filtered = itemNameFilter($scope.items, $scope.filteredItemName);

                            filtered.forEach(function (item) {
                                return item.filtered = selectedValue;
                            });

                            $scope.checkChanged();
                        };

                        $scope.$watch('items', function (newValue, oldValue) {
                            $scope.selectAll = listHelperService.all(newValue);
                        }, true);
                    };
                    return CheckList;
                })();
                Directives.CheckList = CheckList;
            })(Shared.Directives || (Shared.Directives = {}));
            var Directives = Shared.Directives;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=checkList.js.map
