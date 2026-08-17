/**
 * Vorlagen-Cluster: beratung-rechtsbehelfe
 * @module utils/templates/beratung-rechtsbehelfe
 */

import { Template } from "@/types/stbvv";
import { TIME_FEE } from "@/constants";

export const beratungRechtsbehelfeTemplates: Template[] = [
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
        description: 'Pauschalhonorar gemäß § 21 StBVV',
        objectValue: 0,
        tenthRate: { numerator: 0, denominator: 10 },
        quantity: 1,
        feeTable: 'A',
        applyExpenseFee: false,
        billingType: 'hourly',
        hourlyRate: 190,
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
        hourlyRate: TIME_FEE.DEFAULT_HOURLY,
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
        hourlyRate: TIME_FEE.DEFAULT_HOURLY,
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
];
