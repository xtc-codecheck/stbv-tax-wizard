/**
 * CommandPalette - Globale Suche mit Cmd+K
 * @module components/CommandPalette
 */

import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  FileText,
  Plus,
  Settings,
  Download,
  Calculator,
  HelpCircle,
  FileSpreadsheet,
  Printer,
  Undo2,
  Redo2,
  BookOpen,
  Keyboard,
  Users,
  Clock,
} from 'lucide-react';
import { Template } from '@/types/stbvv';
import { getTemplates } from '@/utils/templateManager';
import { getCategoryForTemplate } from '@/hooks/useTemplateSearch';
import Fuse from 'fuse.js';
import { Badge } from '@/components/ui/badge';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPosition: () => void;
  onLoadTemplate: (template: Template) => void;
  onGeneratePDF: () => void;
  onExportExcel: () => void;
  onPrint: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onShowShortcuts: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isGeneratingPDF: boolean;
}

export function CommandPalette({
  open,
  onOpenChange,
  onAddPosition,
  onLoadTemplate,
  onGeneratePDF,
  onExportExcel,
  onPrint,
  onUndo,
  onRedo,
  onShowShortcuts,
  canUndo,
  canRedo,
  isGeneratingPDF,
}: CommandPaletteProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const templates = useMemo(() => getTemplates(), []);

  // Fuse.js for template search
  const fuse = useMemo(() => {
    return new Fuse(templates, {
      keys: ['name', 'positions.activity'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [templates]);

  // Search templates
  const templateResults = useMemo(() => {
    if (!search.trim()) return templates.slice(0, 5);
    return fuse.search(search).map(r => r.item).slice(0, 8);
  }, [fuse, search, templates]);

  // Keyboard shortcut to open
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleSelect = (callback: () => void) => {
    onOpenChange(false);
    setSearch('');
    callback();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Suchen... (Vorlagen, Aktionen, Seiten)"
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>

        {/* Quick Actions */}
        <CommandGroup heading="Schnellaktionen">
          <CommandItem onSelect={() => handleSelect(onAddPosition)}>
            <Plus className="mr-2 h-4 w-4" />
            Neue Position hinzufügen
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘N
            </kbd>
          </CommandItem>
          <CommandItem 
            onSelect={() => handleSelect(onGeneratePDF)}
            disabled={isGeneratingPDF}
          >
            <Download className="mr-2 h-4 w-4" />
            PDF generieren
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘P
            </kbd>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(onExportExcel)}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel exportieren
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(onPrint)}>
            <Printer className="mr-2 h-4 w-4" />
            Drucken
          </CommandItem>
          <CommandItem 
            onSelect={() => handleSelect(onUndo)}
            disabled={!canUndo}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Rückgängig
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘Z
            </kbd>
          </CommandItem>
          <CommandItem 
            onSelect={() => handleSelect(onRedo)}
            disabled={!canRedo}
          >
            <Redo2 className="mr-2 h-4 w-4" />
            Wiederherstellen
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘Y
            </kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Templates */}
        <CommandGroup heading="Vorlagen laden">
          {templateResults.map(template => {
            const category = getCategoryForTemplate(template.id);
            return (
              <CommandItem
                key={template.id}
                value={template.name}
                onSelect={() => handleSelect(() => onLoadTemplate(template))}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span className="flex-1 truncate">{template.name}</span>
                {template.isCustom && (
                  <Badge variant="outline" className="ml-2 text-xs">Eigene</Badge>
                )}
                {category && !template.isCustom && (
                  <Badge variant="secondary" className={`ml-2 text-xs ${category.color}`}>
                    {category.name.split(' ')[0]}
                  </Badge>
                )}
                <span className="ml-2 text-xs text-muted-foreground">
                  {template.positions.length} Pos.
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleSelect(() => navigate('/'))}>
            <Calculator className="mr-2 h-4 w-4" />
            Rechner
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate('/settings'))}>
            <Settings className="mr-2 h-4 w-4" />
            Kanzlei-Einstellungen
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate('/gebuhrenordnung'))}>
            <BookOpen className="mr-2 h-4 w-4" />
            Gebührenordnung
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate('/faq'))}>
            <HelpCircle className="mr-2 h-4 w-4" />
            FAQ
          </CommandItem>
          <CommandItem onSelect={() => handleSelect(() => navigate('/blog'))}>
            <FileText className="mr-2 h-4 w-4" />
            Blog
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Help */}
        <CommandGroup heading="Hilfe">
          <CommandItem onSelect={() => handleSelect(onShowShortcuts)}>
            <Keyboard className="mr-2 h-4 w-4" />
            Tastenkombinationen anzeigen
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ?
            </kbd>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
