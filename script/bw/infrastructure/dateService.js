var BW;
(function (BW) {
    (function (Infrastructure) {
        var DateService = (function () {
            function DateService() {
                this.extend();
            }
            DateService.prototype.extend = function () {
                Date.prototype['toFormattedString'] = function (date) {
                    var padStr = function (i) {
                        return (i < 10) ? "0" + i : "" + i;
                    };

                    return [
                        padStr(this.getDate()), '/',
                        padStr(1 + this.getMonth()), '/',
                        padStr(this.getFullYear()), ' ',
                        padStr(this.getHours()), ':',
                        padStr(this.getMinutes()), ':',
                        padStr(this.getSeconds())].join('');
                };
            };
            return DateService;
        })();
        Infrastructure.DateService = DateService;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=dateService.js.map
