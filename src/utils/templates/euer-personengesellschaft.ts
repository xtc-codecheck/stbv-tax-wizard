/**
 * Vorlagen-Cluster: euer-personengesellschaft
 * @module utils/templates/euer-personengesellschaft
 */

import { Template } from "@/types/stbvv";
import { TIME_FEE } from "@/constants";

export const euerPersonengesellschaftTemplates: Template[] = [
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
        hourlyRate: TIME_FEE.DEFAULT_HOURLY,
        hours: 0.5
      }
    ]
  },

];
