
# Go-Live Readiness Check -- Ergebnis: NOCH NICHT 100%

Es gibt **5 Blocker** und **4 Empfehlungen**, die vor einem produktiven Go-Live behoben werden muessen.

---

## BLOCKER (muessen vor Live-Gang behoben werden)

### 1. AdSense Publisher-ID ist Platzhalter
`src/components/CookieBanner.tsx` Zeile 41 enthaelt `ca-pub-XXXXXXXXXXXXXXXX` statt der echten ID `ca-pub-3982401795575611` (die in `index.html` und `ads.txt` korrekt hinterlegt ist). Bei Consent-Zustimmung wird AdSense mit falscher ID geladen.
- **Fix:** Platzhalter durch `ca-pub-3982401795575611` ersetzen.

### 2. AdSense-Script wird in index.html NICHT consent-gesteuert geladen
`index.html` hat zwar das `meta`-Tag fuer AdSense, aber das eigentliche AdSense-JavaScript wird ausschliesslich ueber `CookieBanner.tsx` bei Consent geladen. Das ist korrekt. **Aber:** Es fehlt eine Pruefung beim App-Start, ob bereits ein Consent vorliegt. Aktuell wird `enforceConsent()` nur im `CookieBanner`-Mount aufgerufen -- wenn der Banner bereits geschlossen wurde (Consent gespeichert), wird AdSense beim naechsten Seitenbesuch **nicht** nachgeladen.
- **Fix:** `enforceConsent(getConsentStatus())` auch in `App.tsx` oder `main.tsx` beim Start aufrufen.

### 3. `vitest` steht in `dependencies` statt `devDependencies`
Zeile 62 in `package.json`: `vitest` ist eine Test-Dependency und gehoert nicht ins Produktions-Bundle. Erhoeht die installierte Paketgroesse unnoetig.
- **Fix:** Von `dependencies` nach `devDependencies` verschieben.

### 4. Domain-URLs muessen auf Produktions-Domain angepasst werden
Wenn die App in das "Hauptsystem" kopiert wird, muessen alle hartcodierten URLs aktualisiert werden:
- `src/components/PageLayout.tsx` Z. 13: `BASE_URL = "https://stbv-tax-wizard.lovable.app"`
- `src/pages/Index.tsx` Z. 410: Canonical-URL
- `public/sitemap.xml`: Alle 9 URLs
- `public/robots.txt` Z. 19: Sitemap-URL

**Empfehlung:** `BASE_URL` zentral in einer Konstante/Env-Variable definieren, damit es nur an einer Stelle geaendert werden muss.

### 5. index.html: Favicon zeigt auf externen Storage-Link
Zeile 25: `href="https://storage.googleapis.com/gpt-engineer-file-uploads/..."` -- das ist ein temporaerer Upload-Link, der jederzeit ablaufen kann. Das Favicon muss als lokale Datei in `/public/` liegen.
- **Fix:** Favicon-Datei herunterladen, in `public/favicon.ico` speichern und Pfad aendern.

---

## EMPFEHLUNGEN (nicht blockierend, aber fuer Steuerberaterqualitaet wichtig)

### A. `@types/react-helmet` fehlt
`react-helmet` wird auf allen Seiten verwendet, aber die TypeScript-Types fehlen in `devDependencies`. Funktioniert aktuell ohne Fehler, aber ohne Types gibt es keine IntelliSense und potentiell Typ-Warnungen.

### B. `index.html` Meta-Author ist generisch
Zeile 11: `content="STBVV Calculator"` -- sollte `Finanzgefluester GmbH` sein.

### C. Open Graph Tags ohne Bild
`og:image` und `twitter:image` fehlen in `index.html`. Beim Teilen auf Social Media wird kein Vorschaubild angezeigt.

### D. `lastmod`-Tags in Sitemap fehlen
Google bevorzugt `<lastmod>` in der Sitemap fuer besseres Crawl-Management.

---

## BEREITS KORREKT (kein Handlungsbedarf)

- Impressum: § 18 Abs. 2 MStV -- korrekt
- Datenschutz: AdSense mit Art. 6 Abs. 1 lit. a DSGVO -- korrekt
- Server-Logfiles mit lit. f DSGVO -- korrekt (berechtigtes Interesse)
- StBVV-Tabellen 2025 -- aktuell und gueltig
- Code-Splitting mit React.lazy -- implementiert
- PageLayout mit Header/Footer/ThemeToggle -- konsistent auf allen Unterseiten
- Cookie-Consent-Enforcement-Logik -- vorhanden
- Patch-basierte Position-Updates -- stabil
- useHistory mit Ref-Pattern -- stabil
- Zod-Schema-Validierung -- aktiv
- 195+ Unit-Tests fuer Berechnungslogik

---

## IMPLEMENTIERUNGSPLAN

### Phase 1: Blocker beheben (30 Min)
1. `CookieBanner.tsx`: AdSense-ID `ca-pub-XXXXXXXXXXXXXXXX` durch `ca-pub-3982401795575611` ersetzen
2. `App.tsx` oder `main.tsx`: `enforceConsent(getConsentStatus())` beim App-Start aufrufen
3. `package.json`: `vitest` von `dependencies` nach `devDependencies` verschieben
4. Zentrale `BASE_URL`-Konstante erstellen (z.B. in `src/constants/index.ts`), die von PageLayout, Index.tsx, sitemap.xml und robots.txt referenziert wird
5. Favicon von externem Link in `public/favicon.ico` kopieren und `index.html` anpassen

### Phase 2: Qualitaetsverbesserungen (15 Min)
1. `@types/react-helmet` als devDependency hinzufuegen
2. `index.html` Meta-Author auf "Finanzgefluester GmbH" setzen
3. Open Graph Image-Tag hinzufuegen (falls ein Vorschaubild vorhanden ist)
4. `lastmod`-Tags in `sitemap.xml` ergaenzen

### Dateien die geaendert werden

| Datei | Aenderung |
|-------|-----------|
| `src/components/CookieBanner.tsx` | AdSense-ID korrigieren |
| `src/main.tsx` oder `src/App.tsx` | Consent-Enforcement beim Start |
| `package.json` | vitest verschieben, @types/react-helmet hinzufuegen |
| `src/constants/index.ts` | BASE_URL zentral definieren |
| `src/components/PageLayout.tsx` | BASE_URL importieren |
| `src/pages/Index.tsx` | BASE_URL importieren |
| `index.html` | Favicon lokal, Author, OG-Image |
| `public/sitemap.xml` | lastmod ergaenzen |

**Nach Abschluss dieser Aenderungen ist die App produktionsreif fuer den Go-Live.**
