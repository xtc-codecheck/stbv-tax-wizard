/**
 * Extreme Value Tests für StBVV-Calculator
 * Testet Grenzfälle und ungewöhnliche Eingaben
 * @module utils/__tests__/extremeValues.test
 */

import { describe, it, expect } from 'vitest';
import {
  calculatePosition,
  calculateTotal,
  calculatePositionInCent,
  calculateTotalInCent,
} from '../stbvvCalculator';
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

describe('Extreme Value Tests', () => {
  describe('Sehr hohe Gegenstandswerte', () => {
    it('handhabt 1 Million Euro', () => {
      const position = createTestPosition({
        objectValue: 1_000_000,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.baseFee).toBeGreaterThan(0);
      expect(calc.adjustedFee).toBeGreaterThan(0);
      expect(Number.isFinite(calc.totalNet)).toBe(true);
    });

    it('handhabt 10 Millionen Euro', () => {
      const position = createTestPosition({
        objectValue: 10_000_000,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.baseFee).toBeGreaterThan(0);
      expect(Number.isFinite(calc.totalNet)).toBe(true);
    });

    it('handhabt 50 Millionen Euro', () => {
      const position = createTestPosition({
        objectValue: 50_000_000,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.baseFee).toBeGreaterThan(0);
      expect(Number.isFinite(calc.totalNet)).toBe(true);
      // Sollte einen substantiellen Wert haben
      expect(calc.baseFee).toBeGreaterThan(1000);
    });

    it('handhabt 100 Millionen Euro (über Tabellenmaximum)', () => {
      const position = createTestPosition({
        objectValue: 100_000_000,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      // Sollte letzten Tabelleneintrag verwenden (nicht abstürzen)
      expect(calc.baseFee).toBeGreaterThan(0);
      expect(Number.isFinite(calc.totalNet)).toBe(true);
    });
  });

  describe('Sehr kleine Werte', () => {
    it('handhabt 0.01€ Pauschale', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 0.01,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.totalNet).toBe(0.01);
    });

    it('handhabt 0.01€ Stundensatz', () => {
      const position = createTestPosition({
        billingType: 'hourly',
        hourlyRate: 0.01,
        hours: 1,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.totalNet).toBe(0.01);
    });

    it('handhabt 0.1 Stunden', () => {
      const position = createTestPosition({
        billingType: 'hourly',
        hourlyRate: 100,
        hours: 0.1,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.totalNet).toBe(10);
    });
  });

  describe('Extreme Mengen', () => {
    it('handhabt Quantity 100', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 50,
        quantity: 100,
        applyExpenseFee: false,
      });

      const total = calculateTotal([position], 0, false);

      expect(total.positionsTotal).toBe(5000);
    });

    it('handhabt Quantity 999 (Maximum)', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 10,
        quantity: 999,
        applyExpenseFee: false,
      });

      const total = calculateTotal([position], 0, false);

      expect(total.positionsTotal).toBe(9990);
    });
  });

  describe('Viele Positionen', () => {
    it('handhabt 50 Positionen', () => {
      const positions = Array.from({ length: 50 }, (_, i) =>
        createTestPosition({
          id: `pos-${i}`,
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        })
      );

      const total = calculateTotal(positions, 0, false);

      expect(total.positionsTotal).toBe(5000);
      expect(Number.isFinite(total.totalGross)).toBe(true);
    });

    it('handhabt 100 Positionen', () => {
      const positions = Array.from({ length: 100 }, (_, i) =>
        createTestPosition({
          id: `pos-${i}`,
          billingType: 'flatRate',
          flatRate: 50,
          applyExpenseFee: true,
        })
      );

      const total = calculateTotal(positions, 12, true);

      // 100 × (50 + 10 Auslagen) = 6000 + 12 Dokumentenpauschale
      expect(total.positionsTotal).toBe(6000);
      expect(total.subtotalNet).toBe(6012);
      expect(Number.isFinite(total.totalGross)).toBe(true);
    });

    it('handhabt 200 gemischte Positionen', () => {
      const positions = Array.from({ length: 200 }, (_, i) =>
        createTestPosition({
          id: `pos-${i}`,
          billingType: i % 3 === 0 ? 'hourly' : i % 3 === 1 ? 'flatRate' : 'objectValue',
          hourlyRate: 100,
          hours: 1,
          flatRate: 100,
          objectValue: 10000,
          applyExpenseFee: i % 2 === 0,
        })
      );

      const total = calculateTotal(positions, 0, true);

      expect(total.positionsTotal).toBeGreaterThan(0);
      expect(Number.isFinite(total.totalGross)).toBe(true);
    });
  });

  describe('Extreme Rabatte', () => {
    it('handhabt 99.99% Rabatt', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 1000,
          applyExpenseFee: false,
        }),
      ];

      const total = calculateTotal(positions, 0, true, { type: 'percentage', value: 99.99 });

      expect(total.discountAmount).toBeCloseTo(999.90, 1);
      expect(total.subtotalNet).toBeCloseTo(0.10, 1);
      expect(total.totalGross).toBeGreaterThan(0);
    });

    it('handhabt 100% Rabatt', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 1000,
          applyExpenseFee: false,
        }),
      ];

      const total = calculateTotal(positions, 0, true, { type: 'percentage', value: 100 });

      expect(total.discountAmount).toBe(1000);
      expect(total.subtotalNet).toBe(0);
      expect(total.totalGross).toBe(0);
    });

    it('handhabt übermäßigen Festbetrag-Rabatt', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const total = calculateTotal(positions, 0, false, { type: 'fixed', value: 10000 });

      // Rabatt sollte auf Summe begrenzt sein
      expect(total.discountAmount).toBe(100);
      expect(total.subtotalNet).toBe(0);
    });
  });

  describe('Präzisionstests (Floating-Point)', () => {
    it('vermeidet Rundungsfehler bei 0.1 + 0.2', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 0.1 + 0.2, // Classic floating-point issue
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      // Sollte 0.30 sein, nicht 0.30000000000000004
      expect(calc.totalNet).toBeCloseTo(0.30, 2);
    });

    it('vermeidet Rundungsfehler bei vielen Summanden', () => {
      // 100 × 0.33€ sollte 33.00€ ergeben
      const positions = Array.from({ length: 100 }, (_, i) =>
        createTestPosition({
          id: `pos-${i}`,
          billingType: 'flatRate',
          flatRate: 0.33,
          applyExpenseFee: false,
        })
      );

      const total = calculateTotal(positions, 0, false);

      expect(total.positionsTotal).toBe(33.00);
    });

    it('berechnet MwSt. ohne Rundungsfehler', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100.01,
          applyExpenseFee: false,
        }),
      ];

      const total = calculateTotal(positions, 0, true);

      // 19% von 100.01 = 19.0019, gerundet auf 19.00
      expect(total.vatAmount).toBe(19.00); // Cent-basierte Rundung
      expect(total.totalGross).toBe(119.01);
    });
  });

  describe('Ungewöhnliche Zehntelsätze', () => {
    it('handhabt 0.5/10 (halber Zehntelsatz)', () => {
      const position = createTestPosition({
        objectValue: 10000,
        tenthRate: { numerator: 0.5, denominator: 10 },
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.adjustedFee).toBeCloseTo(calc.baseFee * 0.05, 2);
    });

    it('handhabt 30/10 (Maximum für EÜR)', () => {
      const position = createTestPosition({
        objectValue: 50000,
        feeTable: 'B',
        tenthRate: { numerator: 30, denominator: 10 },
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.adjustedFee).toBe(calc.baseFee * 3);
    });

    it('handhabt 1/20 (minimaler Zwanzigstelsatz)', () => {
      const position = createTestPosition({
        objectValue: 30000,
        tenthRate: { numerator: 1, denominator: 20 },
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.adjustedFee).toBeCloseTo(calc.baseFee * 0.05, 2);
    });
  });

  describe('Cent-basierte Berechnung Konsistenz', () => {
    it('stimmt Euro- und Cent-Ergebnisse überein', () => {
      const position = createTestPosition({
        objectValue: 25678.45,
        applyExpenseFee: true,
      });

      const euroResult = calculatePosition(position);
      const centResult = calculatePositionInCent(position);

      expect(euroResult.baseFee).toBe(centResult.baseFeeCent / 100);
      expect(euroResult.adjustedFee).toBe(centResult.adjustedFeeCent / 100);
      expect(euroResult.expenseFee).toBe(centResult.expenseFeeCent / 100);
      expect(euroResult.totalNet).toBe(centResult.totalNetCent / 100);
    });

    it('stimmt Total Euro- und Cent-Ergebnisse überein', () => {
      const positions = [
        createTestPosition({
          id: '1',
          billingType: 'flatRate',
          flatRate: 123.45,
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '2',
          objectValue: 50000,
          applyExpenseFee: false,
        }),
      ];

      const euroResult = calculateTotal(positions, 12.50, true, { type: 'percentage', value: 5 });
      const centResult = calculateTotalInCent(positions, 12.50, true, { type: 'percentage', value: 5 });

      expect(euroResult.positionsTotal).toBe(centResult.positionsTotalCent / 100);
      expect(euroResult.documentFee).toBe(centResult.documentFeeCent / 100);
      expect(euroResult.discountAmount).toBe(centResult.discountAmountCent / 100);
      expect(euroResult.subtotalNet).toBe(centResult.subtotalNetCent / 100);
      expect(euroResult.vatAmount).toBe(centResult.vatAmountCent / 100);
      expect(euroResult.totalGross).toBe(centResult.totalGrossCent / 100);
    });
  });

  describe('Ungültige Eingaben (Robustheit)', () => {
    it('handhabt NaN-Werte', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: NaN,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.totalNet).toBe(0);
    });

    it('handhabt negative Werte', () => {
      const position = createTestPosition({
        objectValue: -1000,
        applyExpenseFee: false,
      });

      const calc = calculatePosition(position);

      expect(calc.baseFee).toBe(0);
      expect(calc.totalNet).toBe(0);
    });

    it('handhabt undefined Quantity', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 100,
        quantity: undefined as any,
        applyExpenseFee: false,
      });

      const total = calculateTotal([position], 0, false);

      // Sollte Quantity 1 annehmen
      expect(total.positionsTotal).toBe(100);
    });
  });
});
