/**
 * Unit Tests für documentNumber.ts
 * Testet die Dokumentnummern-Generierung
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getNextDocumentNumber,
  resetDocumentCounter,
  getCurrentDocumentCounter,
} from '../documentNumber';
import { STORAGE_KEYS } from '@/constants';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    _getStore: () => store,
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('documentNumber', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('getNextDocumentNumber', () => {
    it('generiert Rechnungsnummer mit Präfix RE', () => {
      const number = getNextDocumentNumber('invoice');
      expect(number).toBe('RE-1000');
    });

    it('generiert Angebotsnummer mit Präfix AG', () => {
      const number = getNextDocumentNumber('quote');
      expect(number).toBe('AG-1000');
    });

    it('inkrementiert nicht ohne increment-Flag', () => {
      getNextDocumentNumber('invoice');
      getNextDocumentNumber('invoice');
      const number = getNextDocumentNumber('invoice');
      
      expect(number).toBe('RE-1000');
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });

    it('inkrementiert mit increment-Flag', () => {
      const first = getNextDocumentNumber('invoice', true);
      const second = getNextDocumentNumber('invoice', true);
      const third = getNextDocumentNumber('invoice', true);

      expect(first).toBe('RE-1001');
      expect(second).toBe('RE-1002');
      expect(third).toBe('RE-1003');
    });

    it('verwendet gespeicherten Zählerstand', () => {
      localStorageMock.setItem(STORAGE_KEYS.INVOICE_COUNTER, '2000');
      
      const number = getNextDocumentNumber('quote');
      expect(number).toBe('AG-2000');
    });
  });

  describe('resetDocumentCounter', () => {
    it('setzt Zähler auf Standardwert zurück', () => {
      localStorageMock.setItem(STORAGE_KEYS.INVOICE_COUNTER, '5000');
      
      resetDocumentCounter();
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.INVOICE_COUNTER,
        '1000'
      );
    });

    it('setzt Zähler auf spezifischen Wert', () => {
      resetDocumentCounter(500);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.INVOICE_COUNTER,
        '500'
      );
    });
  });

  describe('getCurrentDocumentCounter', () => {
    it('gibt Standardwert zurück wenn nicht gesetzt', () => {
      expect(getCurrentDocumentCounter()).toBe(1000);
    });

    it('gibt gespeicherten Wert zurück', () => {
      localStorageMock.setItem(STORAGE_KEYS.INVOICE_COUNTER, '3500');
      
      expect(getCurrentDocumentCounter()).toBe(3500);
    });
  });
});
