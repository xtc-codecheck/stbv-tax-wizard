/**
 * GuidedWorkflow - Hauptcontainer für den Wizard
 */

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Position, ClientData, Template, Discount } from '@/types/stbvv';
import { WizardProgress } from './WizardProgress';
import { WizardStepClient } from './WizardStepClient';
import { WizardStepTemplate } from './WizardStepTemplate';
import { WizardStepValues } from './WizardStepValues';
import { WizardStepExport } from './WizardStepExport';
import { generateUniqueId } from '@/utils/idGenerator';
import { X, Wand2 } from 'lucide-react';

interface GuidedWorkflowProps {
  // State
  positions: Position[];
  clientData: ClientData;
  documentFee: number;
  includeVAT: boolean;
  discount: Discount | null;
  documentType: 'quote' | 'invoice';
  invoiceNumber: string;
  invoiceDate: Date;
  servicePeriod: string;
  isGeneratingPDF: boolean;
  
  // Callbacks
  onPositionsChange: (positions: Position[]) => void;
  onClientDataChange: (data: ClientData) => void;
  onDocumentFeeChange: (fee: number) => void;
  onIncludeVATChange: (include: boolean) => void;
  onDocumentTypeChange: (type: 'quote' | 'invoice') => void;
  onInvoiceNumberChange: (number: string) => void;
  onInvoiceDateChange: (date: Date) => void;
  onServicePeriodChange: (period: string) => void;
  onGeneratePDF: () => void;
  onUpdatePosition: (id: string, position: Position) => void;
  
  // Close wizard
  onClose: () => void;
}

const WIZARD_STEPS = [
  { id: 1, title: 'Mandant', description: 'Kundendaten eingeben' },
  { id: 2, title: 'Vorlage', description: 'Tätigkeiten auswählen' },
  { id: 3, title: 'Werte', description: 'Beträge eintragen' },
  { id: 4, title: 'Export', description: 'PDF erstellen' },
];

export function GuidedWorkflow({
  positions,
  clientData,
  documentFee,
  includeVAT,
  discount,
  documentType,
  invoiceNumber,
  invoiceDate,
  servicePeriod,
  isGeneratingPDF,
  onPositionsChange,
  onClientDataChange,
  onDocumentFeeChange,
  onIncludeVATChange,
  onDocumentTypeChange,
  onInvoiceNumberChange,
  onInvoiceDateChange,
  onServicePeriodChange,
  onGeneratePDF,
  onUpdatePosition,
  onClose,
}: GuidedWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  // Calculate completed steps
  const completedSteps = useMemo(() => {
    const completed: number[] = [];
    
    if (clientData.name.trim()) completed.push(1);
    if (positions.length > 0) completed.push(2);
    if (positions.some(p => p.objectValue > 0 || p.billingType !== 'objectValue')) {
      completed.push(3);
    }
    
    return completed;
  }, [clientData.name, positions]);

  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    
    // Load template positions
    const newPositions = template.positions.map((pos, index) => ({
      ...pos,
      id: generateUniqueId(`pos-wizard-${index}`),
    }));
    onPositionsChange(newPositions);
  };

  // Handle skip template (manual mode)
  const handleSkipTemplate = () => {
    // Add one empty position
    const emptyPosition: Position = {
      id: generateUniqueId('pos-wizard'),
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
    onPositionsChange([emptyPosition]);
    setCurrentStep(3);
  };

  // Navigation
  const goToNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const goToPrevious = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Geführte Erstellung</h1>
              <p className="text-sm text-muted-foreground">Schritt für Schritt zur Rechnung</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress */}
        <WizardProgress 
          steps={WIZARD_STEPS} 
          currentStep={currentStep} 
          completedSteps={completedSteps}
        />

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            {currentStep === 1 && (
              <WizardStepClient
                clientData={clientData}
                onUpdateClientData={onClientDataChange}
                onNext={goToNext}
              />
            )}

            {currentStep === 2 && (
              <WizardStepTemplate
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleSelectTemplate}
                onBack={goToPrevious}
                onNext={goToNext}
                onSkip={handleSkipTemplate}
              />
            )}

            {currentStep === 3 && (
              <WizardStepValues
                positions={positions}
                documentFee={documentFee}
                includeVAT={includeVAT}
                onUpdatePosition={onUpdatePosition}
                onUpdateDocumentFee={onDocumentFeeChange}
                onBack={goToPrevious}
                onNext={goToNext}
              />
            )}

            {currentStep === 4 && (
              <WizardStepExport
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
                onDocumentTypeChange={onDocumentTypeChange}
                onInvoiceNumberChange={onInvoiceNumberChange}
                onInvoiceDateChange={onInvoiceDateChange}
                onServicePeriodChange={onServicePeriodChange}
                onIncludeVATChange={onIncludeVATChange}
                onGeneratePDF={onGeneratePDF}
                onBack={goToPrevious}
                onFinish={onClose}
              />
            )}
          </CardContent>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Sie können jederzeit mit dem X-Button oben rechts zum normalen Modus wechseln
        </p>
      </div>
    </div>
  );
}
