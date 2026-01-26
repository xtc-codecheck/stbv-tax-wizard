/**
 * Wizard Step 1: Mandanten-Eingabe
 * DSGVO-konform: Keine Speicherung von Mandantendaten
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ClientData } from '@/types/stbvv';
import { User, ArrowRight, ShieldCheck } from 'lucide-react';

interface WizardStepClientProps {
  clientData: ClientData;
  onUpdateClientData: (data: ClientData) => void;
  onNext: () => void;
}

export function WizardStepClient({ clientData, onUpdateClientData, onNext }: WizardStepClientProps) {
  const handleFieldChange = (field: keyof ClientData, value: string) => {
    onUpdateClientData({ ...clientData, [field]: value });
  };

  const isValid = clientData.name.trim().length > 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Mandant eingeben</h2>
        <p className="text-muted-foreground mt-2">
          Für wen erstellen Sie diese Rechnung? Geben Sie die Mandantendaten ein.
        </p>
      </div>

      {/* Privacy Notice */}
      <Alert className="border-primary/30 bg-primary/5">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Datenschutz:</strong> Mandantendaten werden nur für die aktuelle Sitzung verwendet und nicht gespeichert. 
          Beim Schließen des Browsers werden alle eingegebenen Daten automatisch gelöscht.
        </AlertDescription>
      </Alert>

      {/* Client Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mandantendaten</CardTitle>
          <CardDescription>
            Mindestens der Name ist erforderlich
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              Name / Firma
              <Badge variant="secondary" className="text-xs">Pflichtfeld</Badge>
            </Label>
            <Input
              id="name"
              placeholder="Max Mustermann oder Musterfirma GmbH"
              value={clientData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="text-lg"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="street">Straße & Hausnummer</Label>
              <Input
                id="street"
                placeholder="Musterstraße 123"
                value={clientData.street}
                onChange={(e) => handleFieldChange('street', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode">PLZ</Label>
                <Input
                  id="postalCode"
                  placeholder="12345"
                  value={clientData.postalCode}
                  onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                  maxLength={5}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="city">Ort</Label>
                <Input
                  id="city"
                  placeholder="Musterstadt"
                  value={clientData.city}
                  onChange={(e) => handleFieldChange('city', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-Mail (optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="mandant@beispiel.de"
              value={clientData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={onNext} 
          disabled={!isValid}
          className="gap-2"
        >
          Weiter zur Vorlage
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
