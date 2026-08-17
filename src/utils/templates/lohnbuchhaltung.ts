/**
 * Vorlagen-Cluster: lohnbuchhaltung
 * @module utils/templates/lohnbuchhaltung
 */

import { Template } from "@/types/stbvv";
import { TIME_FEE } from "@/constants";

export const lohnbuchhaltungTemplates: Template[] = [
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

];
