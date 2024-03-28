import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchBuilderService {
  homeAssets = new BehaviorSubject<any[]>([]);
  groupAssets = new BehaviorSubject<any[]>([]);
  awayAssets = new BehaviorSubject<any[]>([]);

  homeAssets$ = this.homeAssets.asObservable();
  groupAssets$ = this.groupAssets.asObservable();
  awayAssets$ = this.awayAssets.asObservable();

  constructor() {}

  onCastlingAssets(stateName: 'homeAssets' | 'awayAssets', option: any) {
    if (stateName === 'homeAssets') {
      const foundedHomeAssetIndex = this.homeAssets.value.findIndex((item: any) => item?.id === option?.id);
      if (foundedHomeAssetIndex > -1) {
        const newHomeAssets = [...this.homeAssets.value];
        newHomeAssets.splice(foundedHomeAssetIndex, 1);
        const foundedHomeAsset = this.homeAssets.value[foundedHomeAssetIndex];
        this.awayAssets.next([...this.awayAssets.value, foundedHomeAsset]);
        this.homeAssets.next(newHomeAssets);
      }
    } else if (stateName === 'awayAssets') {
      const foundedAwayAssetIndex = this.awayAssets.value.findIndex((item: any) => item?.id === option?.id);
      if (foundedAwayAssetIndex > -1) {
        const newAwayAssets = [...this.awayAssets.value];
        newAwayAssets.splice(foundedAwayAssetIndex, 1);
        const foundedAwayAsset = this.awayAssets.value[foundedAwayAssetIndex];
        this.homeAssets.next([...this.homeAssets.value, foundedAwayAsset]);
        this.awayAssets.next(newAwayAssets);
      }
    }

  }

  onDeleteAssets(stateName: 'homeAssets' | 'awayAssets', option: any) {
    const state = this[stateName];
    const foundedIndex = state.value.findIndex((el) => el?.id === option?.id);
    if (foundedIndex > -1) {
      const newStateAssets = [...state.value];
      newStateAssets.splice(foundedIndex, 1);
      this[stateName].next(newStateAssets);
    }
  }
}
