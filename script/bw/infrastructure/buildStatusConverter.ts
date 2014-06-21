
/// <reference path='../../../d.ts/bw.d.ts' />


module BW.Infrastructure {


    export class BuildStatusConverter {

        private  cssStatuses = [];

        constructor() {

            this.cssStatuses = [];
            this.cssStatuses[ BW.BuildStatus.None] = 'none';
            this.cssStatuses[ BW.BuildStatus.All ] = 'all';
            this.cssStatuses[ BW.BuildStatus.Failed ] = 'failed';
            this.cssStatuses[ BW.BuildStatus.InProgress ] = 'in-progress';
            this.cssStatuses[ BW.BuildStatus.NotStarted ] = 'not-started';
            this.cssStatuses[ BW.BuildStatus.PartiallySucceeded ] = 'partially-succeeded';
            this.cssStatuses[ BW.BuildStatus.Stopped ] = 'stopped';
            this.cssStatuses[ BW.BuildStatus.Succeeded ] = 'succeeded';
        }

        public getCss(status : BW.BuildStatus) {
            return this.cssStatuses[status];
        }
    }
}