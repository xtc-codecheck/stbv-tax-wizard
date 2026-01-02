/**
 * BulkActionsToolbar - Massenaktionen für selektierte Positionen
 * @module components/calculator/BulkActionsToolbar
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckSquare, Square, Trash2, Copy, X } from "lucide-react";

interface BulkActionsToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkDuplicate: () => void;
  onBulkDelete: () => void;
  onBulkChangeFeeTable: (feeTable: 'A' | 'B' | 'C' | 'D') => void;
  onExitBulkMode: () => void;
}

export function BulkActionsToolbar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onBulkDuplicate,
  onBulkDelete,
  onBulkChangeFeeTable,
  onExitBulkMode,
}: BulkActionsToolbarProps) {
  return (
    <Card className="border-2 border-blue-500 bg-blue-50 sticky top-4 z-10 animate-slide-in-up">
      <CardContent className="py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-blue-700">
              {selectedCount} von {totalCount} ausgewählt
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onSelectAll}
                className="text-blue-600"
              >
                <CheckSquare className="w-4 h-4 mr-1" />
                Alle auswählen
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onDeselectAll}
                className="text-blue-600"
              >
                <Square className="w-4 h-4 mr-1" />
                Auswahl aufheben
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            {selectedCount > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBulkDuplicate}
                  className="text-blue-600"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Duplizieren
                </Button>
                <Select onValueChange={(value) => onBulkChangeFeeTable(value as 'A' | 'B' | 'C' | 'D')}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Gebührentabelle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Tabelle A</SelectItem>
                    <SelectItem value="B">Tabelle B</SelectItem>
                    <SelectItem value="C">Tabelle C</SelectItem>
                    <SelectItem value="D">Tabelle D</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onBulkDelete}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Löschen
                </Button>
              </>
            )}
            <Button variant="ghost" size="sm" onClick={onExitBulkMode}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
