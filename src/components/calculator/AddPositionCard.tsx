/**
 * AddPositionCard - Button zum Hinzufügen von Positionen
 * @module components/calculator/AddPositionCard
 */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CheckSquare, Undo2, Redo2 } from "lucide-react";

interface AddPositionCardProps {
  positionsCount: number;
  isBulkMode: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onAddPosition: () => void;
  onToggleBulkMode: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export function AddPositionCard({
  positionsCount,
  isBulkMode,
  canUndo,
  canRedo,
  onAddPosition,
  onToggleBulkMode,
  onUndo,
  onRedo,
}: AddPositionCardProps) {
  return (
    <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30">
      <CardContent className="text-center py-6 flex gap-4 justify-center flex-wrap">
        <Button
          onClick={onAddPosition}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-2" />
          Position hinzufügen
        </Button>
        {positionsCount > 1 && (
          <Button
            onClick={onToggleBulkMode}
            variant={isBulkMode ? 'default' : 'outline'}
            className="px-6 py-3 rounded-lg font-medium"
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            {isBulkMode ? 'Bulk-Modus beenden' : 'Bulk-Bearbeitung'}
          </Button>
        )}
        {positionsCount > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={onUndo}
              disabled={!canUndo}
              variant="outline"
              size="sm"
              title="Rückgängig (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={onRedo}
              disabled={!canRedo}
              variant="outline"
              size="sm"
              title="Wiederherstellen (Ctrl+Y)"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
