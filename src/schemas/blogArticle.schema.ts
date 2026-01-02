/**
 * Zod Schema für Blog-Artikel
 * @module schemas/blogArticle
 */

import { z } from 'zod';

/**
 * Verfügbare Blog-Kategorien
 */
export const BlogCategorySchema = z.enum([
  'Aktuelles',
  'Praxis-Tipps',
  'Digitalisierung',
  'Recht & Gesetz',
  'Mandantenkommunikation'
]);

/**
 * Schema für einen Blog-Artikel
 */
export const BlogArticleSchema = z.object({
  id: z.string().min(1, 'Artikel-ID ist erforderlich'),
  slug: z.string().min(1, 'Slug ist erforderlich').regex(/^[a-z0-9-]+$/, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten'),
  title: z.string().min(1, 'Titel ist erforderlich').max(100, 'Titel darf maximal 100 Zeichen haben'),
  excerpt: z.string().min(1, 'Excerpt ist erforderlich').max(300, 'Excerpt darf maximal 300 Zeichen haben'),
  content: z.string().min(100, 'Inhalt muss mindestens 100 Zeichen haben'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Datum muss im Format YYYY-MM-DD sein'),
  readTime: z.string().min(1, 'Lesezeit ist erforderlich'),
  category: BlogCategorySchema,
  author: z.string().optional().default('Redaktion'),
  metaDescription: z.string().max(160, 'Meta-Description darf maximal 160 Zeichen haben').optional(),
});

/**
 * Schema für eine Liste von Blog-Artikeln
 */
export const BlogArticleListSchema = z.array(BlogArticleSchema);

/**
 * Typen aus Schemas
 */
export type BlogCategory = z.infer<typeof BlogCategorySchema>;
export type BlogArticle = z.infer<typeof BlogArticleSchema>;
