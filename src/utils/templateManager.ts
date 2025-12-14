import { Position, Template } from "@/types/stbvv";

// Predefined Templates with correct tenthRates according to StBVV
// Sortiert nach Tätigkeitsbereichen:
// 1-5: Einkommensteuererklärungen
// 6: EÜR Personengesellschaft
// 7-10: Jahresabschlüsse
// 11-13: Finanzbuchhaltung
// 14: Lohnbuchhaltung
// 15: Sonstige Steuern
// 16-20: Beratung & Rechtsbehelfe

export const DEFAULT_TEMPLATES: Template[] = [
  // ==========================================
  // CLUSTER 1: EINKOMMENSTEUERERKLÄRUNGEN (1-5)
  // ==========================================
  {
    id: 'template-1',
    name: 'Einkommensteuererklärung Privatperson (Arbeitnehmer)',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einkommensteuer Mantelbogen',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Anlage N (Einkünfte aus nichtselbständiger Arbeit)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 6.5, denominator: 20 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-2',
    name: 'Arbeitnehmer mit Vermietung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einkommensteuer Mantelbogen',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Anlage N (Einkünfte aus nichtselbständiger Arbeit)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 6.5, denominator: 20 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Anlage V (Vermietung und Verpachtung)',
        description: 'je Objekt',
        objectValue: 0,
        tenthRate: { numerator: 6.5, denominator: 20 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-3',
    name: 'Steuererklärung Rentner',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einkommensteuer Mantelbogen',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Anlage R (Renten)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 6.5, denominator: 20 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-4',
    name: 'Einkommensteuererklärung Selbstständige EÜR',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einkommensteuer Mantelbogen',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Anlage S (Einkünfte aus selbständiger Arbeit)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 6.5, denominator: 20 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 17.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Umsatzsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '5',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-5',
    name: 'Einkommensteuererklärung Gewerbetreibender EÜR',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einkommensteuer Mantelbogen',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 17.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Gewerbesteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Umsatzsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '5',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },

  // ==========================================
  // CLUSTER 2: EÜR PERSONENGESELLSCHAFT (6)
  // ==========================================
  {
    id: 'template-6',
    name: 'EÜR Personengesellschaft mit Steuererklärung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Gesonderte und einheitliche Feststellung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 17.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Gewerbesteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Umsatzsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '5',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },

  // ==========================================
  // CLUSTER 3: JAHRESABSCHLÜSSE (7-10)
  // ==========================================
  {
    id: 'template-7',
    name: 'Jahresabschluss Einzelunternehmen mit Steuererklärung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einkommensteuer Mantelbogen',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Jahresabschluss Einzelunternehmen',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 25, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Überleitung Handelsbilanz nach Steuerbilanz',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 8.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Gewerbesteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '5',
        activity: 'Umsatzsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '6',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-8',
    name: 'Jahresabschluss Personengesellschaften mit Steuererklärung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Gesonderte und einheitliche Feststellung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 5.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Jahresabschluss (Personengesellschaften)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 17.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Überleitung Handelsbilanz nach Steuerbilanz',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 8.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Gewerbesteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '5',
        activity: 'Umsatzsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '6',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-9',
    name: 'Jahresabschluss GmbH & Co. KG',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Jahresabschluss (Personengesellschaften)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 17.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Gesonderte und einheitliche Feststellung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Gewerbesteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Umsatzsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '5',
        activity: 'Körperschaftsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '6',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-10',
    name: 'Jahresabschluss Kapitalgesellschaften',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Jahresabschluss (Kapitalgesellschaften)',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 25, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Überleitung Handelsbilanz nach Steuerbilanz',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 8.5, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Elektronische Übermittlung Bundesanzeiger',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 2, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '4',
        activity: 'Elektronische Übermittlung Finanzamt',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 2, denominator: 10 },
        quantity: 1,
        feeTable: 'B',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '5',
        activity: 'Körperschaftsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '6',
        activity: 'Gewerbesteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '7',
        activity: 'Umsatzsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '8',
        activity: 'Prüfung Steuerbescheid',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },

  // ==========================================
  // CLUSTER 4: FINANZBUCHHALTUNG (11-13)
  // ==========================================
  {
    id: 'template-11',
    name: 'Finanzbuchhaltung (monatlich)',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Buchführung (monatlich)',
        description: 'monatlich',
        objectValue: 0,
        tenthRate: { numerator: 7, denominator: 10 },
        quantity: 1,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Kontieren der Belege',
        description: 'monatlich',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Umsatzsteuer-Voranmeldung',
        description: 'monatlich',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },
  {
    id: 'template-12',
    name: 'Finanzbuchhaltung quartalsweise',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Buchführung (quartal)',
        description: 'quartalsweise',
        objectValue: 0,
        tenthRate: { numerator: 6.5, denominator: 10 },
        quantity: 4,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Kontieren der Belege',
        description: 'quartalsweise',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 4,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },
  {
    id: 'template-13',
    name: 'Finanzbuchhaltung jährlich',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Buchführung (monatlich)',
        description: 'monatlich, 12x im Jahr',
        objectValue: 0,
        tenthRate: { numerator: 6.5, denominator: 10 },
        quantity: 12,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Kontieren der Belege',
        description: 'monatlich, 12x im Jahr',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 12,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Umsatzsteuer-Voranmeldung',
        description: 'monatlich, 12x im Jahr',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 10 },
        quantity: 12,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },

  // ==========================================
  // CLUSTER 5: LOHNBUCHHALTUNG (14)
  // ==========================================
  {
    id: 'template-14',
    name: 'Lohnbuchhaltung (monatlich)',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Lohnabrechnung pro Arbeitnehmer (monatlich)',
        description: 'je Arbeitnehmer, monatlich',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'flatRate',
        flatRate: 12
      },
      {
        id: '2',
        activity: 'Anmeldung Lohnsteuer',
        description: 'monatlich',
        objectValue: 0,
        tenthRate: { numerator: 3.5, denominator: 20 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Lohnkonto',
        description: 'je Arbeitnehmer, jährlich',
        objectValue: 0,
        tenthRate: { numerator: 7.5, denominator: 10 },
        quantity: 1,
        feeTable: 'C',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },

  // ==========================================
  // CLUSTER 6: SONSTIGE STEUERN (15)
  // ==========================================
  {
    id: 'template-15',
    name: 'Erbschaftsteuererklärung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Erbschaftsteuererklärung',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 6, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '2',
        activity: 'Feststellung nach Bewertungsgesetz',
        description: 'je wirtschaftliche Einheit',
        objectValue: 0,
        tenthRate: { numerator: 9.5, denominator: 20 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      },
      {
        id: '3',
        activity: 'Ermittlung Zugewinnausgleichsforderung (§ 5 ErbStG)',
        description: 'optional',
        objectValue: 0,
        tenthRate: { numerator: 10, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },

  // ==========================================
  // CLUSTER 7: BERATUNG & RECHTSBEHELFE (16-20)
  // ==========================================
  {
    id: 'template-16',
    name: 'Erstberatung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Erstberatung',
        description: 'Stundensatz',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 1
      }
    ]
  },
  {
    id: 'template-17',
    name: 'Steuerberatung Allgemein',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Beratung allgemein',
        description: 'Stundensatz',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 1
      }
    ]
  },
  {
    id: 'template-18',
    name: 'Bescheidprüfung',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Prüfung Steuerbescheid',
        description: 'Stundensatz',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 0.5
      }
    ]
  },
  {
    id: 'template-19',
    name: 'Einspruch',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Einspruch beim Finanzamt',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  },
  {
    id: 'template-20',
    name: 'Anpassungsantrag',
    isCustom: false,
    createdAt: new Date().toISOString(),
    positions: [
      {
        id: '1',
        activity: 'Anpassungsantrag',
        description: '',
        objectValue: 0,
        tenthRate: { numerator: 4.5, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: true,
        billingType: 'objectValue'
      }
    ]
  }
];

const STORAGE_KEY = 'stbvv_custom_templates';

export const getTemplates = (): Template[] => {
  const customTemplates = getCustomTemplates();
  return [...DEFAULT_TEMPLATES, ...customTemplates];
};

export const getCustomTemplates = (): Template[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as Template[];
  } catch (error) {
    console.error('Error loading custom templates:', error);
    return [];
  }
};

export const saveCustomTemplate = (name: string, positions: Position[]): Template => {
  const newTemplate: Template = {
    id: `custom-${Date.now()}`,
    name,
    positions: positions.map(pos => ({
      ...pos,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    })),
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  const customTemplates = getCustomTemplates();
  customTemplates.push(newTemplate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customTemplates));
  
  return newTemplate;
};

export const deleteTemplate = (templateId: string): void => {
  const customTemplates = getCustomTemplates();
  const filtered = customTemplates.filter(t => t.id !== templateId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
