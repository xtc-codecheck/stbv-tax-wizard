/**
 * usePositionValidation Hook (Phase 2.3)
 * @module hooks/usePositionValidation
 * 
 * React Hook für Echtzeit-Positions-Validierung mit Debouncing
 */

import { useMemo, useCallback } from 'react';
import { Position } from '@/types/stbvv';
import {
  validatePosition,
  validateField,
  getMinObjectValue,
  ValidationResult,
  ValidationIssue,
  ValidatedPosition,
} from '@/schemas/positionValidation.schema';
import { getActivityPreset } from '@/utils/activityPresets';

export interface UsePositionValidationResult {
  /** Vollständiges Validierungsergebnis */
  validation: ValidationResult;
  /** Hat Fehler (blockiert Export) */
  hasErrors: boolean;
  /** Hat Warnungen (zeigt Hinweise) */
  hasWarnings: boolean;
  /** Ist die Position komplett ausgefüllt */
  isComplete: boolean;
  /** Fehler für ein spezifisches Feld */
  getFieldError: (field: keyof Position) => string | null;
  /** Warnung für ein spezifisches Feld */
  getFieldWarning: (field: keyof Position) => string | null;
  /** Suggestion für ein spezifisches Feld */
  getFieldSuggestion: (field: keyof Position) => string | null;
  /** Hat das Feld einen Fehler? */
  hasFieldError: (field: keyof Position) => boolean;
  /** Hat das Feld eine Warnung? */
  hasFieldWarning: (field: keyof Position) => boolean;
  /** Mindestgegenstandswert für die aktuelle Aktivität */
  minObjectValue: number;
  /** Ist der Gegenstandswert unter dem Minimum? */
  isBelowMinValue: boolean;
  /** Validiere ein einzelnes Feld bei Änderung */
  validateFieldOnChange: (field: keyof Position, value: unknown) => ValidationIssue | null;
}

/**
 * Hook für Echtzeit-Positions-Validierung
 */
