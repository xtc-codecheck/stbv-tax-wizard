/**
 * Vorlagen-Cluster: sonstige-steuern
 * @module utils/templates/sonstige-steuern
 */

import { Template } from "@/types/stbvv";
import { TIME_FEE } from "@/constants";

export const sonstigeSteuernTemplates: Template[] = [
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

];
