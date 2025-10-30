import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calculator, Plus, FileText, Download, User, Mail, Calendar as CalendarIcon, Settings as SettingsIcon, FileSpreadsheet, Keyboard, Loader2, Undo2, Redo2, X, CheckSquare, Square, Trash2, Copy, Table2, Printer } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { exportToCSV } from "@/utils/csvExporter";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PositionCard from "@/components/PositionCard";
import TotalCalculation from "@/components/TotalCalculation";
import TemplateSelector from "@/components/TemplateSelector";
import { Position, ClientData, Template, Discount } from "@/types/stbvv";
import { calculateTotal } from "@/utils/stbvvCalculator";
import { saveCustomTemplate } from "@/utils/templateManager";
import { loadBrandingSettings } from "@/utils/brandingStorage";
import { generateUniqueId } from "@/utils/idGenerator";
import { TIMING, VALIDATION } from "@/utils/constants";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
import { getDefaultHourlyRate } from "@/utils/smartDefaults";
import { useHistory } from "@/hooks/useHistory";

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
  lastSaveHash: 'stbvv_autosave_hash'
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
const createDataHash = (data: any): string => {
  return JSON.stringify(data);
};
const Index = () => {
  const navigate = useNavigate();
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
    email: ''
  });

  // New state for invoice metadata
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());
  const [servicePeriod, setServicePeriod] = useState('');

  // State for restore dialog
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [savedTimestamp, setSavedTimestamp] = useState<string>('');

  // State to prevent auto-save right after template load
  const [lastTemplateLoadTime, setLastTemplateLoadTime] = useState<number>(0);

  // State to force re-render after template load
  const [renderKey, setRenderKey] = useState<number>(0);

  // Loading states
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  // Keyboard shortcuts state
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Bulk selection state
  const [selectedPositionIds, setSelectedPositionIds] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);

  // History for Undo/Redo
  const {
    currentState: historyState,
    pushHistory,
    undo: historyUndo,
    redo: historyRedo,
    canUndo,
    canRedo
  } = useHistory({
    positions,
    clientData,
    documentFee,
    includeVAT,
    discount
  }, 10);

  // Update history when relevant state changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      pushHistory({
        positions,
        clientData,
        documentFee,
        includeVAT,
        discount
      });
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [positions, clientData, documentFee, includeVAT, discount]);

  // Undo/Redo handlers
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

  // Bulk operations
  const handleSelectAll = () => {
    setSelectedPositionIds(positions.map(p => p.id));
  };
  const handleDeselectAll = () => {
    setSelectedPositionIds([]);
  };
  const handleToggleSelection = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedPositionIds(prev => [...prev, id]);
    } else {
      setSelectedPositionIds(prev => prev.filter(pId => pId !== id));
    }
  };
  const handleBulkDelete = () => {
    const deletedCount = selectedPositionIds.length;
    setPositions(positions.filter(pos => !selectedPositionIds.includes(pos.id)));
    setSelectedPositionIds([]);
    toast.success(`${deletedCount} Positionen gelöscht`, {
      action: {
        label: 'Rückgängig',
        onClick: handleUndo
      }
    });
  };
  const handleBulkDuplicate = () => {
    const selectedPositions = positions.filter(pos => selectedPositionIds.includes(pos.id));
    const duplicated = selectedPositions.map(pos => ({
      ...pos,
      id: generateUniqueId('pos'),
      activity: pos.activity + ' (Kopie)'
    }));
    setPositions([...positions, ...duplicated]);
    setSelectedPositionIds([]);
    toast.success(`${duplicated.length} Positionen dupliziert`);
  };
  const handleBulkChangeFeeTable = (feeTable: 'A' | 'B' | 'C' | 'D') => {
    setPositions(positions.map(pos => selectedPositionIds.includes(pos.id) ? {
      ...pos,
      feeTable
    } : pos));
    toast.success(`Gebührentabelle für ${selectedPositionIds.length} Positionen geändert`);
  };

  // Floating summary bar visibility
  const [showFloatingSummary, setShowFloatingSummary] = useState(true);

  // Calculate totals for floating summary
  const totals = useMemo(() => calculateTotal(positions, documentFee, includeVAT, discount), [positions, documentFee, includeVAT, discount]);

  // Keyboard shortcuts
  useKeyboardShortcuts([{
    key: 'n',
    ctrl: true,
    description: 'Neue Position hinzufügen',
    action: () => addPosition()
  }, {
    key: 'p',
    ctrl: true,
    description: 'PDF generieren',
    action: () => !isGeneratingPDF && handleGeneratePDF()
  }, {
    key: 'z',
    ctrl: true,
    description: 'Rückgängig machen',
    action: () => canUndo && handleUndo()
  }, {
    key: 'y',
    ctrl: true,
    description: 'Wiederherstellen',
    action: () => canRedo && handleRedo()
  }, {
    key: '?',
    description: 'Tastenkombinationen anzeigen',
    action: () => setShowKeyboardShortcuts(true)
  }], !showRestoreDialog && !showKeyboardShortcuts);

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));

  // Auto-generate and update invoice number based on document type
  useEffect(() => {
    // Generate new number if empty
    if (!invoiceNumber) {
      setInvoiceNumber(getNextDocumentNumber(documentType));
      return;
    }

    // Update prefix if document type changed
    const currentPrefix = invoiceNumber.split('-')[0];
    const expectedPrefix = documentType === 'invoice' ? 'RE' : 'AG';
    if (currentPrefix !== expectedPrefix) {
      const numberPart = invoiceNumber.split('-')[1] || '1001';
      setInvoiceNumber(`${expectedPrefix}-${numberPart}`);
    }
  }, [documentType, invoiceNumber]);

  // Check for saved data on mount
  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEYS.positions);
    const timestamp = localStorage.getItem(STORAGE_KEYS.lastSaveTimestamp);
    if (savedPositions && timestamp) {
      setSavedTimestamp(timestamp);
      setShowRestoreDialog(true);
    }
  }, []);

  // Auto-save every 10 seconds (optimized with change detection)
  useEffect(() => {
    const interval = setInterval(() => {
      // Don't auto-save if template was just loaded
      const timeSinceLoad = Date.now() - lastTemplateLoadTime;
      if (timeSinceLoad < TIMING.TEMPLATE_LOAD_GRACE) {
        return;
      }
      if (positions.length > 0 || clientData.name || clientData.email) {
        try {
          // Create hash of current data
          const currentData = {
            positions,
            clientData,
            documentFee,
            includeVAT,
            documentType,
            invoiceNumber,
            invoiceDate: invoiceDate.toISOString(),
            servicePeriod,
            discount
          };
          const currentHash = createDataHash(currentData);
          const lastHash = localStorage.getItem(STORAGE_KEYS.lastSaveHash);

          // Only save if data has changed
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
          // Show user-friendly error toast
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
    } catch (error) {
      toast.error('Fehler beim Wiederherstellen der Sitzung');
    }
    setShowRestoreDialog(false);
  };
  const clearSession = () => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    setShowRestoreDialog(false);
    toast.success('Neue Sitzung gestartet');
  };
  const addPosition = () => {
    const newPosition: Position = {
      id: generateUniqueId('pos'),
      activity: '',
      description: '',
      objectValue: 0,
      tenthRate: {
        numerator: 6,
        denominator: 10
      },
      quantity: 1,
      feeTable: 'A',
      applyExpenseFee: true,
      billingType: 'objectValue',
      hourlyRate: 0,
      hours: 0,
      flatRate: 0
    };
    setPositions([...positions, newPosition]);
  };
  const duplicatePosition = (id: string) => {
    const positionToDuplicate = positions.find(pos => pos.id === id);
    if (!positionToDuplicate) return;
    const duplicatedPosition: Position = {
      ...positionToDuplicate,
      id: generateUniqueId('pos'),
      activity: positionToDuplicate.activity + ' (Kopie)'
    };
    const index = positions.findIndex(pos => pos.id === id);
    const newPositions = [...positions];
    newPositions.splice(index + 1, 0, duplicatedPosition);
    setPositions(newPositions);
    toast.success('Position dupliziert');
  };
  const updatePosition = (id: string, updatedPosition: Position) => {
    setPositions(positions.map(pos => pos.id === id ? updatedPosition : pos));
  };
  const removePosition = (id: string) => {
    const positionName = positions.find(pos => pos.id === id)?.activity || 'Position';
    setPositions(positions.filter(pos => pos.id !== id));
    toast.success(`${positionName} gelöscht`, {
      action: {
        label: 'Rückgängig',
        onClick: handleUndo
      }
    });
  };
  const movePosition = (id: string, direction: 'up' | 'down') => {
    const currentIndex = positions.findIndex(pos => pos.id === id);
    if (currentIndex === -1) return;
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= positions.length) return;
    const newPositions = [...positions];
    [newPositions[currentIndex], newPositions[newIndex]] = [newPositions[newIndex], newPositions[currentIndex]];
    setPositions(newPositions);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const {
      active,
      over
    } = event;
    if (over && active.id !== over.id) {
      setPositions(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  const updateClientData = (field: keyof ClientData, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const loadTemplate = (template: Template) => {
    // Clear all auto-save data to start fresh
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });

    // Create new positions with unique IDs
    const newPositions = template.positions.map((pos, index) => ({
      ...pos,
      id: generateUniqueId(`pos-tpl-${index}`)
    }));

    // Set timestamp to prevent immediate auto-save
    setLastTemplateLoadTime(Date.now());

    // Update positions
    setPositions(newPositions);

    // Force re-render to ensure DnD properly registers all items
    setTimeout(() => {
      setRenderKey(prev => prev + 1);
    }, TIMING.RERENDER_DELAY);
    toast.success(`Vorlage "${template.name}" mit ${newPositions.length} Positionen geladen`);
  };
  const saveAsTemplate = (name: string) => {
    saveCustomTemplate(name, positions);
  };
  const validateBeforeGenerate = (): boolean => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if at least one position exists
    if (positions.length === 0) {
      errors.push('Bitte fügen Sie mindestens eine Position hinzu');
    }

    // Check if all positions have valid data
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

    // Check total amount
    const totals = calculateTotal(positions, documentFee, includeVAT, discount);
    if (totals.totalGross < VALIDATION.MIN_TOTAL_WARNING) {
      warnings.push(`Gesamtsumme (${totals.totalGross.toFixed(2)} €) ist sehr niedrig`);
    }

    // Check VAT
    if (!includeVAT) {
      warnings.push('Umsatzsteuer ist nicht aktiviert');
    }

    // Validate email if provided
    if (clientData.email) {
      try {
        emailSchema.parse(clientData.email);
      } catch {
        errors.push('E-Mail-Adresse ist ungültig');
      }
    }

    // Show errors
    if (errors.length > 0) {
      toast.error(<div>
          <div className="font-semibold mb-1">Fehler gefunden:</div>
          <ul className="list-disc list-inside text-sm">
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>, {
        duration: 5000
      });
      return false;
    }

    // Show warnings (non-blocking)
    if (warnings.length > 0) {
      toast.warning(<div>
          <div className="font-semibold mb-1">Hinweise:</div>
          <ul className="list-disc list-inside text-sm">
            {warnings.map((warning, i) => <li key={i}>{warning}</li>)}
          </ul>
        </div>, {
        duration: 4000
      });
    }
    return true;
  };
  const handleGeneratePDF = async () => {
    if (!validateBeforeGenerate()) return;
    setIsGeneratingPDF(true);
    try {
      // Increment invoice counter
      getNextDocumentNumber(documentType, true);
      const branding = loadBrandingSettings();

      // Lazy-load PDF generator for better bundle size
      const {
        generatePDF
      } = await import("@/utils/pdfGenerator");
      generatePDF(positions, documentFee, includeVAT, discount, documentType, clientData, invoiceNumber, invoiceDate, servicePeriod, branding);
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
      const {
        exportToExcel
      } = await import("@/utils/excelExporter");
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
    exportToCSV({
      positions,
      totals,
      clientData,
      invoiceNumber,
      brandingSettings
    });
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

    // Validate email before creating mailto link
    try {
      emailSchema.parse(clientData.email);
    } catch {
      toast.error('E-Mail-Adresse ist ungültig');
      return;
    }
    const totals = calculateTotal(positions, documentFee, includeVAT, discount);
    const documentTitle = documentType === 'quote' ? 'Angebot' : 'Rechnung';
    const subject = encodeURIComponent(`${documentTitle} - Steuerberatervergütung`);
    const body = encodeURIComponent(`Sehr geehrte Damen und Herren,

anbei erhalten Sie unser${documentType === 'quote' ? ' Angebot' : 'e Rechnung'} über Steuerberatungsleistungen.

Gesamtsumme: ${totals.totalGross.toFixed(2)} €

Mit freundlichen Grüßen`);
    const mailtoLink = `mailto:${clientData.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };
  return <>
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
            <AlertDialogCancel onClick={clearSession}>
              Neu starten
            </AlertDialogCancel>
            <AlertDialogAction onClick={restoreSession}>
              Wiederherstellen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <KeyboardShortcutsDialog open={showKeyboardShortcuts} onOpenChange={setShowKeyboardShortcuts} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 gap-2 flex-wrap">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">STBVV-Rechner</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setShowKeyboardShortcuts(true)} className="text-gray-600 hover:text-blue-600" title="Tastenkombinationen" aria-label="Tastenkombinationen anzeigen">
                  <Keyboard className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigate('/settings')} className="text-gray-600 hover:text-blue-600" title="Kanzlei-Einstellungen" aria-label="Kanzlei-Einstellungen öffnen">
                  <SettingsIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl">
              Gesetzeskonforme Steuerberatervergütung nach StBVV 2025 mit automatischer PDF-Erstellung.
              (Hinweis: Berechnung erfolgt nach gesetzlichen Mittelwerten)
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Positions Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Template Selector */}
              <TemplateSelector onLoadTemplate={loadTemplate} onSaveAsTemplate={saveAsTemplate} hasPositions={positions.length > 0} />

              {/* Client Data Card */}
              <Card className="border-2 border-green-200 bg-green-50/30">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-green-700 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Mandantendaten
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Name/Firma</Label>
                      <Input id="clientName" value={clientData.name} onChange={e => updateClientData('name', e.target.value)} placeholder="Max Mustermann / Mustermann GmbH" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientStreet">Straße, Hausnummer</Label>
                      <Input id="clientStreet" value={clientData.street} onChange={e => updateClientData('street', e.target.value)} placeholder="Musterstraße 123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientPostalCode">PLZ</Label>
                      <Input id="clientPostalCode" value={clientData.postalCode} onChange={e => updateClientData('postalCode', e.target.value)} placeholder="12345" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientCity">Ort</Label>
                      <Input id="clientCity" value={clientData.city} onChange={e => updateClientData('city', e.target.value)} placeholder="Musterstadt" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="clientEmail">E-Mail-Adresse</Label>
                      <Input id="clientEmail" type="email" value={clientData.email} onChange={e => updateClientData('email', e.target.value)} placeholder="max.mustermann@email.de" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bulk Operations Toolbar */}
              {isBulkMode && positions.length > 0 && <Card className="border-2 border-blue-500 bg-blue-50 sticky top-4 z-10 animate-slide-in-up">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-blue-700">
                          {selectedPositionIds.length} von {positions.length} ausgewählt
                        </span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleSelectAll} className="text-blue-600">
                            <CheckSquare className="w-4 h-4 mr-1" />
                            Alle auswählen
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleDeselectAll} className="text-blue-600">
                            <Square className="w-4 h-4 mr-1" />
                            Auswahl aufheben
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {selectedPositionIds.length > 0 && <>
                            <Button variant="outline" size="sm" onClick={handleBulkDuplicate} className="text-blue-600">
                              <Copy className="w-4 h-4 mr-1" />
                              Duplizieren
                            </Button>
                            <Select onValueChange={value => handleBulkChangeFeeTable(value as any)}>
                              <SelectTrigger className="w-[180px] h-9">
                                <SelectValue placeholder="Gebührentabelle" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A">Tabelle A</SelectItem>
                                <SelectItem value="B">Tabelle B</SelectItem>
                                <SelectItem value="C">Tabelle C</SelectItem>
                                <SelectItem value="D">Tabelle D</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                              <Trash2 className="w-4 h-4 mr-1" />
                              Löschen
                            </Button>
                          </>}
                        <Button variant="ghost" size="sm" onClick={() => {
                      setIsBulkMode(false);
                      setSelectedPositionIds([]);
                    }}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>}

              {/* Positions List */}
              <DndContext key={renderKey} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={useMemo(() => positions.map(p => p.id), [positions])} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {positions.map((position, index) => <PositionCard key={position.id} position={position} index={index + 1} onUpdate={updatePosition} onRemove={removePosition} onDuplicate={duplicatePosition} canMoveUp={index > 0} canMoveDown={index < positions.length - 1} onMove={movePosition} isSelectable={isBulkMode} isSelected={selectedPositionIds.includes(position.id)} onSelectionChange={handleToggleSelection} />)}
                  </div>
                </SortableContext>
              </DndContext>

              {positions.length === 0 && <Card className="text-center py-12">
                  <CardContent>
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Keine Positionen vorhanden
                    </h3>
                    <p className="text-gray-500">
                      Fügen Sie Ihre erste Position hinzu, um mit der Berechnung zu beginnen.
                    </p>
                  </CardContent>
                </Card>}

              {/* Add Position Button */}
              <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
                <CardContent className="text-center py-6 flex gap-4 justify-center flex-wrap">
                  <Button onClick={addPosition} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    Position hinzufügen
                  </Button>
                  {positions.length > 1 && <Button onClick={() => setIsBulkMode(!isBulkMode)} variant={isBulkMode ? "default" : "outline"} className="px-6 py-3 rounded-lg font-medium">
                      <CheckSquare className="w-4 h-4 mr-2" />
                      {isBulkMode ? 'Bulk-Modus beenden' : 'Bulk-Bearbeitung'}
                    </Button>}
                  {positions.length > 0 && <div className="flex gap-2">
                      <Button onClick={handleUndo} disabled={!canUndo} variant="outline" size="sm" title="Rückgängig (Ctrl+Z)">
                        <Undo2 className="w-4 h-4" />
                      </Button>
                      <Button onClick={handleRedo} disabled={!canRedo} variant="outline" size="sm" title="Wiederherstellen (Ctrl+Y)">
                        <Redo2 className="w-4 h-4" />
                      </Button>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Calculation Column */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4">
                <TotalCalculation positions={positions} documentFee={documentFee} includeVAT={includeVAT} discount={discount} onDocumentFeeChange={setDocumentFee} onVATChange={setIncludeVAT} onDiscountChange={setDiscount} />

                {/* Invoice Metadata */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Dokumenttyp</Label>
                      <Select value={documentType} onValueChange={(value: 'quote' | 'invoice') => setDocumentType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quote">Angebot</SelectItem>
                          <SelectItem value="invoice">Rechnung</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="invoiceNumber">
                        {documentType === 'invoice' ? 'Rechnungsnummer' : 'Angebotsnummer'}
                      </Label>
                      <Input id="invoiceNumber" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} placeholder={documentType === 'invoice' ? 'RE-1001' : 'AG-1001'} />
                    </div>

                    <div className="space-y-2">
                      <Label>Datum</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !invoiceDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {invoiceDate ? format(invoiceDate, "PPP", {
                            locale: de
                          }) : <span>Datum wählen</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={invoiceDate} onSelect={date => date && setInvoiceDate(date)} initialFocus className="pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="servicePeriod">Leistungszeitraum (optional)</Label>
                      <Input id="servicePeriod" value={servicePeriod} onChange={e => setServicePeriod(e.target.value)} placeholder="z.B. Januar 2025" />
                    </div>
                  </CardContent>
                </Card>

                {positions.length > 0 && <div className="space-y-2">
                    <Button onClick={handleGeneratePDF} disabled={isGeneratingPDF} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" aria-label={`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} als PDF herunterladen`}>
                      {isGeneratingPDF ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                      {isGeneratingPDF ? 'Wird erstellt...' : `${documentType === 'quote' ? 'Angebot' : 'Rechnung'} als PDF herunterladen`}
                    </Button>

                    <Button onClick={handleExportExcel} disabled={isExportingExcel} variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium transition-all no-print" aria-label="Als Excel exportieren">
                      <FileSpreadsheet className={`w-4 h-4 mr-2 ${isExportingExcel ? 'animate-pulse' : ''}`} />
                      {isExportingExcel ? 'Wird exportiert...' : 'Als Excel exportieren'}
                    </Button>
                    <Button onClick={handleExportCSV} variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg no-print" aria-label="Als CSV exportieren">
                      <FileText className="w-4 h-4 mr-2" />
                      Als CSV exportieren
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="w-full border-gray-600 text-gray-600 hover:bg-gray-50 py-3 rounded-lg no-print" aria-label="Drucken">
                      <Printer className="w-4 h-4 mr-2" />
                      Drucken
                    </Button>

                    {clientData.email && <Button onClick={handleSendEmail} variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-medium transition-all duration-200" aria-label={`E-Mail senden an ${clientData.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        E-Mail senden an {clientData.email}
                      </Button>}
                  </div>}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Summary Bar (Mobile & Desktop) */}
        {positions.length > 0 && showFloatingSummary && <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-2xl z-50 animate-slide-in-up">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-sm opacity-90">Gesamt-Summe:</div>
                  <div className="text-3xl font-bold animate-pop-number">
                    {totals.totalGross.toFixed(2)} €
                  </div>
                  {includeVAT && <div className="text-sm opacity-75">
                      (inkl. {totals.vatAmount.toFixed(2)} € MwSt.)
                    </div>}
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleGeneratePDF} disabled={isGeneratingPDF} className="bg-white text-blue-600 hover:bg-blue-50">
                    {isGeneratingPDF ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    PDF
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowFloatingSummary(false)} className="text-white hover:bg-white/20">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>}

        {/* Mobile FAB */}
        <Button onClick={addPosition} className="md:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-2xl z-40" size="icon" aria-label="Position hinzufügen">
          <Plus className="w-6 h-6" />
        </Button>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6">
              {/* Navigation Links */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <a 
                  href="/ueber-den-rechner" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/ueber-den-rechner');
                  }}
                >
                  Über den Rechner
                </a>
                <a 
                  href="/gebuhrenordnung" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/gebuhrenordnung');
                  }}
                >
                  Gebührenordnung
                </a>
                <a 
                  href="/faq" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/faq');
                  }}
                >
                  FAQ
                </a>
                <a 
                  href="/rechtliche-grundlagen" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/rechtliche-grundlagen');
                  }}
                >
                  Rechtliche Grundlagen
                </a>
                <a 
                  href="/anleitungen" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/anleitungen');
                  }}
                >
                  Anleitungen
                </a>
                <a 
                  href="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/blog');
                  }}
                >
                  Blog
                </a>
              </div>
              
              {/* Legal Links & Copyright */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground border-t border-border/50 pt-6">
                <div>
                  © 2025 Finanzgeflüster GmbH. Alle Rechte vorbehalten.
                </div>
                <div className="flex gap-6">
                  <a 
                    href="/impressum" 
                    className="hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/impressum');
                    }}
                  >
                    Impressum
                  </a>
                  <a 
                    href="/datenschutz" 
                    className="hover:text-foreground transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/datenschutz');
                    }}
                  >
                    Datenschutz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>;
};
export default Index;