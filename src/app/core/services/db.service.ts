import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { signal } from '@angular/core';

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
  readonly dbPromise: Promise<IDBPDatabase>;
  readonly tasksSignal = signal<Task[]>([]);
  readonly tasks = this.tasksSignal;
  selectedTaskId: string | null = null;

  constructor() {
    this.dbPromise = this.#initDB();
    this.fetchTasks();
  }

  async #initDB(): Promise<IDBPDatabase> {
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

  async fetchTasks(): Promise<Task[]> {
    try {
      const tasks = await this.getTasks();
      this.tasksSignal.set(tasks);
      return tasks;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async saveTask(task: Task): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.put(tasksStoreName, task);
      const tasks = await this.getTasks();
      this.tasksSignal.set(tasks);
    } catch (error) {
      console.error(error);
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      const db = await this.dbPromise;
      return db.getAll(tasksStoreName);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const db = await this.dbPromise;
      await db.delete(tasksStoreName, id);
      const tasks = await this.getTasks();
      this.tasksSignal.set(tasks);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  }

  async getTheme(): Promise<'light' | 'dark'> {
    try {
      const db = await this.dbPromise;
      const record = await db.get(settingsStoreName, 'theme');
      return (record?.value as 'light' | 'dark') || 'light';
    } catch (error) {
      console.error(error);
      return 'light';
    }
  }
}
