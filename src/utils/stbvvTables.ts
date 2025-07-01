
import { FeeTableEntry } from "@/types/stbvv";

// StBVV Gebührentabelle A - Erklärungen, Beratung
export const feeTableA: FeeTableEntry[] = [
  { minValue: 0, maxValue: 300, fee: 32 },
  { minValue: 300, maxValue: 600, fee: 65 },
  { minValue: 600, maxValue: 1200, fee: 130 },
  { minValue: 1200, maxValue: 2400, fee: 195 },
  { minValue: 2400, maxValue: 4800, fee: 260 },
  { minValue: 4800, maxValue: 9600, fee: 390 },
  { minValue: 9600, maxValue: 19200, fee: 560 },
  { minValue: 19200, maxValue: 38400, fee: 780 },
  { minValue: 38400, maxValue: 76800, fee: 1040 },
  { minValue: 76800, maxValue: 153600, fee: 1430 },
  { minValue: 153600, maxValue: 307200, fee: 1950 },
  { minValue: 307200, maxValue: 614400, fee: 2730 },
  { minValue: 614400, maxValue: 1228800, fee: 3900 },
  { minValue: 1228800, maxValue: 2457600, fee: 5850 },
  { minValue: 2457600, maxValue: 4915200, fee: 8190 },
  { minValue: 4915200, maxValue: 9830400, fee: 11700 },
  { minValue: 9830400, maxValue: 19660800, fee: 16900 },
  { minValue: 19660800, maxValue: 39321600, fee: 24700 },
  { minValue: 39321600, maxValue: 78643200, fee: 35100 },
  { minValue: 78643200, maxValue: Number.MAX_VALUE, fee: 50700 }
];

// StBVV Gebührentabelle B - Abschlüsse
export const feeTableB: FeeTableEntry[] = [
  { minValue: 0, maxValue: 3000, fee: 130 },
  { minValue: 3000, maxValue: 6000, fee: 195 },
  { minValue: 6000, maxValue: 12000, fee: 260 },
  { minValue: 12000, maxValue: 24000, fee: 390 },
  { minValue: 24000, maxValue: 48000, fee: 560 },
  { minValue: 48000, maxValue: 96000, fee: 780 },
  { minValue: 96000, maxValue: 192000, fee: 1040 },
  { minValue: 192000, maxValue: 384000, fee: 1430 },
  { minValue: 384000, maxValue: 768000, fee: 1950 },
  { minValue: 768000, maxValue: 1536000, fee: 2730 },
  { minValue: 1536000, maxValue: 3072000, fee: 3900 },
  { minValue: 3072000, maxValue: 6144000, fee: 5850 },
  { minValue: 6144000, maxValue: 12288000, fee: 8190 },
  { minValue: 12288000, maxValue: 24576000, fee: 11700 },
  { minValue: 24576000, maxValue: 49152000, fee: 16900 },
  { minValue: 49152000, maxValue: 98304000, fee: 24700 },
  { minValue: 98304000, maxValue: 196608000, fee: 35100 },
  { minValue: 196608000, maxValue: Number.MAX_VALUE, fee: 50700 }
];

// StBVV Gebührentabelle C - Buchführung
export const feeTableC: FeeTableEntry[] = [
  { minValue: 0, maxValue: 2500, fee: 32 },
  { minValue: 2500, maxValue: 5000, fee: 65 },
  { minValue: 5000, maxValue: 10000, fee: 130 },
  { minValue: 10000, maxValue: 20000, fee: 195 },
  { minValue: 20000, maxValue: 40000, fee: 260 },
  { minValue: 40000, maxValue: 80000, fee: 390 },
  { minValue: 80000, maxValue: 160000, fee: 560 },
  { minValue: 160000, maxValue: 320000, fee: 780 },
  { minValue: 320000, maxValue: 640000, fee: 1040 },
  { minValue: 640000, maxValue: 1280000, fee: 1430 },
  { minValue: 1280000, maxValue: 2560000, fee: 1950 },
  { minValue: 2560000, maxValue: 5120000, fee: 2730 },
  { minValue: 5120000, maxValue: 10240000, fee: 3900 },
  { minValue: 10240000, maxValue: 20480000, fee: 5850 },
  { minValue: 20480000, maxValue: 40960000, fee: 8190 },
  { minValue: 40960000, maxValue: 81920000, fee: 11700 },
  { minValue: 81920000, maxValue: 163840000, fee: 16900 },
  { minValue: 163840000, maxValue: 327680000, fee: 24700 },
  { minValue: 327680000, maxValue: Number.MAX_VALUE, fee: 35100 }
];

// StBVV Gebührentabelle D - Landwirtschaft
export const feeTableD: FeeTableEntry[] = [
  { minValue: 0, maxValue: 1500, fee: 32 },
  { minValue: 1500, maxValue: 3000, fee: 65 },
  { minValue: 3000, maxValue: 6000, fee: 130 },
  { minValue: 6000, maxValue: 12000, fee: 195 },
  { minValue: 12000, maxValue: 24000, fee: 260 },
  { minValue: 24000, maxValue: 48000, fee: 390 },
  { minValue: 48000, maxValue: 96000, fee: 560 },
  { minValue: 96000, maxValue: 192000, fee: 780 },
  { minValue: 192000, maxValue: 384000, fee: 1040 },
  { minValue: 384000, maxValue: 768000, fee: 1430 },
  { minValue: 768000, maxValue: 1536000, fee: 1950 },
  { minValue: 1536000, maxValue: 3072000, fee: 2730 },
  { minValue: 3072000, maxValue: 6144000, fee: 3900 },
  { minValue: 6144000, maxValue: 12288000, fee: 5850 },
  { minValue: 12288000, maxValue: 24576000, fee: 8190 },
  { minValue: 24576000, maxValue: 49152000, fee: 11700 },
  { minValue: 49152000, maxValue: 98304000, fee: 16900 },
  { minValue: 98304000, maxValue: 196608000, fee: 24700 },
  { minValue: 196608000, maxValue: Number.MAX_VALUE, fee: 35100 }
];

export const getFeeTables = () => ({
  A: feeTableA,
  B: feeTableB,
  C: feeTableC,
  D: feeTableD
});
