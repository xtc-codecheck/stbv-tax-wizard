/**
 * Aktivitäts-Presets: Umsatzsteuer
 * @module utils/presets/umsatzsteuer
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const umsatzsteuerPresets: ActivityPreset[] = [
  ,
  { 
    activity: 'Umsatzsteuer-Voranmeldung', 
    defaultTenthRate: 4.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 7', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Umsatzsteuer',
    searchKeywords: ['UVA', 'Umsatzsteuer', 'Voranmeldung', 'USt-VA', 'Mehrwertsteuer'],
    minObjectValue: MIN_OBJECT_VALUES.UST_VORANMELDUNG  // 650 € gemäß § 24 Abs. 1 Nr. 7
  },
  ,
  { 
    activity: 'Umsatzsteuererklärung', 
    defaultTenthRate: 4.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 8', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8,
    category: 'Umsatzsteuer',
    searchKeywords: ['USt', 'Umsatzsteuer', 'Jahreserklärung', 'Mehrwertsteuer'],
    minObjectValue: MIN_OBJECT_VALUES.UST_JAHRESERKLAERUNG  // 8.000 € gemäß § 24 Abs. 1 Nr. 8
  },
  ,
  { 
    activity: 'Zusammenfassende Meldung (ZM)', 
    defaultTenthRate: 2,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 8', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 3,
    category: 'Umsatzsteuer',
    searchKeywords: ['ZM', 'Zusammenfassende Meldung', 'Innergemeinschaftlich', 'EU'],
    minObjectValue: MIN_OBJECT_VALUES.UST_JAHRESERKLAERUNG
  },
  ,
  { 
    activity: 'Antrag auf Vorsteuer-Vergütung', 
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 21', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Umsatzsteuer',
    searchKeywords: ['Vorsteuer', 'Vergütung', 'Erstattung'],
    minObjectValue: MIN_OBJECT_VALUES.VORSTEUER_VERGUETUNG  // 1.300 € gemäß § 24 Abs. 1 Nr. 21
  }
];
