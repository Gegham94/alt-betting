import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MobileComponent} from "./mobile.component";

const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
    children: [],
  },
  {
    path: '**',
    redirectTo: '',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileRoutingModule { }


