import { DatabaseState } from '../types';
import { initialDatabase } from '../data/initialDatabase';

const STORAGE_KEY = 'portfolio_cms_db_v1';

export const storageService = {
  /**
   * Load database state from localStorage or return default seeds
   */
  loadDatabase(): DatabaseState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as DatabaseState;
        // Basic schema verification
        if (parsed.profile && parsed.projects && parsed.skills) {
          return {
            ...initialDatabase,
            ...parsed,
            profile: { ...initialDatabase.profile, ...(parsed.profile || {}) }
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load portfolio database from storage, falling back to defaults:', e);
    }
    return initialDatabase;
  },

  /**
   * Save entire database state to localStorage
   */
  saveDatabase(db: DatabaseState): void {
    try {
      const payload: DatabaseState = {
        ...db,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save portfolio database to storage:', e);
    }
  },

  /**
   * Export database as downloadable JSON file
   */
  exportJSON(db: DatabaseState): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portfolio_database_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  /**
   * Reset database back to default initial seed template
   */
  resetDefaults(): DatabaseState {
    localStorage.removeItem(STORAGE_KEY);
    return initialDatabase;
  }
};
