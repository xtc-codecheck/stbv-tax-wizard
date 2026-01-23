/**
 * Golden Reference Tests (Phase 1.3)
 * @module utils/__tests__/goldenReference
 * 
 * Vollständige Rechnungsszenarien mit manuell berechneten Sollwerten
 * zur Verifizierung der Berechnungslogik.
 * 
 * Jedes Szenario wurde händisch gegen StBVV 2025 berechnet und verifiziert.
 */

import { describe, it, expect } from 'vitest';
import { calculatePosition, calculateTotal, calculatePositionInCent, calculateTotalInCent } from '../stbvvCalculator';
import { Position } from '@/types/stbvv';
import { centToEuro } from '../centArithmetic';

// ============== Hilfsfunktionen ==============

const createPosition = (overrides: Partial<Position> = {}): Position => ({
  id: 'test-position',
  activity: 'Testposition',
  description: '',
  objectValue: 0,
  tenthRate: { numerator: 10, denominator: 10 },
  quantity: 1,
  feeTable: 'A',
  applyExpenseFee: false,
  billingType: 'objectValue',
  ...overrides,
});

/**
 * Rundet auf 2 Dezimalstellen (kaufmännisch)
 */
const roundToEuro = (value: number): number => {
  return Math.round(value * 100) / 100;
};

// ============== Szenario 1: Einkommensteuer Freiberufler ==============

describe('Szenario 1: Einkommensteuer Freiberufler', () => {
  /**
   * Szenario: Freiberufler mit Einkommensteuererklärung und EÜR
   * 
   * Position 1: Einkommensteuererklärung
   *   - Gegenstandswert: 35.000 €
   *   - Tabelle A, 6/10 (§ 24 Abs. 1 Nr. 1)
   *   - Tabelle A bei 35.000€: 1.036 € (Vollgebühr)
   *   - 6/10: 1.036 * 0,6 = 621,60 €
   *   - Mit Auslagenpauschale (20%, max 20€): 621,60 + 20 = 641,60 €
   * 
   * Position 2: Anlage EÜR
   *   - Gegenstandswert: 25.000 €
   *   - Tabelle B, 17,5/10 (§ 25)
   *   - Tabelle B bei 25.000€: 215 € (Vollgebühr)
   *   - 17,5/10: 215 * 1,75 = 376,25 €
   *   - Mit Auslagenpauschale: 376,25 + 20 = 396,25 €
   * 
   * Summe Positionen: 641,60 + 396,25 = 1.037,85 €
   * Dokumentenpauschale: 12 €
   * Netto: 1.049,85 €
   * MwSt (19%): 199,47 €
   * Brutto: 1.249,32 €
   */

  const positions: Position[] = [
    createPosition({
      id: 'est-1',
      activity: 'Einkommensteuererklärung',
      objectValue: 35000,
      tenthRate: { numerator: 6, denominator: 10 },
      feeTable: 'A',
      applyExpenseFee: true,
    }),
    createPosition({
      id: 'eur-1',
      activity: 'Anlage EÜR',
      objectValue: 25000,
      tenthRate: { numerator: 17.5, denominator: 10 },
      feeTable: 'B',
      applyExpenseFee: true,
    }),
  ];

  it('berechnet Position 1 (Einkommensteuererklärung) korrekt', () => {
    const result = calculatePosition(positions[0]);
    expect(result.baseFee).toBe(1036);
    expect(result.adjustedFee).toBe(621.6);
    expect(result.expenseFee).toBe(20); // Gedeckelt auf 20€
    expect(result.totalNet).toBe(641.6);
  });

  it('berechnet Position 2 (Anlage EÜR) korrekt', () => {
    const result = calculatePosition(positions[1]);
    expect(result.baseFee).toBe(215);
    expect(result.adjustedFee).toBe(376.25);
    expect(result.expenseFee).toBe(20); // Gedeckelt auf 20€
    expect(result.totalNet).toBe(396.25);
  });

  it('berechnet Gesamtsumme korrekt', () => {
    const totals = calculateTotal(positions, 12, true);
    expect(totals.positionsTotal).toBe(1037.85);
    expect(totals.documentFee).toBe(12);
    expect(totals.subtotalNet).toBe(1049.85);
    expect(roundToEuro(totals.vatAmount)).toBe(199.47);
    expect(roundToEuro(totals.totalGross)).toBe(1249.32);
  });
});

