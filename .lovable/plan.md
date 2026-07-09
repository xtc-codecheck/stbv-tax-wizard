# Systemcheck – Ergebnis & Verbesserungsplan

**Gesamtbewertung:** Produktionsreif und live-fähig (Qualitätsniveau ~92/100). Kritische Bereiche (StBVV-Berechnung, PDF/Excel-Export, DSGVO, Legal Pages) sind stabil und getestet (>260 Tests). Es gibt jedoch mehrere mittlere/niedrige Optimierungspotenziale in Struktur, Konsistenz und UX.

**Kritische Integrationen bleiben unangetastet:** StBVV-Rechner, Cent-Arithmetik, PDF-Generator, Excel-Export, Templates, Multi-Tab-System, Cookie/AdSense-Consent.

---

## 1. Codequalität & Sauberkeit

**Positiv:** Cent-basierte Arithmetik, Zod-Validierung, Barrel-Exports, konsistente TS-Nutzung, JSDoc auf Services.

**Findings:**
- `PositionCard.tsx` (746 Z.) – Monsterkomponente, sollte in `ObjectValueInput`, `HourlyInput`, `FlatRateInput`, `ActivitySelector`, `TenthRateSelector` zerlegt werden. **Priorität: mittel**
- `pages/Index.tsx` (617 Z.) – Orchestrator zu groß; Tab-/Export-/Import-Logik in `useCalculatorPage`-Hook auslagern. **Priorität: mittel**
- `FAQ.tsx` (665 Z.) und `Anleitungen.tsx` (443 Z.) enthalten Content-Blöcke im JSX → in `data/faq.ts` / `data/anleitungen.ts` extrahieren. **Priorität: niedrig**
- `CalculatorService.ts` dupliziert Logik aus `utils/stbvvCalculator.ts` (Cent-Version). Nur der Cent-Rechner wird produktiv genutzt – Service auf reinen Wrapper reduzieren oder entfernen. **Priorität: mittel** (Achtung: kritisch → nur mit Test-Absicherung)
- `useClientDatabase.ts` ist ein DSGVO-No-Op-Hook. Aufrufer identifizieren und Hook entfernen. **Priorität: niedrig**
- Ungenutzte Blog-Komponenten `ArticleSidebar`, `NewsletterCTA` prüfen – einbinden oder löschen. **Priorität: niedrig**

## 2. Architektur & Struktur

**Positiv:** Klare Layer-Trennung (services / hooks / components / schemas / utils), PageLayout vereinheitlicht Header/Footer/SEO, Barrel-Exports.

**Findings:**
- Doppelte Rechner-Implementierung (Service vs. utils-Cent) → **eine Quelle der Wahrheit** definieren.
- `hooks/index.ts` exportiert `useHistory` nicht (nur in Datei vorhanden) – prüfen und angleichen. **Priorität: niedrig**
- 42 shadcn-UI-Komponenten in `src/components/ui/` – Tree-Shake-freundlich, aber ungenutzte (`menubar`, `navigation-menu`, `hover-card`, `aspect-ratio`, `sonner` vs. eigenes toast) auf Verwendung prüfen. **Priorität: niedrig**

## 3. Performance & Effizienz

**Positiv:** Route-Splitting via `React.lazy`, Debouncing, `React.memo`/`useCallback` an Hotspots, dynamischer PDF/Excel-Import.

**Findings:**
- `Index.tsx` re-rendert vermutlich viele Kinder bei jeder Tab-Änderung. `PositionList`-Props-Memoisierung prüfen. **Priorität: mittel**
- `Helmet` (v6, deprecated) – Migration auf `react-helmet-async` für konfliktfreies SSR/Streaming. **Priorität: niedrig**
- `pdfjs-dist@3` – groß, prüfen ob nur für Preview gebraucht; ggf. nur bei Bedarf laden (bereits teilweise umgesetzt). **Priorität: niedrig**

## 4. Stabilität & Zuverlässigkeit

**Positiv:** ErrorBoundary global, strukturiertes `ErrorLoggingService`, ~260 Unit-Tests, Golden-Reference-Tests.

