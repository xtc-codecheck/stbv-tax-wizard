/**
 * PositionList - Container für alle Positionen mit Drag & Drop
 * @module components/calculator/PositionList
 */

import { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PositionCard from "@/components/PositionCard";
import { Position } from "@/types/stbvv";

interface PositionListProps {
  positions: Position[];
  renderKey: number;
  isBulkMode: boolean;
  selectedPositionIds: string[];
  onUpdatePosition: (id: string, position: Position) => void;
  onRemovePosition: (id: string) => void;
  onDuplicatePosition: (id: string) => void;
  onMovePosition: (id: string, direction: 'up' | 'down') => void;
  onToggleSelection: (id: string, selected: boolean) => void;
  onReorder: (positions: Position[]) => void;
}

export function PositionList({
  positions,
  renderKey,
  isBulkMode,
  selectedPositionIds,
  onUpdatePosition,
  onRemovePosition,
  onDuplicatePosition,
  onMovePosition,
  onToggleSelection,
  onReorder,
}: PositionListProps) {
  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = positions.findIndex((item) => item.id === active.id);
      const newIndex = positions.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(positions, oldIndex, newIndex));
    }
  };

  const positionIds = useMemo(() => positions.map((p) => p.id), [positions]);

  if (positions.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Keine Positionen vorhanden
          </h3>
          <p className="text-gray-500">
            Fügen Sie Ihre erste Position hinzu, um mit der Berechnung zu beginnen.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <DndContext
      key={renderKey}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={positionIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {positions.map((position, index) => (
            <PositionCard
              key={position.id}
              position={position}
              index={index + 1}
              onUpdate={onUpdatePosition}
              onRemove={onRemovePosition}
              onDuplicate={onDuplicatePosition}
              canMoveUp={index > 0}
              canMoveDown={index < positions.length - 1}
              onMove={onMovePosition}
              isSelectable={isBulkMode}
              isSelected={selectedPositionIds.includes(position.id)}
              onSelectionChange={onToggleSelection}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
