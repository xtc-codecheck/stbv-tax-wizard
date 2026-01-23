/**
 * Error-Logging-Service (Phase 4.1)
 * @module services/ErrorLoggingService
 * 
 * Strukturiertes Error-Logging mit:
 * - Kategorisierung und Schweregrade
 * - Kontextinformationen
 * - Lösungsvorschläge
 * - Fehlerhistorie (Memory-basiert)
 */

import { AppError, ErrorSeverity, ErrorCategory } from '@/errors';

// ============== Types ==============

export interface ErrorLogEntry {
  id: string;
  timestamp: Date;
  severity: ErrorSeverity;
  category: ErrorCategory;
  code: string;
  message: string;
  userMessage: string;
  suggestion?: string;
  context?: Record<string, unknown>;
  stack?: string;
  resolved: boolean;
}

export interface ErrorSolution {
  code: string;
  title: string;
  description: string;
  action?: () => void;
  actionLabel?: string;
}

export interface UserFriendlyError {
  title: string;
  message: string;
  severity: ErrorSeverity;
  suggestions: ErrorSolution[];
  technicalDetails?: string;
}

// ============== Error-Code zu Lösung Mapping ==============

const ERROR_SOLUTIONS: Record<string, ErrorSolution[]> = {
  // Validierungsfehler
  'ACTIVITY_REQUIRED': [{
    code: 'SELECT_ACTIVITY',
    title: 'Tätigkeit auswählen',
    description: 'Wählen Sie eine Tätigkeit aus der Dropdown-Liste aus.',
  }],
  'OBJECT_VALUE_REQUIRED': [{
    code: 'ENTER_VALUE',
    title: 'Gegenstandswert eingeben',
    description: 'Geben Sie einen Gegenstandswert größer als 0 ein.',
  }],
  'BELOW_MIN_OBJECT_VALUE': [{
    code: 'USE_MIN_VALUE',
    title: 'Mindestgegenstandswert verwenden',
    description: 'Der eingegebene Wert liegt unter dem gesetzlichen Minimum gemäß § 24 StBVV.',
    actionLabel: 'Mindestgegenstandswert übernehmen',
  }],
  'HOURLY_RATE_REQUIRED': [{
    code: 'ENTER_RATE',
    title: 'Stundensatz eingeben',
    description: 'Geben Sie einen gültigen Stundensatz ein.',
  }],
  'HOURS_REQUIRED': [{
    code: 'ENTER_HOURS',
    title: 'Stunden eingeben',
    description: 'Geben Sie die Anzahl der geleisteten Stunden ein.',
  }],
  'FLAT_RATE_REQUIRED': [{
    code: 'ENTER_FLAT',
    title: 'Pauschalbetrag eingeben',
    description: 'Geben Sie einen gültigen Pauschalbetrag ein.',
  }],
  'BELOW_MIN_HOURLY_RATE': [{
    code: 'CHECK_RATE',
    title: 'Stundensatz prüfen',
    description: 'Der Stundensatz liegt unter dem Mindestsatz von 66 € gemäß § 13 StBVV.',
  }],
  'ABOVE_MAX_HOURLY_RATE': [{
    code: 'CHECK_RATE',
    title: 'Stundensatz prüfen',
    description: 'Der Stundensatz überschreitet den Höchstsatz von 164 € gemäß § 13 StBVV.',
  }],
  
  // Speicherfehler
  'STORAGE_QUOTA_EXCEEDED': [{
    code: 'CLEAR_STORAGE',
    title: 'Speicher freigeben',
    description: 'Der lokale Speicher ist voll. Löschen Sie alte Dokumente oder exportieren Sie diese.',
    actionLabel: 'Archiv öffnen',
  }],
  'STORAGE_READ_ERROR': [{
    code: 'RELOAD_PAGE',
    title: 'Seite neu laden',
    description: 'Die Daten konnten nicht geladen werden. Versuchen Sie, die Seite neu zu laden.',
    actionLabel: 'Seite neu laden',
  }],
  'STORAGE_WRITE_ERROR': [{
    code: 'RETRY_SAVE',
    title: 'Erneut speichern',
    description: 'Die Daten konnten nicht gespeichert werden. Versuchen Sie es erneut.',
  }],
  
  // Exportfehler
  'PDF_GENERATION_FAILED': [{
    code: 'RETRY_EXPORT',
    title: 'Export wiederholen',
    description: 'Die PDF-Generierung ist fehlgeschlagen. Prüfen Sie, ob alle Positionen vollständig sind.',
  }, {
    code: 'CHECK_POSITIONS',
    title: 'Positionen prüfen',
    description: 'Stellen Sie sicher, dass alle Positionen eine Tätigkeit und gültige Werte haben.',
  }],
  'EXCEL_GENERATION_FAILED': [{
    code: 'RETRY_EXPORT',
    title: 'Export wiederholen',
    description: 'Die Excel-Generierung ist fehlgeschlagen.',
  }],
  'NO_POSITIONS': [{
    code: 'ADD_POSITION',
    title: 'Position hinzufügen',
    description: 'Fügen Sie mindestens eine Position hinzu, bevor Sie exportieren.',
    actionLabel: 'Position hinzufügen',
  }],
  
  // Berechnungsfehler
  'CALCULATION_ERROR': [{
    code: 'CHECK_VALUES',
    title: 'Werte prüfen',
    description: 'Ein Berechnungsfehler ist aufgetreten. Prüfen Sie die eingegebenen Werte.',
  }],
  'INVALID_FEE_TABLE': [{
    code: 'SELECT_TABLE',
    title: 'Gebührentabelle korrigieren',
    description: 'Die gewählte Gebührentabelle ist für diese Tätigkeit nicht geeignet.',
  }],
  
  // Allgemeine Fehler
  'UNKNOWN_ERROR': [{
    code: 'RELOAD',
    title: 'Seite neu laden',
    description: 'Ein unbekannter Fehler ist aufgetreten. Laden Sie die Seite neu.',
    actionLabel: 'Neu laden',
  }],
};

