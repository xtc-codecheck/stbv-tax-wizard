/**
 * ClientDataFormAdvanced - Mandantendaten mit Auto-Complete und Datenbank
 * @module components/calculator/ClientDataFormAdvanced
 */

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { User, Save, Trash2, Clock, ChevronDown, Check, UserPlus } from 'lucide-react';
import { ClientData } from '@/types/stbvv';
import { useClientDatabase } from '@/hooks/useClientDatabase';
import { toast } from 'sonner';

interface ClientDataFormAdvancedProps {
  clientData: ClientData;
  onUpdate: (field: keyof ClientData, value: string) => void;
  onUpdateAll: (data: ClientData) => void;
}

export function ClientDataFormAdvanced({
  clientData,
  onUpdate,
  onUpdateAll,
}: ClientDataFormAdvancedProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { clients, recentClients, saveClient, deleteClient, markAsUsed, searchClients } = useClientDatabase();

  const searchResults = useMemo(
    () => searchClients(searchQuery),
    [searchClients, searchQuery]
  );

  const handleSelectClient = (savedClient: { id: string; name: string; street: string; postalCode: string; city: string; email: string }) => {
    markAsUsed(savedClient.id);
    onUpdateAll({
      name: savedClient.name,
      street: savedClient.street,
      postalCode: savedClient.postalCode,
      city: savedClient.city,
      email: savedClient.email,
    });
    setOpen(false);
    toast.success(`Mandant "${savedClient.name}" ausgewählt`);
  };

  const handleSaveClient = () => {
    if (!clientData.name.trim()) {
      toast.error('Bitte geben Sie einen Namen ein');
      return;
    }
    saveClient(clientData);
    toast.success(`Mandant "${clientData.name}" gespeichert`);
  };

  const handleDeleteClient = (clientId: string, clientName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteClient(clientId);
    toast.success(`Mandant "${clientName}" gelöscht`);
  };

  const hasUnsavedChanges = useMemo(() => {
    if (!clientData.name.trim()) return false;
    const existingClient = clients.find(
      c => c.name.toLowerCase().trim() === clientData.name.toLowerCase().trim()
    );
    if (!existingClient) return true;
    return (
      existingClient.street !== clientData.street ||
      existingClient.postalCode !== clientData.postalCode ||
      existingClient.city !== clientData.city ||
      existingClient.email !== clientData.email
    );
  }, [clients, clientData]);

  return (
    <Card className="border-2 border-primary/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Mandantendaten
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && clientData.name.trim() && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveClient}
                className="h-8"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Speichern
              </Button>
            )}
            {clients.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {clients.length} gespeichert
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name with Client Picker */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="clientName">Name/Firma</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  id="clientName"
                  value={clientData.name}
                  onChange={(e) => onUpdate('name', e.target.value)}
                  placeholder="Max Mustermann / Mustermann GmbH"
                  className="pr-10"
                />
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    aria-label="Mandanten auswählen"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[350px] p-0" align="end">
                  <Command>
                    <CommandInput
                      placeholder="Mandant suchen..."
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>
                        <div className="py-6 text-center text-sm">
                          <UserPlus className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                          <p className="text-muted-foreground">Kein Mandant gefunden</p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Geben Sie die Daten ein und speichern Sie
                          </p>
                        </div>
                      </CommandEmpty>

                      {/* Recent Clients */}
                      {!searchQuery && recentClients.length > 0 && (
                        <>
                          <CommandGroup heading="Zuletzt verwendet">
                            {recentClients.slice(0, 5).map(client => (
                              <CommandItem
                                key={client.id}
                                value={client.name}
                                onSelect={() => handleSelectClient({
                                  id: client.id,
                                  name: client.name,
                                  street: client.street || '',
                                  postalCode: client.postalCode || '',
                                  city: client.city || '',
                                  email: client.email || '',
                                })}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                  <div>
                                    <p className="font-medium text-sm">{client.name}</p>
                                    {client.city && (
                                      <p className="text-xs text-muted-foreground">{client.city}</p>
                                    )}
                                  </div>
                                </div>
                                {client.name.toLowerCase() === clientData.name.toLowerCase() && (
                                  <Check className="h-4 w-4 text-primary" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                        </>
                      )}

                      {/* All/Search Results */}
                      <CommandGroup heading={searchQuery ? 'Suchergebnisse' : 'Alle Mandanten'}>
                        {searchResults.map(client => (
                          <CommandItem
                            key={client.id}
                            value={client.name}
                            onSelect={() => handleSelectClient({
                              id: client.id,
                              name: client.name,
                              street: client.street || '',
                              postalCode: client.postalCode || '',
                              city: client.city || '',
                              email: client.email || '',
                            })}
                            className="flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2">
                              <User className="h-3.5 w-3.5 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-sm">{client.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {[client.postalCode, client.city].filter(Boolean).join(' ')}
                                  {client.email && ` · ${client.email}`}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {client.name.toLowerCase() === clientData.name.toLowerCase() && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={(e) => handleDeleteClient(client.id, client.name, e)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientStreet">Straße, Hausnummer</Label>
            <Input
              id="clientStreet"
              value={clientData.street}
              onChange={(e) => onUpdate('street', e.target.value)}
              placeholder="Musterstraße 123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientCity">PLZ, Ort</Label>
            <div className="flex gap-2">
              <Input
                id="clientPostalCode"
                value={clientData.postalCode}
                onChange={(e) => onUpdate('postalCode', e.target.value)}
                placeholder="12345"
                className="w-24"
              />
              <Input
                id="clientCity"
                value={clientData.city}
                onChange={(e) => onUpdate('city', e.target.value)}
                placeholder="Musterstadt"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="clientEmail">E-Mail-Adresse</Label>
            <Input
              id="clientEmail"
              type="email"
              value={clientData.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              placeholder="max.mustermann@email.de"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
