
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Position } from "@/types/stbvv";

interface BillingTypeSelectorProps {
  position: Position;
  onUpdate: (field: keyof Position, value: any) => void;
}

const BillingTypeSelector: React.FC<BillingTypeSelectorProps> = ({
  position,
  onUpdate
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Abrechnungsart</Label>
        <Select
          value={position.billingType}
          onValueChange={(value) => onUpdate('billingType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="objectValue">Nach Gegenstandswert</SelectItem>
            <SelectItem value="hourly">Nach Stunden</SelectItem>
            <SelectItem value="flatRate">Pauschale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {position.billingType === 'objectValue' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Gegenstandswert (€)</Label>
            <Input
              type="number"
              value={position.objectValue || ''}
              onChange={(e) => onUpdate('objectValue', parseFloat(e.target.value) || 0)}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label>Gebührentabelle</Label>
            <Select
              value={position.feeTable}
              onValueChange={(value) => onUpdate('feeTable', value)}
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
      )}

      {position.billingType === 'hourly' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Stundensatz (€)</Label>
            <Input
              type="number"
              value={position.hourlyRate || ''}
              onChange={(e) => onUpdate('hourlyRate', parseFloat(e.target.value) || 0)}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label>Anzahl Stunden</Label>
            <Input
              type="number"
              value={position.hours || ''}
              onChange={(e) => onUpdate('hours', parseFloat(e.target.value) || 0)}
              placeholder="0"
              min="0"
              step="0.25"
            />
          </div>
        </div>
      )}

      {position.billingType === 'flatRate' && (
        <div className="space-y-2">
          <Label>Pauschalbetrag (€)</Label>
          <Input
            type="number"
            value={position.flatRate || ''}
            onChange={(e) => onUpdate('flatRate', parseFloat(e.target.value) || 0)}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>
      )}
    </div>
  );
};

export default BillingTypeSelector;
