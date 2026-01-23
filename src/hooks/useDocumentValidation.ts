/**
 * useDocumentValidation - Hook für Dokumentvalidierung vor Export
 * @module hooks/useDocumentValidation
 * 
 * Integriert useErrorHandler für strukturiertes Fehler-Logging
 */

import { useCallback, useMemo } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { Position, ClientData, Discount } from '@/types/stbvv';
import { calculateTotal } from '@/utils/stbvvCalculator';
import { VALIDATION } from '@/constants';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const emailSchema = z.string().email();

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

interface UseDocumentValidationOptions {
  positions: Position[];
  clientData: ClientData;
  documentFee: number;
  includeVAT: boolean;
  discount: Discount | null;
}

interface UseDocumentValidationReturn {
  /** Validiert das Dokument und zeigt Toast-Meldungen bei Fehlern/Warnungen */
  validateBeforeGenerate: () => boolean;
  /** Validiert das Dokument ohne Toast-Meldungen */
  validateSilently: () => ValidationResult;
  /** Prüft, ob mindestens eine Position vorhanden ist */
  hasPositions: boolean;
  /** Prüft, ob alle Positionen vollständig sind */
  allPositionsComplete: boolean;
  /** Prüft, ob die E-Mail-Adresse gültig ist (falls vorhanden) */
  isEmailValid: boolean;
}

/**
 * Hook zur Validierung von Dokumenten vor dem Export
 */
export function useDocumentValidation({
  positions,
  clientData,
  documentFee,
  includeVAT,
  discount,
}: UseDocumentValidationOptions): UseDocumentValidationReturn {
  
  // Error handler hook
  const { handleError, showErrorToast } = useErrorHandler();
  // Memoized validation results
  const validationResult = useMemo((): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check for positions
    if (positions.length === 0) {
      errors.push('Bitte fügen Sie mindestens eine Position hinzu');
    }

    // Validate each position
    positions.forEach((position, index) => {
      if (!position.activity) {
        errors.push(`Position ${index + 1}: Tätigkeit fehlt`);
      }
      
      switch (position.billingType) {
        case 'objectValue':
          if (!position.objectValue || position.objectValue <= 0) {
            errors.push(`Position ${index + 1}: Gegenstandswert muss größer als 0 sein`);
          }
          break;
        case 'hourly':
          if (!position.hourlyRate || position.hourlyRate <= 0) {
            errors.push(`Position ${index + 1}: Stundensatz muss größer als 0 sein`);
          }
          if (!position.hours || position.hours <= 0) {
            errors.push(`Position ${index + 1}: Stunden müssen größer als 0 sein`);
          }
          break;
        case 'flatRate':
          if (!position.flatRate || position.flatRate <= 0) {
            errors.push(`Position ${index + 1}: Pauschalbetrag muss größer als 0 sein`);
          }
          break;
      }
    });

    // Check totals
    const calculatedTotals = calculateTotal(positions, documentFee, includeVAT, discount);
    if (calculatedTotals.totalGross < VALIDATION.MIN_TOTAL_WARNING) {
      warnings.push(`Gesamtsumme (${calculatedTotals.totalGross.toFixed(2)} €) ist sehr niedrig`);
    }

    // Check VAT
    if (!includeVAT) {
      warnings.push('Umsatzsteuer ist nicht aktiviert');
    }

    // Validate email if provided
    if (clientData.email) {
      try {
        emailSchema.parse(clientData.email);
      } catch {
        errors.push('E-Mail-Adresse ist ungültig');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }, [positions, clientData.email, documentFee, includeVAT, discount]);

  // Validate silently (no toasts)
  const validateSilently = useCallback((): ValidationResult => {
    return validationResult;
  }, [validationResult]);

  // Validate with toast messages using error handler
  const validateBeforeGenerate = useCallback((): boolean => {
    const { isValid, errors, warnings } = validationResult;

    if (!isValid) {
      // Log validation errors with structured error handling
      errors.forEach((error, index) => {
        handleError(error, {
          code: 'VALIDATION_ERROR',
          context: { errorIndex: index, totalErrors: errors.length },
          showToast: index === 0, // Only show toast for first error
        });
      });
      
      // Show consolidated error message
      if (errors.length > 1) {
        showErrorToast(
          'Validierungsfehler',
          `${errors.length} Fehler gefunden. Bitte korrigieren Sie die markierten Felder.`,
          { severity: 'error' }
        );
      }
      return false;
    }

    if (warnings.length > 0) {
      const warningMessage = `Hinweise:\n• ${warnings.join('\n• ')}`;
      toast.warning(warningMessage, { duration: 4000 });
    }

    return true;
  }, [validationResult, handleError, showErrorToast]);

  // Derived booleans for quick checks
  const hasPositions = positions.length > 0;

  const allPositionsComplete = useMemo(() => {
    return positions.every((position) => {
      if (!position.activity) return false;
      switch (position.billingType) {
        case 'objectValue':
          return position.objectValue && position.objectValue > 0;
        case 'hourly':
          return position.hourlyRate && position.hourlyRate > 0 && position.hours && position.hours > 0;
        case 'flatRate':
          return position.flatRate && position.flatRate > 0;
        default:
          return true;
      }
    });
  }, [positions]);

  const isEmailValid = useMemo(() => {
    if (!clientData.email) return true; // Empty is considered valid (optional)
    try {
      emailSchema.parse(clientData.email);
      return true;
    } catch {
      return false;
    }
  }, [clientData.email]);

  return {
    validateBeforeGenerate,
    validateSilently,
    hasPositions,
    allPositionsComplete,
    isEmailValid,
  };
}
