# DSGVO-Konformität (GDPR Compliance)

Dieses Dokument beschreibt alle implementierten Datenschutzmaßnahmen gemäß der Datenschutz-Grundverordnung (DSGVO/GDPR).

---

## Übersicht

Der StBVV-Rechner wurde mit Datenschutz als Kernprinzip entwickelt (**Privacy by Design**). Die Anwendung verarbeitet keine personenbezogenen Daten auf Servern – alle sensiblen Daten verbleiben ausschließlich auf dem Gerät des Nutzers.

| Kategorie | Status | Details |
|-----------|--------|---------|
| Mandantendaten | ✅ Nicht gespeichert | Nur Sitzungsdaten, keine Persistenz |
| Kanzlei-Einstellungen | ✅ Lokal gespeichert | Mit Einwilligung, löschbar |
| Server-Übertragung | ✅ Keine | Keine personenbezogenen Daten werden übertragen |
| Cookie-Einwilligung | ✅ Implementiert | Banner beim Erstbesuch |
| Widerrufsrecht | ✅ Implementiert | Jederzeit in Einstellungen |
| Löschrecht | ✅ Implementiert | Alle Daten löschbar |

---

## 1. Keine Speicherung von Mandantendaten

### Implementierung

**Betroffene Dateien:**
- `src/hooks/useClientDatabase.ts` – Deaktiviert, gibt nur leere Arrays zurück
- `src/components/wizard/WizardStepClient.tsx` – Keine "Zuletzt verwendet"-Funktion
- `src/components/calculator/ClientDataFormAdvanced.tsx` – Keine Auto-Complete oder Speichern-Funktion

### Technische Details

```typescript
// useClientDatabase.ts - Vollständig deaktiviert
export function useClientDatabase() {
  return {
    clients: [] as SavedClient[],
    recentClients: [] as SavedClient[],
    saveClient: () => { /* No-op */ },
    deleteClient: () => { /* No-op */ },
    markAsUsed: () => { /* No-op */ },
    searchClients: () => [],
  };
}
```

### Verhalten

- Mandantennamen, Adressen und E-Mail-Adressen werden **nur im React-State** gehalten
- Beim Schließen des Browsers oder Neuladen der Seite werden alle Mandantendaten **automatisch gelöscht**
- Es gibt **keine localStorage-Einträge** für Mandantendaten

---

## 2. Cookie-Banner / Einwilligungsbanner

### Implementierung

**Datei:** `src/components/CookieBanner.tsx`

### Funktionsweise

1. **Erstbesuch**: Banner erscheint nach 500ms mit Erklärung zur lokalen Datenspeicherung
2. **Akzeptieren**: Speichert `stbvv_cookie_consent: "accepted"` in localStorage
3. **Ablehnen**: Speichert `stbvv_cookie_consent: "declined"` in localStorage
4. **Folgebesuche**: Banner erscheint nicht mehr (Einwilligung gespeichert)

### Inhalt des Banners

> **Lokale Datenspeicherung**
> 
> Diese Anwendung speichert Ihre Kanzlei-Einstellungen lokal in Ihrem Browser. 
> Mandantendaten werden nicht gespeichert und sind nur während der aktuellen Sitzung verfügbar.

---

## 3. Datenschutzhinweise in der UI

### Wizard-Formular

**Datei:** `src/components/wizard/WizardStepClient.tsx`

Anzeige eines Hinweises oberhalb des Formulars:

> **Datenschutz:** Mandantendaten werden nur für die aktuelle Sitzung verwendet und nicht gespeichert. 
> Beim Schließen des Browsers werden alle eingegebenen Daten automatisch gelöscht.

### Hauptformular

**Datei:** `src/components/calculator/ClientDataFormAdvanced.tsx`

Untertitel im Card-Header:

> 🛡️ Daten werden nur für diese Sitzung verwendet – keine Speicherung

---

## 4. Einstellungsseite – Datenverwaltung

### Implementierung

**Datei:** `src/pages/Settings.tsx`

### Funktionen

#### 4.1 DSGVO-Hinweis (Alert)

Permanente Information über den Umgang mit Daten.

#### 4.2 Cookie-Einwilligung widerrufen

```typescript
onClick={() => {
  localStorage.removeItem('stbvv_cookie_consent');
  toast.success("Einwilligung widerrufen");
}}
```

- Entfernt die gespeicherte Einwilligung
- Cookie-Banner erscheint beim nächsten Seitenaufruf erneut

#### 4.3 Alle lokalen Daten löschen

```typescript
const handleDeleteAllData = () => {
  const keysToDelete = [
    'stbvv_saved_clients',
    'stbvv_document_archive',
    'stbvv_document_tabs',
    'stbvv_autosave_client',
    'stbvv_branding_settings',
    'stbvv_cookie_consent',
  ];
  keysToDelete.forEach(key => localStorage.removeItem(key));
};
```

