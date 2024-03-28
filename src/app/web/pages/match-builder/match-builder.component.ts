import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, skip, Subscription } from 'rxjs';

import { MatchBuilderService } from '../../../services/match-builder.service';
import { IMatchBuilderFilter, IMatchBuilderTab, MATCH_BUILDER_FILTER, MATCH_BUILDER_TABS } from './constat';

@Component({
  selector: 'app-match-builder',
  templateUrl: './match-builder.component.html',
  styleUrl: './match-builder.component.scss',
})
export class MatchBuilderComponent implements OnInit, OnDestroy {
  tabs: IMatchBuilderTab[] = MATCH_BUILDER_TABS;
  activeTabId: number = MATCH_BUILDER_TABS[0].id;
  filters: IMatchBuilderFilter[] = MATCH_BUILDER_FILTER;
  activeFilter = new BehaviorSubject<IMatchBuilderFilter>(MATCH_BUILDER_FILTER[1]);

  observableCrossMatch?: Subscription;
  observableGroupWinner?: Subscription;
  activeFilterSubscription?: Subscription;

  constructor(
    public matchBuilderService: MatchBuilderService,
    private route: Router,
  ) {
    this.setActiveTabId();
  }

  onRemoveMatchBuilderCard() {
    this.matchBuilderService.homeAssets.next([]);
    this.matchBuilderService.awayAssets.next([]);
  }

  onSaveDraftMatchBuilderCard() {
    this.matchBuilderService.homeAssets.next([]);
    this.matchBuilderService.awayAssets.next([]);
  }

  setActiveTabId() {
    const state = this.route?.getCurrentNavigation()?.extras?.state;
    if (state?.hasOwnProperty('activeTabId')) {
      console.log('setActiveTabId');
      this.activeTabId = state['activeTabId'];
    }
  }

  addSubscriptions() {
    this.activeFilterSubscription = this.activeFilter.pipe(skip(1)).subscribe((value: IMatchBuilderFilter) => {
      console.log(value);
    });

    this.observableCrossMatch = combineLatest([
      this.matchBuilderService.homeAssets$,
      this.matchBuilderService.awayAssets$,
    ])
      .pipe(skip(1))
      .subscribe(([homeAssets, awayAssets]) => {
        this.activeTabId = 1;
      });

    this.observableGroupWinner = this.matchBuilderService.groupAssets$.pipe(skip(1)).subscribe((groupAssets) => {
      this.activeTabId = 2;
    });
  }

  ngOnInit() {
    this.addSubscriptions();
  }

  ngOnDestroy() {
    if (this.observableCrossMatch) {
      this.observableCrossMatch.unsubscribe();
    }
    if (this.observableGroupWinner) {
      this.observableGroupWinner.unsubscribe();
    }
    if (this.activeFilterSubscription) {
      // this.activeFilterSubscription.unsubscribe();
    }
  }

  onClearAllGroupWinners() {
    this.matchBuilderService.groupAssets.next([])
  }

  onSaveDraftGroupWinners() {
    this.matchBuilderService.groupAssets.next([])
  }
}
