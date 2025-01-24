import { Component, signal, inject, effect } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  readonly theme = signal<string>(''); 
  readonly themeService = inject(ThemeService);

  constructor() {
    effect(() => {
          this.theme.set(this.themeService.getTheme());
        }, { allowSignalWrites: true });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.theme.set(this.themeService.getTheme());
  }
}
