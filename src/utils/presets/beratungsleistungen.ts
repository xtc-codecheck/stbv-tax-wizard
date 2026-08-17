/**
 * Aktivitäts-Presets: Beratungsleistungen
 * @module utils/presets/beratungsleistungen
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES, TIME_FEE } from "@/constants";

export const beratungsleistungenPresets: ActivityPreset[] = [
  { 
    activity: 'Beratung allgemein', 
    defaultTenthRate: 5.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 21 Abs. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 10,
    category: 'Beratungsleistungen',
    searchKeywords: ['Beratung', 'Consulting', 'Gespräch', 'Besprechung'],
    minObjectValue: 0  // Stundenbasiert, kein Mindestgegenstandswert
  },
  { 
    activity: 'Beratung bei Betriebseröffnung/-übernahme', 
    defaultTenthRate: 0,
    defaultHourlyRate: TIME_FEE.DEFAULT_HOURLY,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 13 StBVV (Zeitgebühr)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Beratungsleistungen',
    searchKeywords: ['Betriebseröffnung', 'Existenzgründung', 'Betriebsübernahme', 'Gründung'],
    minObjectValue: 0
  },
  { 
    activity: 'Beratung bei Umstrukturierung', 
    defaultTenthRate: 0,
    defaultHourlyRate: TIME_FEE.DEFAULT_HOURLY,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 13 StBVV (Zeitgebühr)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Beratungsleistungen',
    searchKeywords: ['Umstrukturierung', 'Umwandlung', 'Rechtsformwechsel'],
    minObjectValue: 0
  },
  { 
    activity: 'Schriftliche Gutachten', 
    defaultTenthRate: 20,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 22 Abs. 1', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 30,
    category: 'Beratungsleistungen',
    searchKeywords: ['Gutachten', 'Stellungnahme', 'Expertise'],
    minObjectValue: 0
  },
  { 
    activity: 'Betriebswirtschaftliche Beratung', 
    defaultTenthRate: 0,
    defaultHourlyRate: TIME_FEE.DEFAULT_HOURLY,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 13 StBVV (Zeitgebühr)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Beratungsleistungen',
    searchKeywords: ['BWA', 'Betriebswirtschaft', 'Controlling', 'Kennzahlen'],
    minObjectValue: 0
  },
  { 
    activity: 'Finanzplanung und Liquiditätsplanung', 
    defaultTenthRate: 0,
    defaultHourlyRate: TIME_FEE.DEFAULT_HOURLY,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 13 StBVV (Zeitgebühr)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Beratungsleistungen',
    searchKeywords: ['Finanzplanung', 'Liquidität', 'Cashflow', 'Planung'],
    minObjectValue: 0
  },
  { 
    activity: 'Steuerschätzung', 
    defaultTenthRate: 0,
    defaultHourlyRate: TIME_FEE.DEFAULT_HOURLY,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 13 StBVV (Zeitgebühr)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Beratungsleistungen',
    searchKeywords: ['Schätzung', 'Steuerberechnung', 'Prognose'],
    minObjectValue: 0
  },
  { 
    activity: 'Erstberatung', 
    defaultTenthRate: 0,
    defaultHourlyRate: 190,  // Pauschalhonorar max. 190 € gemäß § 21 StBVV
    suggestedFeeTable: 'A', 
    legalBasis: '§ 21 StBVV', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Beratungsleistungen',
    searchKeywords: ['Erstberatung', 'Erstgespräch', 'Erstberatungsgespräch', 'Kennenlern'],
    minObjectValue: 0  // Zeitgebühr
  },
  {
    activity: 'Besprechung mit Behörden oder Dritten',
    defaultTenthRate: 7.5,
    suggestedFeeTable: 'A',
    legalBasis: '§ 31 Abs. 1',
    rateType: 'tenth',
    minRate: 5,
    maxRate: 10,
    category: 'Beratungsleistungen',
    searchKeywords: ['Besprechung', 'Finanzamt', 'Termin'],
    minObjectValue: 0
  }
];
