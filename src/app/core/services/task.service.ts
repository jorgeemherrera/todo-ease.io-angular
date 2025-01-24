import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  checklist: { id: string; label: string; checked: boolean; dueDate?: string }[];
}


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  private selectedTaskId: string | null = null;

  addTask(task: Task): void {
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...tasks, task]);
  }
  

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index > -1) {
      tasks[index] = updatedTask;
      this.tasksSubject.next([...tasks]);
    }
  }
  
  deleteTask(taskId: string): void {
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next(tasks.filter((task) => task.id !== taskId));
  }

  selectTask(taskId: string): void {
    this.selectedTaskId = taskId;
  }

  getSelectedTask(): Task | null {
    const tasks = this.tasksSubject.getValue();
    return tasks.find((task) => task.id === this.selectedTaskId) || null;
  }

  getTaskById(taskId: string | null): Task | null {
    const tasks = this.tasksSubject.getValue();
    return tasks.find((task) => task.id === taskId) || null;
  }
  
}
