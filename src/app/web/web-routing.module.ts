import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './web.component';

import * as FromPages from './pages';

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: 'my-bets',
        component: FromPages.MyBetsComponent,
      },
      {
        path: 'results',
        component: FromPages.ResultsComponent,
      },
      {
        path: '',
        component: FromPages.LayoutSideBarComponent,
        children: [
          {
            path: 'match-builder',
            component: FromPages.MatchBuilderComponent,
          },
          {
            path: 'popular',
            component: FromPages.PopularComponent,
          },
          {
            path: 'my-games',
            component: FromPages.MyGamesComponent,
          },
          {
            path: '**',
            redirectTo: 'match-builder',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
