

# Systemcheck — Implementierungsstand

## Abgeschlossene Phasen

### Phase 1: Cleanup & Konsistenz ✅
- 8 ungenutzte npm-Dependencies entfernt (react-query, react-hook-form, @hookform/resolvers, input-otp, embla-carousel-react, react-resizable-panels, vaul, @radix-ui/react-toast)
- 9 ungenutzte Dateien gelöscht (toast.tsx, toaster.tsx, use-toast.ts x2, drawer.tsx, form.tsx, resizable.tsx, carousel.tsx, input-otp.tsx)
- Blog.tsx auf zentrale blogArticles.ts Datenquelle umgestellt
- Hooks barrel export bereinigt

### Phase 2: Layout & Design-Vereinheitlichung ✅
- Shared `PageLayout`-Komponente erstellt (Header mit ThemeToggle, Footer, Container)
- Alle 12 Seiten auf PageLayout umgestellt
- Canonical-URLs automatisch auf allen Seiten
- Settings-inline-Footer und Dashboard-inline-Footer entfernt
- ThemeToggle im gemeinsamen Header auf allen Unterseiten verfügbar

### Phase 3: Stabilität & Recht ✅
- useHistory Stale-Closure gefixt (Ref-Pattern für currentIndex und history)
- Cookie-Consent-Enforcement implementiert: AdSense wird nur bei Zustimmung geladen, bei Ablehnung blockiert/entfernt

---

## Bekannte vorbestehende Test-Fehler (NICHT durch diese Änderungen verursacht)
- feeTableVerification: Prüfsummen stimmen nicht mit aktuellen Tabellendaten überein (Tabellen wurden zwischenzeitlich aktualisiert)
- goldenReference: Berechnungsreferenzwerte passen nicht zu aktuellen Tabellen
- activityPresets: defaultTenthRate außerhalb minRate-maxRate bei einem Preset

Diese Tests müssen bei Gelegenheit an die aktuellen StBVV-2025-Tabellenwerte angepasst werden.

---

## Noch offen (Phase 4 — optional, vor SaaS)
- Index.tsx Tab-State in useActiveTabState Hook extrahieren
- PositionCard in Sub-Komponenten aufteilen
- E2E-Tests für kritische User-Flows
