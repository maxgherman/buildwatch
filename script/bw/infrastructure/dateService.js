var BW;
(function (BW) {
    (function (Infrastructure) {
        var DateService = (function () {
            function DateService() {
                this.extend();
            }
            DateService.prototype.extend = function () {
                var self = this;

                if (Date.prototype['toFormattedString'])
                    return;

                Date.prototype['toFormattedString'] = function (date) {
                    return [
                        self.padStr(this.getDate()), '/',
                        self.padStr(1 + this.getMonth()), '/',
                        self.padStr(this.getFullYear()), ' ',
                        self.padStr(this.getHours()), ':',
                        self.padStr(this.getMinutes()), ':',
                        self.padStr(this.getSeconds())].join('');
                };
            };

            DateService.prototype.padStr = function (i) {
                return (i < 10) ? "0" + i : "" + i;
            };
            return DateService;
        })();
        Infrastructure.DateService = DateService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=dateService.js.map
