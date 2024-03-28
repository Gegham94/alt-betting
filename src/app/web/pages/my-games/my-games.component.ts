import { Component } from '@angular/core';
import { IMyGamesTab, MY_GAMES_TABS } from './constat';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.scss',
})
export class MyGamesComponent {
  tabs: IMyGamesTab[] = MY_GAMES_TABS;
  activeTabId: number = MY_GAMES_TABS[0].id;


}
