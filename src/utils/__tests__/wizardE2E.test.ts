/**
 * Wizard End-to-End Tests
 * Testet den kompletten Workflow der Wizard-Berechnung
 * @module utils/__tests__/wizardE2E.test
 */

import { describe, it, expect } from 'vitest';
import { calculatePosition, calculateTotal } from '../stbvvCalculator';
import { Position } from '@/types/stbvv';
import { activityPresets, getActivityPreset } from '../activityPresets';

// Simuliert den kompletten Wizard-Flow mit realistischen Eingaben

const createPositionFromPreset = (
  presetName: string,
  objectValue: number,
  overrides: Partial<Position> = {}
): Position => {
  const preset = getActivityPreset(presetName);
  
  if (!preset) {
    throw new Error(`Preset "${presetName}" nicht gefunden`);
  }
  
  return {
    id: `test-${Date.now()}-${Math.random()}`,
    activity: preset.activity,
    description: '',
    objectValue,
    tenthRate: {
      numerator: preset.defaultTenthRate || 10,
      denominator: preset.rateType === 'twentieth' ? 20 : 10,
    },
    quantity: 1,
    feeTable: preset.suggestedFeeTable,
    applyExpenseFee: true,
    billingType: 'objectValue',
    hourlyRate: 0,
    hours: 0,
    flatRate: 0,
    ...overrides,
  };
};

