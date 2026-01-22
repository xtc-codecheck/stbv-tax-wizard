/**
 * DocumentTabs - Tab bar for multi-document editing
 * @module components/calculator/DocumentTabs
 */

import React, { useState } from 'react';
import { X, Plus, FileText, Copy, Pencil, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { DocumentTabData } from '@/types/documentTab';
import { cn } from '@/lib/utils';

interface DocumentTabsProps {
  tabs: DocumentTabData[];
  activeTabId: string;
  canAddTab: boolean;
  onSwitchTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onAddTab: () => void;
  onRenameTab: (tabId: string, newName: string) => void;
  onDuplicateTab: (tabId: string) => void;
  hasUnsavedChanges: (tabId: string) => boolean;
}

export function DocumentTabs({
  tabs,
  activeTabId,
  canAddTab,
  onSwitchTab,
  onCloseTab,
  onAddTab,
  onRenameTab,
  onDuplicateTab,
  hasUnsavedChanges,
}: DocumentTabsProps) {
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [closeConfirmTabId, setCloseConfirmTabId] = useState<string | null>(null);

  const startEditing = (tab: DocumentTabData) => {
    setEditingTabId(tab.id);
    setEditingName(tab.name);
  };

  const finishEditing = () => {
    if (editingTabId && editingName.trim()) {
      onRenameTab(editingTabId, editingName.trim());
    }
    setEditingTabId(null);
    setEditingName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setEditingTabId(null);
      setEditingName('');
    }
  };

  const handleCloseClick = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    
    if (hasUnsavedChanges(tabId)) {
      setCloseConfirmTabId(tabId);
    } else {
      onCloseTab(tabId);
    }
  };

  const confirmClose = () => {
    if (closeConfirmTabId) {
      onCloseTab(closeConfirmTabId);
      setCloseConfirmTabId(null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <DropdownMenu key={tab.id}>
            <DropdownMenuTrigger asChild>
              <div
                className={cn(
                  'group flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all min-w-[120px] max-w-[200px]',
                  tab.id === activeTabId
                    ? 'bg-background shadow-sm text-foreground'
                    : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
                )}
                onClick={() => onSwitchTab(tab.id)}
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                
                {editingTabId === tab.id ? (
                  <div className="flex items-center gap-1 flex-1">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={finishEditing}
                      className="h-6 text-sm py-0 px-1"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5"
                      onClick={(e) => {
                        e.stopPropagation();
                        finishEditing();
                      }}
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="truncate text-sm font-medium flex-1">
                      {tab.name}
                    </span>
                    
                    {/* Unsaved indicator */}
                    {hasUnsavedChanges(tab.id) && (
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    )}
                    
                    {/* Close button */}
                    {tabs.length > 1 && (
                      <button
                        className={cn(
                          'p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted',
                          tab.id === activeTabId && 'opacity-60'
                        )}
                        onClick={(e) => handleCloseClick(tab.id, e)}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => startEditing(tab)}>
                <Pencil className="w-4 h-4 mr-2" />
                Umbenennen
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicateTab(tab.id)}>
                <Copy className="w-4 h-4 mr-2" />
                Duplizieren
              </DropdownMenuItem>
              {tabs.length > 1 && (
                <DropdownMenuItem
                  onClick={() => {
                    if (hasUnsavedChanges(tab.id)) {
                      setCloseConfirmTabId(tab.id);
                    } else {
                      onCloseTab(tab.id);
                    }
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <X className="w-4 h-4 mr-2" />
                  Schließen
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        {/* Add Tab Button */}
        {canAddTab && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 flex-shrink-0"
                onClick={onAddTab}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Neues Dokument (max. 10)</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Close Confirmation Dialog */}
      <AlertDialog open={!!closeConfirmTabId} onOpenChange={() => setCloseConfirmTabId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tab schließen?</AlertDialogTitle>
            <AlertDialogDescription>
              Dieses Dokument enthält ungespeicherte Daten. Möchten Sie es wirklich schließen?
              Die Daten gehen verloren.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClose} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Schließen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
