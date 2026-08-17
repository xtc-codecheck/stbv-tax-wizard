/**
 * Aktivitäts-Presets: Erbschaft- & Schenkungsteuer
 * @module utils/presets/erbschaft-schenkungsteuer
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const erbschaftSchenkungsteuerPresets: ActivityPreset[] = [
  { 
    activity: 'Erbschaftsteuererklärung', 
    defaultTenthRate: 6,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 12', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 10,
    category: 'Erbschaft- & Schenkungsteuer',
    searchKeywords: ['ErbSt', 'Erbschaftsteuer', 'Erbe', 'Nachlass'],
    minObjectValue: MIN_OBJECT_VALUES.ERBSCHAFTSTEUER  // 16.000 € gemäß § 24 Abs. 1 Nr. 12
  },,
  { 
    activity: 'Schenkungsteuererklärung', 
    defaultTenthRate: 6,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 13', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 10,
    category: 'Erbschaft- & Schenkungsteuer',
    searchKeywords: ['SchenkSt', 'Schenkungsteuer', 'Schenkung'],
    minObjectValue: MIN_OBJECT_VALUES.SCHENKUNGSTEUER  // 16.000 € gemäß § 24 Abs. 1 Nr. 13
  },,
  { 
    activity: 'Feststellung nach Bewertungsgesetz', 
    defaultTenthRate: 9,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 11', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 18,
    category: 'Erbschaft- & Schenkungsteuer',
    searchKeywords: ['Bewertung', 'Feststellung', 'Grundbesitzwert'],
    minObjectValue: MIN_OBJECT_VALUES.FESTSTELLUNG_BEWERTUNG  // 25.000 € gemäß § 24 Abs. 1 Nr. 11
  },,
  { 
    activity: 'Ermittlung Zugewinnausgleichsforderung (§ 5 ErbStG)', 
    defaultTenthRate: 10,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 3', 
    rateType: 'tenth', 
    minRate: 5, 
    maxRate: 15,
    category: 'Erbschaft- & Schenkungsteuer',
    searchKeywords: ['Zugewinn', 'Zugewinnausgleich', 'ErbStG'],
    minObjectValue: MIN_OBJECT_VALUES.ZUGEWINNAUSGLEICH  // 12.500 €
  }
];
