/**
 * Wizard Step 4: Export
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Position, ClientData, Discount } from '@/types/stbvv';
import { calculateTotal } from '@/utils/stbvvCalculator';
import { 
  ArrowLeft, 
  FileText, 
  Receipt, 
  Download, 
  Check,
  Loader2,
  Sparkles,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface WizardStepExportProps {
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
  onDocumentTypeChange: (type: 'quote' | 'invoice') => void;
  onInvoiceNumberChange: (number: string) => void;
  onInvoiceDateChange: (date: Date) => void;
  onServicePeriodChange: (period: string) => void;
  onIncludeVATChange: (include: boolean) => void;
  onGeneratePDF: () => void;
  onBack: () => void;
  onFinish: () => void;
}

export function WizardStepExport({
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
  onDocumentTypeChange,
  onInvoiceNumberChange,
  onInvoiceDateChange,
  onServicePeriodChange,
  onIncludeVATChange,
  onGeneratePDF,
  onBack,
  onFinish,
}: WizardStepExportProps) {
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const totals = calculateTotal(positions, documentFee, includeVAT, discount);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleGeneratePDF = async () => {
    await onGeneratePDF();
    setPdfGenerated(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Download className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Dokument erstellen</h2>
        <p className="text-muted-foreground mt-2">
          Konfigurieren Sie Ihr Dokument und erstellen Sie die PDF
        </p>
      </div>

      {/* Summary Card */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="font-medium">{clientData.name}</p>
              <p className="text-muted-foreground">
                {positions.length} Position{positions.length !== 1 ? 'en' : ''}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatCurrency(totals.totalGross)}</p>
              <p className="text-muted-foreground text-xs">inkl. MwSt.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Type Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Dokumententyp</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={documentType}
            onValueChange={(value) => onDocumentTypeChange(value as 'quote' | 'invoice')}
            className="grid grid-cols-2 gap-4"
          >
            <Label
              htmlFor="quote"
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
                documentType === 'quote' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              )}
            >
              <RadioGroupItem value="quote" id="quote" />
              <FileText className="w-5 h-5" />
              <div>
                <p className="font-medium">Angebot</p>
                <p className="text-xs text-muted-foreground">Kostenvoranschlag</p>
              </div>
            </Label>
            <Label
              htmlFor="invoice"
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
                documentType === 'invoice' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              )}
            >
              <RadioGroupItem value="invoice" id="invoice" />
              <Receipt className="w-5 h-5" />
              <div>
                <p className="font-medium">Rechnung</p>
                <p className="text-xs text-muted-foreground">Zahlungsaufforderung</p>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Document Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Dokumentendetails</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">
                {documentType === 'invoice' ? 'Rechnungsnummer' : 'Angebotsnummer'}
              </Label>
              <Input
                id="invoiceNumber"
                value={invoiceNumber}
                onChange={(e) => onInvoiceNumberChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Datum</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(invoiceDate, 'dd.MM.yyyy', { locale: de })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={invoiceDate}
                    onSelect={(date) => date && onInvoiceDateChange(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servicePeriod">Leistungszeitraum (optional)</Label>
            <Input
              id="servicePeriod"
              placeholder="z.B. Januar - Dezember 2024"
              value={servicePeriod}
              onChange={(e) => onServicePeriodChange(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <Label htmlFor="includeVAT">Umsatzsteuer ausweisen</Label>
              <p className="text-xs text-muted-foreground">19% MwSt. hinzufügen</p>
            </div>
            <Switch
              id="includeVAT"
              checked={includeVAT}
              onCheckedChange={onIncludeVATChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Generate PDF Button */}
      <Button
        size="lg"
        className="w-full gap-2 h-14 text-lg"
        onClick={handleGeneratePDF}
        disabled={isGeneratingPDF}
      >
        {isGeneratingPDF ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            PDF wird erstellt...
          </>
        ) : pdfGenerated ? (
          <>
            <Check className="w-5 h-5" />
            PDF erneut erstellen
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            PDF erstellen & herunterladen
          </>
        )}
      </Button>

      {pdfGenerated && (
        <Card className="border-green-500 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">
                  PDF erfolgreich erstellt!
                </p>
                <p className="text-sm text-green-600 dark:text-green-500">
                  Das Dokument wurde heruntergeladen
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Zurück
        </Button>
        
        <Button 
          variant="secondary"
          onClick={onFinish}
          className="gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Zum Pro-Modus
        </Button>
      </div>
    </div>
  );
}
