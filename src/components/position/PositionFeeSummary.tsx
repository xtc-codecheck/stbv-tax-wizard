/**
 * PositionFeeSummary - Reine Darstellung der Positionsberechnung
 * @module components/position/PositionFeeSummary
 */

import { memo } from 'react';
import { Scale } from 'lucide-react';
import { CalculationResult } from '@/types/stbvv';
import { formatCurrency } from '@/lib/utils';

interface PositionLegalBasisProps {
  legalBasis: string;
}

function PositionLegalBasisComponent({ legalBasis }: PositionLegalBasisProps) {
  return (
    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center text-sm text-blue-700">
        <Scale className="w-4 h-4 mr-2" />
        <span className="font-medium">Rechtsgrundlage:</span>
        <span className="ml-2">{legalBasis} StBVV</span>
      </div>
    </div>
  );
}

export const PositionLegalBasis = memo(PositionLegalBasisComponent);
PositionLegalBasis.displayName = 'PositionLegalBasis';

interface PositionFeeSummaryProps {
  calculation: CalculationResult;
  quantity: number;
}

function PositionFeeSummaryComponent({ calculation, quantity }: PositionFeeSummaryProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h4 className="font-semibold text-gray-800 mb-2">Berechnung:</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Gebühr:</span>
          <span>{formatCurrency(calculation.adjustedFee)}</span>
        </div>
        {calculation.expenseFee > 0 && (
          <div className="flex justify-between">
            <span>Auslagenpauschale:</span>
            <span>{formatCurrency(calculation.expenseFee)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold pt-1 border-t">
          <span>Gesamt (× {quantity}):</span>
          <span>{formatCurrency(calculation.totalNet)}</span>
        </div>
      </div>
    </div>
  );
}

export const PositionFeeSummary = memo(PositionFeeSummaryComponent);
PositionFeeSummary.displayName = 'PositionFeeSummary';
