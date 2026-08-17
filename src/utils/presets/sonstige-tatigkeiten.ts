/**
 * Aktivitäts-Presets: Sonstige Tätigkeiten
 * @module utils/presets/sonstige-tatigkeiten
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const sonstigeTatigkeitenPresets: ActivityPreset[] = [
  ,
  { 
    activity: 'Fristverlängerung beantragen', 
    defaultTenthRate: 80,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23', 
    rateType: 'tenth', 
    minRate: 50, 
    maxRate: 150,
    category: 'Sonstige Tätigkeiten',
    searchKeywords: ['Fristverlängerung', 'Frist', 'Verlängerung', 'Antrag'],
    minObjectValue: 0  // Stundenbasiert
  },
  ,
  { 
    activity: 'Bescheinigungen ausstellen', 
    defaultTenthRate: 80,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23', 
    rateType: 'tenth', 
    minRate: 50, 
    maxRate: 150,
    category: 'Sonstige Tätigkeiten',
    searchKeywords: ['Bescheinigung', 'Bestätigung', 'Nachweis'],
    minObjectValue: 0  // Stundenbasiert
  },
  ,
  { 
    activity: 'Auslagen für externe Kosten', 
    defaultTenthRate: 5.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 10,
    category: 'Sonstige Tätigkeiten',
    searchKeywords: ['Auslagen', 'Kosten', 'Spesen', 'Porto'],
    minObjectValue: 0
  }
];
