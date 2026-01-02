/**
 * ClientDataForm - Formular für Mandantendaten
 * @module components/calculator/ClientDataForm
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { ClientData } from "@/types/stbvv";

interface ClientDataFormProps {
  clientData: ClientData;
  onUpdate: (field: keyof ClientData, value: string) => void;
}

export function ClientDataForm({ clientData, onUpdate }: ClientDataFormProps) {
  return (
    <Card className="border-2 border-green-200 bg-green-50/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-700 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Mandantendaten
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
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
            <Label htmlFor="clientPostalCode">PLZ</Label>
            <Input
              id="clientPostalCode"
              value={clientData.postalCode}
              onChange={(e) => onUpdate('postalCode', e.target.value)}
              placeholder="12345"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientCity">Ort</Label>
            <Input
              id="clientCity"
              value={clientData.city}
              onChange={(e) => onUpdate('city', e.target.value)}
              placeholder="Musterstadt"
            />
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
