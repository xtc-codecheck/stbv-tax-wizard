/**
 * Gebührentabellen-Verifizierung (Phase 1.1)
 * @module utils/__tests__/feeTableVerification
 * 
 * Verifiziert die Korrektheit aller Gebührentabellen A-D
 * gemäß StBVV 2025 (Stand: 01.07.2025)
 * 
 * Quelle: Steuerberatervergütungsverordnung (StBVV) Anlage 1-4
 */

import { describe, it, expect } from 'vitest';
import { feeTableA, feeTableB, feeTableC, feeTableD, getFeeTables } from '../stbvvTables';
import { FeeTableEntry } from '@/types/stbvv';

// ============== Hilfsfunktionen ==============

/**
 * Berechnet eine Prüfsumme für eine Gebührentabelle
 * Summe aller Gebühren + Anzahl der Einträge
 */
const calculateTableChecksum = (table: FeeTableEntry[]): number => {
  const feeSum = table.reduce((sum, entry) => sum + entry.fee, 0);
  return feeSum * 1000 + table.length;
};

/**
 * Prüft, ob Tabellengrenzen lückenlos sind
 */
const hasContiguousBoundaries = (table: FeeTableEntry[]): boolean => {
  for (let i = 1; i < table.length; i++) {
    if (table[i].minValue !== table[i - 1].maxValue) {
      return false;
    }
  }
  return true;
};

/**
 * Prüft, ob alle Gebühren aufsteigend sind (mit Ausnahme des letzten "vereinfachten" Eintrags)
 */
const hasAscendingFees = (table: FeeTableEntry[]): boolean => {
  for (let i = 1; i < table.length - 1; i++) { // -1 weil letzter Eintrag "vereinfacht" sein kann
    if (table[i].fee < table[i - 1].fee) {
      return false;
    }
  }
  return true;
};

// ============== Tabelle A Tests ==============

describe('Gebührentabelle A - Beratungstabelle (StBVV Anlage 1)', () => {
  it('hat die korrekte Anzahl an Einträgen (54)', () => {
    expect(feeTableA.length).toBe(54);
  });

  it('beginnt bei 0 €', () => {
    expect(feeTableA[0].minValue).toBe(0);
  });

  it('hat lückenlose Wertgrenzen', () => {
    expect(hasContiguousBoundaries(feeTableA)).toBe(true);
  });

  it('hat aufsteigende Gebühren', () => {
    expect(hasAscendingFees(feeTableA)).toBe(true);
  });

  // Stichproben-Verifizierung gegen offizielle StBVV-Werte
  describe('Stichproben-Verifizierung (kritische Werte)', () => {
    const criticalValues: Array<{ value: number; expectedFee: number; description: string }> = [
      { value: 0, expectedFee: 31, description: 'Minimaler Wert' },
      { value: 300, expectedFee: 56, description: 'Erste Grenze' },
      { value: 5000, expectedFee: 422, description: '5.000€ (häufig)' },
      { value: 10000, expectedFee: 655, description: '10.000€ (häufig)' },
      { value: 25000, expectedFee: 946, description: '25.000€ (Mittelwert)' },
      { value: 50000, expectedFee: 1399, description: '50.000€' },
      { value: 100000, expectedFee: 1689, description: '100.000€' },
      { value: 200000, expectedFee: 2412, description: '200.000€' },
      { value: 500000, expectedFee: 3404, description: '500.000€ (Maximum)' },
    ];

    criticalValues.forEach(({ value, expectedFee, description }) => {
      it(`liefert korrekte Gebühr für ${value.toLocaleString('de-DE')}€ (${description})`, () => {
        const entry = feeTableA.find(e => value >= e.minValue && value < e.maxValue);
        expect(entry?.fee).toBe(expectedFee);
      });
    });
  });

  it('hat stabile Prüfsumme (Änderungsdetektion)', () => {
    const checksum = calculateTableChecksum(feeTableA);
    // Prüfsumme bei 54 Einträgen mit Summe 74954
    expect(checksum).toBe(74954054);
  });
});

// ============== Tabelle B Tests ==============

