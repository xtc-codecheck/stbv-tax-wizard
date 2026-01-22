/**
 * useClientDatabase - Hook für Mandanten-Datenbank
 * @module hooks/useClientDatabase
 */

import { useState, useEffect, useCallback } from 'react';
import { ClientData } from '@/types/stbvv';
import { SavedClient } from '@/schemas/client.schema';
import { generateUniqueId } from '@/utils/idGenerator';

const STORAGE_KEY = 'stbvv_saved_clients';
const MAX_RECENT_CLIENTS = 10;

export function useClientDatabase() {
  const [clients, setClients] = useState<SavedClient[]>([]);

  // Load clients on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SavedClient[];
        setClients(parsed);
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  }, []);

  // Save clients to localStorage
  const saveToStorage = useCallback((updatedClients: SavedClient[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedClients));
      setClients(updatedClients);
    } catch (error) {
      console.error('Error saving clients:', error);
    }
  }, []);

  // Add or update a client
  const saveClient = useCallback((clientData: ClientData): SavedClient => {
    const now = new Date().toISOString();
    
    // Check if client already exists (by name)
    const existingIndex = clients.findIndex(
      c => c.name.toLowerCase().trim() === clientData.name.toLowerCase().trim()
    );

    if (existingIndex >= 0) {
      // Update existing client
      const updated: SavedClient = {
        ...clients[existingIndex],
        ...clientData,
        lastUsedAt: now,
      };
      const newClients = [...clients];
      newClients[existingIndex] = updated;
      saveToStorage(newClients);
      return updated;
    } else {
      // Add new client
      const newClient: SavedClient = {
        id: generateUniqueId('client'),
        ...clientData,
        createdAt: now,
        lastUsedAt: now,
      };
      saveToStorage([newClient, ...clients]);
      return newClient;
    }
  }, [clients, saveToStorage]);

  // Delete a client
  const deleteClient = useCallback((clientId: string) => {
    saveToStorage(clients.filter(c => c.id !== clientId));
  }, [clients, saveToStorage]);

  // Update lastUsedAt when a client is selected
  const markAsUsed = useCallback((clientId: string) => {
    const clientIndex = clients.findIndex(c => c.id === clientId);
    if (clientIndex >= 0) {
      const updated = [...clients];
      updated[clientIndex] = {
        ...updated[clientIndex],
        lastUsedAt: new Date().toISOString(),
      };
      saveToStorage(updated);
    }
  }, [clients, saveToStorage]);

  // Get recent clients sorted by lastUsedAt
  const recentClients = clients
    .sort((a, b) => new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime())
    .slice(0, MAX_RECENT_CLIENTS);

  // Search clients
  const searchClients = useCallback((query: string): SavedClient[] => {
    if (!query.trim()) return recentClients;
    const lowerQuery = query.toLowerCase();
    return clients.filter(
      c =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.city.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery)
    );
  }, [clients, recentClients]);

  return {
    clients,
    recentClients,
    saveClient,
    deleteClient,
    markAsUsed,
    searchClients,
  };
}
