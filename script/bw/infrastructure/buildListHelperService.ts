
///<reference path='./listHelperService' />

'use strict';


module BW.Infrastructure {

    export class BuildListHelperService extends BW.Infrastructure.ListHelperService implements BW.IBuildListHelperService{

        private _defaultComparer = (a,b) => a.id == b.id;
        private _defaultUpdater = (source, target) => source.filtered = target.filtered;
        private _defaultPredicate = a => a.filtered;

        public all(list : Array<BW.IBuildDefinition>,
                   predicate = this._defaultPredicate) : boolean {

            return super.all(list, predicate);

        }

        public updateDefinitionInfo(sourceList : Array<BW.IBuildDefinitionInfo>,
                      targetList : Array<BW.IBuildDefinitionInfo>,
                      comparer = this._defaultComparer,
                      updater = this._defaultUpdater) : Array<BW.IBuildDefinitionInfo> {

            return super.update(sourceList, targetList, comparer, updater);
        }


        public updateDefinition(sourceList : Array<BW.IBuildDefinition>,
                      targetList : Array<BW.IBuildDefinition>,
                      comparer = this._defaultComparer,
                      updater = this._defaultUpdater) : Array<BW.IBuildDefinition> {

            return super.update(sourceList, targetList, comparer, updater);
        }

        public updateBroken(list : Array<BW.IBuildDefinition>)  {

            var exists = super.any(list, item =>
                item.status === BW.BuildStatus.Failed ||
                item.status == BW.BuildStatus.InProgress);

            if(exists) {

                list.forEach(item => {

                    item.filtered = item.status === BW.BuildStatus.Failed ||
                        item.status == BW.BuildStatus.InProgress;
                });
            } else {
                list.forEach(item => item.filtered = true);
            }
        }

        public updateAll(list : Array<BW.IBuildDefinition>)  {
            list.forEach(item => {

                item.filtered = true;
            });
        }

        public filter(list : Array<BW.IBuildDefinitionInfo>, predicate = this._defaultPredicate) : Array<BW.IBuildDefinitionInfo> {
            return super.filter(list, predicate);
        }

        public filterDefinitions(list : Array<BW.IBuildDefinition>, predicate = this._defaultPredicate) : Array<BW.IBuildDefinition> {
            return super.filter(list, predicate);
        }
    }

}