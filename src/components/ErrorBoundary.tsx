import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { ErrorLoggingService, logError } from '@/services/ErrorLoggingService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to ErrorLoggingService for structured crash reporting
    logError(error, {
      code: 'COMPONENT_CRASH',
      context: {
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
      },
    });

    console.error('ErrorBoundary caught error:', error, errorInfo);
    
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, showDetails: false });
  };

  private toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  public render() {
    if (this.state.hasError) {
      // Allow custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="max-w-md w-full border-destructive/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-destructive flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Ein Fehler ist aufgetreten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Die Anwendung ist auf einen unerwarteten Fehler gestoßen und konnte nicht fortgesetzt werden.
              </p>
              
              {this.state.error && (
                <div className="p-3 bg-destructive/10 rounded border border-destructive/20 text-sm text-destructive font-mono overflow-auto">
                  {this.state.error.message}
                </div>
              )}

              {/* Expandable Details for Developers */}
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <div className="border border-border rounded-md">
                  <button 
                    onClick={this.toggleDetails}
                    className="w-full flex items-center justify-between p-3 text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
                  >
                    <span>Technische Details</span>
                    {this.state.showDetails ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {this.state.showDetails && (
                    <div className="p-3 border-t border-border bg-muted/30 text-xs font-mono overflow-auto max-h-48">
                      <pre className="whitespace-pre-wrap break-words">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={this.handleReset} variant="outline" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Erneut versuchen
                </Button>
                <Button onClick={this.handleReload} className="flex-1">
                  Seite neu laden
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
