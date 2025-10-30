import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calculator, Scale, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Gebuhrenordnung = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Steuerberatervergütungsverordnung (StBVV) 2025 erklärt</title>
        <meta name="description" content="Ausführliche Erklärung der StBVV 2025: Gebührentabellen A-D, Zehntelsätze, Auslagenpauschalen und alle wichtigen Paragraphen für Steuerberater verständlich erklärt." />
        <meta name="keywords" content="StBVV 2025, Gebührentabellen, Steuerberater Vergütung, Zehntelsätze, Auslagenpauschalen" />
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
            <h1 className="text-4xl font-bold mb-4">Steuerberatervergütungsverordnung (StBVV) 2025</h1>
            <p className="text-xl text-muted-foreground">
              Alles Wichtige zur Gebührenordnung für Steuerberater – verständlich erklärt
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Grundlagen der StBVV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Die Steuerberatervergütungsverordnung (StBVV) ist die rechtliche Grundlage für die Vergütung steuerberatender Berufe in Deutschland. Sie regelt detailliert, welche Gebühren Steuerberater, Steuerbevollmächtigte, Wirtschaftsprüfer und vereidigte Buchprüfer für ihre Leistungen berechnen dürfen.
              </p>
              <p>
                Die StBVV wurde erstmals 1972 erlassen und wird regelmäßig angepasst, um wirtschaftliche Entwicklungen und Änderungen im Steuerrecht zu berücksichtigen. Die aktuelle Fassung von 2025 enthält verschiedene Anpassungen der Gebührensätze und berücksichtigt die gestiegenen Anforderungen an die steuerliche Beratung.
              </p>
              <p>
                Die Verordnung dient mehreren Zwecken: Sie schützt Mandanten vor überhöhten Forderungen, sichert Steuerberatern eine angemessene Vergütung für ihre qualifizierte Arbeit und schafft Transparenz und Vergleichbarkeit bei der Honorarberechnung. Anders als bei freien Berufen wie Rechtsanwälten (die seit 2008 freie Honorarvereinbarungen treffen können) ist die StBVV für Steuerberater verbindlich, sofern keine schriftliche Vereinbarung über eine abweichende Vergütung getroffen wurde.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Die vier Gebührentabellen im Detail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tabelle-a">
                  <AccordionTrigger>Tabelle A - Beratungstätigkeit</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      Tabelle A regelt die Vergütung für allgemeine steuerliche Beratungsleistungen. Diese Tabelle kommt zur Anwendung bei:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Mündlichen und schriftlichen Auskünften zu steuerlichen Fragen</li>
                      <li>Teilnahme an Besprechungen mit Mandanten oder Behörden</li>
                      <li>Erstellung von Gutachten und Stellungnahmen</li>
                      <li>Steuerliche Gestaltungsberatung</li>
                      <li>Vertretung bei Außenprüfungen (Betriebsprüfungen)</li>
                      <li>Erstellung von Anträgen (z.B. auf Stundung, Erlass)</li>
                    </ul>
                    <p>
                      Die Gebühren nach Tabelle A richten sich nach dem Gegenstandswert, der sich aus der Bedeutung der Angelegenheit für den Mandanten ergibt. Häufig wird als Gegenstandswert bei laufender Beratung der Jahresumsatz oder das zu versteuernde Einkommen herangezogen.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mt-3">
                      <p className="text-sm font-semibold mb-2">Beispiel:</p>
                      <p className="text-sm">
                        Bei einem Gegenstandswert von 50.000 € beträgt die volle Gebühr (6/10) nach Tabelle A: 743 €. 
                        Die Mittelgebühr (3,5/10) würde 434 € betragen.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tabelle-b">
                  <AccordionTrigger>Tabelle B - Buchführung und Abschlussarbeiten</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      Tabelle B erfasst alle Tätigkeiten im Zusammenhang mit der laufenden Buchführung und dem Jahresabschluss:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Führung der Finanzbuchhaltung (Buchen laufender Geschäftsvorfälle)</li>
                      <li>Lohn- und Gehaltsbuchhaltung</li>
                      <li>Erstellung von Jahresabschlüssen (Bilanz, GuV)</li>
                      <li>Einnahmen-Überschuss-Rechnung nach § 4 Abs. 3 EStG</li>
                      <li>Erstellung von Eröffnungsbilanzen</li>
                      <li>Vermögensstatus und Überschuldungsbilanzen</li>
                    </ul>
                    <p>
                      Der Gegenstandswert bei Buchführungsarbeiten richtet sich nach dem Jahresumsatz bzw. bei Abschlussarbeiten nach der Summe der Aktiva der Schlussbilanz (10/10 der Bilanzsumme).
                    </p>
                    <p>
                      Besonderheit: Bei laufender Buchführung kann eine Pauschalgebühr vereinbart werden, die häufig monatlich abgerechnet wird. Diese sollte sich aber an den Werten der Tabelle B orientieren.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mt-3">
                      <p className="text-sm font-semibold mb-2">Beispiel:</p>
                      <p className="text-sm">
                        Für eine Jahresabschlusserstellung bei einer Bilanzsumme von 500.000 € beträgt die volle Gebühr (6/10): 1.498 €.
                        Bei umfangreichen Abschlussarbeiten kann auch ein höherer Zehntelsatz angesetzt werden.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tabelle-c">
                  <AccordionTrigger>Tabelle C - Steuererklärungen</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      Tabelle C regelt die Vergütung für die Anfertigung von Steuererklärungen aller Art:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Einkommensteuererklärungen (auch für Rentner, Arbeitnehmer)</li>
                      <li>Körperschaftsteuererklärungen</li>
                      <li>Gewerbesteuererklärungen</li>
                      <li>Umsatzsteuererklärungen (Jahreserklärung)</li>
                      <li>Erbschaftsteuer- und Schenkungsteuererklärungen</li>
                      <li>Grunderwerbsteuererklärungen</li>
                      <li>Feststellungserklärungen (z.B. bei Personengesellschaften)</li>
                    </ul>
                    <p>
                      Der Gegenstandswert entspricht bei Steuererklärungen in der Regel dem Einkommen bzw. dem Gewinn, von dem die Steuer berechnet wird. Bei Umsatzsteuererklärungen ist es die Summe der Umsätze und der Vorsteuern.
                    </p>
                    <p>
                      Wichtig: Für jede Steuerart ist eine separate Gebühr nach Tabelle C zu berechnen. Die Erstellung einer Einkommensteuererklärung schließt also nicht automatisch die Gewerbesteuererklärung ein.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mt-3">
                      <p className="text-sm font-semibold mb-2">Beispiel:</p>
                      <p className="text-sm">
                        Einkommensteuererklärung bei einem zu versteuernden Einkommen von 80.000 €:
                        Volle Gebühr (6/10): 933 €, Mittelgebühr (3,5/10): 545 €
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="tabelle-d">
                  <AccordionTrigger>Tabelle D - Rechtsbehelfstätigkeiten</AccordionTrigger>
                  <AccordionContent className="space-y-3">
                    <p>
                      Tabelle D kommt zur Anwendung bei der Vertretung in Rechtsbehelfsverfahren und gerichtlichen Verfahren:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Einspruchsverfahren gegen Steuerbescheide</li>
                      <li>Klagen vor dem Finanzgericht (1. Instanz)</li>
                      <li>Revisionsverfahren vor dem Bundesfinanzhof</li>
                      <li>Vertretung bei der Aussetzung der Vollziehung</li>
                      <li>Anträge auf Wiedereinsetzung in den vorigen Stand</li>
                    </ul>
                    <p>
                      Der Gegenstandswert richtet sich nach dem wirtschaftlichen Interesse des Mandanten, also in der Regel nach dem streitigen Steuerbetrag. Bei mehreren Streitpunkten ist der höchste Einzelwert maßgebend, nicht die Summe aller Streitpunkte.
                    </p>
                    <p>
                      Die Gebühren nach Tabelle D sind häufig höher als bei den anderen Tabellen, da Rechtsbehelfsverfahren besondere Kenntnisse und einen erhöhten Aufwand erfordern. Zusätzlich können Terminsgebühren anfallen.
                    </p>
                    <div className="bg-muted p-4 rounded-lg mt-3">
                      <p className="text-sm font-semibold mb-2">Beispiel:</p>
                      <p className="text-sm">
                        Einspruch gegen einen Steuerbescheid mit einem Streitwert von 20.000 €:
                        Volle Gebühr (6/10): 650 €
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Zehntelsätze - Anpassung der Gebühr
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ein zentrales Element der StBVV sind die sogenannten Zehntelsätze. Die Tabellen A bis D geben jeweils Rahmengebühren vor – von einer Mindestgebühr (1/10) bis zur Höchstgebühr (6/10 bzw. bei Tabelle D auch höher). Der Steuerberater kann innerhalb dieses Rahmens die konkrete Gebühr festlegen.
              </p>
              <p>
                <strong>Welcher Zehntelsatz ist angemessen?</strong> Die Wahl des Zehntelsatzes richtet sich nach § 11 StBVV und berücksichtigt folgende Faktoren:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Umfang und Schwierigkeit der Tätigkeit:</strong> Komplexe Fälle rechtfertigen höhere Sätze</li>
                <li><strong>Bedeutung der Angelegenheit:</strong> Wirtschaftliche Tragweite für den Mandanten</li>
                <li><strong>Einkommens- und Vermögensverhältnisse:</strong> Kann die Gebühr nach unten korrigieren</li>
                <li><strong>Haftungs- und Kostenrisiko:</strong> Bei hohem Risiko höhere Gebühren</li>
              </ul>
              <p>
                In der Praxis wird häufig die <strong>Mittelgebühr (3,5/10)</strong> als Ausgangspunkt genommen. Diese gilt als angemessen für normale, nicht besonders schwierige oder einfache Fälle. Bei einfachen Standardfällen können niedrigere Sätze (2/10 bis 3/10) angewandt werden, während bei besonders komplexen oder zeitaufwendigen Mandaten höhere Sätze (4/10 bis 6/10) gerechtfertigt sind.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Praxis-Tipp:</p>
                <p className="text-sm">
                  Dokumentieren Sie die Gründe für die Wahl eines bestimmten Zehntelsatzes in Ihren Akten. Dies hilft bei eventuellen Rückfragen des Mandanten oder bei Überprüfungen durch die Steuerberaterkammer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Auslagenpauschale und Nebenkosten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Neben den Gebühren nach den Tabellen A bis D können Steuerberater gemäß <strong>§ 16 StBVV</strong> auch Auslagen und Nebenkosten in Rechnung stellen:
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Pauschale für Post- und Telekommunikationsdienstleistungen</h4>
                  <p className="text-sm text-muted-foreground">
                    Es kann eine Pauschale von bis zu 20 % der Gebühren, höchstens jedoch 20 € je Auftrag, berechnet werden. Diese deckt Porto, Telefon, Fax, E-Mail und ähnliche Kommunikationskosten ab.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Reisekosten</h4>
                  <p className="text-sm text-muted-foreground">
                    Bei Reisen außerhalb des Geschäftssitzes können tatsächliche Fahrtkosten (bei Nutzung öffentlicher Verkehrsmittel) oder eine Kilometerpauschale (derzeit 0,30 € bis 0,42 € pro km je nach Fahrzeug) sowie Übernachtungs- und Verpflegungskosten berechnet werden.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Schreibauslagen</h4>
                  <p className="text-sm text-muted-foreground">
                    Für Kopien und Ausdrucke können pauschal 0,50 € pro Seite (schwarz-weiß) bzw. 1,00 € pro Seite (farbig) berechnet werden. Bei umfangreichen Dokumentationen können auch die tatsächlichen Kosten angesetzt werden.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Sonstige Auslagen</h4>
                  <p className="text-sm text-muted-foreground">
                    Hierzu zählen beispielsweise Gerichts- und Behördengebühren, Kosten für Sachverständige, Übersetzungen, Veröffentlichungen oder spezielle Recherchen. Diese werden in tatsächlicher Höhe weitergegeben.
                  </p>
                </div>
              </div>

              <p className="mt-4">
                Wichtig: Die Auslagenpauschale ist optional und muss nicht zwingend berechnet werden. Viele Steuerberater verzichten bei kleineren Aufträgen auf die Pauschale, um die Abrechnung zu vereinfachen.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Besondere Gebührenregelungen (§ 24 StBVV)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                § 24 StBVV erlaubt in bestimmten Fällen Zuschläge auf die Gebühren oder abweichende Vereinbarungen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Zeitgebühr:</strong> Kann bei besonders aufwendigen Tätigkeiten vereinbart werden (30 € bis 80 € pro halbe Stunde je nach Schwierigkeit und Qualifikation des Bearbeiters)
                </li>
                <li>
                  <strong>Erfolgshonorar:</strong> In bestimmten Fällen zulässig, z.B. bei der Durchsetzung von Steuererstattungsansprüchen
                </li>
                <li>
                  <strong>Abweichende Vergütungsvereinbarung:</strong> Schriftliche Vereinbarungen über höhere oder niedrigere Gebühren sind möglich, müssen aber angemessen sein
                </li>
              </ul>
              <p>
                Abweichende Vereinbarungen sollten immer <strong>vor Beginn der Tätigkeit</strong> schriftlich getroffen werden, um spätere Streitigkeiten zu vermeiden.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Umsatzsteuer auf Steuerberaterleistungen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Alle Gebühren nach der StBVV verstehen sich zuzüglich der gesetzlichen Umsatzsteuer. Der Regelsteuersatz beträgt derzeit <strong>19 %</strong>. Die Umsatzsteuer wird auf die Summe aus Gebühren und Auslagen berechnet.
              </p>
              <p>
                Ausnahme: Steuerberater können unter bestimmten Voraussetzungen zur Kleinunternehmerregelung optieren (§ 19 UStG), wenn ihr Jahresumsatz 22.000 € nicht übersteigt. In diesem Fall wird keine Umsatzsteuer ausgewiesen.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Rechenbeispiel:</p>
                <p className="text-sm">
                  Gebühr nach Tabelle C: 500,00 €<br />
                  Auslagenpauschale (20 %): 100,00 €<br />
                  Zwischensumme: 600,00 €<br />
                  Umsatzsteuer 19 %: 114,00 €<br />
                  <strong>Gesamtbetrag: 714,00 €</strong>
                </p>
              </div>
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

export default Gebuhrenordnung;