// ============== Benutzerfreundliche Fehlermeldungen ==============

const USER_FRIENDLY_MESSAGES: Record<string, { title: string; message: string }> = {
  // Validierung
  'ACTIVITY_REQUIRED': {
    title: 'Tätigkeit fehlt',
    message: 'Bitte wählen Sie eine Tätigkeit für diese Position aus.',
  },
  'OBJECT_VALUE_REQUIRED': {
    title: 'Gegenstandswert fehlt',
    message: 'Bitte geben Sie einen Gegenstandswert für die Berechnung ein.',
  },
  'BELOW_MIN_OBJECT_VALUE': {
    title: 'Mindestgegenstandswert unterschritten',
    message: 'Der eingegebene Wert liegt unter dem gesetzlichen Minimum.',
  },
  'HOURLY_RATE_REQUIRED': {
    title: 'Stundensatz fehlt',
    message: 'Bitte geben Sie einen Stundensatz für die Zeitabrechnung ein.',
  },
  'HOURS_REQUIRED': {
    title: 'Stundenanzahl fehlt',
    message: 'Bitte geben Sie die Anzahl der geleisteten Stunden ein.',
  },
  'FLAT_RATE_REQUIRED': {
    title: 'Pauschalbetrag fehlt',
    message: 'Bitte geben Sie einen Pauschalbetrag ein.',
  },
  
  // Speicher
  'STORAGE_QUOTA_EXCEEDED': {
    title: 'Speicher voll',
    message: 'Der lokale Speicher ist erschöpft. Bitte löschen Sie alte Dokumente.',
  },
  'STORAGE_READ_ERROR': {
    title: 'Ladefehler',
    message: 'Die gespeicherten Daten konnten nicht geladen werden.',
  },
  'STORAGE_WRITE_ERROR': {
    title: 'Speicherfehler',
    message: 'Die Daten konnten nicht gespeichert werden.',
  },
  
  // Export
  'PDF_GENERATION_FAILED': {
    title: 'PDF-Export fehlgeschlagen',
    message: 'Das PDF konnte nicht erstellt werden. Bitte prüfen Sie Ihre Eingaben.',
  },
  'NO_POSITIONS': {
    title: 'Keine Positionen',
    message: 'Fügen Sie mindestens eine Position hinzu, um fortzufahren.',
  },
  
  // Standard
  'UNKNOWN_ERROR': {
    title: 'Unbekannter Fehler',
    message: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
  },
};

// ============== Error-Logging-Service ==============

class ErrorLoggingServiceClass {
  private errorLog: ErrorLogEntry[] = [];
  private maxLogSize = 100;
  private listeners: Set<(entry: ErrorLogEntry) => void> = new Set();

  /**
   * Generiert eine eindeutige ID
   */
  private generateId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Loggt einen Fehler
   */
  log(
    error: Error | AppError | string,
    options: {
      severity?: ErrorSeverity;
      category?: ErrorCategory;
      code?: string;
      context?: Record<string, unknown>;
    } = {}
  ): ErrorLogEntry {
    const isAppError = error instanceof AppError;
    const isError = error instanceof Error;
    
    const code = options.code ?? (isAppError ? error.code : 'UNKNOWN_ERROR');
    const severity = options.severity ?? (isAppError ? error.severity : 'error');
    const category = options.category ?? (isAppError ? error.category : 'unknown');
    const message = isError ? error.message : String(error);
    
    const userFriendly = USER_FRIENDLY_MESSAGES[code] ?? USER_FRIENDLY_MESSAGES['UNKNOWN_ERROR'];
    
    const entry: ErrorLogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      severity,
      category,
      code,
      message,
      userMessage: userFriendly.message,
      suggestion: ERROR_SOLUTIONS[code]?.[0]?.description,
      context: options.context ?? (isAppError ? error.context : undefined),
      stack: isError ? error.stack : undefined,
      resolved: false,
    };

