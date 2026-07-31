/**
 * StBVV Versionierung und Rechtsgrundlagen (Phase 5.1)
 * @module constants/stbvv
 * 
 * Zentrale Konfiguration der Steuerberatervergütungsverordnung
 * mit Änderungsprotokoll und rechtlichen Hinweisen
 */

// ============== Versionierung ==============

export interface StBVVVersion {
  version: string;
  effectiveDate: string;
  publishedDate: string;
  sourceDocument: string;
  federalGazetteRef: string;
  changes: string[];
}

/**
 * Aktuell angewandte StBVV-Version
 */
export const STBVV_CURRENT_VERSION: StBVVVersion = {
  version: '2025',
  effectiveDate: '2025-07-01',
  publishedDate: '2025-12-19',
  sourceDocument: 'Steuerberatervergütungsverordnung vom 17.12.1981, zuletzt geändert durch Artikel 5 der Verordnung vom 19.12.2025',
  federalGazetteRef: 'BGBl. 2025 I Nr. 372 (Tabellen A–D: BGBl. 2025 I Nr. 105)',
  changes: [
    'Anpassung der Gebührentabellen A, B, C und D (BGBl. 2025 I Nr. 105)',
    'Zeitgebühr 16,50 € bis 41,00 € je angefangene 15 Minuten (§ 13)',
    'Neuer Gebührentatbestand Mindeststeuererklärung (§ 24 Abs. 1 Nr. 4)',
    'Lohnbuchführung: Betragsgebühren je Arbeitnehmer angepasst (§ 34)',
  ],
};

/**
 * Änderungshistorie der StBVV-Versionen
 */
export const STBVV_VERSION_HISTORY: StBVVVersion[] = [
  STBVV_CURRENT_VERSION,
  {
    version: '2020',
    effectiveDate: '2020-07-01',
    publishedDate: '2020-04-01',
    sourceDocument: 'Vierte Verordnung zur Änderung der Steuerberatervergütungsverordnung',
    federalGazetteRef: 'BGBl. 2020 I Nr. 17',
    changes: [
      'Anpassung der Gebührentabellen A, B, C und D um ca. 12%',
      'Erhöhung der Zeitgebühr auf 15,00 € - 38,00 € je 15 Min. (§ 13)',
      'Einführung neuer Gebührentatbestände für elektronische Verfahren',
    ],
  },
  {
    version: '2016',
    effectiveDate: '2016-06-01',
    publishedDate: '2016-03-12',
    sourceDocument: 'Dritte Verordnung zur Änderung der Steuerberatervergütungsverordnung',
    federalGazetteRef: 'BGBl. 2016 I Nr. 12',
    changes: [
      'Anpassung der Gebührentabellen um ca. 5%',
      'Neufassung des § 33 (Lohnbuchhaltung)',
    ],
  },
];

// ============== Rechtsgrundlagen ==============

export interface LegalReference {
  paragraph: string;
  title: string;
  description: string;
  feeType: 'value' | 'time' | 'flat' | 'mixed';
  feeTable?: 'A' | 'B' | 'C' | 'D';
  tenthRateRange?: { min: number; max: number; denominator: 10 | 20 };
}

/**
 * Wichtigste Paragraphen der StBVV mit Erläuterungen
 */
