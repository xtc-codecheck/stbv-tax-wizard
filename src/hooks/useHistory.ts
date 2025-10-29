import { useState, useCallback } from 'react';

export interface HistoryState<T> {
  data: T;
  timestamp: number;
}

export function useHistory<T>(initialState: T, maxHistory: number = 10) {
  const [history, setHistory] = useState<HistoryState<T>[]>([
    { data: initialState, timestamp: Date.now() }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pushHistory = useCallback((newState: T) => {
    setHistory(prev => {
      // Remove any states after current index (for redo branch clearing)
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Add new state
      newHistory.push({
        data: newState,
        timestamp: Date.now()
      });

      // Keep only last maxHistory items
      const trimmedHistory = newHistory.slice(-maxHistory);
      
      setCurrentIndex(trimmedHistory.length - 1);
      return trimmedHistory;
    });
  }, [currentIndex, maxHistory]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return history[currentIndex - 1].data;
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return history[currentIndex + 1].data;
    }
    return null;
  }, [currentIndex, history]);

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
