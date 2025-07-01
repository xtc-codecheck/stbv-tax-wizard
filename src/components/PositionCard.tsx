
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Calculator } from "lucide-react";
import { Position } from "@/types/stbvv";
import { calculatePosition } from "@/utils/stbvvCalculator";

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

  const handleTenthRateChange = (numerator: string) => {
    const num = parseInt(numerator) || 1;
    onUpdate(position.id, {
      ...position,
      tenthRate: { numerator: num, denominator: 10 }
    });
  };

  const activityOptions = [
    'Einkommensteuererklärung',
    'Einkommensteuer Mantelbogen',
    'Anlage N (Einkünfte aus nichtselbständiger Arbeit)',
    'Anlage V (Vermietung und Verpachtung)',
    'Anlage G (Gewerbebetrieb)',
    'Anlage S (Einkünfte aus selbständiger Arbeit)',
    'Jahresabschluss GmbH',
    'Jahresabschluss Einzelunternehmen',
    'Umsatzsteuer-Voranmeldung',
    'Umsatzsteuererklärung',
    'Gewerbesteuererklärung',
    'Buchführung (monatlich)',
    'Lohnbuchhaltung'
  ];

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
          <Label htmlFor={`activity-${position.id}`}>Tätigkeit</Label>
          <Select
            value={position.activity}
            onValueChange={(value) => handleChange('activity', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tätigkeit auswählen..." />
            </SelectTrigger>
            <SelectContent>
              {activityOptions.map((activity) => (
                <SelectItem key={activity} value={activity}>
                  {activity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Object Value and Fee Table */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`objectValue-${position.id}`}>Gegenstandswert (€)</Label>
            <Input
              id={`objectValue-${position.id}`}
              type="number"
              value={position.objectValue || ''}
              onChange={(e) => handleChange('objectValue', parseFloat(e.target.value) || 0)}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`feeTable-${position.id}`}>Gebührentabelle</Label>
            <Select
              value={position.feeTable}
              onValueChange={(value) => handleChange('feeTable', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Tabelle A (Erklärungen, Beratung)</SelectItem>
                <SelectItem value="B">Tabelle B (Abschlüsse)</SelectItem>
                <SelectItem value="C">Tabelle C (Buchführung)</SelectItem>
                <SelectItem value="D">Tabelle D (Landwirtschaft)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tenth Rate and Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`tenthRate-${position.id}`}>Zehntelsatz</Label>
            <div className="flex items-center space-x-2">
              <Input
                id={`tenthRate-${position.id}`}
                type="number"
                value={position.tenthRate.numerator}
                onChange={(e) => handleTenthRateChange(e.target.value)}
                min="1"
                max="10"
                className="w-16"
              />
              <span className="text-gray-500">/10</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`quantity-${position.id}`}>Anzahl</Label>
            <Input
              id={`quantity-${position.id}`}
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
            id={`expenseFee-${position.id}`}
            checked={position.applyExpenseFee}
            onCheckedChange={(checked) => handleChange('applyExpenseFee', checked)}
          />
          <Label htmlFor={`expenseFee-${position.id}`} className="text-sm">
            Auslagenpauschale anwenden (20% der Nettogebühr, max. 20€)
          </Label>
        </div>

        {/* Calculation Display */}
        {position.objectValue > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-2">Berechnung:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>10/10-Gebühr:</span>
                <span>{calculation.baseFee.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Zehntelsatz ({position.tenthRate.numerator}/10):</span>
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
