/**
 * useDocumentExport - Hook für alle Dokumentexport-Funktionen
 * @module hooks/useDocumentExport
 */

import { useState, useCallback } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { Position, ClientData, Discount, BrandingSettings } from '@/types/stbvv';
import { calculateTotal } from '@/utils/stbvvCalculator';
import { loadBrandingSettings } from '@/utils/brandingStorage';
import { exportToCSV } from '@/utils/csvExporter';
import { getNextDocumentNumber } from '@/utils/documentNumber';
import { useDocumentArchive } from '@/hooks/useDocumentArchive';
import { usePDFPreview } from '@/hooks/usePDFPreview';

const emailSchema = z.string().email();

interface DocumentExportState {
  positions: Position[];
  documentFee: number;
  includeVAT: boolean;
  discount: Discount | null;
  documentType: 'quote' | 'invoice';
  clientData: ClientData;
  invoiceNumber: string;
  invoiceDate: Date;
  servicePeriod: string;
}

interface UseDocumentExportReturn {
  /** Generiert PDF direkt (ohne Preview) */
  handleGeneratePDF: () => Promise<void>;
  /** Öffnet PDF-Vorschau-Modal */
  handleOpenPDFPreview: () => Promise<void>;
  /** Schließt PDF-Vorschau */
  handleClosePDFPreview: () => void;
  /** Download aus der Vorschau */
  handleDownloadFromPreview: () => void;
  /** Exportiert als Excel */
  handleExportExcel: () => Promise<void>;
  /** Exportiert als CSV */
  handleExportCSV: () => void;
  /** Öffnet Druckansicht */
  handlePrint: () => void;
  /** Sendet E-Mail */
  handleSendEmail: () => void;
  /** PDF-Generierung läuft */
  isGeneratingPDF: boolean;
  /** Excel-Export läuft */
  isExportingExcel: boolean;
  /** Preview-Modal ist offen */
  showPDFPreview: boolean;
  /** Preview URL */
  previewUrl: string | null;
  /** Preview wird generiert */
  isGeneratingPreview: boolean;
  /** Preview-Fehler */
  previewError: string | null;
}

interface UseDocumentExportOptions extends DocumentExportState {
  validateBeforeGenerate: () => boolean;
}

/**
 * Hook für alle Dokumentexport-Funktionen (PDF, Excel, CSV, E-Mail, Druck)
 */
