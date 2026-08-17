# Globaler System-Check: Performance, Wartbarkeit, Stabilität

Der Funktionsumfang ist vollständig und alle 333 Tests laufen grün. Dieser Plan behandelt ausschließlich Optimierung — keine fachliche Änderung an der StBVV-Berechnung.

## Befunde (verifiziert)

**Performance**
- Doppelte Gesamtberechnung: `calculateTotal` läuft parallel in `Index.tsx` (Z. 194) und noch einmal in `TotalCalculation.tsx` (Z. 40) mit denselben Daten. Bei jedem Tastendruck wird die komplette Summe zweimal über alle Positionen gerechnet.
- Bundle: Hauptchunk ~823 kB (243 kB gzip). Kein `manualChunks` in `vite.config.ts`. jsPDF/xlsx/recharts liegen nur teilweise hinter Lazy-Boundaries.
- `FloatingSummaryBar` und `CalculatorHeader` sind nicht memoisiert und re-rendern bei jedem Zeichen.
- Tab-Persistenz schreibt bei jeder Änderung synchron `JSON.stringify` des kompletten Tab-Zustands in den LocalStorage.

**Wartbarkeit**
- `PositionCard.tsx` (833 Zeilen) und `Index.tsx` (683 Zeilen) sind zu groß; `activityPresets.ts` (990 Zeilen) ist eine einzige Datei.
- 10 Lint-Fehler `no-explicit-any` (u. a. `pdfGenerator.ts:399`).
- `handleUndo`-Dependency-Warnung in `Index.tsx`.

**Stabilität**
- Kein Fehler-Fallback um Lazy-Routen herum außerhalb der globalen ErrorBoundary.
- Keine Bundle-/Performance-Regressionsschwelle im Build.

## Umsetzung

**Phase 1 — Rechen- und Render-Performance (größter Effekt)**
1. Gesamtberechnung nur noch einmal in `Index.tsx` ausführen; `TotalCalculation` erhält das Ergebnis als Prop (Fallback-Berechnung nur, wenn keine Prop übergeben wird — keine API-Brüche).
2. `React.memo` für `TotalCalculation`, `FloatingSummaryBar`, `CalculatorHeader`, `DocumentTabs`; Callbacks in `Index.tsx` konsequent über `useCallback` stabilisieren.
3. LocalStorage-Persistenz der Tabs auf debounced Write (300 ms) umstellen, mit sofortigem Flush bei `visibilitychange`/`beforeunload`.

**Phase 2 — Bundle-Optimierung**
4. `manualChunks` in `vite.config.ts`: `react-vendor`, `ui-radix`, `pdf` (jsPDF/autotable), `charts` (recharts), `dnd`.
5. Export-Utilities (`pdfGenerator`, `excelExporter`) durchgängig per `await import()` laden, damit sie erst beim tatsächlichen Export im Netz landen.
6. Blog-Artikeldaten (`blogArticles.ts`, 493 Zeilen) nur in den Blog-Chunk hängen.

**Phase 3 — Wartbarkeit**
7. `PositionCard` zerlegen: `PositionCardHeader`, `PositionBillingFields` (Gegenstandswert/Zeit/Pauschal), `PositionFeeSummary`. Reine Präsentations-Splits, Logik bleibt im Container.
8. `Index.tsx` entlasten: Vorlagen-Handling (Append/Replace-Dialog) und Export-Orchestrierung in `useTemplateLoader` bzw. `useCalculatorActions` auslagern.
9. `activityPresets.ts` in thematische Module je Cluster aufteilen, Barrel-Export beibehalten (Preset-IDs und Werte bleiben unverändert).

**Phase 4 — Härtung**
10. Alle `any` typisieren, `handleUndo`-Dependencies korrigieren, Lint auf 0 Fehler bringen.
11. Route-Level ErrorBoundary um den Suspense-Bereich, damit ein fehlgeschlagener Lazy-Chunk nicht die ganze App leert.
12. Nach jeder Phase: `vitest run` (333 Tests müssen grün bleiben) plus Build-Größenvergleich vorher/nachher.

## Technische Hinweise

- Berechnungslogik in `stbvvCalculator.ts`/`centArithmetic.ts` wird nicht angefasst — Golden-Reference- und Isolationstests sind der Regressionsschutz.
- Erwartetes Ergebnis: rund halbierte Rechenlast pro Tastendruck, Initial-Bundle unter ~150 kB gzip, keine Datei über 400 Zeilen im Kalkulator-Pfad.
