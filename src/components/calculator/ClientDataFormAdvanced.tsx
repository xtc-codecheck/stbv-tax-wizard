/**
 * ClientDataFormAdvanced - Mandantendaten-Eingabe
 * DSGVO-konform: Keine Speicherung von Mandantendaten
 * @module components/calculator/ClientDataFormAdvanced
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';
import { ClientData } from '@/types/stbvv';

interface ClientDataFormAdvancedProps {
  clientData: ClientData;
  onUpdate: (field: keyof ClientData, value: string) => void;
  onUpdateAll: (data: ClientData) => void;
}

export function ClientDataFormAdvanced({
  clientData,
  onUpdate,
}: ClientDataFormAdvancedProps) {
  return (
    <Card className="border-2 border-primary/20 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Mandantendaten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="clientName">Name/Firma</Label>
            <Input
              id="clientName"
              value={clientData.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              placeholder="Max Mustermann / Mustermann GmbH"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientStreet">Straße, Hausnummer</Label>
            <Input
              id="clientStreet"
              value={clientData.street}
              onChange={(e) => onUpdate('street', e.target.value)}
              placeholder="Musterstraße 123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientCity">PLZ, Ort</Label>
            <div className="flex gap-2">
              <Input
                id="clientPostalCode"
                value={clientData.postalCode}
                onChange={(e) => onUpdate('postalCode', e.target.value)}
                placeholder="12345"
                className="w-24"
              />
              <Input
                id="clientCity"
                value={clientData.city}
                onChange={(e) => onUpdate('city', e.target.value)}
                placeholder="Musterstadt"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="clientEmail">E-Mail-Adresse</Label>
            <Input
              id="clientEmail"
              type="email"
              value={clientData.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              placeholder="max.mustermann@email.de"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
