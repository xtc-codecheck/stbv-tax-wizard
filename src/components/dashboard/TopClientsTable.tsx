/**
 * Top-Mandanten Tabelle
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TopClient } from '@/hooks/useDocumentArchive';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

interface TopClientsTableProps {
  clients: TopClient[];
}

export function TopClientsTable({ clients }: TopClientsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (clients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top-Mandanten</CardTitle>
          <CardDescription>Nach Umsatz sortiert</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            <p>Noch keine Rechnungen erstellt</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top-Mandanten</CardTitle>
        <CardDescription>Die umsatzstärksten Mandanten</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mandant</TableHead>
              <TableHead className="text-right">Umsatz</TableHead>
              <TableHead className="text-center">Rechnungen</TableHead>
              <TableHead className="text-right hidden sm:table-cell">Letzte</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={client.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Badge variant={index < 3 ? 'default' : 'secondary'} className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="truncate max-w-[150px]">{client.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {formatCurrency(client.totalRevenue)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{client.documentCount}</Badge>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground hidden sm:table-cell">
                  {formatDistanceToNow(new Date(client.lastDocument), { addSuffix: true, locale: de })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
