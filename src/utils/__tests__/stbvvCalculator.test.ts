/**
 * Unit Tests für stbvvCalculator.ts
 * Testet die StBVV-Gebührenberechnung
 */

import { describe, it, expect } from 'vitest';
import {
  calculatePosition,
  calculateTotal,
  calculatePositionInCent,
  calculateTotalInCent,
} from '../stbvvCalculator';
import { Position } from '@/types/stbvv';

// Helper: Erstellt eine Standard-Position für Tests
const createTestPosition = (overrides: Partial<Position> = {}): Position => ({
  id: 'test-1',
  activity: 'Testaktivität',
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

describe('stbvvCalculator', () => {
  // ============== calculatePosition ==============

  describe('calculatePosition', () => {
    describe('Stundenabrechnung (hourly)', () => {
      it('berechnet Stundensatz korrekt', () => {
        const position = createTestPosition({
          billingType: 'hourly',
          hourlyRate: 115, // Mittlerer Stundensatz nach § 13 StBVV
          hours: 2,
          applyExpenseFee: false,
        });

        const result = calculatePosition(position);

        expect(result.baseFee).toBe(230);
        expect(result.adjustedFee).toBe(230);
        expect(result.expenseFee).toBe(0);
        expect(result.totalNet).toBe(230);
      });

      it('berechnet mit halben Stunden', () => {
        const position = createTestPosition({
          billingType: 'hourly',
          hourlyRate: 100,
          hours: 1.5,
          applyExpenseFee: false,
        });

        const result = calculatePosition(position);
        expect(result.totalNet).toBe(150);
      });

      it('wendet Auslagenpauschale an (max 20€)', () => {
        const position = createTestPosition({
          billingType: 'hourly',
          hourlyRate: 115,
          hours: 2,
          applyExpenseFee: true,
        });

        const result = calculatePosition(position);
        
        // 230€ × 20% = 46€, aber max. 20€
        expect(result.expenseFee).toBe(20);
        expect(result.totalNet).toBe(250); // 230 + 20
      });
    });

    describe('Pauschalabrechnung (flatRate)', () => {
      it('verwendet Pauschale direkt', () => {
        const position = createTestPosition({
          billingType: 'flatRate',
          flatRate: 500,
          applyExpenseFee: false,
        });

        const result = calculatePosition(position);

        expect(result.baseFee).toBe(500);
        expect(result.adjustedFee).toBe(500);
        expect(result.totalNet).toBe(500);
      });

      it('wendet Auslagenpauschale an', () => {
        const position = createTestPosition({
          billingType: 'flatRate',
          flatRate: 50,
          applyExpenseFee: true,
        });

        const result = calculatePosition(position);
        
        // 50€ × 20% = 10€ (unter Max)
        expect(result.expenseFee).toBe(10);
        expect(result.totalNet).toBe(60);
      });
    });

    describe('Gegenstandswertabrechnung (objectValue)', () => {
      it('berechnet mit Tabelle A und 6/10', () => {
        const position = createTestPosition({
          billingType: 'objectValue',
          objectValue: 10000, // 10.000€ Gegenstandswert
          feeTable: 'A',
          tenthRate: { numerator: 6, denominator: 10 },
          applyExpenseFee: false,
        });

        const result = calculatePosition(position);

        // Tabelle A bei 10.000€ = 614€, × 6/10 = 368,40€
        expect(result.baseFee).toBeGreaterThan(0);
        expect(result.adjustedFee).toBe(result.baseFee * 0.6);
      });

      it('handhabt Dezimal-Zehntelsätze (17.5/10 für EÜR)', () => {
        const position = createTestPosition({
          billingType: 'objectValue',
          objectValue: 50000,
          feeTable: 'B',
          tenthRate: { numerator: 17.5, denominator: 10 },
          applyExpenseFee: false,
        });

        const result = calculatePosition(position);
        
        // adjustedFee sollte 175% der baseFee sein
        expect(result.adjustedFee).toBeCloseTo(result.baseFee * 1.75, 1);
      });

      it('handhabt Zwanzigstelsätze (6.5/20 für Anlage N)', () => {
        const position = createTestPosition({
          billingType: 'objectValue',
          objectValue: 30000,
          feeTable: 'A',
          tenthRate: { numerator: 6.5, denominator: 20 },
          applyExpenseFee: false,
        });

        const result = calculatePosition(position);
        
        // adjustedFee sollte 6.5/20 = 32.5% der baseFee sein
        expect(result.adjustedFee).toBeCloseTo(result.baseFee * 0.325, 1);
      });

      it('gibt 0 zurück bei Gegenstandswert 0', () => {
        const position = createTestPosition({
          billingType: 'objectValue',
          objectValue: 0,
        });

        const result = calculatePosition(position);

        expect(result.baseFee).toBe(0);
        expect(result.adjustedFee).toBe(0);
        expect(result.totalNet).toBe(0);
      });
    });

    describe('Auslagenpauschale', () => {
      it('begrenzt auf max. 20€', () => {
        const position = createTestPosition({
          billingType: 'flatRate',
          flatRate: 1000,
          applyExpenseFee: true,
        });

        const result = calculatePosition(position);
        
        // 1000€ × 20% = 200€, aber max. 20€
        expect(result.expenseFee).toBe(20);
      });

      it('berechnet korrekt unter dem Maximum', () => {
        const position = createTestPosition({
          billingType: 'flatRate',
          flatRate: 80,
          applyExpenseFee: true,
        });

        const result = calculatePosition(position);
        
        // 80€ × 20% = 16€
        expect(result.expenseFee).toBe(16);
      });
    });
  });

  // ============== calculateTotal ==============

  describe('calculateTotal', () => {
    it('berechnet Summe mehrerer Positionen', () => {
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

      const result = calculateTotal(positions, 0, false);

      expect(result.positionsTotal).toBe(300);
      expect(result.subtotalNet).toBe(300);
    });

    it('berücksichtigt Quantity-Multiplikator', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          quantity: 3,
          applyExpenseFee: false,
        }),
      ];

      const result = calculateTotal(positions, 0, false);

      expect(result.positionsTotal).toBe(300);
    });

    it('addiert Dokumentenpauschale', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const result = calculateTotal(positions, 12, false);

      expect(result.documentFee).toBe(12);
      expect(result.subtotalNet).toBe(112);
    });

    it('berechnet MwSt. korrekt (19%)', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const result = calculateTotal(positions, 0, true);

      expect(result.vatAmount).toBe(19);
      expect(result.totalGross).toBe(119);
    });

    it('ohne MwSt. wenn deaktiviert', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const result = calculateTotal(positions, 0, false);

      expect(result.vatAmount).toBe(0);
      expect(result.totalGross).toBe(100);
    });

    describe('Rabatt', () => {
      it('berechnet Prozent-Rabatt', () => {
        const positions = [
          createTestPosition({
            billingType: 'flatRate',
            flatRate: 100,
            applyExpenseFee: false,
          }),
        ];

        const result = calculateTotal(positions, 0, false, {
          type: 'percentage',
          value: 10, // 10% Rabatt
        });

        expect(result.discountAmount).toBe(10);
        expect(result.subtotalNet).toBe(90);
      });

      it('berechnet Fixbetrag-Rabatt', () => {
        const positions = [
          createTestPosition({
            billingType: 'flatRate',
            flatRate: 100,
            applyExpenseFee: false,
          }),
        ];

        const result = calculateTotal(positions, 0, false, {
          type: 'fixed',
          value: 25,
        });

        expect(result.discountAmount).toBe(25);
        expect(result.subtotalNet).toBe(75);
      });

      it('begrenzt Rabatt auf Zwischensumme', () => {
        const positions = [
          createTestPosition({
            billingType: 'flatRate',
            flatRate: 100,
            applyExpenseFee: false,
          }),
        ];

        const result = calculateTotal(positions, 0, false, {
          type: 'fixed',
          value: 150, // Mehr als Summe
        });

        expect(result.discountAmount).toBe(100);
        expect(result.subtotalNet).toBe(0);
      });

      it('berechnet MwSt. nach Rabattabzug', () => {
        const positions = [
          createTestPosition({
            billingType: 'flatRate',
            flatRate: 100,
            applyExpenseFee: false,
          }),
        ];

        const result = calculateTotal(positions, 0, true, {
          type: 'percentage',
          value: 10,
        });

        // 100€ - 10% = 90€ netto, 19% MwSt. = 17.10€
        expect(result.subtotalNet).toBe(90);
        expect(result.vatAmount).toBe(17.1);
        expect(result.totalGross).toBe(107.1);
      });
    });

    it('handhabt leere Positionsliste', () => {
      const result = calculateTotal([], 12, true);

      expect(result.positionsTotal).toBe(0);
      expect(result.documentFee).toBe(12);
      expect(result.vatAmount).toBeCloseTo(2.28, 2);
      expect(result.totalGross).toBeCloseTo(14.28, 2);
    });
  });

  // ============== Cent-basierte API ==============

  describe('calculatePositionInCent', () => {
    it('gibt Cent-Werte zurück', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 123.45,
        applyExpenseFee: false,
      });

      const result = calculatePositionInCent(position);

      expect(result.adjustedFeeCent).toBe(12345);
      expect(result.totalNetCent).toBe(12345);
    });
  });

  describe('calculateTotalInCent', () => {
    it('gibt Cent-Werte zurück', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const result = calculateTotalInCent(positions, 12, true);

      expect(result.positionsTotalCent).toBe(10000);
      expect(result.documentFeeCent).toBe(1200);
      expect(result.vatAmountCent).toBe(2128); // 19% von 112€
    });
  });

  // ============== Präzisionstests ==============

  describe('Berechnungspräzision', () => {
    it('vermeidet Rundungsfehler bei vielen Positionen', () => {
      // 10 Positionen à 33.33€
      const positions = Array.from({ length: 10 }, (_, i) =>
        createTestPosition({
          id: `pos-${i}`,
          billingType: 'flatRate',
          flatRate: 33.33,
          applyExpenseFee: false,
        })
      );

      const result = calculateTotal(positions, 0, false);

      // 10 × 33.33€ = 333.30€ (nicht 333.29999... oder 333.30000001)
      expect(result.positionsTotal).toBe(333.3);
    });

    it('berechnet komplexe Rechnung korrekt', () => {
      const positions = [
        createTestPosition({
          id: '1',
          billingType: 'flatRate',
          flatRate: 156.78,
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '2',
          billingType: 'hourly',
          hourlyRate: 115,
          hours: 2.5,
          applyExpenseFee: true,
        }),
      ];

      const result = calculateTotal(positions, 12, true, {
        type: 'percentage',
        value: 5,
      });

      // Alle Werte sollten auf 2 Dezimalstellen gerundet sein
      expect(Number.isFinite(result.totalGross)).toBe(true);
      expect(result.totalGross.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
  });
});
