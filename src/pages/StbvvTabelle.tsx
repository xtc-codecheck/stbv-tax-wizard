/**
 * Landingpage je StBVV-Gebührentabelle (A–D)
 * @module pages/StbvvTabelle
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo';
import { BASE_URL, STBVV_CURRENT_VERSION } from '@/constants';
import { TABLE_LANDINGS, type TableLetter } from '@/data/landingContent';
import { feeTableA, feeTableB, feeTableC, feeTableDPartA, feeTableDPartB } from '@/utils/stbvvTables';
import { formatEuro } from '@/utils/centArithmetic';
import type { FeeTableEntry } from '@/types/stbvv';

interface StbvvTabelleProps {
  letter: TableLetter;
}

const getRows = (letter: TableLetter): { label: string; rows: FeeTableEntry[]; unit: string }[] => {
  switch (letter) {
    case 'A':
      return [{ label: 'Tabelle A – volle Gebühr', rows: feeTableA, unit: 'Gegenstandswert' }];
    case 'B':
      return [{ label: 'Tabelle B – volle Gebühr', rows: feeTableB, unit: 'Gegenstandswert' }];
    case 'C':
      return [{ label: 'Tabelle C – Monatsgebühr', rows: feeTableC, unit: 'Jahresumsatz' }];
    case 'D':
      return [
        { label: 'Tabelle D Teil a – Betriebsfläche', rows: feeTableDPartA, unit: 'Hektar' },
        { label: 'Tabelle D Teil b – Jahresumsatz', rows: feeTableDPartB, unit: 'Jahresumsatz' },
      ];
  }
};

const formatBound = (value: number, unit: string) =>
  unit === 'Hektar' ? `${value.toLocaleString('de-DE')} ha` : formatEuro(value);

const StbvvTabelle = ({ letter }: StbvvTabelleProps) => {
  const content = TABLE_LANDINGS[letter];
  const tables = getRows(letter);

  return (
    <PageLayout>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={`${BASE_URL}${content.path}`} />
      </Helmet>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'StBVV-Rechner', path: '/' },
            { name: content.title, path: content.path },
          ]),
          faqSchema(content.faq),
        ]}
      />

      <article className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl text-muted-foreground">{content.intro}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Rechtsgrundlage: {content.legalBasis} · Stand: {STBVV_CURRENT_VERSION.federalGazetteRef}
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button className="gap-2">
                <Calculator className="h-4 w-4" />
                Gebühr nach Tabelle {letter} berechnen
              </Button>
            </Link>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Wofür gilt Tabelle {letter}?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {content.usage.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {tables.map((table) => (
          <Card key={table.label}>
            <CardHeader>
              <CardTitle>{table.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[480px] overflow-auto rounded-md border border-border">
                <table className="w-full text-sm">
                  <caption className="sr-only">{table.label}</caption>
                  <thead className="sticky top-0 bg-muted">
                    <tr>
                      <th scope="col" className="text-left p-2 font-medium">
                        {table.unit} bis
                      </th>
                      <th scope="col" className="text-right p-2 font-medium">
                        Volle Gebühr
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row) => (
                      <tr key={`${row.minValue}-${row.maxValue}`} className="border-t border-border/60">
                        <td className="p-2">{formatBound(row.maxValue, table.unit)}</td>
                        <td className="p-2 text-right tabular-nums">{formatEuro(row.fee)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>Hinweise zur Anwendung</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {content.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Häufige Fragen zu Tabelle {letter}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold mb-1">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <nav aria-label="Weitere Tabellen" className="flex flex-wrap gap-3">
          {(Object.keys(TABLE_LANDINGS) as TableLetter[])
            .filter((key) => key !== letter)
            .map((key) => (
              <Link key={key} to={TABLE_LANDINGS[key].path}>
                <Button variant="outline" size="sm">
                  Tabelle {key}
                </Button>
              </Link>
            ))}
          <Link to="/steuerberaterkosten">
            <Button variant="outline" size="sm">
              Steuerberaterkosten
            </Button>
          </Link>
        </nav>
      </article>
    </PageLayout>
  );
};

export default StbvvTabelle;