describe('Wizard E2E: Vollständige Rechnungs-Workflows', () => {
  describe('Szenario 1: Freiberufler Einkommensteuererklärung', () => {
    it('berechnet komplette ESt + EÜR korrekt', () => {
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', 50000),
        createPositionFromPreset('Einnahmenüberschussrechnung (EÜR)', 25000),
      ];

      // Einzelne Positionen prüfen
      const estCalc = calculatePosition(positions[0]);
      const eurCalc = calculatePosition(positions[1]);

      expect(estCalc.baseFee).toBeGreaterThan(0);
      expect(estCalc.totalNet).toBeGreaterThan(estCalc.adjustedFee);
      expect(eurCalc.baseFee).toBeGreaterThan(0);

      // Gesamtsumme mit 19% MwSt.
      const total = calculateTotal(positions, 12, true);

      expect(total.positionsTotal).toBe(estCalc.totalNet + eurCalc.totalNet);
      expect(total.documentFee).toBe(12);
      expect(total.vatAmount).toBeCloseTo(total.subtotalNet * 0.19, 2);
      expect(total.totalGross).toBe(total.subtotalNet + total.vatAmount);
    });
  });

  describe('Szenario 2: GmbH Jahresabschluss (Template 2)', () => {
    it('berechnet 8-Positionen-Vorlage korrekt', () => {
      const objectValue = 100000;
      
      const positions: Position[] = [
        createPositionFromPreset('Jahresabschluss (Kapitalgesellschaften)', objectValue),
        createPositionFromPreset('Überleitung Handelsbilanz nach Steuerbilanz', objectValue),
        createPositionFromPreset('Elektronische Übermittlung Bundesanzeiger', objectValue),
        createPositionFromPreset('Elektronische Übermittlung Finanzamt', objectValue),
        createPositionFromPreset('Körperschaftsteuererklärung', objectValue),
        createPositionFromPreset('Gewerbesteuererklärung', objectValue),
        createPositionFromPreset('Umsatzsteuererklärung', objectValue),
        {
          // Prüfung Steuerbescheid (Zeitgebühr)
          id: 'pruefung',
          activity: 'Prüfung Steuerbescheid',
          description: '',
          objectValue: 0,
          tenthRate: { numerator: 10, denominator: 10 },
          quantity: 3, // 3 Bescheide
          feeTable: 'A',
          applyExpenseFee: true,
          billingType: 'hourly',
          hourlyRate: 115,
          hours: 0.5,
          flatRate: 0,
        },
      ];

      // Alle Positionen müssen positive Werte haben
      positions.forEach((pos, idx) => {
        const calc = calculatePosition(pos);
        expect(calc.totalNet, `Position ${idx + 1}: ${pos.activity}`).toBeGreaterThan(0);
      });

      // Gesamtsumme prüfen
      const total = calculateTotal(positions, 0, true);

      expect(total.positionsTotal).toBeGreaterThan(1000);
      expect(total.vatAmount).toBeCloseTo(total.subtotalNet * 0.19, 1);
      expect(total.totalGross).toBeGreaterThan(total.subtotalNet);
    });
  });

  describe('Szenario 3: Arbeitnehmer mit Anlagen (Zwanzigstelsätze)', () => {
    it('berechnet § 27 Zwanzigstelsätze korrekt', () => {
      const objectValue = 45000;
      
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', objectValue),
        createPositionFromPreset('Anlage N (Einkünfte aus nichtselbständiger Arbeit)', objectValue),
        createPositionFromPreset('Anlage Vorsorgeaufwand', objectValue),
      ];

      // Anlage N sollte Zwanzigstelsatz verwenden (Preset-Check)
      const anlageNPreset = getActivityPreset('Anlage N (Einkünfte aus nichtselbständiger Arbeit)');
      expect(anlageNPreset?.rateType).toBe('twentieth');
      
      // Position sollte Zwanzigstelsatz haben
      const anlageNPosition = positions[1];
      expect(anlageNPosition.tenthRate.denominator).toBe(20);

      const anlageNCalc = calculatePosition(anlageNPosition);
      const estCalc = calculatePosition(positions[0]);

      // Anlage N sollte deutlich weniger kosten als ESt (6.5/20 vs 3.5/10)
      expect(anlageNCalc.adjustedFee).toBeLessThan(estCalc.adjustedFee);

      const total = calculateTotal(positions, 12, true);
      expect(total.totalGross).toBeGreaterThan(0);
    });
  });

  describe('Szenario 4: Gemischte Abrechnungsarten', () => {
    it('kombiniert Gegenstandswert, Stunden und Pauschale', () => {
      const positions: Position[] = [
        // Gegenstandswert-Abrechnung
        createPositionFromPreset('Einkommensteuererklärung', 30000),
        // Zeitgebühr
        {
          id: 'beratung',
          activity: 'Steuerliche Beratung',
          description: 'Beratungsgespräch',
          objectValue: 0,
          tenthRate: { numerator: 10, denominator: 10 },
          quantity: 1,
          feeTable: 'A',
          applyExpenseFee: true,
          billingType: 'hourly',
          hourlyRate: 115,
          hours: 2,
        },
        // Pauschalhonorar
        {
          id: 'buchhaltung',
          activity: 'Monatliche Buchhaltung',
          description: 'Pauschale',
          objectValue: 0,
          tenthRate: { numerator: 10, denominator: 10 },
          quantity: 12,
          feeTable: 'C',
          applyExpenseFee: false,
          billingType: 'flatRate',
          flatRate: 250,
        },
      ];

      const estCalc = calculatePosition(positions[0]);
      const beratungCalc = calculatePosition(positions[1]);
      const buchhaltungCalc = calculatePosition(positions[2]);

      // Stundenabrechnung: 115€ × 2h = 230€ + 20€ Auslagen = 250€
      expect(beratungCalc.adjustedFee).toBe(230);
      expect(beratungCalc.expenseFee).toBe(20);
      expect(beratungCalc.totalNet).toBe(250);

      // Pauschale: 250€ × 12 Monate (ohne Auslagen)
      expect(buchhaltungCalc.totalNet).toBe(250);

      // Gesamtsumme mit Quantity-Multiplikator
      const total = calculateTotal(positions, 0, true);
      
      // Buchhaltung × 12
      const expectedBuchhaltungTotal = 250 * 12;
      expect(total.positionsTotal).toBe(
        estCalc.totalNet + beratungCalc.totalNet + expectedBuchhaltungTotal
      );
    });
  });

  describe('Szenario 5: Rabatt-Varianten', () => {
    it('berechnet Prozent-Rabatt korrekt', () => {
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', 50000),
      ];

      const noDiscount = calculateTotal(positions, 0, true);
      const with10Percent = calculateTotal(positions, 0, true, { type: 'percentage', value: 10 });

      expect(with10Percent.discountAmount).toBeCloseTo(noDiscount.subtotalNet * 0.10, 2);
      expect(with10Percent.subtotalNet).toBeCloseTo(noDiscount.subtotalNet * 0.90, 2);
      expect(with10Percent.totalGross).toBeLessThan(noDiscount.totalGross);
    });

    it('berechnet Festbetrag-Rabatt korrekt', () => {
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', 50000),
      ];

      const noDiscount = calculateTotal(positions, 0, true);
      const with50Euro = calculateTotal(positions, 0, true, { type: 'fixed', value: 50 });

      expect(with50Euro.discountAmount).toBe(50);
      expect(with50Euro.subtotalNet).toBe(noDiscount.subtotalNet - 50);
    });

    it('begrenzt Rabatt auf maximale Summe', () => {
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', 10000),
      ];

      const posCalc = calculatePosition(positions[0]);
      const excessiveDiscount = calculateTotal(positions, 0, false, { type: 'fixed', value: 10000 });

      expect(excessiveDiscount.discountAmount).toBe(posCalc.totalNet);
      expect(excessiveDiscount.subtotalNet).toBe(0);
      expect(excessiveDiscount.totalGross).toBe(0);
    });
  });

  describe('Szenario 6: Auslagenpauschale', () => {
    it('wendet 20%-Regel an', () => {
      const position = createPositionFromPreset('Einkommensteuererklärung', 5000, {
        applyExpenseFee: true,
      });

      const calc = calculatePosition(position);
      
      // Bei kleinen Beträgen unter 100€: 20% der adjustedFee, aber max 20€
      // 5000€ Gegenstandswert ergibt adjustedFee > 100€, daher greift das 20€-Maximum
      expect(calc.expenseFee).toBeLessThanOrEqual(20);
    });

    it('begrenzt auf 20€ Maximum', () => {
      const position = createPositionFromPreset('Einkommensteuererklärung', 100000, {
        applyExpenseFee: true,
      });

      const calc = calculatePosition(position);
      
      // Bei großen Beträgen: max. 20€
      expect(calc.expenseFee).toBe(20);
    });
  });

  describe('Szenario 7: MwSt.-Berechnung', () => {
    it('berechnet 19% MwSt. nach Rabattabzug', () => {
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', 50000),
      ];

      const total = calculateTotal(positions, 12, true, { type: 'percentage', value: 10 });

      // MwSt. wird auf (Positionen + Dokumentenpauschale - Rabatt) berechnet
      const expectedVat = total.subtotalNet * 0.19;
      expect(total.vatAmount).toBeCloseTo(expectedVat, 2);
    });

    it('keine MwSt. bei Kleinunternehmer', () => {
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', 50000),
      ];

      const total = calculateTotal(positions, 0, false);

      expect(total.vatAmount).toBe(0);
      expect(total.totalGross).toBe(total.subtotalNet);
    });
  });

  describe('Szenario 8: Dokumentenpauschale', () => {
    it('addiert Dokumentenpauschale korrekt', () => {
      const positions: Position[] = [
        createPositionFromPreset('Einkommensteuererklärung', 30000),
      ];

      const posCalc = calculatePosition(positions[0]);
      const total = calculateTotal(positions, 15.50, true);

      expect(total.positionsTotal).toBe(posCalc.totalNet);
      expect(total.documentFee).toBe(15.50);
      expect(total.subtotalNet).toBe(posCalc.totalNet + 15.50);
    });
  });
});

