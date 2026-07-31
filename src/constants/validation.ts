/**
 * Validierungs-Konstanten
 * @module constants/validation
 */

/**
 * Allgemeine Validierungskonstanten
 */
export const VALIDATION = {
  /** Warnung bei niedriger Gesamtsumme (€) */
  MIN_TOTAL_WARNING: 50,
  /** Minimaler Positionswert */
  MIN_POSITION_VALUE: 0,
  /** Minimaler Satz */
  MIN_RATE: 0.01,
  /** Maximale Zeichenlänge für Namen */
  MAX_NAME_LENGTH: 200,
  /** Maximale Zeichenlänge für E-Mail */
  MAX_EMAIL_LENGTH: 255,
  /** Maximale Anzahl Positionen */
  MAX_POSITIONS: 100,
} as const;

/**
 * Gesetzliche Mindestgegenstandswerte der StBVV
 * Rechtsstand: zuletzt geändert durch Art. 5 V v. 19.12.2025 (BGBl. 2025 I Nr. 372)
 */
export const MIN_OBJECT_VALUES = {
  DEFAULT: 0,
  /** § 24 Abs. 1 Nr. 1 - Einkommensteuererklärung */
  EINKOMMENSTEUER: 8000,
  /** § 24 Abs. 1 Nr. 2 - Gesonderte Feststellung der Einkünfte */
  GESONDERTE_FESTSTELLUNG: 8000,
  /** § 24 Abs. 1 Nr. 3 - Körperschaftsteuererklärung */
  KOERPERSCHAFTSTEUER: 16000,
  /** § 24 Abs. 1 Nr. 4 - Mindeststeuererklärung */
  MINDESTSTEUER: 16000,
  /** § 24 Abs. 1 Nr. 5 - Gewerbesteuererklärung */
  GEWERBESTEUER: 8000,
  /** § 24 Abs. 1 Nr. 6 - Gewerbesteuerzerlegung */
  GEWERBESTEUER_ZERLEGUNG: 4000,
  /** § 24 Abs. 1 Nr. 7 - Umsatzsteuer-Voranmeldung */
  UST_VORANMELDUNG: 650,
  /** § 24 Abs. 1 Nr. 8 - Umsatzsteuererklärung */
  UST_JAHRESERKLAERUNG: 8000,
  /** § 24 Abs. 1 Nr. 10 - Vermögensteuererklärung natürliche Personen */
  VERMOEGEN_NATUERLICH: 12500,
  /** § 24 Abs. 1 Nr. 10 - Vermögensteuererklärung Körperschaften */
  VERMOEGEN_KOERPERSCHAFT: 25000,
  /** § 24 Abs. 1 Nr. 11 - Feststellung nach Bewertungsgesetz */
  FESTSTELLUNG_BEWERTUNG: 25000,
  /** § 24 Abs. 1 Nr. 11a - Grundsteuer */
  GRUNDSTEUER: 25000,
  /** § 24 Abs. 1 Nr. 12 - Erbschaftsteuererklärung */
  ERBSCHAFTSTEUER: 16000,
  /** § 24 Abs. 1 Nr. 13 - Schenkungsteuererklärung */
  SCHENKUNGSTEUER: 16000,
  /** § 24 Abs. 1 Nr. 14 - Kapitalertragsteueranmeldung */
  KAPITALERTRAGSTEUER: 4000,
  /** § 24 Abs. 1 Nr. 15 - Lohnsteuer-Anmeldung */
  LOHNSTEUER_ANMELDUNG: 1000,
  /** § 24 Abs. 1 Nr. 21 - Vorsteuer-Vergütung */
  VORSTEUER_VERGUETUNG: 1300,
  /** § 24 Abs. 1 Nr. 22 - Erstattung Kapitalertragsteuer */
  KAPITALERTRAGSTEUER_ERSTATTUNG: 1000,
  /** § 24 Abs. 1 Nr. 25 - Anmeldung Steuerabzug Bauleistungen */
  BAUABZUGSTEUER: 1000,
  /** § 24 Abs. 1 Nr. 26 - Sonstige Steuererklärungen */
  SONSTIGE: 8000,
  /** § 24 Abs. 3 - Zugewinnausgleichsforderung */
  ZUGEWINNAUSGLEICH: 12500,
  /** § 24 Abs. 4 - Lohnsteuer-Ermäßigung */
  LOHNSTEUER_ERMAESSIGUNG: 4500,
  /** § 25 Abs. 1 - Einnahmen-Überschuss-Rechnung */
  EÜR: 17500,
  /** § 27 Abs. 1 - Überschuss der Einnahmen über die Werbungskosten */
  UEBERSCHUSSRECHNUNG: 8000,
  /** § 30 Abs. 2 - Selbstanzeige */
  SELBSTANZEIGE: 8000,
  /**
   * § 35 StBVV - Abschlussarbeiten: KEIN gesetzlicher Mindestgegenstandswert.
   * Gegenstandswert bemisst sich nach § 35 Abs. 2 (Mittel aus berichtigter
   * Bilanzsumme und betrieblicher Jahresleistung).
   */
  JAHRESABSCHLUSS: 0,
  /** § 33 StBVV - Buchführung: kein Mindestwert (Tabelle C beginnt bei 15.000 €) */
  BUCHFÜHRUNG: 0,
  /** § 34 StBVV - Lohnbuchführung: Betragsgebühr je Arbeitnehmer, kein Gegenstandswert */
  LOHNBUCHHALTUNG: 0,
} as const;
