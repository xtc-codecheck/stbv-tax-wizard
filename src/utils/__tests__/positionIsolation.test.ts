/**
 * Regressionstests: Positions-Isolation, Vorlagen-Laden und Zehntel-Logik
 * @module utils/__tests__/positionIsolation
 *
 * Diese Tests sichern ab, dass
 *  - das Laden einer Vorlage bestehende Positionen nicht löscht,
 *  - Änderungen an einer Position keine andere Position verändern,
 *  - Änderungen am Zehntel-/Zwanzigstelsatz exakt in die Berechnung einfließen.
 */

import { describe, it, expect } from 'vitest';
import { Position } from '@/types/stbvv';
import { calculatePosition, calculateTotal } from '@/utils/stbvvCalculator';
import { getTableFee } from '@/utils/stbvvTables';

const makePosition = (overrides: Partial<Position> = {}): Position => ({
  id: overrides.id ?? 'pos-1',
  activity: 'Einkommensteuererklärung',
  description: '',
  objectValue: 50000,
  tenthRate: { numerator: 6, denominator: 10 },
  quantity: 1,
  feeTable: 'A',
  applyExpenseFee: false,
  billingType: 'objectValue',
  hourlyRate: 0,
  hours: 0,
  flatRate: 0,
  ...overrides,
});

/** Spiegelt updatePosition aus Index.tsx (Patch-basiert, funktionales Update) */
const applyPatch = (positions: Position[], id: string, patch: Partial<Position>): Position[] =>
  positions.map(pos => (pos.id === id ? { ...pos, ...patch } : pos));

/** Spiegelt applyTemplate aus Index.tsx */
const applyTemplate = (
  positions: Position[],
  templatePositions: Position[],
  mode: 'append' | 'replace'
): Position[] => {
  const fresh = templatePositions.map((pos, index) => ({ ...pos, id: `pos-tpl-${index}-${Date.now()}` }));
  return mode === 'append' ? [...positions, ...fresh] : fresh;
};

describe('Vorlagen laden', () => {
  const template = [
    makePosition({ id: 't1', activity: 'Anlage KAP', objectValue: 12000 }),
    makePosition({ id: 't2', activity: 'Anlage N', objectValue: 30000 }),
  ];

  it('behält bestehende Positionen im Hinzufügen-Modus', () => {
    const existing = [makePosition({ id: 'a', objectValue: 75000 })];
    const result = applyTemplate(existing, template, 'append');

    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('a');
    expect(result[0].objectValue).toBe(75000);
  });

  it('vergibt frische IDs, sodass keine Kollisionen entstehen', () => {
    const existing = [makePosition({ id: 't1', objectValue: 99000 })];
    const result = applyTemplate(existing, template, 'append');
    const ids = result.map(p => p.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(result[0].objectValue).toBe(99000);
  });

  it('ersetzt nur im expliziten Ersetzen-Modus', () => {
    const existing = [makePosition({ id: 'a' })];
    const result = applyTemplate(existing, template, 'replace');

    expect(result).toHaveLength(2);
    expect(result.some(p => p.id === 'a')).toBe(false);
  });

  it('summiert nach dem Hinzufügen additiv', () => {
    const existing = [makePosition({ id: 'a', objectValue: 50000 })];
    const before = calculateTotal(existing, 0, false, null).positionsTotal;
    const after = calculateTotal(applyTemplate(existing, template, 'append'), 0, false, null).positionsTotal;
    const templateOnly = calculateTotal(template, 0, false, null).positionsTotal;

    expect(after).toBeCloseTo(before + templateOnly, 2);
  });
});

describe('Positions-Isolation', () => {
  const positions = [
    makePosition({ id: 'p1', objectValue: 25000, tenthRate: { numerator: 4, denominator: 10 } }),
    makePosition({ id: 'p2', objectValue: 50000, tenthRate: { numerator: 6, denominator: 10 } }),
    makePosition({ id: 'p3', objectValue: 100000, tenthRate: { numerator: 8, denominator: 10 } }),
  ];

  it('ändert bei einem Patch ausschließlich die Zielposition', () => {
    const result = applyPatch(positions, 'p2', { objectValue: 80000 });

    expect(result[0]).toEqual(positions[0]);
    expect(result[2]).toEqual(positions[2]);
    expect(result[1].objectValue).toBe(80000);
    expect(result[1].tenthRate).toEqual({ numerator: 6, denominator: 10 });
  });

  it('lässt beim Hinzufügen einer Position alle Werte unverändert', () => {
    const edited = applyPatch(positions, 'p1', { objectValue: 30000 });
    const withNew = [...edited, makePosition({ id: 'p4', objectValue: 0, activity: '' })];

    expect(withNew[0].objectValue).toBe(30000);
    expect(withNew[1]).toEqual(positions[1]);
    expect(withNew[2]).toEqual(positions[2]);
  });

  it('verändert die Gesamtsumme nur um den Beitrag der geänderten Position', () => {
    const before = calculateTotal(positions, 0, false, null).positionsTotal;
    const edited = applyPatch(positions, 'p3', { tenthRate: { numerator: 10, denominator: 10 } });
    const after = calculateTotal(edited, 0, false, null).positionsTotal;

    const deltaExpected =
      calculatePosition(edited[2]).totalNet - calculatePosition(positions[2]).totalNet;

    expect(after - before).toBeCloseTo(deltaExpected, 2);
  });
});

describe('Zehntel-/Zwanzigstelsatz-Berechnung', () => {
  it('rechnet 4,5/10 korrekt aus der Tabellengebühr', () => {
    const pos = makePosition({ objectValue: 50000, tenthRate: { numerator: 4.5, denominator: 10 } });
    const tableFee = getTableFee('A', 50000);

    expect(calculatePosition(pos).adjustedFee).toBeCloseTo(
      Math.round(Math.round(tableFee * 100) * 4.5 / 10) / 100,
      2
    );
  });

  it('rechnet 8/20 (§ 27 StBVV) korrekt', () => {
    const pos = makePosition({
      activity: 'Anlage KAP',
      objectValue: 20000,
      tenthRate: { numerator: 8, denominator: 20 },
    });
    const tableFee = getTableFee('A', 20000);

    expect(calculatePosition(pos).adjustedFee).toBeCloseTo(
      Math.round(Math.round(tableFee * 100) * 8 / 20) / 100,
      2
    );
  });

  it('skaliert linear mit dem Zähler', () => {
    const base = calculatePosition(
      makePosition({ tenthRate: { numerator: 5, denominator: 10 } })
    ).adjustedFee;
    const doubled = calculatePosition(
      makePosition({ tenthRate: { numerator: 10, denominator: 10 } })
    ).adjustedFee;

    expect(doubled).toBeCloseTo(base * 2, 1);
  });

  it('behält den Nenner 20 bei einer reinen Zähler-Änderung', () => {
    const positions = [makePosition({ id: 'p1', tenthRate: { numerator: 6, denominator: 20 } })];
    const patched = applyPatch(positions, 'p1', {
      tenthRate: { numerator: 9, denominator: positions[0].tenthRate.denominator },
    });

    expect(patched[0].tenthRate).toEqual({ numerator: 9, denominator: 20 });
  });
});
