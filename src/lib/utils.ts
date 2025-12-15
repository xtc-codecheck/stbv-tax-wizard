import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatiert einen Betrag im deutschen Währungsformat (1.234,56 €)
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('de-DE', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  }) + ' €';
}
