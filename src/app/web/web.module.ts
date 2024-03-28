import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { WebRoutingModule } from './web-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../modules/header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as FromPages from './pages';
import * as FromComponent from './components';

@NgModule({
  declarations: [
    WebComponent,
    FromPages.LayoutSideBarComponent,
    FromPages.MatchBuilderComponent,
    FromPages.MyBetsComponent,
    FromPages.ResultsComponent,
    FromPages.MyGamesComponent,

    FromPages.PopularComponent,
    FromComponent.RegionComponent,
    FromComponent.SidebarComponent,
    FromComponent.SidebarViewComponent,
    FromComponent.MyBetsTableComponent,
    FromComponent.CompetitionComponent,
    FromComponent.RegionDetailComponent,
    FromComponent.CompetitionTypeComponent,
    FromComponent.CompetitionDetailComponent,
    FromComponent.BetslipComponent,
    FromComponent.BetslipCardComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WebModule {}
