/**
 * CookieBanner - DSGVO-konformer Hinweis zur lokalen Datenspeicherung
 * @module components/CookieBanner
 */

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'stbvv_cookie_consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      // Small delay for smoother UX
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Even if declined, we note the choice so banner doesn't reappear
    localStorage.setItem(CONSENT_KEY, 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 duration-300">
      <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-lg bg-background/95 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-foreground">Lokale Datenspeicherung</h3>
              <p className="text-sm text-muted-foreground">
                Diese Anwendung speichert Ihre <strong>Kanzlei-Einstellungen</strong> lokal in Ihrem Browser, 
                um Ihnen eine bessere Nutzererfahrung zu bieten. <strong>Mandantendaten werden nicht gespeichert</strong> und 
                sind nur während der aktuellen Sitzung verfügbar. Beim Schließen des Browsers werden eingegebene 
                Mandantendaten automatisch gelöscht.
              </p>
              <p className="text-xs text-muted-foreground">
                Weitere Informationen finden Sie in unserer{' '}
                <Link to="/datenschutz" className="text-primary hover:underline">
                  Datenschutzerklärung
                </Link>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDecline}
                className="order-2 sm:order-1"
              >
                Ablehnen
              </Button>
              <Button 
                size="sm" 
                onClick={handleAccept}
                className="order-1 sm:order-2"
              >
                Akzeptieren
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 md:hidden h-8 w-8"
              onClick={handleDecline}
              aria-label="Banner schließen"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
