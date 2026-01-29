
Zielsetzung (kurz)
- Kritischen Bug beheben: Beim Ändern einer Position werden andere Positionen “zurückgesetzt/überschrieben”.
- Plan/Implementierungsreihenfolge anpassen: Erst Stabilität/Fix, danach Monetarisierung.
- Monetarisierung: Kein Lovable Cloud Backend, sondern externe Supabase (Supabase Connection) als Backend-Basis.

1) Reproduktion & Befund (bereits verifiziert)
- Repro in Preview:
  1. Vorlage laden (z.B. “Einkommensteuererklärung Privatperson (Arbeitnehmer)”).
  2. In Position 1 “Gegenstandswert” setzen (z.B. 1234).
  3. In Position 2 “Gegenstandswert” setzen (z.B. 2222).
  4. Ergebnis: Wert von Position 1 verschwindet/reset (überschrieben).
- Das ist der gleiche Bug-Kern wie zuvor (Race/Stale Update) – tritt jetzt aber schon beim normalen Editieren auf, nicht nur beim “Vorlage laden + Position hinzufügen”.

2) Wahrscheinliche Root Cause (konkret im Code)
Es gibt derzeit zwei zentrale Ursachen für “Überschreibt andere Positionen”:

2.1 Stale-State durch nicht-funktionale Updates / Closure-Snapshots
- In `src/pages/Index.tsx` wird `updatePosition` aktuell so gemacht:
  - `setPositions(positions.map(...))`
- Das Problem: Durch Debounce in `PositionCard` feuern Updates zeitversetzt. Wenn ein Debounce-Update später mit einer älteren Funktions-/State-Referenz feuert, wird das Positions-Array aus einem alten Snapshot wieder “zurückgeschrieben” → andere Felder/Positionen verlieren ihre neueren Werte.

2.2 “Full replace” statt Patch-Update
- `PositionCard` ruft häufig `onUpdate(position.id, { ...position, [field]: value })` auf (also kompletten Position-Record).
- Wenn `position` in der Card nicht mehr aktuell ist (stale Props während Debounce), dann wird ein “alter” kompletter Datensatz zurückgespeichert und überschreibt neuere Änderungen an derselben Position oder anderer Logik, die kurz zuvor stattgefunden hat.

3) Korrigierte Bugfix-Strategie (robust, priorisiert)
Wichtig: Der bisherige Fix mit `isEditing*` ist gut gegen Template/Add-Race, aber nicht ausreichend gegen “stale snapshot overwrites”. Wir brauchen jetzt einen State-Update-Pfad, der unabhängig vom Zeitpunkt immer auf dem aktuellsten Stand arbeitet.

3.1 Positions-Updates nur noch als Patch (Partial Update)
- API-Änderung: `onUpdatePosition(id, patch)` statt `onUpdatePosition(id, fullPosition)`
  - Patch-Beispiele: `{ objectValue: 1234 }`, `{ billingType: 'hourly', hourlyRate: 100, hours: 1 }`
- Vorteil: Selbst wenn die Card “alt” ist, überschreibt sie nicht unbeteiligte Felder mit alten Defaults/Nullen.

3.2 Parent-Reducer-Logik: immer funktional, immer auf “prev”
- In `Index.tsx` und überall, wo `positions` geändert wird:
  - `setPositions(prev => prev.map(...))`, `setPositions(prev => [...prev, newPos])`, etc.
- Damit werden Debounce-Aufrufe und schnell aufeinanderfolgende Updates korrekt zusammengeführt.

3.3 “setPositions” muss wirklich functional sein (Tab-Architektur berücksichtigen)
- In `Index.tsx` ist `setPositions` aktuell ein Wrapper, der bei Funktions-Updates `newPositions(activeTab.positions)` verwendet.
- Das ist wieder ein Snapshot-Risiko, weil `activeTab.positions` ebenfalls aus dem Render/Closure kommt.
- Fix: `useDocumentTabs` bekommt eine neue Update-Funktion, die innerhalb von `setTabsState(prev => ...)` Positions-Updates funktional am echten `prev` ausführt, z.B.:
  - `updateTabPositions(tabId, updaterFn)`
  - oder `updateTabWith(tabId, (tab) => ({ ...tab, positions: ... }))`

4) Geplante Code-Änderungen (Dateien & Reihenfolge)
Phase A: Stabilitäts-Fix (sofort, blocker)
A1) `src/hooks/useDocumentTabs.ts`
- Neue Helper-Funktion hinzufügen:
  - `updateTabPositions(tabId, updater: (prevPositions: Position[]) => Position[])`
  - Umsetzung über `setTabsState(prev => ...)`, damit “prev” garantiert aktuell ist.
- Optional: generischer `updateTabWith(tabId, updater: (prevTab: DocumentTabData) => DocumentTabData)` für zukünftige Features.

A2) `src/pages/Index.tsx`
- `setPositions` umstellen:
  - Wenn Array: `updateTab(activeTabId, { positions: array })`
  - Wenn Function: `updateTabPositions(activeTabId, fn)`
- Alle Positions-Manipulationen (add/duplicate/remove/move/bulk/reorder/loadTemplate) auf funktionale Updates umstellen, z.B.:
  - `addPosition`: `setPositions(prev => [...prev, newPosition])`
  - `updatePosition`: `setPositions(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p))`
  - `remove`: `setPositions(prev => prev.filter(...))`
  - `bulk`: ebenfalls `prev => ...`
- `updatePosition` als `useCallback` stabilisieren (reduziert Re-Renders und Debounce-Stale).

A3) `src/components/PositionCard.tsx`
- `onUpdate` Signatur ändern auf Patch:
  - von `(id, position: Position)` zu `(id, patch: Partial<Position>)`
