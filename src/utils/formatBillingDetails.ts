import { Position } from "@/types/stbvv";

/**
 * Formats billing details for a position based on its billing type
 * @param position - The position to format
 * @returns Formatted billing details string
 */
export const formatBillingDetails = (position: Position): string => {
  switch (position.billingType) {
    case 'hourly':
      return `${position.hourlyRate?.toFixed(2) || '0'} €/h × ${position.hours || '0'} h`;
    case 'flatRate':
      return `Pauschale: ${position.flatRate?.toFixed(2) || '0'} €`;
    case 'objectValue':
    default:
      return `${position.objectValue.toFixed(2)} € (Tab. ${position.feeTable}, ${position.tenthRate.numerator}/${position.tenthRate.denominator})`;
  }
};
