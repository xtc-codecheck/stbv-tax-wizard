/**
 * DocumentTab - Types for multi-tab document management
 * @module types/documentTab
 */

import { Position, ClientData, Discount } from './stbvv';

export interface DocumentTabData {
  id: string;
  name: string;
  positions: Position[];
  clientData: ClientData;
  documentFee: number;
  includeVAT: boolean;
  discount: Discount | null;
  documentType: 'quote' | 'invoice';
  invoiceNumber: string;
  invoiceDate: string; // ISO string for storage
  servicePeriod: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentTabsState {
  tabs: DocumentTabData[];
  activeTabId: string;
}

export const createEmptyTabData = (id: string, name: string): DocumentTabData => ({
  id,
  name,
  positions: [],
  clientData: {
    name: '',
    street: '',
    postalCode: '',
    city: '',
    email: '',
  },
  documentFee: 0,
  includeVAT: true,
  discount: null,
  documentType: 'quote',
  invoiceNumber: '',
  invoiceDate: new Date().toISOString(),
  servicePeriod: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
