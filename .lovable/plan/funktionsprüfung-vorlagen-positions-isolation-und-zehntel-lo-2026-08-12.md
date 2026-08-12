# Funktionsprüfung: Vorlagen, Positions-Isolation und Zehntel-Logik

## Befunde aus der Code-Prüfung

**1. Vorlage laden ersetzt alle vorhandenen Positionen (Hauptursache)**
`loadTemplate` in `src/pages/Index.tsx` (Z. 389-398) baut ein neues Array aus den Vorlagen-Positionen und setzt es per `setPositions(newPositions)`. Alle zuvor erfassten Positionen des aktiven Dokuments werden dadurch verworfen — ohne Rückfrage und ohne Undo-Hinweis. Genau das entspricht dem gemeldeten "andere Positionen werden gelöscht".

**2. Erzwungenes Remount nach Vorlagenladen**
Nach dem Laden wird `renderKey` erhöht (Z. 396), was den kompletten DnD-Kontext und damit alle Positionskarten neu mountet. Lokale Eingabezustände gehen dabei verloren.

**3. PositionCard ist nicht memoisiert**
`PositionCard` wird ohne `React.memo` exportiert. Jede Eingabe in einer Position rendert alle Karten neu und lässt die Sync-Effekte in jeder Karte laufen — die Fehlerquelle, die "Werte springen zurück" begünstigt.

**4. Sync-Effekt mit instabilen Abhängigkeiten**
Der `useEffect` in `PositionCard.tsx` (Z. 98-128) hat die lokalen Werte selbst in der Dependency-Liste. Das erzeugt zusätzliche Effektläufe direkt nach jedem Tastendruck.

**5. Zehntel-Logik: Nenner wird aus dem Preset abgeleitet**
`handleTenthRateChange` setzt den Nenner bei jeder Eingabe neu aus `preset?.rateType` (Z. 238). Bei Positionen ohne Preset-Treffer (z. B. umbenannte oder Kopie-Positionen "… (Kopie)") fällt der Nenner immer auf 10 zurück, auch wenn die Position auf /20 (§ 27) steht.

Aktueller Teststand: 322 Tests, alle grün — es gibt jedoch keinen einzigen Test, der Vorlagenladen, Positions-Isolation oder Zehntel-Änderungen über mehrere Positionen abdeckt.

## Umsetzung

### Schritt 1 — Vorlagen laden ohne Datenverlust
- `loadTemplate` erhält einen Modus: bei bereits vorhandenen Positionen erscheint ein Dialog mit "Hinzufügen" (Standard) und "Ersetzen".
- "Hinzufügen" hängt die Vorlagen-Positionen an (`prev => [...prev, ...neu]`), Undo bleibt möglich.
- "Ersetzen" schreibt vorher einen History-Eintrag und zeigt einen Undo-Toast.
- Vorlagen-IDs werden weiterhin frisch generiert, damit keine ID-Kollisionen entstehen.
- Das künstliche `renderKey`-Remount entfällt; die Liste aktualisiert sich über die Positions-IDs.

### Schritt 2 — Positions-Isolation absichern
- `PositionCard` mit `React.memo` exportieren (Vergleich über Position-Referenz und relevante Flags), damit Eingaben in Position A keine Sync-Effekte in Position B auslösen.
- Sync-Effekt in `PositionCard` auf die Prop-Werte reduzieren; lokale Werte über Refs lesen statt über die Dependency-Liste.

### Schritt 3 — Zehntel-Berechnung korrigieren
- Nenner nicht mehr aus dem Preset ableiten, sondern aus der Position selbst (`position.tenthRate.denominator`); das Preset dient nur noch beim Wechsel der Tätigkeit als Initialwert.
- Eingaben mit Komma (`4,5`) werden auf Punkt normalisiert, damit deutsche Eingabe funktioniert.
- Ober-/Untergrenzen aus dem Preset (min/max Zehntel) werden als Warnung angezeigt, aber nicht hart überschrieben.

### Schritt 4 — Regressionstests (Steuerberaterqualität)
Neue Testdatei `src/utils/__tests__/positionIsolation.test.ts`:
- Vorlage laden bei bestehenden Positionen → alte Positionen bleiben erhalten (Hinzufügen-Modus).
- Änderung an Position 2 lässt Werte von Position 1 und 3 unverändert (Patch-Logik).
- Zehntel-Änderung auf 4,5/10 und 8/20 ergibt exakt die erwarteten Cent-Beträge über `calculatePosition`.
- Hinzufügen einer neuen Position nach Werteingabe verändert die Gesamtsumme nur additiv.

Zusätzlich ein End-to-End-Durchlauf im Browser: Vorlage laden → Wert eingeben → zweite Vorlage laden → zweite Position ändern → Zehntel anpassen → Gesamtsumme und alle Feldwerte prüfen, inkl. Screenshot-Nachweis.

## Technische Details
- Betroffene Dateien: `src/pages/Index.tsx`, `src/components/PositionCard.tsx`, `src/components/calculator/PositionList.tsx` (renderKey-Entfernung), neue Testdatei.
- Keine Änderung an der Rechenlogik in `src/utils/stbvvCalculator.ts` oder an den Gebührentabellen — der Rechtsstand 19.12.2025 bleibt unverändert.
- Alle 322 bestehenden Tests müssen weiterhin grün laufen.
