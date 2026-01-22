/**
 * Letzte Dokumente Liste
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArchivedDocument } from '@/schemas/archivedDocument.schema';
import { formatDistanceToNow, format } from 'date-fns';
import { de } from 'date-fns/locale';
import { FileText, Receipt, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecentDocumentsProps {
  documents: ArchivedDocument[];
  onDelete?: (id: string) => void;
}

export function RecentDocuments({ documents, onDelete }: RecentDocumentsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Letzte Dokumente</CardTitle>
          <CardDescription>Erstellte Rechnungen und Angebote</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-[200px] flex-col items-center justify-center text-muted-foreground">
            <FileText className="h-12 w-12 mb-3 opacity-50" />
            <p>Noch keine Dokumente erstellt</p>
            <p className="text-sm">Erstellen Sie eine Rechnung oder ein Angebot</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Letzte Dokumente</CardTitle>
        <CardDescription>Die letzten {documents.length} erstellten Dokumente</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`rounded-full p-2 ${doc.documentType === 'Rechnung' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                    {doc.documentType === 'Rechnung' ? (
                      <Receipt className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{doc.documentNumber}</span>
                      <Badge variant={doc.documentType === 'Rechnung' ? 'default' : 'secondary'} className="text-xs">
                        {doc.documentType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {doc.clientData.name || 'Kein Mandant'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(doc.createdAt), 'dd.MM.yyyy', { locale: de })} • {formatDistanceToNow(new Date(doc.createdAt), { addSuffix: true, locale: de })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-mono font-medium text-sm">
                      {formatCurrency(doc.totalGross)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doc.positions.length} Position{doc.positions.length !== 1 ? 'en' : ''}
                    </p>
                  </div>
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(doc.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
