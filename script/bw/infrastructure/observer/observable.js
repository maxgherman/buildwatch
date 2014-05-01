/// <reference path='../../../../d.ts/bw.d' />
var BW;
(function (BW) {
    (function (Infrastructure) {
        (function (Observer) {
            var Observable = (function () {
                function Observable() {
                    this.collection = {};
                }
                Observable.prototype.register = function (event, observer) {
                    var observers = this.getObservers(event);

                    observers.push(observer);
                };

                Observable.prototype.remove = function (event, observer) {
                    var observers = this.getObservers(event);

                    if (observers.length <= 0)
                        return;

                    observers.splice(observers.indexOf(observer), 1);
                };

                Observable.prototype.notify = function (event, data, error) {
                    var observers = this.getObservers(event);

                    observers.forEach(function (observer) {
                        observer(data, error);
                    });
                };

                Observable.prototype.getObservers = function (event) {
                    var observers = this.collection[event];
                    if (!observers) {
                        observers = [];
                        this.collection[event] = observers;
                    }

                    return observers;
                };
                return Observable;
            })();
            Observer.Observable = Observable;
        })(Infrastructure.Observer || (Infrastructure.Observer = {}));
        var Observer = Infrastructure.Observer;
    })(BW.Infrastructure || (BW.Infrastructure = {}));
    var Infrastructure = BW.Infrastructure;
})(BW || (BW = {}));
//# sourceMappingURL=observable.js.map