// ============== Szenario 2: GmbH Jahresabschluss ==============

describe('Szenario 2: GmbH Jahresabschluss', () => {
  /**
   * Szenario: GmbH mit Jahresabschluss, Körperschaftsteuer, Gewerbesteuer
   * 
   * Position 1: Jahresabschluss GmbH
   *   - Gegenstandswert: 150.000 €
   *   - Tabelle B, 25/10 (§ 35)
   *   - Tabelle B bei 150.000€: 512 € (Vollgebühr)
   *   - 25/10: 512 * 2,5 = 1.280 €
   *   - Ohne Auslagenpauschale
   * 
   * Position 2: Körperschaftsteuererklärung
   *   - Gegenstandswert: 150.000 €
   *   - Tabelle A, 5/10 (§ 24 Abs. 1 Nr. 3)
   *   - Tabelle A bei 150.000€: 1.976 € (Vollgebühr)
   *   - 5/10: 1.976 * 0,5 = 988 €
   *   - Mit Auslagenpauschale: 988 + 20 = 1.008 €
   * 
   * Position 3: Gewerbesteuererklärung
   *   - Gegenstandswert: 150.000 €
   *   - Tabelle A, 3,5/10 (§ 24 Abs. 1 Nr. 5)
   *   - Tabelle A bei 150.000€: 1.976 € (Vollgebühr)
   *   - 3,5/10: 1.976 * 0,35 = 691,60 €
   *   - Mit Auslagenpauschale: 691,60 + 20 = 711,60 €
   * 
   * Summe Positionen: 1.280 + 1.008 + 711,60 = 2.999,60 €
   * Dokumentenpauschale: 15 €
   * Netto: 3.014,60 €
   * MwSt (19%): 572,77 €
   * Brutto: 3.587,37 €
   */

  const positions: Position[] = [
    createPosition({
      id: 'ja-1',
      activity: 'Jahresabschluss GmbH',
      objectValue: 150000,
      tenthRate: { numerator: 25, denominator: 10 },
      feeTable: 'B',
      applyExpenseFee: false,
    }),
    createPosition({
      id: 'kst-1',
      activity: 'Körperschaftsteuererklärung',
      objectValue: 150000,
      tenthRate: { numerator: 5, denominator: 10 },
      feeTable: 'A',
      applyExpenseFee: true,
    }),
    createPosition({
      id: 'gewst-1',
      activity: 'Gewerbesteuererklärung',
      objectValue: 150000,
      tenthRate: { numerator: 3.5, denominator: 10 },
      feeTable: 'A',
      applyExpenseFee: true,
    }),
  ];

  it('berechnet Jahresabschluss GmbH korrekt', () => {
    const result = calculatePosition(positions[0]);
    expect(result.baseFee).toBe(512);
    expect(result.adjustedFee).toBe(1280);
    expect(result.expenseFee).toBe(0);
    expect(result.totalNet).toBe(1280);
  });

  it('berechnet Körperschaftsteuererklärung korrekt', () => {
    const result = calculatePosition(positions[1]);
    expect(result.baseFee).toBe(1976);
    expect(result.adjustedFee).toBe(988);
    expect(result.expenseFee).toBe(20);
    expect(result.totalNet).toBe(1008);
  });

  it('berechnet Gewerbesteuererklärung korrekt', () => {
    const result = calculatePosition(positions[2]);
    expect(result.baseFee).toBe(1976);
    expect(result.adjustedFee).toBe(691.6);
    expect(result.expenseFee).toBe(20);
    expect(result.totalNet).toBe(711.6);
  });

  it('berechnet Gesamtsumme korrekt', () => {
    const totals = calculateTotal(positions, 15, true);
    expect(totals.positionsTotal).toBe(2999.6);
    expect(totals.subtotalNet).toBe(3014.6);
    expect(roundToEuro(totals.vatAmount)).toBe(572.77);
    expect(roundToEuro(totals.totalGross)).toBe(3587.37);
  });
});

