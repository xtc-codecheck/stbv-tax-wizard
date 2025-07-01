
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Calculator } from "lucide-react";
import { Position } from "@/types/stbvv";
import { calculatePosition } from "@/utils/stbvvCalculator";
import { activityPresets, getActivityPreset } from "@/utils/activityPresets";
import BillingTypeSelector from "./BillingTypeSelector";

interface PositionCardProps {
  position: Position;
  index: number;
  onUpdate: (id: string, position: Position) => void;
  onRemove: (id: string) => void;
}

const PositionCard: React.FC<PositionCardProps> = ({
  position,
  index,
  onUpdate,
  onRemove
}) => {
  const calculation = calculatePosition(position);

  const handleChange = (field: keyof Position, value: any) => {
    onUpdate(position.id, { ...position, [field]: value });
  };

  const handleActivityChange = (activity: string) => {
    const preset = getActivityPreset(activity);
    const updatedPosition = {
      ...position,
      activity,
      ...(preset && {
        tenthRate: { numerator: preset.defaultTenthRate, denominator: 10 },
        feeTable: preset.suggestedFeeTable
      })
    };
    onUpdate(position.id, updatedPosition);
  };

  const handleTenthRateChange = (numerator: string) => {
    const num = parseFloat(numerator) || 1;
    onUpdate(position.id, {
      ...position,
      tenthRate: { numerator: num, denominator: 10 }
    });
  };

  const canCalculate = () => {
    switch (position.billingType) {
      case 'hourly':
        return (position.hourlyRate || 0) > 0 && (position.hours || 0) > 0;
      case 'flatRate':
        return (position.flatRate || 0) > 0;
      case 'objectValue':
      default:
        return position.objectValue > 0;
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600" />
            Position {index}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(position.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Activity */}
        <div className="space-y-2">
          <Label>Tätigkeit</Label>
          <Select
            value={position.activity}
            onValueChange={handleActivityChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tätigkeit auswählen..." />
            </SelectTrigger>
            <SelectContent>
              {activityPresets.map((preset) => (
                <SelectItem key={preset.activity} value={preset.activity}>
                  {preset.activity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Beschreibung (optional)</Label>
          <Textarea
            value={position.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Zusätzliche Beschreibung zur Position..."
            rows={2}
          />
        </div>

        {/* Billing Type Selector */}
        <BillingTypeSelector
          position={position}
          onUpdate={handleChange}
        />

        {/* Tenth Rate and Quantity */}
        <div className="grid grid-cols-2 gap-4">
          {position.billingType === 'objectValue' && (
            <div className="space-y-2">
              <Label>Zehntelsatz</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={position.tenthRate.numerator}
                  onChange={(e) => handleTenthRateChange(e.target.value)}
                  min="0.1"
                  max="20"
                  step="0.1"
                  className="w-20"
                />
                <span className="text-gray-500">/10</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Anzahl</Label>
            <Input
              type="number"
              value={position.quantity}
              onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
              min="1"
              step="1"
            />
          </div>
        </div>

        {/* Expense Fee Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={position.applyExpenseFee}
            onCheckedChange={(checked) => handleChange('applyExpenseFee', checked)}
          />
          <Label className="text-sm">
            Auslagenpauschale anwenden (20% der Nettogebühr, max. 20€)
          </Label>
        </div>

        {/* Calculation Display */}
        {canCalculate() && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-2">Berechnung:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Gebühr:</span>
                <span>{calculation.adjustedFee.toFixed(2)} €</span>
              </div>
              {position.applyExpenseFee && (
                <div className="flex justify-between">
                  <span>Auslagenpauschale:</span>
                  <span>{calculation.expenseFee.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-blue-700 border-t pt-1">
                <span>Gesamt netto:</span>
                <span>{calculation.totalNet.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PositionCard;
