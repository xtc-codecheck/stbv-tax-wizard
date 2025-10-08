import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calculator, Plus, FileText, Download, User, Mail, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { z } from "zod";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import PositionCard from "@/components/PositionCard";
import TotalCalculation from "@/components/TotalCalculation";
import TemplateSelector from "@/components/TemplateSelector";
import { Position, ClientData, Template } from "@/types/stbvv";
import { generatePDF } from "@/utils/pdfGenerator";
import { calculateTotal } from "@/utils/stbvvCalculator";
import { saveCustomTemplate } from "@/utils/templateManager";

// Email validation schema
const emailSchema = z.string().email();

// LocalStorage keys
const STORAGE_KEYS = {
  positions: 'stbvv_autosave_positions',
  clientData: 'stbvv_autosave_client',
  documentFee: 'stbvv_autosave_documentFee',
  includeVAT: 'stbvv_autosave_includeVAT',
  documentType: 'stbvv_autosave_documentType',
  invoiceNumber: 'stbvv_autosave_invoiceNumber',
  invoiceDate: 'stbvv_autosave_invoiceDate',
  servicePeriod: 'stbvv_autosave_servicePeriod',
  invoiceCounter: 'stbvv_invoice_counter',
  lastSaveTimestamp: 'stbvv_autosave_timestamp'
};

