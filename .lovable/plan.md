

# Vollständiger Seiten-Check: Performance, Recht, SEO & Produktion

## Befunde nach Kategorien

---

### 1. PERFORMANCE

**1.1 Kein Code-Splitting / Lazy Loading**
- Alle 12+ Seiten werden synchron in `App.tsx` importiert (kein `React.lazy`).
- `Index.tsx` allein ist 610 Zeilen mit ~15 Komponenten-Imports.
- **Fix:** `React.lazy()` + `Suspense` fuer alle Seiten ausser Index. Reduziert Initial Bundle um geschaetzt 40-60%.

**1.2 Top-Level `await` in App.tsx**
- Zeile 23-25: `const Dashboard = import.meta.env.DEV ? await import(...)` — Top-Level-Await blockiert das gesamte Modul-Parsing.
- **Fix:** Durch `React.lazy` ersetzen oder bedingten dynamischen Import.

**1.3 PositionCard: 746 Zeilen, 12 useEffects**
- Trotz Patch-Fix immer noch ein komplexes Monolith-Komponent.
- Jede Position erzeugt 4 Debounce-Timer + 8 Sync-Effects.
- **Empfehlung:** Mittelfristig in Sub-Komponenten aufteilen (ObjectValueInput, HourlyInput, ActivitySelector).

**1.4 Fehlende Virtualisierung**
- Bei vielen Positionen (10+) werden alle PositionCards gerendert.
- **Empfehlung (spaeter):** `react-window` oder aehnliches fuer sehr lange Listen.

---

### 2. SEO

**2.1 Fehlende Sitemap**
- Keine `sitemap.xml` vorhanden. Fuer Google-Indexierung essentiell.
- **Fix:** Statische `public/sitemap.xml` mit allen 12 oeffentlichen Routen erstellen.

**2.2 Fehlende Canonical-URLs**
- Nur `BlogArticle.tsx` hat `<link rel="canonical">`. Alle anderen Seiten fehlen.
- **Fix:** Canonical-Tag auf jeder Seite via Helmet.

**2.3 Keine Meta-Tags auf Impressum, Datenschutz, Settings, Index**
- `Impressum.tsx`, `Datenschutz.tsx`, `Settings.tsx`, `Index.tsx` haben kein `<Helmet>` fuer SEO.
- **Fix:** Helmet mit title + description auf allen Seiten.

**2.4 robots.txt unvollstaendig**
- Kein Sitemap-Verweis. Keine Disallow-Regeln fuer `/settings`, `/install`, `/dashboard`.
- **Fix:** Sitemap-URL hinzufuegen, private Routen sperren.

**2.5 NotFound-Seite**
- Englischer Text ("Oops! Page not found"), nicht auf Deutsch.
- Kein SEO-Tag, kein zurueck-Link mit Button.
- **Fix:** Deutsch + Helmet + Design angleichen.

---

### 3. RECHTLICHE AKTUALITAET

**3.1 StBVV-Version: "2025" mit effectiveDate "2025-07-01"**
- Die Fuenfte Aenderungsverordnung tritt erst am 01.07.2025 in Kraft. Aktuelles Datum ist 27.03.2026.
- Die im Code hinterlegte Version und Gebuehrentabellen sind korrekt aktuell.
- **Status: OK** — Die Tabellen A-D sind auf Stand 2025 und somit gueltig.

**3.2 Impressum**
- Enthaelt: Firma, Adresse, Kontakt, USt-ID, Registergericht, Verantwortlicher nach § 55 RStV, OS-Plattform, Streitschlichtung.
- **PROBLEM:** § 55 Abs. 2 RStV ist seit 2020 abgeloest durch § 18 Abs. 2 MStV (Medienstaatsvertrag).
- **Fix:** "§ 55 Abs. 2 RStV" durch "§ 18 Abs. 2 MStV" ersetzen.

