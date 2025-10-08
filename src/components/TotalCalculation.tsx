
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Receipt, Euro } from "lucide-react";
import { Position } from "@/types/stbvv";
import { calculatePosition } from "@/utils/stbvvCalculator";

interface TotalCalculationProps {
  positions: Position[];
  documentFee: number;
  includeVAT: boolean;
  onDocumentFeeChange: (fee: number) => void;
  onVATChange: (include: boolean) => void;
}

const TotalCalculation: React.FC<TotalCalculationProps> = ({
  positions,
  documentFee,
  includeVAT,
  onDocumentFeeChange,
  onVATChange
}) => {
  const positionsTotal = positions.reduce((total, position) => {
    const calculation = calculatePosition(position);
    return total + (calculation.totalNet * position.quantity);
  }, 0);

  const subtotalNet = positionsTotal + documentFee;
  const vatAmount = includeVAT ? subtotalNet * 0.19 : 0;
  const totalGross = subtotalNet + vatAmount;

  return (
    <Card className="border-2 border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-700 flex items-center">
          <Receipt className="w-5 h-5 mr-2" />
          Gesamtberechnung
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Document Fee */}
        <div className="space-y-2">
          <Label htmlFor="documentFee">Dokumentenpauschale (€)</Label>
          <Input
            id="documentFee"
            type="number"
            value={documentFee === 0 ? '' : documentFee}
            onChange={(e) => onDocumentFeeChange(parseFloat(e.target.value) || 0)}
            min="0"
            step="0.01"
            placeholder="12.00"
          />
        </div>

        {/* VAT Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="includeVAT"
            checked={includeVAT}
            onCheckedChange={onVATChange}
          />
          <Label htmlFor="includeVAT" className="text-sm">
            Umsatzsteuer 19% berechnen
          </Label>
        </div>

        <Separator />

        {/* Calculation Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Summe Positionen:</span>
            <span>{positionsTotal.toFixed(2)} €</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>Dokumentenpauschale:</span>
            <span>{documentFee.toFixed(2)} €</span>
          </div>

          <Separator />

          <div className="flex justify-between font-medium">
            <span>Zwischensumme netto:</span>
            <span>{subtotalNet.toFixed(2)} €</span>
          </div>

          {includeVAT && (
            <div className="flex justify-between text-sm">
              <span>Umsatzsteuer (19%):</span>
              <span>{vatAmount.toFixed(2)} €</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold text-green-700">
            <span>Gesamtsumme brutto:</span>
            <span>{totalGross.toFixed(2)} €</span>
          </div>
        </div>

        {positions.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            <p className="text-sm">
              Fügen Sie Positionen hinzu, um die Berechnung zu sehen
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalCalculation;
