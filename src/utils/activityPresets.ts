
import { ActivityPreset } from "@/types/stbvv";

export const activityPresets: ActivityPreset[] = [
  { 
    activity: 'Einkommensteuererklärung', 
    defaultTenthRate: 3.5, // Mittelwert zwischen 1 und 6
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6 
  },
  { 
    activity: 'Einkommensteuer Mantelbogen', 
    defaultTenthRate: 3.5, // Mittelwert zwischen 1 und 6
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6 
  },
  { 
    activity: 'Anlage N (Einkünfte aus nichtselbständiger Arbeit)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Anlage V (Vermietung und Verpachtung)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Anlage G (Gewerbebetrieb)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Anlage S (Einkünfte aus selbständiger Arbeit)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Anlage KAP (Kapitalerträge)', 
    defaultTenthRate: 3.5, // Mittelwert zwischen 1 und 6
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 14', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 6 
  },
  { 
    activity: 'Anlage SO (Sonstige Einkünfte)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Anlage R (Renten)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Anlage L (Land- und Forstwirtschaft)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'D', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)', 
    defaultTenthRate: 17.5, // Mittelwert zwischen 5 und 30
    suggestedFeeTable: 'B', 
    legalBasis: '§ 25', 
    rateType: 'tenth', 
    minRate: 5, 
    maxRate: 30 
  },
  { 
    activity: 'Jahresabschluss GmbH', 
    defaultTenthRate: 25, // Mittelwert zwischen 10 und 40
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1a', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40 
  },
  { 
    activity: 'Jahresabschluss Einzelunternehmen', 
    defaultTenthRate: 25, // Mittelwert zwischen 10 und 40
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1a', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40 
  },
  { 
    activity: 'Jahresabschluss Übermittlung an Bundesanzeiger', 
    defaultTenthRate: 25, // Mittelwert zwischen 10 und 40
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40 
  },
  { 
    activity: 'Jahresabschluss Übermittlung an das Finanzamt', 
    defaultTenthRate: 25, // Mittelwert zwischen 10 und 40
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40 
  },
  { 
    activity: 'Überleitung Handelsbilanz nach Steuerbilanz', 
    defaultTenthRate: 8.5, // Mittelwert zwischen 5 und 12
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 4b', 
    rateType: 'tenth', 
    minRate: 5, 
    maxRate: 12 
  },
  { 
    activity: 'Umsatzsteuer-Voranmeldung', 
    defaultTenthRate: 4.5, // Mittelwert zwischen 1 und 8
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 8', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8 
  },
  { 
    activity: 'Umsatzsteuererklärung', 
    defaultTenthRate: 4.5, // Mittelwert zwischen 1 und 8
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 8', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8 
  },
  { 
    activity: 'Gewerbesteuererklärung', 
    defaultTenthRate: 3.5, // Mittelwert zwischen 1 und 6
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 5', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6 
  },
  { 
    activity: 'Körperschaftsteuererklärung', 
    defaultTenthRate: 5, // Mittelwert zwischen 2 und 8
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 3', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 8 
  },
  { 
    activity: 'Buchführung (monatlich)', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'C', 
    legalBasis: '§ 33', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Lohnbuchhaltung', 
    defaultTenthRate: 6.5, // Mittelwert zwischen 1 und 12
    suggestedFeeTable: 'C', 
    legalBasis: '§ 33', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 12 
  },
  { 
    activity: 'Prüfung Steuerbescheid', 
    defaultTenthRate: 3.5, // Mittelwert zwischen 1 und 6
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6 
  },
  { 
    activity: 'Auslagen für externe Kosten', 
    defaultTenthRate: 5.5, // Mittelwert zwischen 1 und 10
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 10 
  }
];

export const getActivityPreset = (activity: string): ActivityPreset | undefined => {
  return activityPresets.find(preset => preset.activity === activity);
};
