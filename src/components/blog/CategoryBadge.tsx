/**
 * Kategorie-Badge Komponente
 * @module components/blog/CategoryBadge
 */

import { BLOG_CATEGORIES } from '@/constants/blog';
import type { CategoryBadgeProps } from '@/types/blog';
import { cn } from '@/lib/utils';

export const CategoryBadge = ({ category, size = 'md' }: CategoryBadgeProps) => {
  const categoryData = BLOG_CATEGORIES[category];
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        categoryData.color,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {categoryData.label}
    </span>
  );
};
