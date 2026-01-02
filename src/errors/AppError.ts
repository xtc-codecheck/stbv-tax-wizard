/**
 * Basis-Fehlerklasse für die Anwendung
 * @module errors/AppError
 */

/**
 * Fehler-Schweregrade
 */
export type ErrorSeverity = 'info' | 'warning' | 'error' | 'critical';

/**
 * Fehler-Kategorien
 */
export type ErrorCategory = 'validation' | 'storage' | 'export' | 'calculation' | 'network' | 'unknown';

/**
 * Basis-Fehlerklasse mit erweiterten Metadaten
 */
export class AppError extends Error {
  /** Eindeutiger Fehlercode */
  public readonly code: string;
  /** Schweregrad */
  public readonly severity: ErrorSeverity;
  /** Kategorie */
  public readonly category: ErrorCategory;
  /** Zeitstempel */
  public readonly timestamp: Date;
  /** Zusätzlicher Kontext */
  public readonly context?: Record<string, unknown>;
  /** Ursprünglicher Fehler */
  public readonly originalError?: Error;

  constructor(
    message: string,
    options: {
      code?: string;
      severity?: ErrorSeverity;
      category?: ErrorCategory;
      context?: Record<string, unknown>;
      originalError?: Error;
    } = {}
  ) {
    super(message);
    this.name = 'AppError';
    this.code = options.code ?? 'UNKNOWN_ERROR';
    this.severity = options.severity ?? 'error';
    this.category = options.category ?? 'unknown';
    this.timestamp = new Date();
    this.context = options.context;
    this.originalError = options.originalError;

    // Erhält den Stack Trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Formatiert den Fehler für Logging
   */
  toLogFormat(): string {
    return `[${this.severity.toUpperCase()}] ${this.code}: ${this.message}`;
  }

  /**
   * Konvertiert den Fehler zu einem einfachen Objekt
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      severity: this.severity,
      category: this.category,
      timestamp: this.timestamp.toISOString(),
      context: this.context,
      stack: this.stack,
    };
  }
}
