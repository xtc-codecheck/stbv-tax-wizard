import { Position, CalculationResult } from "@/types/stbvv";
import { getFeeTables } from "./stbvvTables";
import { VAT_RATE, EXPENSE_FEE_RATE, EXPENSE_FEE_MAX } from "./constants";

export const calculatePosition = (position: Position): CalculationResult => {
  let baseFee = 0;
  let adjustedFee = 0;

  switch (position.billingType) {
    case 'hourly':
      adjustedFee = (position.hourlyRate || 0) * (position.hours || 0);
      baseFee = adjustedFee;
      break;
      
    case 'flatRate':
      adjustedFee = position.flatRate || 0;
      baseFee = adjustedFee;
      break;
      
    case 'objectValue':
    default:
      if (!position.objectValue || position.objectValue <= 0) {
        return {
          baseFee: 0,
          adjustedFee: 0,
          expenseFee: 0,
          totalNet: 0
        };
      }

      const feeTables = getFeeTables();
      const table = feeTables[position.feeTable];
      
      // Find the appropriate fee from the table
      const tableEntry = table.find(entry => 
        position.objectValue >= entry.minValue && 
        position.objectValue < entry.maxValue
      );
      
      baseFee = tableEntry ? tableEntry.fee : table[table.length - 1].fee;
      
      // Apply rate (tenth or twentieth)
      adjustedFee = baseFee * (position.tenthRate.numerator / position.tenthRate.denominator);
      break;
  }
  
  // Calculate expense fee
  const expenseFee = position.applyExpenseFee 
    ? Math.min(adjustedFee * EXPENSE_FEE_RATE, EXPENSE_FEE_MAX) 
    : 0;
  
  const totalNet = adjustedFee + expenseFee;

  return {
    baseFee,
    adjustedFee,
    expenseFee,
    totalNet
  };
};

export const calculateTotal = (
  positions: Position[], 
  documentFee: number, 
  includeVAT: boolean
) => {
  const positionsTotal = positions.reduce((total, position) => {
    const calculation = calculatePosition(position);
    return total + (calculation.totalNet * position.quantity);
  }, 0);

  const subtotalNet = positionsTotal + documentFee;
  const vatAmount = includeVAT ? subtotalNet * VAT_RATE : 0;
  const totalGross = subtotalNet + vatAmount;

  return {
    positionsTotal,
    documentFee,
    subtotalNet,
    vatAmount,
    totalGross
  };
};