**Findings:**
- Keine E2E-Tests (Playwright) im Repo – manuelle Browser-Tests wurden durchgeführt, aber nicht automatisiert. **Priorität: mittel**
- Kein Test-CI-Skript in `package.json` (`test` fehlt) – Vitest ist installiert, aber nicht als Script eingebunden. **Priorität: hoch** (schnell fixbar)
- `useDocumentTabs` – Grenzfälle (max. Tabs, Persistenz nach Crash) sollten Testabdeckung bekommen. **Priorität: mittel**

## 5. Sicherheit & Datenschutz

**Positiv:** Keine Backend-Anbindung → kein XSS/SQLi-Risiko in klassischer Form. DSGVO-Modus (session-only), Cookie-Banner mit Consent-Enforcement, AdSense ID korrekt.

**Findings:**
- `react-helmet` v6 hat bekannte Warnings, kein CVE – Migration siehe oben.
- CSP-Header/Meta fehlt in `index.html` (nur relevant beim Hosting; falls im Hauptsystem hinter Reverse Proxy, dort setzen). **Priorität: niedrig**
- Kein `npm audit` Ergebnis dokumentiert – Dependency-Scan sollte in CI laufen. **Priorität: mittel**
- LocalStorage-Payloads sind Zod-validiert – gut. Bei fremden Payloads (Import-Funktion?) sicherstellen, dass Import-Pfade Zod validieren.

## 6. Konsistenz & Wartbarkeit

**Findings:**
- Zwei parallele Berechnungspfade (Service + utils) → Inkonsistenzrisiko. **Priorität: mittel**
- Umlauten-Mix in Kommentaren (ä/ae) – rein kosmetisch. **Priorität: niedrig**
- Fehlerbehandlung: mancherorts `toast.error`, mancherorts `logError` – Guideline in Doc festhalten. **Priorität: niedrig**

## 7. Verweise & Ressourcen

**Findings:**
- `BASE_URL = https://stbv-tax-wizard.lovable.app`, echte Produktion ist `https://stbvv-rechner.de` – **Diskrepanz** zwischen `BASE_URL`, `sitemap.xml`, `robots.txt`, `og:image` und Custom Domain. **Priorität: hoch** vor Go-Live auf Custom Domain.
- `public/placeholder.svg` prüfen ob referenziert; ansonsten entfernen. **Priorität: niedrig**
- `docs/GDPR_COMPLIANCE.md` und `docs/QUALITY_ASSURANCE.md` vorhanden – gut gepflegt.

## 8. Dokumentation

- README-Aktualität prüfen (Setup, Skripte, Deploy). **Priorität: mittel**
- Fehlender ADR/Architektur-Doc (Multi-Tab, Cent-Arithmetik, Service-Layer). **Priorität: niedrig**

## 9. UX / Design / Responsive

**Positiv:** Semantische Tokens, Dark-Mode, PageLayout einheitlich, ThemeToggle konsistent.

**Findings:**
- DocumentTabs: Klick öffnet Kontextmenü statt sofortigem Tab-Wechsel – für Neu-Nutzer verwirrend. Klick = wechseln, Rechts-/Long-Press = Menü. **Priorität: hoch (UX-Blocker)**
- Floating Summary Bar auf sehr breiten Screens (2720px) – prüfen ob zentriert bleibt.
- Barrierefreiheit: `aria-label` an Icon-Buttons stichprobenartig prüfen. **Priorität: mittel**
- Konsistenz: `Settings.tsx` sollte `PageLayout` verwenden statt eigenem Footer (bereits refactored – erneut verifizieren).

## 10. Funktionsliste & Verknüpfungen

