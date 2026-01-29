/**
 * Index - Hauptseite des STBVV-Rechners
 * @module pages/Index
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDocumentTabs } from '@/hooks/useDocumentTabs';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Position, ClientData, Template, Discount } from "@/types/stbvv";
import { calculateTotal } from "@/utils/stbvvCalculator";
import { saveCustomTemplate } from "@/utils/templateManager";
import { generateUniqueId } from "@/utils/idGenerator";
import { TIMING } from "@/constants";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
import { useHistory } from "@/hooks/useHistory";
import { AdvancedTemplateSelector } from "@/components/AdvancedTemplateSelector";
import { CommandPalette } from "@/components/CommandPalette";
import TotalCalculation from "@/components/TotalCalculation";
import { useDocumentValidation } from "@/hooks/useDocumentValidation";
import { useDocumentExport } from "@/hooks/useDocumentExport";

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
import { GuidedWorkflow } from "@/components/wizard";

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
    updateTabPositions,
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

  // setPositions - FIXED: Now uses functional updater to prevent stale closures
  // When passed a function, it will use updateTabPositions which works on prev state
  // When passed an array, it will use updateTab directly
  const setPositions = useCallback((newPositions: Position[] | ((prev: Position[]) => Position[])) => {
    if (typeof newPositions === 'function') {
      // Functional update - uses updateTabPositions which operates on prev state
      updateTabPositions(activeTabId, newPositions);
    } else {
      // Direct array - use updateTab
      updateTab(activeTabId, { positions: newPositions });
    }
  }, [activeTabId, updateTab, updateTabPositions]);

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
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedPositionIds, setSelectedPositionIds] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [showFloatingSummary, setShowFloatingSummary] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  // Validation Hook
  const { validateBeforeGenerate } = useDocumentValidation({
    positions,
    clientData,
    documentFee,
    includeVAT,
    discount,
  });

  // Export Hook
  const {
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
  } = useDocumentExport({
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
  });

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

  // Position management - All using functional updates to prevent stale closures
  const addPosition = useCallback(() => {
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
    setPositions(prev => [...prev, newPosition]);
  }, [setPositions]);

  const duplicatePosition = useCallback((id: string) => {
    setPositions(prev => {
      const positionToDuplicate = prev.find((pos) => pos.id === id);
      if (!positionToDuplicate) return prev;
      
      const duplicatedPosition: Position = {
        ...positionToDuplicate,
        id: generateUniqueId('pos'),
        activity: positionToDuplicate.activity + ' (Kopie)',
      };
      const index = prev.findIndex((pos) => pos.id === id);
      const newPositions = [...prev];
      newPositions.splice(index + 1, 0, duplicatedPosition);
      return newPositions;
    });
    toast.success('Position dupliziert');
  }, [setPositions]);

  // CRITICAL FIX: updatePosition now accepts a PATCH (Partial<Position>)
  // This prevents stale closures from overwriting other fields
  const updatePosition = useCallback((id: string, patch: Partial<Position>) => {
    setPositions(prev => prev.map(pos => 
      pos.id === id ? { ...pos, ...patch } : pos
    ));
  }, [setPositions]);

  const removePosition = useCallback((id: string) => {
    setPositions(prev => {
      const positionName = prev.find((pos) => pos.id === id)?.activity || 'Position';
      toast.success(`${positionName} gelöscht`, {
        action: { label: 'Rückgängig', onClick: handleUndo },
      });
      return prev.filter((pos) => pos.id !== id);
    });
  }, [setPositions, handleUndo]);

  const movePosition = useCallback((id: string, direction: 'up' | 'down') => {
    setPositions(prev => {
      const currentIndex = prev.findIndex((pos) => pos.id === id);
      if (currentIndex === -1) return prev;
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const newPositions = [...prev];
      [newPositions[currentIndex], newPositions[newIndex]] = [newPositions[newIndex], newPositions[currentIndex]];
      return newPositions;
    });
  }, [setPositions]);

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

  const handleBulkDelete = useCallback(() => {
    const deletedCount = selectedPositionIds.length;
    setPositions(prev => prev.filter((pos) => !selectedPositionIds.includes(pos.id)));
    setSelectedPositionIds([]);
    toast.success(`${deletedCount} Positionen gelöscht`, {
      action: { label: 'Rückgängig', onClick: handleUndo },
    });
  }, [selectedPositionIds, setPositions, handleUndo]);

  const handleBulkDuplicate = useCallback(() => {
    setPositions(prev => {
      const selectedPositions = prev.filter((pos) => selectedPositionIds.includes(pos.id));
      const duplicated = selectedPositions.map((pos) => ({
        ...pos,
        id: generateUniqueId('pos'),
        activity: pos.activity + ' (Kopie)',
      }));
      return [...prev, ...duplicated];
    });
    toast.success(`${selectedPositionIds.length} Positionen dupliziert`);
    setSelectedPositionIds([]);
  }, [selectedPositionIds, setPositions]);

  const handleBulkChangeFeeTable = useCallback((feeTable: 'A' | 'B' | 'C' | 'D') => {
    setPositions(prev => prev.map((pos) => 
      selectedPositionIds.includes(pos.id) ? { ...pos, feeTable } : pos
    ));
    toast.success(`Gebührentabelle für ${selectedPositionIds.length} Positionen geändert`);
  }, [selectedPositionIds, setPositions]);

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
