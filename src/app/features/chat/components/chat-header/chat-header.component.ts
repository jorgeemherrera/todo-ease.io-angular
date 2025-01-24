import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: true,
})
export class ChatHeaderComponent {
  @Input() searchQuery = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  @Input() selectedFilter = '';
  @Output() selectedFilterChange = new EventEmitter<string>();

  filters = [
    { label: 'Todas', value: 'all' },
    { label: 'Abiertas', value: 'open' },
    { label: 'En progreso', value: 'in-progress' },
    { label: 'Completadas', value: 'completed' },
    { label: 'Vencidas', value: 'overdue' },
  ];

  filterOpen = signal(false);

  onSearchQueryChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.searchQueryChange.emit(inputElement.value);
    }
  }

  toggleFilter(): void {
    this.filterOpen.set(!this.filterOpen());
  }

  selectFilter(filterValue: string): void {
    this.selectedFilterChange.emit(filterValue);
    this.filterOpen.set(false);
  }
}
