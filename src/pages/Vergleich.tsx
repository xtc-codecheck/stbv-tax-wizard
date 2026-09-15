/**
 * Vergleichsseite: Funktionsumfang gegenüber einfachen Online-Rechnern
 * @module pages/Vergleich
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calculator, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import { JsonLd, breadcrumbSchema } from '@/components/seo';
import { BASE_URL, STBVV_CURRENT_VERSION } from '@/constants';

const FEATURES: { label: string; ours: boolean; others: boolean; note: string }[] = [
  {
    label: 'Mehrere Positionen in einem Dokument',
    ours: true,
    others: false,
    note: 'Ein Mandat besteht selten aus einer einzigen Gebühr.',
  },
  {
    label: 'Vorlagen für typische Mandate',
    ours: true,
    others: false,
    note: 'Jahresabschluss, EÜR, Lohn, Einkommensteuer – in einem Klick.',
  },
  {
    label: 'Angebot und Rechnung als PDF',
    ours: true,
    others: false,
    note: 'Mit Kanzleidaten, Positionsübersicht und Prüfsumme.',
  },
  {
    label: 'Mehrere Dokumente gleichzeitig',
    ours: true,
    others: false,
    note: 'Bis zu zehn Vorgänge parallel bearbeiten.',
  },
  {
    label: 'Tabellen A, B, C und D',
    ours: true,
    others: false,
    note: 'Inklusive Tabelle D Teil a und Teil b für land- und forstwirtschaftliche Betriebe.',
  },
  {
    label: 'Zeit- und Pauschalgebühren',
    ours: true,
    others: false,
    note: 'Zeitgebühr nach § 13 StBVV neben Wertgebühren im selben Dokument.',
  },
  {
    label: 'Export nach Excel und CSV',
    ours: true,
    others: false,
    note: 'Für die Übernahme in Kanzleisoftware.',
  },
  {
    label: 'Einzelberechnung eines Gegenstandswerts',
    ours: true,
    others: true,
    note: 'Das können einfache Online-Rechner ebenfalls.',
  },
];

const Vergleich = () => {
  const title = 'StBVV-Rechner im Vergleich zu einfachen Online-Rechnern';
  const description =
    'Was unser StBVV-Rechner gegenüber einfachen Gebührenrechnern leistet: mehrere Positionen, Vorlagen, PDF-Rechnung, Tabellen A bis D und Zeitgebühr.';

  return (
    <PageLayout>
      <Helmet>
        <title>StBVV-Rechner im Vergleich – Funktionsumfang im Überblick</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${BASE_URL}/vergleich`} />
      </Helmet>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'StBVV-Rechner', path: '/' },
          { name: 'Vergleich', path: '/vergleich' },
        ])}
      />

      <article className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground">
            Die meisten Gebührenrechner im Netz berechnen eine einzelne Wertgebühr. Für die Kanzleipraxis reicht das
            nicht: Ein Mandat besteht aus mehreren Positionen, braucht ein Dokument und eine nachvollziehbare
            Rechtsgrundlage.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Rechtsstand: {STBVV_CURRENT_VERSION.sourceDocument}
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Funktionsvergleich</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="text-left p-3 font-medium">
                      Funktion
                    </th>
                    <th scope="col" className="p-3 font-medium">
                      Dieser Rechner
                    </th>
                    <th scope="col" className="p-3 font-medium">
                      Einfache Online-Rechner
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((feature) => (
                    <tr key={feature.label} className="border-t border-border/60 align-top">
                      <td className="p-3">
                        <div className="font-medium">{feature.label}</div>
                        <div className="text-muted-foreground text-xs mt-1">{feature.note}</div>
                      </td>
                      <td className="p-3 text-center">
                        {feature.ours ? (
                          <Check className="inline h-4 w-4 text-primary" aria-label="vorhanden" />
                        ) : (
                          <X className="inline h-4 w-4 text-muted-foreground" aria-label="nicht vorhanden" />
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {feature.others ? (
                          <Check className="inline h-4 w-4 text-primary" aria-label="vorhanden" />
                        ) : (
                          <X className="inline h-4 w-4 text-muted-foreground" aria-label="nicht vorhanden" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div>
          <Link to="/">
            <Button className="gap-2">
              <Calculator className="h-4 w-4" />
              Kostenlos ausprobieren
            </Button>
          </Link>
        </div>
      </article>
    </PageLayout>
  );
};

export default Vergleich;
