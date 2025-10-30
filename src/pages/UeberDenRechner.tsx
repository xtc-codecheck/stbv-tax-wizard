import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, FileText, Clock, CheckCircle2, Euro, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const UeberDenRechner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Über den STBVV Rechner 2025 - Steuerberater Vergütungsverordnung</title>
        <meta name="description" content="Professioneller STBVV-Rechner für Steuerberater zur korrekten Berechnung von Gebühren nach der Steuerberatervergütungsverordnung 2025. Kostenlos, präzise und gesetzeskonform." />
        <meta name="keywords" content="STBVV Rechner, Steuerberater Gebühren, Vergütungsverordnung 2025, Honorarberechnung" />
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
            <h1 className="text-4xl font-bold mb-4">Über den STBVV Rechner 2025</h1>
            <p className="text-xl text-muted-foreground">
              Ihr professioneller Begleiter für die korrekte Berechnung von Steuerberatergebühren nach der aktuellen Vergütungsverordnung
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Was ist der STBVV Rechner?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Der STBVV Rechner ist ein spezialisiertes Online-Tool zur präzisen Berechnung von Steuerberatergebühren gemäß der Steuerberatervergütungsverordnung (StBVV) in der aktuellen Fassung von 2025. Als Steuerberater oder Steuerfachangestellter stehen Sie täglich vor der Herausforderung, Ihre Leistungen korrekt abzurechnen und dabei alle gesetzlichen Vorgaben einzuhalten.
              </p>
              <p>
                Unser Rechner nimmt Ihnen die komplexe manuelle Berechnung ab und ermöglicht es Ihnen, innerhalb weniger Minuten eine rechtssichere Gebührenberechnung zu erstellen. Dabei berücksichtigt das Tool automatisch alle relevanten Tabellenwerte, Zehntelsätze und Auslagenpauschalen der StBVV.
              </p>
              <p>
                Die Steuerberatervergütungsverordnung regelt die Vergütung für die berufliche Tätigkeit der Steuerberater, Steuerbevollmächtigten, Wirtschaftsprüfer und vereidigten Buchprüfer. Die korrekte Anwendung der StBVV ist nicht nur rechtlich vorgeschrieben, sondern schützt auch vor Honorarstreitigkeiten mit Mandanten und sichert eine angemessene Vergütung für Ihre qualifizierte Arbeit.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Hauptfunktionen und Vorteile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Präzise Gebührenberechnung
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Automatische Berechnung nach den aktuellen Tabellen A, B, C und D der StBVV 2025. Der Rechner berücksichtigt alle Gegenstandswerte und wendet die korrekten Gebührensätze an.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Zeitersparnis
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Keine manuelle Suche in Tabellen mehr nötig. Was früher Minuten dauerte, erledigt der Rechner in Sekunden – ohne Fehlerrisiko bei der Tabellensuche.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    Flexible Gebührenanpassung
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Zehntelsätze von 1/10 bis 6/10 werden unterstützt, ebenso wie individuelle Mittelgebühren und besondere Zuschläge gemäß § 24 StBVV.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Professionelle Ausgabe
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Export als PDF-Rechnung oder Excel-Datei. Inklusive aller Details für eine transparente und nachvollziehbare Abrechnung gegenüber Ihren Mandanten.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Für wen ist der STBVV Rechner geeignet?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Der STBVV Rechner richtet sich an alle Berufsgruppen, die nach der Steuerberatervergütungsverordnung abrechnen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Steuerberater und Steuerberaterinnen</strong> in eigener Praxis oder als Angestellte</li>
                <li><strong>Steuerbevollmächtigte</strong> bei der Erstellung von Honorarabrechnungen</li>
                <li><strong>Wirtschaftsprüfer</strong> für steuerberatende Tätigkeiten</li>
                <li><strong>Steuerfachangestellte und Steuerfachwirte</strong> in der Kanzleiverwaltung</li>
                <li><strong>Buchhalter und Bilanzbuchhalter</strong> in Steuerberatungskanzleien</li>
                <li><strong>Kanzleiinhaber</strong> zur Qualitätssicherung der Abrechnung</li>
                <li><strong>Berufsanfänger</strong> zum Erlernen der korrekten Gebührenberechnung</li>
              </ul>
              <p>
                Besonders hilfreich ist der Rechner für kleinere und mittlere Kanzleien, die keine spezialisierte Abrechnungssoftware einsetzen, aber dennoch professionell und gesetzeskonform abrechnen möchten.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Umfangreiche Berechnungsmöglichkeiten</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Der STBVV Rechner deckt alle gängigen Abrechnungsszenarien ab und bietet folgende Berechnungsmöglichkeiten:
              </p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Tabelle A - Beratungstätigkeit</h4>
                  <p className="text-sm text-muted-foreground">
                    Für allgemeine steuerliche Beratungsleistungen, wie telefonische oder schriftliche Auskünfte, Besprechungen, Erstellung von Gutachten und Stellungnahmen sowie die Mitwirkung bei Betriebsprüfungen.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Tabelle B - Buchführung und Abschlussarbeiten</h4>
                  <p className="text-sm text-muted-foreground">
                    Erfasst Tätigkeiten rund um die laufende Buchführung, Finanzbuchhaltung, Lohnbuchhaltung, Jahresabschlusserstellung und Einnahmen-Überschuss-Rechnung nach § 4 Abs. 3 EStG.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Tabelle C - Steuererklärungen</h4>
                  <p className="text-sm text-muted-foreground">
                    Für die Erstellung von Einkommensteuererklärungen, Körperschaftsteuererklärungen, Gewerbesteuererklärungen, Umsatzsteuererklärungen und weiteren Steuererklärungen aller Art.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Tabelle D - Rechtsbehelfstätigkeiten</h4>
                  <p className="text-sm text-muted-foreground">
                    Deckt die Vertretung bei Einspruchsverfahren, Klagen vor Finanzgerichten und anderen rechtlichen Auseinandersetzungen mit der Finanzverwaltung ab.
                  </p>
                </div>
              </div>

              <p className="mt-4">
                Jede Position kann individuell mit dem zutreffenden Gegenstandswert, dem gewählten Zehntelsatz und zusätzlichen Bemerkungen versehen werden. Der Rechner addiert automatisch alle Positionen und berücksichtigt dabei auch Auslagenpauschalen nach § 16 StBVV.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gesetzeskonforme und transparente Abrechnung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Die Einhaltung der StBVV ist nicht nur gesetzlich vorgeschrieben, sondern dient auch dem Schutz beider Parteien – des Steuerberaters und des Mandanten. Eine transparente und nachvollziehbare Abrechnung schafft Vertrauen und vermeidet Missverständnisse.
              </p>
              <p>
                Unser STBVV Rechner stellt sicher, dass alle Berechnungen den aktuellen gesetzlichen Vorgaben entsprechen. Die Gebührentabellen werden regelmäßig aktualisiert, um Änderungen der Verordnung sofort zu berücksichtigen. Dadurch können Sie sich darauf verlassen, dass Ihre Abrechnungen stets auf dem neuesten Stand sind.
              </p>
              <p>
                Die exportierten PDF-Rechnungen enthalten alle notwendigen Angaben gemäß § 14 UStG, einschließlich detaillierter Aufschlüsselung der einzelnen Positionen, angewandter Gebührensätze und Berechnungsgrundlagen. Dies ermöglicht Ihren Mandanten eine vollständige Nachvollziehbarkeit der Abrechnung.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kostenlos und unverbindlich nutzen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Der STBVV Rechner steht Ihnen vollständig kostenfrei zur Verfügung. Es ist keine Registrierung erforderlich, und es gibt keine versteckten Kosten oder Einschränkungen. Sie können unbegrenzt viele Berechnungen durchführen und die Ergebnisse als PDF oder Excel exportieren.
              </p>
              <p>
                Unser Ziel ist es, die tägliche Arbeit von Steuerberatern zu erleichtern und einen Beitrag zur Professionalisierung der Branche zu leisten. Durch die Bereitstellung dieses kostenlosen Tools möchten wir insbesondere kleinere Kanzleien und Berufseinsteiger unterstützen, die noch keine umfangreiche Abrechnungssoftware nutzen.
              </p>
              <p>
                Der Rechner funktioniert vollständig im Browser und benötigt keine Installation. Ihre Daten bleiben auf Ihrem Gerät und werden nicht an externe Server übertragen. Dies gewährleistet maximale Datensicherheit und Mandantenvertraulichkeit.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontinuierliche Weiterentwicklung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Wir arbeiten kontinuierlich an der Verbesserung des STBVV Rechners. Geplante Erweiterungen umfassen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Automatische Aktualisierung bei Änderungen der StBVV</li>
                <li>Speicherfunktion für häufig verwendete Vorlagen</li>
                <li>Integration mit gängigen Kanzleiverwaltungssystemen</li>
                <li>Erweiterte Anpassungsmöglichkeiten für PDF-Export</li>
                <li>Mobile App für iOS und Android</li>
                <li>Mehrsprachige Unterstützung für internationale Kanzleien</li>
              </ul>
              <p>
                Feedback und Verbesserungsvorschläge sind jederzeit willkommen. Kontaktieren Sie uns unter <a href="mailto:info@finanzgefluester.de" className="text-primary hover:underline">info@finanzgefluester.de</a> oder auf unserem YouTube-Kanal <a href="https://youtube.com/@finanzgefluester" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@finanzgefluester</a>.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8">
            <Link to="/">
              <Button size="lg">
                Jetzt STBVV Rechner nutzen
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UeberDenRechner;
