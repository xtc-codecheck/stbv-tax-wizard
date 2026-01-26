# Qualitätssicherung StBVV-Rechner

**Version:** 2.0  
**Stand:** Januar 2026  
**Rechtsgrundlage:** StBVV 2025 (gültig ab 01.07.2025)

---

## Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Phase 1: Berechnungs-Verifizierung](#phase-1-berechnungs-verifizierung)
3. [Phase 2: Datenintegrität](#phase-2-datenintegrität)
4. [Phase 3: Export-Qualität](#phase-3-export-qualität)
5. [Phase 4: Fehlertoleranz](#phase-4-fehlertoleranz)
6. [Phase 5: Compliance](#phase-5-compliance)
7. [Unit-Test-Übersicht](#unit-test-übersicht)
8. [Technische Architektur](#technische-architektur)

---

## Übersicht

Der StBVV-Rechner implementiert einen 5-Phasen Qualitäts-Masterplan zur Sicherstellung der Berechnungsgenauigkeit und Rechtskonformität gemäß der Steuerberatervergütungsverordnung (StBVV).

### Qualitätsziele

| Ziel | Status | Maßnahme |
|------|--------|----------|
| Berechnungsgenauigkeit | ✅ | Cent-basierte Integer-Arithmetik |
| Rechtskonforme Gebührentabellen | ✅ | Verifizierte Tabellen A-D mit Prüfsummen |
| Mindestgegenstandswerte | ✅ | § 24 StBVV automatische Validierung |
| Vollständige Dokumentation | ✅ | PDF/Excel mit Rechtsgrundlagen |
| Fehlerfreie Exports | ✅ | Validierung vor Generierung |

---

## Phase 1: Berechnungs-Verifizierung

### 1.1 Gebührentabellen-Audit

**Datei:** `src/utils/stbvvTables.ts`

Alle vier Gebührentabellen wurden gegen die offizielle StBVV 2025 verifiziert:

| Tabelle | Einträge | Prüfsumme | Verwendung |
|---------|----------|-----------|------------|
| A (Beratung) | 54 | 74.954.054 | Steuererklärungen, Beratung |
| B (Abschluss) | 61 | 103.912.061 | Jahresabschlüsse, EÜR |
| C (Buchführung) | 24 | 5.379.024 | Laufende Buchführung |
| D (Landwirtschaft) | 60 | 62.620.060 | Land-/Forstwirtschaft |

**Prüfsummen-Formel:** `Σ(Gebühren) × 1000 + Anzahl Einträge`

### 1.2 Activity Presets

**Datei:** `src/utils/activityPresets.ts`

66 vordefinierte Tätigkeiten mit:

- Exakter Rechtsgrundlage (§-Verweis)
- Zugeordneter Gebührentabelle (A/B/C/D)
- Zehntelsatz-Bereichen (min/default/max)
- Mindestgegenstandswerten nach § 24 StBVV
- Suchkeywords für Fuzzy-Suche

**Kategorien:**
1. Einkommensteuererklärung (15+ Presets)
2. Jahresabschluss & Buchführung (10+ Presets)
3. Umsatzsteuer (3+ Presets)
4. Gewerbe- & Körperschaftsteuer
5. Beratungsleistungen
6. Rechtsbehelfsverfahren
7. Erbschaft- & Schenkungsteuer
8. Sonstige Steuererklärungen
9. Lohnbuchhaltung (4+ Presets)
10. Sonstige Tätigkeiten

### 1.3 Golden Reference Tests

**Datei:** `src/utils/__tests__/goldenReference.test.ts`

8 vollständige Rechnungsszenarien mit manuell berechneten Sollwerten:

| Szenario | Positionen | Besonderheiten |
|----------|------------|----------------|
| Freiberufler ESt + EÜR | 2 | Tabelle A + B gemischt |
| GmbH Jahresabschluss | 3 | KSt, GewSt, Bilanz |
| Arbeitnehmer mit Anlagen | 3 | Zwanzigstelsätze (§ 27) |
| Zeitgebühr | 2 | § 13 StBVV Stundensätze |
| Pauschalhonorar | 1 | Flat Rate mit Quantity |
| Rabatt-Varianten | 1 | Prozent und Festbetrag |
| Auslagenpauschale | 3 | 20%-Regel und 20€-Deckel |
| Komplexe Rechnung | 10 | Stresstest gemischte Arten |

---

## Phase 2: Datenintegrität

### 2.1 Erweiterte Zod-Schemas

**Datei:** `src/schemas/positionValidation.schema.ts`

```typescript
// Validierungsregeln
- Aktivität: Pflichtfeld, max. 200 Zeichen
- Gegenstandswert: 0 - 100.000.000 €
- Stundensatz: 0 - 500 € (Warnung bei < 66 € oder > 164 €)
- Stunden: 0 - 1.000
- Pauschale: 0 - 100.000 €
- Menge: 1 - 999
```

### 2.2 Mindestgegenstandswerte (§ 24 StBVV)

**Datei:** `src/constants/validation.ts`

| Aktivität | Mindestgegenstandswert |
|-----------|------------------------|
| Einkommensteuererklärung | 8.000 € |
| Körperschaftsteuererklärung | 16.000 € |
| Gewerbesteuererklärung | 8.000 € |
| Umsatzsteuererklärung | 8.000 € |
| USt-Voranmeldung | 650 € |
| EÜR | 17.500 € |
| Buchführung | 15.000 € |
| Jahresabschluss | 8.000 € |
| Erbschaftsteuer | 16.000 € |
| Grundsteuer | 25.000 € |
| Lohnsteuer-Anmeldung | 1.000 € |

### 2.3 Echtzeit-Validierung

**Datei:** `src/hooks/usePositionValidation.ts`

- `usePositionValidation(position)`: Einzelvalidierung
- `usePositionsValidation(positions)`: Batch-Validierung
- Severity-Level: `error` | `warning` | `info`
- Lösungsvorschläge bei Unterschreitung

---

## Phase 3: Export-Qualität

### 3.1 PDF-Generierung

**Datei:** `src/utils/pdfGenerator.ts`

**Features:**
- A4-Format mit korrektem Seitenumbruch
- Seitennummerierung ("Seite X von Y")
- Wiederholung der Tabellenkopfzeile auf Folgeseiten
- Summenblock-Schutz (nie am Seitenende abgeschnitten)
- Strukturierte Prüfsumme
- Rechtliche Hinweise im Footer

**Prüfsummen-Format:**
```
STBVV-CS1-[Positionen]P-[BruttoCent]-[Datum]
Beispiel: STBVV-CS1-5P-124932-260123
```

### 3.2 Excel-Export

**Datei:** `src/utils/excelExporter.ts`

3 Tabellenblätter:
1. **Metadaten:** Dokumenttyp, Nummer, Datum, Rechtsgrundlage, Prüfsumme
2. **Positionen:** Alle Berechnungsdetails
3. **Summen:** Netto, Rabatt, MwSt., Brutto

### 3.3 CSV-Export

**Datei:** `src/utils/csvExporter.ts`

- UTF-8 Encoding
- Deutsches Zahlenformat (Komma als Dezimaltrennzeichen)
- Rechtsgrundlagen-Header
- Prüfsumme im Dokumentkopf

---

## Phase 4: Fehlertoleranz

### 4.1 Error-Logging-Service

**Datei:** `src/services/ErrorLoggingService.ts`

```typescript
interface ErrorLogEntry {
  id: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: 'validation' | 'storage' | 'export' | 'calculation' | 'network' | 'unknown';
  code: string;
  message: string;
  userMessage: string;
  suggestion?: string;
  context?: Record<string, unknown>;
  resolved: boolean;
}
```

**Features:**
- Strukturiertes Console-Logging: `[SEVERITY][CATEGORY] CODE: message`
- Fehlerhistorie (max. 100 Einträge)
- Statistik-Export als JSON
- Listener für neue Fehler

### 4.2 Fehlercode-Mapping

20+ Fehlercodes mit deutschen Lösungsvorschlägen:

| Code | Meldung | Lösung |
|------|---------|--------|
| `ACTIVITY_REQUIRED` | Tätigkeit fehlt | Tätigkeit aus Dropdown wählen |
| `BELOW_MIN_OBJECT_VALUE` | Mindestgegenstandswert unterschritten | Mindestgegenstandswert übernehmen |
| `BELOW_MIN_HOURLY_RATE` | Stundensatz unter 66 € | Prüfen gegen § 13 StBVV |
| `STORAGE_QUOTA_EXCEEDED` | Speicher voll | Alte Dokumente löschen |
| `PDF_GENERATION_FAILED` | PDF-Export fehlgeschlagen | Positionen prüfen, erneut versuchen |

### 4.3 useErrorHandler Hook

**Datei:** `src/hooks/useErrorHandler.ts`

```typescript
const { handleError, showErrorToast, withErrorHandling } = useErrorHandler();

// Automatische Fehlerbehandlung
await withErrorHandling(
  () => generatePDF(options),
  { errorCode: 'PDF_GENERATION_FAILED', successMessage: 'PDF erstellt' }
);
```

### 4.4 ErrorAlert Komponenten

**Datei:** `src/components/ErrorAlert.tsx`

- `<ErrorAlert>`: Vollständige Fehleranzeige mit Lösungsvorschlägen
- `<InlineError>`: Kompakte Feldvalidierung
- `<CompactError>`: Badge-Stil für Listen

---

## Phase 5: Compliance

### 5.1 StBVV-Versionierung

**Datei:** `src/constants/stbvv.ts`

```typescript
STBVV_CURRENT_VERSION = {
  version: '2025',
  effectiveDate: '2025-07-01',
  publishedDate: '2025-03-15',
  sourceDocument: 'Fünfte Verordnung zur Änderung der StBVV',
  federalGazetteRef: 'BGBl. 2025 I Nr. 98',
  changes: [
    'Anpassung der Gebührentabellen A-D um ca. 9%',
    'Erhöhung der Zeitgebühr auf 16,50 € - 41,00 € je 15 Min.',
    'Anpassung der Mindestgegenstandswerte gemäß § 24 Abs. 1',
  ]
}
```

### 5.2 Änderungshistorie

| Version | Gültig ab | BGBl-Referenz |
|---------|-----------|---------------|
| 2025 | 01.07.2025 | BGBl. 2025 I Nr. 98 |
| 2020 | 01.07.2020 | BGBl. 2020 I Nr. 17 |
| 2016 | 01.06.2016 | BGBl. 2016 I Nr. 12 |

### 5.3 Disclaimer-Texte

Automatisch in alle Exports eingefügt:

- **Kurz:** "Berechnung gemäß StBVV 2025"
- **Mittel:** "Rechtsgrundlage: StBVV in der Fassung vom 01.07.2025. BGBl. 2025 I Nr. 98."
- **Vollständig:** Inkl. Änderungshinweis und Quellenangabe

### 5.4 Rechtsgrundlagen-Referenzen

**Wichtige Paragraphen:**

| § | Titel | Gebührenart | Tabelle |
|---|-------|-------------|---------|
| § 11 | Beratung | Wertgebühr | A |
| § 13 | Zeitgebühr | 16,50-41,00 €/15 Min. | - |
| § 24 | Steuererklärungen | Wertgebühr | A |
| § 25 | Jahresabschluss | Wertgebühr | B |
| § 26 | EÜR | Wertgebühr | B |
| § 27 | Anlagen (Zwanzigstel) | Wertgebühr | A |
| § 33 | Buchführung | Wertgebühr | C |
| § 34 | Lohnbuchhaltung | Mischgebühr | - |
| § 35 | Landwirtschaft | Wertgebühr | D |

---

## Unit-Test-Übersicht

### Testdateien

| Datei | Tests | Beschreibung |
|-------|-------|--------------|
| `stbvvCalculator.test.ts` | ~35 | Gebührenberechnung, MwSt., Rabatte |
| `centArithmetic.test.ts` | ~30 | Integer-Arithmetik, Präzision |
| `documentNumber.test.ts` | ~10 | Dokumentnummern-Generierung |
| `activityPresets.test.ts` | ~25 | 70 Presets, Kategorien, §-Referenzen |
| `feeTableVerification.test.ts` | ~60 | Tabellen A-D, Struktur, Grenzwerte |
| `goldenReference.test.ts` | ~30 | 8 Rechnungsszenarien |
| `positionValidation.test.ts` | ~25 | Mindestgegenstandswerte, Validierung |
| `wizardE2E.test.ts` | ~25 | **NEU:** Vollständige Wizard-Workflows |
| `extremeValues.test.ts` | ~26 | **NEU:** Extreme Werte und Grenzfälle |
| `crossValidation.test.ts` | ~15 | **NEU:** stbvvCalculator vs CalculatorService |
| `exportConsistency.test.ts` | ~13 | **NEU:** Export-Formatierung und Konsistenz |

**Gesamt: ~290+ Unit-Tests**

### Neue Testabdeckung (Januar 2026)

#### Wizard End-to-End Tests (`wizardE2E.test.ts`)
Simuliert komplette Rechnungs-Workflows:
- Freiberufler ESt + EÜR
- GmbH Jahresabschluss (8 Positionen)
- Arbeitnehmer mit § 27 Zwanzigstelsätzen
- Gemischte Abrechnungsarten (Gegenstandswert, Stunden, Pauschale)
- Rabatt-Varianten (Prozent und Festbetrag)
- Auslagenpauschale (20%-Regel und 20€-Maximum)
- MwSt.-Berechnung nach Rabattabzug

#### Extreme Value Tests (`extremeValues.test.ts`)
Testet Grenzfälle für robuste Berechnungen:
- Gegenstandswerte bis 100 Mio. €
- Minimal-Werte (0,01 €)
- Quantity bis 999
- 200+ Positionen in einer Rechnung
- 99,99% Rabatt
- Floating-Point-Präzision (0.1 + 0.2 Problem)
- Ungewöhnliche Zehntelsätze (0.5/10, 30/10, 1/20)
- NaN und negative Werte (Robustheit)

#### Cross-Validation Tests (`crossValidation.test.ts`)
Vergleicht beide Calculator-Implementierungen:
- `stbvvCalculator.ts` (Cent-basiert, primär)
- `CalculatorService.ts` (Legacy, Floating-Point)
- Toleranz ≤ 0,05 € bei komplexen Szenarien
- Alle Abrechnungsarten abgedeckt

#### Export Consistency Tests (`exportConsistency.test.ts`)
Verifiziert Export-Qualität:
- Deutsches Zahlenformat (1.234,56 €)
- Reproduzierbare Berechnungen
- Maximale 2 Dezimalstellen
- Prüfsummen-Kompatibilität

### Kritische Test-Szenarien

1. **Floating-Point-Präzision:**
   ```typescript
   // 0.1 + 0.2 !== 0.3 in JavaScript
   expect(euroToCent(0.1 + 0.2)).toBe(30); // ✅ Cent-basiert korrekt
   ```

2. **Gebührentabellen-Grenzen:**
   ```typescript
   // Übergang bei exakten Grenzwerten
   expect(feeTableA.find(e => 9999 >= e.minValue)?.fee).toBe(605);
   expect(feeTableA.find(e => 10000 >= e.minValue)?.fee).toBe(655);
   ```

3. **Mindestgegenstandswerte:**
   ```typescript
   // Warnung bei Unterschreitung
   validatePosition({ activity: 'EÜR', objectValue: 10000 });
   // → Warning: BELOW_MIN_OBJECT_VALUE (17.500 € erforderlich)
   ```

---

## Technische Architektur

### Service Layer

```
src/services/
├── CalculatorService.ts    # Berechnungslogik
├── StorageService.ts       # Zod-validierter LocalStorage
└── ErrorLoggingService.ts  # Strukturiertes Fehler-Logging
```

### Hooks

```
src/hooks/
├── usePositionValidation.ts  # Echtzeit-Validierung
├── useErrorHandler.ts        # Fehlerbehandlung mit Toast
├── useDocumentValidation.ts  # Dokument-Integrität
├── useDocumentExport.ts      # Export-Orchestrierung
└── useDebounce.ts            # Input-Optimierung
```

### Schemas

```
src/schemas/
├── position.schema.ts          # Basis-Position
├── positionValidation.schema.ts # Erweiterte Validierung
├── client.schema.ts            # Mandantendaten
├── discount.schema.ts          # Rabatt-Struktur
└── archivedDocument.schema.ts  # Archiv-Format
```

### Konstanten

```
src/constants/
├── fees.ts       # MwSt., Auslagen, Zeitgebühren
├── validation.ts # Mindestgegenstandswerte
├── stbvv.ts      # Versionierung, Rechtsgrundlagen
└── storage.ts    # LocalStorage-Keys
```

---

## Phase 7: Performance-Optimierung

### 7.1 React.memo Optimierung

Folgende Komponenten wurden mit `React.memo` und stabilem Export-Pattern optimiert:

| Komponente | Optimierung | Effekt |
|------------|-------------|--------|
| `PositionCard` | Custom areEqual + displayName | Verhindert Re-Render bei unveränderter Position |
| `TotalCalculation` | memo + useCallback + displayName | Stabile Handler, memoized Berechnung |
| `FloatingSummaryBar` | memo | Keine Re-Renders bei Parent-Updates |
| `CalculatorHeader` | memo | Statische UI-Elemente gecached |
| `PositionList` | memo + useCallback | Drag-Handler und ID-Liste memoized |

### 7.2 Stabiles Export-Pattern

Um HMR-Kompatibilitätsprobleme zu vermeiden, verwenden alle memoized Komponenten das folgende Pattern:

```typescript
// Stabiles Export-Pattern für HMR-Kompatibilität
const PositionCardMemo = memo(PositionCard, customCompare);
PositionCardMemo.displayName = 'PositionCard';
export default PositionCardMemo;
```

### 7.3 useMemo & useCallback

```typescript
// Beispiel: PositionCard - Custom Comparison
const PositionCardMemo = memo(PositionCard, (prevProps, nextProps) => {
  return (
    prevProps.position === nextProps.position &&
    prevProps.index === nextProps.index &&
    prevProps.canMoveUp === nextProps.canMoveUp &&
    prevProps.canMoveDown === nextProps.canMoveDown &&
    prevProps.isSelectable === nextProps.isSelectable &&
    prevProps.isSelected === nextProps.isSelected
  );
});
```

### 7.4 Code-Splitting & Lazy Loading

**Bereits implementiert:**

```typescript
// Dynamische Imports für große Module
const { generatePDF } = await import('@/utils/pdfGenerator');
const { exportToExcel } = await import('@/utils/excelExporter');
```

**Effekte:**
- Initial Bundle Size reduziert
- PDF-Generator (~150 KB) wird nur bei Bedarf geladen
- Excel-Exporter (~100 KB) wird nur bei Bedarf geladen

### 7.5 Debouncing

**Datei:** `src/hooks/useDebounce.ts`

Alle numerischen Eingabefelder nutzen 300ms Debouncing:
- Gegenstandswert
- Stundensatz
- Stunden
- Pauschale

---

## Phase 8: Stabilitätsverbesserungen

### 8.1 Erweitertes ErrorBoundary

**Datei:** `src/components/ErrorBoundary.tsx`

Das ErrorBoundary wurde erweitert um:
- Integration mit `ErrorLoggingService` für strukturiertes Crash-Reporting
- Erfassung des ComponentStack für Debugging
- Expandierbare technische Details im Entwicklungsmodus
- "Erneut versuchen"-Button neben "Seite neu laden"
- Optional: Custom Fallback-UI via `fallback` Prop

```typescript
<ErrorBoundary fallback={<CustomErrorUI />}>
  <App />
</ErrorBoundary>
```

### 8.2 Komponenten-Loading-Tests

**Datei:** `src/components/__tests__/componentLoading.test.ts`

Unit-Tests zur Absicherung der Komponentenexporte:
- Prüfung auf gültige React-Komponenten (`typeof === 'function'` oder memo-Objekt)
- Validierung von `displayName` auf memoized Komponenten
- Batch-Test aller Calculator- und Wizard-Komponenten
- Schutz vor "Component is not a function"-Fehlern

---

## Wartung & Aktualisierung

### Bei StBVV-Änderungen

1. **Gebührentabellen aktualisieren:**
   - `src/utils/stbvvTables.ts` anpassen
   - Prüfsummen in `feeTableVerification.test.ts` aktualisieren

2. **Zeitgebühren anpassen:**
   - `src/constants/fees.ts` → `TIME_FEE` Konstanten

3. **Mindestgegenstandswerte:**
   - `src/constants/validation.ts` → `MIN_OBJECT_VALUES`
   - `src/schemas/positionValidation.schema.ts` → `activityMinValueMap`

4. **Versionierung:**
   - `src/constants/stbvv.ts` → `STBVV_CURRENT_VERSION` und `STBVV_VERSION_HISTORY`

5. **Tests aktualisieren:**
   - Golden Reference Tests mit neuen Sollwerten
   - Prüfsummen-Tests anpassen

### Qualitäts-Checkliste vor Release

- [ ] Alle Unit-Tests bestanden
- [ ] Gebührentabellen-Prüfsummen verifiziert
- [ ] Golden Reference Tests aktuell
- [ ] Rechtsgrundlagen-Verweise geprüft
- [ ] PDF-Export mit korrekten Disclaimern
- [ ] Mindestgegenstandswerte aktuell

---

## Kontakt & Support

**Repository:** StBVV-Rechner  
**Dokumentation:** `/docs/QUALITY_ASSURANCE.md`  
**Tests:** `npm test`

---

*Letzte Aktualisierung: Januar 2026*
