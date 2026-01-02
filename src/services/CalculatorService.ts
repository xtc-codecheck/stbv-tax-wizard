/**
 * Calculator Service für StBVV-Berechnungen
 * @module services/CalculatorService
 */

import { Position, CalculationResult, Discount } from '@/types/stbvv';
import { getFeeTables } from '@/utils/stbvvTables';
import { VAT_RATE, EXPENSE_FEE_RATE, EXPENSE_FEE_MAX } from '@/constants';

/**
 * Ergebnis der Gesamtberechnung
 */
export interface TotalCalculationResult {
  /** Summe aller Positionen */
  positionsTotal: number;
  /** Dokumentenpauschale */
  documentFee: number;
  /** Rabattbetrag */
  discountAmount: number;
  /** Zwischensumme netto */
  subtotalNet: number;
  /** MwSt.-Betrag */
  vatAmount: number;
  /** Gesamtsumme brutto */
  totalGross: number;
}

/**
 * Service-Klasse für alle Berechnungen
 */
export class CalculatorService {
  /**
   * Berechnet eine einzelne Position
   */
  calculatePosition(position: Position): CalculationResult {
    let baseFee = 0;
    let adjustedFee = 0;

    switch (position.billingType) {
      case 'hourly':
        adjustedFee = (position.hourlyRate || 0) * (position.hours || 0);
        baseFee = adjustedFee;
        break;

      case 'flatRate':
        adjustedFee = position.flatRate || 0;
        baseFee = adjustedFee;
        break;

      case 'objectValue':
      default:
        if (!position.objectValue || position.objectValue <= 0) {
          return {
            baseFee: 0,
            adjustedFee: 0,
            expenseFee: 0,
            totalNet: 0,
          };
        }

        const feeTables = getFeeTables();
        const table = feeTables[position.feeTable];

        // Finde den passenden Gebührensatz
        const tableEntry = table.find(
          (entry) =>
            position.objectValue >= entry.minValue &&
            position.objectValue < entry.maxValue
        );

        baseFee = tableEntry ? tableEntry.fee : table[table.length - 1].fee;

        // Wende den Zehntelsatz an
        adjustedFee =
          baseFee *
          (position.tenthRate.numerator / position.tenthRate.denominator);
        break;
    }

    // Berechne Auslagenpauschale
    const expenseFee = position.applyExpenseFee
      ? Math.min(adjustedFee * EXPENSE_FEE_RATE, EXPENSE_FEE_MAX)
      : 0;

    const totalNet = adjustedFee + expenseFee;

    return {
      baseFee,
      adjustedFee,
      expenseFee,
      totalNet,
    };
  }

  /**
   * Berechnet die Gesamtsumme aller Positionen
   */
  calculateTotal(
    positions: Position[],
    documentFee: number,
    includeVAT: boolean,
    discount?: Discount | null
  ): TotalCalculationResult {
    const positionsTotal = positions.reduce((total, position) => {
      const calculation = this.calculatePosition(position);
      return total + calculation.totalNet * position.quantity;
    }, 0);

    const subtotalBeforeDiscount = positionsTotal + documentFee;

    // Berechne Rabatt
    let discountAmount = 0;
    if (discount && discount.value > 0) {
      if (discount.type === 'percentage') {
        discountAmount = subtotalBeforeDiscount * (discount.value / 100);
      } else {
        discountAmount = discount.value;
      }
    }

    const subtotalNet = subtotalBeforeDiscount - discountAmount;
    const vatAmount = includeVAT ? subtotalNet * VAT_RATE : 0;
    const totalGross = subtotalNet + vatAmount;

    return {
      positionsTotal,
      documentFee,
      discountAmount,
      subtotalNet,
      vatAmount,
      totalGross,
    };
  }

  /**
   * Prüft, ob eine Position vollständig ist
   */
  isPositionComplete(position: Position): boolean {
    if (!position.activity) return false;

    switch (position.billingType) {
      case 'hourly':
        return (
          (position.hourlyRate ?? 0) > 0 && (position.hours ?? 0) > 0
        );
      case 'flatRate':
        return (position.flatRate ?? 0) > 0;
      case 'objectValue':
      default:
        return position.objectValue > 0;
    }
  }

  /**
   * Validiert alle Positionen
   */
  validatePositions(positions: Position[]): {
    isValid: boolean;
    errors: { index: number; message: string }[];
  } {
    const errors: { index: number; message: string }[] = [];

    positions.forEach((position, index) => {
      if (!position.activity) {
        errors.push({ index, message: 'Tätigkeit fehlt' });
      }

      switch (position.billingType) {
        case 'objectValue':
          if (!position.objectValue || position.objectValue <= 0) {
            errors.push({
              index,
              message: 'Gegenstandswert muss größer als 0 sein',
            });
          }
          break;
        case 'hourly':
          if (!position.hourlyRate || position.hourlyRate <= 0) {
            errors.push({
              index,
              message: 'Stundensatz muss größer als 0 sein',
            });
          }
          if (!position.hours || position.hours <= 0) {
            errors.push({ index, message: 'Stunden müssen größer als 0 sein' });
          }
          break;
        case 'flatRate':
          if (!position.flatRate || position.flatRate <= 0) {
            errors.push({
              index,
              message: 'Pauschalbetrag muss größer als 0 sein',
            });
          }
          break;
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Singleton-Instanz des Calculator Service
 */
export const calculatorService = new CalculatorService();
