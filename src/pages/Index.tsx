import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calculator, Plus, FileText, Download, ArrowUp, ArrowDown, User, Mail } from "lucide-react";
import PositionCard from "@/components/PositionCard";
import TotalCalculation from "@/components/TotalCalculation";
import { Position } from "@/types/stbvv";
import { generatePDF } from "@/utils/pdfGenerator";
import { calculateTotal } from "@/utils/stbvvCalculator";

interface ClientData {
  name: string;
  street: string;
  postalCode: string;
  city: string;
  email: string;
}

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

  const addPosition = () => {
    const newPosition: Position = {
      id: Date.now().toString(),
      activity: '',
      description: '',
      objectValue: 0,
      tenthRate: { numerator: 6, denominator: 10 },
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
    setClientData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePDF = () => {
    generatePDF(positions, documentFee, includeVAT, documentType, clientData);
  };

  const handleSendEmail = () => {
    if (!clientData.email) {
      alert('Bitte geben Sie eine E-Mail-Adresse ein.');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">STBVV-Rechner</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gesetzeskonforme Steuerberatervergütung nach StBVV 2025 mit automatischer PDF-Erstellung
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Positions Column */}
          <div className="lg:col-span-2 space-y-6">
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
              
              {/* Document Type Selection */}
              <Card>
                <CardContent className="pt-6">
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
  );
};

export default Index;
