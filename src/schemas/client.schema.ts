/**
 * Client/Mandant Schema für Zod-Validierung
 * @module schemas/client
 */

import { z } from 'zod';

/**
 * Schema für gespeicherte Mandanten
 */
export const SavedClientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name ist erforderlich'),
  street: z.string().optional().default(''),
  postalCode: z.string().optional().default(''),
  city: z.string().optional().default(''),
  email: z.string().email().optional().or(z.literal('')).default(''),
  createdAt: z.string().datetime(),
  lastUsedAt: z.string().datetime(),
});

export const SavedClientListSchema = z.array(SavedClientSchema);

export type SavedClient = z.infer<typeof SavedClientSchema>;
