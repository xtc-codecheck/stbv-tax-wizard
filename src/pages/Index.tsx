/**
 * Index - Hauptseite des STBVV-Rechners
 * @module pages/Index
 */

import React, { useState, useEffect, useMemo } from 'react';
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
import TemplateSelector from "@/components/TemplateSelector";
import TotalCalculation from "@/components/TotalCalculation";

// Neue Komponenten
import {
  ClientDataForm,
  DocumentSettings,
  PositionList,
  FloatingSummaryBar,
  BulkActionsToolbar,
  ActionButtons,
  CalculatorHeader,
  CalculatorFooter,
  AddPositionCard,
} from "@/components/calculator";

// Email validation schema
const emailSchema = z.string().email();

// LocalStorage keys
const STORAGE_KEYS = {
  positions: 'stbvv_autosave_positions',
  clientData: 'stbvv_autosave_client',
  documentFee: 'stbvv_autosave_documentFee',
  includeVAT: 'stbvv_autosave_includeVAT',
  documentType: 'stbvv_autosave_documentType',
  invoiceNumber: 'stbvv_autosave_invoiceNumber',
  invoiceDate: 'stbvv_autosave_invoiceDate',
  servicePeriod: 'stbvv_autosave_servicePeriod',
  discount: 'stbvv_autosave_discount',
  invoiceCounter: 'stbvv_invoice_counter',
  lastSaveTimestamp: 'stbvv_autosave_timestamp',
  lastSaveHash: 'stbvv_autosave_hash',
};

// Helper function to generate next document number
const getNextDocumentNumber = (type: 'quote' | 'invoice', increment = false): string => {
  const counter = parseInt(localStorage.getItem(STORAGE_KEYS.invoiceCounter) || '1000');
  const nextCounter = increment ? counter + 1 : counter;
  const prefix = type === 'invoice' ? 'RE' : 'AG';
  if (increment) {
    localStorage.setItem(STORAGE_KEYS.invoiceCounter, nextCounter.toString());
  }
  return `${prefix}-${nextCounter}`;
};

// Helper function to create data hash for change detection
const createDataHash = (data: unknown): string => {
  return JSON.stringify(data);
};

