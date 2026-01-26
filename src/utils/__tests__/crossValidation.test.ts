/**
 * Cross-Validation Tests
 * Vergleicht stbvvCalculator.ts mit CalculatorService.ts
 * @module utils/__tests__/crossValidation.test
 */

import { describe, it, expect } from 'vitest';
import { calculatePosition, calculateTotal } from '../stbvvCalculator';
import { calculatorService } from '@/services/CalculatorService';
import { Position } from '@/types/stbvv';

const createTestPosition = (overrides: Partial<Position> = {}): Position => ({
  id: 'test',
  activity: 'Test',
  description: '',
  objectValue: 10000,
  tenthRate: { numerator: 6, denominator: 10 },
  quantity: 1,
  feeTable: 'A',
  applyExpenseFee: true,
  billingType: 'objectValue',
  hourlyRate: 0,
  hours: 0,
  flatRate: 0,
  ...overrides,
});

/**
 * Vergleicht zwei Werte mit einer Toleranz für Cent-Rundungen
 * Der stbvvCalculator verwendet Cent-basierte Integer-Arithmetik,
 * während CalculatorService Floating-Point verwendet.
 */
const expectCloseValues = (
  calculated: number,
  service: number,
  tolerance = 0.01,
  label = ''
) => {
  const diff = Math.abs(calculated - service);
  expect(
    diff <= tolerance,
    `${label}: stbvvCalculator=${calculated}, CalculatorService=${service}, Diff=${diff}`
  ).toBe(true);
};

