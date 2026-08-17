/**
 * usePositionActions - Kapselt alle Positions-Operationen (CRUD + Bulk)
 * @module hooks/usePositionActions
 *
 * Alle Updates laufen patch-basiert über funktionale Setter,
 * damit parallele Änderungen keine anderen Positionen überschreiben.
 */

import { useCallback } from 'react';
import { toast } from 'sonner';
import { Position } from '@/types/stbvv';
import { generateUniqueId } from '@/utils/idGenerator';

type PositionsSetter = (updater: Position[] | ((prev: Position[]) => Position[])) => void;

interface UsePositionActionsOptions {
  setPositions: PositionsSetter;
  selectedPositionIds: string[];
  setSelectedPositionIds: React.Dispatch<React.SetStateAction<string[]>>;
  onUndo: () => void;
}

export function usePositionActions({
  setPositions,
  selectedPositionIds,
  setSelectedPositionIds,
  onUndo,
}: UsePositionActionsOptions) {
  const addPosition = useCallback(() => {
    const newPosition: Position = {
      id: generateUniqueId('pos'),
      activity: '',
      description: '',
      objectValue: 0,
      tenthRate: { numerator: 6, denominator: 10 },
      quantity: 1,
      feeTable: 'A',
      applyExpenseFee: true,
      billingType: 'objectValue',
      hourlyRate: 0,
      hours: 0,
      flatRate: 0,
    };
    setPositions(prev => [...prev, newPosition]);
  }, [setPositions]);

  const duplicatePosition = useCallback((id: string) => {
    setPositions(prev => {
      const positionToDuplicate = prev.find((pos) => pos.id === id);
      if (!positionToDuplicate) return prev;

      const duplicatedPosition: Position = {
        ...positionToDuplicate,
        id: generateUniqueId('pos'),
        activity: positionToDuplicate.activity + ' (Kopie)',
      };
      const index = prev.findIndex((pos) => pos.id === id);
      const newPositions = [...prev];
      newPositions.splice(index + 1, 0, duplicatedPosition);
      return newPositions;
    });
    toast.success('Position dupliziert');
  }, [setPositions]);

  /** Nimmt einen PATCH entgegen, damit keine Felder anderer Eingaben überschrieben werden. */
  const updatePosition = useCallback((id: string, patch: Partial<Position>) => {
    setPositions(prev => prev.map(pos =>
      pos.id === id ? { ...pos, ...patch } : pos
    ));
  }, [setPositions]);

  const removePosition = useCallback((id: string) => {
    setPositions(prev => {
      const positionName = prev.find((pos) => pos.id === id)?.activity || 'Position';
      toast.success(`${positionName} gelöscht`, {
        action: { label: 'Rückgängig', onClick: onUndo },
      });
      return prev.filter((pos) => pos.id !== id);
    });
  }, [setPositions, onUndo]);

  const movePosition = useCallback((id: string, direction: 'up' | 'down') => {
    setPositions(prev => {
      const currentIndex = prev.findIndex((pos) => pos.id === id);
      if (currentIndex === -1) return prev;
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const newPositions = [...prev];
      [newPositions[currentIndex], newPositions[newIndex]] = [newPositions[newIndex], newPositions[currentIndex]];
      return newPositions;
    });
  }, [setPositions]);

  const handleBulkDelete = useCallback(() => {
    const deletedCount = selectedPositionIds.length;
    setPositions(prev => prev.filter((pos) => !selectedPositionIds.includes(pos.id)));
    setSelectedPositionIds([]);
    toast.success(`${deletedCount} Positionen gelöscht`, {
      action: { label: 'Rückgängig', onClick: onUndo },
    });
  }, [selectedPositionIds, setPositions, setSelectedPositionIds, onUndo]);

  const handleBulkDuplicate = useCallback(() => {
    setPositions(prev => {
      const selectedPositions = prev.filter((pos) => selectedPositionIds.includes(pos.id));
      const duplicated = selectedPositions.map((pos) => ({
        ...pos,
        id: generateUniqueId('pos'),
        activity: pos.activity + ' (Kopie)',
      }));
      return [...prev, ...duplicated];
    });
    toast.success(`${selectedPositionIds.length} Positionen dupliziert`);
    setSelectedPositionIds([]);
  }, [selectedPositionIds, setPositions, setSelectedPositionIds]);

  const handleBulkChangeFeeTable = useCallback((feeTable: 'A' | 'B' | 'C' | 'D') => {
    setPositions(prev => prev.map((pos) =>
      selectedPositionIds.includes(pos.id) ? { ...pos, feeTable } : pos
    ));
    toast.success(`Gebührentabelle für ${selectedPositionIds.length} Positionen geändert`);
  }, [selectedPositionIds, setPositions]);

  return {
    addPosition,
    duplicatePosition,
    updatePosition,
    removePosition,
    movePosition,
    handleBulkDelete,
    handleBulkDuplicate,
    handleBulkChangeFeeTable,
  };
}
