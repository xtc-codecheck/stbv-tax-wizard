/**
 * useErrorHandler Hook (Phase 4.2)
 * @module hooks/useErrorHandler
 * 
 * React Hook für benutzerfreundliche Fehlerbehandlung
 */

import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { AppError, ErrorSeverity, ErrorCategory } from '@/errors';
import {
  ErrorLoggingService,
  logError,
  toUserFriendlyError,
  getErrorSolutions,
  type ErrorLogEntry,
  type UserFriendlyError,
  type ErrorSolution,
} from '@/services/ErrorLoggingService';

export interface UseErrorHandlerResult {
  /** Behandelt einen Fehler und zeigt Toast an */
  handleError: (
    error: Error | AppError | string,
    options?: {
      code?: string;
      context?: Record<string, unknown>;
      showToast?: boolean;
    }
  ) => ErrorLogEntry;
  
  /** Zeigt benutzerfreundliche Fehlermeldung an */
  showErrorToast: (
    title: string,
    message: string,
    options?: {
      severity?: ErrorSeverity;
      action?: () => void;
      actionLabel?: string;
    }
  ) => void;
  
  /** Letzter Fehler */
  lastError: UserFriendlyError | null;
  
  /** Lösungsvorschläge für den letzten Fehler */
  lastErrorSolutions: ErrorSolution[];
  
  /** Setzt den letzten Fehler zurück */
  clearLastError: () => void;
  
  /** Wrapper für async Funktionen mit Fehlerbehandlung */
  withErrorHandling: <T>(
    fn: () => Promise<T>,
    options?: {
      errorCode?: string;
      context?: Record<string, unknown>;
      successMessage?: string;
    }
  ) => Promise<T | null>;
}

/**
 * Hook für benutzerfreundliche Fehlerbehandlung
 */
export const useErrorHandler = (): UseErrorHandlerResult => {
  const [lastError, setLastError] = useState<UserFriendlyError | null>(null);
  const [lastErrorSolutions, setLastErrorSolutions] = useState<ErrorSolution[]>([]);

  /**
   * Behandelt einen Fehler
   */
  const handleError = useCallback((
    error: Error | AppError | string,
    options: {
      code?: string;
      context?: Record<string, unknown>;
      showToast?: boolean;
    } = {}
  ): ErrorLogEntry => {
    const { code, context, showToast = true } = options;
    
    // Fehler loggen
    const entry = logError(error, {
      code,
      context,
      severity: error instanceof AppError ? error.severity : 'error',
      category: error instanceof AppError ? error.category : 'unknown',
    });
    
    // Benutzerfreundliche Darstellung
    const userFriendly = toUserFriendlyError(error, code ?? entry.code);
    setLastError(userFriendly);
    
    // Lösungsvorschläge
    const solutions = getErrorSolutions(entry.code);
    setLastErrorSolutions(solutions);
    
    // Toast anzeigen
    if (showToast) {
      const toastOptions: Parameters<typeof toast.error>[1] = {
        description: userFriendly.message,
        duration: 5000,
      };
      
      // Aktion hinzufügen wenn verfügbar
      if (solutions.length > 0 && solutions[0].actionLabel) {
        toastOptions.action = {
          label: solutions[0].actionLabel,
          onClick: solutions[0].action ?? (() => {}),
        };
      }
      
      switch (userFriendly.severity) {
        case 'critical':
        case 'error':
          toast.error(userFriendly.title, toastOptions);
          break;
        case 'warning':
          toast.warning(userFriendly.title, toastOptions);
          break;
        case 'info':
          toast.info(userFriendly.title, toastOptions);
          break;
      }
    }
    
    return entry;
  }, []);

  /**
   * Zeigt benutzerfreundliche Fehlermeldung an
   */
  const showErrorToast = useCallback((
    title: string,
    message: string,
    options: {
      severity?: ErrorSeverity;
      action?: () => void;
      actionLabel?: string;
    } = {}
  ) => {
    const { severity = 'error', action, actionLabel } = options;
    
    const toastOptions: Parameters<typeof toast.error>[1] = {
      description: message,
      duration: 5000,
    };
    
    if (action && actionLabel) {
      toastOptions.action = {
        label: actionLabel,
        onClick: action,
      };
    }
    
    switch (severity) {
      case 'critical':
      case 'error':
        toast.error(title, toastOptions);
        break;
      case 'warning':
        toast.warning(title, toastOptions);
        break;
      case 'info':
        toast.info(title, toastOptions);
        break;
    }
  }, []);

  /**
   * Setzt den letzten Fehler zurück
   */
  const clearLastError = useCallback(() => {
    setLastError(null);
    setLastErrorSolutions([]);
  }, []);

  /**
   * Wrapper für async Funktionen mit automatischer Fehlerbehandlung
   */
  const withErrorHandling = useCallback(async <T>(
    fn: () => Promise<T>,
    options: {
      errorCode?: string;
      context?: Record<string, unknown>;
      successMessage?: string;
    } = {}
  ): Promise<T | null> => {
    try {
      const result = await fn();
      
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      
      return result;
    } catch (error) {
      handleError(
        error instanceof Error ? error : String(error),
        {
          code: options.errorCode,
          context: options.context,
          showToast: true,
        }
      );
      return null;
    }
  }, [handleError]);

  return {
    handleError,
    showErrorToast,
    lastError,
    lastErrorSolutions,
    clearLastError,
    withErrorHandling,
  };
};

export default useErrorHandler;
