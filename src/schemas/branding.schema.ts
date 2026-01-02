/**
 * Zod Schema für Kanzlei-Branding-Validierung
 * @module schemas/branding
 */

import { z } from 'zod';

/**
 * IBAN-Validierungs-Schema (deutsches Format)
 */
export const ibanSchema = z.string()
  .regex(/^DE\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/, 'Ungültiges IBAN-Format')
  .or(z.literal(''))
  .or(z.string()); // Fallback für flexible Eingabe

/**
 * BIC-Validierungs-Schema
 */
export const bicSchema = z.string()
  .regex(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Ungültiges BIC-Format')
  .or(z.literal(''))
  .or(z.string()); // Fallback für flexible Eingabe

/**
 * Branding-Einstellungen-Schema
 */
export const brandingSettingsSchema = z.object({
  logoUrl: z.string().url('Ungültige Logo-URL').optional().or(z.literal('')),
  companyName: z.string().max(200, 'Firmenname darf maximal 200 Zeichen haben'),
  street: z.string().max(200, 'Straße darf maximal 200 Zeichen haben'),
  postalCode: z.string().max(10, 'PLZ darf maximal 10 Zeichen haben'),
  city: z.string().max(100, 'Ort darf maximal 100 Zeichen haben'),
  phone: z.string().max(50, 'Telefonnummer darf maximal 50 Zeichen haben'),
  email: z.string().email('Ungültige E-Mail-Adresse').or(z.literal('')),
  taxNumber: z.string().max(50, 'Steuernummer darf maximal 50 Zeichen haben'),
  bankName: z.string().max(100, 'Bankname darf maximal 100 Zeichen haben'),
  iban: z.string().max(34, 'IBAN darf maximal 34 Zeichen haben'),
  bic: z.string().max(11, 'BIC darf maximal 11 Zeichen haben'),
});

/**
 * Leere Branding-Einstellungen für Initialisierung
 */
export const emptyBrandingSettings: BrandingSettingsSchema = {
  logoUrl: '',
  companyName: '',
  street: '',
  postalCode: '',
  city: '',
  phone: '',
  email: '',
  taxNumber: '',
  bankName: '',
  iban: '',
  bic: '',
};

// Type exports
export type BrandingSettingsSchema = z.infer<typeof brandingSettingsSchema>;
