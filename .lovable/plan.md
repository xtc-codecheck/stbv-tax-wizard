# Plan: Eingabefelder dauerhaft konsistent machen

## Bestätigte Ursache

Der übergeordnete Datenfluss ist bereits richtig aufgebaut:
- `Index.tsx` aktualisiert Positionen patch-basiert.
- `useDocumentTabs.ts` nutzt funktionale Updates und überschreibt nicht die komplette Positionsliste mit alten Snapshots.

Das Reset-Problem sitzt in `src/components/PositionCard.tsx`:

- Eurofelder (`objectValue`, `hourlyRate`, `hours`, `flatRate`) werden lokal gespeichert.
- Danach werden sie per `useDebounce(300ms)` verzögert an den Parent übertragen.
- Parallel synchronisieren `useEffect`s die Parent-Props zurück in den lokalen State.
- Sobald eine andere Position hinzugefügt/geändert wird, rendert die ganze Liste neu. Wenn dann ein Debounce oder Sync-Effect in ungünstiger Reihenfolge läuft, schreibt ein alter Prop-Wert wieder in das Eingabefeld.

Das passt genau zu deiner Beobachtung: Der Betrag erscheint zuerst in der Gesamtberechnung, wird aber beim nächsten Hinzufügen oder Bearbeiten wieder überschrieben.

## Zielzustand

Eingaben müssen sich wie in einer professionellen Fachanwendung verhalten:

1. Ein Wert, der eingegeben wurde, darf nicht durch Änderungen an anderen Positionen zurückspringen.
2. Vorlagen dürfen nur beim Laden der Vorlage Initialwerte setzen.
3. Das Bearbeiten einer Position darf keine Werte in anderen Positionen überschreiben.
4. Eurobeträge, Stunden und Zehntelsätze müssen sofort zuverlässig in der Berechnung landen.
5. Keine Race Conditions durch Debounce, Local-State-Sync oder verzögerte Effekte.

## Umsetzung

### 1. `PositionCard.tsx`: Debounce-Mechanik entfernen

Ich entferne für die kritischen Zahlenfelder:
- `useDebounce` Import
- `debouncedObjectValue`
- `debouncedHourlyRate`
- `debouncedHours`
- `debouncedFlatRate`
- die vier Effects, die debounced Werte in den Parent schreiben
- die `isEditing...` State-Flags als React-State

Damit fällt die wichtigste Fehlerquelle weg.

### 2. Zahlenfelder direkt und atomar patchen

Die Inputs werden so geändert:

- `onChange` aktualisiert lokalen State für flüssiges Tippen.
- Gleichzeitig wird sofort ein Patch an den Parent gesendet, z. B. `{ objectValue: 50000 }`.
- Es wird niemals mehr eine vollständige Position aus einem alten Snapshot geschrieben.

Dadurch bleibt die Live-Berechnung sofort aktuell und es gibt keine 300-ms-Lücke mehr, in der ein alter Wert gewinnen kann.

### 3. Prop-zu-Local-Sync absichern

Die lokalen States werden nur noch synchronisiert, wenn sich die echte Position-Identität ändert oder ein externer Wert wirklich neu ist.

Dafür wird pro Feld ein `useRef` für den letzten vom Nutzer geschriebenen Wert genutzt. Ein externer Sync darf keinen Wert zurückschreiben, der gerade vom Nutzer gesetzt wurde.

Praktisch heißt das:

```text
Nutzer tippt 50.000
-> localObjectValue = 50000
-> Parent-Patch { objectValue: 50000 }
-> andere Position wird hinzugefügt
-> Re-render
-> Sync darf nicht auf alten Wert zurücksetzen
```

### 4. Zehntelsatz prüfen und stabilisieren

Der Zehntelsatz wird aktuell direkt über `handleTenthRateChange` gepatcht. Das ist grundsätzlich korrekt.

Ich prüfe und stabilisiere zusätzlich:
- leere Eingabe soll nicht sofort auf `1` zurückspringen, während der Nutzer tippt
- Dezimalwerte wie `4.5`, `17.5` müssen erhalten bleiben
- bei Zwanzigstelsätzen bleibt der Nenner `20`, sonst `10`

Falls nötig, bekommt auch der Zehntelsatz einen kleinen lokalen Eingabe-State, damit Zwischenzustände beim Tippen nicht zerstört werden.

### 5. Aktivitäts-/Vorlagenwechsel begrenzen

`handleActivityChange` darf weiterhin fachliche Defaults setzen:
- Tätigkeit
- Gebührentabelle
- Zehntel-/Zwanzigstelsatz
- ggf. Abrechnungsart bei Zeit-/Pauschalpositionen

Aber: Es darf keine unbeteiligten Nutzerwerte zurücksetzen.

Ich stelle sicher, dass nur die fachlich notwendigen Felder gepatcht werden und keine lokalen Eingabezustände anderer Felder überschrieben werden.

### 6. Browser-Verifikation

Nach Umsetzung teste ich im laufenden Preview:

1. Vorlage laden.
2. Gegenstandswert in Position 1 ändern.
3. Position hinzufügen.
4. Prüfen: Wert in Position 1 bleibt bestehen und Gesamtberechnung bleibt identisch.
5. Wert in Position 2 ändern.
6. Prüfen: Position 1 bleibt unverändert.
7. Zehntelsatz ändern.
8. Prüfen: Zehntelsatz und Berechnung bleiben nach weiterer Positionsänderung stabil.
9. Gewerbesteuer-/Vorlagen-Szenario nachstellen.

## Geänderte Datei

- `src/components/PositionCard.tsx`

Keine Änderung an der Berechnungslogik selbst, keine Änderung an Tabellenwerten, keine Änderung an PDF-Export oder Speicherformat.

## Erwartetes Ergebnis

Die App überschreibt eingegebene Beträge und Zehntelsätze nicht mehr, wenn eine Vorlage geladen, eine neue Position hinzugefügt oder eine andere Position bearbeitet wird. Die Berechnung bleibt konsistent und steuerberater-tauglich stabil.