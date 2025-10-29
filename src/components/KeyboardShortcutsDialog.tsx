import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Tastenkombinationen
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
      </DialogContent>
    </Dialog>
  );
}