- Alle Stellen von `onUpdate(position.id, { ...position, ... })` auf Patch umstellen:
  - Debounced numeric updates: `handleChange('objectValue', v)` soll `onUpdate(position.id, { objectValue: v })` senden
  - `handleActivityChange`: Patch mit allen Feldern, die sich ändern (activity, tenthRate, feeTable, billingType, hourlyRate/hours/flatRate etc.)
  - `handleTenthRateChange`: Patch `{ tenthRate: ... }`
- `isEditing*` Mechanik kann bleiben (schützt vor “externen Sync überschreibt User-Eingabe”), aber die Hauptsicherheit kommt ab jetzt aus “functional + patch”.

A4) Weitere Call-Sites anpassen (TypeScript Compile Fix)
- `src/components/calculator/PositionList.tsx` (Props-Typen)
- Wizard-Komponenten:
  - `src/components/wizard/GuidedWorkflow.tsx`
  - `src/components/wizard/WizardStepValues.tsx`
  - und ggf. weitere, die `onUpdatePosition` nutzen
- Ziel: überall Patch-Semantik, damit niemand mehr “Full replace” macht.

A5) Schnelltest / Abnahmekriterien (manuell + optional Test)
Manuelle “Must pass”-Checks:
- Vorlage laden → Position 1 Wert ändern → Position 2 Wert ändern → beide Werte bleiben erhalten.
- Mehrfach schnell tippen (Debounce) → keine anderen Positionen verlieren Werte.
- Vorlage laden → neue Position hinzufügen → Werte bleiben stabil.
- DnD reorder → danach Änderungen an einzelnen Positionen ändern nur diese Position.
Optional (wenn sinnvoll): kleiner Unit-Test für “applyPatch”-Logik (wenn wir Hilfsfunktion extrahieren), ist aber nicht zwingend als Hotfix.

Phase B: Monetarisierung (nachdem A grün ist) – angepasst für externe Supabase
Wichtig: Momentan ist noch kein Supabase-Code im Repo (keine `@supabase/supabase-js` Dependency, keine `src/integrations/supabase`), daher wird das ein eigenständiger Implementierungsblock.

B1) Externe Supabase anbinden (statt Lovable Cloud)
- Verwendung: “Supabase Connection” (externe Supabase)
- Schritte:
  - Projekt verbinden (URL + anon key)
  - `@supabase/supabase-js` hinzufügen
  - Supabase Client in `src/` anlegen (z.B. `src/integrations/supabase/client.ts`)
  - Umgebungsvariablen korrekt konfigurieren (Vite: `VITE_...`)

B2) Auth + Basis-DB
- Tabellen: profiles, subscriptions, usage_limits, (später) clients, custom_templates, document_archive
- RLS Policies (sehr wichtig, weil Mandanten-/Abrechnungsdaten)
- Rollenmodell (admin / user / kanzlei_admin)

B3) Stripe Billing (Abo: Free/Standard/Premium, optional Premium Plus)
- Produkte/Preise:
  - Standard: 9,99 EUR monatlich, jährlich -20%
  - Premium: 19,99 EUR monatlich, jährlich -20%
  - Free: technisch “kein Stripe Abo”, aber Plan=free in DB
  - Premium Plus: 49,99 EUR (optional als separate Phase, erst wenn Basis sauber läuft)
- Webhook-Verarbeitung:
  - Empfehlung: über Supabase Edge Functions im externen Supabase Projekt (oder alternativ eigener kleiner Server).
  - Speichert Subscription-Status in `subscriptions` Tabelle.
- Customer Portal:
  - Stripe Customer Portal für Kündigung/Planwechsel.
- Feature-Gating im Frontend:
  - `useSubscription()` Hook
  - Guards für Export-Limits, Template-Limits, Tabs, Mandanten-Datenbank etc.

B4) Kundenbereich + Adminbereich
- Kundenbereich (Account/Billing): Abo-Status, Rechnungen/Portal-Link, Planwechsel
- Adminbereich: User-Übersicht, Subscription-Status, ggf. Support-Tools

5) Überarbeitete Implementierungs-Reihenfolge (wichtig)
1. Phase A komplett: Positions-Update-Bug (Patch + functional updates + tab-safe updater).
2. Stabilitätsprüfung end-to-end (inkl. Template, Add Position, mehrere Änderungen hintereinander, DnD, Wizard).
3. Externe Supabase Verbindung + Auth Skeleton (Login/Register + protected routes).
4. Subscription Datenmodell + `useSubscription` + Feature-Gating im UI (noch ohne Stripe “echte Zahlungen”, aber Plan-States).
5. Stripe Integration (Checkout + Webhooks + Customer Portal) auf externer Supabase.
6. Mandanten-Datenbank (Premium), Dokument-Archiv, weitere Premium-Funktionen.
7. Optional Premium Plus (Multi-User/Kanzlei, SEPA/Lastschrift nur, wenn Stripe Setup und rechtliche/operative Anforderungen final geklärt sind).

6) Definition of Done (Phase A)
- Einzelne Feldänderung in einer Position darf niemals andere Positionen ändern oder zurücksetzen.
- Das gilt unabhängig von:
  - vorher Vorlage geladen,
  - neue Position hinzugefügt,
  - schnelles Tippen (Debounce),
  - Reihenfolge geändert (DnD),
  - Wizard an/aus.

Hinweis zur externen Supabase Anforderung
- Ich plane die Monetarisierung explizit mit “Supabase Connection” (externe Supabase), ohne Lovable Cloud Backend. Das beeinflusst vor allem: Deployment/Hosting von Webhooks/Edge Functions und das Setup der Datenbank/RLS in eurem Supabase Projekt.
