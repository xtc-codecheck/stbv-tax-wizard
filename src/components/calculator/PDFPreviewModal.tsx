/**
 * PDFPreviewModal - Modal mit PDF Live-Vorschau
 * @module components/calculator/PDFPreviewModal
 */

import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Loader2, X, ZoomIn, ZoomOut, RotateCw, FileText, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onDownload: () => void;
  documentType: 'quote' | 'invoice';
  onArchive?: () => void;
}

export function PDFPreviewModal({
  isOpen,
  onClose,
  previewUrl,
  isLoading,
  error,
  onDownload,
  documentType,
  onArchive,
}: PDFPreviewModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoom, setZoom] = useState(100);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setZoom(100);
      setIsDownloaded(false);
    }
  }, [isOpen]);

  const handleDownload = () => {
    onDownload();
    setIsDownloaded(true);
    onArchive?.();
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(100);

  const documentTitle = documentType === 'quote' ? 'Angebot' : 'Rechnung';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg">
                  PDF-Vorschau: {documentTitle}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Überprüfen Sie Ihr Dokument vor dem Download
                </DialogDescription>
              </div>
            </div>
            
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 mr-8">
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                className="h-8 w-8"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                className="h-8 w-8"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetZoom}
                className="h-8 w-8"
              >
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* PDF Preview Area */}
        <div className="flex-1 overflow-auto bg-muted/50 p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-muted-foreground">PDF wird erstellt...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-destructive">
              <X className="w-12 h-12" />
              <p>{error}</p>
              <Button variant="outline" onClick={onClose}>
                Schließen
              </Button>
            </div>
          ) : previewUrl ? (
            <div 
              className="flex justify-center"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
              }}
            >
              <iframe
                ref={iframeRef}
                src={previewUrl}
                className="w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm border"
                title="PDF Vorschau"
              />
            </div>
          ) : null}
        </div>

        {/* Footer with Actions */}
        <DialogFooter className="px-6 py-4 border-t bg-muted/30 flex-row justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Schließen
          </Button>
          
          <Button 
            onClick={handleDownload}
            disabled={isLoading || !!error || !previewUrl}
            className={cn(
              "min-w-[200px]",
              isDownloaded && "bg-emerald-600 hover:bg-emerald-700"
            )}
          >
            {isDownloaded ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Heruntergeladen!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                {documentTitle} herunterladen
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
