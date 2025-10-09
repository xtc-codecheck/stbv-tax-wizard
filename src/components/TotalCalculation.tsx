
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Percent, Euro, Minus } from "lucide-react";
import { Position, Discount } from "@/types/stbvv";
import { calculateTotal } from "@/utils/stbvvCalculator";

interface TotalCalculationProps {
  positions: Position[];
  documentFee: number;
  includeVAT: boolean;
  discount: Discount | null;
  onDocumentFeeChange: (fee: number) => void;
  onVATChange: (include: boolean) => void;
  onDiscountChange: (discount: Discount | null) => void;
}

const TotalCalculation: React.FC<TotalCalculationProps> = ({
  positions,
  documentFee,
  includeVAT,
  discount,
  onDocumentFeeChange,
  onVATChange,
  onDiscountChange
}) => {
  // Memoize calculation to prevent unnecessary recalculations
  const totals = useMemo(
    () => calculateTotal(positions, documentFee, includeVAT, discount),
    [positions, documentFee, includeVAT, discount]
  );

  const handleDiscountTypeChange = (type: 'percentage' | 'fixed') => {
    onDiscountChange(discount ? { ...discount, type } : { type, value: 0 });
  };

  const handleDiscountValueChange = (value: number) => {
    if (!discount) {
      onDiscountChange({ type: 'percentage', value });
    } else {
      onDiscountChange({ ...discount, value });
    }
  };

  const handleClearDiscount = () => {
    onDiscountChange(null);
  };
  
  const { positionsTotal, discountAmount, subtotalNet, vatAmount, totalGross } = totals;

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
            onChange={(e) => onDocumentFeeChange(Math.max(0, parseFloat(e.target.value) || 0))}
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

        {/* Discount Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold flex items-center">
              <Minus className="w-4 h-4 mr-2 text-orange-600" />
              Rabatt / Nachlass
            </Label>
            {discount && discount.value > 0 && (
              <button
                onClick={handleClearDiscount}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Entfernen
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <Select
                value={discount?.type || 'percentage'}
                onValueChange={handleDiscountTypeChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">
                    <div className="flex items-center">
                      <Percent className="w-3 h-3 mr-1" />
                      %
                    </div>
                  </SelectItem>
                  <SelectItem value="fixed">
                    <div className="flex items-center">
                      <Euro className="w-3 h-3 mr-1" />
                      €
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Input
                type="number"
                value={discount?.value || 0}
                onChange={(e) => handleDiscountValueChange(Math.max(0, parseFloat(e.target.value) || 0))}
                placeholder={discount?.type === 'percentage' ? "z.B. 10" : "z.B. 50.00"}
                min="0"
                step={discount?.type === 'percentage' ? "1" : "0.01"}
                max={discount?.type === 'percentage' ? "100" : undefined}
              />
            </div>
          </div>
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

          {discount && discount.value > 0 && (
            <div className="flex justify-between text-sm text-orange-600">
              <span>
                Rabatt ({discount.type === 'percentage' ? `${discount.value}%` : `${discount.value.toFixed(2)} €`}):
              </span>
              <span>-{discountAmount.toFixed(2)} €</span>
            </div>
          )}

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
