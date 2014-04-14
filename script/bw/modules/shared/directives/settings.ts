
/// <reference path='../../../../../d.ts/bw.d' />

'use strict';

module BW.Modules.Main.Directives {

    interface $scope {
        visible : boolean;
        queryBuildName :  string;
        reverseOrder : boolean;
        selectAll : boolean;
        builds : Array<IBuild>;
        orderBuildChange() : void;
        selectAllChange() : void;
    }

    export class Settings {

        public execute() {

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
        }

        private controller($scope, buildNameFilter) {

            $scope.visible = false;
            $scope.queryBuildName = '';
            $scope.reverseOrder = false;
            $scope.selectAll = false;

            $scope.orderBuildChange = () => {

                $scope.reverseOrder = !$scope.reverseOrder;
            };

            $scope.selectAllChange = () => {

                var selectedValue = $scope.selectAll;

                var filtered = buildNameFilter($scope.builds, $scope.queryBuildName);

                filtered.forEach(function(item) {

                    item.isSelected = selectedValue;
                });
            }
        }
    }
}