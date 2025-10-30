import { Link } from "react-router-dom";
import { ArrowLeft, Scale, BookText, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const RechtlicheGrundlagen = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Rechtliche Grundlagen - StBVV Paragraphen und Steuerberatergesetz</title>
        <meta name="description" content="Rechtliche Grundlagen der Steuerberatervergütung: Wichtige Paragraphen der StBVV, Steuerberatergesetz, Rechtsprechung und gesetzliche Änderungen 2025." />
        <meta name="keywords" content="StBVV Paragraphen, Steuerberatergesetz, § 24 StBVV, § 11 StBVV, Rechtsprechung Steuerberater" />
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
            <h1 className="text-4xl font-bold mb-4">Rechtliche Grundlagen der Steuerberatervergütung</h1>
            <p className="text-xl text-muted-foreground">
              Gesetzliche Regelungen, wichtige Paragraphen und aktuelle Rechtsprechung zur StBVV
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Gesetzliche Grundlagen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Die rechtlichen Grundlagen für die Vergütung von Steuerberatern finden sich in mehreren Gesetzen und Verordnungen:
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">Steuerberatervergütungsverordnung (StBVV)</h3>
                  <p className="text-sm text-muted-foreground">
                    Die StBVV ist eine Rechtsverordnung, die auf Grundlage von § 64 des Steuerberatungsgesetzes (StBerG) erlassen wurde. Sie regelt die Vergütung für die berufliche Tätigkeit der Steuerberater, Steuerbevollmächtigten, Wirtschaftsprüfer und vereidigten Buchprüfer.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Rechtsgrundlage:</strong> Verordnung über die Vergütung der Steuerberaterinnen und Steuerberater (Steuerberatervergütungsverordnung - StBVV) vom 17. Dezember 1981 (BGBl. I S. 1442), zuletzt geändert durch Artikel 1 der Verordnung vom 15. Dezember 2021 (BGBl. I S. 5164).
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">Steuerberatungsgesetz (StBerG)</h3>
                  <p className="text-sm text-muted-foreground">
                    Das Steuerberatungsgesetz regelt die Zulassung und Berufsausübung von Steuerberatern. § 64 StBerG ermächtigt das Bundesministerium der Finanzen, durch Rechtsverordnung die Vergütung für die berufliche Tätigkeit der Steuerberater zu regeln.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Wichtige Paragraphen: § 33 (Allgemeine Berufspflichten), § 57 (Berufshaftpflichtversicherung), § 62 (Verschwiegenheitspflicht), § 64 (Vergütungsverordnung).
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">Berufsordnung für Steuerberater</h3>
                  <p className="text-sm text-muted-foreground">
                    Die Berufsordnung wird von der Bundessteuerberaterkammer erlassen und konkretisiert die Berufspflichten der Steuerberater. Sie enthält auch Regelungen zur Honorargestaltung und zum fairen Wettbewerb.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-lg mb-2">Bürgerliches Gesetzbuch (BGB)</h3>
                  <p className="text-sm text-muted-foreground">
                    Die allgemeinen Vorschriften des BGB zum Dienstvertrag (§§ 611 ff.) und zum Werkvertrag (§§ 631 ff.) gelten auch für Steuerberaterverträge. Relevant sind insbesondere die Regelungen zur Fälligkeit, Verjährung und zu Mängelansprüchen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookText className="h-5 w-5" />
                Wichtige Paragraphen der StBVV im Detail
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 4 StBVV - Wertgebühren</h3>
                  <p className="text-sm">
                    Definiert das Prinzip der Wertgebühren: Die Gebühren richten sich nach dem Gegenstandswert. Dieser bemisst sich nach dem Interesse des Auftraggebers an der Angelegenheit, soweit nichts anderes bestimmt ist.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 11 StBVV - Bestimmung der Gebühr nach dem Gegenstandswert</h3>
                  <p className="text-sm mb-2">
                    Regelt die Bemessung der konkreten Gebühr innerhalb des Gebührenrahmens. Die Gebühr bestimmt sich nach:
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Bedeutung der Angelegenheit</li>
                    <li>Umfang und Schwierigkeit der Tätigkeit</li>
                    <li>Einkommens- und Vermögensverhältnissen des Auftraggebers</li>
                  </ul>
                  <p className="text-sm mt-2">
                    Dies ist die zentrale Vorschrift zur Rechtfertigung des gewählten Zehntelsatzes.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 13 StBVV - Zeitgebühr</h3>
                  <p className="text-sm">
                    Ermöglicht die Abrechnung nach Zeit anstatt nach Gegenstandswert. Die Zeitgebühr beträgt 30 bis 80 Euro je halbe Stunde. Die Höhe richtet sich nach der Schwierigkeit der Tätigkeit und der Verantwortung des Steuerberaters.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Anwendung:</strong> Besonders bei Beratungsgesprächen, Besprechungen oder wenn die Bedeutung der Angelegenheit nicht abschätzbar ist.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 14 StBVV - Abgeltungsbereich der Gebühren</h3>
                  <p className="text-sm">
                    Bestimmt, welche Tätigkeiten mit der jeweiligen Gebühr abgegolten sind. Wichtig: Mehrere zusammenhängende Tätigkeiten können unter Umständen nur eine Gebühr auslösen.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 16 StBVV - Entgelt für Post- und Telekommunikationsdienstleistungen</h3>
                  <p className="text-sm">
                    Regelt die Auslagenpauschale: Der Steuerberater kann eine Pauschale von bis zu 20 % der Gebühren, höchstens jedoch 20 Euro je Auftrag, für Post- und Telekommunikationsdienstleistungen fordern.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 24 StBVV - Vereinbarungen über die Vergütung</h3>
                  <p className="text-sm mb-2">
                    Zentrale Vorschrift zu Honorarvereinbarungen. Wichtigste Punkte:
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Vergütungsvereinbarungen müssen schriftlich getroffen werden</li>
                    <li>Sie müssen <strong>vor Beginn der Tätigkeit</strong> geschlossen werden</li>
                    <li>Höhere oder niedrigere als gesetzliche Gebühren sind möglich</li>
                    <li>Erfolgshonorar ist unter bestimmten Bedingungen zulässig</li>
                    <li>Die Vereinbarung muss angemessen sein</li>
                  </ul>
                  <p className="text-sm mt-2">
                    <strong>Wichtig:</strong> Nachträgliche Vereinbarungen über die Vergütung sind unwirksam!
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 8 StBVV - Vorschuss</h3>
                  <p className="text-sm">
                    Der Steuerberater kann von seinem Auftraggeber einen angemessenen Vorschuss fordern, wenn die voraussichtlichen Gebühren und Auslagen 250 Euro übersteigen. Der Vorschuss ist auf die Vergütung anzurechnen.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§ 19 StBVV - Fälligkeit</h3>
                  <p className="text-sm">
                    Die Vergütung wird fällig, wenn der Auftrag erledigt oder die Angelegenheit beendet ist. Bei länger dauernden Tätigkeiten kann der Steuerberater nach Ablauf eines Kalenderjahres und bei Beendigung des Auftrags Abrechnung verlangen.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">§§ 24-35 StBVV - Gebührentatbestände</h3>
                  <p className="text-sm">
                    Diese Paragraphen beschreiben detailliert, für welche Tätigkeiten welche Tabellen und Gebühren anzuwenden sind. Sie sind die Grundlage für die korrekte Zuordnung Ihrer Leistungen zu den entsprechenden Gebührentabellen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Wichtige Rechtsprechung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Die folgenden Urteile haben die Anwendung der StBVV maßgeblich geprägt:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">BGH, Urteil vom 16.07.2009 - IX ZR 149/08</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Leitsatz:</strong> Eine Vergütungsvereinbarung nach § 4 Abs. 1 StBVV muss vor Beginn der Tätigkeit getroffen werden. Eine nachträgliche Vereinbarung ist unwirksam. Ohne Vereinbarung gilt die Mittelgebühr.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Bedeutung:</strong> Dieses Urteil betont die zwingende Schriftform und den Zeitpunkt der Honorarvereinbarung.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">BGH, Urteil vom 04.07.2013 - IX ZR 20/12</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Leitsatz:</strong> Bei der Bemessung der Gebühr nach § 11 StBVV ist maßgeblich auf die Bedeutung der Angelegenheit, den Umfang und die Schwierigkeit der Tätigkeit sowie die Einkommens- und Vermögensverhältnisse des Auftraggebers abzustellen.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Bedeutung:</strong> Konkretisierung der Kriterien für die Wahl des Zehntelsatzes.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">BGH, Urteil vom 10.11.2016 - IX ZR 214/15</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Leitsatz:</strong> Die Zeitgebühr nach § 13 StBVV ist auch dann zulässig, wenn eine Wertgebühr prinzipiell möglich wäre. Eine Vereinbarung ist nicht erforderlich, aber empfehlenswert.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Bedeutung:</strong> Erleichtert die Abrechnung nach Zeitaufwand bei Beratungsleistungen.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">OLG München, Urteil vom 25.01.2018 - 23 U 3377/17</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Leitsatz:</strong> Bei der Erstellung mehrerer Steuererklärungen für denselben Mandanten kann der Zehntelsatz für die weiteren Erklärungen wegen Synergieeffekten niedriger angesetzt werden.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Bedeutung:</strong> Berücksichtigt, dass mehrere zusammenhängende Steuererklärungen teilweise effizienter bearbeitet werden können.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">BFH, Urteil vom 11.04.2019 - V R 13/17</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Leitsatz:</strong> Die Umsatzsteuer ist auch auf Auslagen zu berechnen, die der Steuerberater an den Mandanten weiterberechnet, sofern diese im Rahmen der steuerberatenden Tätigkeit anfallen.
                  </p>
                  <p className="text-sm mt-2">
                    <strong>Bedeutung:</strong> Klarstellung zur Umsatzsteuerpflicht bei Nebenkosten.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Änderungen der StBVV 2025</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Die Steuerberatervergütungsverordnung wird regelmäßig angepasst, um wirtschaftliche Entwicklungen und Änderungen im Steuerrecht zu berücksichtigen. Die wichtigsten Änderungen für 2025:
              </p>

              <div className="space-y-3">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Anpassung der Gebührentabellen</h4>
                  <p className="text-sm text-muted-foreground">
                    Die Gebührensätze in den Tabellen A bis D wurden zum 1. Januar 2025 um durchschnittlich 8 % angehoben. Dies trägt der allgemeinen Preisentwicklung und den gestiegenen Anforderungen an steuerliche Beratung Rechnung.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Digitale Kommunikation</h4>
                  <p className="text-sm text-muted-foreground">
                    Die Auslagenpauschale nach § 16 StBVV umfasst nun explizit auch digitale Kommunikationsformen wie Videokonferenzen und elektronische Signaturverfahren.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">E-Bilanz und digitale Verfahren</h4>
                  <p className="text-sm text-muted-foreground">
                    Für die Übermittlung von Steuererklärungen und Jahresabschlüssen in digitaler Form (z.B. E-Bilanz) können keine zusätzlichen Gebühren mehr erhoben werden. Dies ist mit der regulären Gebühr nach Tabelle B oder C abgegolten.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Klarstellung zu Pauschalvergütungen</h4>
                  <p className="text-sm text-muted-foreground">
                    Die zulässigen Grenzen für pauschale Vergütungsvereinbarungen wurden präzisiert. Pauschalvergütungen müssen sich weiterhin an den Werten der StBVV orientieren und dürfen nicht sittenwidrig niedrig sein.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Hinweis:</strong> Vergütungsvereinbarungen, die vor dem 1. Januar 2025 getroffen wurden, behalten ihre Gültigkeit. Für neue Mandate gelten ab 2025 die aktualisierten Gebührensätze.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Berufsrechtliche Aspekte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Neben den zivilrechtlichen Regelungen der StBVV müssen Steuerberater auch berufsrechtliche Vorgaben beachten:
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Angemessenheit der Vergütung</h4>
                  <p className="text-sm text-muted-foreground">
                    § 13 BOStB (Berufsordnung) verpflichtet Steuerberater, ihre Vergütung angemessen zu gestalten. Sittenwidrig niedrige Honorare (Dumpingpreise) sind berufsrechtswidrig und können zu Sanktionen durch die Steuerberaterkammer führen.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Werbeverbot für Honorare</h4>
                  <p className="text-sm text-muted-foreground">
                    Steuerberater dürfen nicht mit besonders niedrigen Gebühren werben oder diese als Wettbewerbsvorteil herausstellen. Dies gilt als unlauterer Wettbewerb und verstößt gegen die Berufsordnung.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Aufklärungspflicht</h4>
                  <p className="text-sm text-muted-foreground">
                    Der Steuerberater muss den Mandanten über die voraussichtlichen Kosten informieren, insbesondere wenn diese einen bestimmten Rahmen überschreiten. Transparenz bei der Honorarabrechnung ist Berufspflicht.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Zurückbehaltungsrecht</h4>
                  <p className="text-sm text-muted-foreground">
                    Nach § 66 StBerG steht dem Steuerberater ein Zurückbehaltungsrecht an den Handakten zu, bis seine Gebührenforderungen erfüllt sind. Ausgenommen sind Urschriften, die der Mandant zur Wahrnehmung einer Frist benötigt.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weiterführende Rechtsquellen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Für vertiefte juristische Recherchen:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Bundesgesetzblatt:</strong> <a href="https://www.bgbl.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.bgbl.de</a></li>
                <li><strong>Gesetze im Internet:</strong> <a href="https://www.gesetze-im-internet.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.gesetze-im-internet.de</a> (StBVV und StBerG)</li>
                <li><strong>Bundessteuerberaterkammer:</strong> <a href="https://www.bstbk.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.bstbk.de</a></li>
                <li><strong>Rechtsprechungsdatenbank:</strong> <a href="https://www.rechtsprechung-im-internet.de" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.rechtsprechung-im-internet.de</a></li>
              </ul>

              <p className="text-sm text-muted-foreground mt-4">
                <strong>Wichtiger Hinweis:</strong> Diese Darstellung ersetzt keine Rechtsberatung. Bei konkreten rechtlichen Fragen sollten Sie einen auf Berufsrecht spezialisierten Rechtsanwalt oder Ihre Steuerberaterkammer konsultieren.
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

export default RechtlicheGrundlagen;
