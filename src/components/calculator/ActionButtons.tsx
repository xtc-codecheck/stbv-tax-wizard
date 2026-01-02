/**
 * ActionButtons - PDF, Excel, CSV, Print, Email Buttons
 * @module components/calculator/ActionButtons
 */

import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText, Printer, Mail, Loader2 } from "lucide-react";

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
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        aria-label={`${documentType === 'quote' ? 'Angebot' : 'Rechnung'} als PDF herunterladen`}
      >
        {isGeneratingPDF ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        {isGeneratingPDF
          ? 'Wird erstellt...'
          : `${documentType === 'quote' ? 'Angebot' : 'Rechnung'} als PDF herunterladen`}
      </Button>

      <Button
        onClick={onExportExcel}
        disabled={isExportingExcel}
        variant="outline"
        className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium transition-all no-print"
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
        className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg no-print"
        aria-label="Als CSV exportieren"
      >
        <FileText className="w-4 h-4 mr-2" />
        Als CSV exportieren
      </Button>

      <Button
        onClick={onPrint}
        variant="outline"
        className="w-full border-gray-600 text-gray-600 hover:bg-gray-50 py-3 rounded-lg no-print"
        aria-label="Drucken"
      >
        <Printer className="w-4 h-4 mr-2" />
        Drucken
      </Button>

      {clientEmail && (
        <Button
          onClick={onSendEmail}
          variant="outline"
          className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-medium transition-all duration-200"
          aria-label={`E-Mail senden an ${clientEmail}`}
        >
          <Mail className="w-4 h-4 mr-2" />
          E-Mail senden an {clientEmail}
        </Button>
      )}
    </div>
  );
}
