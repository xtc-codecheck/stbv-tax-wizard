/**
 * Storage Service für typsichere LocalStorage-Operationen
 * @module services/StorageService
 */

import { z } from 'zod';
import { Result, ok, err } from '@/lib/result';
import { StorageError } from '@/errors';

/**
 * Generischer Storage Service
 */
export class StorageService {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  /**
   * Erstellt den vollständigen Schlüssel
   */
  private getKey(key: string): string {
    return this.prefix ? `${this.prefix}${key}` : key;
  }

  /**
   * Speichert einen Wert im LocalStorage
   */
  set<T>(key: string, value: T): Result<void, StorageError> {
    const fullKey = this.getKey(key);
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(fullKey, serialized);
      return ok(undefined);
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        return err(StorageError.quotaExceeded(fullKey));
      }
      return err(new StorageError(
        `Fehler beim Speichern von "${fullKey}"`,
        'WRITE_ERROR',
        fullKey,
        error instanceof Error ? error : undefined
      ));
    }
  }

  /**
   * Liest einen Wert aus dem LocalStorage ohne Schema-Validierung
   */
  getRaw<T>(key: string): Result<T | null, StorageError> {
    const fullKey = this.getKey(key);
    try {
      const item = localStorage.getItem(fullKey);
      if (item === null) {
        return ok(null);
      }
      const parsed = JSON.parse(item) as T;
      return ok(parsed);
    } catch (error) {
      return err(StorageError.parseError(fullKey, error instanceof Error ? error : undefined));
    }
  }

  /**
   * Liest einen Wert aus dem LocalStorage mit Zod-Schema-Validierung
   */
  get<T>(key: string, schema: z.ZodType<T>): Result<T | null, StorageError> {
    const fullKey = this.getKey(key);
    const rawResult = this.getRaw<unknown>(key);
    
    if (!rawResult.success) {
      // TypeScript narrowing: after this check, rawResult is Failure<StorageError>
      const failureResult = rawResult as { success: false; error: StorageError };
      return err(failureResult.error);
    }
    
    if (rawResult.data === null) {
      return ok(null);
    }

    const parseResult = schema.safeParse(rawResult.data);
    if (!parseResult.success) {
      return err(StorageError.schemaMismatch(fullKey));
    }

    return ok(parseResult.data);
  }

  /**
   * Liest einen Wert mit Fallback
   */
  getOrDefault<T>(key: string, schema: z.ZodType<T>, defaultValue: T): T {
    const result = this.get(key, schema);
    if (result.success && result.data !== null) {
      return result.data;
    }
    return defaultValue;
  }

  /**
   * Löscht einen Wert aus dem LocalStorage
   */
  remove(key: string): Result<void, StorageError> {
    const fullKey = this.getKey(key);
    try {
      localStorage.removeItem(fullKey);
      return ok(undefined);
    } catch (error) {
      return err(new StorageError(
        `Fehler beim Löschen von "${fullKey}"`,
        'WRITE_ERROR',
        fullKey,
        error instanceof Error ? error : undefined
      ));
    }
  }

  /**
   * Löscht alle Werte mit dem Präfix
   */
  clear(): Result<void, StorageError> {
    try {
      if (this.prefix) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(this.prefix)) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
      } else {
        localStorage.clear();
      }
      return ok(undefined);
    } catch (error) {
      return err(new StorageError(
        'Fehler beim Löschen des Speichers',
        'WRITE_ERROR',
        undefined,
        error instanceof Error ? error : undefined
      ));
    }
  }

  /**
   * Prüft, ob ein Schlüssel existiert
   */
  has(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  /**
   * Gibt alle Schlüssel mit dem Präfix zurück
   */
  keys(): string[] {
    const result: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (!this.prefix || key.startsWith(this.prefix))) {
        result.push(this.prefix ? key.slice(this.prefix.length) : key);
      }
    }
    return result;
  }
}

/**
 * Standard-Storage-Service-Instanz
 */
export const storageService = new StorageService();
