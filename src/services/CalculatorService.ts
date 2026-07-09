/**
 * Calculator Service für StBVV-Berechnungen
 *
 * Thin OOP-Wrapper um die zentrale, Cent-basierte Berechnungs-Engine in
 * `@/utils/stbvvCalculator`. Es gibt genau EINE Quelle der Wahrheit für die
 * Gebührenberechnung. Dieser Service stellt lediglich eine klassenbasierte
 * Fassade sowie Validierungs-Helper bereit.
 *
 * @module services/CalculatorService
 */

import { Position, CalculationResult, Discount } from '@/types/stbvv';
import {
  calculatePosition as calcPosition,
  calculateTotal as calcTotal,
} from '@/utils/stbvvCalculator';

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
 * Service-Klasse für alle Berechnungen.
 *
 * Delegiert an die Cent-basierte Engine, um Floating-Point-Fehler zu vermeiden.
 */
export class CalculatorService {
  /**
   * Berechnet eine einzelne Position (delegiert an Cent-Engine).
   */
  calculatePosition(position: Position): CalculationResult {
    return calcPosition(position);
  }

  /**
   * Berechnet die Gesamtsumme aller Positionen (delegiert an Cent-Engine).
   */
  calculateTotal(
    positions: Position[],
    documentFee: number,
    includeVAT: boolean,
    discount?: Discount | null
  ): TotalCalculationResult {
    return calcTotal(positions, documentFee, includeVAT, discount);
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
