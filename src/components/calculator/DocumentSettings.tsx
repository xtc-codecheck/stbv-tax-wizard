/**
 * DocumentSettings - Dokumenttyp, Nummer, Datum, Leistungszeitraum
 * @module components/calculator/DocumentSettings
 */

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DocumentSettingsProps {
  documentType: 'quote' | 'invoice';
  invoiceNumber: string;
  invoiceDate: Date;
  servicePeriod: string;
  onDocumentTypeChange: (type: 'quote' | 'invoice') => void;
  onInvoiceNumberChange: (number: string) => void;
  onInvoiceDateChange: (date: Date) => void;
  onServicePeriodChange: (period: string) => void;
}

export function DocumentSettings({
  documentType,
  invoiceNumber,
  invoiceDate,
  servicePeriod,
  onDocumentTypeChange,
  onInvoiceNumberChange,
  onInvoiceDateChange,
  onServicePeriodChange,
}: DocumentSettingsProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label>Dokumenttyp</Label>
          <Select value={documentType} onValueChange={onDocumentTypeChange}>
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
          <Input
            id="invoiceNumber"
            value={invoiceNumber}
            onChange={(e) => onInvoiceNumberChange(e.target.value)}
            placeholder={documentType === 'invoice' ? 'RE-1001' : 'AG-1001'}
          />
        </div>

        <div className="space-y-2">
          <Label>Datum</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !invoiceDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoiceDate ? (
                  format(invoiceDate, "PPP", { locale: de })
                ) : (
                  <span>Datum wählen</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={invoiceDate}
                onSelect={(date) => date && onInvoiceDateChange(date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="servicePeriod">Leistungszeitraum (optional)</Label>
          <Input
            id="servicePeriod"
            value={servicePeriod}
            onChange={(e) => onServicePeriodChange(e.target.value)}
            placeholder="z.B. Januar 2025"
          />
        </div>
      </CardContent>
    </Card>
  );
}
