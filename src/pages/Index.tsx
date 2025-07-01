
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, Plus, FileText, Download, ArrowUp, ArrowDown } from "lucide-react";
import PositionCard from "@/components/PositionCard";
import TotalCalculation from "@/components/TotalCalculation";
import { Position } from "@/types/stbvv";
import { generatePDF } from "@/utils/pdfGenerator";

const Index = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [documentFee, setDocumentFee] = useState(12);
  const [includeVAT, setIncludeVAT] = useState(true);
  const [documentType, setDocumentType] = useState<'quote' | 'invoice'>('quote');

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

  const handleGeneratePDF = () => {
    generatePDF(positions, documentFee, includeVAT);
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
            <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold text-blue-700 flex items-center justify-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Neue Position hinzufügen
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  onClick={addPosition}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Position hinzufügen
                </Button>
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
                <Button
                  onClick={handleGeneratePDF}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF herunterladen
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
