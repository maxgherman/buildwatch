
///<reference path='./listHelperService' />

'use strict';

module BW.Infrastructure {

    export class BuildListHelperService extends BW.Infrastructure.ListHelperService{

        private _defaultComparer = (a,b) => a.id == b.id;
        private _defaultUpdater = (source, target) => source.isSelected = target.isSelected;
        private _allPredicate = a => a.isSelected;

        public all(list : Array<BW.IBuildDefinition>) : boolean {

            return super.all(list, this._allPredicate);

        }

        public updateDefinitionInfo(sourceList : Array<BW.IBuildDefinitionInfo>,
                      targetList : Array<BW.IBuildDefinitionInfo>) : Array<BW.IBuildDefinitionInfo> {

            return super.update(sourceList, targetList, this._defaultComparer, this._defaultUpdater);
        }


        public updateDefinition(sourceList : Array<BW.IBuildDefinition>,
                      targetList : Array<BW.IBuildDefinition>) : Array<BW.IBuildDefinition> {

            return super.update(sourceList, targetList, this._defaultComparer, this._defaultUpdater);
        }
    }

}