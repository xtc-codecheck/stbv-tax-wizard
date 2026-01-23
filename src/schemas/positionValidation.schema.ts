/**
 * Erweiterte Position-Validierung mit Zod (Phase 2.1)
 * @module schemas/positionValidation
 * 
 * Strikte Validierung für alle Position-Felder mit Plausibilitätsprüfungen
 * und Mindestgegenstandswert-Validierung gemäß StBVV 2025
 */

import { z } from 'zod';
import { VALIDATION, MIN_OBJECT_VALUES } from '@/constants';
import { TIME_FEE } from '@/constants';

// ============== Plausibilitätsgrenzen ==============

/** Maximaler Stundensatz (unrealistisch hoch = Eingabefehler) */
const MAX_HOURLY_RATE = 500;

/** Maximale Stunden pro Position (unrealistisch hoch = Eingabefehler) */
const MAX_HOURS = 1000;

/** Maximaler Pauschalbetrag pro Position */
const MAX_FLAT_RATE = 100000;

/** Maximaler Gegenstandswert (100 Mio €) */
const MAX_OBJECT_VALUE = 100000000;

/** Maximale Menge pro Position */
const MAX_QUANTITY = 999;

/** Maximale Beschreibungslänge */
const MAX_DESCRIPTION_LENGTH = 1000;

// ============== Validierungstypen ==============

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  field: string;
  message: string;
  severity: ValidationSeverity;
  code: string;
  suggestion?: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  hasErrors: boolean;
  hasWarnings: boolean;
}

// ============== Erweiterte Zod-Schemas ==============

/**
 * Schema für Zehntel-/Zwanzigstelsatz mit Bereichsprüfung
 */
export const tenthRateValidationSchema = z.object({
  numerator: z.number()
    .min(0.1, 'Zähler muss mindestens 0,1 sein')
    .max(50, 'Zähler darf maximal 50 sein')
    .refine(val => !isNaN(val), 'Ungültiger Zahlenwert'),
  denominator: z.union([z.literal(10), z.literal(20)])
    .refine(val => val === 10 || val === 20, 'Nenner muss 10 oder 20 sein'),
});

/**
 * Schema für Abrechnungsart
 */
export const billingTypeValidationSchema = z.enum(['objectValue', 'hourly', 'flatRate']);

/**
 * Schema für Gebührentabelle
 */
export const feeTableValidationSchema = z.enum(['A', 'B', 'C', 'D']);

/**
 * Vollständiges Position-Validierungsschema mit Plausibilitätsprüfungen
 */
export const positionValidationSchema = z.object({
  id: z.string().min(1, 'ID ist erforderlich'),
  activity: z.string()
    .min(1, 'Tätigkeit ist erforderlich')
    .max(200, 'Tätigkeit darf maximal 200 Zeichen haben'),
  description: z.string()
    .max(MAX_DESCRIPTION_LENGTH, `Beschreibung darf maximal ${MAX_DESCRIPTION_LENGTH} Zeichen haben`)
    .optional()
    .nullable(),
  objectValue: z.number()
    .min(0, 'Gegenstandswert darf nicht negativ sein')
    .max(MAX_OBJECT_VALUE, `Gegenstandswert darf maximal ${MAX_OBJECT_VALUE.toLocaleString('de-DE')} € betragen`),
  tenthRate: tenthRateValidationSchema,
  quantity: z.number()
    .int('Menge muss eine ganze Zahl sein')
    .min(1, 'Menge muss mindestens 1 sein')
    .max(MAX_QUANTITY, `Menge darf maximal ${MAX_QUANTITY} sein`),
  feeTable: feeTableValidationSchema,
  applyExpenseFee: z.boolean(),
  billingType: billingTypeValidationSchema,
  hourlyRate: z.number()
    .min(0, 'Stundensatz darf nicht negativ sein')
    .max(MAX_HOURLY_RATE, `Stundensatz darf maximal ${MAX_HOURLY_RATE} € betragen`)
    .optional()
    .nullable(),
  hours: z.number()
    .min(0, 'Stunden dürfen nicht negativ sein')
    .max(MAX_HOURS, `Stunden dürfen maximal ${MAX_HOURS} sein`)
    .optional()
    .nullable(),
  flatRate: z.number()
    .min(0, 'Pauschale darf nicht negativ sein')
    .max(MAX_FLAT_RATE, `Pauschale darf maximal ${MAX_FLAT_RATE.toLocaleString('de-DE')} € betragen`)
    .optional()
    .nullable(),
});

export type ValidatedPosition = z.infer<typeof positionValidationSchema>;

// ============== Mindestgegenstandswert-Mapping ==============

