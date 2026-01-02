/**
 * Timing-Konstanten für UI und Auto-Save
 * @module constants/timing
 */

/**
 * Timing-Konstanten in Millisekunden
 */
export const TIMING = {
  /** Verzögerung für Re-Render nach Template-Load */
  RERENDER_DELAY: 100,
  /** Grace Period nach Template-Load (verhindert sofortiges Auto-Save) */
  TEMPLATE_LOAD_GRACE: 2000,
  /** Auto-Save Intervall */
  AUTOSAVE_INTERVAL: 10000,
  /** Debounce für Input-Felder */
  DEBOUNCE_INPUT: 300,
  /** Debounce für History-Updates */
  DEBOUNCE_HISTORY: 500,
  /** Toast-Anzeigedauer für Fehler */
  TOAST_ERROR_DURATION: 5000,
  /** Toast-Anzeigedauer für Warnungen */
  TOAST_WARNING_DURATION: 4000,
  /** Toast-Anzeigedauer für Erfolg */
  TOAST_SUCCESS_DURATION: 3000,
} as const;
