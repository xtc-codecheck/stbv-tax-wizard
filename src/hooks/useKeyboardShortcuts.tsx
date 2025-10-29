import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Exception: Allow Ctrl+S, Ctrl+P even in inputs
        if (!(event.ctrlKey && ['s', 'p'].includes(event.key.toLowerCase()))) {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

export const SHORTCUTS = {
  NEW_POSITION: { key: 'n', ctrl: true, description: 'Neue Position hinzufügen' },
  SAVE_TEMPLATE: { key: 's', ctrl: true, description: 'Als Vorlage speichern' },
  GENERATE_PDF: { key: 'p', ctrl: true, description: 'PDF generieren' },
  DUPLICATE: { key: 'd', ctrl: true, description: 'Position duplizieren (wenn fokussiert)' },
  UNDO: { key: 'z', ctrl: true, description: 'Rückgängig machen' },
  REDO: { key: 'y', ctrl: true, description: 'Wiederherstellen' },
  HELP: { key: '?', description: 'Tastenkombinationen anzeigen' },
  ESCAPE: { key: 'Escape', description: 'Dialog schließen' },
};
