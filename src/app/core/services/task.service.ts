import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly tasks = signal<Task[]>([]);
  selectedTaskId: string | null = null;

  addTask(task: Task): void {
    this.tasks.set([...this.tasks(), task]);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index > -1) {
      tasks[index] = updatedTask;
      this.tasks.set([...tasks]);
    }
  }

  deleteTask(taskId: string): void {
    const tasks = this.tasks();
    this.tasks.set(tasks.filter((task) => task.id !== taskId));
  }

  selectTask(taskId: string): void {
    this.selectedTaskId = taskId;
  }

  getSelectedTask(): Task | null {
    const tasks = this.tasks();
    return tasks.find((task) => task.id === this.selectedTaskId) || null;
  }

  getTaskById(taskId: string | null): Task | null {
    const tasks = this.tasks();
    return tasks.find((task) => task.id === taskId) || null;
  }
}
