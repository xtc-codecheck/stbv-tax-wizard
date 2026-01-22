/**
 * Unit Tests für centArithmetic.ts
 * Testet die Cent-basierte Integer-Arithmetik
 */

import { describe, it, expect } from 'vitest';
import {
  euroToCent,
  centToEuro,
  addCent,
  subtractCent,
  multiplyCent,
  percentOfCent,
  applyRate,
  minCent,
  sumCent,
  formatCentAsEuro,
  formatEuro,
  isValidCent,
  sanitizeEuro,
  centResultToEuro,
  centTotalToEuro,
} from '../centArithmetic';

describe('centArithmetic', () => {
  // ============== Konvertierung ==============
  
  describe('euroToCent', () => {
    it('konvertiert ganze Euro-Beträge korrekt', () => {
      expect(euroToCent(100)).toBe(10000);
      expect(euroToCent(1)).toBe(100);
      expect(euroToCent(0)).toBe(0);
    });

    it('konvertiert Cent-Beträge korrekt', () => {
      expect(euroToCent(1.23)).toBe(123);
      expect(euroToCent(99.99)).toBe(9999);
      expect(euroToCent(0.01)).toBe(1);
    });

    it('rundet korrekt bei Fließkommaproblemen', () => {
      // Klassisches 0.1 + 0.2 Problem
      expect(euroToCent(0.1 + 0.2)).toBe(30);
      expect(euroToCent(0.1)).toBe(10);
      expect(euroToCent(0.2)).toBe(20);
    });

    it('handhabt negative Werte', () => {
      expect(euroToCent(-10)).toBe(-1000);
    });
  });

  describe('centToEuro', () => {
    it('konvertiert Cent korrekt zurück', () => {
      expect(centToEuro(10000)).toBe(100);
      expect(centToEuro(123)).toBe(1.23);
      expect(centToEuro(1)).toBe(0.01);
      expect(centToEuro(0)).toBe(0);
    });
  });

  // ============== Grundoperationen ==============

  describe('addCent', () => {
    it('addiert zwei Cent-Beträge', () => {
      expect(addCent(100, 200)).toBe(300);
      expect(addCent(0, 100)).toBe(100);
      expect(addCent(-50, 100)).toBe(50);
    });
  });

  describe('subtractCent', () => {
    it('subtrahiert Cent-Beträge', () => {
      expect(subtractCent(300, 100)).toBe(200);
      expect(subtractCent(100, 100)).toBe(0);
      expect(subtractCent(50, 100)).toBe(-50);
    });
  });

  describe('multiplyCent', () => {
    it('multipliziert mit ganzen Zahlen', () => {
      expect(multiplyCent(100, 3)).toBe(300);
      expect(multiplyCent(100, 0)).toBe(0);
    });

    it('multipliziert mit Dezimalzahlen und rundet', () => {
      expect(multiplyCent(100, 1.5)).toBe(150);
      expect(multiplyCent(100, 0.333)).toBe(33);
    });
  });

  describe('percentOfCent', () => {
    it('berechnet Prozentsätze korrekt', () => {
      expect(percentOfCent(10000, 19)).toBe(1900); // 19% von 100€
      expect(percentOfCent(10000, 20)).toBe(2000); // 20% von 100€
      expect(percentOfCent(10000, 100)).toBe(10000); // 100%
      expect(percentOfCent(10000, 0)).toBe(0); // 0%
    });

    it('rundet bei ungeraden Ergebnissen', () => {
      expect(percentOfCent(1000, 33)).toBe(330); // 33% von 10€
      expect(percentOfCent(100, 33)).toBe(33); // 33% von 1€
    });
  });

  describe('applyRate', () => {
    it('wendet Zehntelsätze korrekt an', () => {
      expect(applyRate(10000, 6, 10)).toBe(6000); // 6/10 von 100€
      expect(applyRate(10000, 10, 10)).toBe(10000); // 10/10 = volle Gebühr
      expect(applyRate(10000, 1, 10)).toBe(1000); // 1/10
    });

    it('wendet Zwanzigstelsätze korrekt an (§ 27 StBVV)', () => {
      expect(applyRate(10000, 6, 20)).toBe(3000); // 6/20 von 100€
      expect(applyRate(10000, 6.5, 20)).toBe(3250); // 6.5/20 von 100€ (Anlage N)
    });

    it('handhabt Dezimalzähler', () => {
      expect(applyRate(10000, 17.5, 10)).toBe(17500); // 17.5/10 für EÜR
      expect(applyRate(10000, 3.5, 10)).toBe(3500); // 3.5/10 für Gewerbesteuer
    });
  });

  describe('minCent', () => {
    it('gibt das Minimum zurück', () => {
      expect(minCent(100, 200)).toBe(100);
      expect(minCent(200, 100)).toBe(100);
      expect(minCent(100, 100)).toBe(100);
    });
  });

  describe('sumCent', () => {
    it('summiert Array von Cent-Beträgen', () => {
      expect(sumCent([100, 200, 300])).toBe(600);
      expect(sumCent([1000, 2000, 3000, 4000])).toBe(10000);
      expect(sumCent([])).toBe(0);
    });
  });

  // ============== Formatierung ==============

  describe('formatCentAsEuro', () => {
    it('formatiert Cent-Beträge als Euro', () => {
      expect(formatCentAsEuro(123456)).toBe('1.234,56 €');
      expect(formatCentAsEuro(100)).toBe('1,00 €');
      expect(formatCentAsEuro(0)).toBe('0,00 €');
    });
  });

  describe('formatEuro', () => {
    it('formatiert Euro-Beträge', () => {
      expect(formatEuro(1234.56)).toBe('1.234,56 €');
      expect(formatEuro(1)).toBe('1,00 €');
      expect(formatEuro(0)).toBe('0,00 €');
    });
  });

  // ============== Validierung ==============

  describe('isValidCent', () => {
    it('validiert gültige Cent-Beträge', () => {
      expect(isValidCent(0)).toBe(true);
      expect(isValidCent(100)).toBe(true);
      expect(isValidCent(999999)).toBe(true);
    });

    it('erkennt ungültige Werte', () => {
      expect(isValidCent(-1)).toBe(false);
      expect(isValidCent(1.5)).toBe(false);
      expect(isValidCent(NaN)).toBe(false);
    });
  });

  describe('sanitizeEuro', () => {
    it('säubert gültige Euro-Werte', () => {
      expect(sanitizeEuro(100)).toBe(100);
      expect(sanitizeEuro(0)).toBe(0);
    });

    it('ersetzt ungültige Werte mit 0', () => {
      expect(sanitizeEuro(undefined)).toBe(0);
      expect(sanitizeEuro(null)).toBe(0);
      expect(sanitizeEuro(NaN)).toBe(0);
    });

    it('ersetzt negative Werte mit 0', () => {
      expect(sanitizeEuro(-50)).toBe(0);
    });
  });

  // ============== Ergebnis-Konvertierung ==============

  describe('centResultToEuro', () => {
    it('konvertiert CentCalculationResult zu Euro', () => {
      const centResult = {
        baseFeeCent: 10000,
        adjustedFeeCent: 6000,
        expenseFeeCent: 1200,
        totalNetCent: 7200,
      };
      
      const euroResult = centResultToEuro(centResult);
      
      expect(euroResult.baseFee).toBe(100);
      expect(euroResult.adjustedFee).toBe(60);
      expect(euroResult.expenseFee).toBe(12);
      expect(euroResult.totalNet).toBe(72);
    });
  });

  describe('centTotalToEuro', () => {
    it('konvertiert CentTotalResult zu Euro', () => {
      const centResult = {
        positionsTotalCent: 50000,
        documentFeeCent: 1200,
        discountAmountCent: 5120,
        subtotalNetCent: 46080,
        vatAmountCent: 8755,
        totalGrossCent: 54835,
      };
      
      const euroResult = centTotalToEuro(centResult);
      
      expect(euroResult.positionsTotal).toBe(500);
      expect(euroResult.documentFee).toBe(12);
      expect(euroResult.discountAmount).toBe(51.20);
      expect(euroResult.subtotalNet).toBe(460.80);
      expect(euroResult.vatAmount).toBe(87.55);
      expect(euroResult.totalGross).toBe(548.35);
    });
  });

  // ============== Präzisionstests ==============

  describe('Floating-Point Präzision', () => {
    it('vermeidet klassische Floating-Point-Fehler', () => {
      // In Euro: 0.1 + 0.2 !== 0.3
      const a = euroToCent(0.1);
      const b = euroToCent(0.2);
      const sum = addCent(a, b);
      
      expect(sum).toBe(30);
      expect(centToEuro(sum)).toBe(0.3);
    });

    it('behält Präzision bei komplexen Berechnungen', () => {
      // Rechnung: 5 Positionen à 123.45€ mit 19% MwSt.
      const positionCent = euroToCent(123.45);
      const total = multiplyCent(positionCent, 5);
      const vat = percentOfCent(total, 19);
      const gross = addCent(total, vat);
      
      expect(total).toBe(61725); // 617.25€
      expect(vat).toBe(11728); // 117.28€ (gerundet)
      expect(gross).toBe(73453); // 734.53€
    });
  });
});
