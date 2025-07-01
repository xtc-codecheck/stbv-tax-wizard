
import { ActivityPreset } from "@/types/stbvv";

export const activityPresets: ActivityPreset[] = [
  { activity: 'Einkommensteuererklärung', defaultTenthRate: 6, suggestedFeeTable: 'A' },
  { activity: 'Einkommensteuer Mantelbogen', defaultTenthRate: 3.5, suggestedFeeTable: 'A' },
  { activity: 'Anlage N (Einkünfte aus nichtselbständiger Arbeit)', defaultTenthRate: 6.5, suggestedFeeTable: 'A' },
  { activity: 'Anlage V (Vermietung und Verpachtung)', defaultTenthRate: 6.5, suggestedFeeTable: 'A' },
  { activity: 'Anlage G (Gewerbebetrieb)', defaultTenthRate: 6.5, suggestedFeeTable: 'A' },
  { activity: 'Anlage S (Einkünfte aus selbständiger Arbeit)', defaultTenthRate: 6, suggestedFeeTable: 'A' },
  { activity: 'Anlage KAP (Kapitalerträge)', defaultTenthRate: 6.5, suggestedFeeTable: 'A' },
  { activity: 'Anlage SO (Sonstige Einkünfte)', defaultTenthRate: 6.5, suggestedFeeTable: 'A' },
  { activity: 'Anlage R (Renten)', defaultTenthRate: 6, suggestedFeeTable: 'A' },
  { activity: 'Anlage L (Land- und Forstwirtschaft)', defaultTenthRate: 6, suggestedFeeTable: 'D' },
  { activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)', defaultTenthRate: 17.5, suggestedFeeTable: 'A' },
  { activity: 'Jahresabschluss GmbH', defaultTenthRate: 20, suggestedFeeTable: 'B' },
  { activity: 'Jahresabschluss Einzelunternehmen', defaultTenthRate: 20, suggestedFeeTable: 'B' },
  { activity: 'Jahresabschluss Übermittlung an Bundesanzeiger', defaultTenthRate: 7, suggestedFeeTable: 'B' },
  { activity: 'Jahresabschluss Übermittlung an das Finanzamt', defaultTenthRate: 7, suggestedFeeTable: 'B' },
  { activity: 'Überleitung Handelsbilanz nach Steuerbilanz', defaultTenthRate: 8.5, suggestedFeeTable: 'B' },
  { activity: 'Umsatzsteuer-Voranmeldung', defaultTenthRate: 4, suggestedFeeTable: 'A' },
  { activity: 'Umsatzsteuererklärung', defaultTenthRate: 4.5, suggestedFeeTable: 'A' },
  { activity: 'Gewerbesteuererklärung', defaultTenthRate: 3.5, suggestedFeeTable: 'A' },
  { activity: 'Körperschaftsteuererklärung', defaultTenthRate: 5, suggestedFeeTable: 'A' },
  { activity: 'Buchführung (monatlich)', defaultTenthRate: 7, suggestedFeeTable: 'C' },
  { activity: 'Lohnbuchhaltung', defaultTenthRate: 6, suggestedFeeTable: 'C' },
  { activity: 'Prüfung Steuerbescheid', defaultTenthRate: 6, suggestedFeeTable: 'A' },
  { activity: 'Auslagen für externe Kosten', defaultTenthRate: 10, suggestedFeeTable: 'A' }
];

export const getActivityPreset = (activity: string): ActivityPreset | undefined => {
  return activityPresets.find(preset => preset.activity === activity);
};
