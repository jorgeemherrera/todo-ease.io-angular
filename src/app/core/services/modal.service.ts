import { Injectable, WritableSignal, signal } from '@angular/core';
import { Task } from '../interfaces/Task';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  readonly isModalOpen: WritableSignal<boolean> = signal(false);
  readonly selectedTask: WritableSignal<Task | null> = signal(null);

  openModal(task: Task | null = null): void {
    this.selectedTask.set(task);
    this.isModalOpen.set(true);
  }
  
  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedTask.set(null);
  }

  isEditing(): boolean {
    return !!this.selectedTask();
  }

}