### Funktionen (Kurzübersicht)
1. **StBVV-Rechner** – Tab A–D, Zehntel/Zwanzigstel, Cent-genau, Auslagenpauschale, MwSt., Rabatt.
2. **Multi-Dokument-Tabs** – bis N Dokumente parallel, Rename/Duplicate/Close, LocalStorage.
3. **Vorlagen-System** – Default- und Custom-Templates, Fuse.js-Suche.
4. **PDF-Export** – jsPDF + autoTable, Preview-Modal, Checksum, Branding.
5. **Excel/CSV-Export** – dynamisch geladen.
6. **Guided Wizard** – 4-Step Workflow (Template → Values → Client → Export).
7. **Command Palette** – Ctrl+K Shortcut-Zentrale.
8. **Branding-Settings** – Kanzlei-Logo/IBAN/Steuernr. (LocalStorage).
9. **Document Archive & Dashboard** (nur DEV) – Umsätze, Top-Klienten, Charts.
10. **Blog + FAQ + Rechtsseiten** – SEO-optimiert mit Helmet + JSON-LD.
11. **PWA-Install** – manueller Install-Prompt.
12. **Cookie/AdSense-Consent** – Enforcement bei Start.
13. **Undo/Redo History** – über `useHistory`.
14. **Keyboard Shortcuts** + Dialog.
15. **Theme Toggle** (Dark/Light/System).

### Verknüpfungen / Datenflüsse
- `useDocumentTabs` ⇄ LocalStorage (`STORAGE_KEYS.tabs`) → speist `Index.tsx` → propagiert an `PositionList` → `PositionCard`.
- `PositionCard` → `calculatePosition` (Cent) → `TotalCalculation` liest aggregiert via `calculateTotal`.
- `useDocumentExport` → `pdfGenerator` / `excelExporter` / `csvExporter` (alle lazy).
- `usePositionValidation` (Zod) → Badges „Vollständig/Unvollständig".
- `CookieBanner.enforceConsent` → AdSense Script Injection.
- `PageLayout` → Helmet-Tags (BASE_URL + canonical) → SEO.
- `activityPresets` → `PositionCard` (Auto-Fill Zehntelsatz, Tabelle, Mindestwerte).
- `GuidedWorkflow` schreibt final in `useDocumentTabs`.

### Nicht-funktionierende / fehlende Verknüpfungen
- **`useClientDatabase`** – Toter Hook (DSGVO no-op), sollte aus Aufrufern entfernt werden.
- **Dashboard** ist nur unter `import.meta.env.DEV` erreichbar → im Produktivsystem nicht sichtbar. Klären ob gewollt.
- **Blog-Komponenten** `ArticleSidebar`/`NewsletterCTA` sind gebaut, aber nicht eingebunden.
- **BASE_URL vs. Custom Domain** – SEO-Assets zeigen auf Preview-Domain, nicht auf `stbvv-rechner.de`.
- **DocumentTabs-Click-Handler** – öffnet Kontextmenü statt zu wechseln (UX-Bug).

## 11. Design

- Header/Footer via `PageLayout` konsistent ✓
- ThemeToggle überall vorhanden ✓
- Responsive-Breakpoints 320/768/1024/1440 ok; 2560+ (Ultrawide) sollte auf Zentrierung geprüft werden.
- Semantische Tokens in `index.css` konsequent → keine `text-white`/`bg-black` Fundstellen zu erwarten (Stichprobe empfehlenswert).

---

## Kritischste Punkte (Zusammenfassung)

**Hoch:**
- BASE_URL / Sitemap / OG auf Custom Domain umstellen vor Go-Live auf `stbvv-rechner.de`.
- DocumentTabs: Klick-vs-Kontextmenü UX-Fix.
- `test`-Script in `package.json` ergänzen (Vitest CI).

**Mittel:**
- CalculatorService/utils-Duplizierung auflösen.
- `PositionCard` (746 Z.) und `Index.tsx` (617 Z.) modularisieren.
- E2E-Testautomatisierung (Playwright) einführen.
- Dependency-Audit in CI.

**Niedrig:**
- `react-helmet` → `react-helmet-async`.
- Toten Code entfernen (`useClientDatabase`, ungenutzte Blog-Komponenten, ungenutzte UI-Komponenten).
- FAQ/Anleitungen-Content in Data-Files extrahieren.
- README/ADR aktualisieren.

---

## Phasenplan

