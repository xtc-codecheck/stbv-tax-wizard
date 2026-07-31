
import { FeeTableEntry } from "@/types/stbvv";

/**
 * StBVV-Gebührentabellen (Anlagen 1 bis 4)
 * Rechtsstand: StBVV zuletzt geändert durch Art. 5 V v. 19.12.2025 (BGBl. 2025 I Nr. 372);
 * Tabellen A–D: BGBl. 2025 I Nr. 105.
 *
 * WICHTIG: Das Gesetz formuliert "Gegenstandswert bis … Euro", die Obergrenze ist also
 * EINGESCHLOSSEN. Die Tabelleneinträge werden deshalb über `maxValue` (inklusiv) gesucht.
 */

// StBVV Gebührentabelle A - Beratungstabelle (2025)
export const feeTableA: FeeTableEntry[] = [
  { minValue: 0, maxValue: 300, fee: 31 },
  { minValue: 300, maxValue: 600, fee: 56 },
  { minValue: 600, maxValue: 900, fee: 81 },
  { minValue: 900, maxValue: 1200, fee: 106 },
  { minValue: 1200, maxValue: 1500, fee: 130 },
  { minValue: 1500, maxValue: 2000, fee: 166 },
  { minValue: 2000, maxValue: 2500, fee: 200 },
  { minValue: 2500, maxValue: 3000, fee: 235 },
  { minValue: 3000, maxValue: 3500, fee: 270 },
  { minValue: 3500, maxValue: 4000, fee: 305 },
  { minValue: 4000, maxValue: 4500, fee: 340 },
  { minValue: 4500, maxValue: 5000, fee: 375 },
  { minValue: 5000, maxValue: 6000, fee: 422 },
  { minValue: 6000, maxValue: 7000, fee: 467 },
  { minValue: 7000, maxValue: 8000, fee: 514 },
  { minValue: 8000, maxValue: 9000, fee: 560 },
  { minValue: 9000, maxValue: 10000, fee: 605 },
  { minValue: 10000, maxValue: 13000, fee: 655 },
  { minValue: 13000, maxValue: 16000, fee: 705 },
  { minValue: 16000, maxValue: 19000, fee: 755 },
  { minValue: 19000, maxValue: 22000, fee: 805 },
  { minValue: 22000, maxValue: 25000, fee: 854 },
  { minValue: 25000, maxValue: 30000, fee: 946 },
  { minValue: 30000, maxValue: 35000, fee: 1036 },
  { minValue: 35000, maxValue: 40000, fee: 1125 },
  { minValue: 40000, maxValue: 45000, fee: 1215 },
  { minValue: 45000, maxValue: 50000, fee: 1304 },
  { minValue: 50000, maxValue: 65000, fee: 1399 },
  { minValue: 65000, maxValue: 80000, fee: 1496 },
  { minValue: 80000, maxValue: 95000, fee: 1592 },
  { minValue: 95000, maxValue: 110000, fee: 1689 },
  { minValue: 110000, maxValue: 125000, fee: 1784 },
  { minValue: 125000, maxValue: 140000, fee: 1879 },
  { minValue: 140000, maxValue: 155000, fee: 1976 },
  { minValue: 155000, maxValue: 170000, fee: 2071 },
  { minValue: 170000, maxValue: 185000, fee: 2168 },
  { minValue: 185000, maxValue: 200000, fee: 2264 },
  { minValue: 200000, maxValue: 230000, fee: 2412 },
  { minValue: 230000, maxValue: 260000, fee: 2559 },
  { minValue: 260000, maxValue: 290000, fee: 2705 },
  { minValue: 290000, maxValue: 320000, fee: 2859 },
  { minValue: 320000, maxValue: 350000, fee: 2926 },
  { minValue: 350000, maxValue: 380000, fee: 2990 },
  { minValue: 380000, maxValue: 410000, fee: 3055 },
  { minValue: 410000, maxValue: 440000, fee: 3115 },
  { minValue: 440000, maxValue: 470000, fee: 3175 },
  { minValue: 470000, maxValue: 500000, fee: 3234 },
  { minValue: 500000, maxValue: 550000, fee: 3320 },
  { minValue: 550000, maxValue: 600000, fee: 3404 },
];

