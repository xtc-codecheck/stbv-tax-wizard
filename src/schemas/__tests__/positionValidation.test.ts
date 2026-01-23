/**
 * Tests für erweiterte Positions-Validierung (Phase 2)
 * @module schemas/__tests__/positionValidation
 */

import { describe, it, expect } from 'vitest';
import {
  validatePosition,
  validateField,
  getMinObjectValue,
  ValidatedPosition,
} from '../positionValidation.schema';
import { MIN_OBJECT_VALUES } from '@/constants';

// ============== Hilfsfunktionen ==============

const createValidPosition = (overrides: Partial<ValidatedPosition> = {}): ValidatedPosition => ({
  id: 'test-id',
  activity: 'Einkommensteuererklärung',
  description: null,
  objectValue: 35000,
  tenthRate: { numerator: 6, denominator: 10 },
  quantity: 1,
  feeTable: 'A',
  applyExpenseFee: false,
  billingType: 'objectValue',
  hourlyRate: null,
  hours: null,
  flatRate: null,
  ...overrides,
});

// ============== Basis-Validierung ==============

describe('validatePosition - Basis-Validierung', () => {
  it('akzeptiert eine vollständig ausgefüllte Position', () => {
    const position = createValidPosition();
    const result = validatePosition(position);
    
    expect(result.isValid).toBe(true);
    expect(result.hasErrors).toBe(false);
  });

  it('meldet Fehler bei fehlender Aktivität', () => {
    const position = createValidPosition({ activity: '' });
    const result = validatePosition(position);
    
    expect(result.hasErrors).toBe(true);
    expect(result.issues.some(i => i.code === 'ACTIVITY_REQUIRED')).toBe(true);
  });

  it('meldet Fehler bei fehlendem Gegenstandswert', () => {
    const position = createValidPosition({ objectValue: 0 });
    const result = validatePosition(position);
    
    expect(result.hasErrors).toBe(true);
    expect(result.issues.some(i => i.code === 'OBJECT_VALUE_REQUIRED')).toBe(true);
  });

  it('meldet Fehler bei fehlender Menge', () => {
    const position = createValidPosition({ quantity: 0 });
    const result = validatePosition(position);
    
    expect(result.hasErrors).toBe(true);
    expect(result.issues.some(i => i.code === 'QUANTITY_INVALID')).toBe(true);
  });
});

// ============== Abrechnungsart-spezifische Validierung ==============

describe('validatePosition - Stundensatz-Abrechnung', () => {
  it('meldet Fehler bei fehlendem Stundensatz', () => {
    const position = createValidPosition({
      billingType: 'hourly',
      hourlyRate: 0,
      hours: 2,
    });
    const result = validatePosition(position);
    
    expect(result.hasErrors).toBe(true);
    expect(result.issues.some(i => i.code === 'HOURLY_RATE_REQUIRED')).toBe(true);
  });

  it('meldet Fehler bei fehlenden Stunden', () => {
    const position = createValidPosition({
      billingType: 'hourly',
      hourlyRate: 115,
      hours: 0,
    });
    const result = validatePosition(position);
    
    expect(result.hasErrors).toBe(true);
    expect(result.issues.some(i => i.code === 'HOURS_REQUIRED')).toBe(true);
  });

  it('warnt bei Stundensatz unter Minimum (66€)', () => {
    const position = createValidPosition({
      billingType: 'hourly',
      hourlyRate: 50,
      hours: 1,
    });
    const result = validatePosition(position);
    
    expect(result.hasWarnings).toBe(true);
    expect(result.issues.some(i => i.code === 'BELOW_MIN_HOURLY_RATE')).toBe(true);
  });

  it('warnt bei Stundensatz über Maximum (164€)', () => {
    const position = createValidPosition({
      billingType: 'hourly',
      hourlyRate: 200,
      hours: 1,
    });
    const result = validatePosition(position);
    
    expect(result.hasWarnings).toBe(true);
    expect(result.issues.some(i => i.code === 'ABOVE_MAX_HOURLY_RATE')).toBe(true);
  });

  it('akzeptiert gültigen Stundensatz (115€)', () => {
    const position = createValidPosition({
      billingType: 'hourly',
      hourlyRate: 115,
      hours: 1,
    });
    const result = validatePosition(position);
    
    expect(result.isValid).toBe(true);
  });
});

describe('validatePosition - Pauschale-Abrechnung', () => {
  it('meldet Fehler bei fehlender Pauschale', () => {
    const position = createValidPosition({
      billingType: 'flatRate',
      flatRate: 0,
    });
    const result = validatePosition(position);
    
    expect(result.hasErrors).toBe(true);
    expect(result.issues.some(i => i.code === 'FLAT_RATE_REQUIRED')).toBe(true);
  });

  it('akzeptiert gültige Pauschale', () => {
    const position = createValidPosition({
      billingType: 'flatRate',
      flatRate: 100,
    });
    const result = validatePosition(position);
    
    expect(result.isValid).toBe(true);
  });
});

// ============== Mindestgegenstandswert-Validierung ==============

