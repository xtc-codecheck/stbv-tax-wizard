/**
 * useDocumentTabs - Hook for managing multiple document tabs
 * @module hooks/useDocumentTabs
 */

import { useState, useCallback, useEffect } from 'react';
import { DocumentTabData, DocumentTabsState, createEmptyTabData } from '@/types/documentTab';
import { generateUniqueId } from '@/utils/idGenerator';
import { getNextDocumentNumber } from '@/utils/documentNumber';
import { STORAGE_KEYS } from '@/constants';

const STORAGE_KEY = STORAGE_KEYS.POSITIONS.replace('autosave_positions', 'document_tabs');
const MAX_TABS = 10;

export function useDocumentTabs() {
  const [tabsState, setTabsState] = useState<DocumentTabsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as DocumentTabsState;
        if (parsed.tabs && parsed.tabs.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn('[useDocumentTabs] Error loading saved tabs:', error);
    }
    
    // Create initial tab
    const initialTab = createEmptyTabData(
      generateUniqueId('tab'),
      'Dokument 1'
    );
    initialTab.invoiceNumber = getNextDocumentNumber('quote');
    
    return {
      tabs: [initialTab],
      activeTabId: initialTab.id,
    };
  });

  // Persist tabs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tabsState));
    } catch (error) {
      console.error('[useDocumentTabs] Error saving tabs:', error);
    }
  }, [tabsState]);

  const activeTab = tabsState.tabs.find(t => t.id === tabsState.activeTabId) || tabsState.tabs[0];

  // Add a new tab
  const addTab = useCallback(() => {
    if (tabsState.tabs.length >= MAX_TABS) {
      return null;
    }

    const newTabNumber = tabsState.tabs.length + 1;
    const newTab = createEmptyTabData(
      generateUniqueId('tab'),
      `Dokument ${newTabNumber}`
    );
    newTab.invoiceNumber = getNextDocumentNumber('quote');

    setTabsState(prev => ({
      tabs: [...prev.tabs, newTab],
      activeTabId: newTab.id,
    }));

    return newTab;
  }, [tabsState.tabs.length]);

  // Close a tab
  const closeTab = useCallback((tabId: string) => {
    setTabsState(prev => {
      // Don't close the last tab
      if (prev.tabs.length <= 1) {
        return prev;
      }

      const tabIndex = prev.tabs.findIndex(t => t.id === tabId);
      const newTabs = prev.tabs.filter(t => t.id !== tabId);
      
      // If closing active tab, switch to adjacent tab
      let newActiveId = prev.activeTabId;
      if (tabId === prev.activeTabId) {
        const newIndex = Math.min(tabIndex, newTabs.length - 1);
        newActiveId = newTabs[newIndex].id;
      }

      return {
        tabs: newTabs,
        activeTabId: newActiveId,
      };
    });
  }, []);

  // Switch to a tab
  const switchTab = useCallback((tabId: string) => {
    setTabsState(prev => ({
      ...prev,
      activeTabId: tabId,
    }));
  }, []);

  // Update a tab's data
  const updateTab = useCallback((tabId: string, data: Partial<DocumentTabData>) => {
    setTabsState(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab =>
        tab.id === tabId
          ? { ...tab, ...data, updatedAt: new Date().toISOString() }
          : tab
      ),
    }));
  }, []);

  // Rename a tab
  const renameTab = useCallback((tabId: string, newName: string) => {
    updateTab(tabId, { name: newName });
  }, [updateTab]);

  // Duplicate a tab
  const duplicateTab = useCallback((tabId: string) => {
    if (tabsState.tabs.length >= MAX_TABS) {
      return null;
    }

    const tabToDuplicate = tabsState.tabs.find(t => t.id === tabId);
    if (!tabToDuplicate) return null;

    const newTab: DocumentTabData = {
      ...tabToDuplicate,
      id: generateUniqueId('tab'),
      name: `${tabToDuplicate.name} (Kopie)`,
      invoiceNumber: getNextDocumentNumber(tabToDuplicate.documentType),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTabsState(prev => ({
      tabs: [...prev.tabs, newTab],
      activeTabId: newTab.id,
    }));

    return newTab;
  }, [tabsState.tabs]);

  // Check if can add more tabs
  const canAddTab = tabsState.tabs.length < MAX_TABS;

  // Check if tab has unsaved changes (positions or client data)
  const hasUnsavedChanges = useCallback((tabId: string): boolean => {
    const tab = tabsState.tabs.find(t => t.id === tabId);
    if (!tab) return false;
    return tab.positions.length > 0 || !!tab.clientData.name || !!tab.clientData.email;
  }, [tabsState.tabs]);

  return {
    tabs: tabsState.tabs,
    activeTab,
    activeTabId: tabsState.activeTabId,
    addTab,
    closeTab,
    switchTab,
    updateTab,
    renameTab,
    duplicateTab,
    canAddTab,
    hasUnsavedChanges,
  };
}
