// IndexedDB Database Layer for Calorie Tracker
import type { FoodEntry, WeightEntry, GoalWeight } from './types';

const DB_NAME = 'CalorieTrackerDB';
const DB_VERSION = 2; // Incremented for goal weight feature

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
        const oldVersion = event.oldVersion;

        // Create food entries store (v1)
        if (!db.objectStoreNames.contains('foodEntries')) {
          const foodStore = db.createObjectStore('foodEntries', {
            keyPath: 'id',
            autoIncrement: true
          });
          foodStore.createIndex('date', 'date', { unique: false });
          foodStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Create weight entries store (v1)
        if (!db.objectStoreNames.contains('weightEntries')) {
          const weightStore = db.createObjectStore('weightEntries', {
            keyPath: 'id',
            autoIncrement: true
          });
          weightStore.createIndex('date', 'date', { unique: true });
          weightStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // Create goal weight store (v2) - preserves existing data
        if (oldVersion < 2 && !db.objectStoreNames.contains('goalWeight')) {
          const goalStore = db.createObjectStore('goalWeight', {
            keyPath: 'id',
            autoIncrement: true
          });
          goalStore.createIndex('createdAt', 'createdAt', { unique: false });
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

  // Goal Weight Methods
  async setGoalWeight(goal: Omit<GoalWeight, 'id'>): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['goalWeight'], 'readwrite');
      const store = transaction.objectStore('goalWeight');
      
      // Clear existing goals and set new one
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        const addRequest = store.add(goal);
        addRequest.onsuccess = () => resolve(addRequest.result as number);
        addRequest.onerror = () => reject(new Error('Failed to set goal weight'));
      };
      clearRequest.onerror = () => reject(new Error('Failed to clear previous goals'));
    });
  }

  async getGoalWeight(): Promise<GoalWeight | null> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['goalWeight'], 'readonly');
      const store = transaction.objectStore('goalWeight');
      const request = store.getAll();

      request.onsuccess = () => {
        const goals = request.result;
        resolve(goals.length > 0 ? goals[0] : null);
      };
      request.onerror = () => reject(new Error('Failed to get goal weight'));
    });
  }

  async deleteGoalWeight(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = this.db.transaction(['goalWeight'], 'readwrite');
      const store = transaction.objectStore('goalWeight');
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to delete goal weight'));
    });
  }

  // Data Backup/Export Methods
  async exportAllData(): Promise<string> {
    const [foodEntries, weightEntries, goalWeight] = await Promise.all([
      this.getAllFoodEntries(),
      this.getAllWeightEntries(),
      this.getGoalWeight()
    ]);

    const exportData = {
      version: 2,
      exportDate: new Date().toISOString(),
      data: {
        foodEntries,
        weightEntries,
        goalWeight
      }
    };

    return JSON.stringify(exportData, null, 2);
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const importData = JSON.parse(jsonData);
      
      if (!importData.data) {
        throw new Error('Invalid backup format');
      }

      const { foodEntries, weightEntries, goalWeight } = importData.data;

      // Import food entries
      if (foodEntries && Array.isArray(foodEntries)) {
        for (const entry of foodEntries) {
          const { id, ...entryData } = entry;
          await this.addFoodEntry(entryData);
        }
      }

      // Import weight entries
      if (weightEntries && Array.isArray(weightEntries)) {
        for (const entry of weightEntries) {
          const { id, ...entryData } = entry;
          await this.addOrUpdateWeightEntry(entryData);
        }
      }

      // Import goal weight
      if (goalWeight) {
        const { id, ...goalData } = goalWeight;
        await this.setGoalWeight(goalData);
      }
    } catch (error) {
      throw new Error('Failed to import data: ' + (error as Error).message);
    }
  }
}

export const database = new Database();