**3.3 Datenschutzerklaerung**
- Google AdSense erwaehnt Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage.
- **ACHTUNG:** Fuer Werbe-Tracking/Cookies ist nach DSGVO + ePrivacy eigentlich Art. 6 Abs. 1 lit. a (Einwilligung) erforderlich, nicht "berechtigtes Interesse".
- **Fix:** Rechtsgrundlage auf Einwilligung (lit. a) aendern, wenn AdSense tatsaechlich aktiv ist.

**3.4 Cookie-Banner**
- Banner bietet "Akzeptieren"/"Ablehnen", aber: bei "Ablehnen" werden keine Cookies/Tracker tatsaechlich blockiert — es wird nur der Banner-Status gespeichert.
- **Risiko:** Wenn Google AdSense oder andere Tracker laufen, muss bei Ablehnung tatsaechlich das Laden verhindert werden.
- **Empfehlung:** Consent-Management implementieren das AdSense nur bei Zustimmung laedt.

---

### 4. ACCESSIBILITY (a11y)

**4.1 Fehlende aria-labels**
- Seiten-Templates haben kaum `aria-label`, `role`, oder `aria-describedby`.
- Hauptseite (`Index.tsx`) hat nur 1 aria-label (Mobile FAB).
- **Fix:** Alle interaktiven Elemente mit sinnvollen Labels versehen, Landmarks (`main`, `nav`, `aside`) hinzufuegen.

---

### 5. UX / PRODUKTION

**5.1 Keine Loading-States beim Seitenwechsel**
- Kein Suspense-Fallback, kein Skeleton bei Navigation.
- **Fix:** Suspense-Fallback mit Spinner/Skeleton fuer Lazy-Loaded Seiten.

**5.2 Doppelte Toaster**
- `App.tsx` rendert sowohl `<Toaster />` (shadcn) als auch `<Sonner />`. Das koennte zu doppelten Benachrichtigungen fuehren.
- **Pruefung:** Wird ueberhaupt der shadcn-Toaster verwendet? Wenn nicht, entfernen.

---

## Implementierungsplan (priorisiert)

### Schritt 1: Rechtliche Korrekturen (kritisch)
- **Impressum.tsx:** "§ 55 Abs. 2 RStV" → "§ 18 Abs. 2 MStV"
- **Datenschutz.tsx:** AdSense-Rechtsgrundlage korrigieren (lit. f → lit. a)

### Schritt 2: SEO-Grundlagen
- `public/sitemap.xml` erstellen (alle 12 Routen)
- `public/robots.txt` erweitern (Sitemap-Verweis, Disallow /settings /install /dashboard)
- Helmet mit title + description + canonical auf allen Seiten ohne SEO-Tags:
  - `Index.tsx`, `Impressum.tsx`, `Datenschutz.tsx`, `Settings.tsx`, `InstallApp.tsx`, `NotFound.tsx`

### Schritt 3: NotFound-Seite ueberarbeiten
- Deutscher Text, Design angleichen (Card-Layout wie andere Seiten), Helmet

### Schritt 4: Performance (Code-Splitting)
- **App.tsx:** Alle Seiten (ausser Index) auf `React.lazy()` + `Suspense` umstellen
- Top-Level-Await fuer Dashboard entfernen
- Loading-Fallback-Komponente erstellen

### Schritt 5: Cleanup
- Pruefen ob shadcn `<Toaster />` genutzt wird; wenn nicht, entfernen (nur Sonner behalten)
- Semantic HTML Landmarks (`<main>`, `<nav>`) auf Hauptseite

### Dateien die geaendert werden

| Datei | Aenderung |
|-------|-----------|
| `src/pages/Impressum.tsx` | § 55 RStV → § 18 MStV |
| `src/pages/Datenschutz.tsx` | AdSense Rechtsgrundlage |
| `public/sitemap.xml` | Neu erstellen |
| `public/robots.txt` | Sitemap + Disallow |
| `src/App.tsx` | React.lazy + Suspense, Top-Level-Await entfernen |
| `src/pages/NotFound.tsx` | Deutsche Version + Design |
| `src/pages/Index.tsx` | Helmet SEO-Tags |
| `src/pages/Settings.tsx` | Helmet SEO-Tags |
| `src/pages/InstallApp.tsx` | Helmet SEO-Tags |

