/**
 * Artikel-Sidebar mit verwandten Artikeln
 * @module components/blog/ArticleSidebar
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight } from 'lucide-react';
import { CategoryBadge } from './CategoryBadge';
import { BLOG_ROUTES } from '@/constants/blog';
import type { BlogArticle } from '@/schemas/blogArticle.schema';

interface ArticleSidebarProps {
  relatedArticles: BlogArticle[];
}

export const ArticleSidebar = ({ relatedArticles }: ArticleSidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* CTA Card */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            StBVV-Rechner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm opacity-90">
            Berechnen Sie Ihre Steuerberater-Gebühren schnell und rechtssicher.
          </p>
          <Button variant="secondary" className="w-full" asChild>
            <Link to="/">
              Zum Rechner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weitere Artikel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {relatedArticles.map((article) => (
              <div key={article.id} className="space-y-2">
                <CategoryBadge category={article.category} size="sm" />
                <Link 
                  to={BLOG_ROUTES.ARTICLE(article.slug)}
                  className="block font-medium hover:text-primary transition-colors line-clamp-2"
                >
                  {article.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {new Date(article.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </aside>
  );
};
