/**
 * Blog-bezogene Konstanten
 * @module constants/blog
 */

import type { BlogCategory } from '@/schemas/blogArticle.schema';

/**
 * Alle verfügbaren Blog-Kategorien mit Metadaten
 */
export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; color: string }> = {
  'Aktuelles': { label: 'Aktuelles', color: 'bg-blue-100 text-blue-800' },
  'Praxis-Tipps': { label: 'Praxis-Tipps', color: 'bg-green-100 text-green-800' },
  'Digitalisierung': { label: 'Digitalisierung', color: 'bg-purple-100 text-purple-800' },
  'Recht & Gesetz': { label: 'Recht & Gesetz', color: 'bg-amber-100 text-amber-800' },
  'Mandantenkommunikation': { label: 'Mandantenkommunikation', color: 'bg-rose-100 text-rose-800' },
};

/**
 * Blog-Route-Definitionen
 */
export const BLOG_ROUTES = {
  LIST: '/blog',
  ARTICLE: (slug: string) => `/blog/${slug}`,
} as const;

/**
 * SEO-Defaults für Blog
 */
export const BLOG_SEO = {
  SITE_NAME: 'StBVV-Rechner Blog',
  DEFAULT_AUTHOR: 'Redaktion',
  OG_TYPE: 'article',
} as const;
