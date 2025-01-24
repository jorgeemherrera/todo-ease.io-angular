import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { openDB, IDBPDatabase } from 'idb';

const dbName = 'tasksDB';
const dbVersion = 2;
const tasksStoreName = 'tasks';
const settingsStoreName = 'settings';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  createdAt: string;
  checklist: {
    id: string;
    label: string;
    dueDate?: string;
    checked: boolean;
  }[];
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private dbPromise: Promise<IDBPDatabase>;
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
  private selectedTaskId: string | null = null;

  constructor() {
    this.dbPromise = this.initDB();
    this.fetchTasks();
  }

  private async initDB(): Promise<IDBPDatabase> {
    console.log('Initializing IndexedDB...');
    return openDB(dbName, dbVersion, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore(tasksStoreName, { keyPath: 'id' });
        }
        if (oldVersion < 2) {
          db.createObjectStore(settingsStoreName, { keyPath: 'key' });
        }
      },
    });
  }

  async fetchTasks(): Promise<void> {
    try {
      const tasks = await this.getTasks();
      this.tasksSubject.next(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async saveTask(task: Task): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.put(tasksStoreName, task);
      const tasks = await this.getTasks();
      this.tasksSubject.next(tasks);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const db = await this.dbPromise;
      return db.getAll(tasksStoreName);
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.delete(tasksStoreName, id);
      const tasks = await this.getTasks();
      this.tasksSubject.next(tasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  setSelectedTaskId(taskId: string | null): void {
    this.selectedTaskId = taskId;
  }

  getSelectedTaskId(): string | null {
    return this.selectedTaskId;
  }

  async saveTheme(theme: 'light' | 'dark'): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.put(settingsStoreName, { key: 'theme', value: theme });
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }

  async getTheme(): Promise<'light' | 'dark'> {
    try {
      const db = await this.dbPromise;
      const record = await db.get(settingsStoreName, 'theme');
      return (record?.value as 'light' | 'dark') || 'light';
    } catch (error) {
      console.error('Error getting theme:', error);
      return 'light';
    }
  }
}
