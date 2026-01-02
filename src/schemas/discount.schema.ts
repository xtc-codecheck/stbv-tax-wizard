/**
 * Zod Schema für Rabatt-Validierung
 * @module schemas/discount
 */

import { z } from 'zod';

/**
 * Rabatttyp-Schema
 */
export const discountTypeSchema = z.enum(['percentage', 'fixed']);

/**
 * Rabatt-Schema
 */
export const discountSchema = z.object({
  type: discountTypeSchema,
  value: z.number().min(0, 'Rabattwert darf nicht negativ sein'),
}).refine(
  (data) => {
    if (data.type === 'percentage') {
      return data.value <= 100;
    }
    return true;
  },
  {
    message: 'Prozentualer Rabatt darf maximal 100% sein',
    path: ['value'],
  }
);

/**
 * Optionales Rabatt-Schema (für nullable)
 */
export const discountOptionalSchema = discountSchema.nullable();

// Type exports
export type DiscountType = z.infer<typeof discountTypeSchema>;
export type DiscountSchema = z.infer<typeof discountSchema>;
