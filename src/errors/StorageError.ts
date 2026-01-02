/**
 * Storage-Fehlerklasse
 * @module errors/StorageError
 */

import { AppError } from './AppError';

/**
 * Storage-Fehlertypen
 */
export type StorageErrorType = 
  | 'QUOTA_EXCEEDED'
  | 'READ_ERROR'
  | 'WRITE_ERROR'
  | 'PARSE_ERROR'
  | 'SCHEMA_MISMATCH'
  | 'NOT_FOUND'
  | 'PERMISSION_DENIED';

/**
 * Fehlerklasse für LocalStorage-Operationen
 */
export class StorageError extends AppError {
  /** Fehlertyp */
  public readonly type: StorageErrorType;
  /** Betroffener Schlüssel */
  public readonly key?: string;

  constructor(
    message: string,
    type: StorageErrorType,
    key?: string,
    originalError?: Error
  ) {
    super(message, {
      code: `STORAGE_${type}`,
      severity: type === 'QUOTA_EXCEEDED' ? 'critical' : 'error',
      category: 'storage',
      context: { type, key },
      originalError,
    });
    this.name = 'StorageError';
    this.type = type;
    this.key = key;
  }

  /**
   * Erstellt einen QuotaExceeded-Fehler
   */
  static quotaExceeded(key?: string): StorageError {
    return new StorageError(
      'Speicherplatz voll. Bitte löschen Sie alte Daten.',
      'QUOTA_EXCEEDED',
      key
    );
  }

  /**
   * Erstellt einen Parse-Fehler
   */
  static parseError(key: string, originalError?: Error): StorageError {
    return new StorageError(
      `Fehler beim Lesen der Daten aus "${key}"`,
      'PARSE_ERROR',
      key,
      originalError
    );
  }

  /**
   * Erstellt einen Schema-Mismatch-Fehler
   */
  static schemaMismatch(key: string): StorageError {
    return new StorageError(
      `Datenformat in "${key}" entspricht nicht dem erwarteten Schema`,
      'SCHEMA_MISMATCH',
      key
    );
  }

  /**
   * Erstellt einen Not-Found-Fehler
   */
  static notFound(key: string): StorageError {
    return new StorageError(
      `Keine Daten für "${key}" gefunden`,
      'NOT_FOUND',
      key
    );
  }

  /**
   * Prüft, ob es ein Quota-Exceeded-Fehler ist
   */
  isQuotaExceeded(): boolean {
    return this.type === 'QUOTA_EXCEEDED';
  }
}
