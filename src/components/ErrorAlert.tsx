/**
 * ErrorAlert Komponente (Phase 4.2)
 * @module components/ErrorAlert
 * 
 * Benutzerfreundliche Fehleranzeige mit Lösungsvorschlägen
 */

import React from 'react';
import { AlertCircle, AlertTriangle, Info, XCircle, ChevronRight, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UserFriendlyError, ErrorSolution } from '@/services/ErrorLoggingService';
import type { ErrorSeverity } from '@/errors';

interface ErrorAlertProps {
  error: UserFriendlyError;
  onDismiss?: () => void;
  onSolutionClick?: (solution: ErrorSolution) => void;
  showTechnicalDetails?: boolean;
  className?: string;
}

const severityConfig: Record<ErrorSeverity, {
  icon: React.ElementType;
  variant: 'default' | 'destructive';
  bgClass: string;
  borderClass: string;
  iconClass: string;
}> = {
  critical: {
    icon: XCircle,
    variant: 'destructive',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    iconClass: 'text-red-600',
  },
  error: {
    icon: AlertCircle,
    variant: 'destructive',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    iconClass: 'text-red-600',
  },
  warning: {
    icon: AlertTriangle,
    variant: 'default',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    iconClass: 'text-amber-600',
  },
  info: {
    icon: Info,
    variant: 'default',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    iconClass: 'text-blue-600',
  },
};

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onDismiss,
  onSolutionClick,
  showTechnicalDetails = false,
  className,
}) => {
  const config = severityConfig[error.severity];
  const Icon = config.icon;
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Alert
      variant={config.variant}
      className={cn(
        config.bgClass,
        config.borderClass,
        'relative',
        className
      )}
    >
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-6 w-6 p-0"
          onClick={onDismiss}
          aria-label="Schließen"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      <Icon className={cn('h-5 w-5', config.iconClass)} />
      
      <AlertTitle className="font-semibold">
        {error.title}
      </AlertTitle>
      
      <AlertDescription className="mt-2">
        <p className="text-sm">{error.message}</p>
        
        {/* Lösungsvorschläge */}
        {error.suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Lösungsvorschläge:
            </p>
            <ul className="space-y-1">
              {error.suggestions.map((solution) => (
                <li
                  key={solution.code}
                  className="flex items-start gap-2 text-sm"
                >
                  <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <span className="font-medium">{solution.title}:</span>{' '}
                    <span className="text-muted-foreground">{solution.description}</span>
                    {solution.actionLabel && onSolutionClick && (
                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 ml-2 text-primary"
                        onClick={() => onSolutionClick(solution)}
                      >
                        {solution.actionLabel}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Technische Details (optional) */}
        {showTechnicalDetails && error.technicalDetails && (
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Technische Details ausblenden' : 'Technische Details anzeigen'}
            </Button>
            {isExpanded && (
              <pre className="mt-2 p-2 bg-muted rounded text-xs font-mono overflow-x-auto">
                {error.technicalDetails}
              </pre>
            )}
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

/**
 * Inline-Fehleranzeige für Formularfelder
 */
interface InlineErrorProps {
  message: string;
  suggestion?: string;
  severity?: 'error' | 'warning';
  className?: string;
}

export const InlineError: React.FC<InlineErrorProps> = ({
  message,
  suggestion,
  severity = 'error',
  className,
}) => {
  const isWarning = severity === 'warning';
  const Icon = isWarning ? AlertTriangle : AlertCircle;
  
  return (
    <div
      className={cn(
        'flex items-start gap-1.5 text-xs mt-1',
        isWarning ? 'text-amber-600 dark:text-amber-400' : 'text-destructive',
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
      <div>
        <span>{message}</span>
        {suggestion && (
          <span className="block text-muted-foreground mt-0.5">
            💡 {suggestion}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Kompakte Fehleranzeige für Listen
 */
interface CompactErrorProps {
  title: string;
  count?: number;
  severity?: ErrorSeverity;
  onClick?: () => void;
  className?: string;
}

export const CompactError: React.FC<CompactErrorProps> = ({
  title,
  count,
  severity = 'error',
  onClick,
  className,
}) => {
  const config = severityConfig[severity];
  const Icon = config.icon;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
        config.bgClass,
        config.borderClass,
        'border',
        'hover:opacity-80',
        className
      )}
    >
      <Icon className={cn('h-4 w-4', config.iconClass)} />
      <span className="font-medium">{title}</span>
      {count !== undefined && count > 0 && (
        <span className={cn(
          'ml-auto px-1.5 py-0.5 rounded-full text-xs font-semibold',
          severity === 'error' || severity === 'critical' 
            ? 'bg-destructive/20 text-destructive'
            : severity === 'warning'
              ? 'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
              : 'bg-primary/20 text-primary'
        )}>
          {count}
        </span>
      )}
    </button>
  );
};

export default ErrorAlert;
