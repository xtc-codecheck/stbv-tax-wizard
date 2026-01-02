/**
 * Typsicherer useLocalStorage Hook mit Zod-Validierung
 * @module hooks/useLocalStorage
 */

import { useState, useCallback, useEffect } from 'react';
import { z } from 'zod';
import { StorageError } from '@/errors';

/**
 * Optionen für den useLocalStorage Hook
 */
interface UseLocalStorageOptions<T> {
  /** Zod-Schema für Validierung */
  schema?: z.ZodType<T>;
  /** Debounce-Zeit in ms */
  debounceMs?: number;
  /** Callback bei Fehlern */
  onError?: (error: StorageError) => void;
}

/**
 * Typsicherer useLocalStorage Hook
 * 
 * @param key - LocalStorage-Schlüssel
 * @param initialValue - Initialwert
 * @param options - Optionale Konfiguration
 * @returns [value, setValue, removeValue]
 * 
 * @example
 * ```tsx
 * const [positions, setPositions, removePositions] = useLocalStorage(
 *   'positions',
 *   [],
 *   { schema: positionsArraySchema }
 * );
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const { schema, debounceMs, onError } = options;

  // Initialer Wert aus LocalStorage lesen
  const readValue = useCallback((): T => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }

      const parsed = JSON.parse(item);

      // Schema-Validierung wenn vorhanden
      if (schema) {
        const result = schema.safeParse(parsed);
        if (!result.success) {
          console.warn(`[useLocalStorage] Schema validation failed for "${key}":`, result.error);
          return initialValue;
        }
        return result.data;
      }

      return parsed as T;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, schema]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Debounce-Timer Ref
  const debounceTimerRef = { current: null as NodeJS.Timeout | null };

  // Wert setzen
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Unterstütze Funktions-Updates
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        // Mit oder ohne Debounce speichern
        const save = () => {
          try {
            localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            const storageError = error instanceof Error && error.name === 'QuotaExceededError'
              ? StorageError.quotaExceeded(key)
              : new StorageError(
                  `Fehler beim Speichern von "${key}"`,
                  'WRITE_ERROR',
                  key,
                  error instanceof Error ? error : undefined
                );
            onError?.(storageError);
          }
        };

        if (debounceMs) {
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
          debounceTimerRef.current = setTimeout(save, debounceMs);
        } else {
          save();
        }
      } catch (error) {
        console.error(`[useLocalStorage] Error setting "${key}":`, error);
      }
    },
    [key, storedValue, debounceMs, onError]
  );

  // Wert entfernen
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`[useLocalStorage] Error removing "${key}":`, error);
    }
  }, [key, initialValue]);

  // Synchronisiere mit anderen Tabs/Fenstern
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const newValue = JSON.parse(event.newValue);
          if (schema) {
            const result = schema.safeParse(newValue);
            if (result.success) {
              setStoredValue(result.data);
            }
          } else {
            setStoredValue(newValue);
          }
        } catch {
          // Ignoriere Parse-Fehler von anderen Tabs
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, schema]);

  // Cleanup Debounce-Timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return [storedValue, setValue, removeValue];
}
