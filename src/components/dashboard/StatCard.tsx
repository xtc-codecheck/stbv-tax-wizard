/**
 * Statistik-Karte für Dashboard
 */

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ title, value, subtitle, trend, icon, className }: StatCardProps) {
  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return <Minus className="h-3 w-3 text-muted-foreground" />;
    if (trend > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    return <TrendingDown className="h-3 w-3 text-destructive" />;
  };

  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return 'text-muted-foreground';
    if (trend > 0) return 'text-green-500';
    return 'text-destructive';
  };

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {icon && (
            <div className="rounded-full bg-primary/10 p-2.5">
              {icon}
            </div>
          )}
        </div>
        
        {trend !== undefined && (
          <div className={cn('mt-3 flex items-center gap-1 text-xs', getTrendColor())}>
            {getTrendIcon()}
            <span>{trend > 0 ? '+' : ''}{trend.toFixed(1)}% vs. Vormonat</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
