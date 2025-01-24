import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarHeaderComponent } from '../sidebar-header/sidebar-header.component';
import { SidebarDetailsComponent } from '../sidebar-details/sidebar-details.component';
import { SidebarChecklistComponent } from '../sidebar-checklist/sidebar-checklist.component';
import { Task, DbService } from '../../../../core/services/db.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SidebarHeaderComponent, SidebarDetailsComponent, SidebarChecklistComponent, CommonModule],
})
export class SidebarComponent {
  @Input() set selectedTask(task: Task) {this.#selectTask.set(task)}
  readonly #dbService = inject(DbService);
  readonly #selectTask = signal<Task | null>(null); 
  
  get selectedTask() {
    return this.#selectTask()!;
  }

  onChecklistUpdate(event: { id: string; checked: boolean }): void {
    if (this.selectedTask) {
      this.selectedTask.checklist!.forEach((item) => {
        if (item.id === event.id) item.checked = event.checked;
      });
      const updatedTask = { ...this.selectedTask };
      this.#selectTask.set(updatedTask);
      this.#dbService.saveTask(updatedTask);
    }
  }

  onStatusChange(newStatus: 'Open' | 'In Progress' | 'Completed' | 'Overdue'): void {
    if (this.selectedTask) {
      const updatedTask = { ...this.selectedTask, status: newStatus };
      this.#selectTask.set(updatedTask);
      this.#dbService.saveTask(updatedTask);
    }
  }
}
