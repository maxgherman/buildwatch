

module BW.Infrastructure {

    export class DateService {

        constructor() {

            this.extend();
        }


        private extend() {

            var self = this;

            if(Date.prototype['toFormattedString']) return;

            Date.prototype['toFormattedString'] = function(date : Date) : string {

               return [
                    self.padStr(this.getDate()), '/',
                    self.padStr(1 + this.getMonth()) , '/',
                    self.padStr(this.getFullYear()), ' ',
                    self.padStr(this.getHours()) , ':',
                    self.padStr(this.getMinutes()) , ':',
                    self.padStr(this.getSeconds())].join('');
            };


        }

        private padStr(i : number) : string {
            return (i < 10) ? "0" + i : "" + i;
        }

    }

}