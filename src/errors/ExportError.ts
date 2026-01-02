/**
 * Export-Fehlerklasse
 * @module errors/ExportError
 */

import { AppError } from './AppError';

/**
 * Export-Fehlertypen
 */
export type ExportErrorType = 
  | 'PDF_GENERATION'
  | 'EXCEL_GENERATION'
  | 'CSV_GENERATION'
  | 'PRINT_ERROR'
  | 'EMAIL_ERROR'
  | 'DOWNLOAD_ERROR';

/**
 * Fehlerklasse für Export-Operationen
 */
export class ExportError extends AppError {
  /** Fehlertyp */
  public readonly type: ExportErrorType;
  /** Export-Format */
  public readonly format: string;

  constructor(
    message: string,
    type: ExportErrorType,
    format: string,
    originalError?: Error
  ) {
    super(message, {
      code: `EXPORT_${type}`,
      severity: 'error',
      category: 'export',
      context: { type, format },
      originalError,
    });
    this.name = 'ExportError';
    this.type = type;
    this.format = format;
  }

  /**
   * Erstellt einen PDF-Generierungsfehler
   */
  static pdfGeneration(originalError?: Error): ExportError {
    return new ExportError(
      'Fehler beim Erstellen der PDF',
      'PDF_GENERATION',
      'pdf',
      originalError
    );
  }

  /**
   * Erstellt einen Excel-Generierungsfehler
   */
  static excelGeneration(originalError?: Error): ExportError {
    return new ExportError(
      'Fehler beim Erstellen der Excel-Datei',
      'EXCEL_GENERATION',
      'xlsx',
      originalError
    );
  }

  /**
   * Erstellt einen CSV-Generierungsfehler
   */
  static csvGeneration(originalError?: Error): ExportError {
    return new ExportError(
      'Fehler beim Erstellen der CSV-Datei',
      'CSV_GENERATION',
      'csv',
      originalError
    );
  }

  /**
   * Erstellt einen E-Mail-Fehler
   */
  static emailError(originalError?: Error): ExportError {
    return new ExportError(
      'Fehler beim Senden der E-Mail',
      'EMAIL_ERROR',
      'email',
      originalError
    );
  }
}
