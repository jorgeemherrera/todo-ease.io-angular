import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChecklistItem } from '../../../task-form/interfaces/ChecklistItem';

@Component({
  selector: 'app-sidebar-checklist',
  templateUrl: './sidebar-checklist.component.html',
  styleUrls: ['./sidebar-checklist.component.scss'],
  standalone: true,
})
export class SidebarChecklistComponent {
  @Input() checklist: ChecklistItem[] = [];
  @Output() checklistUpdate = new EventEmitter<ChecklistItem>();

  toggleCheckbox(itemId: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.checklistUpdate.emit({ id: itemId, checked: inputElement.checked, label: '' });
    }
  }

  isOverdue(dueDate?: string): boolean {
    if (!dueDate) return false;
    const today = new Date();
    const itemDate = new Date(dueDate);
    return itemDate < today;
  }
}