export const usePositionValidation = (position: Position): UsePositionValidationResult => {
  // Konvertiere zu ValidatedPosition für Schema-Kompatibilität
  const validatedPosition = useMemo<ValidatedPosition>(() => ({
    id: position.id,
    activity: position.activity,
    description: position.description || null,
    objectValue: position.objectValue,
    tenthRate: {
      numerator: position.tenthRate.numerator,
      denominator: position.tenthRate.denominator as 10 | 20,
    },
    quantity: position.quantity,
    feeTable: position.feeTable,
    applyExpenseFee: position.applyExpenseFee,
    billingType: position.billingType,
    hourlyRate: position.hourlyRate ?? null,
    hours: position.hours ?? null,
    flatRate: position.flatRate ?? null,
  }), [position]);

  // Vollständige Validierung (memoized)
  const validation = useMemo(() => {
    return validatePosition(validatedPosition);
  }, [validatedPosition]);

  // Mindestgegenstandswert für aktuelle Aktivität
  const minObjectValue = useMemo(() => {
    return getMinObjectValue(position.activity);
  }, [position.activity]);

  // Prüft ob Gegenstandswert unter Minimum liegt
  const isBelowMinValue = useMemo(() => {
    if (position.billingType !== 'objectValue') return false;
    if (minObjectValue === 0) return false;
    return position.objectValue > 0 && position.objectValue < minObjectValue;
  }, [position.billingType, position.objectValue, minObjectValue]);

  // Position ist komplett, wenn alle erforderlichen Felder ausgefüllt sind
  const isComplete = useMemo(() => {
    if (!position.activity) return false;
    
    switch (position.billingType) {
      case 'objectValue':
        return position.objectValue > 0;
      case 'hourly':
        return (position.hourlyRate ?? 0) > 0 && (position.hours ?? 0) > 0;
      case 'flatRate':
        return (position.flatRate ?? 0) > 0;
      default:
        return false;
    }
  }, [position]);

  // Finde Issue für ein spezifisches Feld
  const getFieldIssue = useCallback((field: keyof Position, severity: 'error' | 'warning'): ValidationIssue | undefined => {
    return validation.issues.find(
      issue => issue.field === field && issue.severity === severity
    );
  }, [validation.issues]);

  // Fehler für Feld
  const getFieldError = useCallback((field: keyof Position): string | null => {
    const issue = getFieldIssue(field, 'error');
    return issue?.message ?? null;
  }, [getFieldIssue]);

  // Warnung für Feld
  const getFieldWarning = useCallback((field: keyof Position): string | null => {
    const issue = getFieldIssue(field, 'warning');
    return issue?.message ?? null;
  }, [getFieldIssue]);

  // Suggestion für Feld
  const getFieldSuggestion = useCallback((field: keyof Position): string | null => {
    const issue = validation.issues.find(i => i.field === field && i.suggestion);
    return issue?.suggestion ?? null;
  }, [validation.issues]);

  // Hat Feld einen Fehler?
  const hasFieldError = useCallback((field: keyof Position): boolean => {
    return validation.issues.some(i => i.field === field && i.severity === 'error');
  }, [validation.issues]);

  // Hat Feld eine Warnung?
  const hasFieldWarning = useCallback((field: keyof Position): boolean => {
    return validation.issues.some(i => i.field === field && i.severity === 'warning');
  }, [validation.issues]);

  // Validiere einzelnes Feld (für onChange)
  const validateFieldOnChange = useCallback((field: keyof Position, value: unknown): ValidationIssue | null => {
    return validateField(field as keyof ValidatedPosition, value, validatedPosition);
  }, [validatedPosition]);

  return {
    validation,
    hasErrors: validation.hasErrors,
    hasWarnings: validation.hasWarnings,
    isComplete,
    getFieldError,
    getFieldWarning,
    getFieldSuggestion,
    hasFieldError,
    hasFieldWarning,
    minObjectValue,
    isBelowMinValue,
    validateFieldOnChange,
  };
};

/**
 * Hook für Batch-Validierung mehrerer Positionen
 */
export const usePositionsValidation = (positions: Position[]): {
  isValid: boolean;
  totalErrors: number;
  totalWarnings: number;
  incompleteCount: number;
  getPositionValidation: (id: string) => ValidationResult | undefined;
} => {
  const validationMap = useMemo(() => {
    const map = new Map<string, ValidationResult>();
    positions.forEach(position => {
      const validatedPosition: ValidatedPosition = {
        id: position.id,
        activity: position.activity,
        description: position.description || null,
        objectValue: position.objectValue,
        tenthRate: {
          numerator: position.tenthRate.numerator,
          denominator: position.tenthRate.denominator as 10 | 20,
        },
        quantity: position.quantity,
        feeTable: position.feeTable,
        applyExpenseFee: position.applyExpenseFee,
        billingType: position.billingType,
        hourlyRate: position.hourlyRate ?? null,
        hours: position.hours ?? null,
        flatRate: position.flatRate ?? null,
      };
      map.set(position.id, validatePosition(validatedPosition));
    });
    return map;
  }, [positions]);

  const totals = useMemo(() => {
    let errors = 0;
    let warnings = 0;
    let incomplete = 0;

    validationMap.forEach((result) => {
      errors += result.issues.filter(i => i.severity === 'error').length;
      warnings += result.issues.filter(i => i.severity === 'warning').length;
      if (result.hasErrors) incomplete++;
    });

    return { errors, warnings, incomplete };
  }, [validationMap]);

  const getPositionValidation = useCallback((id: string) => {
    return validationMap.get(id);
  }, [validationMap]);

  return {
    isValid: totals.errors === 0,
    totalErrors: totals.errors,
    totalWarnings: totals.warnings,
    incompleteCount: totals.incomplete,
    getPositionValidation,
  };
};

export default usePositionValidation;