// ============== Szenario 3: Arbeitnehmer mit Anlagen ==============

describe('Szenario 3: Arbeitnehmer mit Anlagen (Zwanzigstelsätze)', () => {
  /**
   * Szenario: Arbeitnehmer mit Anlage N und Anlage V
   * 
   * Position 1: Einkommensteuer Mantelbogen
   *   - Gegenstandswert: 60.000 €
   *   - Tabelle A, 3,5/10 (§ 24 Abs. 1 Nr. 1)
   *   - Tabelle A bei 60.000€: 1.399 € (50.000-65.000)
   *   - 3,5/10: 1.399 * 0,35 = 489,65 €
   *   - Mit Auslagenpauschale: 489,65 + 20 = 509,65 €
   * 
   * Position 2: Anlage N (Zwanzigstelsatz!)
   *   - Gegenstandswert: 55.000 €
   *   - Tabelle A, 6,5/20 (§ 27) = 0,325
   *   - Tabelle A bei 55.000€: 1.399 €
   *   - 6,5/20: 1.399 * 0,325 = 454,68 €
   *   - Ohne Auslagenpauschale
   * 
   * Position 3: Anlage V (Zwanzigstelsatz!)
   *   - Gegenstandswert: 12.000 €
   *   - Tabelle A, 6,5/20 (§ 27) = 0,325
   *   - Tabelle A bei 12.000€: 655 €
   *   - 6,5/20: 655 * 0,325 = 212,88 €
   *   - Ohne Auslagenpauschale
   * 
   * Summe: 509,65 + 454,68 + 212,88 = 1.177,21 €
   */

  const positions: Position[] = [
    createPosition({
      id: 'est-m',
      activity: 'Einkommensteuer Mantelbogen',
      objectValue: 60000,
      tenthRate: { numerator: 3.5, denominator: 10 },
      feeTable: 'A',
      applyExpenseFee: true,
    }),
    createPosition({
      id: 'anlage-n',
      activity: 'Anlage N',
      objectValue: 55000,
      tenthRate: { numerator: 6.5, denominator: 20 }, // Zwanzigstelsatz!
      feeTable: 'A',
      applyExpenseFee: false,
    }),
    createPosition({
      id: 'anlage-v',
      activity: 'Anlage V',
      objectValue: 12000,
      tenthRate: { numerator: 6.5, denominator: 20 }, // Zwanzigstelsatz!
      feeTable: 'A',
      applyExpenseFee: false,
    }),
  ];

  it('berechnet Mantelbogen korrekt', () => {
    const result = calculatePosition(positions[0]);
    expect(result.baseFee).toBe(1399);
    expect(result.adjustedFee).toBe(489.65);
    expect(result.expenseFee).toBe(20);
    expect(result.totalNet).toBe(509.65);
  });

  it('berechnet Anlage N mit Zwanzigstelsatz korrekt', () => {
    const result = calculatePosition(positions[1]);
    expect(result.baseFee).toBe(1399);
    // 6,5/20 = 0,325
    expect(roundToEuro(result.adjustedFee)).toBe(454.68);
    expect(result.totalNet).toBe(roundToEuro(result.adjustedFee));
  });

  it('berechnet Anlage V mit Zwanzigstelsatz korrekt', () => {
    const result = calculatePosition(positions[2]);
    expect(result.baseFee).toBe(655);
    expect(roundToEuro(result.adjustedFee)).toBe(212.88);
  });

  it('berechnet Gesamtsumme korrekt', () => {
    const totals = calculateTotal(positions, 0, false); // Ohne MwSt für Netto-Vergleich
    expect(roundToEuro(totals.positionsTotal)).toBe(1177.21);
  });
});

// ============== Szenario 4: Zeitgebühr/Stundensatz ==============