// StBVV Gebührentabelle B - Abschlusstabelle (2025)
export const feeTableB: FeeTableEntry[] = [
  { minValue: 0, maxValue: 3000, fee: 49 },
  { minValue: 3000, maxValue: 3500, fee: 57 },
  { minValue: 3500, maxValue: 4000, fee: 68 },
  { minValue: 4000, maxValue: 4500, fee: 76 },
  { minValue: 4500, maxValue: 5000, fee: 86 },
  { minValue: 5000, maxValue: 6000, fee: 96 },
  { minValue: 6000, maxValue: 7000, fee: 105 },
  { minValue: 7000, maxValue: 8000, fee: 116 },
  { minValue: 8000, maxValue: 9000, fee: 121 },
  { minValue: 9000, maxValue: 10000, fee: 127 },
  { minValue: 10000, maxValue: 12500, fee: 134 },
  { minValue: 12500, maxValue: 15000, fee: 151 },
  { minValue: 15000, maxValue: 17500, fee: 166 },
  { minValue: 17500, maxValue: 20000, fee: 178 },
  { minValue: 20000, maxValue: 22500, fee: 191 },
  { minValue: 22500, maxValue: 25000, fee: 201 },
  { minValue: 25000, maxValue: 37500, fee: 215 },
  { minValue: 37500, maxValue: 50000, fee: 263 },
  { minValue: 50000, maxValue: 62500, fee: 303 },
  { minValue: 62500, maxValue: 75000, fee: 338 },
  { minValue: 75000, maxValue: 87500, fee: 353 },
  { minValue: 87500, maxValue: 100000, fee: 369 },
  { minValue: 100000, maxValue: 125000, fee: 423 },
  { minValue: 125000, maxValue: 150000, fee: 471 },
  { minValue: 150000, maxValue: 175000, fee: 512 },
  { minValue: 175000, maxValue: 200000, fee: 548 },
  { minValue: 200000, maxValue: 225000, fee: 582 },
  { minValue: 225000, maxValue: 250000, fee: 613 },
  { minValue: 250000, maxValue: 300000, fee: 641 },
  { minValue: 300000, maxValue: 350000, fee: 696 },
  { minValue: 350000, maxValue: 400000, fee: 746 },
  { minValue: 400000, maxValue: 450000, fee: 791 },
  { minValue: 450000, maxValue: 500000, fee: 832 },
  { minValue: 500000, maxValue: 625000, fee: 871 },
  { minValue: 625000, maxValue: 750000, fee: 968 },
  { minValue: 750000, maxValue: 875000, fee: 1050 },
  { minValue: 875000, maxValue: 1000000, fee: 1126 },
  { minValue: 1000000, maxValue: 1250000, fee: 1194 },
  { minValue: 1250000, maxValue: 1500000, fee: 1324 },
  { minValue: 1500000, maxValue: 1750000, fee: 1438 },
  { minValue: 1750000, maxValue: 2000000, fee: 1542 },
  { minValue: 2000000, maxValue: 2250000, fee: 1635 },
  { minValue: 2250000, maxValue: 2500000, fee: 1718 },
  { minValue: 2500000, maxValue: 3000000, fee: 1797 },
  { minValue: 3000000, maxValue: 3500000, fee: 1951 },
  { minValue: 3500000, maxValue: 4000000, fee: 2089 },
  { minValue: 4000000, maxValue: 4500000, fee: 2214 },
  { minValue: 4500000, maxValue: 5000000, fee: 2328 },
  { minValue: 5000000, maxValue: 7500000, fee: 2720 },
  { minValue: 7500000, maxValue: 10000000, fee: 3162 },
  { minValue: 10000000, maxValue: 12500000, fee: 3520 },
  { minValue: 12500000, maxValue: 15000000, fee: 3819 },
  { minValue: 15000000, maxValue: 17500000, fee: 4074 },
  { minValue: 17500000, maxValue: 20000000, fee: 4293 },
  { minValue: 20000000, maxValue: 22500000, fee: 4573 },
  { minValue: 22500000, maxValue: 25000000, fee: 4831 },
  { minValue: 25000000, maxValue: 30000000, fee: 5315 },
  { minValue: 30000000, maxValue: 35000000, fee: 5759 },
  { minValue: 35000000, maxValue: 40000000, fee: 6172 },
  { minValue: 40000000, maxValue: 45000000, fee: 6558 },
  { minValue: 45000000, maxValue: 50000000, fee: 6923 },
];

