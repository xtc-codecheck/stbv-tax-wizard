import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatEuro } from "@/utils/centArithmetic"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatiert einen Betrag im deutschen Währungsformat (1.234,56 €).
 * SSOT: delegiert an `formatEuro` aus der Cent-Arithmetik.
 */
export function formatCurrency(value: number): string {
  return formatEuro(value);
}

