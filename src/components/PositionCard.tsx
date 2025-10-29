import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Combobox } from "@/components/ui/combobox";
import { Trash2, Calculator, AlertTriangle, AlertCircle, CheckCircle2, Scale, ArrowUp, ArrowDown, ChevronDown, Copy, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Position } from "@/types/stbvv";
import { calculatePosition } from "@/utils/stbvvCalculator";
import { activityPresets, getActivityPreset } from "@/utils/activityPresets";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDebounce } from "@/hooks/useDebounce";
import { updateSmartDefaults, addRecentActivity } from '@/utils/smartDefaults';
import { cn } from '@/lib/utils';

interface PositionCardProps {
  position: Position;
  index: number;
  onUpdate: (id: string, position: Position) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMove: (id: string, direction: 'up' | 'down') => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelectionChange?: (id: string, selected: boolean) => void;
}

const PositionCard: React.FC<PositionCardProps> = ({
  position,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
  canMoveUp,
  canMoveDown,
  onMove,
  isSelectable = false,
  isSelected = false,
  onSelectionChange
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Local state for debounced inputs
  const [localObjectValue, setLocalObjectValue] = useState(position.objectValue);
  const [localHourlyRate, setLocalHourlyRate] = useState(position.hourlyRate || 0);
  const [localHours, setLocalHours] = useState(position.hours || 0);
  const [localFlatRate, setLocalFlatRate] = useState(position.flatRate || 0);
  
  // Validation states
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Debounce numeric inputs for better performance
  const debouncedObjectValue = useDebounce(localObjectValue, 300);
  const debouncedHourlyRate = useDebounce(localHourlyRate, 300);
  const debouncedHours = useDebounce(localHours, 300);
  const debouncedFlatRate = useDebounce(localFlatRate, 300);
  
  // Update parent when debounced values change
  useEffect(() => {
    if (debouncedObjectValue !== position.objectValue) {
      handleChange('objectValue', debouncedObjectValue);
    }
  }, [debouncedObjectValue]);
  
  useEffect(() => {
    if (debouncedHourlyRate !== position.hourlyRate) {
      handleChange('hourlyRate', debouncedHourlyRate);
    }
  }, [debouncedHourlyRate]);
  
  useEffect(() => {
    if (debouncedHours !== position.hours) {
      handleChange('hours', debouncedHours);
    }
  }, [debouncedHours]);
  
  useEffect(() => {
    if (debouncedFlatRate !== position.flatRate) {
      handleChange('flatRate', debouncedFlatRate);
    }
  }, [debouncedFlatRate]);
  
  // Sync local state when position changes from external source
  useEffect(() => {
    setLocalObjectValue(position.objectValue);
  }, [position.objectValue]);
  
  useEffect(() => {
    setLocalHourlyRate(position.hourlyRate || 0);
  }, [position.hourlyRate]);
  
  useEffect(() => {
    setLocalHours(position.hours || 0);
  }, [position.hours]);
  
  useEffect(() => {
    setLocalFlatRate(position.flatRate || 0);
  }, [position.flatRate]);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: position.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms ease',
  };
  
  // Memoize calculation to prevent unnecessary recalculations
  const calculation = React.useMemo(() => calculatePosition(position), [position]);
  const preset = React.useMemo(() => getActivityPreset(position.activity), [position.activity]);

  // Validation helper
  const validateField = (field: string, value: any): string | null => {
    switch (field) {
      case 'activity':
        return !value ? 'Bitte wählen Sie eine Tätigkeit aus' : null;
      case 'objectValue':
        return position.billingType === 'objectValue' && (!value || value <= 0) 
          ? 'Gegenstandswert muss größer als 0 sein' : null;
      case 'hourlyRate':
        return position.billingType === 'hourly' && (!value || value <= 0)
          ? 'Stundensatz muss größer als 0 sein' : null;
      case 'hours':
        return position.billingType === 'hourly' && (!value || value <= 0)
          ? 'Stunden müssen größer als 0 sein' : null;
      case 'flatRate':
        return position.billingType === 'flatRate' && (!value || value <= 0)
          ? 'Pauschalbetrag muss größer als 0 sein' : null;
      default:
        return null;
    }
  };

  const handleChange = (field: keyof Position, value: any) => {
    onUpdate(position.id, { ...position, [field]: value });
  };

  const handleActivityChange = (activity: string) => {
    const preset = getActivityPreset(activity);
    
    // Save to smart defaults
    addRecentActivity(activity);
    
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
    } else if (activity === 'Lohnabrechnung pro Arbeitnehmer (monatlich)') {
      updatedPosition = {
        ...updatedPosition,
        billingType: 'flatRate',
        flatRate: 15
      };
    } else if (
      activity.startsWith('Beratung') || 
      activity === 'Schriftliche Gutachten' ||
      activity === 'Steuerschätzung' ||
      activity === 'Fristverlängerung beantragen' ||
      activity === 'Bescheinigungen ausstellen' ||
      activity === 'Betriebswirtschaftliche Beratung' ||
      activity === 'Finanzplanung und Liquiditätsplanung'
    ) {
      updatedPosition = {
        ...updatedPosition,
        billingType: 'hourly',
        hourlyRate: preset?.defaultTenthRate || 100,
        hours: 1
      };
    }

    onUpdate(position.id, updatedPosition);

    // Clear validation error for activity
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.activity;
      return newErrors;
    });
  };

  const handleTenthRateChange = (numerator: string) => {
    const num = parseFloat(numerator) || 1;
    const denominator = preset?.rateType === 'twentieth' ? 20 : 10;
    onUpdate(position.id, {
      ...position,
      tenthRate: { numerator: num, denominator }
    });
  };

  // Smart defaults: Save hourly rate when changed
  const handleHourlyRateChange = (value: number) => {
    setLocalHourlyRate(value);
    if (value > 0) {
      updateSmartDefaults({ lastHourlyRate: value });
    }
    // Validate
    const error = validateField('hourlyRate', value);
    setValidationErrors(prev => error ? { ...prev, hourlyRate: error } : { ...prev, hourlyRate: '' });
  };

  const handleFieldChange = (field: string, value: any) => {
    const error = validateField(field, value);
    setValidationErrors(prev => error ? { ...prev, [field]: error } : { ...prev, [field]: '' });
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

  // Check if position is complete
  const isComplete = position.activity && canCalculate();
  const hasErrors = Object.values(validationErrors).some(err => err);

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={cn(
        "border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 animate-slide-in-up",
        isDragging && "drag-ghost",
        isOver && "drag-over",
        hasErrors && "ring-2 ring-destructive"
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {isSelectable && (
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelectionChange?.(position.id, checked as boolean)}
                className="mr-2"
                aria-label="Position auswählen"
              />
            )}
            <button
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Position per Drag & Drop verschieben"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-6 h-6" />
            </button>
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>Position {index}</span>
            {canCalculate() && (
              <Badge 
                variant="outline" 
                className="ml-2 animate-pop-number bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 text-blue-700 font-semibold"
              >
                {calculation.totalNet.toFixed(2)} €
              </Badge>
            )}
            {isComplete && !hasErrors && (
              <Badge variant="default" className="bg-green-600 flex items-center gap-1 ml-2">
                <CheckCircle2 className="w-3 h-3" />
                Vollständig
              </Badge>
            )}
            {hasErrors && (
              <Badge variant="destructive" className="flex items-center gap-1 ml-2">
                <AlertCircle className="w-3 h-3" />
                Unvollständig
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {/* Duplicate Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDuplicate(position.id)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 min-h-[44px] min-w-[44px]"
              title="Position duplizieren"
              aria-label="Position duplizieren"
            >
              <Copy className="w-5 h-5" />
            </Button>
            {/* Move Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(position.id, 'up')}
              disabled={!canMoveUp}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-30 min-h-[44px] min-w-[44px]"
              aria-label="Position nach oben verschieben"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMove(position.id, 'down')}
              disabled={!canMoveDown}
              className="text-gray-500 hover:text-gray-700 disabled:opacity-30 min-h-[44px] min-w-[44px]"
              aria-label="Position nach unten verschieben"
            >
              <ArrowDown className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(position.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 min-h-[44px] min-w-[44px]"
              aria-label="Position löschen"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Activity */}
        <div className="space-y-2">
          <Label>Tätigkeit *</Label>
          <div className="relative">
            <Combobox
              options={activityPresets.map((preset) => ({
                value: preset.activity,
                label: preset.activity,
                category: preset.category,
                keywords: preset.searchKeywords,
              }))}
              value={position.activity}
              onValueChange={handleActivityChange}
              placeholder="Tätigkeit auswählen..."
              emptyText="Keine Tätigkeit gefunden."
              searchPlaceholder="Tätigkeit suchen..."
            />
            {validationErrors.activity && (
              <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {validationErrors.activity}
              </p>
            )}
          </div>
        </div>

        {/* Billing Type */}
        <div className="space-y-2">
          <Label>Abrechnungsart</Label>
          <Select
            value={position.billingType}
            onValueChange={(value) => handleChange('billingType', value)}
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

        {/* Value and Quantity side by side */}
        <div className="grid grid-cols-2 gap-4">
          {position.billingType === 'objectValue' && (
            <div className="space-y-2">
              <Label>Gegenstandswert (€) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={localObjectValue === 0 ? '' : localObjectValue}
                  onChange={(e) => {
                    const value = Math.max(0, parseFloat(e.target.value) || 0);
                    setLocalObjectValue(value);
                    handleFieldChange('objectValue', value);
                  }}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={cn(validationErrors.objectValue && "validation-error")}
                />
                {validationErrors.objectValue && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors.objectValue}
                  </p>
                )}
              </div>
            </div>
          )}
          {position.billingType === 'hourly' && (
            <div className="space-y-2">
              <Label>Stundensatz (€) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={localHourlyRate === 0 ? '' : localHourlyRate}
                  onChange={(e) => {
                    const value = Math.max(0, parseFloat(e.target.value) || 0);
                    handleHourlyRateChange(value);
                  }}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={cn(validationErrors.hourlyRate && "validation-error")}
                />
                {validationErrors.hourlyRate && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors.hourlyRate}
                  </p>
                )}
              </div>
            </div>
          )}
          {position.billingType === 'flatRate' && (
            <div className="space-y-2">
              <Label>Pauschalbetrag (€) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={localFlatRate === 0 ? '' : localFlatRate}
                  onChange={(e) => {
                    const value = Math.max(0, parseFloat(e.target.value) || 0);
                    setLocalFlatRate(value);
                    handleFieldChange('flatRate', value);
                  }}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  className={cn(validationErrors.flatRate && "validation-error")}
                />
                {validationErrors.flatRate && (
                  <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {validationErrors.flatRate}
                  </p>
                )}
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

        {/* Collapsible Section for Details */}
        <Collapsible 
          open={isOpen} 
          onOpenChange={setIsOpen}
          defaultOpen={typeof window !== 'undefined' && window.innerWidth >= 768}
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between"
            >
              <span>Details & Berechnung</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
              />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 mt-4">
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

            {/* Fee Table and Rate for objectValue billing */}
            {position.billingType === 'objectValue' && (
              <>
                <div className="space-y-2">
                  <Label>Gebührentabelle</Label>
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

                {preset && (
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
              </>
            )}

            {/* Hours for hourly billing */}
            {position.billingType === 'hourly' && (
              <div className="space-y-2">
                <Label>Anzahl Stunden *</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={localHours === 0 ? '' : localHours}
                    onChange={(e) => {
                      const value = Math.max(0, parseFloat(e.target.value) || 0);
                      setLocalHours(value);
                      handleFieldChange('hours', value);
                    }}
                    placeholder="0"
                    min="0"
                    step="0.25"
                    className={cn(validationErrors.hours && "validation-error")}
                  />
                  {validationErrors.hours && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {validationErrors.hours}
                    </p>
                  )}
                </div>
              </div>
            )}

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
              <div className="p-4 bg-gray-50 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-2">Berechnung:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Gebühr:</span>
                    <span>{calculation.adjustedFee.toFixed(2)} €</span>
                  </div>
                  {calculation.expenseFee > 0 && (
                    <div className="flex justify-between">
                      <span>Auslagenpauschale:</span>
                      <span>{calculation.expenseFee.toFixed(2)} €</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-1 border-t">
                    <span>Gesamt (× {position.quantity}):</span>
                    <span>{calculation.totalNet.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default PositionCard;
