/**
 * FloatingSummaryBar - Sticky Footer mit Brutto-Summe
 * @module components/calculator/FloatingSummaryBar
 */

import { Button } from "@/components/ui/button";
import { Eye, Loader2, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface FloatingSummaryBarProps {
  totalGross: number;
  vatAmount: number;
  includeVAT: boolean;
  isGeneratingPDF: boolean;
  onGeneratePDF: () => void;
  onClose: () => void;
}

export function FloatingSummaryBar({
  totalGross,
  vatAmount,
  includeVAT,
  isGeneratingPDF,
  onGeneratePDF,
  onClose,
}: FloatingSummaryBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-2xl z-50 animate-slide-in-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="text-sm opacity-90">Gesamt-Summe:</div>
            <div className="text-3xl font-bold animate-pop-number">
              {formatCurrency(totalGross)}
            </div>
            {includeVAT && (
              <div className="text-sm opacity-75">
                (inkl. {formatCurrency(vatAmount)} MwSt.)
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={onGeneratePDF}
              disabled={isGeneratingPDF}
              className="bg-white text-primary hover:bg-primary/5"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Eye className="w-4 h-4 mr-2" />
              )}
              PDF-Vorschau
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