export const STBVV_LEGAL_REFERENCES: Record<string, LegalReference> = {
  '§11': {
    paragraph: '§ 11 StBVV',
    title: 'Rahmengebühren',
    description: 'Bestimmung der Gebühr innerhalb des Rahmens nach billigem Ermessen (Umfang, Schwierigkeit, Bedeutung, Einkommens- und Vermögensverhältnisse, Haftungsrisiko)',
    feeType: 'mixed',
  },
  '§13': {
    paragraph: '§ 13 StBVV',
    title: 'Zeitgebühr',
    description: 'Zeitgebühr für Tätigkeiten ohne Wertgebühr: 16,50 € bis 41,00 € je angefangene 15 Minuten',
    feeType: 'time',
  },
  '§21': {
    paragraph: '§ 21 StBVV',
    title: 'Rat, Auskunft, Erstberatung',
    description: 'Rat oder Auskunft 1/10 bis 10/10 nach Tabelle A; Erstberatung für Verbraucher höchstens 190 €',
    feeType: 'value',
    feeTable: 'A',
    tenthRateRange: { min: 1, max: 10, denominator: 10 },
  },
  '§22': {
    paragraph: '§ 22 StBVV',
    title: 'Gutachten und verbindliche Auskunft',
    description: 'Schriftliches Gutachten mit eingehender Begründung: 10/10 bis 30/10 nach Tabelle A',
    feeType: 'value',
    feeTable: 'A',
    tenthRateRange: { min: 10, max: 30, denominator: 10 },
  },
  '§24': {
    paragraph: '§ 24 StBVV',
    title: 'Steuererklärungen',
    description: 'Gebühren für Steuererklärungen nach Tabelle A mit gesetzlichen Mindestgegenstandswerten',
    feeType: 'value',
    feeTable: 'A',
    tenthRateRange: { min: 1, max: 6, denominator: 10 },
  },
  '§25': {
    paragraph: '§ 25 StBVV',
    title: 'Einnahmenüberschussrechnung',
    description: 'Ermittlung des Überschusses der Betriebseinnahmen über die Betriebsausgaben: 5/10 bis 30/10 nach Tabelle B, mindestens 17.500 € Gegenstandswert',
    feeType: 'value',
    feeTable: 'B',
    tenthRateRange: { min: 5, max: 30, denominator: 10 },
  },
  '§26': {
    paragraph: '§ 26 StBVV',
    title: 'Gewinnermittlung nach Durchschnittsätzen',
    description: 'Ermittlung des Gewinns aus Land- und Forstwirtschaft nach Durchschnittsätzen: 5/10 bis 20/10 nach Tabelle B',
    feeType: 'value',
    feeTable: 'B',
    tenthRateRange: { min: 5, max: 20, denominator: 10 },
  },
  '§27': {
    paragraph: '§ 27 StBVV',
    title: 'Überschuss der Einnahmen über die Werbungskosten',
    description: 'Nichtselbständige Arbeit, Kapitalvermögen, Vermietung und Verpachtung, sonstige Einkünfte: 1/20 bis 12/20 nach Tabelle A, mindestens 8.000 € Gegenstandswert',
    feeType: 'value',
    feeTable: 'A',
    tenthRateRange: { min: 1, max: 12, denominator: 20 },
  },
  '§33': {
    paragraph: '§ 33 StBVV',
    title: 'Buchführung',
    description: 'Buchführung einschließlich Kontieren der Belege: Monatsgebühr 2/10 bis 12/10 nach Tabelle C',
    feeType: 'value',
    feeTable: 'C',
    tenthRateRange: { min: 2, max: 12, denominator: 10 },
  },
  '§34': {
    paragraph: '§ 34 StBVV',
    title: 'Lohnbuchführung',
    description: 'Betragsgebühren je Arbeitnehmer: Einrichtung 6,00–19,00 €, Lohnabrechnung 6,00–30,00 € je Abrechnungszeitraum',
    feeType: 'flat',
  },
  '§35': {
    paragraph: '§ 35 StBVV',
    title: 'Abschlussarbeiten',
    description: 'Aufstellung eines Jahresabschlusses 10/10 bis 40/10 nach Tabelle B; Gegenstandswert nach § 35 Abs. 2',
    feeType: 'value',
    feeTable: 'B',
    tenthRateRange: { min: 10, max: 40, denominator: 10 },
  },
  '§39': {
    paragraph: '§ 39 StBVV',
    title: 'Land- und Forstwirtschaft',
    description: 'Buchführungs- und Abschlussarbeiten nach Tabelle D; volle Gebühr = Teil a (Betriebsfläche) + Teil b (Jahresumsatz)',
    feeType: 'value',
    feeTable: 'D',
  },
  '§40': {
    paragraph: '§ 40 StBVV',
    title: 'Rechtsbehelfsverfahren',
    description: 'Sinngemäße Anwendung des Rechtsanwaltsvergütungsgesetzes (u. a. Geschäftsgebühr Nr. 2300 VV RVG)',
    feeType: 'mixed',
  },
};

// ============== Mindestgegenstandswerte ==============

export interface MinimumObjectValue {
  activity: string;
  paragraph: string;
  minValue: number;
  description: string;
}

/**
 * Gesetzliche Mindestgegenstandswerte der StBVV
 */
