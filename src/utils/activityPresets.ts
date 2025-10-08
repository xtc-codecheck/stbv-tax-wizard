
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
  },
  // ===== BERATUNGSLEISTUNGEN (§ 23 StBVV) =====
  { 
    activity: 'Beratung allgemein', 
    defaultTenthRate: 100, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23 Abs. 1', 
    rateType: 'tenth', 
    minRate: 50, 
    maxRate: 200 
  },
  { 
    activity: 'Beratung bei Betriebseröffnung/-übernahme', 
    defaultTenthRate: 120, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23 Abs. 3', 
    rateType: 'tenth', 
    minRate: 80, 
    maxRate: 200 
  },
  { 
    activity: 'Beratung bei Umstrukturierung', 
    defaultTenthRate: 120, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23 Abs. 3', 
    rateType: 'tenth', 
    minRate: 80, 
    maxRate: 200 
  },
  { 
    activity: 'Schriftliche Gutachten', 
    defaultTenthRate: 150, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23 Abs. 4', 
    rateType: 'tenth', 
    minRate: 100, 
    maxRate: 250 
  },
  // ===== EINSPRUCHS- UND RECHTSBEHELFSVERFAHREN (§ 40 StBVV) =====
  { 
    activity: 'Einspruch beim Finanzamt', 
    defaultTenthRate: 4.5, // Mittelwert zwischen 1 und 8
    suggestedFeeTable: 'A', 
    legalBasis: '§ 40 Abs. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8 
  },
  { 
    activity: 'Aussetzung der Vollziehung (AdV)', 
    defaultTenthRate: 4.5, // Mittelwert zwischen 1 und 8
    suggestedFeeTable: 'A', 
    legalBasis: '§ 40 Abs. 1', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 8 
  },
  // ===== WEITERE STEUERERKLÄRUNGEN =====
  { 
    activity: 'Erbschaftsteuererklärung', 
    defaultTenthRate: 5, // Mittelwert zwischen 2 und 8
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 2', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 8 
  },
  { 
    activity: 'Schenkungsteuererklärung', 
    defaultTenthRate: 5, // Mittelwert zwischen 2 und 8
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 2', 
    rateType: 'tenth', 
    minRate: 2, 
    maxRate: 8 
  },
  { 
    activity: 'Grunderwerbsteuererklärung', 
    defaultTenthRate: 3.5, // Mittelwert zwischen 1 und 6
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 4', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6 
  },
  { 
    activity: 'Zusammenfassende Meldung (ZM)', 
    defaultTenthRate: 2, // Mittelwert zwischen 1 und 3
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 8', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 3 
  },
  { 
    activity: 'Antrag auf Feststellung des verbleibenden Verlustvortrags', 
    defaultTenthRate: 3.5, // Mittelwert zwischen 1 und 6
    suggestedFeeTable: 'A', 
    legalBasis: '§ 24 Abs. 1 Nr. 10', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 6 
  },
  // ===== WEITERE EINKOMMENSTEUER-ANLAGEN =====
  { 
    activity: 'Anlage Kind', 
    defaultTenthRate: 3, // Mittelwert zwischen 1 und 5
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 5 
  },
  { 
    activity: 'Anlage AV (Altersvorsorge)', 
    defaultTenthRate: 3, // Mittelwert zwischen 1 und 5
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 5 
  },
  { 
    activity: 'Anlage Unterhalt', 
    defaultTenthRate: 4, // Mittelwert zwischen 1 und 7
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 7 
  },
  { 
    activity: 'Anlage Vorsorgeaufwand', 
    defaultTenthRate: 3, // Mittelwert zwischen 1 und 5
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 5 
  },
  { 
    activity: 'Anlage Sonderausgaben', 
    defaultTenthRate: 3, // Mittelwert zwischen 1 und 5
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 5 
  },
  { 
    activity: 'Anlage Außergewöhnliche Belastungen', 
    defaultTenthRate: 3, // Mittelwert zwischen 1 und 5
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 5 
  },
  { 
    activity: 'Anlage Haushaltsnahe Aufwendungen', 
    defaultTenthRate: 2, // Mittelwert zwischen 1 und 4
    suggestedFeeTable: 'A', 
    legalBasis: '§ 27', 
    rateType: 'twentieth', 
    minRate: 1, 
    maxRate: 4 
  },
  // ===== LOHNBUCHHALTUNG & LOHNABRECHNUNGEN (§ 34 StBVV) =====
  { 
    activity: 'Lohnabrechnung pro Arbeitnehmer (monatlich)', 
    defaultTenthRate: 15, // Pauschalbetrag
    suggestedFeeTable: 'C', 
    legalBasis: '§ 34 Abs. 1', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 25 
  },
  { 
    activity: 'Anmeldung Lohnsteuer', 
    defaultTenthRate: 2.5, // Mittelwert zwischen 1 und 4
    suggestedFeeTable: 'A', 
    legalBasis: '§ 34 Abs. 2', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 4 
  },
  // ===== WEITERE WICHTIGE TÄTIGKEITEN =====
  { 
    activity: 'Fristverlängerung beantragen', 
    defaultTenthRate: 80, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23', 
    rateType: 'tenth', 
    minRate: 50, 
    maxRate: 150 
  },
  { 
    activity: 'Bescheinigungen ausstellen', 
    defaultTenthRate: 80, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 23', 
    rateType: 'tenth', 
    minRate: 50, 
    maxRate: 150 
  },
  { 
    activity: 'E-Bilanz Übermittlung', 
    defaultTenthRate: 2, // Mittelwert zwischen 1 und 3
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 6', 
    rateType: 'tenth', 
    minRate: 1, 
    maxRate: 3 
  },
  { 
    activity: 'Steuerschätzung', 
    defaultTenthRate: 100, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 22', 
    rateType: 'tenth', 
    minRate: 60, 
    maxRate: 180 
  },
  { 
    activity: 'Liquidationsbilanz', 
    defaultTenthRate: 25, // Mittelwert zwischen 10 und 40
    suggestedFeeTable: 'B', 
    legalBasis: '§ 35 Abs. 1 Nr. 1b', 
    rateType: 'tenth', 
    minRate: 10, 
    maxRate: 40 
  },
  { 
    activity: 'Betriebswirtschaftliche Beratung', 
    defaultTenthRate: 120, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 35 Abs. 2', 
    rateType: 'tenth', 
    minRate: 80, 
    maxRate: 200 
  },
  { 
    activity: 'Finanzplanung und Liquiditätsplanung', 
    defaultTenthRate: 100, // Stundensatz
    suggestedFeeTable: 'A', 
    legalBasis: '§ 35 Abs. 2', 
    rateType: 'tenth', 
    minRate: 60, 
    maxRate: 180 
  }
];

export const getActivityPreset = (activity: string): ActivityPreset | undefined => {
  return activityPresets.find(preset => preset.activity === activity);
};
