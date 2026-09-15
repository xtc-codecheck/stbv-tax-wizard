/**
 * JsonLd - Strukturierte Daten (schema.org) via Helmet
 * @module components/seo/JsonLd
 */

import { Helmet } from 'react-helmet';
import { BASE_URL } from '@/constants';

interface JsonLdProps {
  /** Beliebiges schema.org-Objekt oder Array davon */
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
}

/** Breadcrumb-Strukturdaten erzeugen */
export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.path}`,
  })),
});

/** Software-Strukturdaten für den Rechner */
export const softwareSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'StBVV-Rechner',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: `${BASE_URL}/`,
  description:
    'Kostenloser StBVV-Rechner zur Berechnung von Steuerberatergebühren nach der Steuerberatervergütungsverordnung – mit Tabellen A bis D, Vorlagen und PDF-Export.',
  inLanguage: 'de-DE',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Finanzgeflüster GmbH',
    url: BASE_URL,
  },
});

/** FAQ-Strukturdaten */
export const faqSchema = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});
