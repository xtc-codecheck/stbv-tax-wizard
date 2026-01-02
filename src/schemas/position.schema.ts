/**
 * Zod Schema für Position-Validierung
 * @module schemas/position
 */

import { z } from 'zod';

/**
 * Schema für Zehntelsatz
 */
export const tenthRateSchema = z.object({
  numerator: z.number().min(0.1, 'Zähler muss mindestens 0.1 sein'),
  denominator: z.union([z.literal(10), z.literal(20)]),
});

/**
 * Schema für Abrechnungsart
 */
export const billingTypeSchema = z.enum(['objectValue', 'hourly', 'flatRate']);

/**
 * Schema für Gebührentabelle
 */
export const feeTableSchema = z.enum(['A', 'B', 'C', 'D']);

/**
 * Basis-Schema für Position ohne ID (für Erstellung)
 */
export const positionBaseSchema = z.object({
  activity: z.string().min(1, 'Tätigkeit ist erforderlich'),
  description: z.string().optional(),
  objectValue: z.number().min(0, 'Gegenstandswert darf nicht negativ sein'),
  tenthRate: tenthRateSchema,
  quantity: z.number().int().min(1, 'Menge muss mindestens 1 sein'),
  feeTable: feeTableSchema,
  applyExpenseFee: z.boolean(),
  billingType: billingTypeSchema,
  hourlyRate: z.number().min(0).optional(),
  hours: z.number().min(0).optional(),
  flatRate: z.number().min(0).optional(),
});

/**
 * Vollständiges Position-Schema mit ID
 */
export const positionSchema = positionBaseSchema.extend({
  id: z.string().min(1, 'ID ist erforderlich'),
});

/**
 * Schema für Position-Array
 */
export const positionsArraySchema = z.array(positionSchema);

/**
 * Validierung basierend auf Abrechnungsart
 */
export const validatePositionByBillingType = (position: z.infer<typeof positionSchema>): string[] => {
  const errors: string[] = [];

  switch (position.billingType) {
    case 'objectValue':
      if (position.objectValue <= 0) {
        errors.push('Gegenstandswert muss größer als 0 sein');
      }
      break;
    case 'hourly':
      if (!position.hourlyRate || position.hourlyRate <= 0) {
        errors.push('Stundensatz muss größer als 0 sein');
      }
      if (!position.hours || position.hours <= 0) {
        errors.push('Stunden müssen größer als 0 sein');
      }
      break;
    case 'flatRate':
      if (!position.flatRate || position.flatRate <= 0) {
        errors.push('Pauschalbetrag muss größer als 0 sein');
      }
      break;
  }

  return errors;
};

// Type exports
export type TenthRate = z.infer<typeof tenthRateSchema>;
export type BillingType = z.infer<typeof billingTypeSchema>;
export type FeeTable = z.infer<typeof feeTableSchema>;
export type PositionBase = z.infer<typeof positionBaseSchema>;
export type PositionSchema = z.infer<typeof positionSchema>;
