
/// <reference path='../../../../../d.ts/angular.d' />
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';


module BW.Modules.Shared.Directives {

    interface IScope extends ng.IScope {
        displayName : string;
        checkName : string;
        items : Array<BW.IBuildDefinition>;
        filteredItemName : string;
        reverseOrder : boolean;
        selectAll : boolean;
        orderBuildChange : () => void;
        selectAllChange: () => void;
        selectChange : () => void;
        checkChanged : () =>void;
    }


    export class CheckList {

        public execute() {

            return {
                restrict: 'E',
                templateUrl: 'templates/checkList.html',
                scope : {
                  items : '=',
                  displayName : '@',
                  checkName : '@',
                  checkChanged : '&'
                },
                controller: ['$scope',
                             'itemNameFilter',
                             'buildListHelperService',
                             'storageHelperService', this.controller]
            };
        }

        private controller($scope : IScope,
                           itemNameFilter : BW.INameFilter,
                           listHelperService : BW.IBuildListHelperService,
                           storageHelperService : BW.ILocalStorageService) {

            $scope.filteredItemName = '';
            $scope.reverseOrder = false;
            $scope.selectAll = false;

            $scope.orderBuildChange = () => {

                $scope.reverseOrder = !$scope.reverseOrder;
            };

            $scope.selectAllChange = () => {

                var selectedValue = $scope.selectAll;

                var filtered = itemNameFilter($scope.items, $scope.filteredItemName);

                filtered.forEach(item => item.filtered = selectedValue);

                $scope.checkChanged();
            }

            $scope.$watch('items', (newValue, oldValue) => {

                $scope.selectAll = listHelperService.all(newValue);

            }, true);
         }
    }

}