/**
 * Mapping von Aktivitätsnamen zu Mindestgegenstandswerten
 */
const activityMinValueMap: Record<string, number> = {
  'Einkommensteuererklärung': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Einkommensteuer Mantelbogen': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage N (Einkünfte aus nichtselbständiger Arbeit)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage V (Vermietung und Verpachtung)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage G (Gewerbebetrieb)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage S (Einkünfte aus selbständiger Arbeit)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage KAP (Kapitalerträge)': MIN_OBJECT_VALUES.KAPITALERTRAGSTEUER,
  'Anlage SO (Sonstige Einkünfte)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage R (Renten)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage L (Land- und Forstwirtschaft)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage EÜR (Einnahmen-Überschuss-Rechnung)': MIN_OBJECT_VALUES.EÜR,
  'Anlage Kind': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage AV (Altersvorsorge)': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage Unterhalt': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage Vorsorgeaufwand': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage Sonderausgaben': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage Außergewöhnliche Belastungen': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Anlage Haushaltsnahe Aufwendungen': MIN_OBJECT_VALUES.EINKOMMENSTEUER,
  'Jahresabschluss GmbH': MIN_OBJECT_VALUES.JAHRESABSCHLUSS,
  'Jahresabschluss Einzelunternehmen': MIN_OBJECT_VALUES.JAHRESABSCHLUSS,
  'Jahresabschluss (Kapitalgesellschaften)': MIN_OBJECT_VALUES.JAHRESABSCHLUSS,
  'Jahresabschluss (Personengesellschaften)': MIN_OBJECT_VALUES.JAHRESABSCHLUSS,
  'Buchführung (monatlich)': MIN_OBJECT_VALUES.BUCHFÜHRUNG,
  'Buchführung (quartal)': MIN_OBJECT_VALUES.BUCHFÜHRUNG,
  'Kontieren der Belege': MIN_OBJECT_VALUES.BUCHFÜHRUNG,
  'Körperschaftsteuererklärung': MIN_OBJECT_VALUES.KOERPERSCHAFTSTEUER,
  'Gewerbesteuererklärung': MIN_OBJECT_VALUES.GEWERBESTEUER,
  'Gewerbesteuerzerlegungserklärung': MIN_OBJECT_VALUES.GEWERBESTEUER_ZERLEGUNG,
  'Umsatzsteuer-Voranmeldung': MIN_OBJECT_VALUES.UST_VORANMELDUNG,
  'Umsatzsteuererklärung': MIN_OBJECT_VALUES.UST_JAHRESERKLAERUNG,
  'Zusammenfassende Meldung (ZM)': MIN_OBJECT_VALUES.UST_JAHRESERKLAERUNG,
  'Erbschaftsteuererklärung': MIN_OBJECT_VALUES.ERBSCHAFTSTEUER,
  'Schenkungsteuererklärung': MIN_OBJECT_VALUES.SCHENKUNGSTEUER,
  'Feststellung nach Bewertungsgesetz': MIN_OBJECT_VALUES.FESTSTELLUNG_BEWERTUNG,
  'Grundsteuererklärung': MIN_OBJECT_VALUES.GRUNDSTEUER,
  'Anmeldung Lohnsteuer': MIN_OBJECT_VALUES.LOHNSTEUER_ANMELDUNG,
  'Lohnsteuer-Ermäßigung': MIN_OBJECT_VALUES.LOHNSTEUER_ERMAESSIGUNG,
  'Kapitalertragsteueranmeldung': MIN_OBJECT_VALUES.KAPITALERTRAGSTEUER,
  'Antrag auf Vorsteuer-Vergütung': MIN_OBJECT_VALUES.VORSTEUER_VERGUETUNG,
  'Gesonderte und einheitliche Feststellung': MIN_OBJECT_VALUES.GESONDERTE_FESTSTELLUNG,
  'Ermittlung Zugewinnausgleichsforderung (§ 5 ErbStG)': MIN_OBJECT_VALUES.ZUGEWINNAUSGLEICH,
  'Lohnkonto': MIN_OBJECT_VALUES.LOHNBUCHHALTUNG,
  'Lohnbuchhaltung': MIN_OBJECT_VALUES.LOHNBUCHHALTUNG,
  'Lohnabrechnung pro Arbeitnehmer (monatlich)': MIN_OBJECT_VALUES.LOHNBUCHHALTUNG,
};

/**
 * Holt den Mindestgegenstandswert für eine Aktivität
 */
export const getMinObjectValue = (activity: string): number => {
  return activityMinValueMap[activity] ?? MIN_OBJECT_VALUES.DEFAULT;
};

