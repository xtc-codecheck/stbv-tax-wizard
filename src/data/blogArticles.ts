/**
 * Blog-Artikel-Daten
 * @module data/blogArticles
 */

import type { BlogArticle } from '@/schemas/blogArticle.schema';

export const blogArticles: BlogArticle[] = [
  {
    id: '1',
    slug: 'stbvv-2025-neuerungen',
    title: 'StBVV 2025: Die wichtigsten Neuerungen im Überblick',
    excerpt: 'Die Steuerberatervergütungsverordnung wurde zum 1. Januar 2025 angepasst. Wir erklären die wichtigsten Änderungen und deren Auswirkungen auf Ihre Honorare.',
    date: '2025-01-02',
    readTime: '8 Min.',
    category: 'Aktuelles',
    author: 'Redaktion',
    metaDescription: 'StBVV 2025 Änderungen: Neue Gebührensätze, angepasste Rahmengebühren und praktische Tipps für Steuerberater.',
    content: `
## Einleitung

Die Steuerberatervergütungsverordnung (StBVV) bildet das rechtliche Fundament für die Honorargestaltung in Steuerberatungskanzleien. Zum 1. Januar 2025 treten wichtige Anpassungen in Kraft, die sowohl Kanzleien als auch Mandanten betreffen. In diesem Artikel erläutern wir die wesentlichen Neuerungen und geben praktische Hinweise zur Umsetzung.

## Hintergrund der Anpassungen

Die letzte größere Anpassung der StBVV erfolgte 2020. Seitdem haben sich die wirtschaftlichen Rahmenbedingungen erheblich verändert: Inflation, gestiegene Personalkosten und zunehmende Digitalisierungsanforderungen haben die Kalkulation von Steuerberaterhonoraren vor neue Herausforderungen gestellt.

Der Gesetzgeber reagiert darauf mit einer moderaten Anhebung der Gebührensätze und einer Flexibilisierung bestimmter Rahmengebühren. Ziel ist es, eine angemessene Vergütung für qualitativ hochwertige Steuerberatung sicherzustellen.

## Die wichtigsten Änderungen im Detail

### 1. Anpassung der Grundgebühren

Die Tabellen A bis D wurden überarbeitet und an die wirtschaftliche Entwicklung angepasst. Insbesondere bei mittleren Gegenstandswerten ergeben sich spürbare Erhöhungen:

- **Tabelle A (allgemeine Beratung)**: Durchschnittliche Erhöhung um 8-12%
- **Tabelle B (Abschlussarbeiten)**: Anpassung besonders im Bereich 50.000-500.000 EUR
- **Tabelle C (Buchführung)**: Moderate Erhöhung der Mindestgebühren
- **Tabelle D (Landwirtschaft)**: Angleichung an allgemeine Entwicklung

### 2. Flexibilisierung der Rahmengebühren

Ein wesentlicher Fortschritt ist die erweiterte Flexibilität bei der Gebührenfestsetzung innerhalb der gesetzlichen Rahmen. Steuerberater können nun differenzierter auf Komplexität und Aufwand einzelner Mandate eingehen.

Die Faktoren für die Rahmengebühren wurden präziser definiert:

- Umfang und Schwierigkeit der Tätigkeit
- Bedeutung der Angelegenheit für den Auftraggeber
- Einkommens- und Vermögensverhältnisse des Auftraggebers
- Hafungsrisiko des Steuerberaters

### 3. Digitalisierungspauschalen

Neu eingeführt wurden Regelungen für digitale Dienstleistungen. Kanzleien können nun explizit Gebühren für:

- Elektronische Kommunikation mit Finanzbehörden
- Digitale Belegverarbeitung
- Cloud-basierte Zusammenarbeit mit Mandanten

berechnen, sofern diese über das übliche Maß hinausgehen.

## Praktische Umsetzung in Ihrer Kanzlei

### Honorarvereinbarungen aktualisieren

Prüfen Sie bestehende Honorarvereinbarungen auf Anpassungsbedarf. Insbesondere bei Pauschalvereinbarungen sollten Sie die neuen Gebührensätze berücksichtigen und gegebenenfalls nachverhandeln.

### Mandantenkommunikation vorbereiten

Transparente Kommunikation ist entscheidend. Informieren Sie Ihre Mandanten proaktiv über Honoraranpassungen und erläutern Sie die Hintergründe. Ein persönliches Gespräch oder ein erklärendes Anschreiben schafft Verständnis.

### Kalkulationstools nutzen

Moderne Kalkulationstools wie unser StBVV-Rechner helfen Ihnen, die neuen Gebührensätze schnell und fehlerfrei umzusetzen. Die automatische Berechnung spart Zeit und minimiert Fehlerquellen.

## Fazit

Die StBVV 2025 bringt wichtige Anpassungen, die eine angemessene Vergütung für Steuerberater sicherstellen sollen. Nutzen Sie die erweiterten Möglichkeiten der Gebührengestaltung und kommunizieren Sie Änderungen transparent gegenüber Ihren Mandanten. Mit guter Vorbereitung und den richtigen Tools meistern Sie den Übergang problemlos.

*Tipp: Nutzen Sie unseren kostenlosen StBVV-Rechner, um Ihre Honorare nach den aktuellen Vorgaben zu kalkulieren.*
    `.trim(),
  },
  {
    id: '2',
    slug: 'gebuhren-richtig-kalkulieren',
    title: '7 häufige Fehler bei der Gebührenkalkulation – und wie Sie sie vermeiden',
    excerpt: 'Eine korrekte Gebührenkalkulation ist das Fundament einer wirtschaftlich gesunden Kanzlei. Wir zeigen die häufigsten Fehler und deren Lösungen.',
    date: '2024-12-15',
    readTime: '6 Min.',
    category: 'Praxis-Tipps',
    author: 'Redaktion',
    metaDescription: 'Vermeiden Sie diese 7 häufigen Fehler bei der StBVV-Gebührenkalkulation und sichern Sie Ihre Kanzleirentabilität.',
    content: `
## Einleitung

Die Gebührenkalkulation nach StBVV ist komplex – und genau deshalb schleichen sich immer wieder Fehler ein, die bares Geld kosten. In unserer Beratungspraxis begegnen uns regelmäßig dieselben Stolperfallen. Dieser Artikel zeigt Ihnen die sieben häufigsten Fehler und wie Sie diese vermeiden.

## Fehler 1: Falscher Gegenstandswert

Der Gegenstandswert ist die Berechnungsgrundlage für nahezu alle Gebühren nach StBVV. Ein häufiger Fehler ist die Verwendung veralteter oder falscher Werte.

**Lösung:** Aktualisieren Sie Gegenstandswerte regelmäßig, insbesondere bei:
- Jahresabschlüssen (Bilanzsumme des Vorjahres)
- Steuererklärungen (Summe der positiven Einkünfte)
- Erbschaftsteuer (Wert des Nachlasses)

## Fehler 2: Unterschätzung der Zeitgebühr

Viele Steuerberater scheuen sich, die tatsächlich aufgewendete Zeit vollständig zu berechnen. Das führt zu systematischer Unterdeckung.

**Lösung:** Führen Sie eine konsequente Zeiterfassung ein und kalkulieren Sie realistisch. Die Zeitgebühr beträgt 30 bis 75 EUR je angefangene halbe Stunde – nutzen Sie den Rahmen entsprechend der Komplexität.

## Fehler 3: Fehlende Auslagenberechnung

Auslagen für Porto, Telefon, Kopien und elektronische Kommunikation werden häufig vergessen oder zu niedrig angesetzt.

**Lösung:** Die StBVV erlaubt eine Pauschale von bis zu 20% der Gebühren, maximal 20 EUR. Bei höheren nachgewiesenen Auslagen können Sie auch den tatsächlichen Betrag berechnen.

## Fehler 4: Ignorieren von Erhöhungs- und Ermäßigungsfaktoren

Die Rahmengebühren erlauben Faktoren zwischen 0,1 und 10/10 (bzw. höher bei besonderer Schwierigkeit). Viele Kanzleien arbeiten standardmäßig mit Mittelfaktoren und verschenken damit Potential.

**Lösung:** Dokumentieren Sie die Faktoren, die eine höhere Gebühr rechtfertigen:
- Besondere Schwierigkeit (z.B. internationale Sachverhalte)
- Hohe Bedeutung für den Mandanten
- Zeitdruck und Sonderaufwand
- Überdurchschnittliches Haftungsrisiko

## Fehler 5: Keine schriftliche Honorarvereinbarung

Ohne schriftliche Vereinbarung gelten die Mittelgebühren. Bei aufwändigen Mandaten bedeutet das oft erhebliche Einbußen.

**Lösung:** Schließen Sie bei neuen Mandaten grundsätzlich eine schriftliche Honorarvereinbarung ab. Diese kann höhere Sätze, Pauschalen oder Stundensätze enthalten.

## Fehler 6: Veraltete Gebührentabellen

Nach Gesetzesänderungen arbeiten manche Kanzleien noch monatelang mit veralteten Tabellen. Das kann zu Unter- aber auch zu Überberechnung führen.

**Lösung:** Nutzen Sie digitale Tools, die automatisch aktualisiert werden. Unser StBVV-Rechner enthält stets die gültigen Tabellenwerte.

## Fehler 7: Mangelnde Dokumentation

Bei Nachfragen oder Streitigkeiten ist eine lückenlose Dokumentation Gold wert. Fehlende Aufzeichnungen erschweren die Durchsetzung berechtigter Honorare.

**Lösung:** Dokumentieren Sie:
- Auftragserteilung und -umfang
- Aufgewendete Zeiten
- Besondere Umstände und Schwierigkeiten
- Kommunikation mit dem Mandanten

## Fazit

Die meisten Gebührenfehler lassen sich durch systematische Prozesse und digitale Unterstützung vermeiden. Investieren Sie Zeit in saubere Kalkulation – sie zahlt sich unmittelbar in der Kanzleirentabilität aus.

*Nutzen Sie unseren StBVV-Rechner für eine schnelle und rechtssichere Gebührenberechnung.*
    `.trim(),
  },
  {
    id: '3',
    slug: 'digitalisierung-honorarberatung',
    title: 'Digitalisierung in der Honorarberatung: Chancen und Herausforderungen',
    excerpt: 'Die Digitalisierung verändert auch die Honorargestaltung in Steuerkanzleien grundlegend. Wir beleuchten Trends, Tools und Strategien.',
    date: '2024-11-28',
    readTime: '7 Min.',
    category: 'Digitalisierung',
    author: 'Redaktion',
    metaDescription: 'Digitalisierung in der Steuerberatung: Wie moderne Tools die Honorarberatung effizienter machen.',
    content: `
## Einleitung

Die Digitalisierung hat die Steuerberatung in den letzten Jahren grundlegend verändert. Von der elektronischen Belegübermittlung bis hin zu KI-gestützten Prüfungstools – kaum ein Bereich bleibt unberührt. Auch die Honorargestaltung und -kommunikation profitiert von digitalen Möglichkeiten. Dieser Artikel beleuchtet die wichtigsten Entwicklungen.

## Digitale Tools für die Gebührenkalkulation

### Online-Rechner und Kalkulationstools

Moderne Online-Tools ersetzen zunehmend manuelle Berechnungen und Excel-Tabellen. Die Vorteile liegen auf der Hand:

- **Aktualität:** Automatische Updates bei Gesetzesänderungen
- **Genauigkeit:** Minimierung von Rechenfehlern
- **Effizienz:** Schnelle Erstellung von Kostenvoranschlägen
- **Transparenz:** Nachvollziehbare Berechnungen für Mandanten

### Kanzleisoftware-Integration

Führende Kanzleisoftware-Anbieter integrieren StBVV-Berechnungen direkt in ihre Abrechnungsmodule. Dies ermöglicht durchgängige Prozesse von der Zeiterfassung bis zur Rechnungsstellung.

## Veränderte Mandantenerwartungen

Die Digitalisierung verändert auch die Erwartungen der Mandanten:

### Transparenz und Nachvollziehbarkeit

Mandanten erwarten heute detaillierte Aufschlüsselungen ihrer Rechnungen. Digitale Tools ermöglichen es, Gebührenberechnungen übersichtlich und verständlich darzustellen.

### Flexible Kommunikation

Die Honorarkommunikation verlagert sich zunehmend in digitale Kanäle. E-Mail-Versand von Kostenvoranschlägen, Online-Portale für Rechnungseinsicht und digitale Unterschriften für Honorarvereinbarungen werden zum Standard.

### Vergleichbarkeit

Das Internet ermöglicht Mandanten, Preise und Leistungen verschiedener Kanzleien zu vergleichen. Dies erhöht den Druck auf transparente und wettbewerbsfähige Honorargestaltung.

## Chancen der Digitalisierung

### Effizienzgewinne

Digitale Prozesse sparen Zeit bei der Gebührenkalkulation. Diese Zeit kann für wertschöpfende Beratung genutzt werden.

### Neue Abrechnungsmodelle

Die Digitalisierung ermöglicht innovative Abrechnungsmodelle:
- Subscription-Modelle für laufende Betreuung
- Value-based Pricing für Beratungsleistungen
- Hybride Modelle aus Pauschalen und Einzelabrechnung

### Verbesserte Dokumentation

Digitale Tools protokollieren automatisch alle Berechnungen und Änderungen. Dies erleichtert die Nachweisführung bei Rückfragen.

## Herausforderungen

### Technische Hürden

Nicht alle Kanzleien verfügen über die technische Infrastruktur für vollständig digitale Prozesse. Investitionen in Hardware, Software und Schulungen sind erforderlich.

### Datenschutz

Die digitale Verarbeitung von Mandantendaten erfordert ein robustes Datenschutzkonzept. DSGVO-Konformität ist zwingend.

### Akzeptanz

Sowohl Mitarbeiter als auch Mandanten müssen von digitalen Lösungen überzeugt werden. Change-Management ist ein kritischer Erfolgsfaktor.

## Praktische Empfehlungen

1. **Schrittweise Digitalisierung:** Beginnen Sie mit einzelnen Prozessen und erweitern Sie schrittweise
2. **Mitarbeiterschulung:** Investieren Sie in die digitale Kompetenz Ihres Teams
3. **Mandantenkommunikation:** Erklären Sie die Vorteile digitaler Prozesse
4. **Tool-Auswahl:** Wählen Sie spezialisierte Tools, die zu Ihrer Kanzlei passen

## Fazit

Die Digitalisierung der Honorarberatung ist keine Option, sondern eine Notwendigkeit. Kanzleien, die digitale Tools strategisch einsetzen, profitieren von Effizienzgewinnen, höherer Transparenz und zufriedeneren Mandanten. Der Schlüssel liegt in der durchdachten Implementierung und konsequenten Nutzung der verfügbaren Möglichkeiten.
    `.trim(),
  },
  {
    id: '4',
    slug: 'mandantengesprach-honorar',
    title: 'Das Mandantengespräch über Honorare: Tipps für eine erfolgreiche Kommunikation',
    excerpt: 'Honorargespräche sind für viele Steuerberater unangenehm. Mit der richtigen Strategie werden sie zum Erfolgsfaktor für Ihre Mandantenbeziehung.',
    date: '2024-11-10',
    readTime: '5 Min.',
    category: 'Mandantenkommunikation',
    author: 'Redaktion',
    metaDescription: 'Erfolgreiche Honorargespräche mit Mandanten: Strategien und Tipps für Steuerberater.',
    content: `
## Einleitung

Das Gespräch über Honorare gehört zu den anspruchsvollsten Aufgaben in der Mandantenbeziehung. Viele Steuerberater empfinden es als unangenehm, über Geld zu sprechen. Dabei ist transparente Honorarkommunikation ein wesentlicher Faktor für langfristige, vertrauensvolle Mandantenbeziehungen.

## Warum Honorargespräche wichtig sind

### Vermeidung von Missverständnissen

Unklare Erwartungen bezüglich der Kosten führen häufig zu Konflikten. Ein offenes Gespräch zu Beginn der Zusammenarbeit schafft Klarheit für beide Seiten.

### Wertschätzung der Leistung

Wer selbstbewusst über sein Honorar spricht, signalisiert Professionalität und Selbstwert. Mandanten respektieren Berater, die den Wert ihrer Arbeit kennen und kommunizieren.

### Wirtschaftlicher Erfolg

Kanzleien, die Honorare aktiv managen, sind wirtschaftlich erfolgreicher. Unterdeckte Mandate belasten die gesamte Kanzleirentabilität.

## Vorbereitung des Gesprächs

### Kalkulation erstellen

Erstellen Sie vor dem Gespräch eine fundierte Kalkulation. Nutzen Sie Tools wie unseren StBVV-Rechner, um verschiedene Szenarien durchzuspielen.

### Leistungsumfang definieren

Definieren Sie klar, welche Leistungen im Honorar enthalten sind – und welche nicht. Dies verhindert spätere Diskussionen über Zusatzaufwand.

### Argumentationshilfen vorbereiten

Überlegen Sie, welche Einwände der Mandant haben könnte und bereiten Sie entsprechende Argumente vor:
- Verweis auf gesetzliche Grundlagen (StBVV)
- Vergleich mit Marktpreisen
- Darstellung des konkreten Nutzens

## Gesprächsführung

### Der richtige Zeitpunkt

Sprechen Sie das Honorar möglichst früh an – idealerweise beim Erstgespräch oder bei Auftragserteilung. Vermeiden Sie Überraschungen nach erbrachter Leistung.

### Klare Sprache

Vermeiden Sie Fachjargon und erklären Sie die Gebührenstruktur in verständlichen Worten. "Die Gebühr richtet sich nach dem Gegenstandswert Ihrer Steuererklärung..." ist verständlicher als reine Paragraphen-Verweise.

### Aktives Zuhören

Geben Sie dem Mandanten Raum für Fragen und Bedenken. Aktives Zuhören signalisiert Wertschätzung und hilft, Einwände zu verstehen.

### Nutzenargumentation

Stellen Sie den Wert Ihrer Dienstleistung in den Vordergrund:
- Zeitersparnis für den Mandanten
- Steueroptimierung und Steuerersparnis
- Rechtssicherheit und Vermeidung von Fehlern
- Entlastung von bürokratischem Aufwand

## Umgang mit Einwänden

### "Das ist mir zu teuer"

Fragen Sie nach den konkreten Erwartungen. Oft liegt ein Missverständnis über den Leistungsumfang vor. Alternativ können Sie anbieten, den Leistungsumfang anzupassen.

### "Mein vorheriger Berater war günstiger"

Vergleichen Sie nicht nur Preise, sondern Leistungen. Fragen Sie, warum der Mandant gewechselt hat – oft liegt es an mangelnder Qualität oder Service.

### "Können Sie etwas am Preis machen?"

Rabatte ohne Gegenleistung entwerten Ihre Arbeit. Bieten Sie stattdessen angepasste Leistungspakete oder Zahlungsmodalitäten an.

## Nach dem Gespräch

### Schriftliche Bestätigung

Halten Sie das besprochene Honorar schriftlich fest. Eine Honorarvereinbarung schafft Verbindlichkeit für beide Seiten.

### Regelmäßige Überprüfung

Überprüfen Sie Honorarvereinbarungen regelmäßig und passen Sie diese bei verändertem Leistungsumfang an.

## Fazit

Erfolgreiche Honorarkommunikation ist erlernbar. Mit guter Vorbereitung, klarer Sprache und selbstbewusstem Auftreten werden Honorargespräche zum positiven Erlebnis für beide Seiten. Die Investition in professionelle Honorarkommunikation zahlt sich durch zufriedenere Mandanten und bessere Kanzleirentabilität aus.
    `.trim(),
  },
  {
    id: '5',
    slug: 'zeitgebuhr-vs-wertgebuhr',
    title: 'Zeitgebühr vs. Wertgebühr: Wann welche Abrechnungsart sinnvoll ist',
    excerpt: 'Die StBVV kennt verschiedene Gebührenarten. Wir erklären, wann Zeitgebühr und wann Wertgebühr die bessere Wahl ist.',
    date: '2024-10-22',
    readTime: '6 Min.',
    category: 'Recht & Gesetz',
    author: 'Redaktion',
    metaDescription: 'Zeitgebühr oder Wertgebühr? Ein Vergleich der Abrechnungsarten nach StBVV für Steuerberater.',
    content: `
## Einleitung

Die Steuerberatervergütungsverordnung (StBVV) bietet verschiedene Möglichkeiten der Gebührenberechnung. Die beiden wichtigsten sind die Wertgebühr und die Zeitgebühr. Beide haben ihre Berechtigung – die Kunst liegt in der richtigen Anwendung. Dieser Artikel hilft Ihnen bei der Entscheidung.

## Die Wertgebühr im Detail

### Definition

Die Wertgebühr bemisst sich nach dem Gegenstandswert der bearbeiteten Angelegenheit. Sie wird anhand der Gebührentabellen A bis D der StBVV berechnet.

### Typische Anwendungsfälle

- Einkommensteuererklärungen (§ 24 StBVV)
- Jahresabschlüsse und Bilanzen (§ 35 StBVV)
- Erbschaft- und Schenkungsteuer (§ 24 StBVV)
- Gewinnfeststellungen

### Vorteile

- **Planbarkeit:** Honorar lässt sich im Voraus kalkulieren
- **Standardisierung:** Vergleichbare Fälle führen zu vergleichbaren Honoraren
- **Akzeptanz:** Mandanten verstehen die Berechnung nach Steuerwert

### Nachteile

- **Aufwandsdiskrepanz:** Hoher Gegenstandswert bedeutet nicht automatisch hohen Aufwand
- **Komplexität unberücksichtigt:** Besondere Schwierigkeiten werden nur über den Gebührenrahmen erfasst

## Die Zeitgebühr im Detail

### Definition

Die Zeitgebühr wird nach dem tatsächlichen Zeitaufwand berechnet. Sie beträgt nach § 13 StBVV zwischen 30 und 75 EUR je angefangene halbe Stunde.

### Typische Anwendungsfälle

- Beratungsgespräche ohne Wertbezug
- Prüfung von Steuerbescheiden (§ 28 StBVV)
- Teilnahme an Betriebsprüfungen
- Sonstige Beratungsleistungen
- Schulungen und Einweisungen

### Vorteile

- **Aufwandsgerechtigkeit:** Abrechnung entspricht dem tatsächlichen Einsatz
- **Flexibilität:** Anwendbar bei schwer kalkulierbaren Tätigkeiten
- **Transparenz:** Mandant sieht genau, wofür er zahlt

### Nachteile

- **Schätzrisiko:** Vor Auftragserteilung schwer kalkulierbar
- **Dokumentationspflicht:** Erfordert lückenlose Zeiterfassung
- **Diskussionspotential:** Mandanten hinterfragen den Zeitaufwand

## Entscheidungshilfe: Wann welche Gebührenart?

### Wertgebühr bevorzugen bei:

- Standardisierten, wiederkehrenden Tätigkeiten
- Klar abgrenzbarem Leistungsumfang
- Hohen Gegenstandswerten mit moderatem Aufwand
- Mandantenwunsch nach Kostensicherheit

### Zeitgebühr bevorzugen bei:

- Beratungsintensiven Mandaten
- Unklarem oder variablem Aufwand
- Geringem Gegenstandswert bei hoher Komplexität
- Projektarbeit und Sondermandaten

## Kombination beider Gebührenarten

In der Praxis ist oft eine Kombination sinnvoll:

### Beispiel Jahresabschluss

- Wertgebühr für die Erstellung des Jahresabschlusses
- Zeitgebühr für darüber hinausgehende Beratungsgespräche
- Zeitgebühr für Abstimmung mit Banken oder Gesellschaftern

### Beispiel Steuererklärung mit Beratung

- Wertgebühr für die Einkommensteuererklärung
- Zeitgebühr für Erstberatung zur Steueroptimierung
- Zeitgebühr für Besprechung des Steuerbescheids

## Praktische Tipps

### Transparente Kommunikation

Erläutern Sie dem Mandanten, welche Gebührenart Sie anwenden und warum. Dies schafft Vertrauen und vermeidet Diskussionen.

### Schriftliche Vereinbarung

Bei Zeitgebühren empfiehlt sich eine vorherige schriftliche Vereinbarung mit Schätzung des Aufwands. So vermeiden Sie Überraschungen.

### Regelmäßige Überprüfung

Prüfen Sie bei Dauermandaten regelmäßig, ob die gewählte Gebührenart noch angemessen ist. Änderungen im Mandatsumfang können eine Anpassung erfordern.

### Dokumentation

Führen Sie bei Zeitgebühren eine genaue Zeiterfassung. Moderne Kanzleisoftware unterstützt dies effektiv.

## Fazit

Sowohl Zeit- als auch Wertgebühr haben ihre Berechtigung in der Steuerberatung. Die richtige Wahl hängt von Art und Umfang der Tätigkeit, dem Gegenstandswert und den individuellen Mandantenanforderungen ab. Häufig ist eine Kombination beider Gebührenarten der beste Weg zu einer fairen und wirtschaftlich sinnvollen Vergütung.

*Nutzen Sie unseren StBVV-Rechner, um beide Gebührenarten schnell und korrekt zu berechnen.*
    `.trim(),
  },
];

/**
 * Findet einen Artikel anhand des Slugs
 */
export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.slug === slug);
};

/**
 * Gibt alle Artikel einer Kategorie zurück
 */
export const getArticlesByCategory = (category: string): BlogArticle[] => {
  return blogArticles.filter(article => article.category === category);
};

/**
 * Gibt verwandte Artikel zurück (gleiche Kategorie, ohne aktuellen Artikel)
 */
export const getRelatedArticles = (currentSlug: string, limit = 3): BlogArticle[] => {
  const currentArticle = getArticleBySlug(currentSlug);
  if (!currentArticle) return blogArticles.slice(0, limit);
  
  return blogArticles
    .filter(article => article.slug !== currentSlug)
    .sort((a, b) => (a.category === currentArticle.category ? -1 : 1) - (b.category === currentArticle.category ? -1 : 1))
    .slice(0, limit);
};