// StBVV Gebührentabelle C - Buchführungstabelle (2025)
export const feeTableC: FeeTableEntry[] = [
  { minValue: 0, maxValue: 15000, fee: 72 },
  { minValue: 15000, maxValue: 17500, fee: 80 },
  { minValue: 17500, maxValue: 20000, fee: 88 },
  { minValue: 20000, maxValue: 22500, fee: 93 },
  { minValue: 22500, maxValue: 25000, fee: 101 },
  { minValue: 25000, maxValue: 30000, fee: 108 },
  { minValue: 30000, maxValue: 35000, fee: 117 },
  { minValue: 35000, maxValue: 40000, fee: 122 },
  { minValue: 40000, maxValue: 45000, fee: 129 },
  { minValue: 45000, maxValue: 50000, fee: 138 },
  { minValue: 50000, maxValue: 62500, fee: 145 },
  { minValue: 62500, maxValue: 75000, fee: 158 },
  { minValue: 75000, maxValue: 87500, fee: 174 },
  { minValue: 87500, maxValue: 100000, fee: 188 },
  { minValue: 100000, maxValue: 125000, fee: 209 },
  { minValue: 125000, maxValue: 150000, fee: 230 },
  { minValue: 150000, maxValue: 200000, fee: 275 },
  { minValue: 200000, maxValue: 250000, fee: 317 },
  { minValue: 250000, maxValue: 300000, fee: 359 },
  { minValue: 300000, maxValue: 350000, fee: 404 },
  { minValue: 350000, maxValue: 400000, fee: 441 },
  { minValue: 400000, maxValue: 450000, fee: 475 },
  { minValue: 450000, maxValue: 500000, fee: 512 },
];

// StBVV Gebührentabelle D - Landwirtschaftstabelle (2025)
// Teil a - Betriebsfläche (Hektar)
export const feeTableD: FeeTableEntry[] = [
  { minValue: 0, maxValue: 40, fee: 369 },
  { minValue: 40, maxValue: 45, fee: 395 },
  { minValue: 45, maxValue: 50, fee: 420 },
  { minValue: 50, maxValue: 55, fee: 444 },
  { minValue: 55, maxValue: 60, fee: 467 },
  { minValue: 60, maxValue: 65, fee: 489 },
  { minValue: 65, maxValue: 70, fee: 508 },
  { minValue: 70, maxValue: 75, fee: 527 },
  { minValue: 75, maxValue: 80, fee: 545 },
  { minValue: 80, maxValue: 85, fee: 562 },
  { minValue: 85, maxValue: 90, fee: 576 },
  { minValue: 90, maxValue: 95, fee: 589 },
  { minValue: 95, maxValue: 100, fee: 601 },
  { minValue: 100, maxValue: 110, fee: 631 },
  { minValue: 110, maxValue: 120, fee: 659 },
  { minValue: 120, maxValue: 130, fee: 687 },
  { minValue: 130, maxValue: 140, fee: 714 },
  { minValue: 140, maxValue: 150, fee: 742 },
  { minValue: 150, maxValue: 160, fee: 769 },
  { minValue: 160, maxValue: 170, fee: 793 },
  { minValue: 170, maxValue: 180, fee: 818 },
  { minValue: 180, maxValue: 190, fee: 842 },
  { minValue: 190, maxValue: 200, fee: 865 },
  { minValue: 200, maxValue: 210, fee: 888 },
  { minValue: 210, maxValue: 220, fee: 911 },
  { minValue: 220, maxValue: 230, fee: 932 },
  { minValue: 230, maxValue: 240, fee: 952 },
  { minValue: 240, maxValue: 250, fee: 972 },
  { minValue: 250, maxValue: 260, fee: 992 },
  { minValue: 260, maxValue: 270, fee: 1011 },
  { minValue: 270, maxValue: 280, fee: 1028 },
  { minValue: 280, maxValue: 290, fee: 1046 },
  { minValue: 290, maxValue: 300, fee: 1062 },
  { minValue: 300, maxValue: 320, fee: 1097 },
  { minValue: 320, maxValue: 340, fee: 1131 },
  { minValue: 340, maxValue: 360, fee: 1166 },
  { minValue: 360, maxValue: 380, fee: 1198 },
  { minValue: 380, maxValue: 400, fee: 1229 },
  { minValue: 400, maxValue: 420, fee: 1262 },
  { minValue: 420, maxValue: 440, fee: 1293 },
  { minValue: 440, maxValue: 460, fee: 1323 },
  { minValue: 460, maxValue: 480, fee: 1352 },
  { minValue: 480, maxValue: 500, fee: 1379 },
  { minValue: 500, maxValue: 520, fee: 1409 },
  { minValue: 520, maxValue: 540, fee: 1436 },
  { minValue: 540, maxValue: 560, fee: 1463 },
  { minValue: 560, maxValue: 580, fee: 1488 },
  { minValue: 580, maxValue: 600, fee: 1515 },
  { minValue: 600, maxValue: 620, fee: 1540 },
  { minValue: 620, maxValue: 640, fee: 1564 },
  { minValue: 640, maxValue: 660, fee: 1587 },
  { minValue: 660, maxValue: 680, fee: 1610 },
  { minValue: 680, maxValue: 700, fee: 1630 },
  { minValue: 700, maxValue: 750, fee: 1681 },
  { minValue: 750, maxValue: 800, fee: 1726 },
  { minValue: 800, maxValue: 850, fee: 1764 },
  { minValue: 850, maxValue: 900, fee: 1797 },
  { minValue: 900, maxValue: 950, fee: 1822 },
  { minValue: 950, maxValue: 1000, fee: 1843 },
];