- Löscht alle App-bezogenen localStorage-Einträge
- Bestätigungsdialog vor Ausführung
- Setzt Formular auf Standardwerte zurück

---

## 5. Datenschutzerklärung

### Implementierung

**Datei:** `src/pages/Datenschutz.tsx`

### Abschnitt: Lokale Speicherung (LocalStorage)

Detaillierte Erklärung mit folgenden Punkten:

1. **Welche Daten werden lokal gespeichert?**
   - Kanzlei-Branding-Einstellungen
   - Erscheinungsbild-Präferenzen
   - Cookie-Einwilligung

2. **Welche Daten werden NICHT gespeichert?**
   - Mandantendaten (explizit hervorgehoben)

3. **Speicherdauer und Löschung**
   - Link zu den Einstellungen für manuelle Löschung

4. **Rechtsgrundlage**
   - Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)

---

## 6. localStorage-Schlüssel

### Aktive Schlüssel

| Schlüssel | Zweck | Personenbezogen? |
|-----------|-------|------------------|
| `stbvv_cookie_consent` | Einwilligungsstatus | Nein |
| `stbvv_branding_settings` | Kanzleidaten für PDFs | Ja (eigene Daten) |
| `stbvv_theme` | Hell-/Dunkelmodus | Nein |

### Deaktivierte/Leere Schlüssel

| Schlüssel | Status | Begründung |
|-----------|--------|------------|
| `stbvv_saved_clients` | Nicht verwendet | DSGVO-Konformität |
| `stbvv_autosave_client` | Nicht verwendet | DSGVO-Konformität |

---

## 7. Betroffenenrechte (Art. 15-22 DSGVO)

| Recht | Umsetzung |
|-------|-----------|
| **Auskunftsrecht** | Alle Daten sind im Browser einsehbar (DevTools > Application > LocalStorage) |
| **Recht auf Berichtigung** | Nutzer kann Daten in Einstellungen jederzeit ändern |
| **Recht auf Löschung** | "Alle Daten löschen"-Button in Einstellungen |
| **Recht auf Widerruf** | Cookie-Einwilligung widerrufbar in Einstellungen |
| **Datenübertragbarkeit** | Nicht anwendbar (keine Server-Speicherung) |

---

## 8. Technische Sicherheitsmaßnahmen

### 8.1 Keine Server-Kommunikation

- Keine API-Aufrufe mit personenbezogenen Daten
- Keine Datenbanken mit Nutzerdaten
- Keine Analytics mit PII (Personally Identifiable Information)

### 8.2 Browser-Isolation

- Daten sind an den spezifischen Browser/Gerät gebunden
- Keine Cross-Device-Synchronisation
- Keine Cloud-Speicherung

### 8.3 HTTPS-Verschlüsselung

- SSL/TLS für alle Verbindungen
- Dokumentiert in Datenschutzerklärung

---

## 9. Audit-Checkliste

### Vor der Veröffentlichung prüfen:

- [ ] Cookie-Banner erscheint beim Erstbesuch
- [ ] Mandantendaten verschwinden nach Page Reload
- [ ] "Alle Daten löschen" funktioniert korrekt
- [ ] Cookie-Einwilligung kann widerrufen werden
- [ ] Datenschutzerklärung ist vollständig und aktuell
- [ ] Impressum enthält korrekten Verantwortlichen

### localStorage nach Nutzung prüfen:

```javascript
// In Browser-Konsole ausführen:
Object.keys(localStorage).filter(k => k.startsWith('stbvv_'))
```

Erwartetes Ergebnis nach DSGVO-Konformität:
- `stbvv_cookie_consent`
- `stbvv_branding_settings` (optional, nur wenn Kanzleidaten eingegeben)
- `stbvv_theme` (optional)

**Keine Mandanten-bezogenen Einträge!**

---

## 10. Änderungshistorie

| Datum | Änderung |
|-------|----------|
| 2025-01 | Initiale DSGVO-Implementierung |
| 2025-01 | Deaktivierung der Mandanten-Datenbank |
| 2025-01 | Cookie-Banner hinzugefügt |
| 2025-01 | Datenschutz-Hinweise in Formularen |
| 2025-01 | Einwilligungs-Widerruf in Einstellungen |
| 2025-01 | Erweiterte Datenschutzerklärung |

---

## Kontakt für Datenschutzfragen

Finanzgeflüster GmbH  
Prüfeninger Straße 52  
93049 Regensburg  

E-Mail: info@finanzgefluester.de  
Telefon: 0941 / 85099285
