/**
 * Document Number Generator Utility
 * Centralized utility for generating invoice/quote numbers
 * @module utils/documentNumber
 */

import { STORAGE_KEYS } from '@/constants';

/**
 * Generates the next document number for quotes or invoices.
 * 
 * @param type - Document type: 'quote' or 'invoice'
 * @param increment - If true, increments and persists the counter
 * @returns Formatted document number (e.g., "RE-1001" or "AG-1001")
 */
export function getNextDocumentNumber(type: 'quote' | 'invoice', increment = false): string {
  const counterKey = STORAGE_KEYS.INVOICE_COUNTER;
  const counter = parseInt(localStorage.getItem(counterKey) || '1000', 10);
  const nextCounter = increment ? counter + 1 : counter;
  const prefix = type === 'invoice' ? 'RE' : 'AG';
  
  if (increment) {
    localStorage.setItem(counterKey, nextCounter.toString());
  }
  
  return `${prefix}-${nextCounter}`;
}

/**
 * Resets the document counter to a specific value.
 * Useful for initialization or testing.
 * 
 * @param value - New counter value
 */
export function resetDocumentCounter(value: number = 1000): void {
  localStorage.setItem(STORAGE_KEYS.INVOICE_COUNTER, value.toString());
}

/**
 * Gets the current counter value without incrementing.
 * 
 * @returns Current counter value
 */
export function getCurrentDocumentCounter(): number {
  return parseInt(localStorage.getItem(STORAGE_KEYS.INVOICE_COUNTER) || '1000', 10);
}
