// IndexedDB Database Layer for Calorie Tracker
import type { FoodEntry, WeightEntry } from './types';

const DB_NAME = 'CalorieTrackerDB';
const DB_VERSION = 1;

class Database {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create food entries store
        if (!db.objectStoreNames.contains('foodEntries')) {
          const foodStore = db.createObjectStore('foodEntries', {
            keyPath: 'id',
            autoIncrement: true
          });
          foodStore.createIndex('date', 'date', { unique: false });
          foodStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Create weight entries store
        if (!db.objectStoreNames.contains('weightEntries')) {
          const weightStore = db.createObjectStore('weightEntries', {
            keyPath: 'id',
            autoIncrement: true
          });
          weightStore.createIndex('date', 'date', { unique: true });
          weightStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  // Food Entry Methods
  async addFoodEntry(entry: Omit<FoodEntry, 'id'>): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['foodEntries'], 'readwrite');
      const store = transaction.objectStore('foodEntries');
      const request = store.add(entry);

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(new Error('Failed to add food entry'));
    });
  }

  async getFoodEntriesByDate(date: string): Promise<FoodEntry[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['foodEntries'], 'readonly');
      const store = transaction.objectStore('foodEntries');
      const index = store.index('date');
      const request = index.getAll(date);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get food entries'));
    });
  }

  async getFoodEntriesInRange(startDate: string, endDate: string): Promise<FoodEntry[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['foodEntries'], 'readonly');
      const store = transaction.objectStore('foodEntries');
      const index = store.index('date');
      const range = IDBKeyRange.bound(startDate, endDate);
      const request = index.getAll(range);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get food entries'));
    });
  }

  async getAllFoodEntries(): Promise<FoodEntry[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['foodEntries'], 'readonly');
      const store = transaction.objectStore('foodEntries');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Failed to get all food entries'));
    });
  }

  async deleteFoodEntry(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['foodEntries'], 'readwrite');
      const store = transaction.objectStore('foodEntries');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete food entry'));
    });
  }

  // Weight Entry Methods
  async addOrUpdateWeightEntry(entry: Omit<WeightEntry, 'id'>): Promise<number> {
    // Check if entry exists for this date
    const existing = await this.getWeightEntryByDate(entry.date);
    
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['weightEntries'], 'readwrite');
      const store = transaction.objectStore('weightEntries');
      
      let request: IDBRequest;
      if (existing) {
        // Update existing
        request = store.put({ ...entry, id: existing.id });
      } else {
        // Add new
        request = store.add(entry);
      }

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(new Error('Failed to save weight entry'));
    });
  }

  async getWeightEntryByDate(date: string): Promise<WeightEntry | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['weightEntries'], 'readonly');
      const store = transaction.objectStore('weightEntries');
      const index = store.index('date');
      const request = index.get(date);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(new Error('Failed to get weight entry'));
    });
  }

  async getAllWeightEntries(): Promise<WeightEntry[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['weightEntries'], 'readonly');
      const store = transaction.objectStore('weightEntries');
      const request = store.getAll();

      request.onsuccess = () => {
        const entries = request.result;
        entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        resolve(entries);
      };
      request.onerror = () => reject(new Error('Failed to get weight entries'));
    });
  }

  async deleteWeightEntry(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['weightEntries'], 'readwrite');
      const store = transaction.objectStore('weightEntries');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete weight entry'));
    });
  }
}

export const database = new Database();
