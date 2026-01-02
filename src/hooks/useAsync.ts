/**
 * useAsync Hook für async Operationen
 * @module hooks/useAsync
 */

import { useState, useCallback } from 'react';

/**
 * Status einer async Operation
 */
export interface AsyncState<T> {
  /** Ladezustand */
  isLoading: boolean;
  /** Fehler (falls vorhanden) */
  error: Error | null;
  /** Daten (falls erfolgreich) */
  data: T | null;
  /** Wurde die Operation bereits ausgeführt? */
  isExecuted: boolean;
}

/**
 * Rückgabewert des useAsync Hooks
 */
export interface UseAsyncReturn<T, Args extends unknown[]> extends AsyncState<T> {
  /** Führt die async Funktion aus */
  execute: (...args: Args) => Promise<T | null>;
  /** Setzt den Status zurück */
  reset: () => void;
}

/**
 * Hook für async Operationen mit Loading, Error und Data State
 * 
 * @param asyncFunction - Die async Funktion
 * @returns AsyncState und execute Funktion
 * 
 * @example
 * ```tsx
 * const { execute, isLoading, error, data } = useAsync(fetchData);
 * 
 * const handleClick = async () => {
 *   await execute(userId);
 * };
 * ```
 */
export function useAsync<T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>
): UseAsyncReturn<T, Args> {
  const [state, setState] = useState<AsyncState<T>>({
    isLoading: false,
    error: null,
    data: null,
    isExecuted: false,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        const result = await asyncFunction(...args);
        setState({
          isLoading: false,
          error: null,
          data: result,
          isExecuted: true,
        });
        return result;
      } catch (error) {
        const errorInstance = error instanceof Error 
          ? error 
          : new Error(String(error));
        
        setState({
          isLoading: false,
          error: errorInstance,
          data: null,
          isExecuted: true,
        });
        return null;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      data: null,
      isExecuted: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Hook für async Operationen die sofort ausgeführt werden
 * 
 * @param asyncFunction - Die async Funktion
 * @param args - Argumente für die Funktion
 * @param deps - Dependencies für erneute Ausführung
 */
export function useAsyncEffect<T>(
  asyncFunction: () => Promise<T>,
  deps: React.DependencyList = []
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    isLoading: true,
    error: null,
    data: null,
    isExecuted: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(() => {
    let isMounted = true;

    const execute = async () => {
      try {
        const result = await asyncFunction();
        if (isMounted) {
          setState({
            isLoading: false,
            error: null,
            data: result,
            isExecuted: true,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            isLoading: false,
            error: error instanceof Error ? error : new Error(String(error)),
            data: null,
            isExecuted: true,
          });
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, deps)();

  return state;
}
