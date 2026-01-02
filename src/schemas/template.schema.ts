/**
 * Zod Schema für Template-Validierung
 * @module schemas/template
 */

import { z } from 'zod';
import { positionSchema } from './position.schema';

/**
 * Template-Schema
 */
export const templateSchema = z.object({
  id: z.string().min(1, 'Template-ID ist erforderlich'),
  name: z.string().min(1, 'Template-Name ist erforderlich').max(100, 'Name darf maximal 100 Zeichen haben'),
  positions: z.array(positionSchema),
  isCustom: z.boolean(),
  createdAt: z.string().datetime({ message: 'Ungültiges Datumsformat' }).or(z.string()),
});

/**
 * Schema für Template-Erstellung
 */
export const createTemplateSchema = templateSchema.omit({ id: true, createdAt: true });

/**
 * Schema für Template-Array
 */
export const templatesArraySchema = z.array(templateSchema);

// Type exports
export type TemplateSchema = z.infer<typeof templateSchema>;
export type CreateTemplateSchema = z.infer<typeof createTemplateSchema>;
