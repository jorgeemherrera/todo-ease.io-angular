import { inject, Inject, Injectable, signal } from '@angular/core';
import { DbService } from './db.service';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly theme = signal<Theme>('light');
  readonly #dbService = inject(DbService);

  constructor() {
    this.#fetchTheme();
  }

  async #fetchTheme(): Promise<void> {
    const storedTheme = await this.#dbService.getTheme();
    if (storedTheme) {
      this.#applyTheme(storedTheme);
    }
  }

  #applyTheme(newTheme: Theme): void {
    this.theme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  async toggleTheme(): Promise<void> {
    const currentTheme = this.theme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.#applyTheme(newTheme);
    await this.#dbService.saveTheme(newTheme);
  }

  getTheme(): Theme {
    return this.theme();
  }
}
