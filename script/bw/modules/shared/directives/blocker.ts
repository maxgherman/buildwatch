
'use strict';


module BW.Modules.Shared.Directives {

    export class Blocker {

        public execute() {
            return {
                restrict : 'E',
                scope : {
                    text : '=',
                    subText : '=',
                    visible : '='
                },
                templateUrl : 'templates/blocker.html'
            }
        }

    }

}