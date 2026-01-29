/**
 * Wizard Step 3: Werte eingeben
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Position } from '@/types/stbvv';
import { calculateTotal, calculatePosition } from '@/utils/stbvvCalculator';
import { ArrowLeft, ArrowRight, Calculator, Euro, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCurrency } from '@/lib/utils';

interface WizardStepValuesProps {
  positions: Position[];
  documentFee: number;
  includeVAT: boolean;
  // CHANGED: Now accepts a patch (Partial<Position>) instead of full Position
  onUpdatePosition: (id: string, patch: Partial<Position>) => void;
  onUpdateDocumentFee: (fee: number) => void;
  onBack: () => void;
  onNext: () => void;
}

export function WizardStepValues({
  positions,
  documentFee,
  includeVAT,
  onUpdatePosition,
  onUpdateDocumentFee,
  onBack,
  onNext,
}: WizardStepValuesProps) {
  const totals = calculateTotal(positions, documentFee, includeVAT);

  const handleObjectValueChange = (id: string, value: string) => {
    // Handle German number format: remove thousand separators (.), replace decimal comma with dot
    const cleanedValue = value.replace(/\./g, '').replace(',', '.');
    const numValue = parseFloat(cleanedValue) || 0;
    // Send as patch, not full object
    onUpdatePosition(id, { objectValue: numValue });
  };

  const hasAllValues = positions.every(p => 
    p.billingType !== 'objectValue' || p.objectValue > 0
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Gegenstandswerte eingeben</h2>
        <p className="text-muted-foreground mt-2">
          Geben Sie die Gegenstandswerte für jede Position ein
        </p>
      </div>

      {/* Positions List */}
      <ScrollArea className="h-[350px] pr-4">
        <div className="space-y-4">
          {positions.map((position, index) => {
            // Calculate position total for live preview
            const positionCalc = calculatePosition(position);
            const hasValue = position.billingType !== 'objectValue' || position.objectValue > 0;
            
            return (
              <Card key={position.id} className={hasValue ? 'border-primary/30' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {index + 1}
                        </Badge>
                        <p className="font-medium flex-1">{position.activity || 'Unbenannte Position'}</p>
                        {/* Live calculation badge */}
                        {hasValue && (
                          <Badge 
                            variant="default" 
                            className="bg-primary/10 text-primary border border-primary/20 font-semibold animate-in fade-in duration-200"
                          >
                            {formatCurrency(positionCalc.totalNet)}
                          </Badge>
                        )}
                      </div>
                      
                      {position.billingType === 'objectValue' && (
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[200px]">
                            <Label htmlFor={`value-${position.id}`} className="text-xs text-muted-foreground">
                              Gegenstandswert
                            </Label>
                            <div className="relative mt-1">
                              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id={`value-${position.id}`}
                                type="text"
                                inputMode="decimal"
                                placeholder="0,00"
                                value={position.objectValue > 0 ? position.objectValue.toLocaleString('de-DE') : ''}
                                onChange={(e) => handleObjectValueChange(position.id, e.target.value)}
                                className="pl-9"
                              />
                            </div>
                          </div>
                          
                          {/* Live calculation details */}
                          {position.objectValue > 0 && (
                            <div className="text-xs text-muted-foreground mt-5 hidden sm:block">
                              <span className="text-foreground/70">
                                Tab. {position.feeTable} × {position.tenthRate.numerator}/{position.tenthRate.denominator}
                              </span>
                            </div>
                          )}
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 mt-5">
                                <Info className="w-4 h-4 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-[200px] text-xs">
                                Tabelle {position.feeTable} • {position.tenthRate.numerator}/{position.tenthRate.denominator} Satz
                                {position.objectValue > 0 && (
                                  <><br />Gebühr: {formatCurrency(positionCalc.baseFee)}</>
                                )}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      )}

                      {position.billingType === 'hourly' && (
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Zeitgebühr</Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(position.hourlyRate || 0)}/Std × {position.hours} Std
                            </span>
                          </div>
                        </div>
                      )}

                      {position.billingType === 'flatRate' && (
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Pauschale</Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatCurrency(position.flatRate || 0)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>

      {/* Document Fee */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="documentFee">Dokumentenpauschale</Label>
              <p className="text-xs text-muted-foreground">Optional, wird zum Gesamtbetrag addiert</p>
            </div>
            <div className="w-32">
              <div className="relative">
                <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="documentFee"
                  type="number"
                  step="0.01"
                  min="0"
                  value={documentFee || ''}
                  onChange={(e) => onUpdateDocumentFee(parseFloat(e.target.value) || 0)}
                  className="pl-9"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Total Preview */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Voraussichtlicher Gesamtbetrag</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(totals.totalGross)}
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>Netto: {formatCurrency(totals.subtotalNet + documentFee)}</p>
              <p>MwSt.: {formatCurrency(totals.vatAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </Button>
        
        <Button 
          size="lg" 
          onClick={onNext}
          className="gap-2"
        >
          Weiter zum Export
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