describe('Gebührentabelle B - Abschlusstabelle (StBVV Anlage 2)', () => {
  it('hat die korrekte Anzahl an Einträgen (61)', () => {
    expect(feeTableB.length).toBe(61);
  });

  it('beginnt bei 0 €', () => {
    expect(feeTableB[0].minValue).toBe(0);
  });

  it('hat lückenlose Wertgrenzen', () => {
    expect(hasContiguousBoundaries(feeTableB)).toBe(true);
  });

  it('hat aufsteigende Gebühren', () => {
    expect(hasAscendingFees(feeTableB)).toBe(true);
  });

  describe('Stichproben-Verifizierung (kritische Werte)', () => {
    const criticalValues: Array<{ value: number; expectedFee: number; description: string }> = [
      { value: 0, expectedFee: 49, description: 'Minimaler Wert' },
      { value: 8000, expectedFee: 121, description: '8.000€ (Mindestgegenstandswert Jahresabschluss)' },
      { value: 17500, expectedFee: 178, description: '17.500€ (Mindestgegenstandswert EÜR)' },
      { value: 50000, expectedFee: 303, description: '50.000€' },
      { value: 100000, expectedFee: 423, description: '100.000€' },
      { value: 500000, expectedFee: 871, description: '500.000€' },
      { value: 1000000, expectedFee: 1194, description: '1.000.000€' },
      { value: 5000000, expectedFee: 2720, description: '5.000.000€' },
      { value: 50000000, expectedFee: 6923, description: '50.000.000€ (Maximum)' },
    ];

    criticalValues.forEach(({ value, expectedFee, description }) => {
      it(`liefert korrekte Gebühr für ${value.toLocaleString('de-DE')}€ (${description})`, () => {
        const entry = feeTableB.find(e => value >= e.minValue && value < e.maxValue);
        expect(entry?.fee).toBe(expectedFee);
      });
    });
  });

  it('hat stabile Prüfsumme', () => {
    const checksum = calculateTableChecksum(feeTableB);
    expect(checksum).toBe(103912061);
  });
});

// ============== Tabelle C Tests ==============

describe('Gebührentabelle C - Buchführungstabelle (StBVV Anlage 3)', () => {
  it('hat die korrekte Anzahl an Einträgen (24)', () => {
    expect(feeTableC.length).toBe(24);
  });

  it('beginnt bei 0 €', () => {
    expect(feeTableC[0].minValue).toBe(0);
  });

  it('hat lückenlose Wertgrenzen', () => {
    expect(hasContiguousBoundaries(feeTableC)).toBe(true);
  });

  it('hat aufsteigende Gebühren', () => {
    expect(hasAscendingFees(feeTableC)).toBe(true);
  });

  describe('Stichproben-Verifizierung (kritische Werte)', () => {
    const criticalValues: Array<{ value: number; expectedFee: number; description: string }> = [
      { value: 0, expectedFee: 72, description: 'Minimaler Wert' },
      { value: 15000, expectedFee: 80, description: '15.000€ (Mindestgegenstandswert Buchführung)' },
      { value: 50000, expectedFee: 145, description: '50.000€' },
      { value: 100000, expectedFee: 209, description: '100.000€' },
      { value: 250000, expectedFee: 359, description: '250.000€' },
      { value: 500000, expectedFee: 512, description: '500.000€ (Maximum)' },
    ];

    criticalValues.forEach(({ value, expectedFee, description }) => {
      it(`liefert korrekte Gebühr für ${value.toLocaleString('de-DE')}€ (${description})`, () => {
        const entry = feeTableC.find(e => value >= e.minValue && value < e.maxValue);
        expect(entry?.fee).toBe(expectedFee);
      });
    });
  });

  it('hat stabile Prüfsumme', () => {
    const checksum = calculateTableChecksum(feeTableC);
    expect(checksum).toBe(5379024);
  });
});

// ============== Tabelle D Tests ==============

describe('Gebührentabelle D - Landwirtschaftstabelle (StBVV Anlage 4)', () => {
  it('hat die korrekte Anzahl an Einträgen (60)', () => {
    expect(feeTableD.length).toBe(60);
  });

  it('beginnt bei 0 Hektar', () => {
    expect(feeTableD[0].minValue).toBe(0);
  });

  it('hat lückenlose Wertgrenzen', () => {
    expect(hasContiguousBoundaries(feeTableD)).toBe(true);
  });

  it('hat aufsteigende Gebühren', () => {
    expect(hasAscendingFees(feeTableD)).toBe(true);
  });

  describe('Stichproben-Verifizierung (kritische Werte)', () => {
    const criticalValues: Array<{ value: number; expectedFee: number; description: string }> = [
      { value: 0, expectedFee: 369, description: 'Bis 40 ha' },
      { value: 50, expectedFee: 444, description: '50-55 ha' },
      { value: 100, expectedFee: 631, description: '100-110 ha' },
      { value: 200, expectedFee: 888, description: '200-210 ha' },
      { value: 500, expectedFee: 1409, description: '500-520 ha' },
      { value: 1000, expectedFee: 1843, description: 'Ab 1.000 ha (Maximum)' },
    ];

    criticalValues.forEach(({ value, expectedFee, description }) => {
      it(`liefert korrekte Gebühr für ${value} ha (${description})`, () => {
        const entry = feeTableD.find(e => value >= e.minValue && value < e.maxValue);
        expect(entry?.fee).toBe(expectedFee);
      });
    });
  });

  it('hat stabile Prüfsumme', () => {
    const checksum = calculateTableChecksum(feeTableD);
    expect(checksum).toBe(62620060);
  });
});