/** Teil a - Alias für bessere Lesbarkeit */
export const feeTableDPartA = feeTableD;

// Teil b - Jahresumsatz im Sinne von § 39 Abs. 5 StBVV
export const feeTableDPartB: FeeTableEntry[] = [
  { minValue: 0, maxValue: 40000, fee: 384 },
  { minValue: 40000, maxValue: 42500, fee: 403 },
  { minValue: 42500, maxValue: 45000, fee: 422 },
  { minValue: 45000, maxValue: 47500, fee: 442 },
  { minValue: 47500, maxValue: 50000, fee: 459 },
  { minValue: 50000, maxValue: 55000, fee: 497 },
  { minValue: 55000, maxValue: 60000, fee: 533 },
  { minValue: 60000, maxValue: 65000, fee: 571 },
  { minValue: 65000, maxValue: 70000, fee: 605 },
  { minValue: 70000, maxValue: 75000, fee: 642 },
  { minValue: 75000, maxValue: 80000, fee: 678 },
  { minValue: 80000, maxValue: 85000, fee: 713 },
  { minValue: 85000, maxValue: 90000, fee: 748 },
  { minValue: 90000, maxValue: 95000, fee: 782 },
  { minValue: 95000, maxValue: 100000, fee: 817 },
  { minValue: 100000, maxValue: 105000, fee: 850 },
  { minValue: 105000, maxValue: 110000, fee: 883 },
  { minValue: 110000, maxValue: 115000, fee: 918 },
  { minValue: 115000, maxValue: 120000, fee: 951 },
  { minValue: 120000, maxValue: 125000, fee: 983 },
  { minValue: 125000, maxValue: 130000, fee: 1017 },
  { minValue: 130000, maxValue: 135000, fee: 1048 },
  { minValue: 135000, maxValue: 140000, fee: 1081 },
  { minValue: 140000, maxValue: 145000, fee: 1114 },
  { minValue: 145000, maxValue: 150000, fee: 1146 },
  { minValue: 150000, maxValue: 155000, fee: 1178 },
  { minValue: 155000, maxValue: 160000, fee: 1209 },
  { minValue: 160000, maxValue: 165000, fee: 1242 },
  { minValue: 165000, maxValue: 170000, fee: 1273 },
  { minValue: 170000, maxValue: 175000, fee: 1304 },
  { minValue: 175000, maxValue: 180000, fee: 1336 },
  { minValue: 180000, maxValue: 185000, fee: 1366 },
  { minValue: 185000, maxValue: 190000, fee: 1397 },
  { minValue: 190000, maxValue: 195000, fee: 1428 },
  { minValue: 195000, maxValue: 200000, fee: 1459 },
  { minValue: 200000, maxValue: 205000, fee: 1490 },
  { minValue: 205000, maxValue: 210000, fee: 1520 },
  { minValue: 210000, maxValue: 215000, fee: 1550 },
  { minValue: 215000, maxValue: 220000, fee: 1580 },
  { minValue: 220000, maxValue: 225000, fee: 1611 },
  { minValue: 225000, maxValue: 230000, fee: 1640 },
  { minValue: 230000, maxValue: 235000, fee: 1670 },
  { minValue: 235000, maxValue: 240000, fee: 1699 },
  { minValue: 240000, maxValue: 245000, fee: 1728 },
  { minValue: 245000, maxValue: 250000, fee: 1755 },
  { minValue: 250000, maxValue: 255000, fee: 1785 },
  { minValue: 255000, maxValue: 260000, fee: 1815 },
  { minValue: 260000, maxValue: 265000, fee: 1842 },
  { minValue: 265000, maxValue: 270000, fee: 1871 },
  { minValue: 270000, maxValue: 275000, fee: 1898 },
  { minValue: 275000, maxValue: 280000, fee: 1926 },
  { minValue: 280000, maxValue: 285000, fee: 1953 },
  { minValue: 285000, maxValue: 290000, fee: 1980 },
  { minValue: 290000, maxValue: 295000, fee: 2008 },
  { minValue: 295000, maxValue: 300000, fee: 2034 },
  { minValue: 300000, maxValue: 305000, fee: 2060 },
  { minValue: 305000, maxValue: 310000, fee: 2086 },
  { minValue: 310000, maxValue: 315000, fee: 2110 },
  { minValue: 315000, maxValue: 320000, fee: 2136 },
  { minValue: 320000, maxValue: 325000, fee: 2160 },
  { minValue: 325000, maxValue: 330000, fee: 2186 },
  { minValue: 330000, maxValue: 335000, fee: 2209 },
  { minValue: 335000, maxValue: 340000, fee: 2233 },
  { minValue: 340000, maxValue: 345000, fee: 2257 },
  { minValue: 345000, maxValue: 350000, fee: 2278 },
  { minValue: 350000, maxValue: 355000, fee: 2302 },
  { minValue: 355000, maxValue: 360000, fee: 2325 },
  { minValue: 360000, maxValue: 365000, fee: 2346 },
  { minValue: 365000, maxValue: 370000, fee: 2368 },
  { minValue: 370000, maxValue: 375000, fee: 2390 },
  { minValue: 375000, maxValue: 380000, fee: 2404 },
  { minValue: 380000, maxValue: 385000, fee: 2432 },
  { minValue: 385000, maxValue: 390000, fee: 2452 },
  { minValue: 390000, maxValue: 395000, fee: 2472 },
  { minValue: 395000, maxValue: 400000, fee: 2492 },
  { minValue: 400000, maxValue: 410000, fee: 2531 },
  { minValue: 410000, maxValue: 420000, fee: 2569 },
  { minValue: 420000, maxValue: 430000, fee: 2609 },
  { minValue: 430000, maxValue: 440000, fee: 2645 },
  { minValue: 440000, maxValue: 450000, fee: 2682 },
  { minValue: 450000, maxValue: 460000, fee: 2718 },
  { minValue: 460000, maxValue: 470000, fee: 2752 },
  { minValue: 470000, maxValue: 480000, fee: 2787 },
  { minValue: 480000, maxValue: 490000, fee: 2817 },
  { minValue: 490000, maxValue: 500000, fee: 2848 },
];

