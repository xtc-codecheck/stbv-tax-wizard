import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Rechner
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Datenschutzerklärung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-lg font-medium mb-2 mt-4">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-lg font-medium mb-2">Datenerfassung auf dieser Website</h3>
              <p className="mb-2 font-medium">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
              <p className="mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
                Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>

              <p className="mb-2 font-medium">Wie erfassen wir Ihre Daten?</p>
              <p className="mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann 
                es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten 
                werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, 
                Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>

              <p className="mb-2 font-medium">Wofür nutzen wir Ihre Daten?</p>
              <p className="mb-4">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
                gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <p className="mb-2 font-medium">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck 
                Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, 
                die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur 
                Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft 
                widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Hosting</h2>
              <p className="mb-4">
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              
              <h3 className="text-lg font-medium mb-2">Externes Hosting</h3>
              <p className="mb-4">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website 
                erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann 
                es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, 
                Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert 
                werden, handeln.
              </p>
              <p>
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen 
                und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, 
                schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen 
                Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-lg font-medium mb-2 mt-4">Datenschutz</h3>
              <p className="mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir 
                behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-medium mb-2">Hinweis zur verantwortlichen Stelle</h3>
              <p className="mb-2">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="mb-4 space-y-1">
                <p>Finanzgeflüster GmbH</p>
                <p>Prüfeninger Straße 52</p>
                <p>93049 Regensburg</p>
                <p className="mt-2">Telefon: 0941 / 85099285</p>
                <p>E-Mail: info@finanzgefluester.de</p>
              </div>

              <h3 className="text-lg font-medium mb-2">Speicherdauer</h3>
              <p className="mb-4">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, 
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung 
                entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur 
                Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich 
                zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
              </p>

              <h3 className="text-lg font-medium mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="mb-4">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. 
                Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der 
                bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className="text-lg font-medium mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie 
                daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem 
                Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-lg font-medium mb-2 mt-4">Server-Log-Dateien</h3>
              <p className="mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten 
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mb-4">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. 
                Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>

              <h3 className="text-lg font-medium mb-2">Lokale Speicherung (LocalStorage)</h3>
              <p>
                Diese Website nutzt die LocalStorage-Funktion Ihres Browsers, um Ihre Eingaben temporär 
                zu speichern und ein besseres Nutzererlebnis zu gewährleisten. Diese Daten werden nur 
                lokal auf Ihrem Gerät gespeichert und nicht an unsere Server übertragen. Sie können die 
                LocalStorage-Daten jederzeit in Ihren Browsereinstellungen löschen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Plugins und Tools</h2>
              
              <h3 className="text-lg font-medium mb-2 mt-4">Google AdSense</h3>
              <p className="mb-4">
                Diese Website verwendet Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der 
                Google Ireland Limited („Google"), Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="mb-4">
                Google AdSense verwendet sogenannte „Cookies", Textdateien, die auf Ihrem Computer 
                gespeichert werden und die eine Analyse der Benutzung der Website ermöglichen. Google 
                AdSense verwendet auch so genannte Web Beacons (unsichtbare Grafiken). Durch diese Web 
                Beacons können Informationen wie der Besucherverkehr auf diesen Seiten ausgewertet werden.
              </p>
              <p className="mb-4">
                Die durch Cookies und Web Beacons erzeugten Informationen über die Benutzung dieser 
                Website (einschließlich Ihrer IP-Adresse) und Auslieferung von Werbeformaten werden an 
                einen Server von Google in den USA übertragen und dort gespeichert.
              </p>
              <p className="mb-4">
                Die Nutzung von Google AdSense erfolgt im Interesse einer ansprechenden Darstellung 
                unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 
                lit. f DSGVO dar.
              </p>
              <p>
                Weitere Informationen zu Google AdSense finden Sie in den{" "}
                <a 
                  href="https://policies.google.com/technologies/ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Datenschutzhinweisen von Google
                </a>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Datenschutz;
