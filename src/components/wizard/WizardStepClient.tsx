/**
 * Wizard Step 1: Mandanten-Eingabe
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClientData } from '@/types/stbvv';
import { useClientDatabase } from '@/hooks/useClientDatabase';
import { SavedClient } from '@/schemas/client.schema';
import { User, Clock, ArrowRight, Building2 } from 'lucide-react';

interface WizardStepClientProps {
  clientData: ClientData;
  onUpdateClientData: (data: ClientData) => void;
  onNext: () => void;
}

export function WizardStepClient({ clientData, onUpdateClientData, onNext }: WizardStepClientProps) {
  const { recentClients } = useClientDatabase();
  
  const handleFieldChange = (field: keyof ClientData, value: string) => {
    onUpdateClientData({ ...clientData, [field]: value });
  };

  const handleSelectClient = (client: SavedClient) => {
    onUpdateClientData({
      name: client.name,
      street: client.street,
      postalCode: client.postalCode,
      city: client.city,
      email: client.email,
    });
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

      {/* Recent Clients Quick Select */}
      {recentClients.length > 0 && (
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Zuletzt verwendet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recentClients.slice(0, 5).map((client) => (
                <Button
                  key={client.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectClient(client)}
                  className="gap-2"
                >
                  <Building2 className="w-3 h-3" />
                  {client.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