export const getFeeTables = () => ({
  A: feeTableA,
  B: feeTableB,
  C: feeTableC,
  D: feeTableD
});

// ============== Degression oberhalb der letzten Tabellenstufe ==============

/** Anzahl angefangener Einheiten */
const startedUnits = (amount: number, unit: number): number =>
  amount <= 0 ? 0 : Math.ceil(amount / unit);

/** Betrag innerhalb einer Stufe (von..bis) */
const tierAmount = (value: number, from: number, to: number): number =>
  Math.max(0, Math.min(value, to) - from);

/** Tabelle A: Mehrbeträge über 600.000 € (149 / 112 / 88 € je angefangene 50.000 €) */
const extrapolateA = (value: number): number =>
  3404 +
  startedUnits(tierAmount(value, 600_000, 5_000_000), 50_000) * 149 +
  startedUnits(tierAmount(value, 5_000_000, 25_000_000), 50_000) * 112 +
  startedUnits(tierAmount(value, 25_000_000, Number.MAX_SAFE_INTEGER), 50_000) * 88;

/** Tabelle B: Mehrbeträge über 50 Mio. € (273 / 477 / 681 €) */
const extrapolateB = (value: number): number =>
  6923 +
  startedUnits(tierAmount(value, 50_000_000, 125_000_000), 5_000_000) * 273 +
  startedUnits(tierAmount(value, 125_000_000, 250_000_000), 12_500_000) * 477 +
  startedUnits(tierAmount(value, 250_000_000, Number.MAX_SAFE_INTEGER), 25_000_000) * 681;

