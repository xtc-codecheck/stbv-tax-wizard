/**
 * Validierungs-Fehlerklasse
 * @module errors/ValidationError
 */

import { AppError } from './AppError';

/**
 * Einzelner Validierungsfehler
 */
export interface ValidationIssue {
  /** Feldname */
  field: string;
  /** Fehlermeldung */
  message: string;
  /** Erhaltener Wert */
  value?: unknown;
}

/**
 * Fehlerklasse für Validierungsfehler
 */
export class ValidationError extends AppError {
  /** Liste der Validierungsprobleme */
  public readonly issues: ValidationIssue[];

  constructor(
    message: string,
    issues: ValidationIssue[] = [],
    context?: Record<string, unknown>
  ) {
    super(message, {
      code: 'VALIDATION_ERROR',
      severity: 'warning',
      category: 'validation',
      context: { ...context, issues },
    });
    this.name = 'ValidationError';
    this.issues = issues;
  }

  /**
   * Erstellt einen ValidationError aus Zod-Fehlern
   */
  static fromZodError(zodError: { errors: Array<{ path: (string | number)[]; message: string }> }): ValidationError {
    const issues: ValidationIssue[] = zodError.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    return new ValidationError('Validierung fehlgeschlagen', issues);
  }

  /**
   * Prüft, ob ein bestimmtes Feld einen Fehler hat
   */
  hasFieldError(field: string): boolean {
    return this.issues.some((issue) => issue.field === field);
  }

  /**
   * Gibt die Fehlermeldung für ein bestimmtes Feld zurück
   */
  getFieldError(field: string): string | undefined {
    return this.issues.find((issue) => issue.field === field)?.message;
  }

  /**
   * Gibt alle Fehlermeldungen als String-Array zurück
   */
  getMessages(): string[] {
    return this.issues.map((issue) => `${issue.field}: ${issue.message}`);
  }
}
