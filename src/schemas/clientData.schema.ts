/**
 * Zod Schema für Mandantendaten-Validierung
 * @module schemas/clientData
 */

import { z } from 'zod';

/**
 * Email-Validierungs-Schema
 */
export const emailSchema = z.string().email('Ungültige E-Mail-Adresse').or(z.literal(''));

/**
 * PLZ-Validierungs-Schema (deutsches Format)
 */
export const postalCodeSchema = z.string()
  .regex(/^\d{5}$/, 'PLZ muss 5 Ziffern haben')
  .or(z.literal(''));

/**
 * Mandantendaten-Schema
 */
export const clientDataSchema = z.object({
  name: z.string().max(200, 'Name darf maximal 200 Zeichen haben'),
  street: z.string().max(200, 'Straße darf maximal 200 Zeichen haben'),
  postalCode: z.string().max(10, 'PLZ darf maximal 10 Zeichen haben'),
  city: z.string().max(100, 'Ort darf maximal 100 Zeichen haben'),
  email: emailSchema,
});

/**
 * Mandantendaten mit strikter Validierung
 */
export const clientDataStrictSchema = clientDataSchema.extend({
  name: z.string().min(1, 'Name ist erforderlich').max(200),
  email: z.string().email('Ungültige E-Mail-Adresse'),
});

/**
 * Leere Mandantendaten für Initialisierung
 */
export const emptyClientData: ClientDataSchema = {
  name: '',
  street: '',
  postalCode: '',
  city: '',
  email: '',
};

// Type exports
export type ClientDataSchema = z.infer<typeof clientDataSchema>;
export type ClientDataStrictSchema = z.infer<typeof clientDataStrictSchema>;
