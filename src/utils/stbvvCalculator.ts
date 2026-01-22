/**
 * StBVV-Rechner mit Cent-basierter Integer-Arithmetik
 * @module utils/stbvvCalculator
 * 
 * Alle Berechnungen erfolgen intern in Cent (Integer),
 * um Floating-Point-Rundungsfehler zu vermeiden.
 */

import { Position, CalculationResult } from "@/types/stbvv";
import { getFeeTables } from "./stbvvTables";
import { VAT_RATE, EXPENSE_FEE_RATE, EXPENSE_FEE_MAX } from "@/constants";
import {
  euroToCent,
  centToEuro,
  applyRate,
  percentOfCent,
  minCent,
  sumCent,
  sanitizeEuro,
  type CentCalculationResult,
  type CentTotalResult,
} from "./centArithmetic";

// Konstanten in Cent
const EXPENSE_FEE_MAX_CENT = euroToCent(EXPENSE_FEE_MAX); // 2000 Cent = 20€
const EXPENSE_FEE_RATE_PERCENT = EXPENSE_FEE_RATE * 100;  // 20%
const VAT_RATE_PERCENT = VAT_RATE * 100;                   // 19%

/**
 * Berechnet eine einzelne Position intern in Cent
 */
const calculatePositionCent = (position: Position): CentCalculationResult => {
  let baseFeeCent = 0;
  let adjustedFeeCent = 0;

  switch (position.billingType) {
    case 'hourly': {
      const hourlyRateCent = euroToCent(sanitizeEuro(position.hourlyRate));
      const hours = sanitizeEuro(position.hours);
      // Stunden können Dezimalwerte sein, daher Multiplikation und Rundung
      adjustedFeeCent = Math.round(hourlyRateCent * hours);
      baseFeeCent = adjustedFeeCent;
      break;
    }
      
    case 'flatRate': {
      adjustedFeeCent = euroToCent(sanitizeEuro(position.flatRate));
      baseFeeCent = adjustedFeeCent;
      break;
    }
      
    case 'objectValue':
    default: {
      const objectValue = sanitizeEuro(position.objectValue);
      if (objectValue <= 0) {
        return {
          baseFeeCent: 0,
          adjustedFeeCent: 0,
          expenseFeeCent: 0,
          totalNetCent: 0,
        };
      }

      const feeTables = getFeeTables();
      const table = feeTables[position.feeTable];
      
      // Finde passenden Tabelleneintrag
      const tableEntry = table.find(entry => 
        objectValue >= entry.minValue && 
        objectValue < entry.maxValue
      );
      
      // Tabellengebühr ist bereits in Euro, konvertiere zu Cent
      const tableFeeEuro = tableEntry ? tableEntry.fee : table[table.length - 1].fee;
      baseFeeCent = euroToCent(tableFeeEuro);
      
      // Wende Zehntel-/Zwanzigstelsatz an
      adjustedFeeCent = applyRate(
        baseFeeCent,
        position.tenthRate.numerator,
        position.tenthRate.denominator
      );
      break;
    }
  }
  
  // Berechne Auslagenpauschale (20% der Gebühr, max. 20€)
  let expenseFeeCent = 0;
  if (position.applyExpenseFee) {
    const calculatedExpense = percentOfCent(adjustedFeeCent, EXPENSE_FEE_RATE_PERCENT);
    expenseFeeCent = minCent(calculatedExpense, EXPENSE_FEE_MAX_CENT);
  }
  
  const totalNetCent = adjustedFeeCent + expenseFeeCent;

  return {
    baseFeeCent,
    adjustedFeeCent,
    expenseFeeCent,
    totalNetCent,
  };
};

/**
 * Berechnet eine einzelne Position und gibt Euro-Werte zurück
 * (Rückwärtskompatible API)
 */
export const calculatePosition = (position: Position): CalculationResult => {
  const centResult = calculatePositionCent(position);
  
  return {
    baseFee: centToEuro(centResult.baseFeeCent),
    adjustedFee: centToEuro(centResult.adjustedFeeCent),
    expenseFee: centToEuro(centResult.expenseFeeCent),
    totalNet: centToEuro(centResult.totalNetCent),
  };
};

/**
 * Berechnet die Gesamtsumme intern in Cent
 */
const calculateTotalCent = (
  positions: Position[], 
  documentFee: number, 
  includeVAT: boolean,
  discount?: { type: 'percentage' | 'fixed'; value: number } | null
): CentTotalResult => {
  // Summiere alle Positionen (mit Quantity-Multiplikator)
  const positionTotals = positions.map(position => {
    const calculation = calculatePositionCent(position);
    const quantity = Math.max(1, Math.round(position.quantity || 1));
    return calculation.totalNetCent * quantity;
  });
  
  const positionsTotalCent = sumCent(positionTotals);
  const documentFeeCent = euroToCent(sanitizeEuro(documentFee));
  
  const subtotalBeforeDiscountCent = positionsTotalCent + documentFeeCent;
  
  // Berechne Rabatt
  let discountAmountCent = 0;
  if (discount && discount.value > 0) {
    if (discount.type === 'percentage') {
      discountAmountCent = percentOfCent(subtotalBeforeDiscountCent, discount.value);
    } else {
      discountAmountCent = euroToCent(discount.value);
    }
    // Rabatt kann nicht größer als Zwischensumme sein
    discountAmountCent = minCent(discountAmountCent, subtotalBeforeDiscountCent);
  }

  const subtotalNetCent = subtotalBeforeDiscountCent - discountAmountCent;
  
  // Berechne MwSt.
  const vatAmountCent = includeVAT ? percentOfCent(subtotalNetCent, VAT_RATE_PERCENT) : 0;
  
  const totalGrossCent = subtotalNetCent + vatAmountCent;

  return {
    positionsTotalCent,
    documentFeeCent,
    discountAmountCent,
    subtotalNetCent,
    vatAmountCent,
    totalGrossCent,
  };
};

/**
 * Berechnet die Gesamtsumme und gibt Euro-Werte zurück
 * (Rückwärtskompatible API)
 */
export const calculateTotal = (
  positions: Position[], 
  documentFee: number, 
  includeVAT: boolean,
  discount?: { type: 'percentage' | 'fixed'; value: number } | null
) => {
  const centResult = calculateTotalCent(positions, documentFee, includeVAT, discount);
  
  return {
    positionsTotal: centToEuro(centResult.positionsTotalCent),
    documentFee: centToEuro(centResult.documentFeeCent),
    discountAmount: centToEuro(centResult.discountAmountCent),
    subtotalNet: centToEuro(centResult.subtotalNetCent),
    vatAmount: centToEuro(centResult.vatAmountCent),
    totalGross: centToEuro(centResult.totalGrossCent),
  };
};

/**
 * Berechnet die Gesamtsumme und gibt Cent-Werte zurück
 * (Für präzise interne Verarbeitung)
 */
export const calculateTotalInCent = calculateTotalCent;

/**
 * Berechnet eine Position und gibt Cent-Werte zurück
 * (Für präzise interne Verarbeitung)
 */
export const calculatePositionInCent = calculatePositionCent;
