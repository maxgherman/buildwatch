
/// <reference path='../../../../../../d.ts/bw.d' />

'use strict';

module BW.Modules.Shared.Directives.NavTab {

    export class NavTabs {

        public execute() {

            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'templates/navtab/navtab.html',
                controller: ['$scope',  NavTabsController]
            };
        }
    }

    function NavTabsController($scope) {

            $scope.tabs = [];

            $scope.isCollapsed = true;
            $scope.activeTab = undefined;//  $scope.tabs[0];


            $scope.changeNavState = () => {
                $scope.isCollapsed = !$scope.isCollapsed;
            };

            $scope.isActiveTab = (id : number) => {
                return $scope.activeTab.id === id;
            };

            $scope.activateTab = (id : number) => {
                $scope.activeTab = $scope.tabs[id];
            }

            this.addTab = (tab : BW.ITab) => {

                $scope.tabs.push(tab);
                tab.id = $scope.tabs.indexOf(tab);

                if(tab.isActive) {
                    $scope.activateTab(tab.id);
                }
            };

            this.isActiveTab = $scope.isActiveTab;
    }
}
