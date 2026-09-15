# Konkurrenzanalyse StBVV-Rechner und Maßnahmenplan

## Wo wir stehen (gemessen, Semrush DE)

- stbvv-rechner.de: 16 Keywords, geschätzt ~1 Besuch/Monat. Nur die Startseite rankt, und zwar auf Position 21-78.
- Wichtigstes Suchwort "stbvv rechner" (1.300 Suchen/Monat): wir Platz 25, Wettbewerber auf Platz 1-5.
- Für unsere Unterseiten (FAQ, Blog, Gebührenordnung, Anleitungen) wird aktuell kein einziges Suchwort gefunden.

## Die Konkurrenz

| Anbieter | Position "stbvv rechner" | Stärke |
|---|---|---|
| steuerschroeder.de | 1-2 bei fast allen Geld-Suchwörtern | Eine einzige Seite rankt für 25+ Begriffe, seit Jahren etabliert |
| stbvv.d7e.tax | 1 | Exakte Marken-/Themendomain, reiner Rechner |
| steuerberatervergütung.de | 2-3 | Themendomain |
| smart-rechner.de | 2-5 | Riesiges Rechnerportal (1,1 Mio. Besuche/Monat) |
| pohlmann-steuern.de, steuerberater-scheuerer.de | 4-6 | Kanzlei-Rechner |

Wichtig: Der Wettbewerb ist schwach (Schwierigkeit 13-23 von 100). Die Konkurrenzseiten sind reine Ein-Seiten-Rechner ohne Positionsverwaltung, ohne Vorlagen, ohne PDF-Rechnung, ohne Mehrfach-Dokumente. Inhaltlich sind wir deutlich stärker - wir werden nur nicht gefunden.

## Was wir besser machen können

### A. Sichtbarkeit (größter Hebel)

1. **Eigene Landingpages je Suchbegriff.** Heute muss die Startseite alles abdecken. Neue, eigenständige Seiten mit je eigenem Text, Titel und Rechner-Einstieg:
   - /stbvv-tabelle-a bis /stbvv-tabelle-d (Tabellen mit Werten, "stbvv tabelle a rechner")
   - /steuerberaterkosten (was kostet ein Steuerberater, 4.400 Suchen/Monat)
   - /jahresabschluss-kosten, /einkommensteuererklaerung-kosten, /euer-kosten
   - /zeitgebuehr (Stundensatz 115 EUR, § 13)
2. **Startseite schärfen.** Titel und Beschreibung in index.html auf "StBVV-Rechner 2026" ausrichten, sichtbarer Einleitungstext oberhalb des Rechners mit den Kernbegriffen, klare H1.
3. **Strukturierte Daten** für Software, FAQ und Breadcrumbs ergänzen (bisher nur bei Blogartikeln) - erzeugt erweiterte Google-Treffer.
4. **Sitemap** um die neuen Seiten und alle Blogartikel erweitern; Datumsangaben aktualisieren.
5. **Interne Verlinkung**: Blogartikel und FAQ verweisen gezielt auf die neuen Landingpages und den Rechner.

### B. Produktvorsprung ausspielen

6. **Vergleichsseite** "StBVV-Rechner im Vergleich": was unser Rechner kann und die Ein-Seiten-Rechner der Konkurrenz nicht (mehrere Positionen, Vorlagen, Angebot und Rechnung als PDF, mehrere Dokumente gleichzeitig, Rechtsstand 19.12.2025).
7. **Aktualitäts-Signal**: sichtbares "Rechtsstand"-Datum auf Startseite und Landingpages. Konkurrenz rankt bereits mit "stbvv 2026" - dieser Begriff ist für uns frei.
8. **Teilbare Ergebnisse**: Berechnung als Link mit Werten in der Adresse teilbar machen (bringt Verweise und Wiederbesuche, datenschutzkonform ohne Mandantendaten).

### C. Inhalte

9. Vier zusätzliche Blogartikel entlang der Fragen, die viel gesucht werden: "Was kostet ein Steuerberater?", "StBVV Tabelle A einfach erklärt", "Mittelgebühr richtig ansetzen", "StBVV 2026: was sich ändert".

## Technische Hinweise

- Neue Routen in `src/App.tsx` plus Seiten unter `src/pages/`, jeweils mit `PageLayout` und Helmet-Metadaten; `BASE_URL` aus `src/constants` für Canonicals.
- JSON-LD als kleine Hilfskomponente (`SoftwareApplication`, `FAQPage`, `BreadcrumbList`), analog zur bestehenden Lösung in `BlogArticle.tsx`.
- Tabellenseiten lesen ihre Werte aus `src/utils/stbvvTables.ts` - keine doppelten Zahlen, ein Datenstand.
- Teilbare Berechnung über Suchparameter in der Adresszeile, gelesen in `Index.tsx`; keine Mandantendaten enthalten (Datenschutzregel bleibt gewahrt).
- Sitemap bleibt statisch in `public/sitemap.xml`, Blogartikel aus `src/data/blogArticles.ts` ergänzen.

## Reihenfolge

1. Startseiten-Metadaten, H1/Einleitungstext, strukturierte Daten, Sitemap (schnell, sofort wirksam)
2. Landingpages Tabellen A-D und Steuerberaterkosten
3. Kosten-Landingpages je Leistung + Vergleichsseite
4. Neue Blogartikel und interne Verlinkung
5. Teilbare Berechnungslinks

Der Umfang je Schritt ist so gewählt, dass jeder einzeln veröffentlicht werden kann.
