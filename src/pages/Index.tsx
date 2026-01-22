/**
 * Index - Hauptseite des STBVV-Rechners
 * @module pages/Index
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDocumentArchive } from '@/hooks/useDocumentArchive';
import { useDocumentTabs } from '@/hooks/useDocumentTabs';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Position, ClientData, Template, Discount } from "@/types/stbvv";
import { calculateTotal } from "@/utils/stbvvCalculator";
import { saveCustomTemplate } from "@/utils/templateManager";
import { loadBrandingSettings } from "@/utils/brandingStorage";
import { generateUniqueId } from "@/utils/idGenerator";
import { exportToCSV } from "@/utils/csvExporter";
import { TIMING, VALIDATION } from "@/utils/constants";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
import { useHistory } from "@/hooks/useHistory";
import { AdvancedTemplateSelector } from "@/components/AdvancedTemplateSelector";
import { CommandPalette } from "@/components/CommandPalette";
import TotalCalculation from "@/components/TotalCalculation";

// Neue Komponenten
import {
  ClientDataFormAdvanced,
  DocumentSettings,
  PositionList,
  FloatingSummaryBar,
  BulkActionsToolbar,
  ActionButtons,
  CalculatorHeader,
  CalculatorFooter,
  AddPositionCard,
  PDFPreviewModal,
  DocumentTabs,
} from "@/components/calculator";
import { usePDFPreview } from "@/hooks/usePDFPreview";
import { GuidedWorkflow } from "@/components/wizard";
const emailSchema = z.string().email();

// Helper function to generate next document number
const getNextDocumentNumber = (type: 'quote' | 'invoice', increment = false): string => {
  const counterKey = 'stbvv_invoice_counter';
  const counter = parseInt(localStorage.getItem(counterKey) || '1000');
  const nextCounter = increment ? counter + 1 : counter;
  const prefix = type === 'invoice' ? 'RE' : 'AG';
  if (increment) {
    localStorage.setItem(counterKey, nextCounter.toString());
  }
  return `${prefix}-${nextCounter}`;
};

const Index = () => {
  // Multi-Tab State Management
  const {
    tabs,
    activeTab,
    activeTabId,
    addTab,
    closeTab,
    switchTab,
    updateTab,
    renameTab,
    duplicateTab,
    canAddTab,
    hasUnsavedChanges,
  } = useDocumentTabs();

  // Derived state from active tab
  const positions = activeTab.positions;
  const documentFee = activeTab.documentFee;
  const includeVAT = activeTab.includeVAT;
  const discount = activeTab.discount;
  const documentType = activeTab.documentType;
  const clientData = activeTab.clientData;
  const invoiceNumber = activeTab.invoiceNumber;
  const invoiceDate = new Date(activeTab.invoiceDate);
  const servicePeriod = activeTab.servicePeriod;

  // Setters that update the active tab
  const setPositions = useCallback((newPositions: Position[] | ((prev: Position[]) => Position[])) => {
    const value = typeof newPositions === 'function' ? newPositions(activeTab.positions) : newPositions;
    updateTab(activeTabId, { positions: value });
  }, [activeTabId, activeTab.positions, updateTab]);

  const setDocumentFee = useCallback((fee: number) => {
    updateTab(activeTabId, { documentFee: fee });
  }, [activeTabId, updateTab]);

  const setIncludeVAT = useCallback((include: boolean) => {
    updateTab(activeTabId, { includeVAT: include });
  }, [activeTabId, updateTab]);

  const setDiscount = useCallback((d: Discount | null) => {
    updateTab(activeTabId, { discount: d });
  }, [activeTabId, updateTab]);

  const setDocumentType = useCallback((type: 'quote' | 'invoice') => {
    updateTab(activeTabId, { documentType: type });
    // Update invoice number prefix
    const currentPrefix = activeTab.invoiceNumber.split('-')[0];
    const expectedPrefix = type === 'invoice' ? 'RE' : 'AG';
    if (currentPrefix !== expectedPrefix) {
      const numberPart = activeTab.invoiceNumber.split('-')[1] || '1001';
      updateTab(activeTabId, { invoiceNumber: `${expectedPrefix}-${numberPart}` });
    }
  }, [activeTabId, activeTab.invoiceNumber, updateTab]);

  const setClientData = useCallback((data: ClientData | ((prev: ClientData) => ClientData)) => {
    const value = typeof data === 'function' ? data(activeTab.clientData) : data;
    updateTab(activeTabId, { clientData: value });
  }, [activeTabId, activeTab.clientData, updateTab]);

  const setInvoiceNumber = useCallback((num: string) => {
    updateTab(activeTabId, { invoiceNumber: num });
  }, [activeTabId, updateTab]);

  const setInvoiceDate = useCallback((date: Date) => {
    updateTab(activeTabId, { invoiceDate: date.toISOString() });
  }, [activeTabId, updateTab]);

  const setServicePeriod = useCallback((period: string) => {
    updateTab(activeTabId, { servicePeriod: period });
  }, [activeTabId, updateTab]);

  // UI State
  const [lastTemplateLoadTime, setLastTemplateLoadTime] = useState<number>(0);
  const [renderKey, setRenderKey] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedPositionIds, setSelectedPositionIds] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [showFloatingSummary, setShowFloatingSummary] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  // PDF Preview Hook
  const {
    previewUrl,
    isGenerating: isGeneratingPreview,
    error: previewError,
    generatePreview,
    clearPreview,
    downloadPDF,
  } = usePDFPreview();

  const {
    pushHistory,
    undo: historyUndo,
    redo: historyRedo,
    canUndo,
    canRedo,
  } = useHistory({ positions, clientData, documentFee, includeVAT, discount }, 10);

  // Calculate totals
  const totals = useMemo(
    () => calculateTotal(positions, documentFee, includeVAT, discount),
    [positions, documentFee, includeVAT, discount]
  );

  // ============== Effects ==============

  // Update history when state changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      pushHistory({ positions, clientData, documentFee, includeVAT, discount });
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [positions, clientData, documentFee, includeVAT, discount, pushHistory]);

  // Clear selection when switching tabs
  useEffect(() => {
    setSelectedPositionIds([]);
    setIsBulkMode(false);
  }, [activeTabId]);

  // Keyboard shortcuts
  useKeyboardShortcuts(
    [
      { key: 'n', ctrl: true, description: 'Neue Position hinzufügen', action: () => addPosition() },
      { key: 'p', ctrl: true, description: 'PDF generieren', action: () => !isGeneratingPDF && handleGeneratePDF() },
      { key: 'z', ctrl: true, description: 'Rückgängig machen', action: () => canUndo && handleUndo() },
      { key: 'y', ctrl: true, description: 'Wiederherstellen', action: () => canRedo && handleRedo() },
      { key: 't', ctrl: true, description: 'Neuer Tab', action: () => canAddTab && handleAddTab() },
      { key: '?', description: 'Tastenkombinationen anzeigen', action: () => setShowKeyboardShortcuts(true) },
    ],
    !showKeyboardShortcuts
  );

  // ============== Tab Handlers ==============

  const handleAddTab = () => {
    const newTab = addTab();
    if (newTab) {
      toast.success(`Neues Dokument "${newTab.name}" erstellt`);
    } else {
      toast.error('Maximale Anzahl an Tabs erreicht (10)');
    }
  };

  const handleCloseTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    closeTab(tabId);
    if (tab) {
      toast.success(`"${tab.name}" geschlossen`);
    }
  };

  const handleDuplicateTab = (tabId: string) => {
    const newTab = duplicateTab(tabId);
    if (newTab) {
      toast.success(`Dokument dupliziert als "${newTab.name}"`);
    }
  };

  // ============== Handlers ==============

  const handleUndo = () => {
    const previousState = historyUndo();
    if (previousState) {
      updateTab(activeTabId, {
        positions: previousState.positions,
        clientData: previousState.clientData,
        documentFee: previousState.documentFee,
        includeVAT: previousState.includeVAT,
        discount: previousState.discount,
      });
      toast.success('Rückgängig gemacht');
    }
  };

  const handleRedo = () => {
    const nextState = historyRedo();
    if (nextState) {
      updateTab(activeTabId, {
        positions: nextState.positions,
        clientData: nextState.clientData,
        documentFee: nextState.documentFee,
        includeVAT: nextState.includeVAT,
        discount: nextState.discount,
      });
      toast.success('Wiederhergestellt');
    }
  };

  // Position management
  const addPosition = () => {
    const newPosition: Position = {
      id: generateUniqueId('pos'),
      activity: '',
      description: '',
      objectValue: 0,
      tenthRate: { numerator: 6, denominator: 10 },
      quantity: 1,
      feeTable: 'A',
      applyExpenseFee: true,
      billingType: 'objectValue',
      hourlyRate: 0,
      hours: 0,
      flatRate: 0,
    };
    setPositions([...positions, newPosition]);
  };

  const duplicatePosition = (id: string) => {
    const positionToDuplicate = positions.find((pos) => pos.id === id);
    if (!positionToDuplicate) return;
    const duplicatedPosition: Position = {
      ...positionToDuplicate,
      id: generateUniqueId('pos'),
      activity: positionToDuplicate.activity + ' (Kopie)',
    };
    const index = positions.findIndex((pos) => pos.id === id);
    const newPositions = [...positions];
    newPositions.splice(index + 1, 0, duplicatedPosition);
    setPositions(newPositions);
    toast.success('Position dupliziert');
  };

  const updatePosition = (id: string, updatedPosition: Position) => {
    setPositions(positions.map((pos) => (pos.id === id ? updatedPosition : pos)));
  };

  const removePosition = (id: string) => {
    const positionName = positions.find((pos) => pos.id === id)?.activity || 'Position';
    setPositions(positions.filter((pos) => pos.id !== id));
    toast.success(`${positionName} gelöscht`, {
      action: { label: 'Rückgängig', onClick: handleUndo },
    });
  };

  const movePosition = (id: string, direction: 'up' | 'down') => {
    const currentIndex = positions.findIndex((pos) => pos.id === id);
    if (currentIndex === -1) return;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= positions.length) return;
    const newPositions = [...positions];
    [newPositions[currentIndex], newPositions[newIndex]] = [newPositions[newIndex], newPositions[currentIndex]];
    setPositions(newPositions);
  };

  const updateClientData = (field: keyof ClientData, value: string) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const updateAllClientData = (data: ClientData) => {
    setClientData(data);
  };

  // Bulk operations
  const handleSelectAll = () => setSelectedPositionIds(positions.map((p) => p.id));
  const handleDeselectAll = () => setSelectedPositionIds([]);
  const handleToggleSelection = (id: string, selected: boolean) => {
    setSelectedPositionIds((prev) => (selected ? [...prev, id] : prev.filter((pId) => pId !== id)));
  };

  const handleBulkDelete = () => {
    const deletedCount = selectedPositionIds.length;
    setPositions(positions.filter((pos) => !selectedPositionIds.includes(pos.id)));
    setSelectedPositionIds([]);
    toast.success(`${deletedCount} Positionen gelöscht`, {
      action: { label: 'Rückgängig', onClick: handleUndo },
    });
  };

  const handleBulkDuplicate = () => {
    const selectedPositions = positions.filter((pos) => selectedPositionIds.includes(pos.id));
    const duplicated = selectedPositions.map((pos) => ({
      ...pos,
      id: generateUniqueId('pos'),
      activity: pos.activity + ' (Kopie)',
    }));
    setPositions([...positions, ...duplicated]);
    setSelectedPositionIds([]);
    toast.success(`${duplicated.length} Positionen dupliziert`);
  };

  const handleBulkChangeFeeTable = (feeTable: 'A' | 'B' | 'C' | 'D') => {
    setPositions(positions.map((pos) => (selectedPositionIds.includes(pos.id) ? { ...pos, feeTable } : pos)));
    toast.success(`Gebührentabelle für ${selectedPositionIds.length} Positionen geändert`);
  };

  const handleExitBulkMode = () => {
    setIsBulkMode(false);
    setSelectedPositionIds([]);
  };

  // Template management
  const loadTemplate = (template: Template) => {
    const newPositions = template.positions.map((pos, index) => ({
      ...pos,
      id: generateUniqueId(`pos-tpl-${index}`),
    }));
    setLastTemplateLoadTime(Date.now());
    setPositions(newPositions);
    setTimeout(() => setRenderKey((prev) => prev + 1), TIMING.RERENDER_DELAY);
    toast.success(`Vorlage "${template.name}" mit ${newPositions.length} Positionen geladen`);
  };

  const saveAsTemplate = (name: string) => {
    saveCustomTemplate(name, positions);
  };

  // Validation
  const validateBeforeGenerate = (): boolean => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (positions.length === 0) {
      errors.push('Bitte fügen Sie mindestens eine Position hinzu');
    }

    positions.forEach((position, index) => {
      if (!position.activity) {
        errors.push(`Position ${index + 1}: Tätigkeit fehlt`);
      }
      switch (position.billingType) {
        case 'objectValue':
          if (!position.objectValue || position.objectValue <= 0) {
            errors.push(`Position ${index + 1}: Gegenstandswert muss größer als 0 sein`);
          }
          break;
        case 'hourly':
          if (!position.hourlyRate || position.hourlyRate <= 0) {
            errors.push(`Position ${index + 1}: Stundensatz muss größer als 0 sein`);
          }
          if (!position.hours || position.hours <= 0) {
            errors.push(`Position ${index + 1}: Stunden müssen größer als 0 sein`);
          }
          break;
        case 'flatRate':
          if (!position.flatRate || position.flatRate <= 0) {
            errors.push(`Position ${index + 1}: Pauschalbetrag muss größer als 0 sein`);
          }
          break;
      }
    });

    const calculatedTotals = calculateTotal(positions, documentFee, includeVAT, discount);
    if (calculatedTotals.totalGross < VALIDATION.MIN_TOTAL_WARNING) {
      warnings.push(`Gesamtsumme (${calculatedTotals.totalGross.toFixed(2)} €) ist sehr niedrig`);
    }

    if (!includeVAT) {
      warnings.push('Umsatzsteuer ist nicht aktiviert');
    }

    if (clientData.email) {
      try {
        emailSchema.parse(clientData.email);
      } catch {
        errors.push('E-Mail-Adresse ist ungültig');
      }
    }

    if (errors.length > 0) {
      toast.error(
        <div>
          <div className="font-semibold mb-1">Fehler gefunden:</div>
          <ul className="list-disc list-inside text-sm">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>,
        { duration: 5000 }
      );
      return false;
    }

    if (warnings.length > 0) {
      toast.warning(
        <div>
          <div className="font-semibold mb-1">Hinweise:</div>
          <ul className="list-disc list-inside text-sm">
            {warnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>
        </div>,
        { duration: 4000 }
      );
    }

    return true;
  };

  // Document archive hook
  const { archiveDocument } = useDocumentArchive();

  // Export handlers
  
  // Open PDF Preview Modal
  const handleOpenPDFPreview = async () => {
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
  };

  // Close PDF Preview and cleanup
  const handleClosePDFPreview = () => {
    setShowPDFPreview(false);
    clearPreview();
  };

  // Download PDF from preview and archive
  const handleDownloadFromPreview = () => {
    getNextDocumentNumber(documentType, true);
    downloadPDF();
    
    // Archive the document
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
    
    toast.success(`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} erfolgreich erstellt`);
  };

  // Direct PDF generation (without preview - legacy/quick export)
  const handleGeneratePDF = async () => {
    if (!validateBeforeGenerate()) return;
    setIsGeneratingPDF(true);
    try {
      getNextDocumentNumber(documentType, true);
      const branding = loadBrandingSettings();
      const { generatePDF } = await import('@/utils/pdfGenerator');
      
      // Calculate totals for archiving
      const totals = calculateTotal(positions, documentFee, includeVAT, discount);
      
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
      
      // Archive the document
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
      
      toast.success(`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} erfolgreich erstellt`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Fehler beim Erstellen der PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleExportExcel = async () => {
    if (positions.length === 0) {
      toast.error('Bitte fügen Sie mindestens eine Position hinzu');
      return;
    }
    setIsExportingExcel(true);
    try {
      const { exportToExcel } = await import('@/utils/excelExporter');
      exportToExcel(positions, documentFee, includeVAT, discount, documentType, clientData, invoiceNumber, invoiceDate, servicePeriod);
      toast.success('Excel-Datei erfolgreich erstellt');
    } catch (error) {
      console.error('Excel export failed:', error);
      toast.error('Fehler beim Exportieren der Excel-Datei');
    } finally {
      setIsExportingExcel(false);
    }
  };

  const handleExportCSV = () => {
    const brandingSettings = loadBrandingSettings();
    exportToCSV({ positions, totals, clientData, invoiceNumber, brandingSettings });
    toast.success('CSV-Export erfolgreich');
  };

  const handlePrint = () => {
    window.print();
    toast.success('Druckansicht geöffnet');
  };

  const handleSendEmail = () => {
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
  };

  // ============== Render ==============

  return (
    <>
      <KeyboardShortcutsDialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts} />

      <CommandPalette
        open={showCommandPalette}
        onOpenChange={setShowCommandPalette}
        onAddPosition={addPosition}
        onLoadTemplate={loadTemplate}
        onGeneratePDF={handleGeneratePDF}
        onExportExcel={handleExportExcel}
        onPrint={handlePrint}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onShowShortcuts={() => setShowKeyboardShortcuts(true)}
        canUndo={canUndo}
        canRedo={canRedo}
        isGeneratingPDF={isGeneratingPDF}
      />

      {/* Guided Workflow Mode */}
      {showWizard ? (
        <GuidedWorkflow
          positions={positions}
          clientData={clientData}
          documentFee={documentFee}
          includeVAT={includeVAT}
          discount={discount}
          documentType={documentType}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          servicePeriod={servicePeriod}
          isGeneratingPDF={isGeneratingPDF}
          onPositionsChange={setPositions}
          onClientDataChange={setClientData}
          onDocumentFeeChange={setDocumentFee}
          onIncludeVATChange={setIncludeVAT}
          onDocumentTypeChange={setDocumentType}
          onInvoiceNumberChange={setInvoiceNumber}
          onInvoiceDateChange={setInvoiceDate}
          onServicePeriodChange={setServicePeriod}
          onGeneratePDF={handleGeneratePDF}
          onUpdatePosition={updatePosition}
          onClose={() => setShowWizard(false)}
        />
      ) : (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <CalculatorHeader 
            onShowKeyboardShortcuts={() => setShowKeyboardShortcuts(true)}
            onOpenCommandPalette={() => setShowCommandPalette(true)}
            onStartWizard={() => setShowWizard(true)}
          />

          {/* Multi-Tab Bar */}
          <DocumentTabs
            tabs={tabs}
            activeTabId={activeTabId}
            canAddTab={canAddTab}
            onSwitchTab={switchTab}
            onCloseTab={handleCloseTab}
            onAddTab={handleAddTab}
            onRenameTab={renameTab}
            onDuplicateTab={handleDuplicateTab}
            hasUnsavedChanges={hasUnsavedChanges}
          />

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Positions Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Mandantendaten zuerst */}
              <ClientDataFormAdvanced 
                clientData={clientData} 
                onUpdate={updateClientData}
                onUpdateAll={updateAllClientData}
              />

              {/* Dann Vorlagen */}
              <AdvancedTemplateSelector
                onLoadTemplate={loadTemplate}
                onSaveAsTemplate={saveAsTemplate}
                hasPositions={positions.length > 0}
              />

              {isBulkMode && positions.length > 0 && (
                <BulkActionsToolbar
                  selectedCount={selectedPositionIds.length}
                  totalCount={positions.length}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onBulkDuplicate={handleBulkDuplicate}
                  onBulkDelete={handleBulkDelete}
                  onBulkChangeFeeTable={handleBulkChangeFeeTable}
                  onExitBulkMode={handleExitBulkMode}
                />
              )}

              <PositionList
                positions={positions}
                renderKey={renderKey}
                isBulkMode={isBulkMode}
                selectedPositionIds={selectedPositionIds}
                onUpdatePosition={updatePosition}
                onRemovePosition={removePosition}
                onDuplicatePosition={duplicatePosition}
                onMovePosition={movePosition}
                onToggleSelection={handleToggleSelection}
                onReorder={setPositions}
              />

              <AddPositionCard
                positionsCount={positions.length}
                isBulkMode={isBulkMode}
                canUndo={canUndo}
                canRedo={canRedo}
                onAddPosition={addPosition}
                onToggleBulkMode={() => setIsBulkMode(!isBulkMode)}
                onUndo={handleUndo}
                onRedo={handleRedo}
              />
            </div>

            {/* Calculation Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <TotalCalculation
                  positions={positions}
                  documentFee={documentFee}
                  includeVAT={includeVAT}
                  discount={discount}
                  onDocumentFeeChange={setDocumentFee}
                  onVATChange={setIncludeVAT}
                  onDiscountChange={setDiscount}
                />

                <DocumentSettings
                  documentType={documentType}
                  invoiceNumber={invoiceNumber}
                  invoiceDate={invoiceDate}
                  servicePeriod={servicePeriod}
                  onDocumentTypeChange={setDocumentType}
                  onInvoiceNumberChange={setInvoiceNumber}
                  onInvoiceDateChange={setInvoiceDate}
                  onServicePeriodChange={setServicePeriod}
                />

                {positions.length > 0 && (
                  <ActionButtons
                    documentType={documentType}
                    clientEmail={clientData.email}
                    isGeneratingPDF={isGeneratingPDF || isGeneratingPreview}
                    isExportingExcel={isExportingExcel}
                    onGeneratePDF={handleOpenPDFPreview}
                    onExportExcel={handleExportExcel}
                    onExportCSV={handleExportCSV}
                    onPrint={handlePrint}
                    onSendEmail={handleSendEmail}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PDF Preview Modal */}
        <PDFPreviewModal
          isOpen={showPDFPreview}
          onClose={handleClosePDFPreview}
          previewUrl={previewUrl}
          isLoading={isGeneratingPreview}
          error={previewError}
          onDownload={handleDownloadFromPreview}
          documentType={documentType}
        />

        {/* Floating Summary Bar */}
        {positions.length > 0 && showFloatingSummary && (
          <FloatingSummaryBar
            totalGross={totals.totalGross}
            vatAmount={totals.vatAmount}
            includeVAT={includeVAT}
            isGeneratingPDF={isGeneratingPDF || isGeneratingPreview}
            onGeneratePDF={handleOpenPDFPreview}
            onClose={() => setShowFloatingSummary(false)}
          />
        )}

        {/* Mobile FAB */}
        <Button
          onClick={addPosition}
          className="md:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-2xl z-40"
          size="icon"
          aria-label="Position hinzufügen"
        >
          <Plus className="w-6 h-6" />
        </Button>

        <CalculatorFooter />
      </div>
      )}
    </>
  );
};

export default Index;
