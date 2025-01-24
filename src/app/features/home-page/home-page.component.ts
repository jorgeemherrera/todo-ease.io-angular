import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ChatComponent } from '../chat/components/chat/chat.component';
import { SidebarComponent } from "../sidebar/components/sidebar/sidebar.component";
import { Task, TaskService } from '../../core/services/task.service';
import { Observable } from 'rxjs';
import { ModalService } from '../../core/services/modal.service';
import { ModalComponent } from "../../shared/modal/components/modal/modal.component";
import { TaskFormComponent } from "../task-form/components/task-form/task-form.component";
import { CommonModule } from '@angular/common';
import { DbService } from '../../core/services/db.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, ChatComponent, ModalComponent, TaskFormComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  private taskService = inject(TaskService);
  modalService = inject(ModalService);
  dbService = inject(DbService);
  tasks$: Observable<Task[]> = this.taskService.tasks$;
  selectedTask: any = null;
  openModal(taskId: string | null): void {
    const taskToEdit = this.taskService.getTaskById(taskId);
    this.modalService.openModal(taskToEdit);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  onTaskSelect(task: any): void {
    this.selectedTask = task;
  }

  constructor() {
    this.dbService.tasks$.subscribe(tasks => {
      if (tasks.length > 0) {
        this.selectedTask = tasks[0];
      } else {
        this.selectedTask = null;
      }
    });
  }

  onDeleteTask(taskId: string): void {
    this.dbService.deleteTask(taskId);

    this.dbService.tasks$.subscribe(tasks => {
      if (tasks.length > 0) {
        this.selectedTask = tasks[0];
      } else {
        this.selectedTask = null;
      }
    });
  }

  saveTask(task: any): void {
    const updatedTask = {
      ...task,
      createdAt: task.createdAt || new Date().toISOString(),
    };
  
    if (this.modalService.isEditing()) {
      this.dbService.saveTask(updatedTask);
    } else {
      this.dbService.saveTask(updatedTask);
    }
  
    this.modalService.closeModal();
  }
  
  
}
