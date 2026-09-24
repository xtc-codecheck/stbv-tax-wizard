/**
 * Inhalte für die SEO-Landingpages (Tabellen und Kostenseiten)
 * @module data/landingContent
 */

export type TableLetter = 'A' | 'B' | 'C' | 'D';

export interface TableLandingContent {
  letter: TableLetter;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  legalBasis: string;
  usage: string[];
  notes: string[];
  faq: { question: string; answer: string }[];
}

export const TABLE_LANDINGS: Record<TableLetter, TableLandingContent> = {
  A: {
    letter: 'A',
    path: '/stbvv-tabelle-a',
    title: 'StBVV Tabelle A – Beratungstabelle',
    metaTitle: 'StBVV Tabelle A Rechner – Beratungstabelle mit allen Werten',
    metaDescription:
      'StBVV Tabelle A (Beratungstabelle) mit allen Gegenstandswerten und vollen Gebühren. Direkt online berechnen – Zehntelsätze, Auslagen und PDF inklusive.',
    intro:
      'Tabelle A ist die Beratungstabelle der Steuerberatervergütungsverordnung. Sie gilt für die klassischen Beratungs- und Erklärungstätigkeiten und bildet die Grundlage für die meisten Wertgebühren einer Kanzlei.',
    legalBasis: 'Anlage 1 zu § 10 Abs. 1 StBVV',
    usage: [
      'Steuererklärungen nach §§ 24 ff. StBVV (z. B. Einkommensteuer, Umsatzsteuer, Gewerbesteuer)',
      'Rechtsbehelfsverfahren nach § 40 StBVV',
      'Sonstige Einzeltätigkeiten mit Gegenstandswert',
    ],
    notes: [
      'Die Gebühr wird als Zehntelsatz der vollen Gebühr angesetzt; der Rahmen ergibt sich aus dem jeweiligen Gebührentatbestand.',
      'Bei fehlenden Anhaltspunkten ist regelmäßig die Mittelgebühr anzusetzen.',
      'Oberhalb der letzten Tabellenstufe gilt die gesetzliche Degression für Mehrbeträge.',
    ],
    faq: [
      {
        question: 'Wofür gilt die StBVV Tabelle A?',
        answer:
          'Tabelle A ist die Beratungstabelle und gilt für Beratungsleistungen, Steuererklärungen und Rechtsbehelfsverfahren, soweit ein Gegenstandswert maßgeblich ist.',
      },
      {
        question: 'Wie wird die Gebühr nach Tabelle A berechnet?',
        answer:
          'Zum Gegenstandswert wird die volle Gebühr aus Tabelle A abgelesen und mit dem Zehntelsatz des jeweiligen Gebührentatbestands multipliziert. Dazu kommen Auslagen und Umsatzsteuer.',
      },
    ],
  },
  B: {
    letter: 'B',
    path: '/stbvv-tabelle-b',
    title: 'StBVV Tabelle B – Abschlusstabelle',
    metaTitle: 'StBVV Tabelle B Rechner – Abschlusstabelle für Jahresabschluss und EÜR',
    metaDescription:
      'StBVV Tabelle B (Abschlusstabelle) mit allen Werten für Jahresabschluss, Bilanz und Einnahmenüberschussrechnung. Gebühren online berechnen.',
    intro:
      'Tabelle B ist die Abschlusstabelle. Sie gilt für die Erstellung von Jahresabschlüssen, Bilanzen und Einnahmenüberschussrechnungen und ist damit die wichtigste Tabelle für das Abschlussgeschäft einer Kanzlei.',
    legalBasis: 'Anlage 2 zu § 10 Abs. 1 StBVV',
    usage: [
      'Jahresabschluss (Bilanz mit Gewinn- und Verlustrechnung) nach § 35 Abs. 1 Nr. 1 StBVV',
      'Einnahmenüberschussrechnung nach § 25 Abs. 1 StBVV',
      'Überleitungsrechnung, Anhang und Lagebericht nach § 35 StBVV',
    ],
    notes: [
      'Für die Einnahmenüberschussrechnung gilt ein Mindestgegenstandswert von 17.500 Euro.',
      'Gegenstandswert ist in der Regel das Mittel aus berichtigter Bilanzsumme und betrieblichem Jahresertrag.',
      'Die Zehntelsätze der einzelnen Abschlussarbeiten unterscheiden sich deutlich – der Rechner setzt jeweils die Mitte des Rahmens vor.',
    ],
    faq: [
      {
        question: 'Wann gilt die StBVV Tabelle B?',
        answer:
          'Tabelle B gilt für Abschlussarbeiten, also insbesondere für Jahresabschluss, Bilanz, Anhang, Lagebericht und Einnahmenüberschussrechnung.',
      },
      {
        question: 'Welcher Mindestgegenstandswert gilt bei der EÜR?',
        answer:
          'Für die Einnahmenüberschussrechnung beträgt der Mindestgegenstandswert 17.500 Euro.',
      },
    ],
  },
  C: {
    letter: 'C',
    path: '/stbvv-tabelle-c',
    title: 'StBVV Tabelle C – Buchführungstabelle',
    metaTitle: 'StBVV Tabelle C Rechner – Buchführungstabelle (monatliche Gebühr)',
    metaDescription:
      'StBVV Tabelle C (Buchführungstabelle) mit allen Werten für laufende Finanzbuchführung. Monatsgebühr nach Jahresumsatz online berechnen.',
    intro:
      'Tabelle C ist die Buchführungstabelle. Sie gilt für die laufende Finanzbuchführung und wird je Monat abgerechnet. Gegenstandswert ist in der Regel der Jahresumsatz oder der höhere Jahresaufwand.',
    legalBasis: 'Anlage 3 zu § 10 Abs. 1 StBVV',
    usage: [
      'Laufende Buchführung nach § 33 Abs. 1 StBVV',
      'Kontieren der Belege, Buchführung nach vorgegebener Kontierung',
      'Elektronische Übermittlung der Umsatzsteuer-Voranmeldung nach § 35 Abs. 1 StBVV',
    ],
    notes: [
      'Die Gebühr nach Tabelle C fällt monatlich an – im Rechner über die Menge abbildbar.',
      'Gegenstandswert ist der Jahresumsatz oder der höhere Jahresaufwand.',
      'Für vorbereitende Arbeiten und Kontieren gelten eigene, niedrigere Rahmen.',
    ],
    faq: [
      {
        question: 'Wie oft fällt die Gebühr nach Tabelle C an?',
        answer:
          'Die Buchführungsgebühr nach Tabelle C ist eine Monatsgebühr. Für ein volles Jahr wird sie zwölfmal angesetzt.',
      },
      {
        question: 'Was ist der Gegenstandswert bei der Buchführung?',
        answer:
          'Gegenstandswert ist der Jahresumsatz oder der höhere Jahresaufwand des Betriebs.',
      },
    ],
  },
  D: {
    letter: 'D',
    path: '/stbvv-tabelle-d',
    title: 'StBVV Tabelle D – Landwirtschaftliche Betriebe',
    metaTitle: 'StBVV Tabelle D Rechner – Land- und Forstwirtschaft (Teil a und b)',
    metaDescription:
      'StBVV Tabelle D für land- und forstwirtschaftliche Betriebe: Teil a nach Betriebsfläche, Teil b nach Jahresumsatz. Gebühren online berechnen.',
    intro:
      'Tabelle D gilt für land- und forstwirtschaftliche Betriebe. Teil a richtet sich nach der Betriebsfläche in Hektar, Teil b nach dem Jahresumsatz der Nebenbetriebe und Sonderkulturen. Beide Teile werden zusammengerechnet.',
    legalBasis: 'Anlage 4 zu § 10 Abs. 1 StBVV, § 39 StBVV',
    usage: [
      'Abschlussarbeiten für land- und forstwirtschaftliche Betriebe nach § 39 StBVV',
      'Betriebe mit Nebenbetrieben oder Sonderkulturen (Teil b)',
    ],
    notes: [
      'Der Rechner erfasst Betriebsfläche und Jahresumsatz getrennt und addiert beide Teilgebühren.',
      'Ohne Nebenbetrieb bleibt Teil b unberücksichtigt.',
    ],
    faq: [
      {
        question: 'Was ist der Unterschied zwischen Teil a und Teil b der Tabelle D?',
        answer:
          'Teil a bemisst die Gebühr nach der Betriebsfläche in Hektar, Teil b zusätzlich nach dem Jahresumsatz aus Nebenbetrieben und Sonderkulturen.',
      },
    ],
  },
};

