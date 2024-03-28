import { Component } from '@angular/core';
import { ISideBarOptions, SIDEBAR_CATEGORIES } from './constant';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  categories: ISideBarOptions[] = SIDEBAR_CATEGORIES;
  activeCategory: ISideBarOptions = this.categories[0];

  getActiveColor(category: ISideBarOptions) {
    if (this.themeService.theme === 'dark') {
      return this.activeCategory.id === category.id ? category.colorActiveDark : category.colorDark;
    } else {
      return this.activeCategory.id === category.id ? category.colorActiveLight : category.colorLight;
    }
  }

  handleActiveCategory(category: ISideBarOptions) {
    this.activeCategory = category;
  }

  constructor(public themeService: ThemeService) {}
}
