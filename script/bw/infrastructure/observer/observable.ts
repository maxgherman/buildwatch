
/// <reference path='../../../../d.ts/bw.d' />


module BW.Infrastructure.Observer {

    interface IObserverCollection<T> {
        [event: string]: Array<BW.IObserver<T>>;
    }


    export class Observable<T> implements  BW.IObservable<T> {
        private collection : IObserverCollection<T>;

        constructor() {
            this.collection = {};
        }

        public register(event : string, observer : BW.IObserver<T>) : void {

            var observers = this.getObservers(event);

            observers.push(observer);
        }

        public remove (event : string, observer : BW.IObserver<T>) : void {

            var observers = this.getObservers(event);

            if(observers.length <= 0) return;

            observers.splice(observers.indexOf(observer), 1);
        }

        public notify(event : string, data : T, error : Error) : void {

            var observers = this.getObservers(event);

            observers.forEach((observer : BW.IObserver<T>)=> {
                observer(data, error);
            });
        }

        private getObservers(event : string) : Array<BW.IObserver<T>> {
            var observers = this.collection[event];
            if(!observers) {
                observers = [];
                this.collection[event] = observers;
            }

            return observers;
        }
    }
}