    // Log hinzufügen
    this.errorLog.unshift(entry);
    
    // Größe begrenzen
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.pop();
    }

    // Listener benachrichtigen
    this.listeners.forEach(listener => listener(entry));

    // Console-Logging (strukturiert)
    this.logToConsole(entry);

    return entry;
  }

  /**
   * Strukturiertes Console-Logging
   */
  private logToConsole(entry: ErrorLogEntry): void {
    const prefix = `[${entry.severity.toUpperCase()}][${entry.category}]`;
    const logMethod = entry.severity === 'critical' || entry.severity === 'error' 
      ? console.error 
      : entry.severity === 'warning' 
        ? console.warn 
        : console.info;

    logMethod(
      `${prefix} ${entry.code}: ${entry.message}`,
      entry.context ? { context: entry.context } : ''
    );
  }

  /**
   * Wandelt einen Fehler in eine benutzerfreundliche Darstellung um
   */
  toUserFriendly(error: Error | AppError | string, code?: string): UserFriendlyError {
    const errorCode = code ?? (error instanceof AppError ? error.code : 'UNKNOWN_ERROR');
    const userFriendly = USER_FRIENDLY_MESSAGES[errorCode] ?? USER_FRIENDLY_MESSAGES['UNKNOWN_ERROR'];
    const solutions = ERROR_SOLUTIONS[errorCode] ?? ERROR_SOLUTIONS['UNKNOWN_ERROR'];
    const severity = error instanceof AppError ? error.severity : 'error';
    
    return {
      title: userFriendly.title,
      message: userFriendly.message,
      severity,
      suggestions: solutions,
      technicalDetails: error instanceof Error ? error.message : undefined,
    };
  }

  /**
   * Gibt alle Fehler-Logs zurück
   */
  getErrorLog(): ErrorLogEntry[] {
    return [...this.errorLog];
  }

  /**
   * Gibt ungelöste Fehler zurück
   */
  getUnresolvedErrors(): ErrorLogEntry[] {
    return this.errorLog.filter(e => !e.resolved);
  }

  /**
   * Markiert einen Fehler als gelöst
   */
  resolveError(id: string): void {
    const entry = this.errorLog.find(e => e.id === id);
    if (entry) {
      entry.resolved = true;
    }
  }

  /**
   * Löscht alle Logs
   */
  clearLog(): void {
    this.errorLog = [];
  }

  /**
   * Registriert einen Listener für neue Fehler
   */
  subscribe(listener: (entry: ErrorLogEntry) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Gibt Lösungsvorschläge für einen Fehlercode zurück
   */
  getSolutions(code: string): ErrorSolution[] {
    return ERROR_SOLUTIONS[code] ?? ERROR_SOLUTIONS['UNKNOWN_ERROR'];
  }

  /**
   * Gibt Statistiken über die Fehler zurück
   */
  getStats(): {
    total: number;
    bySeverity: Record<ErrorSeverity, number>;
    byCategory: Record<ErrorCategory, number>;
    unresolvedCount: number;
  } {
    const bySeverity: Record<ErrorSeverity, number> = {
      info: 0,
      warning: 0,
      error: 0,
      critical: 0,
    };
    
    const byCategory: Record<ErrorCategory, number> = {
      validation: 0,
      storage: 0,
      export: 0,
      calculation: 0,
      network: 0,
      unknown: 0,
    };

    let unresolvedCount = 0;

    this.errorLog.forEach(entry => {
      bySeverity[entry.severity]++;
      byCategory[entry.category]++;
      if (!entry.resolved) unresolvedCount++;
    });

    return {
      total: this.errorLog.length,
      bySeverity,
      byCategory,
      unresolvedCount,
    };
  }

  /**
   * Exportiert das Fehlerprotokoll als JSON
   */
  exportAsJSON(): string {
    return JSON.stringify({
      exportedAt: new Date().toISOString(),
      stats: this.getStats(),
      errors: this.errorLog,
    }, null, 2);
  }
}

// Singleton-Instanz
export const ErrorLoggingService = new ErrorLoggingServiceClass();

// ============== Helper-Funktionen ==============

/**
 * Kurzform für Error-Logging
 */
export const logError = (
  error: Error | AppError | string,
  options?: {
    severity?: ErrorSeverity;
    category?: ErrorCategory;
    code?: string;
    context?: Record<string, unknown>;
  }
): ErrorLogEntry => {
  return ErrorLoggingService.log(error, options);
};

/**
 * Wandelt Fehler in benutzerfreundliche Form um
 */
export const toUserFriendlyError = (
  error: Error | AppError | string,
  code?: string
): UserFriendlyError => {
  return ErrorLoggingService.toUserFriendly(error, code);
};

/**
 * Gibt Lösungsvorschläge zurück
 */
export const getErrorSolutions = (code: string): ErrorSolution[] => {
  return ErrorLoggingService.getSolutions(code);
};

export default ErrorLoggingService;
