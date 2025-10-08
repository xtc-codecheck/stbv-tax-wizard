import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Building2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BrandingSettings } from "@/types/stbvv";
import { saveBrandingSettings, loadBrandingSettings } from "@/utils/brandingStorage";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<BrandingSettings>({
    companyName: '',
    street: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    taxNumber: '',
    bankName: '',
    iban: '',
    bic: ''
  });

  useEffect(() => {
    const loaded = loadBrandingSettings();
    if (loaded) {
      setSettings(loaded);
    }
  }, []);

  const handleChange = (field: keyof BrandingSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveBrandingSettings(settings);
    toast({
      title: "Einstellungen gespeichert",
      description: "Ihre Kanzlei-Daten wurden erfolgreich gespeichert.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Building2 className="w-8 h-8 mr-3 text-blue-600" />
            Kanzlei-Einstellungen
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Steuerberater-Branding</CardTitle>
            <CardDescription>
              Diese Informationen erscheinen in Ihren PDFs und geben Ihren Dokumenten einen professionellen Look.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Kanzlei-Informationen</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Kanzlei-Name</Label>
                  <Input
                    value={settings.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    placeholder="Steuerberatung Müller & Partner"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Straße und Hausnummer</Label>
                  <Input
                    value={settings.street}
                    onChange={(e) => handleChange('street', e.target.value)}
                    placeholder="Hauptstraße 123"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Postleitzahl</Label>
                  <Input
                    value={settings.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="12345"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stadt</Label>
                  <Input
                    value={settings.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Berlin"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <Input
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+49 30 12345678"
                  />
                </div>

                <div className="space-y-2">
                  <Label>E-Mail</Label>
                  <Input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="info@steuerberatung-mueller.de"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Steuernummer</Label>
                  <Input
                    value={settings.taxNumber}
                    onChange={(e) => handleChange('taxNumber', e.target.value)}
                    placeholder="12/345/67890"
                  />
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold text-gray-800">Bankverbindung</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label>Bank-Name</Label>
                  <Input
                    value={settings.bankName}
                    onChange={(e) => handleChange('bankName', e.target.value)}
                    placeholder="Sparkasse Berlin"
                  />
                </div>

                <div className="space-y-2">
                  <Label>IBAN</Label>
                  <Input
                    value={settings.iban}
                    onChange={(e) => handleChange('iban', e.target.value)}
                    placeholder="DE89 3704 0044 0532 0130 00"
                  />
                </div>

                <div className="space-y-2">
                  <Label>BIC</Label>
                  <Input
                    value={settings.bic}
                    onChange={(e) => handleChange('bic', e.target.value)}
                    placeholder="COBADEFFXXX"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSave} className="w-full md:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Einstellungen speichern
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
