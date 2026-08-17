/**
 * Aktivitäts-Presets: Jahresabschluss & Buchführung
 * @module utils/presets/jahresabschluss-buchfuhrung
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const jahresabschlussBuchfuhrungPresets: ActivityPreset[] = [
  { 
    activity: 'Jahresabschluss GmbH', 
    defaultTenthRate: 25,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1a', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Jahresabschluss', 'GmbH', 'Bilanz', 'GuV'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS  // 8.000 € gemäß § 35 StBVV
  },,
  { 
    activity: 'Jahresabschluss Einzelunternehmen', 
    defaultTenthRate: 25,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1a', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Jahresabschluss', 'Einzelunternehmen', 'Bilanz'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Jahresabschluss Übermittlung an Bundesanzeiger', 
    defaultTenthRate: 25,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6 (analog, § 2 StBVV)', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Bundesanzeiger', 'Offenlegung', 'Veröffentlichung'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Jahresabschluss Übermittlung an das Finanzamt', 
    defaultTenthRate: 25,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6 (analog, § 2 StBVV)', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Finanzamt', 'E-Bilanz', 'Übermittlung'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Überleitung Handelsbilanz nach Steuerbilanz', 
    defaultTenthRate: 8.5,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 3b', 
    rateType: 'tenth', 
    minRate: 5, 
    maxRate: 12,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Überleitung', 'Handelsbilanz', 'Steuerbilanz', 'Mehr-Weniger-Rechnung'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Buchführung (monatlich)', 
    defaultTenthRate: 7,
    suggestedFeeTable: 'C', 
    legalBasis: '§ 33 Abs. 1', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 12,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Buchführung', 'Fibu', 'Buchhaltung', 'Belege'],
    minObjectValue: MIN_OBJECT_VALUES.BUCHFÜHRUNG  // 15.000 € gemäß § 33 StBVV
  },,
  { 
    activity: 'E-Bilanz Übermittlung', 
    defaultTenthRate: 2,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6 (analog, § 2 StBVV)', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 3,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['E-Bilanz', 'Elektronische Bilanz', 'XBRL', 'Taxonomie'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Liquidationsbilanz', 
    defaultTenthRate: 25,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1b', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Liquidation', 'Liquidationsbilanz', 'Auflösung', 'Schlussbilanz'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Überleitungsrechnung (§ 60 Abs. 3 EStG)', 
    defaultTenthRate: 6,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 3a', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 10,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Überleitungsrechnung', 'Anlageverzeichnis', 'Steuerbilanz'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Elektronische Übermittlung Bundesanzeiger', 
    defaultTenthRate: 2,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6 (analog, § 2 StBVV)', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 3,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['E-Bilanz', 'Bundesanzeiger', 'Elektronische Übermittlung', 'Offenlegung'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Elektronische Übermittlung Finanzamt', 
    defaultTenthRate: 2,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6 (analog, § 2 StBVV)', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 3,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['E-Bilanz', 'Finanzamt', 'Elektronische Übermittlung', 'ELSTER'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Jahresabschluss (Kapitalgesellschaften)', 
    defaultTenthRate: 25,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1a', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Jahresabschluss', 'GmbH', 'AG', 'Kapitalgesellschaft', 'Bilanz'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS
  },,
  { 
    activity: 'Jahresabschluss (Personengesellschaften)', 
    defaultTenthRate: 17.5,
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1a', 
    rateType: 'tenth', 
    minRate: 5, 
    maxRate: 30,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Jahresabschluss', 'GbR', 'OHG', 'KG', 'Personengesellschaft'],
    minObjectValue: MIN_OBJECT_VALUES.JAHRESABSCHLUSS  // 17.500 €
  },,
  { 
    activity: 'Kontieren der Belege', 
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'C', 
    legalBasis: '§ 33 Abs. 2', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Kontieren', 'Belege', 'Vorkontierung'],
    minObjectValue: MIN_OBJECT_VALUES.BUCHFÜHRUNG  // 15.000 €
  },,
  { 
    activity: 'Buchführung (quartal)', 
    defaultTenthRate: 6.5,
    suggestedFeeTable: 'C', 
    legalBasis: '§ 33', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 12,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Buchführung', 'Fibu', 'Buchhaltung', 'quartal', 'vierteljährlich'],
    minObjectValue: MIN_OBJECT_VALUES.BUCHFÜHRUNG
  },,
  {
    activity: 'Vermögensstatus / Finanzstatus',
    defaultTenthRate: 10,
    suggestedFeeTable: 'B',
    legalBasis: '§ 37 Nr. 1',
    rateType: 'tenth',
    minRate: 5,
    maxRate: 15,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Vermögensstatus', 'Finanzstatus', 'Status'],
    minObjectValue: 0
  },,
  {
    activity: 'Erteilung von Bescheinigungen',
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'B',
    legalBasis: '§ 38 Abs. 1',
    rateType: 'tenth',
    minRate: 1,
    maxRate: 6,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Bescheinigung', 'Testat', 'Bestätigung'],
    minObjectValue: 0
  },,
  {
    activity: 'Erläuterungsbericht zum Jahresabschluss',
    defaultTenthRate: 7,
    suggestedFeeTable: 'B',
    legalBasis: '§ 35 Abs. 1 Nr. 6',
    rateType: 'tenth',
    minRate: 2,
    maxRate: 12,
    category: 'Jahresabschluss & Buchführung',
    searchKeywords: ['Erläuterungsbericht', 'Bericht', 'Jahresabschluss'],
    minObjectValue: 0
  }
];