/** Tabelle C: Mehrbetrag über 500.000 € (36 € je angefangene 50.000 €) */
const extrapolateC = (value: number): number =>
  512 + startedUnits(tierAmount(value, 500_000, Number.MAX_SAFE_INTEGER), 50_000) * 36;

/** Tabelle D Teil a: Zuschläge je Hektar über 1.000 ha */
const D_PART_A_STEPS: { upTo: number; perHectare: number }[] = [
  { upTo: 2000, perHectare: 1.69 },
  { upTo: 3000, perHectare: 1.53 },
  { upTo: 4000, perHectare: 1.38 },
  { upTo: 5000, perHectare: 1.22 },
  { upTo: 6000, perHectare: 1.07 },
  { upTo: 7000, perHectare: 0.92 },
  { upTo: 8000, perHectare: 0.76 },
  { upTo: 9000, perHectare: 0.6 },
  { upTo: 10000, perHectare: 0.46 },
  { upTo: 11000, perHectare: 0.3 },
  { upTo: 12000, perHectare: 0.16 },
  { upTo: Number.MAX_SAFE_INTEGER, perHectare: 0.16 },
];

const extrapolateDPartA = (hectares: number): number => {
  let fee = 1843;
  let from = 1000;
  for (const step of D_PART_A_STEPS) {
    fee += tierAmount(hectares, from, step.upTo) * step.perHectare;
    from = step.upTo;
    if (hectares <= step.upTo) break;
  }
  return Math.round(fee * 100) / 100;
};

/** Tabelle D Teil b: Mehrbetrag über 500.000 € (165 € je angefangene 50.000 €) */
const extrapolateDPartB = (value: number): number =>
  2848 + startedUnits(tierAmount(value, 500_000, Number.MAX_SAFE_INTEGER), 50_000) * 165;

/**
 * Ermittelt die volle Gebühr (10/10) aus einer Tabelle.
 * Obergrenzen sind inklusiv ("Gegenstandswert bis … Euro").
 */
const lookupFee = (
  table: FeeTableEntry[],
  value: number,
  extrapolate: (value: number) => number
): number => {
  if (value <= 0) return 0;
  const entry = table.find(e => value <= e.maxValue);
  if (entry) return entry.fee;
  return extrapolate(value);
};

/** Volle Gebühr (10/10) nach Tabelle A */
export const getFeeA = (value: number): number => lookupFee(feeTableA, value, extrapolateA);
/** Volle Gebühr (10/10) nach Tabelle B */
export const getFeeB = (value: number): number => lookupFee(feeTableB, value, extrapolateB);
/** Volle Gebühr (10/10) nach Tabelle C */
export const getFeeC = (value: number): number => lookupFee(feeTableC, value, extrapolateC);
/** Volle Gebühr (10/10) nach Tabelle D Teil a (Betriebsfläche in Hektar) */
export const getFeeDPartA = (hectares: number): number =>
  lookupFee(feeTableDPartA, hectares, extrapolateDPartA);
/** Volle Gebühr (10/10) nach Tabelle D Teil b (Jahresumsatz) */
export const getFeeDPartB = (revenue: number): number =>
  lookupFee(feeTableDPartB, revenue, extrapolateDPartB);

/**
 * Volle Gebühr nach Tabelle D gemäß § 39 Abs. 2/3 StBVV:
 * Summe der Gebühren nach Teil a (Betriebsfläche) und Teil b (Jahresumsatz).
 */
export const getFeeD = (hectares: number, annualRevenue = 0): number =>
  getFeeDPartA(hectares) + getFeeDPartB(annualRevenue);

/**
 * Zentrale Tabellenabfrage.
 * @param table Tabelle A–D
 * @param value Gegenstandswert (bei Tabelle D: Betriebsfläche in Hektar)
 * @param secondaryValue Nur Tabelle D: Jahresumsatz für Teil b
 */
export const getTableFee = (
  table: 'A' | 'B' | 'C' | 'D',
  value: number,
  secondaryValue = 0
): number => {
  switch (table) {
    case 'A': return getFeeA(value);
    case 'B': return getFeeB(value);
    case 'C': return getFeeC(value);
    case 'D': return getFeeD(value, secondaryValue);
    default: return 0;
  }
};