export interface CostLandingContent {
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  legalBasis: string;
  /** Beispielhafte Orientierungswerte */
  sections: { heading: string; text: string }[];
  bullets: string[];
  faq: { question: string; answer: string }[];
}

export const COST_LANDINGS: Record<string, CostLandingContent> = {
  '/steuerberaterkosten': {
    path: '/steuerberaterkosten',
    title: 'Was kostet ein Steuerberater?',
    metaTitle: 'Was kostet ein Steuerberater? Kosten nach StBVV berechnen',
    metaDescription:
      'Steuerberaterkosten verstehen und berechnen: Gegenstandswert, Zehntelsatz, Zeitgebühr und Auslagen nach StBVV – mit kostenlosem Rechner.',
    intro:
      'Steuerberaterhonorare sind nicht frei kalkuliert, sondern folgen der Steuerberatervergütungsverordnung (StBVV). Der Preis ergibt sich aus drei Bausteinen: dem Gegenstandswert, dem Zehntelsatz innerhalb des gesetzlichen Rahmens und der passenden Gebührentabelle.',
    legalBasis: '§§ 10, 11, 13 StBVV',
    sections: [
      {
        heading: 'Wertgebühr: Gegenstandswert mal Zehntelsatz',
        text:
          'Bei den meisten Leistungen bemisst sich die Gebühr nach dem Gegenstandswert, etwa der Summe der Einnahmen oder der Bilanzsumme. Zum Gegenstandswert gehört eine volle Gebühr aus der jeweiligen Tabelle. Davon wird ein Zehntelsatz angesetzt, der im Gesetz als Rahmen vorgegeben ist – zum Beispiel 1/10 bis 6/10 für die Einkommensteuererklärung.',
      },
      {
        heading: 'Zeitgebühr: nach Aufwand',
        text:
          'Wo kein Gegenstandswert bestimmbar ist, gilt die Zeitgebühr nach § 13 StBVV: 16,50 bis 41,00 Euro je angefangene 15 Minuten. Das entspricht 66 bis 164 Euro je Stunde, üblich sind 115 Euro.',
      },
      {
        heading: 'Auslagen und Umsatzsteuer',
        text:
          'Zur Gebühr kommen Post- und Telekommunikationsentgelte (20 Prozent der Gebühr, höchstens 20 Euro) sowie 19 Prozent Umsatzsteuer.',
      },
    ],
    bullets: [
      'Erstberatung: Gebühr höchstens 190 Euro (§ 21 Abs. 1 StBVV)',
      'Einkommensteuererklärung: 1/10 bis 6/10 nach Tabelle A',
      'Einnahmenüberschussrechnung: 5/10 bis 30/10 nach Tabelle B, Mindestwert 17.500 Euro',
      'Laufende Buchführung: 2/10 bis 12/10 nach Tabelle C, je Monat',
      'Lohnabrechnung: 5 bis 28 Euro je Arbeitnehmer und Monat',
    ],
    faq: [
      {
        question: 'Darf ein Steuerberater frei über sein Honorar entscheiden?',
        answer:
          'Nein. Die StBVV gibt Rahmen vor. Innerhalb dieser Rahmen entscheidet der Steuerberater nach Umfang, Schwierigkeit, Bedeutung der Sache und Haftungsrisiko.',
      },
      {
        question: 'Was kostet eine Erstberatung?',
        answer:
          'Für ein erstes Beratungsgespräch mit Verbrauchern darf höchstens 190 Euro zuzüglich Auslagen und Umsatzsteuer berechnet werden.',
      },
      {
        question: 'Was ist die Mittelgebühr?',
        answer:
          'Die Mittelgebühr ist die Mitte des gesetzlichen Rahmens. Sie gilt als angemessen, wenn Umfang und Schwierigkeit durchschnittlich sind.',
      },
    ],
  },
  '/jahresabschluss-kosten': {
    path: '/jahresabschluss-kosten',
    title: 'Jahresabschluss: Kosten beim Steuerberater',
    metaTitle: 'Jahresabschluss Kosten Steuerberater – nach StBVV berechnen',
    metaDescription:
      'Was kostet der Jahresabschluss beim Steuerberater? Gegenstandswert, Zehntelsätze nach Tabelle B und Beispielrechnung – jetzt kostenlos berechnen.',
    intro:
      'Der Jahresabschluss wird nach § 35 StBVV abgerechnet. Grundlage ist Tabelle B und ein Gegenstandswert, der sich im Regelfall aus dem Mittel von berichtigter Bilanzsumme und betrieblichem Jahresertrag ergibt.',
    legalBasis: '§ 35 StBVV, Tabelle B',
    sections: [
      {
        heading: 'Die einzelnen Positionen',
        text:
          'Ein vollständiger Abschluss besteht aus mehreren Gebührentatbeständen: Bilanz mit Gewinn- und Verlustrechnung, Anhang, Lagebericht, Überleitungsrechnung und die Entwicklung des Anlagevermögens. Jede Position hat einen eigenen Zehntelrahmen.',
      },
      {
        heading: 'Gegenstandswert richtig bestimmen',
        text:
          'Berichtigte Bilanzsumme und betrieblicher Jahresertrag werden addiert und halbiert. Der Jahresertrag wird dabei mit mindestens dem Betrag der Bilanzsumme angesetzt, wenn er höher ist.',
      },
    ],
    bullets: [
      'Bilanz mit Gewinn- und Verlustrechnung: 10/10 bis 40/10 nach Tabelle B',
      'Anhang: 2/10 bis 12/10',
      'Lagebericht: 2/10 bis 12/10',
      'Überleitungsrechnung Handelsbilanz: 2/10 bis 15/10',
      'Dazu Auslagen und 19 Prozent Umsatzsteuer',
    ],
    faq: [
      {
        question: 'Wie hoch sind die Kosten für einen Jahresabschluss?',
        answer:
          'Die Kosten hängen vom Gegenstandswert und dem angesetzten Zehntelsatz ab. Bei mittlerem Zehntelsatz und einem Gegenstandswert von 250.000 Euro liegt allein die Bilanz im vierstelligen Bereich. Der Rechner ermittelt den genauen Betrag.',
      },
    ],
  },
  '/einkommensteuererklaerung-kosten': {
    path: '/einkommensteuererklaerung-kosten',
    title: 'Einkommensteuererklärung: Kosten beim Steuerberater',
    metaTitle: 'Einkommensteuererklärung Kosten Steuerberater – StBVV Rechner',
    metaDescription:
      'Kosten der Einkommensteuererklärung nach § 24 StBVV: Gegenstandswerte je Anlage, Zehntelsätze und Mindestwerte – kostenlos berechnen.',
    intro:
      'Die Einkommensteuererklärung wird nach § 24 Abs. 1 StBVV abgerechnet. Jede Anlage hat einen eigenen Gegenstandswert und einen eigenen Rahmen – die Gebühren werden addiert.',
    legalBasis: '§ 24 Abs. 1, § 27 StBVV, Tabelle A',
    sections: [
      {
        heading: 'Grundlage: Summe der Einkünfte',
        text:
          'Für die Erklärung selbst ist der Gegenstandswert die Summe der positiven Einkünfte, mindestens jedoch 8.000 Euro. Der Rahmen beträgt 1/10 bis 6/10 nach Tabelle A.',
      },
      {
        heading: 'Anlagen mit eigenem Gegenstandswert',
        text:
          'Anlage V (Vermietung), Anlage KAP (Kapitalerträge) und weitere Überschussermittlungen werden nach § 27 StBVV gesondert abgerechnet – mit einem Zwanzigstelsatz und eigenen Mindestgegenstandswerten.',
      },
    ],
    bullets: [
      'Einkommensteuererklärung: 1/10 bis 6/10, Mindestwert 8.000 Euro',
      'Anlage KAP: 1/20 bis 12/20, Mindestgegenstandswert 8.000 Euro',
      'Anlage V je Objekt: 1/20 bis 12/20, Mindestgegenstandswert 8.000 Euro',
      'Prüfung des Steuerbescheids: Zeitgebühr nach § 28 StBVV',
    ],
    faq: [
      {
        question: 'Was kostet eine Einkommensteuererklärung beim Steuerberater?',
        answer:
          'Die Gebühr richtet sich nach der Summe der positiven Einkünfte und dem Zehntelsatz. Zusätzliche Anlagen wie Vermietung oder Kapitalerträge werden gesondert berechnet.',
      },
      {
        question: 'Welcher Mindestgegenstandswert gilt bei der Anlage KAP?',
        answer:
          'Für Überschusseinkünfte nach § 27 StBVV – dazu zählt die Anlage KAP – gilt ein Mindestgegenstandswert von 8.000 Euro.',
      },
    ],
  },
  '/euer-kosten': {
    path: '/euer-kosten',
    title: 'EÜR: Kosten der Einnahmenüberschussrechnung',
    metaTitle: 'EÜR Kosten Steuerberater – Einnahmenüberschussrechnung berechnen',
    metaDescription:
      'Einnahmenüberschussrechnung nach § 25 StBVV: Gegenstandswert, Rahmen 5/10 bis 30/10 nach Tabelle B und Mindestwert 17.500 Euro – jetzt berechnen.',
    intro:
      'Die Einnahmenüberschussrechnung wird nach § 25 Abs. 1 StBVV abgerechnet. Grundlage ist Tabelle B, der Rahmen reicht von 5/10 bis 30/10.',
    legalBasis: '§ 25 Abs. 1 StBVV, Tabelle B',
    sections: [
      {
        heading: 'Gegenstandswert',
        text:
          'Gegenstandswert ist der höhere Betrag aus Betriebseinnahmen und Betriebsausgaben, mindestens jedoch 17.500 Euro.',
      },
      {
        heading: 'Typischer Ansatz',
        text:
          'Ohne besondere Umstände ist die Mitte des Rahmens – 17,5/10 – der übliche Ansatz. Höhere Sätze sind bei erhöhtem Aufwand oder besonderer Schwierigkeit begründbar.',
      },
    ],
    bullets: [
      'Rahmen: 5/10 bis 30/10 nach Tabelle B',
      'Mittelgebühr: 17,5/10',
      'Mindestgegenstandswert: 17.500 Euro',
      'Zusätzlich: Auslagen und 19 Prozent Umsatzsteuer',
    ],
    faq: [
      {
        question: 'Wie hoch ist der Mindestgegenstandswert bei der EÜR?',
        answer: 'Der Mindestgegenstandswert beträgt 17.500 Euro.',
      },
    ],
  },
  '/zeitgebuehr': {
    path: '/zeitgebuehr',
    title: 'Zeitgebühr nach § 13 StBVV',
    metaTitle: 'Zeitgebühr StBVV – Stundensatz Steuerberater berechnen',
    metaDescription:
      'Zeitgebühr nach § 13 StBVV: 16,50 bis 41,00 Euro je angefangene 15 Minuten, also 66 bis 164 Euro je Stunde. Jetzt Honorar berechnen.',
    intro:
      'Die Zeitgebühr gilt, wenn die StBVV sie ausdrücklich vorsieht oder kein Gegenstandswert bestimmbar ist. Sie wird nach angefangenen 15 Minuten abgerechnet.',
    legalBasis: '§ 13 StBVV',
    sections: [
      {
        heading: 'Der Rahmen',
        text:
          'Je angefangene halbe Stunde sieht die Verordnung einen Rahmen vor; umgerechnet auf 15 Minuten sind das 16,50 bis 41,00 Euro. Das ergibt einen Stundensatz von 66 bis 164 Euro. Der Rechner verwendet 115 Euro als üblichen Mittelwert.',
      },
      {
        heading: 'Wann die Zeitgebühr gilt',
        text:
          'Typische Fälle sind die Prüfung eines Steuerbescheids, die Teilnahme an einer Betriebsprüfung, Selbstanzeigen und Tätigkeiten ohne bestimmbaren Gegenstandswert.',
      },
    ],
    bullets: [
      'Mindestens 16,50 Euro je angefangene 15 Minuten',
      'Höchstens 41,00 Euro je angefangene 15 Minuten',
      'Üblicher Stundensatz im Rechner: 115 Euro',
      'Aufzeichnung der Zeiten ist Voraussetzung für die Abrechnung',
    ],
    faq: [
      {
        question: 'Wie hoch ist der Stundensatz eines Steuerberaters?',
        answer:
          'Nach § 13 StBVV liegt der Stundensatz zwischen 66 und 164 Euro. Üblich sind rund 115 Euro je Stunde.',
      },
    ],
  },
  '/steuerberatungskosten-absetzen': {
    path: '/steuerberatungskosten-absetzen',
    title: 'Steuerberatungskosten absetzen',
    metaTitle: 'Steuerberatungskosten absetzen – was ist steuerlich abziehbar?',
    metaDescription:
      'Welche Steuerberaterkosten sind absetzbar? Betriebsausgaben, Werbungskosten, private Anteile und wo Sie die Kosten eintragen – verständlich erklärt.',
    intro:
      'Steuerberatungskosten sind nur teilweise absetzbar. Entscheidend ist, ob sie mit Einkünften zusammenhängen (Betriebsausgaben oder Werbungskosten) oder die private Steuererklärung betreffen.',
    legalBasis: '§ 4 Abs. 4, § 9 Abs. 1 EStG; BMF-Schreiben vom 21.12.2007',
    sections: [
      {
        heading: 'Voll absetzbar: Kosten mit Bezug zu Einkünften',
        text:
          'Kosten für Buchführung, Jahresabschluss, EÜR, Gewerbe- und Umsatzsteuererklärung sind Betriebsausgaben. Die Anteile für Anlage N, V oder KAP-nahe Überschussermittlungen gelten als Werbungskosten.',
      },
      {
        heading: 'Nicht absetzbar: der private Teil',
        text:
          'Kosten für den Mantelbogen, Sonderausgaben, außergewöhnliche Belastungen oder haushaltsnahe Dienstleistungen sind seit 2006 privat veranlasst und nicht abziehbar. Eine Rechnung nach StBVV mit getrennten Positionen macht die Aufteilung einfach.',
      },
      {
        heading: 'Aufteilung bei gemischten Kosten',
        text:
          'Lassen sich Kosten nicht eindeutig zuordnen, dürfen Beträge bis 100 Euro im Jahr nach Wahl den Betriebsausgaben oder Werbungskosten zugeordnet werden. Darüber ist eine sachgerechte Aufteilung nötig.',
      },
    ],
    bullets: [
      'Betriebsausgaben: Buchführung, Abschluss, EÜR, betriebliche Steuererklärungen',
      'Werbungskosten: Anlage N, Anlage V und weitere Einkunftsanlagen',
      'Nicht abziehbar: Mantelbogen, Sonderausgaben, außergewöhnliche Belastungen',
      'Vereinfachung: gemischte Kosten bis 100 Euro frei zuordenbar',
    ],
    faq: [
      {
        question: 'Kann ich die Kosten für meinen Steuerberater absetzen?',
        answer:
          'Ja, soweit die Kosten auf betriebliche Tätigkeiten oder die Ermittlung von Einkünften entfallen. Der private Teil, etwa für Sonderausgaben, ist nicht abziehbar.',
      },
      {
        question: 'Wo trage ich die Steuerberaterkosten ein?',
        answer:
          'Betriebliche Kosten gehören in die EÜR oder die Gewinnermittlung, Werbungskosten in die jeweilige Anlage (zum Beispiel Anlage N oder Anlage V).',
      },
      {
        question: 'Sind Steuerberaterkosten für Arbeitnehmer absetzbar?',
        answer:
          'Der Anteil für die Anlage N ist als Werbungskosten absetzbar. Wird der Arbeitnehmer-Pauschbetrag von 1.230 Euro nicht überschritten, wirkt sich das allerdings nicht aus.',
      },
    ],
  },
  '/buchhaltung-kosten': {
    path: '/buchhaltung-kosten',
    title: 'Buchhaltung beim Steuerberater: Kosten',
    metaTitle: 'Buchhaltung Steuerberater Kosten – Buchführung nach § 33 StBVV',
    metaDescription:
      'Was kostet die Buchhaltung beim Steuerberater? Laufende Buchführung nach § 33 StBVV, Tabelle D, Gegenstandswert und Beispiel – kostenlos berechnen.',
    intro:
      'Die laufende Finanzbuchhaltung wird nach § 33 StBVV abgerechnet. Grundlage ist Tabelle D, der Gegenstandswert richtet sich nach dem Jahresumsatz oder dem höheren Aufwand.',
    legalBasis: '§ 33 StBVV, Tabelle D',
    sections: [
      {
        heading: 'Monatliche Gebühr',
        text:
          'Die Gebühr für die laufende Buchführung wird als Monatsgebühr berechnet. Der Zehntelrahmen hängt davon ab, ob der Steuerberater nur kontiert oder die komplette Buchführung übernimmt.',
      },
      {
        heading: 'Gegenstandswert',
        text:
          'Maßgeblich ist der Jahresumsatz oder die Summe des Aufwands, je nachdem, welcher Betrag höher ist. Der Rechner übernimmt die passende Stufe aus Tabelle D automatisch.',
      },
    ],
    bullets: [
      'Abrechnung als Monatsgebühr nach Tabelle D',
      'Gegenstandswert: Jahresumsatz oder höherer Aufwand',
      'Zusätzlich möglich: Einrichtung der Buchführung und Kontierung',
      'Dazu Auslagen und 19 Prozent Umsatzsteuer',
    ],
    faq: [
      {
        question: 'Was kostet die Buchhaltung beim Steuerberater im Monat?',
        answer:
          'Das hängt vom Jahresumsatz und vom angesetzten Zehntelsatz ab. Kleine Betriebe liegen oft im niedrigen dreistelligen Bereich pro Monat. Der Rechner zeigt den genauen Betrag.',
      },
      {
        question: 'Kann ich Kosten sparen, wenn ich selbst vorkontiere?',
        answer:
          'Ja. Übernehmen Sie die Kontierung selbst, fällt ein niedrigerer Zehntelsatz an als bei der vollständigen Buchführung durch die Kanzlei.',
      },
    ],
  },
  '/lohnbuchhaltung-kosten': {
    path: '/lohnbuchhaltung-kosten',
    title: 'Lohnabrechnung beim Steuerberater: Kosten',
    metaTitle: 'Lohnabrechnung Kosten Steuerberater – Lohnbuchhaltung nach § 34 StBVV',
    metaDescription:
      'Was kostet die Lohnabrechnung beim Steuerberater? Gebühr je Arbeitnehmer und Monat nach § 34 StBVV, Zusatzleistungen und Beispiel – jetzt berechnen.',
    intro:
      'Lohn- und Gehaltsabrechnungen werden nach § 34 StBVV je Arbeitnehmer und Abrechnungszeitraum berechnet. Die Gebühr ist ein fester Betragsrahmen, unabhängig vom Gehalt.',
    legalBasis: '§ 34 StBVV',
    sections: [
      {
        heading: 'Gebühr je Arbeitnehmer',
        text:
          'Für jede Abrechnung eines Arbeitnehmers fällt ein Betrag aus dem gesetzlichen Rahmen an. Der Rechner verwendet 12 Euro je Arbeitnehmer und Monat als praxisüblichen Ansatz.',
      },
      {
        heading: 'Zusatzleistungen',
        text:
          'Einrichtung eines Lohnkontos, Lohnsteuer-Anmeldung und Sonderfälle werden gesondert berechnet. Beratungen zum Lohn sind nicht enthalten.',
      },
    ],
    bullets: [
      'Abrechnung je Arbeitnehmer und Monat',
      'Praxisansatz im Rechner: 12 Euro je Arbeitnehmer',
      'Einrichtung Lohnkonto und Anmeldungen gesondert',
      'Dazu Auslagen und 19 Prozent Umsatzsteuer',
    ],
    faq: [
      {
        question: 'Was kostet eine Lohnabrechnung beim Steuerberater?',
        answer:
          'Die Gebühr richtet sich nach § 34 StBVV und wird je Arbeitnehmer und Monat berechnet – unabhängig von der Gehaltshöhe.',
      },
      {
        question: 'Was kostet die Lohnabrechnung für einen Minijobber?',
        answer:
          'Grundsätzlich gilt derselbe Rahmen je Abrechnung wie für andere Arbeitnehmer; der Aufwand ist meist geringer, daher wird oft ein niedrigerer Betrag angesetzt.',
      },
    ],
  },
  '/erstberatung-kosten': {
    path: '/erstberatung-kosten',
    title: 'Erstberatung beim Steuerberater: Kosten',
    metaTitle: 'Erstberatung Steuerberater Kosten – höchstens 190 Euro (§ 21 StBVV)',
    metaDescription:
      'Was kostet die Erstberatung beim Steuerberater? Für Verbraucher höchstens 190 Euro nach § 21 StBVV – plus Auslagen und Umsatzsteuer.',
    intro:
      'Für ein erstes Beratungsgespräch mit einem Verbraucher darf der Steuerberater nach § 21 Abs. 1 StBVV höchstens 190 Euro berechnen, zuzüglich Auslagen und Umsatzsteuer.',
    legalBasis: '§ 21 Abs. 1 StBVV',
    sections: [
      {
        heading: 'Was als Erstberatung gilt',
        text:
          'Erstberatung ist ein erstes, pauschales Gespräch zur Einschätzung der Lage. Folgen weitere Tätigkeiten, gelten die normalen Gebühren nach Gegenstandswert oder Zeit.',
      },
      {
        heading: 'Nur für Verbraucher',
        text:
          'Die Kappung auf 190 Euro gilt nur für Verbraucher. Für Unternehmen wird eine Beratung nach § 21 StBVV mit 1/10 bis 10/10 nach Tabelle A oder nach Zeit berechnet.',
      },
    ],
    bullets: [
      'Höchstbetrag: 190 Euro netto',
      'Gilt nur für Verbraucher',
      'Dazu Auslagen und 19 Prozent Umsatzsteuer',
      'Maximal brutto rund 250 Euro inklusive Auslagen',
    ],
    faq: [
      {
        question: 'Ist die Erstberatung beim Steuerberater kostenlos?',
        answer:
          'Nicht automatisch. Viele Kanzleien bieten ein kostenloses Kennenlerngespräch an, gesetzlich dürfen für eine Erstberatung aber bis zu 190 Euro netto berechnet werden.',
      },
      {
        question: 'Was darf ein Beratungsgespräch beim Steuerberater kosten?',
        answer:
          'Für Verbraucher beim ersten Gespräch höchstens 190 Euro netto. Weitere Beratungen werden nach Gegenstandswert (Tabelle A) oder nach Zeitgebühr abgerechnet.',
      },
    ],
  },
  '/steuerberaterverguetungsverordnung': {
    path: '/steuerberaterverguetungsverordnung',
    title: 'Steuerberatervergütungsverordnung (StBVV) einfach erklärt',
    metaTitle: 'Steuerberatervergütungsverordnung (StBVV) 2026 – einfach erklärt',
    metaDescription:
      'Die StBVV einfach erklärt: Aufbau, Tabellen A bis D, Wertgebühr, Zeitgebühr, Mittelgebühr und aktueller Rechtsstand – mit kostenlosem Rechner.',
    intro:
      'Die Steuerberatervergütungsverordnung (StBVV) regelt, wie Steuerberater ihre Leistungen abrechnen. Sie gibt Gebührenrahmen vor, innerhalb derer die konkrete Gebühr bestimmt wird.',
    legalBasis: 'StBVV, zuletzt geändert durch BGBl. 2025 I Nr. 372',
    sections: [
      {
        heading: 'Aufbau der Verordnung',
        text:
          'Die StBVV enthält allgemeine Regeln (§§ 1–16), Gebühren für einzelne Tätigkeiten wie Steuererklärungen, Buchführung und Abschlüsse (§§ 21–39) sowie Regeln für Rechtsbehelfs- und Gerichtsverfahren (§§ 40 ff.).',
      },
      {
        heading: 'Wertgebühr, Zeitgebühr, Pauschale',
        text:
          'Meist gilt die Wertgebühr: volle Gebühr aus einer der Tabellen A bis D mal Zehntelsatz. Wo kein Gegenstandswert bestimmbar ist, gilt die Zeitgebühr. Pauschalvereinbarungen sind nach § 14 StBVV schriftlich möglich.',
      },
      {
        heading: 'Die vier Tabellen',
        text:
          'Tabelle A (Beratung), Tabelle B (Abschlüsse), Tabelle C (Buchführung) und Tabelle D (Landwirtschaft). Jede Tabelle ordnet dem Gegenstandswert eine volle Gebühr zu.',
      },
    ],
    bullets: [
      'Gilt für alle Steuerberater in Deutschland',
      'Gebührenrahmen statt Festpreise',
      'Mittelgebühr als Regelansatz bei durchschnittlichen Fällen',
      'Vergütungsvereinbarung nach § 4 StBVV möglich',
    ],
    faq: [
      {
        question: 'Was ist die StBVV?',
        answer:
          'Die Steuerberatervergütungsverordnung ist die gesetzliche Gebührenordnung für Steuerberater. Sie legt fest, wie Honorare berechnet werden.',
      },
      {
        question: 'Ist die StBVV verbindlich?',
        answer:
          'Ja, sofern keine abweichende schriftliche Vergütungsvereinbarung getroffen wurde. Im gerichtlichen Verfahren darf die gesetzliche Vergütung nicht unterschritten werden.',
      },
      {
        question: 'Welche Fassung der StBVV gilt aktuell?',
        answer:
          'Maßgeblich ist die Fassung mit Wirkung zum 01.07.2025, bekannt gemacht im BGBl. 2025 I Nr. 372. Der Rechner verwendet diesen Stand.',
      },
    ],
  },
};
