/**
 * Vorlagen-Cluster: finanzbuchhaltung
 * @module utils/templates/finanzbuchhaltung
 */

import { Template } from "@/types/stbvv";

export const finanzbuchhaltungTemplates: Template[] = [
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

];
