import { Component, signal } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  readonly theme = signal<string>('');
  constructor(private themeService: ThemeService) {
    this.theme.set(this.themeService.getTheme());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.theme.set(this.themeService.getTheme());
  }
}
