// Constants for STBVV calculations

export const VAT_RATE = 0.19; // 19% MwSt.
export const EXPENSE_FEE_RATE = 0.2; // 20% der Nettogebühr
export const EXPENSE_FEE_MAX = 20; // Max. 20€
export const DEFAULT_DOCUMENT_FEE = 12; // Standardmäßige Dokumentenpauschale

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
