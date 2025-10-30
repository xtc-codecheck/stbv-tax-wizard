import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FAQ - Häufige Fragen zur Steuerberatervergütung und StBVV 2025</title>
        <meta name="description" content="Antworten auf häufige Fragen zur Steuerberatervergütungsverordnung (StBVV): Gebührenberechnung, Zehntelsätze, Abrechnung und praktische Tipps für Steuerberater." />
        <meta name="keywords" content="StBVV FAQ, Steuerberater Fragen, Gebührenberechnung, Honorarvereinbarung, Abrechnung Steuerberater" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Rechner
          </Button>
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Häufig gestellte Fragen (FAQ)</h1>
            <p className="text-xl text-muted-foreground">
              Antworten auf die wichtigsten Fragen zur Steuerberatervergütung und StBVV
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Allgemeine Fragen zur StBVV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                  <AccordionTrigger>Ist die StBVV für alle Steuerberater verbindlich?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Ja, grundsätzlich ist die Steuerberatervergütungsverordnung (StBVV) für alle Steuerberater, Steuerbevollmächtigte, Wirtschaftsprüfer und vereidigte Buchprüfer verbindlich. Sie müssen sich bei der Gebührenberechnung an die Vorgaben der StBVV halten.
                    </p>
                    <p>
                      Ausnahme: Es können schriftliche Vergütungsvereinbarungen getroffen werden, die von der StBVV abweichen. Diese müssen jedoch vor Beginn der Tätigkeit geschlossen werden und angemessen sein. Eine nachträgliche Vereinbarung ist unwirksam.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger>Kann ich als Steuerberater auch nach Stundensätzen abrechnen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Ja, die Abrechnung nach Zeitgebühr (Stundensatz) ist gemäß § 13 StBVV möglich. Die Zeitgebühr beträgt je nach Schwierigkeit und Verantwortung zwischen 30 € und 80 € pro halbe Stunde.
                    </p>
                    <p>
                      Voraussetzungen für die Zeitgebühr:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Sie muss im Einzelfall angemessen sein</li>
                      <li>Eine schriftliche Vereinbarung ist empfehlenswert</li>
                      <li>Die Zeitaufzeichnungen sollten nachvollziehbar dokumentiert werden</li>
                    </ul>
                    <p>
                      Viele Steuerberater kombinieren beide Abrechnungsmethoden: Standardleistungen nach StBVV-Tabellen, besondere Beratungsleistungen nach Zeitaufwand.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger>Was passiert, wenn keine Gebührenvereinbarung getroffen wurde?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Wenn keine schriftliche Vergütungsvereinbarung getroffen wurde, gelten automatisch die Gebühren nach der StBVV. Der Steuerberater kann dann die Mittelgebühr (3,5/10) ansetzen, die als angemessen für normale Fälle gilt.
                    </p>
                    <p>
                      Bei Streitigkeiten über die Höhe der Gebühr prüfen Gerichte, ob der angesetzte Zehntelsatz gerechtfertigt war. Daher ist es wichtig, die Wahl des Zehntelsatzes im Einzelfall begründen zu können.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4">
                  <AccordionTrigger>Wann ändert sich die StBVV? Wie bleibe ich auf dem aktuellen Stand?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Die StBVV wird unregelmäßig angepasst, meistens alle paar Jahre. Änderungen werden im Bundesgesetzblatt veröffentlicht und treten dann mit einer bestimmten Übergangsfrist in Kraft.
                    </p>
                    <p>
                      Um auf dem aktuellen Stand zu bleiben, empfiehlt sich:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Regelmäßige Teilnahme an Fortbildungen der Steuerberaterkammer</li>
                      <li>Abonnement von Fachzeitschriften (z.B. DStR, StB)</li>
                      <li>Newsletter spezialisierter Verlage und Fachportale</li>
                      <li>Nutzung aktualisierter Online-Rechner wie unseres STBVV Rechners</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fragen zur Gebührenberechnung</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="calc-1">
                  <AccordionTrigger>Wie bestimme ich den richtigen Gegenstandswert?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Der Gegenstandswert hängt von der Art der Tätigkeit ab:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Beratung (Tabelle A):</strong> Wirtschaftliche Bedeutung der Angelegenheit, oft Jahresumsatz oder Einkommen</li>
                      <li><strong>Buchführung (Tabelle B):</strong> Jahresumsatz des buchführungspflichtigen Unternehmens</li>
                      <li><strong>Jahresabschluss (Tabelle B):</strong> 10/10 der Summe der Aktiva (Bilanzsumme)</li>
                      <li><strong>Steuererklärungen (Tabelle C):</strong> Summe der positiven Einkünfte bzw. Umsätze</li>
                      <li><strong>Rechtsbehelfe (Tabelle D):</strong> Streitwert, also der wirtschaftlich umstrittene Betrag</li>
                    </ul>
                    <p>
                      Bei Unsicherheit: Dokumentieren Sie, wie Sie den Gegenstandswert ermittelt haben. Dies hilft bei Rückfragen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="calc-2">
                  <AccordionTrigger>Welchen Zehntelsatz soll ich wählen - 2/10, 3,5/10 oder 6/10?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Die Wahl des Zehntelsatzes richtet sich nach § 11 StBVV und berücksichtigt mehrere Faktoren:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>1/10 bis 2/10:</strong> Sehr einfache, routinemäßige Standardfälle mit minimalem Aufwand</li>
                      <li><strong>2,5/10 bis 3/10:</strong> Einfache Standardfälle ohne Besonderheiten</li>
                      <li><strong>3,5/10 (Mittelgebühr):</strong> Normalfall, durchschnittlicher Schwierigkeitsgrad und Aufwand</li>
                      <li><strong>4/10 bis 5/10:</strong> Überdurchschnittlich schwierige Fälle, besondere Komplexität</li>
                      <li><strong>6/10:</strong> Außergewöhnlich schwierige Fälle, sehr hoher Aufwand oder Haftungsrisiko</li>
                    </ul>
                    <p>
                      Praxis-Tipp: Die Mittelgebühr (3,5/10) ist der sichere Ausgangspunkt. Bei besonderen Umständen können Sie nach oben oder unten abweichen, sollten dies aber dokumentieren.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="calc-3">
                  <AccordionTrigger>Kann ich für mehrere Steuererklärungen (z.B. ESt, GewSt, USt) nur eine Gebühr berechnen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Nein, für jede Steuerart muss eine separate Gebühr nach Tabelle C berechnet werden. Die Erstellung einer Einkommensteuererklärung, einer Gewerbesteuererklärung und einer Umsatzsteuererklärung sind drei getrennte Tätigkeiten.
                    </p>
                    <p>
                      Allerdings können Sie bei einem Mandat mit mehreren Erklärungen durchaus niedrigere Zehntelsätze ansetzen, da Synergieeffekte entstehen. Beispiel: ESt-Erklärung 4/10, GewSt-Erklärung 3/10, USt-Erklärung 2/10.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="calc-4">
                  <AccordionTrigger>Wie berechne ich die Auslagenpauschale?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Die Auslagenpauschale nach § 16 StBVV beträgt maximal 20 % der berechneten Gebühren, jedoch höchstens 20 € pro Auftrag. Sie deckt folgende Kosten ab:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Porto und Versandkosten</li>
                      <li>Telefonkosten</li>
                      <li>Faxgebühren</li>
                      <li>E-Mail-Kommunikation</li>
                    </ul>
                    <p>
                      Rechenbeispiel: Bei Gebühren von 600 € können Sie maximal 20 € Auslagenpauschale berechnen (20 % von 600 € wären 120 €, aber das Maximum ist 20 €).
                    </p>
                    <p>
                      Die Auslagenpauschale ist optional. Viele Steuerberater berechnen sie nur bei größeren Aufträgen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="calc-5">
                  <AccordionTrigger>Muss ich Umsatzsteuer auf meine Leistungen berechnen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Ja, alle steuerberatenden Leistungen unterliegen der Umsatzsteuer mit dem Regelsteuersatz von 19 %. Die Umsatzsteuer wird auf die Summe aus Gebühren und Auslagen berechnet.
                    </p>
                    <p>
                      Ausnahme: Steuerberater, die die Kleinunternehmerregelung nach § 19 UStG in Anspruch nehmen (Vorjahresumsatz unter 22.000 €), müssen keine Umsatzsteuer ausweisen.
                    </p>
                    <p>
                      Auf der Rechnung muss die Umsatzsteuer separat ausgewiesen werden, zusammen mit Ihrer Umsatzsteuer-Identifikationsnummer.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fragen zur Praxis und Abrechnung</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="practice-1">
                  <AccordionTrigger>Wie sollte eine korrekte Steuerberaterrechnung aussehen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Eine ordnungsgemäße Rechnung nach § 14 UStG muss folgende Angaben enthalten:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Vollständiger Name und Anschrift des Steuerberaters und des Mandanten</li>
                      <li>Steuernummer oder Umsatzsteuer-Identifikationsnummer</li>
                      <li>Rechnungsdatum und fortlaufende Rechnungsnummer</li>
                      <li>Genaue Bezeichnung der erbrachten Leistungen</li>
                      <li>Zeitpunkt der Leistungserbringung</li>
                      <li>Angabe des Gegenstandswerts und des angewandten Zehntelsatzes</li>
                      <li>Netto-Betrag, Umsatzsteuersatz und Umsatzsteuerbetrag</li>
                      <li>Brutto-Endbetrag</li>
                    </ul>
                    <p>
                      Zusätzlich empfehlenswert: Verweis auf die angewandten Paragraphen der StBVV und detaillierte Aufschlüsselung der einzelnen Positionen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="practice-2">
                  <AccordionTrigger>Kann ich Abschlagszahlungen verlangen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Ja, gemäß § 8 StBVV kann der Steuerberater für seine Tätigkeit Vorschüsse fordern. Dies ist besonders bei umfangreichen oder langfristigen Mandaten üblich.
                    </p>
                    <p>
                      Empfehlenswerte Vorgehensweise:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Schriftliche Vereinbarung über Abschlagszahlungen im Mandatsvertrag</li>
                      <li>Monatliche oder quartalsweise Abrechnung bei Dauermandaten</li>
                      <li>Vorschuss bei Projektbeginn, Endabrechnung nach Abschluss</li>
                      <li>Faire Schätzung der zu erwartenden Gebühren</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="practice-3">
                  <AccordionTrigger>Was kann ich tun, wenn ein Mandant die Rechnung nicht bezahlt?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Bei Zahlungsverzug eines Mandanten stehen Ihnen folgende Möglichkeiten zur Verfügung:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Zahlungserinnerung:</strong> Freundliche schriftliche Erinnerung mit kurzer Frist</li>
                      <li><strong>Mahnung:</strong> Förmliche Mahnung mit Fristsetzung (empfohlen: 14 Tage)</li>
                      <li><strong>Verzugszinsen:</strong> Ab Fälligkeit können Verzugszinsen berechnet werden (derzeit 9 % über Basiszinssatz bei Geschäftskunden)</li>
                      <li><strong>Mahnbescheid:</strong> Gerichtliches Mahnverfahren über das Online-Portal der Justiz</li>
                      <li><strong>Zurückbehaltungsrecht:</strong> Sie können Unterlagen zurückbehalten, bis die Rechnung beglichen ist (§ 66 StBerG)</li>
                    </ul>
                    <p>
                      Wichtig: Dokumentieren Sie alle Zahlungserinnerungen und Mahnungen sorgfältig.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="practice-4">
                  <AccordionTrigger>Wie lange kann ich eine Rechnung nach Abschluss der Tätigkeit stellen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Grundsätzlich sollten Rechnungen zeitnah nach Abschluss der Tätigkeit gestellt werden. Rechtlich gesehen gilt die regelmäßige Verjährungsfrist von drei Jahren (§ 195 BGB), beginnend mit dem Schluss des Jahres, in dem der Anspruch entstanden ist.
                    </p>
                    <p>
                      Beispiel: Für eine im Mai 2023 abgeschlossene Steuererklärung können Sie bis zum 31.12.2026 eine Rechnung stellen.
                    </p>
                    <p>
                      Empfehlung: Stellen Sie Rechnungen möglichst innerhalb von 4 Wochen nach Leistungserbringung. Dies wirkt professionell und vermeidet Diskussionen über die Höhe der Gebühr.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="practice-5">
                  <AccordionTrigger>Darf ich für telefonische Auskünfte eine Gebühr berechnen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Ja, telefonische Beratungen sind grundsätzlich gebührenpflichtige Leistungen nach Tabelle A der StBVV. Allerdings gibt es in der Praxis unterschiedliche Handhabungen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Kurze Rückfragen (unter 5 Minuten):</strong> Oft kostenlos im Rahmen der laufenden Betreuung</li>
                      <li><strong>Echte Beratungsgespräche:</strong> Sollten nach Tabelle A berechnet werden</li>
                      <li><strong>Dauerberatung:</strong> Kann durch Pauschalhonorar abgegolten werden</li>
                    </ul>
                    <p>
                      Empfehlung: Informieren Sie Ihre Mandanten vorab über Ihre Abrechnungspraxis bei telefonischen Beratungen. Dies vermeidet Missverständnisse.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technische Fragen zum STBVV Rechner</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tech-1">
                  <AccordionTrigger>Wie nutze ich den STBVV Rechner richtig?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Die Nutzung des STBVV Rechners ist einfach:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Wählen Sie die passende Tabelle (A, B, C oder D) für Ihre Tätigkeit</li>
                      <li>Geben Sie den Gegenstandswert ein</li>
                      <li>Wählen Sie den angemessenen Zehntelsatz (Standard ist 3,5/10)</li>
                      <li>Fügen Sie bei Bedarf weitere Positionen hinzu</li>
                      <li>Entscheiden Sie, ob Auslagenpauschale berechnet werden soll</li>
                      <li>Exportieren Sie die Berechnung als PDF oder Excel</li>
                    </ol>
                    <p>
                      Der Rechner berechnet automatisch die korrekten Gebühren, die Umsatzsteuer und den Gesamtbetrag.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-2">
                  <AccordionTrigger>Werden meine Daten gespeichert oder an Dritte weitergegeben?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Nein, Ihre Daten werden nicht gespeichert oder an Dritte weitergegeben. Der STBVV Rechner funktioniert vollständig im Browser Ihres Computers. Alle Berechnungen und Eingaben bleiben auf Ihrem Gerät und werden nicht an externe Server übertragen.
                    </p>
                    <p>
                      Dies gewährleistet:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Vollständige Mandantenvertraulichkeit</li>
                      <li>DSGVO-konforme Nutzung</li>
                      <li>Keine Registrierung oder Anmeldung erforderlich</li>
                      <li>Maximale Datensicherheit</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tech-3">
                  <AccordionTrigger>Kann ich meine Berechnungen speichern und später wieder aufrufen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Derzeit bietet der Rechner eine Browser-basierte Speicherfunktion. Ihre Eingaben bleiben erhalten, solange Sie den Browser nicht schließen oder die Seite neu laden.
                    </p>
                    <p>
                      Für dauerhafte Speicherung empfehlen wir:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Sofortigen Export als PDF oder Excel nach jeder Berechnung</li>
                      <li>Ablage in Ihrem digitalen Mandantenordner</li>
                      <li>Backup in Ihrer Kanzleisoftware</li>
                    </ul>
                    <p>
                      Eine Cloud-Speicherfunktion mit Login ist für zukünftige Versionen geplant.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fragen zu besonderen Situationen</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="special-1">
                  <AccordionTrigger>Wie rechne ich bei internationalen Mandaten ab?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Bei internationalen Sachverhalten gelten besondere Regelungen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Reverse-Charge-Verfahren:</strong> Bei Leistungen an Unternehmer in anderen EU-Ländern entfällt die deutsche Umsatzsteuer</li>
                      <li><strong>Erhöhter Aufwand:</strong> Internationale Mandate rechtfertigen oft höhere Zehntelsätze (4/10 bis 6/10)</li>
                      <li><strong>Doppelbesteuerungsabkommen:</strong> Kenntnisse im internationalen Steuerrecht berechtigen zu höheren Gebühren</li>
                      <li><strong>Fremdsprachige Korrespondenz:</strong> Zusätzlicher Zeitaufwand sollte berücksichtigt werden</li>
                    </ul>
                    <p>
                      Tipp: Dokumentieren Sie den Mehraufwand bei internationalen Mandaten besonders sorgfältig.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="special-2">
                  <AccordionTrigger>Kann ich nachträglich eine höhere Gebühr verlangen?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Eine nachträgliche Erhöhung der Gebühr ist grundsätzlich nicht möglich, wenn die Rechnung bereits erteilt wurde. Ausnahmen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Offensichtlicher Rechenfehler:</strong> Kann korrigiert werden</li>
                      <li><strong>Zusätzliche Tätigkeiten:</strong> Können separat abgerechnet werden</li>
                      <li><strong>Einvernehmliche Korrektur:</strong> Mit schriftlicher Zustimmung des Mandanten möglich</li>
                    </ul>
                    <p>
                      Wichtig: Kalkulieren Sie Ihre Gebühren vor Rechnungsstellung sorgfältig. Eine spätere Anpassung nach oben ist rechtlich problematisch und belastet das Mandantenverhältnis.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="special-3">
                  <AccordionTrigger>Was gilt bei Vertretung von Angehörigen oder Freunden?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Auch bei Angehörigen und Freunden gilt grundsätzlich die StBVV. Jedoch:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Gebührenverzicht:</strong> Ist möglich, sollte aber schriftlich festgehalten werden</li>
                      <li><strong>Reduzierte Gebühren:</strong> Können vereinbart werden (z.B. nur 1/10 bis 2/10)</li>
                      <li><strong>Steuerliche Folgen:</strong> Kostenlose Leistungen können als private Entnahme gelten</li>
                      <li><strong>Haftungsrisiko:</strong> Bleibt gleich, auch bei kostenloser Beratung</li>
                    </ul>
                    <p>
                      Empfehlung: Auch bei Freundschaftsdiensten zumindest eine symbolische Gebühr vereinbaren oder schriftlich auf Gebühren verzichten.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="special-4">
                  <AccordionTrigger>Wie gehe ich mit Notfällen und Eilaufträgen um?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Bei besonders eilbedürftigen Aufträgen können Sie höhere Gebühren ansetzen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Zehntelsatz:</strong> Eilaufträge rechtfertigen höhere Sätze (5/10 bis 6/10)</li>
                      <li><strong>Zeitzuschläge:</strong> Bei Zeitgebühr können Zuschläge für Nacht-, Wochenend- oder Feiertagsarbeit berechnet werden</li>
                      <li><strong>Vorherige Vereinbarung:</strong> Informieren Sie den Mandanten vorab über die höheren Kosten</li>
                      <li><strong>Dokumentation:</strong> Halten Sie die Eilbedürftigkeit schriftlich fest</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="special-5">
                  <AccordionTrigger>Was tue ich bei Meinungsverschiedenheiten über die Gebührenhöhe?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Bei Streitigkeiten über die Gebührenhöhe gibt es mehrere Lösungsansätze:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Mediation:</strong> Persönliches Gespräch zur gütlichen Einigung</li>
                      <li><strong>Gebühreneinigung:</strong> Angebot eines Kompromisses (z.B. Reduzierung auf 3/10 statt 5/10)</li>
                      <li><strong>Schlichtungsstelle:</strong> Steuerberaterkammern bieten Schlichtungsverfahren an</li>
                      <li><strong>Gerichtliche Durchsetzung:</strong> Als letztes Mittel über Mahnverfahren</li>
                    </ul>
                    <p>
                      Tipp: Eine transparente Gebührenkalkulation von Anfang an vermeidet die meisten Streitigkeiten.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fragen zur Kanzleiorganisation</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="org-1">
                  <AccordionTrigger>Wie kalkuliere ich meine Stundensätze richtig?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Die Kalkulation des richtigen Stundensatzes basiert auf mehreren Faktoren:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Fixkosten:</strong> Miete, Gehälter, Versicherungen, Software</li>
                      <li><strong>Variable Kosten:</strong> Fortbildung, Fachliteratur, Marketing</li>
                      <li><strong>Gewinnmarge:</strong> Angemessener Unternehmerlohn plus Gewinn</li>
                      <li><strong>Auslastung:</strong> Realistische fakturierbare Stunden pro Jahr (ca. 1.200-1.600h)</li>
                    </ul>
                    <p>
                      Formel: (Gesamtkosten + Gewinnziel) / fakturierbare Stunden = Mindeststundensatz
                    </p>
                    <p>
                      Die StBVV sieht Zeitgebühren von 30-80 € pro halbe Stunde (60-160 €/Stunde) vor, je nach Schwierigkeit.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="org-2">
                  <AccordionTrigger>Sollte ich Pauschalpreise oder StBVV-Gebühren anbieten?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Beide Modelle haben Vor- und Nachteile:
                    </p>
                    <p><strong>Pauschalpreise (Vergütungsvereinbarung):</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Vorteile: Planbarkeit für Mandanten, einfachere Abrechnung, Wettbewerbsvorteil</li>
                      <li>Nachteile: Risiko bei Mehraufwand, erfordert genaue Kalkulation</li>
                      <li>Geeignet für: Standardleistungen, Dauermandate, regelmäßige Tätigkeiten</li>
                    </ul>
                    <p><strong>StBVV-Gebühren:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Vorteile: Faire Abrechnung nach Aufwand, rechtlich abgesichert</li>
                      <li>Nachteile: Weniger Planbarkeit für Mandanten, kann zu Diskussionen führen</li>
                      <li>Geeignet für: Einmalaufträge, komplexe Fälle, unklarer Aufwand</li>
                    </ul>
                    <p>
                      Empfehlung: Kombinieren Sie beide Modelle je nach Leistungsart.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="org-3">
                  <AccordionTrigger>Wie optimiere ich meine Abrechnungsprozesse?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Effiziente Abrechnung spart Zeit und verbessert den Cashflow:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Digitale Tools:</strong> Nutzen Sie moderne Abrechnungssoftware und Online-Rechner</li>
                      <li><strong>Vorlagen:</strong> Erstellen Sie Rechnungsvorlagen für Standardleistungen</li>
                      <li><strong>Zeiterfassung:</strong> Erfassen Sie alle Tätigkeiten sofort, nicht erst am Monatsende</li>
                      <li><strong>Regelmäßigkeit:</strong> Rechnen Sie monatlich ab, nicht quartalsweise</li>
                      <li><strong>Automatisierung:</strong> Nutzen Sie Lastschriftverfahren für Dauermandate</li>
                      <li><strong>Klare Kommunikation:</strong> Informieren Sie Mandanten vorab über voraussichtliche Kosten</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="org-4">
                  <AccordionTrigger>Wie gehe ich mit Preisverhandlungen um?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Professioneller Umgang mit Preisverhandlungen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Selbstbewusstsein:</strong> Kennen Sie Ihren Wert und stehen Sie zu Ihren Preisen</li>
                      <li><strong>Transparenz:</strong> Erklären Sie, wie sich die Gebühr zusammensetzt</li>
                      <li><strong>Alternativen:</strong> Bieten Sie verschiedene Service-Level an (Basic, Standard, Premium)</li>
                      <li><strong>Kompromisse:</strong> Reduzieren Sie bei Bedarf den Leistungsumfang statt den Preis</li>
                      <li><strong>Jahresvertrag:</strong> Gewähren Sie Rabatte nur bei langfristiger Bindung</li>
                      <li><strong>Grenzen:</strong> Lehnen Sie Mandate ab, die nicht kostendeckend sind</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="org-5">
                  <AccordionTrigger>Welche Software-Tools unterstützen bei der StBVV-Abrechnung?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Moderne Software erleichtert die korrekte Abrechnung erheblich:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Kanzleisoftware:</strong> DATEV, Addison, Agenda bieten StBVV-Module</li>
                      <li><strong>Online-Rechner:</strong> Wie unser STBVV Rechner für schnelle Kalkulationen</li>
                      <li><strong>Zeiterfassungs-Tools:</strong> clockodo, Toggl für genaue Leistungserfassung</li>
                      <li><strong>Rechnungsprogramme:</strong> lexoffice, sevDesk mit StBVV-Integration</li>
                      <li><strong>Apps:</strong> Mobile Lösungen für unterwegs</li>
                    </ul>
                    <p>
                      Unser STBVV Rechner ist kostenlos nutzbar, datenschutzkonform und erfordert keine Installation.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fragen zu aktuellen Entwicklungen</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dev-1">
                  <AccordionTrigger>Was ändert sich mit der StBVV 2025?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Die StBVV 2025 brachte mehrere wichtige Anpassungen:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Gebührenerhöhung:</strong> Anpassung der Tabellenwerte an die Inflation (ca. 10-15%)</li>
                      <li><strong>Neue Tatbestände:</strong> Zusätzliche Gebührentatbestände für digitale Leistungen</li>
                      <li><strong>E-Bilanz:</strong> Klarstellungen zur Abrechnung elektronischer Übermittlungen</li>
                      <li><strong>Beratungsleistungen:</strong> Erweiterte Regelungen für pauschale Beratung</li>
                    </ul>
                    <p>
                      Wichtig: Prüfen Sie alle bestehenden Pauschalvereinbarungen und passen Sie diese gegebenenfalls an die neue Rechtslage an.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dev-2">
                  <AccordionTrigger>Wie wirkt sich die Digitalisierung auf die Gebühren aus?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Die Digitalisierung hat verschiedene Auswirkungen auf die Gebührengestaltung:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Effizienzgewinne:</strong> Automatisierung reduziert Zeitaufwand bei Routinearbeiten</li>
                      <li><strong>Neue Leistungen:</strong> Digitale Beratung, Cloud-Services, Online-Meetings</li>
                      <li><strong>Wettbewerb:</strong> Online-Anbieter üben Preisdruck aus</li>
                      <li><strong>Mehrwert:</strong> Fokus auf Beratungsqualität statt auf Massenabwicklung</li>
                    </ul>
                    <p>
                      Strategie: Nutzen Sie Digitalisierung für Effizienz bei Routineaufgaben und investieren Sie gesparte Zeit in hochwertige Beratung.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dev-3">
                  <AccordionTrigger>Wie kalkuliere ich bei KI-unterstützter Arbeit?</AccordionTrigger>
                  <AccordionContent className="space-y-2">
                    <p>
                      Der Einsatz von KI-Tools in der Steuerberatung wirft neue Fragen auf:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Zeitersparnis:</strong> KI kann Arbeitszeit reduzieren, aber erhöht nicht automatisch den Wert</li>
                      <li><strong>Gebührengrundlage:</strong> Bleibt der Gegenstandswert, nicht die reine Arbeitszeit</li>
                      <li><strong>Qualitätssteigerung:</strong> Bessere Ergebnisse können höhere Zehntelsätze rechtfertigen</li>
                      <li><strong>Transparenz:</strong> Mandanten müssen KI-Einsatz nicht zwingend mitgeteilt werden</li>
                    </ul>
                    <p>
                      Empfehlung: Bewerten Sie Ihre Leistung nach Ergebnis und Mehrwert, nicht nach reiner Arbeitszeit.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weitere Fragen?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Haben Sie weitere Fragen zur Steuerberatervergütung oder zur Nutzung des STBVV Rechners? 
                Kontaktieren Sie uns gerne:
              </p>
              <ul className="space-y-2">
                <li><strong>E-Mail:</strong> <a href="mailto:info@finanzgefluester.de" className="text-primary hover:underline">info@finanzgefluester.de</a></li>
                <li><strong>Telefon:</strong> 0941 / 85099285</li>
                <li><strong>YouTube:</strong> <a href="https://youtube.com/@finanzgefluester" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@finanzgefluester</a></li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Hinweis: Die hier gegebenen Informationen stellen keine Rechtsberatung dar. Im Zweifelsfall konsultieren Sie bitte die Steuerberaterkammer oder einen auf Berufsrecht spezialisierten Rechtsanwalt.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8">
            <Link to="/">
              <Button size="lg">
                Zum STBVV Rechner
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
