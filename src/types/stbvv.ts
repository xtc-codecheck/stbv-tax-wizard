
export interface Position {
  id: string;
  activity: string;
  description?: string;
  objectValue: number;
  tenthRate: {
    numerator: number;
    denominator: number;
  };
  quantity: number;
  feeTable: 'A' | 'B' | 'C' | 'D';
  applyExpenseFee: boolean;
  billingType: 'objectValue' | 'hourly' | 'flatRate';
  hourlyRate?: number;
  hours?: number;
  flatRate?: number;
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

export interface ActivityPreset {
  activity: string;
  defaultTenthRate: number;
  suggestedFeeTable: 'A' | 'B' | 'C' | 'D';
  legalBasis: string;
  rateType: 'tenth' | 'twentieth';
  minRate: number;
  maxRate: number;
}
