/**
 * useClientDatabase - Hook für Mandanten-Datenbank
 * DEAKTIVIERT für DSGVO-Konformität
 * Keine Speicherung von personenbezogenen Mandantendaten
 * @module hooks/useClientDatabase
 */

import { useCallback } from 'react';
import { ClientData } from '@/types/stbvv';
import { SavedClient } from '@/schemas/client.schema';

/**
 * Deaktivierter Hook - gibt leere Daten zurück
 * Die Mandanten-Speicherung ist aus Datenschutzgründen deaktiviert
 */
export function useClientDatabase() {
  // Alle Funktionen sind No-Ops für DSGVO-Konformität
  const saveClient = useCallback((_clientData: ClientData): SavedClient => {
    // Keine Speicherung - gibt Dummy-Objekt zurück
    return {
      id: '',
      name: _clientData.name,
      street: _clientData.street,
      postalCode: _clientData.postalCode,
      city: _clientData.city,
      email: _clientData.email,
      createdAt: new Date().toISOString(),
      lastUsedAt: new Date().toISOString(),
    };
  }, []);

  const deleteClient = useCallback((_clientId: string) => {
    // No-op
  }, []);

  const markAsUsed = useCallback((_clientId: string) => {
    // No-op
  }, []);

  const searchClients = useCallback((_query: string): SavedClient[] => {
    return [];
  }, []);

  return {
    clients: [] as SavedClient[],
    recentClients: [] as SavedClient[],
    saveClient,
    deleteClient,
    markAsUsed,
    searchClients,
  };
}
