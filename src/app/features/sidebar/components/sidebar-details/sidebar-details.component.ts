import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../tasks/task.state';

@Component({
  selector: 'app-sidebar-details',
  templateUrl: './sidebar-details.component.html',
  styleUrls: ['./sidebar-details.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class SidebarDetailsComponent {
  @Input() task!: Task;
  @Output() statusChange = new EventEmitter<'Open' | 'In Progress' | 'Completed' | 'Overdue'>();

  onStatusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value as 'Open' | 'In Progress' | 'Completed' | 'Overdue';
    if (['Open', 'In Progress', 'Completed', 'Overdue'].includes(newStatus)) {
      this.statusChange.emit(newStatus);
    }
  }
}