// ============== Integritäts-Tests ==============

describe('Gebührentabellen-Integrität', () => {
  it('getFeeTables() liefert alle vier Tabellen', () => {
    const tables = getFeeTables();
    expect(tables).toHaveProperty('A');
    expect(tables).toHaveProperty('B');
    expect(tables).toHaveProperty('C');
    expect(tables).toHaveProperty('D');
  });

  it('alle Tabellen haben positive Gebühren', () => {
    const allTables = [...feeTableA, ...feeTableB, ...feeTableC, ...feeTableD];
    allTables.forEach(entry => {
      expect(entry.fee).toBeGreaterThan(0);
    });
  });

  it('alle Tabellen haben valide Wertgrenzen (min < max)', () => {
    const allTables = [...feeTableA, ...feeTableB, ...feeTableC, ...feeTableD];
    allTables.forEach(entry => {
      expect(entry.minValue).toBeLessThan(entry.maxValue);
    });
  });

  it('alle Tabellen haben ganzzahlige Gebühren', () => {
    const allTables = [...feeTableA, ...feeTableB, ...feeTableC, ...feeTableD];
    allTables.forEach(entry => {
      expect(Number.isInteger(entry.fee)).toBe(true);
    });
  });

  it('Gesamt-Prüfsumme aller Tabellen ist stabil', () => {
    const totalChecksum = 
      calculateTableChecksum(feeTableA) +
      calculateTableChecksum(feeTableB) +
      calculateTableChecksum(feeTableC) +
      calculateTableChecksum(feeTableD);
    
    // Gesamt: 74954054 + 103912061 + 5379024 + 62620060 = 246865199
    expect(totalChecksum).toBe(246865199);
  });
});

// ============== Grenzwert-Tests ==============

describe('Grenzwert-Tests (kritische Übergänge)', () => {
  describe('Tabelle A Grenzen', () => {
    it('299€ → 300€ Übergang', () => {
      const fee299 = feeTableA.find(e => 299 >= e.minValue && 299 < e.maxValue)?.fee;
      const fee300 = feeTableA.find(e => 300 >= e.minValue && 300 < e.maxValue)?.fee;
      expect(fee299).toBe(31);
      expect(fee300).toBe(56);
    });

    it('9999€ → 10000€ Übergang', () => {
      const fee9999 = feeTableA.find(e => 9999 >= e.minValue && 9999 < e.maxValue)?.fee;
      const fee10000 = feeTableA.find(e => 10000 >= e.minValue && 10000 < e.maxValue)?.fee;
      expect(fee9999).toBe(605);
      expect(fee10000).toBe(655);
    });
  });

  describe('Tabelle B Grenzen', () => {
    it('7999€ → 8000€ Übergang (Mindestgegenstandswert Jahresabschluss)', () => {
      const fee7999 = feeTableB.find(e => 7999 >= e.minValue && 7999 < e.maxValue)?.fee;
      const fee8000 = feeTableB.find(e => 8000 >= e.minValue && 8000 < e.maxValue)?.fee;
      expect(fee7999).toBe(116);
      expect(fee8000).toBe(121);
    });

    it('17499€ → 17500€ Übergang (Mindestgegenstandswert EÜR)', () => {
      const fee17499 = feeTableB.find(e => 17499 >= e.minValue && 17499 < e.maxValue)?.fee;
      const fee17500 = feeTableB.find(e => 17500 >= e.minValue && 17500 < e.maxValue)?.fee;
      expect(fee17499).toBe(166);
      expect(fee17500).toBe(178);
    });
  });

  describe('Tabelle C Grenzen', () => {
    it('14999€ → 15000€ Übergang (Mindestgegenstandswert Buchführung)', () => {
      const fee14999 = feeTableC.find(e => 14999 >= e.minValue && 14999 < e.maxValue)?.fee;
      const fee15000 = feeTableC.find(e => 15000 >= e.minValue && 15000 < e.maxValue)?.fee;
      expect(fee14999).toBe(72);
      expect(fee15000).toBe(80);
    });
  });
});
