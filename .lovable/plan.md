
# Bugfix-Plan: Race Condition bei Vorlage laden + Position hinzufügen

## Problemursache

Das Problem entsteht durch eine **Race Condition** zwischen dem Debounce-Mechanismus in `PositionCard.tsx` und dem Positions-State:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ ZEITABLAUF DES PROBLEMS                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ t=0ms:    Vorlage geladen → Positionen erhalten Werte (z.B. objectValue=100)│
│ t=50ms:   PositionCards rendern mit localObjectValue=100                    │
│ t=100ms:  Debounce-Timer starten (300ms Verzögerung)                        │
│ t=200ms:  Benutzer klickt "Position hinzufügen"                             │
│ t=200ms:  Neue Position wird an Array angehängt                             │
│ t=400ms:  DEBOUNCE FEUERT! Alte useEffect prüft:                            │
│           → debouncedObjectValue (100) !== position.objectValue (???)       │
│           → Veraltete Closure-Referenz führt zu handleChange mit 0          │
│ t=400ms:  Alle Positionen werden überschrieben!                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Lösungsstrategie

Ich empfehle einen **zweistufigen Fix**, der die Race Condition vollständig eliminiert:

---

### Schritt 1: Debounce-Effects mit korrekten Dependencies absichern

**Datei:** `src/components/PositionCard.tsx`

Die `useEffect`-Hooks für debounced Updates haben unvollständige Dependencies. Sie referenzieren `position.objectValue`, aber haben es nicht in der Dependency-Liste.

**Aktueller problematischer Code:**
```typescript
useEffect(() => {
  if (debouncedObjectValue !== position.objectValue) {
    handleChange('objectValue', debouncedObjectValue);
  }
}, [debouncedObjectValue]); // ← PROBLEM: position.objectValue fehlt!
```

**Lösung:**
```typescript
useEffect(() => {
  if (debouncedObjectValue !== position.objectValue) {
    handleChange('objectValue', debouncedObjectValue);
  }
}, [debouncedObjectValue, position.objectValue, handleChange]);
```

Gleiches für `debouncedHourlyRate`, `debouncedHours`, und `debouncedFlatRate`.

---

### Schritt 2: handleChange als stabile Callback-Referenz

**Datei:** `src/components/PositionCard.tsx`

`handleChange` muss mit `useCallback` memoized werden, damit es eine stabile Referenz hat:

**Aktueller Code:**
```typescript
const handleChange = (field: keyof Position, value: any) => {
  onUpdate(position.id, { ...position, [field]: value });
};
```

**Lösung:**
```typescript
const handleChange = useCallback((field: keyof Position, value: any) => {
  onUpdate(position.id, { ...position, [field]: value });
}, [position, onUpdate]);
```

---

### Schritt 3: Guard gegen stale Debounce-Werte

**Datei:** `src/components/PositionCard.tsx`

Zusätzlicher Schutz: Prüfen ob der lokale Wert wirklich vom Benutzer geändert wurde und nicht durch externe Prop-Änderung:

```typescript
// Tracking ob der User den Wert aktiv editiert
const [isUserEditing, setIsUserEditing] = useState(false);

useEffect(() => {
  // Nur updaten wenn der User editiert hat UND Wert sich unterscheidet
  if (isUserEditing && debouncedObjectValue !== position.objectValue) {
    handleChange('objectValue', debouncedObjectValue);
    setIsUserEditing(false);
  }
}, [debouncedObjectValue, position.objectValue, handleChange, isUserEditing]);

// Im Input onChange:
onChange={(e) => {
  setIsUserEditing(true); // ← User editiert aktiv
  setLocalObjectValue(value);
}}
```

---

### Schritt 4: Sync-Effects vor Debounce-Effects priorisieren

**Datei:** `src/components/PositionCard.tsx`

Die "Sync from props" Effects sollten den lokalen State und die Debounce-Referenz zurücksetzen, **bevor** das Debounce feuert:

```typescript
// Sync local state when position changes from external source
useEffect(() => {
  // Nur synchronisieren, wenn der Wert extern geändert wurde
  if (!isUserEditing && position.objectValue !== localObjectValue) {
    setLocalObjectValue(position.objectValue);
  }
}, [position.objectValue, isUserEditing]);
```

---

## Zusammenfassung der Änderungen

| Datei | Änderung |
|-------|----------|
| `src/components/PositionCard.tsx` | useCallback für `handleChange` |
| `src/components/PositionCard.tsx` | Vollständige Dependencies in Debounce-Effects |
| `src/components/PositionCard.tsx` | `isUserEditing` Flag zur Unterscheidung von User vs. External Updates |
| `src/components/PositionCard.tsx` | Verbesserte Sync-Logik für Props-to-State |

---

## Erwartetes Ergebnis

Nach dem Fix:
- Vorlage laden → Positionen erhalten korrekte Werte
- Position hinzufügen → Neue Position wird angehängt, bestehende bleiben unverändert
- Debounce-Timer feuern nur, wenn der Benutzer aktiv einen Wert geändert hat
- Keine Race Conditions mehr zwischen Template-Laden und Position-Hinzufügen

---

## Technische Details

### Warum passiert das überhaupt?

1. **React Closures**: Wenn `setPositions([...positions, newPosition])` aufgerufen wird, enthält `positions` die aktuelle Referenz. Aber die Debounce-Timer in den PositionCards haben noch alte Closures.

2. **Debounce-Timing**: Der 300ms Debounce ist lang genug, dass ein Benutzer in dieser Zeit eine neue Position hinzufügen kann.

3. **Fehlende Dependencies**: Die ESLint-Regel `react-hooks/exhaustive-deps` würde diese fehlenden Dependencies eigentlich anmahnen.

### Alternative Lösungen (nicht empfohlen)

- Template-Loading mit Debounce-Cancel → Zu komplex
- Alle Debounces entfernen → Performance-Probleme bei großen Listen
- Positions-ID als Debounce-Key → Funktioniert nicht für bestehende Positionen
