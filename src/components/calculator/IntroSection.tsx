/**
 * IntroSection - Einleitungstext und interne Verlinkung unter dem Header
 * @module components/calculator/IntroSection
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { TABLE_LANDINGS, COST_LANDINGS, type TableLetter } from '@/data/landingContent';

const LINK_CLASS =
  'inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50';

export const IntroSection = React.memo(() => (
  <section aria-label="Über den StBVV-Rechner" className="mb-8">
    <p className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
      Berechnen Sie Steuerberatergebühren nach der Steuerberatervergütungsverordnung: Gegenstandswert eingeben,
      Gebührentabelle A bis D und Zehntelsatz wählen – der Rechner ermittelt Wertgebühr, Auslagen und Umsatzsteuer.
      Mehrere Positionen lassen sich zu einem Angebot oder einer Rechnung zusammenfassen und als PDF ausgeben. Die
      Berechnung erfolgt vollständig im Browser, Mandantendaten werden nicht gespeichert.
    </p>
    <nav aria-label="Weiterführende Seiten" className="mt-4 flex flex-wrap gap-2">
      {(Object.keys(TABLE_LANDINGS) as TableLetter[]).map((key) => (
        <Link key={key} to={TABLE_LANDINGS[key].path} className={LINK_CLASS}>
          Tabelle {key}
        </Link>
      ))}
      {Object.values(COST_LANDINGS).map((item) => (
        <Link key={item.path} to={item.path} className={LINK_CLASS}>
          {item.title}
        </Link>
      ))}
      <Link to="/vergleich" className={LINK_CLASS}>
        Rechner im Vergleich
      </Link>
    </nav>
  </section>
));

IntroSection.displayName = 'IntroSection';
