# StBVV-Rechtsstand-Abgleich: Fehler und Korrekturplan

Abgleich des hinterlegten Regelwerks mit der hochgeladenen amtlichen Fassung (StBVV, zuletzt geändert durch Art. 5 V v. 19.12.2025, BGBl. 2025 I Nr. 372; Tabellen A–D: BGBl. 2025 I Nr. 105).

---

## A. Bestätigter Hauptfehler (Kapitaleinkünfte)

`Anlage KAP (Kapitalerträge)` ist in `activityPresets.ts` hinterlegt mit:
Rechtsgrundlage § 24 Abs. 1 Nr. 14, Rahmen 1/20–6/20, Mindestgegenstandswert 4.000 €.

Richtig ist § 27 Abs. 1 StBVV (Überschuss der Einnahmen über die Werbungskosten bei Einkünften aus **Kapitalvermögen**):
- Rahmen **1/20 bis 12/20**, Tabelle A
- Gegenstandswert: höherer Betrag aus Summe der Einnahmen oder Werbungskosten, **mindestens 8.000 €**

§ 24 Abs. 1 Nr. 14 (min. 4.000 €) gilt nur für die **Kapitalertragsteueranmeldung** – dafür existiert bereits ein eigenes, korrektes Preset.

Korrektur: KAP auf § 27, 1/20–12/20, Mitte 6,5/20, `minObjectValue` = 8.000 €.

---

## B. Systematischer Rechenfehler in der Tabellenlogik (kritisch)

1. **Grenzwert-Fehler (off-by-one).** Die Tabellensuche in `stbvvCalculator.ts` nutzt `wert >= min && wert < max`. Das Gesetz formuliert „Gegenstandswert **bis** … Euro“, d. h. die Obergrenze ist eingeschlossen. Bei exakt 8.000 € liefert der Rechner 560 € statt korrekt 514 € (Tabelle A). Betroffen sind gerade die gesetzlichen Mindestwerte (8.000 / 16.000 / 25.000 …), die exakt auf Tabellengrenzen liegen. Korrektur auf `wert > vorherige Grenze && wert <= Grenze`.

2. **Fehlende Degression über der letzten Tabellenstufe.** Die Tabellen enden im Code mit einem eingefrorenen Höchstbetrag. Das Gesetz schreibt Zuschläge je angefangene Stufe vor:
   - Tabelle A: über 600.000 € je angefangene 50.000 € 149 €; über 5 Mio. 112 €; über 25 Mio. 88 €
   - Tabelle B: über 50 Mio. je angefangene 5 Mio. 273 €; über 125 Mio. 477 €; über 250 Mio. 681 €
   - Tabelle C: über 500.000 € je angefangene 50.000 € 36 €
   Aktuell wird jeder Wert oberhalb gedeckelt → zu niedrige Gebühr.

3. **Fehlende Stufe in Tabelle A:** 550.000 € → 3.320 € fehlt (Code springt von 500.000 auf 600.000).

4. **Tabelle D unvollständig.** Hinterlegt ist nur Teil a (Betriebsfläche). § 39 Abs. 2/3 verlangt: volle Gebühr = **Tabelle D Teil a + Teil b** (Teil b = Jahresumsatz). Ohne Teil b sind alle land- und forstwirtschaftlichen Positionen zu niedrig.

5. **Mindestgegenstandswerte werden nicht erzwungen.** Der Rechenkern kennt `minObjectValue` nicht; die Absicherung erfolgt nur in der Oberfläche. Der Mindestwert muss im Rechenkern angewandt werden (Gegenstandswert = max(Eingabe, Mindestwert)).

---

## C. Weitere Preset-Fehler gegenüber dem Gesetzestext

