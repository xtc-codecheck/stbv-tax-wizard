
export interface Position {
  id: string;
  activity: string;
  objectValue: number;
  tenthRate: {
    numerator: number;
    denominator: number;
  };
  quantity: number;
  feeTable: 'A' | 'B' | 'C' | 'D';
  applyExpenseFee: boolean;
}

export interface FeeTableEntry {
  minValue: number;
  maxValue: number;
  fee: number;
}

export interface CalculationResult {
  baseFee: number;
  adjustedFee: number;
  expenseFee: number;
  totalNet: number;
}