describe('Szenario 4: Zeitgebühr (§ 13 StBVV)', () => {
  /**
   * Szenario: Prüfung Steuerbescheid (Stundensatz) + Erstberatung
   * 
   * Position 1: Prüfung Steuerbescheid
   *   - Stundensatz: 115 € (§ 13 StBVV ab 01.07.2025)
   *   - Stunden: 0,5
   *   - Gebühr: 115 * 0,5 = 57,50 €
   *   - Ohne Auslagenpauschale
   * 
   * Position 2: Erstberatung
   *   - Pauschal: 190 € (§ 21 StBVV)
   *   - Implementiert als: 190€ × 1h = 190 €
   *   - Ohne Auslagenpauschale
   * 
   * Summe: 57,50 + 190 = 247,50 €
   * MwSt (19%): 47,03 €
   * Brutto: 294,53 €
   */

  const positions: Position[] = [
    createPosition({
      id: 'pruef-1',
      activity: 'Prüfung Steuerbescheid',
      billingType: 'hourly',
      hourlyRate: 115,
      hours: 0.5,
      applyExpenseFee: false,
    }),
    createPosition({
      id: 'erst-1',
      activity: 'Erstberatung',
      billingType: 'hourly',
      hourlyRate: 190,
      hours: 1,
      applyExpenseFee: false,
    }),
  ];

  it('berechnet Prüfung Steuerbescheid korrekt', () => {
    const result = calculatePosition(positions[0]);
    expect(result.adjustedFee).toBe(57.5);
    expect(result.totalNet).toBe(57.5);
  });

  it('berechnet Erstberatung korrekt', () => {
    const result = calculatePosition(positions[1]);
    expect(result.adjustedFee).toBe(190);
    expect(result.totalNet).toBe(190);
  });

  it('berechnet Gesamtsumme mit MwSt korrekt', () => {
    const totals = calculateTotal(positions, 0, true);
    expect(totals.positionsTotal).toBe(247.5);
    expect(roundToEuro(totals.vatAmount)).toBe(47.03);
    expect(roundToEuro(totals.totalGross)).toBe(294.53);
  });
});

// ============== Szenario 5: Pauschalhonorar ==============

describe('Szenario 5: Pauschalhonorar (flatRate)', () => {
  /**
   * Szenario: Lohnabrechnung pro Arbeitnehmer (Pauschale)
   * 
   * Position: Lohnabrechnung
   *   - Pauschale: 15 € pro Arbeitnehmer
   *   - Menge: 5 Arbeitnehmer
   *   - Gebühr: 15 × 5 = 75 €
   *   - Mit Auslagenpauschale: 75 + 15 (20%) = 90 €
   */

  const positions: Position[] = [
    createPosition({
      id: 'lohn-1',
      activity: 'Lohnabrechnung',
      billingType: 'flatRate',
      flatRate: 15,
      quantity: 5,
      applyExpenseFee: true,
    }),
  ];

  it('berechnet Pauschale pro Stück korrekt', () => {
    const result = calculatePosition(positions[0]);
    expect(result.adjustedFee).toBe(15);
    expect(result.expenseFee).toBe(3); // 20% von 15€
    expect(result.totalNet).toBe(18);
  });

  it('multipliziert mit Quantity korrekt', () => {
    const totals = calculateTotal(positions, 0, false);
    // 18€ × 5 = 90€
    expect(totals.positionsTotal).toBe(90);
  });
});

// ============== Szenario 6: Rabatt-Berechnung ==============

describe('Szenario 6: Rabatt-Varianten', () => {
  const positions: Position[] = [
    createPosition({
      id: 'test-1',
      activity: 'Testposition',
      objectValue: 10000, // Tabelle A: 655€
      tenthRate: { numerator: 10, denominator: 10 }, // Volle Gebühr
      feeTable: 'A',
      applyExpenseFee: false,
    }),
  ];

  it('berechnet Prozent-Rabatt (10%) korrekt', () => {
    const totals = calculateTotal(positions, 0, false, { type: 'percentage', value: 10 });
    // 655€ - 10% = 655 - 65,50 = 589,50€
    expect(totals.discountAmount).toBe(65.5);
    expect(totals.subtotalNet).toBe(589.5);
  });

  it('berechnet Festbetrag-Rabatt (50€) korrekt', () => {
    const totals = calculateTotal(positions, 0, false, { type: 'fixed', value: 50 });
    expect(totals.discountAmount).toBe(50);
    expect(totals.subtotalNet).toBe(605);
  });

  it('Rabatt kann nicht größer als Zwischensumme sein', () => {
    const totals = calculateTotal(positions, 0, false, { type: 'fixed', value: 1000 });
    // Rabatt gedeckelt auf 655€
    expect(totals.discountAmount).toBe(655);
    expect(totals.subtotalNet).toBe(0);
  });
});

