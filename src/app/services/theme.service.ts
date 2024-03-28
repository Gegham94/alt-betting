import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private canClick = true;

  theme: 'light' | 'dark' = 'dark';

  toggleTheme() {
    if (!this.canClick) return;
    this.canClick = false;
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.canClick = true;
    document.documentElement.className = this.theme;

    document.documentElement.id = this.theme;
  }
}
