import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Calculator, AlertTriangle, Scale, ArrowUp, ArrowDown } from "lucide-react";
import { Position } from "@/types/stbvv";
import { calculatePosition } from "@/utils/stbvvCalculator";
import { activityPresets, getActivityPreset } from "@/utils/activityPresets";
import BillingTypeSelector from "./BillingTypeSelector";

interface PositionCardProps {
  position: Position;
  index: number;
  onUpdate: (id: string, position: Position) => void;
  onRemove: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMove: (id: string, direction: 'up' | 'down') => void;
}

const PositionCard: React.FC<PositionCardProps> = ({
  position,
  index,
  onUpdate,
  onRemove,
  canMoveUp,
  canMoveDown,
  onMove
}) => {
  const calculation = calculatePosition(position);
  const preset = getActivityPreset(position.activity);

  const handleChange = (field: keyof Position, value: any) => {
    onUpdate(position.id, { ...position, [field]: value });
  };

  const handleActivityChange = (activity: string) => {
    const preset = getActivityPreset(activity);
    let updatedPosition = {
      ...position,
      activity,
      ...(preset && {
        tenthRate: { 
          numerator: preset.defaultTenthRate, 
          denominator: preset.rateType === 'twentieth' ? 20 : 10 
        },
        feeTable: preset.suggestedFeeTable
      })
    };

    // Spezielle Behandlung für bestimmte Aktivitäten
    if (activity === 'Prüfung Steuerbescheid') {
      updatedPosition = {
        ...updatedPosition,
        billingType: 'hourly',
        hourlyRate: 100,
        hours: 1
      };
    } else if (activity === 'Lohnbuchhaltung') {
      updatedPosition = {
        ...updatedPosition,
        billingType: 'flatRate',
        flatRate: 18
      };
    }

    onUpdate(position.id, updatedPosition);
  };

  const handleTenthRateChange = (numerator: string) => {
    const num = parseFloat(numerator) || 1;
    const denominator = preset?.rateType === 'twentieth' ? 20 : 10;
    onUpdate(position.id, {
      ...position,
      tenthRate: { numerator: num, denominator }
    });
  };

  const isRateOutOfRange = () => {
    if (!preset || position.billingType !== 'objectValue') return false;
    const rate = position.tenthRate.numerator;
    return rate < preset.minRate || rate > preset.maxRate;
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
          <div className="flex items-center space-x-2">
            {/* Move Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(position.id, 'up')}
              disabled={!canMoveUp}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(position.id, 'down')}
              disabled={!canMoveDown}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-30"
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(position.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
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

        {/* Legal Basis */}
        {preset && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center text-sm text-blue-700">
              <Scale className="w-4 h-4 mr-2" />
              <span className="font-medium">Rechtsgrundlage:</span>
              <span className="ml-2">{preset.legalBasis} StBVV</span>
            </div>
          </div>
        )}

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

        {/* Rate and Quantity */}
        <div className="grid grid-cols-2 gap-4">
          {position.billingType === 'objectValue' && preset && (
            <div className="space-y-2">
              <Label>
                {preset.rateType === 'twentieth' ? 'Zwanzigstel' : 'Zehntelsatz'}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={position.tenthRate.numerator}
                  onChange={(e) => handleTenthRateChange(e.target.value)}
                  min="0.1"
                  max={preset.rateType === 'twentieth' ? "20" : "50"}
                  step="0.5"
                  className={`w-20 ${isRateOutOfRange() ? 'border-red-300' : ''}`}
                />
                <span className="text-gray-500">
                  /{preset.rateType === 'twentieth' ? '20' : '10'}
                </span>
              </div>
              {isRateOutOfRange() && (
                <div className="flex items-center text-sm text-red-600 bg-red-50 p-2 rounded">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span>
                    Rahmen verlassen! Zulässig: {preset.minRate}/{preset.rateType === 'twentieth' ? '20' : '10'} bis {preset.maxRate}/{preset.rateType === 'twentieth' ? '20' : '10'}
                  </span>
                </div>
              )}
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
