/**
 * Gebühren- und Satz-Konstanten nach StBVV
 * @module constants/fees
 */

/** MwSt.-Satz 19% */
export const VAT_RATE = 0.19;

/** Auslagenpauschale: 20% der Nettogebühr */
export const EXPENSE_FEE_RATE = 0.2;

/** Maximale Auslagenpauschale: 20€ */
export const EXPENSE_FEE_MAX = 20;

/** Standard-Dokumentenpauschale */
export const DEFAULT_DOCUMENT_FEE = 12;

/**
 * Zeitgebühren nach § 13 StBVV (Stand: 01.07.2025)
 */
export const TIME_FEE = {
  /** Mindestgebühr je angefangene 15 Minuten */
  MIN_PER_15MIN: 16.50,
  /** Höchstgebühr je angefangene 15 Minuten */
  MAX_PER_15MIN: 41.00,
  /** Mittlerer Stundensatz (4 × 28,75€) */
  DEFAULT_HOURLY: 115,
  /** Mindeststundensatz (4 × 16,50€) */
  MIN_HOURLY: 66,
  /** Höchststundensatz (4 × 41,00€) */
  MAX_HOURLY: 164,
} as const;

/**
 * Standard-Zehntelsätze für verschiedene Tätigkeiten
 */
export const DEFAULT_TENTH_RATES = {
  STANDARD: 6,
  EÜR: 17.5,
  JAHRESABSCHLUSS: 25,
  BUCHFÜHRUNG: 7,
  GEWERBESTEUER: 3.5,
} as const;
