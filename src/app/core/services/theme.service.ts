import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DbService } from './db.service';
export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  theme$ = this.themeSubject.asObservable();

  constructor(@Inject(DbService) private dbService: DbService) {
    this.fetchTheme();
  }

  private async fetchTheme(): Promise<void> {
    const storedTheme = await this.dbService.getTheme();
    if (storedTheme) {
      this.applyTheme(storedTheme);
    }
  }

  private applyTheme(newTheme: Theme): void {
    this.themeSubject.next(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  async toggleTheme(): Promise<void> {
    const currentTheme = this.themeSubject.value;
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
    await this.dbService.saveTheme(newTheme);
  }

  getTheme(): Theme {
    return this.themeSubject.value;
  }
}
