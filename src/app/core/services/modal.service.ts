import { Injectable, WritableSignal, signal } from '@angular/core';
import { Task } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isModalOpen: WritableSignal<boolean> = signal(false);
  selectedTask: WritableSignal<Task | null> = signal(null);

  openModal(task: Task | null = null): void {
    this.selectedTask.set(task);  // Establece la tarea seleccionada para editar
    this.isModalOpen.set(true);   // Abre el modal
  }
  

  closeModal(): void {
    this.isModalOpen.set(false); // Cierra el modal
    this.selectedTask.set(null); // Limpia la tarea seleccionada
  }

  isEditing(): boolean {
    return !!this.selectedTask();  // Verifica si hay una tarea seleccionada para editar
  }

}
