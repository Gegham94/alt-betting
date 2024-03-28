import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile.component';
import { MobileRoutingModule } from './mobile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderModule } from '../modules/header/header.module';

@NgModule({
  declarations: [MobileComponent],
  imports: [CommonModule, MobileRoutingModule, SharedModule, HeaderModule],
})
export class MobileModule {}
