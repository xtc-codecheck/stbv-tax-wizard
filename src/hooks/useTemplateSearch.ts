/**
 * useTemplateSearch - Hook für Fuzzy-Search in Vorlagen
 * @module hooks/useTemplateSearch
 */

import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import { Template } from '@/types/stbvv';

const STORAGE_KEY = 'stbvv_recent_templates';
const MAX_RECENT = 5;

export interface TemplateCategory {
  id: string;
  name: string;
  color: string;
  templates: Template[];
}

// Template categories with colors
export const TEMPLATE_CATEGORIES: { id: string; name: string; color: string; range: [number, number] }[] = [
  { id: 'einkommensteuer', name: 'Einkommensteuererklärungen', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', range: [1, 5] },
  { id: 'eur', name: 'EÜR Personengesellschaft', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', range: [6, 6] },
  { id: 'jahresabschluss', name: 'Jahresabschlüsse', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300', range: [7, 10] },
  { id: 'fibu', name: 'Finanzbuchhaltung', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', range: [11, 13] },
  { id: 'lohn', name: 'Lohnbuchhaltung', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300', range: [14, 14] },
  { id: 'sonstige', name: 'Sonstige Steuern', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300', range: [15, 15] },
  { id: 'beratung', name: 'Beratung & Rechtsbehelfe', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300', range: [16, 20] },
];

export function getCategoryForTemplate(templateId: string): typeof TEMPLATE_CATEGORIES[0] | null {
  const templateNum = parseInt(templateId.replace('template-', ''));
  if (isNaN(templateNum)) return null;
  
  return TEMPLATE_CATEGORIES.find(
    cat => templateNum >= cat.range[0] && templateNum <= cat.range[1]
  ) || null;
}

export function useTemplateSearch(templates: Template[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentTemplateIds, setRecentTemplateIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(templates, {
      keys: [
        { name: 'name', weight: 2 },
        { name: 'positions.activity', weight: 1 },
        { name: 'positions.description', weight: 0.5 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [templates]);

  // Search templates
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return templates;
    }
    return fuse.search(searchQuery).map(result => result.item);
  }, [fuse, searchQuery, templates]);

  // Get recent templates
  const recentTemplates = useMemo(() => {
    return recentTemplateIds
      .map(id => templates.find(t => t.id === id))
      .filter((t): t is Template => t !== undefined)
      .slice(0, MAX_RECENT);
  }, [recentTemplateIds, templates]);

  // Add to recent templates
  const addToRecent = useCallback((templateId: string) => {
    setRecentTemplateIds(prev => {
      const newRecent = [templateId, ...prev.filter(id => id !== templateId)].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecent));
      return newRecent;
    });
  }, []);

  // Group templates by category
  const categorizedTemplates = useMemo((): TemplateCategory[] => {
    const templatesToUse = searchQuery.trim() ? searchResults : templates;
    
    return TEMPLATE_CATEGORIES.map(cat => ({
      ...cat,
      templates: templatesToUse.filter(t => {
        const category = getCategoryForTemplate(t.id);
        return category?.id === cat.id;
      }),
    })).filter(cat => cat.templates.length > 0);
  }, [templates, searchResults, searchQuery]);

  // Get custom templates
  const customTemplates = useMemo(() => {
    const templatesToUse = searchQuery.trim() ? searchResults : templates;
    return templatesToUse.filter(t => t.isCustom);
  }, [templates, searchResults, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    recentTemplates,
    addToRecent,
    categorizedTemplates,
    customTemplates,
    hasResults: searchResults.length > 0,
  };
}
