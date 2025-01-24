import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarHeaderComponent } from '../sidebar-header/sidebar-header.component';
import { SidebarDetailsComponent } from '../sidebar-details/sidebar-details.component';
import { SidebarChecklistComponent } from '../sidebar-checklist/sidebar-checklist.component';
import { Task, DbService } from '../../../../core/services/db.service'; // Asegúrate de importar DbService

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SidebarHeaderComponent, SidebarDetailsComponent, SidebarChecklistComponent, CommonModule],
})
export class SidebarComponent {
  @Input() set selectedTask(task: Task | null) {
    this._selectedTask.set(task); 
  }

  private _selectedTask = signal<Task | null>(null); 

  get selectedTask() {
    return this._selectedTask();
  }

  constructor(private dbService: DbService) {}

  onChecklistUpdate(event: { id: string; checked: boolean }): void {
    if (this.selectedTask) {
      this.selectedTask.checklist.forEach((item: { id: string; checked: boolean }) => {
        if (item.id === event.id) {
          item.checked = event.checked;
        }
      });
    }
  }

  onStatusChange(newStatus: 'Open' | 'In Progress' | 'Completed' | 'Overdue'): void {
    if (this.selectedTask) {
      const updatedTask = { ...this.selectedTask, status: newStatus };
      this._selectedTask.set(updatedTask); 

      this.dbService.saveTask(updatedTask);
    }
  }
}
