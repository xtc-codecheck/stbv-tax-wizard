/**
 * Aktivitäts-Presets: Sonstige Steuererklärungen
 * @module utils/presets/sonstige-steuererklarungen
 */

import { ActivityPreset } from "@/types/stbvv";
import { MIN_OBJECT_VALUES } from "@/constants";

export const sonstigeSteuererklarungenPresets: ActivityPreset[] = [
  ,
  { 
    activity: 'Grundsteuererklärung', 
    defaultTenthRate: 5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 11a', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 9,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Grundsteuer', 'Grundsteuerwert', 'Grundsteuermessbetrag'],
    minObjectValue: MIN_OBJECT_VALUES.GRUNDSTEUER  // 25.000 € gemäß § 24 Abs. 1 Nr. 11a
  },
  ,
  { 
    activity: 'Grunderwerbsteuererklärung', 
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 26', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['GrESt', 'Grunderwerbsteuer', 'Immobilienkauf', 'Grundstück'],
    minObjectValue: MIN_OBJECT_VALUES.SONSTIGE  // 8.000 € gemäß § 24 Abs. 1 Nr. 26
  },
  ,
  { 
    activity: 'Antrag auf Feststellung des verbleibenden Verlustvortrags', 
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 26', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Verlustvortrag', 'Feststellungserklärung', 'Verlust'],
    minObjectValue: MIN_OBJECT_VALUES.SONSTIGE
  },
  ,
  { 
    activity: 'Gesonderte und einheitliche Feststellung', 
    defaultTenthRate: 3,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 2', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 5,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Feststellungserklärung', 'GuE', 'Personengesellschaft', 'Mitunternehmerschaft'],
    minObjectValue: MIN_OBJECT_VALUES.GESONDERTE_FESTSTELLUNG  // 8.000 € gemäß § 24 Abs. 1 Nr. 2
  },
  ,
  { 
    activity: 'Kapitalertragsteueranmeldung', 
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 14', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 6,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Kapitalertragsteuer', 'KapESt', 'Dividenden'],
    minObjectValue: MIN_OBJECT_VALUES.KAPITALERTRAGSTEUER  // 4.000 € gemäß § 24 Abs. 1 Nr. 14
  },
  ,
  {
    activity: 'Vermögensteuererklärung (natürliche Person)',
    defaultTenthRate: 9.5,
    suggestedFeeTable: 'A',
    legalBasis: '§ 24 Abs. 1 Nr. 10',
    rateType: 'twentieth',
    minRate: 1,
    maxRate: 18,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Vermögensteuer', 'Rohvermögen'],
    minObjectValue: MIN_OBJECT_VALUES.VERMOEGEN_NATUERLICH
  },
  ,
  {
    activity: 'Vermögensteuererklärung (Körperschaft)',
    defaultTenthRate: 9.5,
    suggestedFeeTable: 'A',
    legalBasis: '§ 24 Abs. 1 Nr. 10',
    rateType: 'twentieth',
    minRate: 1,
    maxRate: 18,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Vermögensteuer', 'Körperschaft', 'Rohvermögen'],
    minObjectValue: MIN_OBJECT_VALUES.VERMOEGEN_KOERPERSCHAFT
  },
  ,
  {
    activity: 'Verbrauchsteueranmeldung',
    defaultTenthRate: 2,
    suggestedFeeTable: 'A',
    legalBasis: '§ 24 Abs. 1 Nr. 17',
    rateType: 'tenth',
    minRate: 1,
    maxRate: 3,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Verbrauchsteuer', 'Energiesteuer', 'Stromsteuer'],
    minObjectValue: MIN_OBJECT_VALUES.LOHNSTEUER_ANMELDUNG
  },
  ,
  {
    activity: 'Antrag auf Erstattung von Kapitalertragsteuer',
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A',
    legalBasis: '§ 24 Abs. 1 Nr. 22',
    rateType: 'tenth',
    minRate: 1,
    maxRate: 6,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Kapitalertragsteuer', 'Erstattung', 'Anrechnung'],
    minObjectValue: MIN_OBJECT_VALUES.KAPITALERTRAGSTEUER_ERSTATTUNG
  },
  ,
  {
    activity: 'Anmeldung Steuerabzug Bauleistungen',
    defaultTenthRate: 3.5,
    suggestedFeeTable: 'A',
    legalBasis: '§ 24 Abs. 1 Nr. 25',
    rateType: 'tenth',
    minRate: 1,
    maxRate: 6,
    category: 'Sonstige Steuererklärungen',
    searchKeywords: ['Bauabzugsteuer', 'Bauleistungen', '§ 48 EStG'],
    minObjectValue: MIN_OBJECT_VALUES.BAUABZUGSTEUER
  }
];
