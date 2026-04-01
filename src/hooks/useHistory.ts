import { useState, useCallback, useRef } from 'react';

export interface HistoryState<T> {
  data: T;
  timestamp: number;
}

export function useHistory<T>(initialState: T, maxHistory: number = 10) {
  const [history, setHistory] = useState<HistoryState<T>[]>([
    { data: initialState, timestamp: Date.now() }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use refs to avoid stale closures in undo/redo
  const historyRef = useRef(history);
  historyRef.current = history;
  const indexRef = useRef(currentIndex);
  indexRef.current = currentIndex;

  const pushHistory = useCallback((newState: T) => {
    setHistory(prev => {
      const idx = indexRef.current;
      const newHistory = prev.slice(0, idx + 1);
      newHistory.push({ data: newState, timestamp: Date.now() });
      const trimmed = newHistory.slice(-maxHistory);
      const newIndex = trimmed.length - 1;
      setCurrentIndex(newIndex);
      indexRef.current = newIndex;
      return trimmed;
    });
  }, [maxHistory]);

  const undo = useCallback(() => {
    const idx = indexRef.current;
    if (idx > 0) {
      const newIndex = idx - 1;
      setCurrentIndex(newIndex);
      indexRef.current = newIndex;
      return historyRef.current[newIndex].data;
    }
    return null;
  }, []);

  const redo = useCallback(() => {
    const idx = indexRef.current;
    const hist = historyRef.current;
    if (idx < hist.length - 1) {
      const newIndex = idx + 1;
      setCurrentIndex(newIndex);
      indexRef.current = newIndex;
      return hist[newIndex].data;
    }
    return null;
  }, []);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;
  const currentState = history[currentIndex]?.data || initialState;

  return {
    currentState,
    pushHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    historyLength: history.length,
    currentIndex
  };
}
