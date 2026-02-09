import { useEffect, useCallback } from 'react';
import { AppData } from '../types';
import { useApp } from '../context/AppContext';

const STORAGE_KEY = 'travel-app-data';

export function useLocalStorage() {
  const store = useApp();

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data: AppData = JSON.parse(stored);
        store.setAllData(data);
      } catch (error) {
        console.error('Failed to load data from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const data = store.getAllData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [store.visas, store.flightPackages]);

  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    store.clearAll();
  }, [store]);

  return { clearStorage };
}