describe('Mindestgegenstandswert-Validierung', () => {
  it('warnt bei Unterschreitung des Mindestgegenstandswerts für EÜR', () => {
    const position = createValidPosition({
      activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)',
      objectValue: 10000, // Unter 17.500€
      feeTable: 'B',
      tenthRate: { numerator: 17.5, denominator: 10 },
    });
    const result = validatePosition(position);
    
    expect(result.hasWarnings).toBe(true);
    expect(result.issues.some(i => i.code === 'BELOW_MIN_OBJECT_VALUE')).toBe(true);
  });

  it('akzeptiert Gegenstandswert über Minimum für EÜR', () => {
    const position = createValidPosition({
      activity: 'Anlage EÜR (Einnahmen-Überschuss-Rechnung)',
      objectValue: 17500, // Genau am Minimum
      feeTable: 'B',
      tenthRate: { numerator: 17.5, denominator: 10 },
    });
    const result = validatePosition(position);
    
    expect(result.issues.some(i => i.code === 'BELOW_MIN_OBJECT_VALUE')).toBe(false);
  });

  it('warnt bei Unterschreitung für Buchführung (15.000€)', () => {
    const position = createValidPosition({
      activity: 'Buchführung (monatlich)',
      objectValue: 10000,
      feeTable: 'C',
      tenthRate: { numerator: 6.5, denominator: 10 },
    });
    const result = validatePosition(position);
    
    expect(result.hasWarnings).toBe(true);
    expect(result.issues.some(i => i.code === 'BELOW_MIN_OBJECT_VALUE')).toBe(true);
  });

  it('warnt bei Unterschreitung für Körperschaftsteuer (16.000€)', () => {
    const position = createValidPosition({
      activity: 'Körperschaftsteuererklärung',
      objectValue: 15000,
      tenthRate: { numerator: 5, denominator: 10 },
    });
    const result = validatePosition(position);
    
    expect(result.hasWarnings).toBe(true);
  });
});

// ============== getMinObjectValue ==============

describe('getMinObjectValue', () => {
  it('gibt korrekten Wert für Einkommensteuererklärung zurück', () => {
    expect(getMinObjectValue('Einkommensteuererklärung')).toBe(MIN_OBJECT_VALUES.EINKOMMENSTEUER);
  });

  it('gibt korrekten Wert für EÜR zurück', () => {
    expect(getMinObjectValue('Anlage EÜR (Einnahmen-Überschuss-Rechnung)')).toBe(MIN_OBJECT_VALUES.EÜR);
  });

  it('gibt korrekten Wert für Buchführung zurück', () => {
    expect(getMinObjectValue('Buchführung (monatlich)')).toBe(MIN_OBJECT_VALUES.BUCHFÜHRUNG);
  });

  it('gibt 0 für unbekannte Aktivitäten zurück', () => {
    expect(getMinObjectValue('Unbekannte Aktivität')).toBe(0);
  });
});

// ============== Einzelfeld-Validierung ==============

describe('validateField', () => {
  it('meldet Fehler für leere Aktivität', () => {
    const issue = validateField('activity', '');
    expect(issue?.severity).toBe('error');
    expect(issue?.code).toBe('ACTIVITY_REQUIRED');
  });

  it('meldet Fehler für negativen Gegenstandswert', () => {
    const issue = validateField('objectValue', -100, { billingType: 'objectValue', activity: '' });
    expect(issue?.severity).toBe('error');
  });

  it('meldet Warnung bei Unterschreitung des Mindestgegenstandswerts', () => {
    const issue = validateField('objectValue', 5000, {
      billingType: 'objectValue',
      activity: 'Einkommensteuererklärung',
    });
    expect(issue?.severity).toBe('warning');
    expect(issue?.code).toBe('BELOW_MIN_OBJECT_VALUE');
  });

  it('gibt null zurück für gültigen Gegenstandswert', () => {
    const issue = validateField('objectValue', 35000, {
      billingType: 'objectValue',
      activity: 'Einkommensteuererklärung',
    });
    expect(issue).toBeNull();
  });

  it('meldet Fehler für ungültige Menge', () => {
    const issue = validateField('quantity', 0);
    expect(issue?.severity).toBe('error');
    expect(issue?.code).toBe('QUANTITY_INVALID');
  });
});

// ============== Zehntel-/Zwanzigstelsatz ==============

describe('Zehntel-/Zwanzigstelsatz-Validierung', () => {
  it('meldet Fehler bei Satz <= 0', () => {
    const position = createValidPosition({
      tenthRate: { numerator: 0, denominator: 10 },
    });
    const result = validatePosition(position);
    
    expect(result.hasErrors).toBe(true);
    expect(result.issues.some(i => i.code === 'RATE_NUMERATOR_INVALID')).toBe(true);
  });

  it('informiert bei Zehntelsatz über 10/10', () => {
    const position = createValidPosition({
      tenthRate: { numerator: 15, denominator: 10 },
    });
    const result = validatePosition(position);
    
    expect(result.issues.some(i => i.code === 'RATE_ABOVE_FULL' && i.severity === 'info')).toBe(true);
  });

  it('informiert bei Zwanzigstelsatz über 20/20', () => {
    const position = createValidPosition({
      tenthRate: { numerator: 25, denominator: 20 },
    });
    const result = validatePosition(position);
    
    expect(result.issues.some(i => i.code === 'RATE_ABOVE_FULL' && i.severity === 'info')).toBe(true);
  });

  it('akzeptiert normale Zwanzigstelsätze', () => {
    const position = createValidPosition({
      tenthRate: { numerator: 6.5, denominator: 20 },
    });
    const result = validatePosition(position);
    
    expect(result.issues.some(i => i.code === 'RATE_ABOVE_FULL')).toBe(false);
  });
});

// ============== Plausibilitätsprüfungen ==============

describe('Plausibilitätsprüfungen', () => {
  it('informiert bei hoher Menge (> 50)', () => {
    const position = createValidPosition({
      quantity: 100,
    });
    const result = validatePosition(position);
    
    expect(result.issues.some(i => i.code === 'QUANTITY_HIGH' && i.severity === 'info')).toBe(true);
  });

  it('akzeptiert normale Mengen', () => {
    const position = createValidPosition({
      quantity: 5,
    });
    const result = validatePosition(position);
    
    expect(result.issues.some(i => i.code === 'QUANTITY_HIGH')).toBe(false);
  });
});
