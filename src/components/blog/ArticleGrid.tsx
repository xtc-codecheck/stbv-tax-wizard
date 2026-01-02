/**
 * Grid-Container für Artikel-Karten
 * @module components/blog/ArticleGrid
 */

import { ArticleCard } from './ArticleCard';
import type { ArticleGridProps } from '@/types/blog';

export const ArticleGrid = ({ articles }: ArticleGridProps) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Keine Artikel gefunden.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          featured={index === 0}
        />
      ))}
    </div>
  );
};
