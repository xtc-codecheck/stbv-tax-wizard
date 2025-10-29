import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Impressum = () => {
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
            <CardTitle className="text-3xl">Impressum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-1">
                <p className="font-medium">Betreiber:</p>
                <p>Finanzgeflüster GmbH</p>
                <p>Prüfeninger Straße 52</p>
                <p>93049 Regensburg</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
              <div className="space-y-1">
                <p>E-Mail: info@finanzgefluester.de</p>
                <p>Telefon: 0941 / 85099285</p>
                <p>YouTube: @finanzgefluester</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Umsatzsteuer-ID</h2>
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p className="font-medium">DE324885813</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Registereintrag</h2>
              <div className="space-y-1">
                <p>Registergericht: Amtsgericht Regensburg</p>
                <p>Registernummer: HRB 17204</p>
                <p>Wirtschafts-ID: 244 / 126 / 50989</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="space-y-1">
                <p>Alexandra Elias-Bourier</p>
                <p>Dürerstr. 7</p>
                <p>93051 Regensburg</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">EU-Streitschlichtung</h2>
              <p className="mb-2">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              <a 
                href="https://ec.europa.eu/consumers/odr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <p className="mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Haftungsausschluss</h2>
              
              <h3 className="text-lg font-medium mb-2 mt-4">Haftung für Inhalte</h3>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
              </p>

              <h3 className="text-lg font-medium mb-2">Haftung für Links</h3>
              <p className="mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                Seiten verantwortlich.
              </p>

              <h3 className="text-lg font-medium mb-2">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Impressum;
