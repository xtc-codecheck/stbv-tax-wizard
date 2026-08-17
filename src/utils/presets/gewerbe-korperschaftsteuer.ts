/**
 * Aktivitäts-Presets: Gewerbe- & Körperschaftsteuer
 * @module utils/presets/gewerbe-korperschaftsteuer
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const gewerbeKorperschaftsteuerPresets: ActivityPreset[] = [
  ,
  { 
    activity: 'Gewerbesteuererklärung', 
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 5', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Gewerbe- & Körperschaftsteuer',
    searchKeywords: ['GewSt', 'Gewerbesteuer', 'Gemeinde'],
    minObjectValue: MIN_OBJECT_VALUES.GEWERBESTEUER  // 8.000 € gemäß § 24 Abs. 1 Nr. 5
  },
  ,
  { 
    activity: 'Gewerbesteuerzerlegungserklärung', 
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 6', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Gewerbe- & Körperschaftsteuer',
    searchKeywords: ['Zerlegung', 'Gewerbesteuer', 'Arbeitslöhne'],
    minObjectValue: MIN_OBJECT_VALUES.GEWERBESTEUER_ZERLEGUNG  // 4.000 € gemäß § 24 Abs. 1 Nr. 6
  },
  ,
  { 
    activity: 'Körperschaftsteuererklärung', 
    defaultTenthRate: 5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 3', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 8,
    category: 'Gewerbe- & Körperschaftsteuer',
    searchKeywords: ['KSt', 'Körperschaftsteuer', 'GmbH', 'Kapitalgesellschaft'],
    minObjectValue: MIN_OBJECT_VALUES.KOERPERSCHAFTSTEUER  // 16.000 € gemäß § 24 Abs. 1 Nr. 3
  },
  ,
  {
    activity: 'Mindeststeuererklärung',
    defaultTenthRate: 4.5,
    suggestedFeeTable: 'A',
    legalBasis: '§ 24 Abs. 1 Nr. 4',
    rateType: 'tenth',
    minRate: 1,
    maxRate: 8,
    category: 'Gewerbe- & Körperschaftsteuer',
    searchKeywords: ['Mindeststeuer', 'Pillar 2', 'MinStG', 'Unternehmensgruppe'],
    minObjectValue: MIN_OBJECT_VALUES.MINDESTSTEUER
  }
];