// ============== Erweiterte Validierungsfunktionen ==============

/**
 * Validiert eine Position vollständig und gibt detaillierte Issues zurück
 */
export const validatePosition = (position: ValidatedPosition): ValidationResult => {
  const issues: ValidationIssue[] = [];

  // 1. Schema-Validierung mit Zod
  const schemaResult = positionValidationSchema.safeParse(position);
  if (!schemaResult.success) {
    schemaResult.error.errors.forEach(err => {
      issues.push({
        field: err.path.join('.'),
        message: err.message,
        severity: 'error',
        code: 'SCHEMA_VALIDATION_ERROR',
      });
    });
  }

  // 2. Aktivitäts-Validierung
  if (!position.activity || position.activity.trim() === '') {
    issues.push({
      field: 'activity',
      message: 'Bitte wählen Sie eine Tätigkeit aus',
      severity: 'error',
      code: 'ACTIVITY_REQUIRED',
    });
  }

  // 3. Abrechnungsart-spezifische Validierung
  switch (position.billingType) {
    case 'objectValue':
      // Gegenstandswert erforderlich
      if (!position.objectValue || position.objectValue <= 0) {
        issues.push({
          field: 'objectValue',
          message: 'Gegenstandswert muss größer als 0 sein',
          severity: 'error',
          code: 'OBJECT_VALUE_REQUIRED',
        });
      } else {
        // Mindestgegenstandswert-Prüfung
        const minValue = getMinObjectValue(position.activity);
        if (minValue > 0 && position.objectValue < minValue) {
          issues.push({
            field: 'objectValue',
            message: `Mindestgegenstandswert für "${position.activity}" ist ${minValue.toLocaleString('de-DE')} € (§ 24 StBVV)`,
            severity: 'warning',
            code: 'BELOW_MIN_OBJECT_VALUE',
            suggestion: `Mindestgegenstandswert von ${minValue.toLocaleString('de-DE')} € übernehmen`,
          });
        }
      }
      break;

    case 'hourly':
      if (!position.hourlyRate || position.hourlyRate <= 0) {
        issues.push({
          field: 'hourlyRate',
          message: 'Stundensatz muss größer als 0 sein',
          severity: 'error',
          code: 'HOURLY_RATE_REQUIRED',
        });
      } else if (position.hourlyRate < TIME_FEE.MIN_HOURLY) {
        issues.push({
          field: 'hourlyRate',
          message: `Stundensatz liegt unter dem Mindestsatz von ${TIME_FEE.MIN_HOURLY} € (§ 13 StBVV)`,
          severity: 'warning',
          code: 'BELOW_MIN_HOURLY_RATE',
        });
      } else if (position.hourlyRate > TIME_FEE.MAX_HOURLY) {
        issues.push({
          field: 'hourlyRate',
          message: `Stundensatz überschreitet den Höchstsatz von ${TIME_FEE.MAX_HOURLY} € (§ 13 StBVV)`,
          severity: 'warning',
          code: 'ABOVE_MAX_HOURLY_RATE',
        });
      }
      
      if (!position.hours || position.hours <= 0) {
        issues.push({
          field: 'hours',
          message: 'Stundenanzahl muss größer als 0 sein',
          severity: 'error',
          code: 'HOURS_REQUIRED',
        });
      }
      break;

    case 'flatRate':
      if (!position.flatRate || position.flatRate <= 0) {
        issues.push({
          field: 'flatRate',
          message: 'Pauschalbetrag muss größer als 0 sein',
          severity: 'error',
          code: 'FLAT_RATE_REQUIRED',
        });
      }
      break;
  }

  // 4. Zehntel-/Zwanzigstelsatz-Plausibilität
  if (position.billingType === 'objectValue') {
    const { numerator, denominator } = position.tenthRate;
    
    if (numerator <= 0) {
      issues.push({
        field: 'tenthRate.numerator',
        message: 'Satz muss größer als 0 sein',
        severity: 'error',
        code: 'RATE_NUMERATOR_INVALID',
      });
    }
    
    // Prüfe ob Satz unrealistisch hoch ist (> volle Gebühr)
    if (denominator === 10 && numerator > 10) {
      issues.push({
        field: 'tenthRate.numerator',
        message: 'Zehntelsatz über 10/10 bedeutet mehr als die volle Gebühr',
        severity: 'info',
        code: 'RATE_ABOVE_FULL',
      });
    }
    
    if (denominator === 20 && numerator > 20) {
      issues.push({
        field: 'tenthRate.numerator',
        message: 'Zwanzigstelsatz über 20/20 bedeutet mehr als die volle Gebühr',
        severity: 'info',
        code: 'RATE_ABOVE_FULL',
      });
    }
  }

  // 5. Menge validieren
  if (position.quantity < 1) {
    issues.push({
      field: 'quantity',
      message: 'Menge muss mindestens 1 sein',
      severity: 'error',
      code: 'QUANTITY_INVALID',
    });
  } else if (position.quantity > 50) {
    issues.push({
      field: 'quantity',
      message: 'Ungewöhnlich hohe Menge - bitte prüfen',
      severity: 'info',
      code: 'QUANTITY_HIGH',
    });
  }

  // Ergebnis zusammenstellen
  const hasErrors = issues.some(i => i.severity === 'error');
  const hasWarnings = issues.some(i => i.severity === 'warning');

  return {
    isValid: !hasErrors,
    issues,
    hasErrors,
    hasWarnings,
  };
};

