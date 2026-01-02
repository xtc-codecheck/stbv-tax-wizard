/**
 * Blog-Navigation Komponente
 * @module components/blog/BlogNavigation
 */

import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BLOG_ROUTES } from '@/constants/blog';

interface BlogNavigationProps {
  showBackToBlog?: boolean;
  showBackToCalculator?: boolean;
}

export const BlogNavigation = ({ 
  showBackToBlog = true, 
  showBackToCalculator = false 
}: BlogNavigationProps) => {
  return (
    <nav className="flex items-center gap-4 mb-6">
      {showBackToBlog && (
        <Button variant="ghost" size="sm" asChild>
          <Link to={BLOG_ROUTES.LIST}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Zurück zum Blog
          </Link>
        </Button>
      )}
      {showBackToCalculator && (
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Zum Rechner
          </Link>
        </Button>
      )}
    </nav>
  );
};
