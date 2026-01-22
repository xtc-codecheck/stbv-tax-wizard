/**
 * Hook für das Dokumenten-Archiv
 * @module hooks/useDocumentArchive
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArchivedDocument, DocumentArchive, archivedDocumentSchema, documentArchiveSchema } from '@/schemas/archivedDocument.schema';
import { Position, ClientData, Discount } from '@/types/stbvv';
import { generateUniqueId } from '@/utils/idGenerator';

const STORAGE_KEY = 'stbvv_document_archive';
const MAX_ARCHIVED_DOCUMENTS = 500;

interface ArchiveDocumentParams {
  documentNumber: string;
  documentType: 'Angebot' | 'Rechnung';
  invoiceDate: Date;
  servicePeriod?: string;
  clientData: ClientData;
  positions: Position[];
  subtotalNet: number;
  documentFee: number;
  discount?: Discount;
  discountAmount?: number;
  vatAmount: number;
  totalGross: number;
  includeVAT: boolean;
  templateUsed?: string;
}

export interface MonthlyRevenue {
  month: string;
  monthLabel: string;
  revenue: number;
  count: number;
}

export interface TopClient {
  name: string;
  totalRevenue: number;
  documentCount: number;
  lastDocument: string;
}

export interface CategoryStats {
  category: string;
  revenue: number;
  count: number;
}

export function useDocumentArchive() {
  const [archive, setArchive] = useState<DocumentArchive>({
    version: 1,
    documents: [],
    lastUpdated: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load archive from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validated = documentArchiveSchema.safeParse(parsed);
        if (validated.success) {
          setArchive(validated.data);
        }
      }
    } catch (error) {
      console.error('Error loading document archive:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save archive to localStorage
  const saveArchive = useCallback((updatedArchive: DocumentArchive) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArchive));
      setArchive(updatedArchive);
    } catch (error) {
      console.error('Error saving document archive:', error);
    }
  }, []);

  // Archive a new document
  const archiveDocument = useCallback((params: ArchiveDocumentParams): ArchivedDocument => {
    const newDocument: ArchivedDocument = {
      id: generateUniqueId(),
      documentNumber: params.documentNumber,
      documentType: params.documentType,
      createdAt: new Date().toISOString(),
      invoiceDate: params.invoiceDate.toISOString().split('T')[0],
      servicePeriod: params.servicePeriod,
      clientData: params.clientData,
      positions: params.positions,
      subtotalNet: params.subtotalNet,
      documentFee: params.documentFee,
      discount: params.discount,
      discountAmount: params.discountAmount,
      vatAmount: params.vatAmount,
      totalGross: params.totalGross,
      includeVAT: params.includeVAT,
      templateUsed: params.templateUsed,
      exportedAsPdf: true,
    };

    // Validate
    archivedDocumentSchema.parse(newDocument);

    // Add to archive, keeping only last MAX documents
    const updatedDocuments = [newDocument, ...archive.documents].slice(0, MAX_ARCHIVED_DOCUMENTS);
    
    const updatedArchive: DocumentArchive = {
      version: 1,
      documents: updatedDocuments,
      lastUpdated: new Date().toISOString(),
    };

    saveArchive(updatedArchive);
    return newDocument;
  }, [archive.documents, saveArchive]);

  // Delete a document
  const deleteDocument = useCallback((id: string) => {
    const updatedDocuments = archive.documents.filter(doc => doc.id !== id);
    const updatedArchive: DocumentArchive = {
      ...archive,
      documents: updatedDocuments,
      lastUpdated: new Date().toISOString(),
    };
    saveArchive(updatedArchive);
  }, [archive, saveArchive]);

  // Get monthly revenue data for charts
  const monthlyRevenue = useMemo((): MonthlyRevenue[] => {
    const last12Months: MonthlyRevenue[] = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' });
      
      last12Months.push({
        month: monthKey,
        monthLabel,
        revenue: 0,
        count: 0,
      });
    }

    archive.documents
      .filter(doc => doc.documentType === 'Rechnung')
      .forEach(doc => {
        const docDate = new Date(doc.createdAt);
        const monthKey = `${docDate.getFullYear()}-${String(docDate.getMonth() + 1).padStart(2, '0')}`;
        const monthEntry = last12Months.find(m => m.month === monthKey);
        if (monthEntry) {
          monthEntry.revenue += doc.totalGross;
          monthEntry.count += 1;
        }
      });

    return last12Months;
  }, [archive.documents]);

  // Get top clients by revenue
  const topClients = useMemo((): TopClient[] => {
    const clientMap = new Map<string, TopClient>();
    
    archive.documents
      .filter(doc => doc.documentType === 'Rechnung')
      .forEach(doc => {
        const clientName = doc.clientData.name || 'Unbekannt';
        const existing = clientMap.get(clientName);
        
        if (existing) {
          existing.totalRevenue += doc.totalGross;
          existing.documentCount += 1;
          if (new Date(doc.createdAt) > new Date(existing.lastDocument)) {
            existing.lastDocument = doc.createdAt;
          }
        } else {
          clientMap.set(clientName, {
            name: clientName,
            totalRevenue: doc.totalGross,
            documentCount: 1,
            lastDocument: doc.createdAt,
          });
        }
      });

    return Array.from(clientMap.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 10);
  }, [archive.documents]);

  // Get statistics
  const stats = useMemo(() => {
    const invoices = archive.documents.filter(doc => doc.documentType === 'Rechnung');
    const offers = archive.documents.filter(doc => doc.documentType === 'Angebot');
    
    const totalRevenue = invoices.reduce((sum, doc) => sum + doc.totalGross, 0);
    const avgInvoiceValue = invoices.length > 0 ? totalRevenue / invoices.length : 0;
    
    // This month
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthInvoices = invoices.filter(doc => new Date(doc.createdAt) >= thisMonthStart);
    const thisMonthRevenue = thisMonthInvoices.reduce((sum, doc) => sum + doc.totalGross, 0);
    
    // Last month for comparison
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const lastMonthInvoices = invoices.filter(doc => {
      const docDate = new Date(doc.createdAt);
      return docDate >= lastMonthStart && docDate <= lastMonthEnd;
    });
    const lastMonthRevenue = lastMonthInvoices.reduce((sum, doc) => sum + doc.totalGross, 0);
    
    const revenueChange = lastMonthRevenue > 0 
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0;

    return {
      totalDocuments: archive.documents.length,
      totalInvoices: invoices.length,
      totalOffers: offers.length,
      totalRevenue,
      avgInvoiceValue,
      thisMonthRevenue,
      thisMonthInvoiceCount: thisMonthInvoices.length,
      revenueChange,
      uniqueClients: new Set(invoices.map(doc => doc.clientData.name)).size,
    };
  }, [archive.documents]);

  // Get recent documents
  const recentDocuments = useMemo(() => {
    return archive.documents.slice(0, 20);
  }, [archive.documents]);

  // Clear archive
  const clearArchive = useCallback(() => {
    const emptyArchive: DocumentArchive = {
      version: 1,
      documents: [],
      lastUpdated: new Date().toISOString(),
    };
    saveArchive(emptyArchive);
  }, [saveArchive]);

  return {
    archive,
    isLoading,
    archiveDocument,
    deleteDocument,
    clearArchive,
    monthlyRevenue,
    topClients,
    stats,
    recentDocuments,
  };
}
