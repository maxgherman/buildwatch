
/// <reference path='../../../../../../d.ts/angular.d' />
/// <reference path='../../../../../../d.ts/bw.d' />

'use strict';


module BW.Modules.Shared.Directives.NavTab {

    interface IScope extends ng.IScope {
        tabs : Array<BW.ITab>;
        isCollapsed : boolean;
        activeTab : BW.ITab;
        changeNavState() : void;
        openNav () : void;
        isActiveTab (id: number) : boolean;
        isOpenedNav() : boolean;
        closeNav() : void;
        activateTab(id: number) : void;
        onOpen() : void;
    }


    export class NavTabs {

        public execute() {

            return {
                restrict: 'E',
                transclude: true,
                scope : {
                    onOpen : '&'
                },

                templateUrl: 'templates/navtab/navtab.html',
                controller: ['$scope',  NavTabsController]
            };
        }
    }

    function NavTabsController($scope : IScope) {

            $scope.tabs = [];

            $scope.isCollapsed = true;
            $scope.activeTab = undefined;//  $scope.tabs[0];


            $scope.changeNavState = () => {

                if($scope.isOpenedNav()) {
                    $scope.closeNav();
                } else {
                    $scope.openNav();
                }
            };

            $scope.openNav = () => {
                $scope.isCollapsed = false;

                $scope.onOpen();
            };

            $scope.closeNav = () => {
                $scope.isCollapsed = true;
            };

            $scope.isOpenedNav = () => {
                return $scope.isCollapsed === false;
            };

            $scope.isActiveTab = (id : number) => {
                return $scope.activeTab.id === id;
            };

            $scope.activateTab = (id : number, openNav = false) => {
                $scope.activeTab = $scope.tabs[id];

                if(openNav) {
                    $scope.openNav();
                }
            };

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
