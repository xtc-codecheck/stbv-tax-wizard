// Constants for STBVV calculations

export const VAT_RATE = 0.19; // 19% MwSt.
export const EXPENSE_FEE_RATE = 0.2; // 20% der Nettogebühr
export const EXPENSE_FEE_MAX = 20; // Max. 20€
export const DEFAULT_DOCUMENT_FEE = 12; // Standardmäßige Dokumentenpauschale

// Mindestgegenstandswerte gemäß StBVV
export const MIN_OBJECT_VALUES = {
  DEFAULT: 0,
  TABLE_A: 300,           // Beratungstabelle (praktisches Minimum)
  TABLE_B: 8000,          // Abschlusstabelle (§ 35 StBVV)
  TABLE_C: 15000,         // Buchführungstabelle (§ 33 StBVV)
  TABLE_D: 8000,          // Land- und Forstwirtschaft
  EÜR: 17500,             // § 25 StBVV Einnahmen-Überschuss-Rechnung
  JAHRESABSCHLUSS: 8000,  // § 35 StBVV
  BUCHFÜHRUNG: 15000,     // § 33 StBVV
  LOHNBUCHHALTUNG: 0,     // Kein Mindestgegenstandswert
};

// Timing constants
export const TIMING = {
  RERENDER_DELAY: 100,
  TEMPLATE_LOAD_GRACE: 2000,
  AUTOSAVE_INTERVAL: 10000,
  DEBOUNCE_INPUT: 300,
};

// Validation constants
export const VALIDATION = {
  MIN_TOTAL_WARNING: 50,
  MIN_POSITION_VALUE: 0,
  MIN_RATE: 0.01,
};
