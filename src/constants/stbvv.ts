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
  publishedDate: '2025-03-15',
  sourceDocument: 'Fünfte Verordnung zur Änderung der Steuerberatervergütungsverordnung',
  federalGazetteRef: 'BGBl. 2025 I Nr. 98',
  changes: [
    'Anpassung der Gebührentabellen A, B, C und D um ca. 9%',
    'Erhöhung der Zeitgebühr auf 16,50 € - 41,00 € je 15 Min. (§ 13)',
    'Anpassung der Mindestgegenstandswerte gemäß § 24 Abs. 1',
    'Aktualisierung der Wertgebühren für Lohnbuchhaltung (§ 34)',
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
    title: 'Beratung',
    description: 'Beratung und Bescheidprüfung nach Tabelle A',
    feeType: 'value',
    feeTable: 'A',
    tenthRateRange: { min: 1, max: 10, denominator: 10 },
  },
  '§13': {
    paragraph: '§ 13 StBVV',
    title: 'Zeitgebühr',
    description: 'Zeitgebühr für Tätigkeiten ohne Wertgebühr: 16,50 € bis 41,00 € je angefangene 15 Minuten',
    feeType: 'time',
  },
  '§24': {
    paragraph: '§ 24 StBVV',
    title: 'Steuererklärungen',
    description: 'Gebühren für Steuererklärungen nach Tabelle A',
    feeType: 'value',
    feeTable: 'A',
    tenthRateRange: { min: 1, max: 6, denominator: 10 },
  },
  '§25': {
    paragraph: '§ 25 StBVV',
    title: 'Jahresabschluss',
    description: 'Aufstellung von Jahresabschlüssen nach Tabelle B',
    feeType: 'value',
    feeTable: 'B',
    tenthRateRange: { min: 10, max: 40, denominator: 20 },
  },
  '§26': {
    paragraph: '§ 26 StBVV',
    title: 'Einnahmenüberschussrechnung',
    description: 'Ermittlung des Überschusses der Einnahmen über die Ausgaben nach Tabelle B',
    feeType: 'value',
    feeTable: 'B',
    tenthRateRange: { min: 5, max: 30, denominator: 20 },
  },
  '§33': {
    paragraph: '§ 33 StBVV',
    title: 'Buchführung',
    description: 'Buchführung einschließlich Kontieren nach Tabelle C',
    feeType: 'value',
    feeTable: 'C',
    tenthRateRange: { min: 2, max: 12, denominator: 10 },
  },
  '§34': {
    paragraph: '§ 34 StBVV',
    title: 'Lohnbuchhaltung',
    description: 'Lohnbuchführung und Lohnsteueranmeldungen',
    feeType: 'mixed',
  },
  '§35': {
    paragraph: '§ 35 StBVV',
    title: 'Landwirtschaft',
    description: 'Buchführung für land- und forstwirtschaftliche Betriebe nach Tabelle D',
    feeType: 'value',
    feeTable: 'D',
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
 * Gesetzliche Mindestgegenstandswerte nach § 24 StBVV
 */
export const STBVV_MINIMUM_VALUES: MinimumObjectValue[] = [
  {
    activity: 'Einkommensteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 1',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Einkommensteuererklärungen',
  },
  {
    activity: 'Körperschaftsteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 3',
    minValue: 16000,
    description: 'Mindestgegenstandswert für Körperschaftsteuererklärungen',
  },
  {
    activity: 'Gewerbesteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 4',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Gewerbesteuererklärungen',
  },
  {
    activity: 'Umsatzsteuererklärung',
    paragraph: '§ 24 Abs. 1 Nr. 5',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Umsatzsteuererklärungen (Jahreserklärung)',
  },
  {
    activity: 'Feststellungserklärung',
    paragraph: '§ 24 Abs. 1 Nr. 2',
    minValue: 8000,
    description: 'Mindestgegenstandswert für Feststellungserklärungen',
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
