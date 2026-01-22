/**
 * Barrel Export für alle Hooks
 * @module hooks
 */

// Custom Hooks
export { useLocalStorage } from './useLocalStorage';
export { useAsync, useAsyncEffect, type AsyncState, type UseAsyncReturn } from './useAsync';
export { useDebounce } from './useDebounce';
export { useHistory, type HistoryState } from './useHistory';
export { useKeyboardShortcuts, type KeyboardShortcut } from './useKeyboardShortcuts';
export { useIsMobile } from './use-mobile';
export { useTheme } from './useTheme';
export { useClientDatabase } from './useClientDatabase';
export { useTemplateSearch, getCategoryForTemplate, TEMPLATE_CATEGORIES, type TemplateCategory } from './useTemplateSearch';
export { useDocumentArchive, type MonthlyRevenue, type TopClient, type CategoryStats } from './useDocumentArchive';
export { usePWAInstall } from './usePWAInstall';

// Re-export toast hooks
export { useToast, toast } from './use-toast';