/**
 * Schnelle Validierung nur für kritische Fehler (ohne Warnungen)
 */
export const validatePositionQuick = (position: ValidatedPosition): boolean => {
  const result = validatePosition(position);
  return result.isValid;
};

/**
 * Validiert ein Array von Positionen
 */
export const validatePositions = (positions: ValidatedPosition[]): {
  isValid: boolean;
  positionResults: Map<string, ValidationResult>;
  totalErrors: number;
  totalWarnings: number;
} => {
  const positionResults = new Map<string, ValidationResult>();
  let totalErrors = 0;
  let totalWarnings = 0;

  positions.forEach(position => {
    const result = validatePosition(position);
    positionResults.set(position.id, result);
    totalErrors += result.issues.filter(i => i.severity === 'error').length;
    totalWarnings += result.issues.filter(i => i.severity === 'warning').length;
  });

  return {
    isValid: totalErrors === 0,
    positionResults,
    totalErrors,
    totalWarnings,
  };
};

// ============== Einzelfeld-Validierung für Echtzeit-UI ==============

/**
 * Validiert ein einzelnes Feld und gibt das erste Issue zurück
 */
export const validateField = (
  field: keyof ValidatedPosition,
  value: unknown,
  context?: Partial<ValidatedPosition>
): ValidationIssue | null => {
  switch (field) {
    case 'activity':
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return {
          field: 'activity',
          message: 'Bitte wählen Sie eine Tätigkeit aus',
          severity: 'error',
          code: 'ACTIVITY_REQUIRED',
        };
      }
      break;

    case 'objectValue':
      if (context?.billingType === 'objectValue') {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue <= 0) {
          return {
            field: 'objectValue',
            message: 'Gegenstandswert muss größer als 0 sein',
            severity: 'error',
            code: 'OBJECT_VALUE_REQUIRED',
          };
        }
        
        const minValue = getMinObjectValue(context.activity || '');
        if (minValue > 0 && numValue < minValue) {
          return {
            field: 'objectValue',
            message: `Mindestgegenstandswert: ${minValue.toLocaleString('de-DE')} €`,
            severity: 'warning',
            code: 'BELOW_MIN_OBJECT_VALUE',
            suggestion: `${minValue.toLocaleString('de-DE')} € übernehmen`,
          };
        }
      }
      break;

    case 'hourlyRate':
      if (context?.billingType === 'hourly') {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue <= 0) {
          return {
            field: 'hourlyRate',
            message: 'Stundensatz muss größer als 0 sein',
            severity: 'error',
            code: 'HOURLY_RATE_REQUIRED',
          };
        }
        if (numValue > MAX_HOURLY_RATE) {
          return {
            field: 'hourlyRate',
            message: `Stundensatz über ${MAX_HOURLY_RATE} € ist ungewöhnlich`,
            severity: 'warning',
            code: 'HOURLY_RATE_HIGH',
          };
        }
      }
      break;

    case 'hours':
      if (context?.billingType === 'hourly') {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue <= 0) {
          return {
            field: 'hours',
            message: 'Stunden müssen größer als 0 sein',
            severity: 'error',
            code: 'HOURS_REQUIRED',
          };
        }
      }
      break;

    case 'flatRate':
      if (context?.billingType === 'flatRate') {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue <= 0) {
          return {
            field: 'flatRate',
            message: 'Pauschalbetrag muss größer als 0 sein',
            severity: 'error',
            code: 'FLAT_RATE_REQUIRED',
          };
        }
      }
      break;

    case 'quantity':
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 1) {
        return {
          field: 'quantity',
          message: 'Menge muss mindestens 1 sein',
          severity: 'error',
          code: 'QUANTITY_INVALID',
        };
      }
      break;
  }

  return null;
};