export function useDocumentExport({
  positions,
  documentFee,
  includeVAT,
  discount,
  documentType,
  clientData,
  invoiceNumber,
  invoiceDate,
  servicePeriod,
  validateBeforeGenerate,
}: UseDocumentExportOptions): UseDocumentExportReturn {
  
  // Loading states
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  // Document archive hook
  const { archiveDocument } = useDocumentArchive();

  // PDF Preview Hook
  const {
    previewUrl,
    isGenerating: isGeneratingPreview,
    error: previewError,
    generatePreview,
    clearPreview,
    downloadPDF,
  } = usePDFPreview();

  // Helper to archive document after export
  const archiveCurrentDocument = useCallback(() => {
    const totals = calculateTotal(positions, documentFee, includeVAT, discount);
    archiveDocument({
      documentNumber: invoiceNumber,
      documentType: documentType === 'invoice' ? 'Rechnung' : 'Angebot',
      invoiceDate,
      servicePeriod,
      clientData,
      positions,
      subtotalNet: totals.subtotalNet,
      documentFee,
      discount: discount || undefined,
      discountAmount: totals.discountAmount,
      vatAmount: totals.vatAmount,
      totalGross: totals.totalGross,
      includeVAT,
    });
  }, [positions, documentFee, includeVAT, discount, documentType, clientData, invoiceNumber, invoiceDate, servicePeriod, archiveDocument]);

  // Open PDF Preview Modal
  const handleOpenPDFPreview = useCallback(async () => {
    if (!validateBeforeGenerate()) return;
    
    const branding = loadBrandingSettings();
    setShowPDFPreview(true);
    
    await generatePreview({
      positions,
      documentFee,
      includeVAT,
      discount,
      documentType,
      clientData,
      invoiceNumber,
      invoiceDate,
      servicePeriod,
      branding,
    });
  }, [validateBeforeGenerate, positions, documentFee, includeVAT, discount, documentType, clientData, invoiceNumber, invoiceDate, servicePeriod, generatePreview]);

  // Close PDF Preview
  const handleClosePDFPreview = useCallback(() => {
    setShowPDFPreview(false);
    clearPreview();
  }, [clearPreview]);

  // Download from preview
  const handleDownloadFromPreview = useCallback(() => {
    getNextDocumentNumber(documentType, true);
    downloadPDF();
    archiveCurrentDocument();
    toast.success(`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} erfolgreich erstellt`);
  }, [documentType, downloadPDF, archiveCurrentDocument]);

  // Direct PDF generation (without preview)
  const handleGeneratePDF = useCallback(async () => {
    if (!validateBeforeGenerate()) return;
    setIsGeneratingPDF(true);
    
    try {
      getNextDocumentNumber(documentType, true);
      const branding = loadBrandingSettings();
      const { generatePDF } = await import('@/utils/pdfGenerator');
      
      generatePDF(
        positions,
        documentFee,
        includeVAT,
        discount,
        documentType,
        clientData,
        invoiceNumber,
        invoiceDate,
        servicePeriod,
        branding
      );
      
      archiveCurrentDocument();
      toast.success(`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} erfolgreich erstellt`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Fehler beim Erstellen der PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  }, [validateBeforeGenerate, positions, documentFee, includeVAT, discount, documentType, clientData, invoiceNumber, invoiceDate, servicePeriod, archiveCurrentDocument]);

  // Excel export
  const handleExportExcel = useCallback(async () => {
    if (positions.length === 0) {
      toast.error('Bitte fügen Sie mindestens eine Position hinzu');
      return;
    }
    
    setIsExportingExcel(true);
    try {
      const { exportToExcel } = await import('@/utils/excelExporter');
      exportToExcel(
        positions,
        documentFee,
        includeVAT,
        discount,
        documentType,
        clientData,
        invoiceNumber,
        invoiceDate,
        servicePeriod
      );
      toast.success('Excel-Datei erfolgreich erstellt');
    } catch (error) {
      console.error('Excel export failed:', error);
      toast.error('Fehler beim Exportieren der Excel-Datei');
    } finally {
      setIsExportingExcel(false);
    }
  }, [positions, documentFee, includeVAT, discount, documentType, clientData, invoiceNumber, invoiceDate, servicePeriod]);

  // CSV export
  const handleExportCSV = useCallback(() => {
    const brandingSettings = loadBrandingSettings();
    const totals = calculateTotal(positions, documentFee, includeVAT, discount);
    exportToCSV({ positions, totals, clientData, invoiceNumber, brandingSettings });
    toast.success('CSV-Export erfolgreich');
  }, [positions, documentFee, includeVAT, discount, clientData, invoiceNumber]);

  // Print
  const handlePrint = useCallback(() => {
    window.print();
    toast.success('Druckansicht geöffnet');
  }, []);

  // Send email
  const handleSendEmail = useCallback(() => {
    if (!clientData.email) {
      toast.error('Bitte geben Sie eine E-Mail-Adresse ein');
      return;
    }
    
    try {
      emailSchema.parse(clientData.email);
    } catch {
      toast.error('E-Mail-Adresse ist ungültig');
      return;
    }
    
    const calculatedTotals = calculateTotal(positions, documentFee, includeVAT, discount);
    const documentTitle = documentType === 'quote' ? 'Angebot' : 'Rechnung';
    const subject = encodeURIComponent(`${documentTitle} - Steuerberatervergütung`);
    const body = encodeURIComponent(`Sehr geehrte Damen und Herren,

anbei erhalten Sie unser${documentType === 'quote' ? ' Angebot' : 'e Rechnung'} über Steuerberatungsleistungen.

Gesamtsumme: ${calculatedTotals.totalGross.toFixed(2)} €

Mit freundlichen Grüßen`);
    
    window.location.href = `mailto:${clientData.email}?subject=${subject}&body=${body}`;
  }, [clientData.email, positions, documentFee, includeVAT, discount, documentType]);

  return {
    handleGeneratePDF,
    handleOpenPDFPreview,
    handleClosePDFPreview,
    handleDownloadFromPreview,
    handleExportExcel,
    handleExportCSV,
    handlePrint,
    handleSendEmail,
    isGeneratingPDF,
    isExportingExcel,
    showPDFPreview,
    previewUrl,
    isGeneratingPreview,
    previewError,
  };
}
