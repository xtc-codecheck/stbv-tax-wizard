/**
 * LocalStorage-Schlüssel
 * @module constants/storage
 */

/**
 * Präfix für alle Storage-Schlüssel
 */
export const STORAGE_PREFIX = 'stbvv_';

/**
 * LocalStorage-Schlüssel für Auto-Save
 */
export const STORAGE_KEYS = {
  /** Gespeicherte Positionen */
  POSITIONS: `${STORAGE_PREFIX}autosave_positions`,
  /** Mandantendaten */
  CLIENT_DATA: `${STORAGE_PREFIX}autosave_client`,
  /** Dokumentenpauschale */
  DOCUMENT_FEE: `${STORAGE_PREFIX}autosave_documentFee`,
  /** MwSt.-Einstellung */
  INCLUDE_VAT: `${STORAGE_PREFIX}autosave_includeVAT`,
  /** Dokumenttyp (Angebot/Rechnung) */
  DOCUMENT_TYPE: `${STORAGE_PREFIX}autosave_documentType`,
  /** Rechnungs-/Angebotsnummer */
  INVOICE_NUMBER: `${STORAGE_PREFIX}autosave_invoiceNumber`,
  /** Rechnungsdatum */
  INVOICE_DATE: `${STORAGE_PREFIX}autosave_invoiceDate`,
  /** Leistungszeitraum */
  SERVICE_PERIOD: `${STORAGE_PREFIX}autosave_servicePeriod`,
  /** Rabatt */
  DISCOUNT: `${STORAGE_PREFIX}autosave_discount`,
  /** Dokumentnummern-Zähler */
  INVOICE_COUNTER: `${STORAGE_PREFIX}invoice_counter`,
  /** Zeitstempel der letzten Speicherung */
  LAST_SAVE_TIMESTAMP: `${STORAGE_PREFIX}autosave_timestamp`,
  /** Hash der letzten Speicherung (für Change Detection) */
  LAST_SAVE_HASH: `${STORAGE_PREFIX}autosave_hash`,
  /** Eigene Templates */
  CUSTOM_TEMPLATES: `${STORAGE_PREFIX}custom_templates`,
  /** Branding-Einstellungen */
  BRANDING_SETTINGS: `${STORAGE_PREFIX}branding_settings`,
  /** Smart Defaults */
  SMART_DEFAULTS: `${STORAGE_PREFIX}smart_defaults`,
  /** Letzte Aktivitäten */
  RECENT_ACTIVITIES: `${STORAGE_PREFIX}recent_activities`,
} as const;

/**
 * Storage-Version für Migrations-Support
 */
export const STORAGE_VERSION = 1;
