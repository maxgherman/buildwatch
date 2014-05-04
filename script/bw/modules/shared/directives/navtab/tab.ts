
/// <reference path='../../../../../../d.ts/angular.d' />
/// <reference path='../../../../../../d.ts/bw.d' />

'use strict';


module BW.Modules.Shared.Directives.NavTab {

   interface IScope extends ng.IScope {

       headerIcon : string;
       name : string;
       isActive : string;
       isActiveTab : () => boolean;
       id : number;
   }


    export class Tab {

        public execute() {

            var self = this;

            return {
                restrict: 'E',
                require: '^navtabs',
                replace: true,
                transclude: true,
                scope : {
                    headerIcon : '@',
                    name : '@',
                    isActive : '@'
                },
                templateUrl: 'templates/navtab/tab.html',
                link: self.link.bind(self)
            };
        }

        private link($scope : IScope, element, attrs, parentCtrl) {

            var tab : BW.ITab = {
                id : undefined,
                header : $scope.headerIcon,
                name : $scope.name,
                isActive : $scope.isActive === 'true'
            };

            parentCtrl.addTab(tab);

            $scope.isActiveTab = parentCtrl.isActiveTab;

            $scope.id = tab.id;

        }
    }
}