const Index = () => {
  // Core State
  const [positions, setPositions] = useState<Position[]>([]);
  const [documentFee, setDocumentFee] = useState(0);
  const [includeVAT, setIncludeVAT] = useState(true);
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [documentType, setDocumentType] = useState<'quote' | 'invoice'>('quote');
  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    street: '',
    postalCode: '',
    city: '',
    email: '',
  });

  // Invoice metadata
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [servicePeriod, setServicePeriod] = useState('');

  // UI State
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [savedTimestamp, setSavedTimestamp] = useState<string>('');
  const [lastTemplateLoadTime, setLastTemplateLoadTime] = useState<number>(0);
  const [renderKey, setRenderKey] = useState<number>(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [selectedPositionIds, setSelectedPositionIds] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [showFloatingSummary, setShowFloatingSummary] = useState(true);

  // History for Undo/Redo
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
  }, [positions, clientData, documentFee, includeVAT, discount]);

  // Auto-generate invoice number based on document type
  useEffect(() => {
    if (!invoiceNumber) {
      setInvoiceNumber(getNextDocumentNumber(documentType));
      return;
    }
    const currentPrefix = invoiceNumber.split('-')[0];
    const expectedPrefix = documentType === 'invoice' ? 'RE' : 'AG';
    if (currentPrefix !== expectedPrefix) {
      const numberPart = invoiceNumber.split('-')[1] || '1001';
      setInvoiceNumber(`${expectedPrefix}-${numberPart}`);
    }
  }, [documentType, invoiceNumber]);

  // Check for saved session on mount
  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEYS.positions);
    const timestamp = localStorage.getItem(STORAGE_KEYS.lastSaveTimestamp);
    if (savedPositions && timestamp) {
      setSavedTimestamp(timestamp);
      setShowRestoreDialog(true);
    }
  }, []);

  // Auto-save with change detection
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLoad = Date.now() - lastTemplateLoadTime;
      if (timeSinceLoad < TIMING.TEMPLATE_LOAD_GRACE) return;

      if (positions.length > 0 || clientData.name || clientData.email) {
        try {
          const currentData = {
            positions,
            clientData,
            documentFee,
            includeVAT,
            documentType,
            invoiceNumber,
            invoiceDate: invoiceDate.toISOString(),
            servicePeriod,
            discount,
          };
          const currentHash = createDataHash(currentData);
          const lastHash = localStorage.getItem(STORAGE_KEYS.lastSaveHash);

          if (currentHash !== lastHash) {
            localStorage.setItem(STORAGE_KEYS.positions, JSON.stringify(positions));
            localStorage.setItem(STORAGE_KEYS.clientData, JSON.stringify(clientData));
            localStorage.setItem(STORAGE_KEYS.documentFee, documentFee.toString());
            localStorage.setItem(STORAGE_KEYS.includeVAT, includeVAT.toString());
            localStorage.setItem(STORAGE_KEYS.documentType, documentType);
            localStorage.setItem(STORAGE_KEYS.invoiceNumber, invoiceNumber);
            localStorage.setItem(STORAGE_KEYS.invoiceDate, invoiceDate.toISOString());
            localStorage.setItem(STORAGE_KEYS.servicePeriod, servicePeriod);
            if (discount) {
              localStorage.setItem(STORAGE_KEYS.discount, JSON.stringify(discount));
            }
            localStorage.setItem(STORAGE_KEYS.lastSaveTimestamp, new Date().toISOString());
            localStorage.setItem(STORAGE_KEYS.lastSaveHash, currentHash);
          }
        } catch (error) {
          console.error('[Auto-Save] Failed:', error);
          if (error instanceof Error && error.name === 'QuotaExceededError') {
            toast.error('Speicherplatz voll. Auto-Speichern deaktiviert.');
          } else {
            toast.error('Auto-Speichern fehlgeschlagen. Daten könnten verloren gehen.');
          }
        }
      }
    }, TIMING.AUTOSAVE_INTERVAL);
    return () => clearInterval(interval);
  }, [positions, clientData, documentFee, includeVAT, documentType, invoiceNumber, invoiceDate, servicePeriod, discount, lastTemplateLoadTime]);

  // Keyboard shortcuts
  useKeyboardShortcuts(
    [
      { key: 'n', ctrl: true, description: 'Neue Position hinzufügen', action: () => addPosition() },
      { key: 'p', ctrl: true, description: 'PDF generieren', action: () => !isGeneratingPDF && handleGeneratePDF() },
      { key: 'z', ctrl: true, description: 'Rückgängig machen', action: () => canUndo && handleUndo() },
      { key: 'y', ctrl: true, description: 'Wiederherstellen', action: () => canRedo && handleRedo() },
      { key: '?', description: 'Tastenkombinationen anzeigen', action: () => setShowKeyboardShortcuts(true) },
    ],
    !showRestoreDialog && !showKeyboardShortcuts
  );

  // ============== Handlers ==============

  const handleUndo = () => {
    const previousState = historyUndo();
    if (previousState) {
      setPositions(previousState.positions);
      setClientData(previousState.clientData);
      setDocumentFee(previousState.documentFee);
      setIncludeVAT(previousState.includeVAT);
      setDiscount(previousState.discount);
      toast.success('Rückgängig gemacht');
    }
  };

  const handleRedo = () => {
    const nextState = historyRedo();
    if (nextState) {
      setPositions(nextState.positions);
      setClientData(nextState.clientData);
      setDocumentFee(nextState.documentFee);
      setIncludeVAT(nextState.includeVAT);
      setDiscount(nextState.discount);
      toast.success('Wiederhergestellt');
    }
  };

  const restoreSession = () => {
    try {
      const savedPositions = localStorage.getItem(STORAGE_KEYS.positions);
      const savedClientData = localStorage.getItem(STORAGE_KEYS.clientData);
      const savedDocumentFee = localStorage.getItem(STORAGE_KEYS.documentFee);
      const savedIncludeVAT = localStorage.getItem(STORAGE_KEYS.includeVAT);
      const savedDocumentType = localStorage.getItem(STORAGE_KEYS.documentType);
      const savedInvoiceNumber = localStorage.getItem(STORAGE_KEYS.invoiceNumber);
      const savedInvoiceDate = localStorage.getItem(STORAGE_KEYS.invoiceDate);
      const savedServicePeriod = localStorage.getItem(STORAGE_KEYS.servicePeriod);
      const savedDiscount = localStorage.getItem(STORAGE_KEYS.discount);

      if (savedPositions) setPositions(JSON.parse(savedPositions));
      if (savedClientData) setClientData(JSON.parse(savedClientData));
      if (savedDocumentFee) setDocumentFee(parseFloat(savedDocumentFee));
      if (savedIncludeVAT) setIncludeVAT(savedIncludeVAT === 'true');
      if (savedDocumentType) setDocumentType(savedDocumentType as 'quote' | 'invoice');
      if (savedInvoiceNumber) setInvoiceNumber(savedInvoiceNumber);
      if (savedInvoiceDate) setInvoiceDate(new Date(savedInvoiceDate));
      if (savedServicePeriod) setServicePeriod(savedServicePeriod);
      if (savedDiscount) setDiscount(JSON.parse(savedDiscount));

      toast.success('Sitzung wiederhergestellt');
    } catch {
      toast.error('Fehler beim Wiederherstellen der Sitzung');
    }
    setShowRestoreDialog(false);
  };

  const clearSession = () => {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    setShowRestoreDialog(false);
    toast.success('Neue Sitzung gestartet');
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
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
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

  // Export handlers
  const handleGeneratePDF = async () => {
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
      {/* Session Restore Dialog */}
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Letzte Sitzung wiederherstellen?</AlertDialogTitle>
            <AlertDialogDescription>
              Es wurde eine gespeicherte Sitzung gefunden vom{' '}
              {savedTimestamp && new Date(savedTimestamp).toLocaleString('de-DE')}.
              Möchten Sie diese wiederherstellen oder neu starten?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={clearSession}>Neu starten</AlertDialogCancel>
            <AlertDialogAction onClick={restoreSession}>Wiederherstellen</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <KeyboardShortcutsDialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <CalculatorHeader onShowKeyboardShortcuts={() => setShowKeyboardShortcuts(true)} />

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Positions Column */}
            <div className="lg:col-span-2 space-y-6">
              <TemplateSelector
                onLoadTemplate={loadTemplate}
                onSaveAsTemplate={saveAsTemplate}
                hasPositions={positions.length > 0}
              />

              <ClientDataForm clientData={clientData} onUpdate={updateClientData} />

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
                    isGeneratingPDF={isGeneratingPDF}
                    isExportingExcel={isExportingExcel}
                    onGeneratePDF={handleGeneratePDF}
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

        {/* Floating Summary Bar */}
        {positions.length > 0 && showFloatingSummary && (
          <FloatingSummaryBar
            totalGross={totals.totalGross}
            vatAmount={totals.vatAmount}
            includeVAT={includeVAT}
            isGeneratingPDF={isGeneratingPDF}
            onGeneratePDF={handleGeneratePDF}
            onClose={() => setShowFloatingSummary(false)}
          />
        )}

        {/* Mobile FAB */}
        <Button
          onClick={addPosition}
          className="md:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl z-40"
          size="icon"
          aria-label="Position hinzufügen"
        >
          <Plus className="w-6 h-6" />
        </Button>

        <CalculatorFooter />
      </div>
    </>
  );
};

export default Index;
