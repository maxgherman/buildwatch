'use strict';
var BW;
(function (BW) {
    (function (Modules) {
        (function (Shared) {
            (function (Directives) {
                var Blocker = (function () {
                    function Blocker() {
                    }
                    Blocker.prototype.execute = function () {
                        return {
                            restrict: 'E',
                            scope: {
                                text: '=',
                                subText: '=',
                                visible: '='
                            },
                            templateUrl: 'templates/blocker.html'
                        };
                    };
                    return Blocker;
                })();
                Directives.Blocker = Blocker;
            })(Shared.Directives || (Shared.Directives = {}));
            var Directives = Shared.Directives;
        })(Modules.Shared || (Modules.Shared = {}));
        var Shared = Modules.Shared;
    })(BW.Modules || (BW.Modules = {}));
    var Modules = BW.Modules;
})(BW || (BW = {}));
//# sourceMappingURL=blocker.js.map
