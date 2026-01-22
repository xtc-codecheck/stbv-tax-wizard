/**
 * Cent-basierte Integer-Arithmetik für exakte Finanzberechnungen
 * @module utils/centArithmetic
 * 
 * Alle internen Berechnungen erfolgen in Cent (Integer), um
 * Floating-Point-Rundungsfehler zu vermeiden.
 */

// ============== Konvertierung ==============

/**
 * Konvertiert Euro-Betrag in Cent (Integer)
 * Rundet auf die nächste ganze Zahl
 */
export const euroToCent = (euro: number): number => {
  return Math.round(euro * 100);
};

/**
 * Konvertiert Cent (Integer) zurück in Euro
 */
export const centToEuro = (cent: number): number => {
  return cent / 100;
};

// ============== Grundoperationen ==============

/**
 * Addiert zwei Cent-Beträge
 */
export const addCent = (a: number, b: number): number => {
  return a + b;
};

/**
 * Subtrahiert Cent-Beträge (a - b)
 */
export const subtractCent = (a: number, b: number): number => {
  return a - b;
};

/**
 * Multipliziert Cent-Betrag mit einem Faktor
 * Rundet das Ergebnis auf ganze Cent
 */
export const multiplyCent = (cent: number, factor: number): number => {
  return Math.round(cent * factor);
};

/**
 * Berechnet einen Prozentsatz von einem Cent-Betrag
 * z.B. percentOfCent(10000, 19) = 1900 (19% von 100€)
 */
export const percentOfCent = (cent: number, percent: number): number => {
  return Math.round((cent * percent) / 100);
};

/**
 * Wendet einen Zehntel- oder Zwanzigstelsatz an
 * z.B. applyRate(10000, 6, 10) = 6000 (6/10 von 100€)
 */
export const applyRate = (cent: number, numerator: number, denominator: number): number => {
  return Math.round((cent * numerator) / denominator);
};

/**
 * Berechnet Minimum von zwei Cent-Beträgen
 */
export const minCent = (a: number, b: number): number => {
  return Math.min(a, b);
};

/**
 * Summiert ein Array von Cent-Beträgen
 */
export const sumCent = (amounts: number[]): number => {
  return amounts.reduce((sum, amount) => sum + amount, 0);
};

// ============== Formatierung ==============

/**
 * Formatiert Cent-Betrag als Euro-String im deutschen Format
 * z.B. 123456 -> "1.234,56 €"
 */
export const formatCentAsEuro = (cent: number): string => {
  const euro = centToEuro(cent);
  return euro.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €';
};

/**
 * Formatiert Euro-Betrag im deutschen Format
 * z.B. 1234.56 -> "1.234,56 €"
 */
export const formatEuro = (euro: number): string => {
  return euro.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €';
};

// ============== Validierung ==============

/**
 * Prüft, ob ein Wert ein valider Cent-Betrag ist (nicht-negative Ganzzahl)
 */
export const isValidCent = (value: number): boolean => {
  return Number.isInteger(value) && value >= 0;
};

/**
 * Säubert einen Euro-Betrag für die Berechnung
 * - Ersetzt undefined/null/NaN mit 0
 * - Stellt sicher, dass der Wert nicht negativ ist
 */
export const sanitizeEuro = (value: number | undefined | null): number => {
  if (value === undefined || value === null || isNaN(value)) {
    return 0;
  }
  return Math.max(0, value);
};

// ============== Berechnungsergebnis-Typen ==============

export interface CentCalculationResult {
  baseFeeCent: number;
  adjustedFeeCent: number;
  expenseFeeCent: number;
  totalNetCent: number;
}

export interface CentTotalResult {
  positionsTotalCent: number;
  documentFeeCent: number;
  discountAmountCent: number;
  subtotalNetCent: number;
  vatAmountCent: number;
  totalGrossCent: number;
}

/**
 * Konvertiert CentCalculationResult zu Euro-Werten
 */
export const centResultToEuro = (result: CentCalculationResult) => ({
  baseFee: centToEuro(result.baseFeeCent),
  adjustedFee: centToEuro(result.adjustedFeeCent),
  expenseFee: centToEuro(result.expenseFeeCent),
  totalNet: centToEuro(result.totalNetCent),
});

/**
 * Konvertiert CentTotalResult zu Euro-Werten
 */
export const centTotalToEuro = (result: CentTotalResult) => ({
  positionsTotal: centToEuro(result.positionsTotalCent),
  documentFee: centToEuro(result.documentFeeCent),
  discountAmount: centToEuro(result.discountAmountCent),
  subtotalNet: centToEuro(result.subtotalNetCent),
  vatAmount: centToEuro(result.vatAmountCent),
  totalGross: centToEuro(result.totalGrossCent),
});
