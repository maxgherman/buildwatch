
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';

module BW.Modules.Shared.Directives {

    export class CheckList {

        public execute() {

            var self = this;

            return {
                restrict: 'E',
                templateUrl: 'templates/checkList.html',
                scope : {
                  items : '=',
                  displayName : '@',
                  checkName : '@'
                },
                controller: ['$scope', 'itemNameFilter', self.controller]
            };
        }

        private controller($scope,
                           itemNameFilter : BW.INameFilter) {

            $scope.filteredItemName = '';
            $scope.reverseOrder = false;
            $scope.selectAll = false;

            $scope.orderBuildChange = () => {

                $scope.reverseOrder = !$scope.reverseOrder;
            };

            $scope.selectAllChange = () => {

                var selectedValue = $scope.selectAll;

                var filtered = itemNameFilter($scope.items, $scope.filteredItemName);

                filtered.forEach(item => item.isSelected = selectedValue);
            }
        }
    }

}