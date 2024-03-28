import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { WebHeaderComponent } from './components/web-header/web-header.component';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { RouterLink, RouterLinkActive } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, WebHeaderComponent, MobileHeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class HeaderModule {}
