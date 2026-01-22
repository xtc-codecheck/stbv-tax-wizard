/**
 * usePDFPreview - Hook für PDF Live-Vorschau
 * @module hooks/usePDFPreview
 */

import { useState, useCallback, useEffect } from 'react';
import type { PDFGeneratorOptions } from '@/utils/pdfGenerator';

interface UsePDFPreviewReturn {
  previewUrl: string | null;
  isGenerating: boolean;
  error: string | null;
  generatePreview: (options: PDFGeneratorOptions) => Promise<void>;
  clearPreview: () => void;
  downloadPDF: () => void;
  pdfBlob: Blob | null;
}

export function usePDFPreview(): UsePDFPreviewReturn {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOptions, setCurrentOptions] = useState<PDFGeneratorOptions | null>(null);

  // Cleanup URL on unmount or when preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const generatePreview = useCallback(async (options: PDFGeneratorOptions) => {
    setIsGenerating(true);
    setError(null);
    
    // Cleanup previous URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    try {
      const { generatePDFBlob } = await import('@/utils/pdfGenerator');
      const blob = generatePDFBlob(options);
      const url = URL.createObjectURL(blob);
      
      setPreviewUrl(url);
      setPdfBlob(blob);
      setCurrentOptions(options);
    } catch (err) {
      console.error('PDF preview generation failed:', err);
      setError('Fehler beim Erstellen der PDF-Vorschau');
    } finally {
      setIsGenerating(false);
    }
  }, [previewUrl]);

  const clearPreview = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPdfBlob(null);
    setCurrentOptions(null);
    setError(null);
  }, [previewUrl]);

  const downloadPDF = useCallback(async () => {
    if (!pdfBlob || !currentOptions) return;
    
    try {
      const { downloadPDFFromBlob } = await import('@/utils/pdfGenerator');
      downloadPDFFromBlob(pdfBlob, currentOptions);
    } catch (err) {
      console.error('PDF download failed:', err);
      setError('Fehler beim Herunterladen der PDF');
    }
  }, [pdfBlob, currentOptions]);

  return {
    previewUrl,
    isGenerating,
    error,
    generatePreview,
    clearPreview,
    downloadPDF,
    pdfBlob,
  };
}
