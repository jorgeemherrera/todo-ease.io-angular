import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
// import { ChatMessage } from '../models/chat-message.model'; 

const dbName = 'tasksDB';
const tasksStoreName = 'tasks';
const actionsStoreName = 'actions';
const settingsStoreName = 'settings';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private async initDB(): Promise<IDBPDatabase> {
    return await openDB(dbName, 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          if (!db.objectStoreNames.contains(tasksStoreName)) {
            db.createObjectStore(tasksStoreName, { keyPath: 'id' });
          }
        }
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains(settingsStoreName)) {
            db.createObjectStore(settingsStoreName, { keyPath: 'key' });
          }
        }
      },
    });
  }

  async saveTask(task: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put(tasksStoreName, task);
  }

  async getTasks(): Promise<any[]> {
    const db = await this.dbPromise;
    return await db.getAll(tasksStoreName);
  }

  async deleteTask(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(tasksStoreName, id);
  }

  async saveAction(action: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put(actionsStoreName, action);
  }

  async getActions(): Promise<any[]> {
    const db = await this.dbPromise;
    const actions = await db.getAll(actionsStoreName);
    return actions.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }

  async saveTheme(theme: 'light' | 'dark'): Promise<void> {
    const db = await this.dbPromise;
    await db.put(settingsStoreName, { key: 'theme', value: theme });
  }

  async getTheme(): Promise<'light' | 'dark' | undefined> {
    const db = await this.dbPromise;
    const record = await db.get(settingsStoreName, 'theme');
    return record?.value;
  }
}
