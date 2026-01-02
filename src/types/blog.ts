/**
 * Blog-bezogene TypeScript Typen
 * @module types/blog
 */

export type { BlogArticle, BlogCategory } from '@/schemas/blogArticle.schema';

/**
 * Props für Blog-Komponenten
 */
export interface ArticleCardProps {
  article: import('@/schemas/blogArticle.schema').BlogArticle;
  featured?: boolean;
}

export interface ArticleGridProps {
  articles: import('@/schemas/blogArticle.schema').BlogArticle[];
}

export interface ArticleHeaderProps {
  title: string;
  date: string;
  readTime: string;
  category: import('@/schemas/blogArticle.schema').BlogCategory;
  author?: string;
}

export interface ArticleContentProps {
  content: string;
}

export interface CategoryBadgeProps {
  category: import('@/schemas/blogArticle.schema').BlogCategory;
  size?: 'sm' | 'md';
}
