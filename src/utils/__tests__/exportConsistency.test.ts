/**
 * Export Consistency Tests
 * Verifiziert, dass alle Export-Formate dieselben Berechnungen verwenden
 * @module utils/__tests__/exportConsistency.test
 */

import { describe, it, expect } from 'vitest';
import { calculatePosition, calculateTotal } from '../stbvvCalculator';
import { formatEuro } from '../centArithmetic';
import { Position } from '@/types/stbvv';

// Diese Tests verifizieren, dass die Berechnungslogik konsistent ist
// und die Formatierung für Exports korrekt funktioniert.

const createTestPosition = (overrides: Partial<Position> = {}): Position => ({
  id: 'test',
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

describe('Export Consistency Tests', () => {
  describe('Formatierung für Exports', () => {
    it('formatiert Euro-Beträge korrekt (deutsches Format)', () => {
      expect(formatEuro(1234.56)).toBe('1.234,56 €');
      expect(formatEuro(0.01)).toBe('0,01 €');
      expect(formatEuro(1000000)).toBe('1.000.000,00 €');
      expect(formatEuro(0)).toBe('0,00 €');
    });

    it('formatiert negative Beträge korrekt', () => {
      expect(formatEuro(-100)).toBe('-100,00 €');
    });

    it('formatiert Beträge mit 2 Dezimalstellen', () => {
      const formatted = formatEuro(123.456);
      expect(formatted).toMatch(/^\d{1,3}(\.?\d{3})*,\d{2} €$/);
    });
  });

  describe('Berechnungswerte für Export', () => {
    it('gibt konsistente Position-Werte zurück', () => {
      const position = createTestPosition({
        objectValue: 50000,
        applyExpenseFee: true,
      });

      // Mehrfache Berechnung sollte identische Ergebnisse liefern
      const calc1 = calculatePosition(position);
      const calc2 = calculatePosition(position);
      const calc3 = calculatePosition(position);

      expect(calc1.baseFee).toBe(calc2.baseFee);
      expect(calc2.baseFee).toBe(calc3.baseFee);
      expect(calc1.totalNet).toBe(calc2.totalNet);
      expect(calc2.totalNet).toBe(calc3.totalNet);
    });

    it('gibt konsistente Gesamt-Werte zurück', () => {
      const positions = [
        createTestPosition({ id: '1', objectValue: 30000 }),
        createTestPosition({
          id: '2',
          billingType: 'hourly',
          hourlyRate: 115,
          hours: 2,
        }),
      ];

      const total1 = calculateTotal(positions, 12, true, { type: 'percentage', value: 10 });
      const total2 = calculateTotal(positions, 12, true, { type: 'percentage', value: 10 });

      expect(total1.positionsTotal).toBe(total2.positionsTotal);
      expect(total1.discountAmount).toBe(total2.discountAmount);
      expect(total1.subtotalNet).toBe(total2.subtotalNet);
      expect(total1.vatAmount).toBe(total2.vatAmount);
      expect(total1.totalGross).toBe(total2.totalGross);
    });
  });

  describe('Export-Datenstruktur', () => {
    it('enthält alle erforderlichen Positions-Felder', () => {
      const position = createTestPosition();
      const calc = calculatePosition(position);

      // Diese Felder werden für PDF/Excel/CSV benötigt
      expect(calc).toHaveProperty('baseFee');
      expect(calc).toHaveProperty('adjustedFee');
      expect(calc).toHaveProperty('expenseFee');
      expect(calc).toHaveProperty('totalNet');

      expect(typeof calc.baseFee).toBe('number');
      expect(typeof calc.adjustedFee).toBe('number');
      expect(typeof calc.expenseFee).toBe('number');
      expect(typeof calc.totalNet).toBe('number');
    });

    it('enthält alle erforderlichen Gesamt-Felder', () => {
      const positions = [createTestPosition()];
      const total = calculateTotal(positions, 12, true);

      // Diese Felder werden für PDF/Excel/CSV benötigt
      expect(total).toHaveProperty('positionsTotal');
      expect(total).toHaveProperty('documentFee');
      expect(total).toHaveProperty('discountAmount');
      expect(total).toHaveProperty('subtotalNet');
      expect(total).toHaveProperty('vatAmount');
      expect(total).toHaveProperty('totalGross');

      expect(typeof total.positionsTotal).toBe('number');
      expect(typeof total.documentFee).toBe('number');
      expect(typeof total.discountAmount).toBe('number');
      expect(typeof total.subtotalNet).toBe('number');
      expect(typeof total.vatAmount).toBe('number');
      expect(typeof total.totalGross).toBe('number');
    });
  });

  describe('Prüfsummen-Validierung', () => {
    it('berechnet reproduzierbare Werte für Prüfsumme', () => {
      const positions = [
        createTestPosition({
          id: '1',
          objectValue: 75000,
          applyExpenseFee: true,
        }),
        createTestPosition({
          id: '2',
          billingType: 'flatRate',
          flatRate: 250,
          applyExpenseFee: false,
        }),
      ];

      const total = calculateTotal(positions, 12, true);

      // Prüfsummen-Format: Brutto in Cent
      const grossCent = Math.round(total.totalGross * 100);
      expect(Number.isInteger(grossCent)).toBe(true);
      expect(grossCent).toBeGreaterThan(0);
    });
  });

  describe('Dezimalstellen-Konsistenz', () => {
    it('alle Euro-Werte haben max. 2 Dezimalstellen', () => {
      const positions = [
        createTestPosition({ objectValue: 33333.33 }),
        createTestPosition({
          id: '2',
          billingType: 'hourly',
          hourlyRate: 115.50,
          hours: 1.75,
        }),
      ];

      const total = calculateTotal(positions, 12.50, true, { type: 'percentage', value: 7.5 });

      // Prüfe Dezimalstellen
      const checkDecimals = (value: number, name: string) => {
        const decimals = value.toString().split('.')[1]?.length || 0;
        expect(
          decimals <= 2,
          `${name}=${value} hat ${decimals} Dezimalstellen (max. 2 erlaubt)`
        ).toBe(true);
      };

      checkDecimals(total.positionsTotal, 'positionsTotal');
      checkDecimals(total.documentFee, 'documentFee');
      checkDecimals(total.discountAmount, 'discountAmount');
      checkDecimals(total.subtotalNet, 'subtotalNet');
      checkDecimals(total.vatAmount, 'vatAmount');
      checkDecimals(total.totalGross, 'totalGross');
    });
  });

  describe('Quantity-Berechnung für Export', () => {
    it('multipliziert Position korrekt', () => {
      const position = createTestPosition({
        billingType: 'flatRate',
        flatRate: 100,
        quantity: 5,
        applyExpenseFee: false,
      });

      const posCalc = calculatePosition(position);
      const total = calculateTotal([position], 0, false);

      expect(posCalc.totalNet).toBe(100); // Einzelposition
      expect(total.positionsTotal).toBe(500); // × Quantity
    });
  });

  describe('Rabatt-Export', () => {
    it('zeigt korrekten Rabattbetrag', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 1000,
          applyExpenseFee: false,
        }),
      ];

      const withPercentDiscount = calculateTotal(positions, 0, false, {
        type: 'percentage',
        value: 15,
      });

      expect(withPercentDiscount.discountAmount).toBe(150);
      expect(withPercentDiscount.subtotalNet).toBe(850);

      const withFixedDiscount = calculateTotal(positions, 0, false, {
        type: 'fixed',
        value: 200,
      });

      expect(withFixedDiscount.discountAmount).toBe(200);
      expect(withFixedDiscount.subtotalNet).toBe(800);
    });
  });

  describe('MwSt.-Export', () => {
    it('berechnet 19% MwSt. korrekt', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const total = calculateTotal(positions, 0, true);

      expect(total.vatAmount).toBe(19);
      expect(total.totalGross).toBe(119);
    });

    it('zeigt 0 MwSt. bei Kleinunternehmer', () => {
      const positions = [
        createTestPosition({
          billingType: 'flatRate',
          flatRate: 100,
          applyExpenseFee: false,
        }),
      ];

      const total = calculateTotal(positions, 0, false);

      expect(total.vatAmount).toBe(0);
      expect(total.totalGross).toBe(100);
    });
  });
});
