import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Keyboard, ExternalLink } from "lucide-react";

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function KeyboardShortcutsDialog({ open, onOpenChange }: KeyboardShortcutsDialogProps) {
  const shortcuts = [
    { keys: ['Ctrl', 'N'], description: 'Neue Position hinzufügen' },
    { keys: ['Ctrl', 'S'], description: 'Als Vorlage speichern' },
    { keys: ['Ctrl', 'P'], description: 'PDF generieren' },
    { keys: ['Ctrl', 'D'], description: 'Position duplizieren (wenn fokussiert)' },
    { keys: ['Ctrl', 'Z'], description: 'Rückgängig machen' },
    { keys: ['Ctrl', 'Y'], description: 'Wiederherstellen' },
    { keys: ['?'], description: 'Diese Hilfe anzeigen' },
    { keys: ['Esc'], description: 'Dialog schließen' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Tastenkombinationen & Hilfe
          </DialogTitle>
          <DialogDescription>
            Verwenden Sie diese Shortcuts für eine schnellere Bedienung
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 text-xs font-semibold text-foreground bg-background border border-border rounded shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Tipp: Drücken Sie <kbd className="px-1.5 py-0.5 text-xs font-semibold bg-background border border-border rounded">?</kbd> jederzeit, um diese Hilfe anzuzeigen
        </div>

        {/* FAQ Section */}
        <div className="border-t pt-6 mt-4">
          <h3 className="font-semibold text-lg mb-4">Häufige Fragen</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Was ist die Gebührentabelle?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Die Gebührentabellen A-E sind in der Steuerberatervergütungsverordnung (StBVV) §§ 24-35 definiert und legen fest, welche Gebühr je nach Gegenstandswert berechnet werden kann.
                </p>
                <a 
                  href="https://www.gesetze-im-internet.de/stbvv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  StBVV im Volltext <ExternalLink className="w-3 h-3" />
                </a>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Wie funktioniert der Zehntelsatz?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Der Zehntelsatz (§ 24 StBVV) ermöglicht eine Reduktion der Gebühr bei wiederkehrenden Tätigkeiten. Statt der vollen Gebühr können Sie einen reduzierten Satz ansetzen (z.B. 5/10 = 50% der Tabellengebühr).
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Was ist die Auslagenpauschale?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Gemäß § 16 StBVV können Sie für Post- und Telekommunikationsdienstleistungen sowie Schreibauslagen eine Pauschale in Rechnung stellen, maximal 20 Euro pro Auftrag bzw. Kalendermonat.
                </p>
                <a 
                  href="https://www.gesetze-im-internet.de/stbvv/__16.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  § 16 StBVV <ExternalLink className="w-3 h-3" />
                </a>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Werden meine Daten gespeichert?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground">
                  Nein, diese Anwendung arbeitet vollständig lokal in Ihrem Browser. Es werden keine Daten an externe Server übertragen. Ihre Eingaben existieren nur während der aktuellen Sitzung.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