| Position | Hinterlegt | Gesetz | Korrektur |
|---|---|---|---|
| Anlage L (Land-/Forstwirtschaft) | Tabelle D | § 27 Abs. 1: Tabelle A | Tabelle A |
| Gesonderte und einheitliche Feststellung | Mitte 5,5/10 bei Rahmen 1–5/10 | § 24 Abs. 1 Nr. 2: 1/10–5/10 | Mitte 3/10 |
| Buchführung (monatlich) | 1/10–12/10 | § 33 Abs. 1: **2/10**–12/10 | Untergrenze 2 |
| Überleitung Handelsbilanz → Steuerbilanz | § 35 Abs. 1 Nr. 4b, 5–12/10 | § 35 Abs. 1 Nr. 3b: 5/10–12/10 | Fundstelle korrigieren |
| Überleitungsrechnung (§ 60 Abs. 3 EStG) | 2–15/10 | § 35 Abs. 1 Nr. 3a: 2/10–10/10 | Obergrenze 10 |
| E-Bilanz / Übermittlung Bundesanzeiger / Finanzamt | § 35 Abs. 1 Nr. 6 (= Erläuterungsbericht) | keine eigene Gebühr; Nr. 6 ist der Erläuterungsbericht 2/10–12/10 | Fundstelle korrigieren, Übermittlung als eigenständige Vereinbarung/Zeitgebühr kennzeichnen |
| Beratung allgemein, Umstrukturierung, Betriebseröffnung | „§ 23 Abs. 1/3“, Sätze 50–200 „Zehntel“ | § 21 Abs. 1: 1/10–10/10 (Erstberatung Verbraucher max. 190 €); § 23 kennt keine Abs. 3/4 in dieser Form | Rechtsgrundlage § 21, Rahmen 1–10/10 bzw. Umstellung auf Zeitgebühr |
| Schriftliche Gutachten | „§ 23 Abs. 4“, 100–250 | § 22 Abs. 1: 10/10–30/10 | § 22, 10–30/10, Mitte 20/10 |
| Betriebsprüfung begleiten | „§ 29“, 50–180 Zehntel | § 29 Nr. 1: **Zeitgebühr**; Nr. 2 (Einwendungen) 5/10–10/10 | auf Zeitgebühr umstellen |
| Einspruch / AdV | „§ 40 Abs. 1“, 1–8/10 | § 40: sinngemäß **RVG** (Geschäftsgebühr 0,5–2,5) | Hinweistext und Rahmen anpassen |
| Lohnabrechnung je Arbeitnehmer | Tabelle C, Zehntel | § 34 Abs. 2: **6,00–30,00 € je Arbeitnehmer** (Einrichtung Abs. 1: 6–19 €) | auf Betragsgebühr je Arbeitnehmer umstellen |
| Anlagen Kind, AV, Vorsorgeaufwand, Sonderausgaben, Unterhalt, agB, haushaltsnahe Aufwendungen | je „§ 27“, min. 8.000 € | § 27 erfasst nur die Ermittlung von Überschusseinkünften; diese Anlagen sind mit § 24 Abs. 1 Nr. 1 abgegolten bzw. Zeitgebühr | Rechtsgrundlage/Hinweis korrigieren |
| Jahresabschluss-Positionen | min. 8.000 € | § 35 kennt **keinen** Mindestgegenstandswert (Gegenstandswert nach § 35 Abs. 2) | Mindestwert entfernen, Hinweis auf Mittel aus berichtigter Bilanzsumme und betrieblicher Jahresleistung |
| Buchführung | min. 15.000 € | § 33 kennt keinen Mindestwert (Tabelle C beginnt bei 15.000 €) | als Tabellenuntergrenze kennzeichnen, nicht als gesetzlichen Mindestwert |

Fehlende Tatbestände, die ergänzt werden sollten: § 24 Abs. 1 Nr. 4 (Mindeststeuererklärung, 1/10–8/10, min. 16.000 €), Nr. 10 (Vermögensteuer, 1/20–18/20, min. 12.500 / 25.000 €), Nr. 16–18, Nr. 22, Nr. 25 (Bauabzugsteuer, min. 1.000 €), § 30 (Selbstanzeige, 10/10–30/10, min. 8.000 €), § 31 (Besprechungen, 5/10–10/10), § 37 (Vermögens-/Finanzstatus, 5/10–15/10), § 38 (Bescheinigungen, 1/10–6/10).

---

## D. Fehler in den Rechtsgrundlagen-Metadaten (`src/constants/stbvv.ts`)

- Fundstelle „BGBl. 2025 I Nr. 98“ ist falsch: Tabellen stammen aus **BGBl. 2025 I Nr. 105**, letzte Änderung **BGBl. 2025 I Nr. 372 vom 19.12.2025**.
- Paragraphenzuordnung vertauscht: § 25 ist die EÜR (nicht Jahresabschluss), § 26 die Durchschnittssatzgewinnermittlung, § 27 die Überschussrechnung, § 35 die Abschlussarbeiten, § 39 die Land- und Forstwirtschaft. § 11 ist „Rahmengebühren“, nicht „Beratung“.
- `STBVV_MINIMUM_VALUES`: Umsatzsteuer ist Nr. 8 (nicht Nr. 5), Gewerbesteuer Nr. 5 (nicht Nr. 4).
- § 16 Postpauschale (20 %, max. 20 €) und § 13 (16,50–41 € je angefangene 15 Min.) stimmen bereits.

---

## Umsetzungsreihenfolge

1. **Rechenkern** – Grenzwertlogik `<=`, Degressionsstufen A/B/C, fehlende Stufe 550.000 in Tabelle A, Tabelle D Teil b, Durchsetzung der Mindestgegenstandswerte im Kern.
2. **Kapitaleinkünfte** – Anlage KAP auf § 27, 1/20–12/20, min. 8.000 €.
3. **Presets** – alle Punkte aus Abschnitt C (Rahmen, Tabellen, Rechtsgrundlagen, Mindestwerte).
4. **Metadaten** – `constants/stbvv.ts` und `constants/validation.ts` auf den Stand 19.12.2025 bringen.
5. **Tests** – Golden-Reference-Tests je Tabelle mit Grenzwerten (300 / 8.000 / 600.000 / 5 Mio.), Mindestwert-Tests je Preset, Regressionstest „Anlage KAP = 8.000 €“.

## Technische Details

- `src/utils/stbvvTables.ts`: Stufen ergänzen, Degressionsfunktion je Tabelle exportieren, Tabelle D in Teil a/Teil b aufteilen.
- `src/utils/stbvvCalculator.ts`: Lookup auf Obergrenze-inklusiv umstellen, Degression und `minObjectValue` anwenden – weiterhin vollständig cent-basiert.
- `src/utils/activityPresets.ts` und `src/constants/validation.ts`: Rahmen, Tabellen, Mindestwerte, Rechtsgrundlagen.
- `src/constants/stbvv.ts`: Version, Fundstellen, Paragraphenzuordnung, Disclaimer-Texte.
