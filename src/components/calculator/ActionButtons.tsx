/**
 * ActionButtons - PDF, Excel, CSV, Print, Email Buttons
 * @module components/calculator/ActionButtons
 */

import { Button } from "@/components/ui/button";
import { Eye, FileSpreadsheet, FileText, Printer, Mail, Loader2 } from "lucide-react";

interface ActionButtonsProps {
  documentType: 'quote' | 'invoice';
  clientEmail?: string;
  isGeneratingPDF: boolean;
  isExportingExcel: boolean;
  onGeneratePDF: () => void;
  onExportExcel: () => void;
  onExportCSV: () => void;
  onPrint: () => void;
  onSendEmail: () => void;
}

export function ActionButtons({
  documentType,
  clientEmail,
  isGeneratingPDF,
  isExportingExcel,
  onGeneratePDF,
  onExportExcel,
  onExportCSV,
  onPrint,
  onSendEmail,
}: ActionButtonsProps) {
  return (
    <div className="space-y-2">
      <Button
        onClick={onGeneratePDF}
        disabled={isGeneratingPDF}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        aria-label={`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} als PDF anzeigen`}
      >
        {isGeneratingPDF ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Eye className="w-4 h-4 mr-2" />
        )}
        {isGeneratingPDF
          ? 'Wird erstellt...'
          : `PDF-Vorschau anzeigen`}
      </Button>

      <Button
        onClick={onExportExcel}
        disabled={isExportingExcel}
        variant="outline"
        className="w-full border-primary text-primary hover:bg-primary/5 py-3 rounded-lg font-medium transition-all no-print"
        aria-label="Als Excel exportieren"
      >
        <FileSpreadsheet
          className={`w-4 h-4 mr-2 ${isExportingExcel ? 'animate-pulse' : ''}`}
        />
        {isExportingExcel ? 'Wird exportiert...' : 'Als Excel exportieren'}
      </Button>

      <Button
        onClick={onExportCSV}
        variant="outline"
        className="w-full border-muted-foreground/30 text-muted-foreground hover:bg-muted py-3 rounded-lg no-print"
        aria-label="Als CSV exportieren"
      >
        <FileText className="w-4 h-4 mr-2" />
        Als CSV exportieren
      </Button>

      <Button
        onClick={onPrint}
        variant="outline"
        className="w-full border-muted-foreground/30 text-muted-foreground hover:bg-muted py-3 rounded-lg no-print"
        aria-label="Drucken"
      >
        <Printer className="w-4 h-4 mr-2" />
        Drucken
      </Button>

      {clientEmail && (
        <Button
          onClick={onSendEmail}
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/5 py-3 rounded-lg font-medium transition-all duration-200"
          aria-label={`E-Mail senden an ${clientEmail}`}
        >
          <Mail className="w-4 h-4 mr-2" />
          E-Mail senden an {clientEmail}
        </Button>
      )}
    </div>
  );
}
