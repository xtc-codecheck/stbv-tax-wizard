/**
 * Artikel-Header Komponente
 * @module components/blog/ArticleHeader
 */

import { Clock, User, Calendar } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import type { ArticleHeaderProps } from '@/types/blog';

export const ArticleHeader = ({ title, date, readTime, category, author = 'Redaktion' }: ArticleHeaderProps) => {
  const formattedDate = new Date(date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="space-y-4 mb-8">
      <CategoryBadge category={category} />
      
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
      </div>
    </header>
  );
};
