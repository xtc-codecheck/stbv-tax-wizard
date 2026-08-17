/**
 * Aktivitäts-Presets: Rechtsbehelfsverfahren
 * @module utils/presets/rechtsbehelfsverfahren
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const rechtsbehelfsverfahrenPresets: ActivityPreset[] = [
  { 
    activity: 'Einspruch beim Finanzamt', 
    defaultTenthRate: 4.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 40 StBVV i. V. m. RVG (Nr. 2300 VV)', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8,
    category: 'Rechtsbehelfsverfahren',
    searchKeywords: ['Einspruch', 'Widerspruch', 'Rechtsbehelf'],
    minObjectValue: MIN_OBJECT_VALUES.SONSTIGE
  },,
  { 
    activity: 'Aussetzung der Vollziehung (AdV)', 
    defaultTenthRate: 4.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 40 StBVV i. V. m. RVG (Nr. 2300 VV)', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8,
    category: 'Rechtsbehelfsverfahren',
    searchKeywords: ['AdV', 'Aussetzung', 'Vollziehung', 'Stundung'],
    minObjectValue: MIN_OBJECT_VALUES.SONSTIGE
  },,
  { 
    activity: 'Prüfung Steuerbescheid', 
    defaultTenthRate: 0,
    defaultHourlyRate: 115,  // Stand: 01.07.2025
    suggestedFeeTable: 'A', 
    legalBasis: '§ 13 StBVV (Zeitgebühr ab 01.07.2025)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Rechtsbehelfsverfahren',
    searchKeywords: ['Steuerbescheid', 'Prüfung', 'Bescheidprüfung', 'Kontrolle'],
    minObjectValue: 0  // Zeitgebühr, kein Gegenstandswert
  },,
  { 
    activity: 'Betriebsprüfung begleiten', 
    defaultTenthRate: 0,
    defaultHourlyRate: 115,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 29 Nr. 1 StBVV (Zeitgebühr)', 
    rateType: 'hourly', 
    minRate: 0, 
    maxRate: 0,
    category: 'Rechtsbehelfsverfahren',
    searchKeywords: ['Betriebsprüfung', 'Außenprüfung', 'Prüfer', 'Finanzamt'],
    minObjectValue: 0  // Stundenbasiert
  },,
  { 
    activity: 'Anpassungsantrag', 
    defaultTenthRate: 4.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 40 Abs. 1 StBVV', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8,
    category: 'Rechtsbehelfsverfahren',
    searchKeywords: ['Anpassungsantrag', 'Änderungsantrag', '§ 164 AO', '§ 172 AO', 'Änderung'],
    minObjectValue: MIN_OBJECT_VALUES.SONSTIGE
  },,
  {
    activity: 'Selbstanzeige',
    defaultTenthRate: 20,
    suggestedFeeTable: 'A',
    legalBasis: '§ 30 Abs. 1',
    rateType: 'tenth',
    minRate: 10,
    maxRate: 30,
    category: 'Rechtsbehelfsverfahren',
    searchKeywords: ['Selbstanzeige', '§ 371 AO', 'Nacherklärung'],
    minObjectValue: MIN_OBJECT_VALUES.SELBSTANZEIGE
  }
];
