/**
 * Aktivitäts-Presets: Lohnbuchhaltung
 * @module utils/presets/lohnbuchhaltung
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const lohnbuchhaltungPresets: ActivityPreset[] = [
  { 
    activity: 'Lohnbuchhaltung', 
    defaultTenthRate: 6.5,
    suggestedFeeTable: 'C', 
    legalBasis: '§ 33', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 12,
    category: 'Lohnbuchhaltung',
    searchKeywords: ['Lohnbuchhaltung', 'Lohn', 'Gehalt', 'Personalabrechnung'],
    minObjectValue: MIN_OBJECT_VALUES.LOHNBUCHHALTUNG
  },,
  { 
    activity: 'Lohnabrechnung pro Arbeitnehmer (monatlich)', 
    defaultTenthRate: 0,
    defaultHourlyRate: 12,  // 6,00 € bis 30,00 € je Arbeitnehmer und Abrechnungszeitraum
    suggestedFeeTable: 'C', 
    legalBasis: '§ 34 Abs. 2 (6,00–30,00 € je Arbeitnehmer)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Lohnbuchhaltung',
    searchKeywords: ['Lohnabrechnung', 'Gehaltsabrechnung', 'Mitarbeiter'],
    minObjectValue: MIN_OBJECT_VALUES.LOHNBUCHHALTUNG
  },,
  { 
    activity: 'Anmeldung Lohnsteuer', 
    defaultTenthRate: 2.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 15', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Lohnbuchhaltung',
    searchKeywords: ['Lohnsteueranmeldung', 'Lohnsteuer', 'LSt'],
    minObjectValue: MIN_OBJECT_VALUES.LOHNSTEUER_ANMELDUNG  // 1.000 € gemäß § 24 Abs. 1 Nr. 15
  },,
  { 
    activity: 'Lohnsteuer-Ermäßigung', 
    defaultTenthRate: 2.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 4', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 4,
    category: 'Lohnbuchhaltung',
    searchKeywords: ['Lohnsteuer-Ermäßigung', 'Freibetrag', 'Eintragung'],
    minObjectValue: MIN_OBJECT_VALUES.LOHNSTEUER_ERMAESSIGUNG  // 4.500 € gemäß § 24 Abs. 4
  },,
  { 
    activity: 'Lohnkonto', 
    defaultTenthRate: 7.5,
    suggestedFeeTable: 'C', 
    legalBasis: '§ 34 Abs. 2', 
    rateType: 'tenth', 
    minRate: 5, 
    maxRate: 10,
    category: 'Lohnbuchhaltung',
    searchKeywords: ['Lohnkonto', 'Jahreslohnkonto', 'Arbeitnehmer'],
    minObjectValue: MIN_OBJECT_VALUES.LOHNBUCHHALTUNG  // 1.000 €
  }
];
