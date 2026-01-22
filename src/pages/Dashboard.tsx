/**
 * Analyse-Dashboard Seite
 * Zeigt Umsatz-Statistiken, Top-Mandanten und Trend-Analysen
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  StatCard, 
  RevenueChart, 
  TopClientsTable, 
  RecentDocuments, 
  DocumentCountChart 
} from '@/components/dashboard';
import { useDocumentArchive } from '@/hooks/useDocumentArchive';
import { ThemeToggle } from '@/components/ThemeToggle';
import { 
  ArrowLeft, 
  Calculator, 
  Euro, 
  FileText, 
  Users, 
  TrendingUp,
  Receipt,
  BarChart3,
  Trash2
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function Dashboard() {
  const { 
    isLoading, 
    stats, 
    monthlyRevenue, 
    topClients, 
    recentDocuments,
    deleteDocument,
    clearArchive 
  } = useDocumentArchive();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleDeleteDocument = (id: string) => {
    deleteDocument(id);
    toast.success('Dokument aus Archiv gelöscht');
  };

  const handleClearArchive = () => {
    clearArchive();
    toast.success('Archiv wurde geleert');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-6 w-48" />
            </div>
          </div>
        </header>
        <main className="container py-8 px-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Analyse-Dashboard</h1>
                <p className="text-xs text-muted-foreground">Umsatz & Statistiken</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Zum Rechner</span>
              </Button>
            </Link>
            
            {stats.totalDocuments > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Archiv löschen</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Archiv wirklich löschen?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Diese Aktion löscht alle {stats.totalDocuments} archivierten Dokumente unwiderruflich. 
                      Die Statistiken werden zurückgesetzt.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearArchive} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Löschen
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 px-4 space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Gesamtumsatz"
            value={formatCurrency(stats.totalRevenue)}
            subtitle={`${stats.totalInvoices} Rechnungen gesamt`}
            icon={<Euro className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Diesen Monat"
            value={formatCurrency(stats.thisMonthRevenue)}
            subtitle={`${stats.thisMonthInvoiceCount} Rechnungen`}
            trend={stats.revenueChange}
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Ø Rechnungswert"
            value={formatCurrency(stats.avgInvoiceValue)}
            subtitle="Durchschnittlicher Rechnungsbetrag"
            icon={<Receipt className="h-5 w-5 text-primary" />}
          />
          <StatCard
            title="Mandanten"
            value={stats.uniqueClients.toString()}
            subtitle={`${stats.totalOffers} Angebote erstellt`}
            icon={<Users className="h-5 w-5 text-primary" />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          <RevenueChart data={monthlyRevenue} />
          <DocumentCountChart data={monthlyRevenue} />
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TopClientsTable clients={topClients} />
          <RecentDocuments 
            documents={recentDocuments} 
            onDelete={handleDeleteDocument}
          />
        </div>

        {/* Empty State */}
        {stats.totalDocuments === 0 && (
          <div className="rounded-lg border-2 border-dashed bg-muted/50 p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-semibold">Noch keine Dokumente</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Erstellen Sie Ihre erste Rechnung oder Ihr erstes Angebot, um Statistiken zu sehen.
            </p>
            <Link to="/">
              <Button className="mt-4 gap-2">
                <Calculator className="h-4 w-4" />
                Rechnung erstellen
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 mt-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>StBVV-Rechner © {new Date().getFullYear()} • Alle Daten lokal gespeichert</p>
        </div>
      </footer>
    </div>
  );
}
