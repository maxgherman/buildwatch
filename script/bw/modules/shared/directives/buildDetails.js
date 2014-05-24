var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Directives) {
                var BuildDetails = (function () {
                    function BuildDetails() {
                    }
                    BuildDetails.prototype.execute = function () {
                        return {
                            restrict: 'E',
                            scope: {
                                build: '='
                            },
                            templateUrl: 'templates/buildDetails.html'
                        };
                    };
                    return BuildDetails;
                })();
                Directives.BuildDetails = BuildDetails;
            })(Shared.Directives || (Shared.Directives = {}));
            var Directives = Shared.Directives;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=buildDetails.js.map