// ============== Szenario 7: Grenzwerte Auslagenpauschale ==============

describe('Szenario 7: Auslagenpauschale Grenzwerte', () => {
  it('Auslagenpauschale unter 20€ bleibt prozentual', () => {
    const position = createPosition({
      objectValue: 5000, // Tabelle A: 422€, 3/10 = 126,60€
      tenthRate: { numerator: 3, denominator: 10 },
      feeTable: 'A',
      applyExpenseFee: true,
    });
    
    const result = calculatePosition(position);
    // 20% von 126,60€ = 25,32€ → gedeckelt auf 20€
    expect(result.expenseFee).toBe(20);
  });

  it('Niedrige Gebühr: 20% bleibt unter 20€-Deckel', () => {
    const position = createPosition({
      objectValue: 300, // Tabelle A: 31€, 3/10 = 9,30€
      tenthRate: { numerator: 3, denominator: 10 },
      feeTable: 'A',
      applyExpenseFee: true,
    });
    
    const result = calculatePosition(position);
    // 20% von 9,30€ = 1,86€ (unter 20€ Deckel)
    expect(result.expenseFee).toBe(1.86);
  });

  it('Exakt an der 100€-Grenze (20% = 20€)', () => {
    // 100€ × 20% = 20€ (genau am Deckel)
    const position = createPosition({
      billingType: 'flatRate',
      flatRate: 100,
      applyExpenseFee: true,
    });
    
    const result = calculatePosition(position);
    expect(result.expenseFee).toBe(20);
  });
});

// ============== Szenario 8: Komplexe Rechnung (Stresstest) ==============

describe('Szenario 8: Komplexe Rechnung mit 10 Positionen', () => {
  /**
   * Stresstest mit gemischten Abrechnungsarten
   */

  const positions: Position[] = [
    // Gegenstandswert
    createPosition({ id: 'p1', objectValue: 35000, tenthRate: { numerator: 6, denominator: 10 }, feeTable: 'A', applyExpenseFee: true }),
    createPosition({ id: 'p2', objectValue: 25000, tenthRate: { numerator: 17.5, denominator: 10 }, feeTable: 'B', applyExpenseFee: true }),
    createPosition({ id: 'p3', objectValue: 50000, tenthRate: { numerator: 6.5, denominator: 20 }, feeTable: 'A', applyExpenseFee: false }),
    createPosition({ id: 'p4', objectValue: 100000, tenthRate: { numerator: 5, denominator: 10 }, feeTable: 'A', applyExpenseFee: true }),
    // Stundensatz
    createPosition({ id: 'p5', billingType: 'hourly', hourlyRate: 115, hours: 2, applyExpenseFee: false }),
    createPosition({ id: 'p6', billingType: 'hourly', hourlyRate: 150, hours: 0.5, applyExpenseFee: true }),
    // Pauschale
    createPosition({ id: 'p7', billingType: 'flatRate', flatRate: 25, quantity: 3, applyExpenseFee: false }),
    createPosition({ id: 'p8', billingType: 'flatRate', flatRate: 50, quantity: 1, applyExpenseFee: true }),
    // Weitere Gegenstandswerte
    createPosition({ id: 'p9', objectValue: 8000, tenthRate: { numerator: 3.5, denominator: 10 }, feeTable: 'A', applyExpenseFee: true }),
    createPosition({ id: 'p10', objectValue: 15000, tenthRate: { numerator: 6.5, denominator: 10 }, feeTable: 'C', applyExpenseFee: false }),
  ];

  it('alle Positionen werden berechnet', () => {
    positions.forEach(position => {
      const result = calculatePosition(position);
      expect(result.totalNet).toBeGreaterThanOrEqual(0);
    });
  });

  it('Gesamtsumme ist plausibel (> 2.000€)', () => {
    const totals = calculateTotal(positions, 20, true, { type: 'percentage', value: 5 });
    expect(totals.positionsTotal).toBeGreaterThan(2000);
    expect(totals.totalGross).toBeGreaterThan(totals.subtotalNet);
  });

  it('Cent-basierte Berechnung liefert ganzzahlige Werte', () => {
    const centTotals = calculateTotalInCent(positions, 20, true, { type: 'percentage', value: 5 });
    expect(Number.isInteger(centTotals.positionsTotalCent)).toBe(true);
    expect(Number.isInteger(centTotals.vatAmountCent)).toBe(true);
    expect(Number.isInteger(centTotals.totalGrossCent)).toBe(true);
  });
});

