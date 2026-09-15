/**
 * Landingpage für Kosten-Themen (Steuerberaterkosten, Jahresabschluss, ESt, EÜR, Zeitgebühr)
 * @module pages/KostenLanding
 */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo';
import { BASE_URL, STBVV_CURRENT_VERSION } from '@/constants';
import { COST_LANDINGS, TABLE_LANDINGS, type TableLetter } from '@/data/landingContent';

interface KostenLandingProps {
  path: keyof typeof COST_LANDINGS;
}

const KostenLanding = ({ path }: KostenLandingProps) => {
  const content = COST_LANDINGS[path];

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
            Rechtsgrundlage: {content.legalBasis} · Rechtsstand: {STBVV_CURRENT_VERSION.sourceDocument}
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button className="gap-2">
                <Calculator className="h-4 w-4" />
                Jetzt Gebühr berechnen
              </Button>
            </Link>
          </div>
        </header>

        {content.sections.map((section) => (
          <Card key={section.heading}>
            <CardHeader>
              <CardTitle>{section.heading}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{section.text}</p>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle>Die wichtigsten Werte auf einen Blick</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {content.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Häufige Fragen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.faq.map((item) => (
              <div key={item.question}>
                <h2 className="font-semibold mb-1 text-base">{item.question}</h2>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <nav aria-label="Weitere Themen" className="flex flex-wrap gap-3">
          {(Object.keys(TABLE_LANDINGS) as TableLetter[]).map((key) => (
            <Link key={key} to={TABLE_LANDINGS[key].path}>
              <Button variant="outline" size="sm">
                Tabelle {key}
              </Button>
            </Link>
          ))}
          {Object.values(COST_LANDINGS)
            .filter((item) => item.path !== content.path)
            .map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="outline" size="sm">
                  {item.title}
                </Button>
              </Link>
            ))}
        </nav>
      </article>
    </PageLayout>
  );
};

export default KostenLanding;
