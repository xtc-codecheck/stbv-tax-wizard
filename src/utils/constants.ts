// Constants for STBVV calculations

export const VAT_RATE = 0.19; // 19% MwSt.
export const EXPENSE_FEE_RATE = 0.2; // 20% der Nettogebühr
export const EXPENSE_FEE_MAX = 20; // Max. 20€
export const DEFAULT_DOCUMENT_FEE = 12; // Standardmäßige Dokumentenpauschale

// Mindestgegenstandswerte gemäß StBVV § 24
export const MIN_OBJECT_VALUES = {
  DEFAULT: 0,
  // § 24 Abs. 1 Nr. 1 - Einkommensteuererklärung
  EINKOMMENSTEUER: 8000,
  // § 24 Abs. 1 Nr. 2 - Gesonderte Feststellung der Einkünfte
  GESONDERTE_FESTSTELLUNG: 8000,
  // § 24 Abs. 1 Nr. 3 - Körperschaftsteuererklärung
  KOERPERSCHAFTSTEUER: 16000,
  // § 24 Abs. 1 Nr. 4 - Mindeststeuererklärung
  MINDESTSTEUER: 16000,
  // § 24 Abs. 1 Nr. 5 - Gewerbesteuererklärung
  GEWERBESTEUER: 8000,
  // § 24 Abs. 1 Nr. 6 - Gewerbesteuerzerlegung
  GEWERBESTEUER_ZERLEGUNG: 4000,
  // § 24 Abs. 1 Nr. 7 - Umsatzsteuer-Voranmeldung
  UST_VORANMELDUNG: 650,
  // § 24 Abs. 1 Nr. 8 - Umsatzsteuererklärung
  UST_JAHRESERKLAERUNG: 8000,
  // § 24 Abs. 1 Nr. 10 - Vermögensteuererklärung
  VERMOEGEN_NATUERLICH: 12500,
  VERMOEGEN_KOERPERSCHAFT: 25000,
  // § 24 Abs. 1 Nr. 11 - Feststellung nach Bewertungsgesetz
  FESTSTELLUNG_BEWERTUNG: 25000,
  // § 24 Abs. 1 Nr. 11a - Grundsteuer
  GRUNDSTEUER: 25000,
  // § 24 Abs. 1 Nr. 12 - Erbschaftsteuererklärung
  ERBSCHAFTSTEUER: 16000,
  // § 24 Abs. 1 Nr. 13 - Schenkungsteuererklärung
  SCHENKUNGSTEUER: 16000,
  // § 24 Abs. 1 Nr. 14 - Kapitalertragsteueranmeldung
  KAPITALERTRAGSTEUER: 4000,
  // § 24 Abs. 1 Nr. 15 - Lohnsteuer-Anmeldung
  LOHNSTEUER_ANMELDUNG: 1000,
  // § 24 Abs. 1 Nr. 21 - Vorsteuer-Vergütung
  VORSTEUER_VERGUETUNG: 1300,
  // § 24 Abs. 1 Nr. 26 - Sonstige Steuererklärungen
  SONSTIGE: 8000,
  // § 24 Abs. 3 - Zugewinnausgleichsforderung
  ZUGEWINNAUSGLEICH: 12500,
  // § 24 Abs. 4 - Lohnsteuer-Ermäßigung
  LOHNSTEUER_ERMAESSIGUNG: 4500,
  // § 25 StBVV - Einnahmen-Überschuss-Rechnung
  EÜR: 17500,
  // § 35 StBVV - Jahresabschluss
  JAHRESABSCHLUSS: 8000,
  // § 33 StBVV - Buchführung
  BUCHFÜHRUNG: 15000,
  // § 34 StBVV - Lohnbuchhaltung (Bruttolohnsumme je Arbeitnehmer)
  LOHNBUCHHALTUNG: 1000,
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