describe('Wizard E2E: Randfall-Tests', () => {
  it('handhabt leere Positionsliste', () => {
    const total = calculateTotal([], 12, true);

    expect(total.positionsTotal).toBe(0);
    expect(total.documentFee).toBe(12);
    expect(total.vatAmount).toBeCloseTo(2.28, 2);
    expect(total.totalGross).toBeCloseTo(14.28, 2);
  });

  it('handhabt Position mit 0 Gegenstandswert', () => {
    const position: Position = {
      id: 'test',
      activity: 'Test',
      description: '',
      objectValue: 0,
      tenthRate: { numerator: 6, denominator: 10 },
      quantity: 1,
      feeTable: 'A',
      applyExpenseFee: true,
      billingType: 'objectValue',
      hourlyRate: 0,
      hours: 0,
      flatRate: 0,
    };

    const calc = calculatePosition(position);

    expect(calc.baseFee).toBe(0);
    expect(calc.adjustedFee).toBe(0);
    expect(calc.expenseFee).toBe(0);
    expect(calc.totalNet).toBe(0);
  });

  it('handhabt sehr kleine Werte (Cent-Genauigkeit)', () => {
    const position: Position = {
      id: 'test',
      activity: 'Test',
      description: '',
      objectValue: 0,
      tenthRate: { numerator: 10, denominator: 10 },
      quantity: 1,
      feeTable: 'A',
      applyExpenseFee: false,
      billingType: 'flatRate',
      hourlyRate: 0,
      hours: 0,
      flatRate: 0.01,
    };

    const calc = calculatePosition(position);

    expect(calc.totalNet).toBe(0.01);
  });
});