// ============== Szenario 9: Mindestgegenstandswerte ==============

describe('Szenario 9: Mindestgegenstandswerte prüfen', () => {
  it('EÜR mit Mindestwert 17.500€ berechnet korrekt', () => {
    const position = createPosition({
      activity: 'Anlage EÜR',
      objectValue: 17500, // Mindestgegenstandswert
      tenthRate: { numerator: 17.5, denominator: 10 },
      feeTable: 'B',
      applyExpenseFee: false,
    });
    
    const result = calculatePosition(position);
    // Tabelle B bei 17.500€: 178€
    // 17,5/10: 178 * 1,75 = 311,50€
    expect(result.baseFee).toBe(178);
    expect(result.adjustedFee).toBe(311.5);
  });

  it('Buchführung mit Mindestwert 15.000€ berechnet korrekt', () => {
    const position = createPosition({
      activity: 'Buchführung',
      objectValue: 15000,
      tenthRate: { numerator: 6.5, denominator: 10 },
      feeTable: 'C',
      applyExpenseFee: false,
    });
    
    const result = calculatePosition(position);
    // Tabelle C bei 15.000€: 80€
    // 6,5/10: 80 * 0,65 = 52€
    expect(result.baseFee).toBe(80);
    expect(result.adjustedFee).toBe(52);
  });
});

// ============== Szenario 10: Rundungspräzision ==============

describe('Szenario 10: Rundungspräzision (Floating-Point-Schutz)', () => {
  it('vermeidet 0,1 + 0,2 ≠ 0,3 Fehler', () => {
    // JavaScript: 0.1 + 0.2 = 0.30000000000000004
    const positions: Position[] = [
      createPosition({ billingType: 'flatRate', flatRate: 0.1 }),
      createPosition({ billingType: 'flatRate', flatRate: 0.2 }),
    ];
    
    const totals = calculateTotal(positions, 0, false);
    expect(totals.positionsTotal).toBe(0.3);
  });

  it('berechnet 33,33€ × 3 = 99,99€ korrekt', () => {
    const position = createPosition({
      billingType: 'flatRate',
      flatRate: 33.33,
      quantity: 3,
    });
    
    const totals = calculateTotal([position], 0, false);
    expect(totals.positionsTotal).toBe(99.99);
  });

  it('19% MwSt von 100€ = exakt 19€', () => {
    const position = createPosition({
      billingType: 'flatRate',
      flatRate: 100,
    });
    
    const totals = calculateTotal([position], 0, true);
    expect(totals.vatAmount).toBe(19);
    expect(totals.totalGross).toBe(119);
  });

  it('Cent-Berechnung bleibt über viele Operationen stabil', () => {
    const positions = Array.from({ length: 100 }, (_, i) => 
      createPosition({
        id: `p-${i}`,
        billingType: 'flatRate',
        flatRate: 1.11, // Kritischer Dezimalwert
      })
    );
    
    const totals = calculateTotal(positions, 0, true);
    // 100 × 1,11€ = 111,00€
    expect(totals.positionsTotal).toBe(111);
    // 19% von 111€ = 21,09€
    expect(totals.vatAmount).toBe(21.09);
    expect(totals.totalGross).toBe(132.09);
  });
});
