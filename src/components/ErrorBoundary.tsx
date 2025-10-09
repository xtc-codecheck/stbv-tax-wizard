import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="max-w-md w-full border-red-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-700 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Ein Fehler ist aufgetreten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Die Anwendung ist auf einen unerwarteten Fehler gestoßen und konnte nicht fortgesetzt werden.
              </p>
              {this.state.error && (
                <div className="p-3 bg-red-50 rounded border border-red-200 text-sm text-red-800 font-mono overflow-auto">
                  {this.state.error.message}
                </div>
              )}
              <Button onClick={this.handleReload} className="w-full">
                Seite neu laden
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