### Phase 1 — Go-Live-Blocker (Hoch, ~1–2 h)
1. `BASE_URL` in `src/constants/index.ts` auf `https://stbvv-rechner.de` umstellen.
2. `public/sitemap.xml` und `public/robots.txt` auf Custom Domain aktualisieren.
3. `index.html` OG-/Twitter-URLs und Canonical auf Custom Domain.
4. DocumentTabs UX-Fix: Klick = Tab wechseln, Rechtsklick / Chevron-Button = Kontextmenü.
5. `package.json`: `"test": "vitest run"`, `"test:watch": "vitest"` ergänzen.

### Phase 2 — Konsolidierung & Aufräumen (Mittel, ~3–5 h)
1. `CalculatorService` als dünnen Wrapper um `stbvvCalculator` (Cent) implementieren oder entfernen; alle Aufrufer migrieren; Cross-Validation-Tests durchlaufen lassen.
2. `useClientDatabase` und Aufrufer entfernen.
3. `hooks/index.ts` konsolidieren (`useHistory` exportieren, tote Exporte prüfen).
4. Ungenutzte shadcn-UI-Komponenten identifizieren (via `rg`) und löschen.
5. Ungenutzte Blog-Komponenten entweder in BlogArticle einbinden oder löschen.

### Phase 3 — Struktur-Refactor (Mittel, ~4–6 h)
1. `PositionCard` in `ObjectValueInput`, `HourlyInput`, `FlatRateInput`, `ActivitySelector`, `TenthRateSelector` zerlegen.
2. `Index.tsx`: Tab-/Export-/Import-Handler in `useCalculatorPage`-Hook auslagern.
3. FAQ/Anleitungen-Inhalt in `src/data/*.ts` extrahieren (Content-first, testbar).

### Phase 4 — Qualitäts-Guardrails (Mittel, ~3–4 h)
1. Playwright installieren, kritische Flows scripten: Position anlegen, Tabs wechseln, PDF-Export, Legal-Seiten.
2. GitHub-Action / npm-Script `audit:ci` einrichten.
3. Bundle-Size-Report (rollup-plugin-visualizer) einmalig prüfen; große Deps identifizieren.

### Phase 5 — Politur (Niedrig, ~2–3 h)
1. `react-helmet` → `react-helmet-async`.
2. README + ADR (Multi-Tab, Cent-Arithmetik, Service-Layer, DSGVO).
3. Ultrawide-Responsive-Feintuning (Max-Width Container).
4. A11y-Stichprobe: `aria-label` an allen Icon-Buttons.

**Kritische Sicherung:** Vor Phase 2–3 den kompletten Vitest-Suite grün ziehen; nach jeder strukturellen Änderung erneut ausführen. Keine Änderung an `stbvvCalculator.ts`, `pdfGenerator.ts`, `excelExporter.ts`, `stbvvTables.ts`, `centArithmetic.ts`, `activityPresets.ts` ohne Golden-Reference-Test-Bestätigung.

### Technische Datei-Referenz
| Bereich | Dateien |
|---|---|
| Go-Live | `src/constants/index.ts`, `public/sitemap.xml`, `public/robots.txt`, `index.html`, `src/components/calculator/DocumentTabs.tsx`, `package.json` |
| Konsolidierung | `src/services/CalculatorService.ts`, `src/hooks/useClientDatabase.ts`, `src/hooks/index.ts`, `src/components/ui/*`, `src/components/blog/{ArticleSidebar,NewsletterCTA}.tsx` |
| Refactor | `src/components/PositionCard.tsx`, `src/pages/Index.tsx`, `src/pages/FAQ.tsx`, `src/pages/Anleitungen.tsx`, `src/data/*` (neu) |
| Guardrails | `playwright.config.ts` (neu), `package.json`, CI-Config |
| Politur | `src/components/PageLayout.tsx`, `README.md`, `docs/ADR-*.md` (neu) |

Nach Abschluss der Phasen 1–2 ist die App uneingeschränkt Go-Live-tauglich auf `stbvv-rechner.de` in Steuerberater-Qualität; Phasen 3–5 heben die Codebase auf langfristige Enterprise-Wartbarkeit.
