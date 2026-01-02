/**
 * Artikel-Vorschau-Karte
 * @module components/blog/ArticleCard
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import { BLOG_ROUTES } from '@/constants/blog';
import type { ArticleCardProps } from '@/types/blog';
import { cn } from '@/lib/utils';

export const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const formattedDate = new Date(article.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className={cn(
      'h-full transition-all hover:shadow-lg hover:-translate-y-1',
      featured && 'border-primary/50 bg-primary/5'
    )}>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CategoryBadge category={article.category} size="sm" />
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{article.readTime}</span>
          </div>
        </div>
        <CardTitle className={cn(
          'leading-tight',
          featured ? 'text-xl' : 'text-lg'
        )}>
          <Link 
            to={BLOG_ROUTES.ARTICLE(article.slug)}
            className="hover:text-primary transition-colors"
          >
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground line-clamp-3">
          {article.excerpt}
        </p>
        <Button variant="ghost" className="p-0 h-auto font-medium group" asChild>
          <Link to={BLOG_ROUTES.ARTICLE(article.slug)}>
            Artikel lesen
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