const Index = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [documentFee, setDocumentFee] = useState(0);
  const [includeVAT, setIncludeVAT] = useState(true);
  const [documentType, setDocumentType] = useState<'quote' | 'invoice'>('quote');
  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    street: '',
    postalCode: '',
    city: '',
    email: ''
  });
  
  // New state for invoice metadata
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [servicePeriod, setServicePeriod] = useState('');
  
  // State for restore dialog
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [savedTimestamp, setSavedTimestamp] = useState<string>('');

  // Auto-generate invoice number
  useEffect(() => {
    if (documentType === 'invoice' && !invoiceNumber) {
      const counter = parseInt(localStorage.getItem(STORAGE_KEYS.invoiceCounter) || '1000');
      const newNumber = `RE-${counter + 1}`;
      setInvoiceNumber(newNumber);
    } else if (documentType === 'quote' && !invoiceNumber) {
      const counter = parseInt(localStorage.getItem(STORAGE_KEYS.invoiceCounter) || '1000');
      const newNumber = `AG-${counter + 1}`;
      setInvoiceNumber(newNumber);
    }
  }, [documentType]);

  // Check for saved data on mount
  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEYS.positions);
    const timestamp = localStorage.getItem(STORAGE_KEYS.lastSaveTimestamp);
    
    if (savedPositions && timestamp) {
      setSavedTimestamp(timestamp);
      setShowRestoreDialog(true);
    }
  }, []);

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (positions.length > 0 || clientData.name || clientData.email) {
        try {
          localStorage.setItem(STORAGE_KEYS.positions, JSON.stringify(positions));
          localStorage.setItem(STORAGE_KEYS.clientData, JSON.stringify(clientData));
          localStorage.setItem(STORAGE_KEYS.documentFee, documentFee.toString());
          localStorage.setItem(STORAGE_KEYS.includeVAT, includeVAT.toString());
          localStorage.setItem(STORAGE_KEYS.documentType, documentType);
          localStorage.setItem(STORAGE_KEYS.invoiceNumber, invoiceNumber);
          localStorage.setItem(STORAGE_KEYS.invoiceDate, invoiceDate.toISOString());
          localStorage.setItem(STORAGE_KEYS.servicePeriod, servicePeriod);
          localStorage.setItem(STORAGE_KEYS.lastSaveTimestamp, new Date().toISOString());
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [positions, clientData, documentFee, includeVAT, documentType, invoiceNumber, invoiceDate, servicePeriod]);

  const restoreSession = () => {
    try {
      const savedPositions = localStorage.getItem(STORAGE_KEYS.positions);
      const savedClientData = localStorage.getItem(STORAGE_KEYS.clientData);
      const savedDocumentFee = localStorage.getItem(STORAGE_KEYS.documentFee);
      const savedIncludeVAT = localStorage.getItem(STORAGE_KEYS.includeVAT);
      const savedDocumentType = localStorage.getItem(STORAGE_KEYS.documentType);
      const savedInvoiceNumber = localStorage.getItem(STORAGE_KEYS.invoiceNumber);
      const savedInvoiceDate = localStorage.getItem(STORAGE_KEYS.invoiceDate);
      const savedServicePeriod = localStorage.getItem(STORAGE_KEYS.servicePeriod);

      if (savedPositions) setPositions(JSON.parse(savedPositions));
      if (savedClientData) setClientData(JSON.parse(savedClientData));
      if (savedDocumentFee) setDocumentFee(parseFloat(savedDocumentFee));
      if (savedIncludeVAT) setIncludeVAT(savedIncludeVAT === 'true');
      if (savedDocumentType) setDocumentType(savedDocumentType as 'quote' | 'invoice');
      if (savedInvoiceNumber) setInvoiceNumber(savedInvoiceNumber);
      if (savedInvoiceDate) setInvoiceDate(new Date(savedInvoiceDate));
      if (savedServicePeriod) setServicePeriod(savedServicePeriod);

      toast.success('Sitzung wiederhergestellt');
    } catch (error) {
      toast.error('Fehler beim Wiederherstellen der Sitzung');
    }
    setShowRestoreDialog(false);
  };

  const clearSession = () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    setShowRestoreDialog(false);
    toast.success('Neue Sitzung gestartet');
  };

  const addPosition = () => {
    const newPosition: Position = {
      id: Date.now().toString(),
      activity: '',
      description: '',
      objectValue: 0,
      tenthRate: {
        numerator: 6,
        denominator: 10
      },
      quantity: 1,
      feeTable: 'A',
      applyExpenseFee: true,
      billingType: 'objectValue',
      hourlyRate: 0,
      hours: 0,
      flatRate: 0
    };
    setPositions([...positions, newPosition]);
  };

  const duplicatePosition = (id: string) => {
    const positionToDuplicate = positions.find(pos => pos.id === id);
    if (!positionToDuplicate) return;

    const duplicatedPosition: Position = {
      ...positionToDuplicate,
      id: Date.now().toString(),
      activity: positionToDuplicate.activity + ' (Kopie)'
    };

    const index = positions.findIndex(pos => pos.id === id);
    const newPositions = [...positions];
    newPositions.splice(index + 1, 0, duplicatedPosition);
    setPositions(newPositions);
    
    toast.success('Position dupliziert');
  };

  const updatePosition = (id: string, updatedPosition: Position) => {
    setPositions(positions.map(pos => pos.id === id ? updatedPosition : pos));
  };

  const removePosition = (id: string) => {
    setPositions(positions.filter(pos => pos.id !== id));
  };

  const movePosition = (id: string, direction: 'up' | 'down') => {
    const currentIndex = positions.findIndex(pos => pos.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= positions.length) return;

    const newPositions = [...positions];
    [newPositions[currentIndex], newPositions[newIndex]] = [newPositions[newIndex], newPositions[currentIndex]];
    setPositions(newPositions);
  };

  const updateClientData = (field: keyof ClientData, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const loadTemplate = (template: Template) => {
    console.log('Loading template:', template.name, 'with', template.positions.length, 'positions');
    const newPositions = template.positions.map((pos, index) => ({
      ...pos,
      id: `${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`
    }));
    console.log('New positions:', newPositions);
    setPositions(newPositions);
    toast.success(`Vorlage "${template.name}" mit ${newPositions.length} Positionen geladen`);
  };

  const saveAsTemplate = (name: string) => {
    saveCustomTemplate(name, positions);
  };

  const validateBeforeGenerate = (): boolean => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if at least one position exists
    if (positions.length === 0) {
      errors.push('Bitte fügen Sie mindestens eine Position hinzu');
    }

    // Check if all positions have valid data
    positions.forEach((position, index) => {
      if (!position.activity) {
        errors.push(`Position ${index + 1}: Tätigkeit fehlt`);
      }

      switch (position.billingType) {
        case 'objectValue':
          if (!position.objectValue || position.objectValue <= 0) {
            errors.push(`Position ${index + 1}: Gegenstandswert muss größer als 0 sein`);
          }
          break;
        case 'hourly':
          if (!position.hourlyRate || position.hourlyRate <= 0) {
            errors.push(`Position ${index + 1}: Stundensatz muss größer als 0 sein`);
          }
          if (!position.hours || position.hours <= 0) {
            errors.push(`Position ${index + 1}: Stunden müssen größer als 0 sein`);
          }
          break;
        case 'flatRate':
          if (!position.flatRate || position.flatRate <= 0) {
            errors.push(`Position ${index + 1}: Pauschalbetrag muss größer als 0 sein`);
          }
          break;
      }
    });

    // Check total amount
    const totals = calculateTotal(positions, documentFee, includeVAT);
    if (totals.totalGross < 50) {
      warnings.push(`Gesamtsumme (${totals.totalGross.toFixed(2)} €) ist sehr niedrig`);
    }

    // Check VAT
    if (!includeVAT) {
      warnings.push('Umsatzsteuer ist nicht aktiviert');
    }

    // Validate email if provided
    if (clientData.email) {
      try {
        emailSchema.parse(clientData.email);
      } catch {
        errors.push('E-Mail-Adresse ist ungültig');
      }
    }

    // Show errors
    if (errors.length > 0) {
      toast.error(
        <div>
          <div className="font-semibold mb-1">Fehler gefunden:</div>
          <ul className="list-disc list-inside text-sm">
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>,
        { duration: 5000 }
      );
      return false;
    }

    // Show warnings (non-blocking)
    if (warnings.length > 0) {
      toast.warning(
        <div>
          <div className="font-semibold mb-1">Hinweise:</div>
          <ul className="list-disc list-inside text-sm">
            {warnings.map((warning, i) => <li key={i}>{warning}</li>)}
          </ul>
        </div>,
        { duration: 4000 }
      );
    }

    return true;
  };

  const handleGeneratePDF = () => {
    if (!validateBeforeGenerate()) return;

    // Increment invoice counter if it's an invoice
    if (documentType === 'invoice') {
      const currentCounter = parseInt(localStorage.getItem(STORAGE_KEYS.invoiceCounter) || '1000');
      localStorage.setItem(STORAGE_KEYS.invoiceCounter, (currentCounter + 1).toString());
    }

    generatePDF(
      positions, 
      documentFee, 
      includeVAT, 
      documentType, 
      clientData,
      invoiceNumber,
      invoiceDate,
      servicePeriod
    );
    
    toast.success(`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} erfolgreich erstellt`);
  };

  const handleSendEmail = () => {
    if (!clientData.email) {
      toast.error('Bitte geben Sie eine E-Mail-Adresse ein');
      return;
    }

    const totals = calculateTotal(positions, documentFee, includeVAT);
    const documentTitle = documentType === 'quote' ? 'Angebot' : 'Rechnung';
    const subject = encodeURIComponent(`${documentTitle} - Steuerberatervergütung`);
    const body = encodeURIComponent(`Sehr geehrte Damen und Herren,

anbei erhalten Sie unser${documentType === 'quote' ? ' Angebot' : 'e Rechnung'} über Steuerberatungsleistungen.

Gesamtsumme: ${totals.totalGross.toFixed(2)} €

Mit freundlichen Grüßen`);
    
    const mailtoLink = `mailto:${clientData.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Letzte Sitzung wiederherstellen?</AlertDialogTitle>
            <AlertDialogDescription>
              Es wurde eine gespeicherte Sitzung gefunden vom{' '}
              {savedTimestamp && new Date(savedTimestamp).toLocaleString('de-DE')}.
              Möchten Sie diese wiederherstellen oder neu starten?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={clearSession}>
              Neu starten
            </AlertDialogCancel>
            <AlertDialogAction onClick={restoreSession}>
              Wiederherstellen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">STBVV-Rechner by Steuern mit Kopf</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              Gesetzeskonforme Steuerberatervergütung nach StBVV 2025 mit automatischer PDF-Erstellung.
              (Hinweis: Berechnung erfolgt nach gesetzlichen Mittelwerten)
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Positions Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Template Selector */}
              <TemplateSelector
                onLoadTemplate={loadTemplate}
                onSaveAsTemplate={saveAsTemplate}
                hasPositions={positions.length > 0}
              />

              {/* Client Data Card */}
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
                        onChange={(e) => updateClientData('name', e.target.value)}
                        placeholder="Max Mustermann / Mustermann GmbH"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientStreet">Straße, Hausnummer</Label>
                      <Input
                        id="clientStreet"
                        value={clientData.street}
                        onChange={(e) => updateClientData('street', e.target.value)}
                        placeholder="Musterstraße 123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientPostalCode">PLZ</Label>
                      <Input
                        id="clientPostalCode"
                        value={clientData.postalCode}
                        onChange={(e) => updateClientData('postalCode', e.target.value)}
                        placeholder="12345"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientCity">Ort</Label>
                      <Input
                        id="clientCity"
                        value={clientData.city}
                        onChange={(e) => updateClientData('city', e.target.value)}
                        placeholder="Musterstadt"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="clientEmail">E-Mail-Adresse</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={clientData.email}
                        onChange={(e) => updateClientData('email', e.target.value)}
                        placeholder="max.mustermann@email.de"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Positions List */}
              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div key={position.id} className="relative">
                    <PositionCard
                      position={position}
                      index={index + 1}
                      onUpdate={updatePosition}
                      onRemove={removePosition}
                      onDuplicate={duplicatePosition}
                      canMoveUp={index > 0}
                      canMoveDown={index < positions.length - 1}
                      onMove={movePosition}
                    />
                  </div>
                ))}
              </div>

              {positions.length === 0 && (
                <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Keine Positionen vorhanden
                    </h3>
                    <p className="text-gray-500">
                      Fügen Sie Ihre erste Position hinzu, um mit der Berechnung zu beginnen.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Add Position Button */}
              <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
                <CardContent className="text-center py-6">
                  <Button
                    onClick={addPosition}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Position hinzufügen
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Calculation Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <TotalCalculation
                  positions={positions}
                  documentFee={documentFee}
                  includeVAT={includeVAT}
                  onDocumentFeeChange={setDocumentFee}
                  onVATChange={setIncludeVAT}
                />

                {/* Invoice Metadata */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Dokumenttyp</Label>
                      <Select
                        value={documentType}
                        onValueChange={(value: 'quote' | 'invoice') => setDocumentType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quote">Angebot</SelectItem>
                          <SelectItem value="invoice">Rechnung</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber">
                        {documentType === 'invoice' ? 'Rechnungsnummer' : 'Angebotsnummer'}
                      </Label>
                      <Input
                        id="invoiceNumber"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        placeholder={documentType === 'invoice' ? 'RE-1001' : 'AG-1001'}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Datum</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !invoiceDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {invoiceDate ? format(invoiceDate, "PPP", { locale: de }) : <span>Datum wählen</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={invoiceDate}
                            onSelect={(date) => date && setInvoiceDate(date)}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="servicePeriod">Leistungszeitraum (optional)</Label>
                      <Input
                        id="servicePeriod"
                        value={servicePeriod}
                        onChange={(e) => setServicePeriod(e.target.value)}
                        placeholder="z.B. Januar 2025"
                      />
                    </div>
                  </CardContent>
                </Card>

                {positions.length > 0 && (
                  <div className="space-y-2">
                    <Button
                      onClick={handleGeneratePDF}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {documentType === 'quote' ? 'Angebot' : 'Rechnung'} als PDF herunterladen
                    </Button>

                    {clientData.email && (
                      <Button
                        onClick={handleSendEmail}
                        variant="outline"
                        className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-medium transition-all duration-200"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        E-Mail senden an {clientData.email}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
