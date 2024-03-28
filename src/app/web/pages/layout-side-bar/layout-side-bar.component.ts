import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { MatchBuilderService } from '../../../services/match-builder.service';
import { Route, Router } from '@angular/router';
import { GlobalService } from '../../../services/global.service';
import { BetslipService } from '../../../services/betslip.service';

@Component({
  selector: 'app-layout-side-bar',
  templateUrl: './layout-side-bar.component.html',
  styleUrl: './layout-side-bar.component.scss',
})
export class LayoutSideBarComponent implements OnInit {
  constructor(
    private route: Router,
    public betslipService: BetslipService,
    private matchBuilderService: MatchBuilderService,
  ) {}

  ngOnInit() {
    combineLatest([this.matchBuilderService.homeAssets$, this.matchBuilderService.awayAssets$]).subscribe(
      ([homeAssets, awayAssets]) => {
        this.route.navigate(['/1/match-builder'], { state: { activeTabId: 1 } });
      },
    );

    this.matchBuilderService.groupAssets$.subscribe((groupAssets) => {
      this.route.navigate(['/1/match-builder'], { state: { activeTabId: 2 } });
    });
  }

  onChangeIsOpenBetSlip(open:boolean){
    this.betslipService.isOpenBetSlip = !open;
  }
}