describe('Cross-Validation: stbvvCalculator vs CalculatorService', () => {
  describe('Einzelposition-Vergleich', () => {
    it('Gegenstandswert-Abrechnung stimmt überein', () => {
      const position = createTestPosition({
        objectValue: 50000,
        tenthRate: { numerator: 6, denominator: 10 },
        applyExpenseFee: true,
      });

      const calcResult = calculatePosition(position);
      const serviceResult = calculatorService.calculatePosition(position);

      expectCloseValues(calcResult.baseFee, serviceResult.baseFee, 0.01, 'baseFee');
      expectCloseValues(calcResult.adjustedFee, serviceResult.adjustedFee, 0.01, 'adjustedFee');
      expectCloseValues(calcResult.expenseFee, serviceResult.expenseFee, 0.01, 'expenseFee');
      expectCloseValues(calcResult.totalNet, serviceResult.totalNet, 0.01, 'totalNet');
    });

    it('Stunden-Abrechnung stimmt überein', () => {
      const position = createTestPosition({
        billingType: 'hourly',
        hourlyRate: 115,
        hours: 2.5,
        applyExpenseFee: true,
      });

      const calcResult = calculatePosition(position);
      const serviceResult = calculatorService.calculatePosition(position);

      expectCloseValues(calcResult.baseFee, serviceResult.baseFee, 0.01, 'baseFee');
      expectCloseValues(calcResult.adjustedFee, serviceResult.adjustedFee, 0.01, 'adjustedFee');
      expectCloseValues(calcResult.expenseFee, serviceResult.expenseFee, 0.01, 'expenseFee');
      expectCloseValues(calcResult.totalNet, serviceResult.totalNet, 0.01, 'totalNet');
    });

    it('Pauschal-Abrechnung stimmt überein', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 750,
        applyExpenseFee: false,
      });

      const calcResult = calculatePosition(position);
      const serviceResult = calculatorService.calculatePosition(position);

      expect(calcResult.baseFee).toBe(serviceResult.baseFee);
      expect(calcResult.adjustedFee).toBe(serviceResult.adjustedFee);
      expect(calcResult.expenseFee).toBe(serviceResult.expenseFee);
      expect(calcResult.totalNet).toBe(serviceResult.totalNet);
    });

    it('Zwanzigstelsatz stimmt überein', () => {
      const position = createTestPosition({
        objectValue: 30000,
        tenthRate: { numerator: 6.5, denominator: 20 },
        applyExpenseFee: true,
      });

      const calcResult = calculatePosition(position);
      const serviceResult = calculatorService.calculatePosition(position);

      expectCloseValues(calcResult.baseFee, serviceResult.baseFee, 0.01, 'baseFee');
      expectCloseValues(calcResult.adjustedFee, serviceResult.adjustedFee, 0.02, 'adjustedFee');
      expectCloseValues(calcResult.expenseFee, serviceResult.expenseFee, 0.01, 'expenseFee');
      expectCloseValues(calcResult.totalNet, serviceResult.totalNet, 0.02, 'totalNet');
    });
  });

  describe('Gesamtsummen-Vergleich', () => {
    it('Einfache Summe stimmt überein', () => {
      const positions = [
        createTestPosition({
          id: '1',
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
        createTestPosition({
          id: '2',
          billingType: 'flatRate',
          flatRate: 200,
          applyExpenseFee: false,
        }),
      ];

      const calcResult = calculateTotal(positions, 0, false);
      const serviceResult = calculatorService.calculateTotal(positions, 0, false);

      expect(calcResult.positionsTotal).toBe(serviceResult.positionsTotal);
      expect(calcResult.subtotalNet).toBe(serviceResult.subtotalNet);
      expect(calcResult.totalGross).toBe(serviceResult.totalGross);
    });

    it('Mit MwSt. stimmt überein', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const calcResult = calculateTotal(positions, 0, true);
      const serviceResult = calculatorService.calculateTotal(positions, 0, true);

      expectCloseValues(calcResult.vatAmount, serviceResult.vatAmount, 0.01, 'vatAmount');
      expectCloseValues(calcResult.totalGross, serviceResult.totalGross, 0.01, 'totalGross');
    });

    it('Mit Dokumentenpauschale stimmt überein', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const calcResult = calculateTotal(positions, 12.50, true);
      const serviceResult = calculatorService.calculateTotal(positions, 12.50, true);

      expect(calcResult.documentFee).toBe(serviceResult.documentFee);
      expectCloseValues(calcResult.subtotalNet, serviceResult.subtotalNet, 0.01, 'subtotalNet');
    });

    it('Mit Prozent-Rabatt stimmt überein', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 500,
          applyExpenseFee: false,
        }),
      ];

      const discount = { type: 'percentage' as const, value: 10 };
      const calcResult = calculateTotal(positions, 0, true, discount);
      const serviceResult = calculatorService.calculateTotal(positions, 0, true, discount);

      expectCloseValues(calcResult.discountAmount, serviceResult.discountAmount, 0.01, 'discountAmount');
      expectCloseValues(calcResult.subtotalNet, serviceResult.subtotalNet, 0.01, 'subtotalNet');
      expectCloseValues(calcResult.vatAmount, serviceResult.vatAmount, 0.01, 'vatAmount');
    });

    it('Mit Festbetrag-Rabatt stimmt überein', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 500,
          applyExpenseFee: false,
        }),
      ];

      const discount = { type: 'fixed' as const, value: 50 };
      const calcResult = calculateTotal(positions, 0, true, discount);
      const serviceResult = calculatorService.calculateTotal(positions, 0, true, discount);

      expect(calcResult.discountAmount).toBe(serviceResult.discountAmount);
      expect(calcResult.subtotalNet).toBe(serviceResult.subtotalNet);
    });

    it('Mit Quantity-Multiplikator stimmt überein', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 50,
          quantity: 12,
          applyExpenseFee: false,
        }),
      ];

      const calcResult = calculateTotal(positions, 0, false);
      const serviceResult = calculatorService.calculateTotal(positions, 0, false);

      expect(calcResult.positionsTotal).toBe(serviceResult.positionsTotal);
      expect(calcResult.positionsTotal).toBe(600);
    });
  });

  describe('Komplexe Szenarien', () => {
    it('Gemischte Positionen stimmen überein', () => {
      const positions = [
        createTestPosition({
          id: '1',
          objectValue: 75000,
          tenthRate: { numerator: 6, denominator: 10 },
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '2',
          billingType: 'hourly',
          hourlyRate: 115,
          hours: 3,
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '3',
          billingType: 'flatRate',
          flatRate: 250,
          quantity: 6,
          applyExpenseFee: false,
        }),
      ];

      const discount = { type: 'percentage' as const, value: 5 };
      const calcResult = calculateTotal(positions, 15, true, discount);
      const serviceResult = calculatorService.calculateTotal(positions, 15, true, discount);

      // Bei komplexen Szenarien mit Floating-Point-Operationen
      // erlauben wir etwas größere Toleranzen (max 0.05€)
      expectCloseValues(calcResult.positionsTotal, serviceResult.positionsTotal, 0.05, 'positionsTotal');
      expectCloseValues(calcResult.discountAmount, serviceResult.discountAmount, 0.05, 'discountAmount');
      expectCloseValues(calcResult.subtotalNet, serviceResult.subtotalNet, 0.05, 'subtotalNet');
      expectCloseValues(calcResult.vatAmount, serviceResult.vatAmount, 0.05, 'vatAmount');
      expectCloseValues(calcResult.totalGross, serviceResult.totalGross, 0.1, 'totalGross');
    });

    it('Volle GmbH-Rechnung stimmt überein', () => {
      const objectValue = 250000;
      const positions = [
        createTestPosition({
          id: '1',
          activity: 'Jahresabschluss',
          objectValue,
          feeTable: 'B',
          tenthRate: { numerator: 30, denominator: 10 },
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '2',
          activity: 'Körperschaftsteuer',
          objectValue,
          feeTable: 'A',
          tenthRate: { numerator: 6, denominator: 10 },
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '3',
          activity: 'Gewerbesteuer',
          objectValue,
          feeTable: 'A',
          tenthRate: { numerator: 6, denominator: 10 },
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '4',
          activity: 'Umsatzsteuer',
          objectValue,
          feeTable: 'A',
          tenthRate: { numerator: 6, denominator: 10 },
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '5',
          activity: 'Prüfung Bescheide',
          billingType: 'hourly',
          hourlyRate: 115,
          hours: 1.5,
          applyExpenseFee: true,
        }),
      ];

      const calcResult = calculateTotal(positions, 12, true);
      const serviceResult = calculatorService.calculateTotal(positions, 12, true);

      // Gesamtsumme sollte im Cent-Bereich übereinstimmen
      expectCloseValues(calcResult.totalGross, serviceResult.totalGross, 0.1, 'totalGross');
    });
  });

  describe('Randfälle', () => {
    it('Leere Positionsliste', () => {
      const calcResult = calculateTotal([], 12, true);
      const serviceResult = calculatorService.calculateTotal([], 12, true);

      expect(calcResult.positionsTotal).toBe(serviceResult.positionsTotal);
      expect(calcResult.documentFee).toBe(serviceResult.documentFee);
      expectCloseValues(calcResult.vatAmount, serviceResult.vatAmount, 0.01, 'vatAmount');
    });

    it('Position mit 0 Gegenstandswert', () => {
      const position = createTestPosition({ objectValue: 0 });

      const calcResult = calculatePosition(position);
      const serviceResult = calculatorService.calculatePosition(position);

      expect(calcResult.baseFee).toBe(serviceResult.baseFee);
      expect(calcResult.totalNet).toBe(serviceResult.totalNet);
    });

    it('Auslagenpauschale-Obergrenze', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 1000,
        applyExpenseFee: true,
      });

      const calcResult = calculatePosition(position);
      const serviceResult = calculatorService.calculatePosition(position);

      // Beide sollten 20€ Maximum anwenden
      expect(calcResult.expenseFee).toBe(20);
      expect(serviceResult.expenseFee).toBe(20);
    });
  });
});
