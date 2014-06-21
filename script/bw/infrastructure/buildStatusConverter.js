/// <reference path='../../../d.ts/bw.d.ts' />
var BW;
(function (BW) {
    (function (Infrastructure) {
        var BuildStatusConverter = (function () {
            function BuildStatusConverter() {
                this.cssStatuses = [];
                this.cssStatuses = [];
                this.cssStatuses[0 /* None */] = 'none';
                this.cssStatuses[63 /* All */] = 'all';
                this.cssStatuses[8 /* Failed */] = 'failed';
                this.cssStatuses[1 /* InProgress */] = 'in-progress';
                this.cssStatuses[32 /* NotStarted */] = 'not-started';
                this.cssStatuses[4 /* PartiallySucceeded */] = 'partially-succeeded';
                this.cssStatuses[16 /* Stopped */] = 'stopped';
                this.cssStatuses[2 /* Succeeded */] = 'succeeded';
            }
            BuildStatusConverter.prototype.getCss = function (status) {
                return this.cssStatuses[status];
            };
            return BuildStatusConverter;
        })();
        Infrastructure.BuildStatusConverter = BuildStatusConverter;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=buildStatusConverter.js.map
