

module BW.Infrastructure {

    export class DateService {

        constructor() {

            this.extend();
        }


        private extend() {

            Date.prototype['toFormattedString'] = function(date : Date) : string {

                var padStr = function(i) {
                    return (i < 10) ? "0" + i : "" + i;
                };

                return [
                    padStr(this.getDate()), '/',
                    padStr(1 + this.getMonth()) , '/',
                    padStr(this.getFullYear()), ' ',
                    padStr(this.getHours()) , ':',
                    padStr(this.getMinutes()) , ':',
                    padStr(this.getSeconds())].join('');
            };


        }

    }

}