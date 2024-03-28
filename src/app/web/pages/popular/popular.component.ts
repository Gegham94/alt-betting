import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, skip } from 'rxjs';
import { IPopularFilter, IPopularTab, POPULAR_FILTER, POPULAR_TABS } from './constat';
import { IMatchBuilderFilter } from '../match-builder/constat';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent implements OnInit{
  tabs: IPopularTab[] = POPULAR_TABS;
  activeTabId: number = POPULAR_TABS[0].id;

  filters: IPopularFilter[] = POPULAR_FILTER;
  activeFilter = new BehaviorSubject<IPopularFilter>(POPULAR_FILTER[1]);

  ngOnInit() {
    this.activeFilter.pipe(skip(1)).subscribe((value:IMatchBuilderFilter)=>{
      console.log(value);
    })
  }
}
