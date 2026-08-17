/**
 * Vorlagen-Cluster: jahresabschluss
 * @module utils/templates/jahresabschluss
 */

import { Template } from "@/types/stbvv";
import { TIME_FEE } from "@/constants";

export const jahresabschlussTemplates: Template[] = [
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
        hourlyRate: TIME_FEE.DEFAULT_HOURLY,
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
        hourlyRate: TIME_FEE.DEFAULT_HOURLY,
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
        hourlyRate: TIME_FEE.DEFAULT_HOURLY,
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
        hourlyRate: TIME_FEE.DEFAULT_HOURLY,
        hours: 0.5
      }
    ]
  },

];
