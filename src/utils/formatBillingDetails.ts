import { Position } from "@/types/stbvv";
import { formatCurrency } from "@/lib/utils";

/**
 * Formats billing details for a position based on its billing type
 * @param position - The position to format
 * @returns Formatted billing details string
 */
export const formatBillingDetails = (position: Position): string => {
  const formatValue = (value: number | undefined): string => {
    return (value ?? 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  switch (position.billingType) {
    case 'hourly':
      return `${formatValue(position.hourlyRate)} €/h × ${position.hours || '0'} h`;
    case 'flatRate':
      return `Pauschale: ${formatValue(position.flatRate)} €`;
    case 'objectValue':
    default:
      return `${formatValue(position.objectValue)} € (Tab. ${position.feeTable}, ${position.tenthRate.numerator}/${position.tenthRate.denominator})`;
  }
};
