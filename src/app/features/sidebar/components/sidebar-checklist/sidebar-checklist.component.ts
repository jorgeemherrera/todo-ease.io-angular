import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-checklist',
  templateUrl: './sidebar-checklist.component.html',
  styleUrls: ['./sidebar-checklist.component.scss'],
  standalone: true,
})
export class SidebarChecklistComponent {
  @Input() checklist: { id: string; dueDate?: string; checked: boolean }[] = [];
  @Output() checklistUpdate = new EventEmitter<{ id: string; checked: boolean }>();

  toggleCheckbox(itemId: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.checklistUpdate.emit({ id: itemId, checked: inputElement.checked });
    }
  }
}
