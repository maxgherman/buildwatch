

module BW.Modules.Shared.Directives {

    export class BuildDetails {

        public execute() {

            return {
                restrict : 'E',
                scope : {
                    build : '='
                },
                templateUrl : 'templates/buildDetails.html'
            }
        }
    }

}
