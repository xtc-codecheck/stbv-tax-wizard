/**
 * Settings - Kanzlei-Einstellungen und Personalisierung
 * @module pages/Settings
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { ArrowLeft, Building2, Save, Palette, Moon, Sun, Monitor, Trash2, ShieldCheck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { BrandingSettings } from "@/types/stbvv";
import { saveBrandingSettings, loadBrandingSettings } from "@/utils/brandingStorage";
import { useTheme } from "@/hooks/useTheme";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme, isDark } = useTheme();
  const currentYear = new Date().getFullYear();
  
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
    toast.success("Einstellungen gespeichert", {
      description: "Ihre Kanzlei-Daten wurden erfolgreich gespeichert.",
    });
  };

  const handleDeleteAllData = () => {
    // Get all keys that belong to our app
    const keysToDelete = [
      'stbvv_saved_clients',
      'stbvv_document_archive',
      'stbvv_document_tabs',
      'stbvv_autosave_client',
      'stbvv_branding_settings',
    ];
    
    keysToDelete.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Reset settings state
    setSettings({
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
    
    toast.success("Alle Daten gelöscht", {
      description: "Alle lokal gespeicherten Daten wurden erfolgreich entfernt.",
    });
  };

  const themeOptions = [
    { value: 'light', label: 'Hell', icon: Sun },
    { value: 'dark', label: 'Dunkel', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 flex flex-col">
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum Rechner
            </Button>
            <h1 className="text-3xl font-bold text-foreground flex items-center">
              <Building2 className="w-8 h-8 mr-3 text-primary" />
              Einstellungen
            </h1>
            <p className="text-muted-foreground mt-2">
              Verwalten Sie Ihre Kanzlei-Daten und Personalisierungsoptionen.
            </p>
          </div>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Erscheinungsbild
              </CardTitle>
              <CardDescription>
                Passen Sie das Aussehen der Anwendung an Ihre Vorlieben an.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Farbschema</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Wählen Sie zwischen hellem, dunklem oder automatischem Modus.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = theme === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className={`
                            flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all
                            ${isActive 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }
                          `}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-sm font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branding Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Kanzlei-Branding
              </CardTitle>
              <CardDescription>
                Diese Informationen erscheinen in Ihren PDFs und geben Ihren Dokumenten einen professionellen Look.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Kanzlei-Informationen</h3>
                
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

              <Separator />

              {/* Bank Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Bankverbindung</h3>
                
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

          {/* Data Privacy Section */}
          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <ShieldCheck className="w-5 h-5" />
                Datenschutz & Datenverwaltung
              </CardTitle>
              <CardDescription>
                Verwalten Sie Ihre lokal gespeicherten Daten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>DSGVO-Hinweis</AlertTitle>
                <AlertDescription>
                  Mandantendaten werden ausschließlich für die aktuelle Sitzung verwendet und nicht dauerhaft gespeichert. 
                  Beim Schließen des Browsers oder Neuladen der Seite werden eingegebene Mandantendaten automatisch gelöscht.
                  Nur Ihre Kanzlei-Branding-Einstellungen werden lokal gespeichert.
                </AlertDescription>
              </Alert>

              {/* Cookie Consent Management */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Cookie-Einwilligung</h3>
                <p className="text-sm text-muted-foreground">
                  Sie haben beim ersten Besuch der Website Ihre Einwilligung zur lokalen Datenspeicherung gegeben. 
                  Sie können diese Einwilligung jederzeit widerrufen.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('stbvv_cookie_consent');
                    toast.success("Einwilligung widerrufen", {
                      description: "Der Cookie-Banner wird beim nächsten Seitenaufruf erneut angezeigt.",
                    });
                  }}
                >
                  Cookie-Einwilligung widerrufen
                </Button>
              </div>

              <Separator />

              {/* Delete All Data */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-destructive">Alle Daten löschen</h3>
                <p className="text-sm text-muted-foreground">
                  Löschen Sie alle lokal gespeicherten Daten unwiderruflich.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Alle lokalen Daten löschen
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Alle Daten löschen?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Dies wird alle lokal gespeicherten Daten unwiderruflich löschen, einschließlich:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Kanzlei-Branding-Einstellungen</li>
                          <li>Archivierte Dokumente</li>
                          <li>Gespeicherte Tabs</li>
                          <li>Cookie-Einwilligung</li>
                          <li>Alle anderen App-Daten</li>
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAllData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Endgültig löschen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link to="/ueber-den-rechner" className="text-muted-foreground hover:text-foreground transition-colors">
                Über den Rechner
              </Link>
              <Link to="/gebuhrenordnung" className="text-muted-foreground hover:text-foreground transition-colors">
                Gebührenordnung
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/rechtliche-grundlagen" className="text-muted-foreground hover:text-foreground transition-colors">
                Rechtliche Grundlagen
              </Link>
              <Link to="/anleitungen" className="text-muted-foreground hover:text-foreground transition-colors">
                Anleitungen
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </div>

            {/* Legal Links & Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground border-t border-border/50 pt-6">
              <div>© {currentYear} Finanzgeflüster GmbH. Alle Rechte vorbehalten.</div>
              <div className="flex gap-6">
                <Link to="/impressum" className="hover:text-foreground transition-colors">
                  Impressum
                </Link>
                <Link to="/datenschutz" className="hover:text-foreground transition-colors">
                  Datenschutz
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
