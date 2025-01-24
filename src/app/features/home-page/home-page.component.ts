import { Component, effect, Inject, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ChatComponent } from '../chat/components/chat/chat.component';
import { SidebarComponent } from "../sidebar/components/sidebar/sidebar.component";
import { TaskService } from '../../core/services/task.service';
import { ModalService } from '../../core/services/modal.service';
import { DbService, Task } from '../../core/services/db.service';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { TaskFormComponent } from "../task-form/components/task-form/task-form.component";
import { ModalComponent } from "../../shared/modal/components/modal/modal.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ChatComponent, CommonModule, TaskFormComponent, ModalComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  readonly tasks = signal<Task[]>([]);
  readonly selectedTask = signal<Task | null>(null);
  readonly dbService = inject(DbService);
  readonly modalService = inject(ModalService);
  readonly taskService = inject(TaskService);

  constructor() {
      effect(() => {
        const tasks = this.dbService.tasks();
        this.tasks.set(tasks);
        this.selectedTask.set(tasks.length > 0 ? tasks[0] : null);
    }, { allowSignalWrites: true });
  }

  openModal(taskId: string | null): void {
    const taskToEdit = this.taskService.getTaskById(taskId);
    this.modalService.openModal(taskToEdit);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onTaskSelect(task: Task): void {
    this.selectedTask.set(task);
  }

  onDeleteTask(taskId: string): void {
    this.dbService.deleteTask(taskId);
  }

  saveTask(task: Task): void {
    const updatedTask = {
      ...task,
      createdAt: task.createdAt || new Date().toISOString(),
    };

    this.dbService.saveTask(updatedTask);
    this.modalService.closeModal();
  }
}