export const STBVV_MINIMUM_VALUES: MinimumObjectValue[] = [
  {
    activity: 'Einkommensteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 1',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Einkommensteuererklärungen',
  },
  {
    activity: 'Feststellungserklärung',
    paragraph: '§ 24 Abs. 1 Nr. 2',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Erklärungen zur gesonderten Feststellung',
  },
  {
    activity: 'Körperschaftsteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 3',
    minValue: 16000,
    description: 'Mindestgegenstandswert für Körperschaftsteuererklärungen',
  },
  {
    activity: 'Mindeststeuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 4',
    minValue: 16000,
    description: 'Mindestgegenstandswert für Mindeststeuererklärungen',
  },
  {
    activity: 'Gewerbesteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 5',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Gewerbesteuererklärungen',
  },
  {
    activity: 'Gewerbesteuerzerlegungserklärung',
    paragraph: '§ 24 Abs. 1 Nr. 6',
    minValue: 4000,
    description: 'Mindestgegenstandswert für Zerlegungserklärungen',
  },
  {
    activity: 'Umsatzsteuer-Voranmeldung',
    paragraph: '§ 24 Abs. 1 Nr. 7',
    minValue: 650,
    description: 'Mindestgegenstandswert für Umsatzsteuer-Voranmeldungen',
  },
  {
    activity: 'Umsatzsteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 8',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Umsatzsteuererklärungen (Jahreserklärung)',
  },
  {
    activity: 'Kapitalertragsteueranmeldung',
    paragraph: '§ 24 Abs. 1 Nr. 14',
    minValue: 4000,
    description: 'Mindestgegenstandswert für Kapitalertragsteueranmeldungen',
  },
  {
    activity: 'Überschussrechnung (u. a. Kapitalvermögen, V+V, Anlage N)',
    paragraph: '§ 27 Abs. 1',
    minValue: 8000,
    description: 'Mindestgegenstandswert für die Ermittlung des Überschusses der Einnahmen über die Werbungskosten',
  },
  {
    activity: 'Einnahmen-Überschuss-Rechnung',
    paragraph: '§ 25 Abs. 1',
    minValue: 17500,
    description: 'Mindestgegenstandswert für die Ermittlung des Überschusses der Betriebseinnahmen über die Betriebsausgaben',
  },
];

// ============== Disclaimer-Texte ==============

/**
 * Standardisierte rechtliche Hinweise für Dokumente
 */
export const STBVV_DISCLAIMERS = {
  /** Kurzer Hinweis für Footer */
  short: `Berechnung gemäß StBVV ${STBVV_CURRENT_VERSION.version}`,
  
  /** Mittellanger Hinweis für Rechnungen */
  medium: `Rechtsgrundlage: Steuerberatervergütungsverordnung (StBVV) in der Fassung vom ${new Date(STBVV_CURRENT_VERSION.effectiveDate).toLocaleDateString('de-DE')}. ${STBVV_CURRENT_VERSION.federalGazetteRef}.`,
  
  /** Ausführlicher Hinweis mit Quelle */
  full: `Diese Berechnung erfolgt auf Grundlage der Steuerberatervergütungsverordnung (StBVV) in der seit dem ${new Date(STBVV_CURRENT_VERSION.effectiveDate).toLocaleDateString('de-DE')} geltenden Fassung (${STBVV_CURRENT_VERSION.federalGazetteRef}). Die Gebühren entsprechen den gesetzlich vorgeschriebenen Rahmengebühren. Änderung der Rechtsgrundlage: ${STBVV_CURRENT_VERSION.sourceDocument}.`,
  
  /** Hinweis für Angebote */
  quote: `Dieses Angebot wurde auf Basis der StBVV ${STBVV_CURRENT_VERSION.version} erstellt. Die tatsächliche Abrechnung erfolgt nach dem bei Leistungserbringung gültigen Gebührenrecht.`,
  
  /** Hinweis für Rechnungen */
  invoice: `Die Abrechnung erfolgt gemäß der Steuerberatervergütungsverordnung (StBVV) in der seit ${new Date(STBVV_CURRENT_VERSION.effectiveDate).toLocaleDateString('de-DE')} geltenden Fassung.`,
} as const;

// ============== Prüfsummen-Konfiguration ==============

export const CHECKSUM_CONFIG = {
  /** Algorithmus-Version */
  version: 'CS1',
  /** Separator zwischen Komponenten */
  separator: '-',
  /** Präfix für die Prüfziffer */
  prefix: 'STBVV',
} as const;

/**
 * Generiert eine Prüfsumme für ein Dokument
 */
export const generateDocumentChecksum = (
  positionCount: number,
  grossTotal: number,
  documentNumber?: string
): string => {
  const { version, separator, prefix } = CHECKSUM_CONFIG;
  const grossCents = Math.round(grossTotal * 100);
  const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  
  return `${prefix}${separator}${version}${separator}${positionCount}P${separator}${grossCents}${separator}${dateCode}`;
};

// ============== Export für einfachen Zugriff ==============

export default {
  version: STBVV_CURRENT_VERSION,
  history: STBVV_VERSION_HISTORY,
  references: STBVV_LEGAL_REFERENCES,
  minimumValues: STBVV_MINIMUM_VALUES,
  disclaimers: STBVV_DISCLAIMERS,
  generateChecksum: generateDocumentChecksum,
};
