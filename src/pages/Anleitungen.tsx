import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Play, FileText, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const Anleitungen = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Anleitungen - STBVV Rechner richtig nutzen | Schritt-für-Schritt Guide</title>
        <meta name="description" content="Ausführliche Schritt-für-Schritt Anleitungen zur Nutzung des STBVV Rechners: Gebührenberechnung, PDF-Export, Excel-Export und Best Practices für Steuerberater." />
        <meta name="keywords" content="STBVV Rechner Anleitung, Gebühren berechnen, PDF Export, Excel Export, Steuerberater Tutorial" />
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
            <h1 className="text-4xl font-bold mb-4">Anleitungen und Best Practices</h1>
            <p className="text-xl text-muted-foreground">
              Schritt-für-Schritt Anleitungen zur optimalen Nutzung des STBVV Rechners
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Grundlegende Bedienung des STBVV Rechners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Mandantendaten eingeben (optional)</h3>
                    <p className="text-sm text-muted-foreground">
                      Geben Sie zunächst die Daten Ihres Mandanten ein: Firma/Name, Anschrift. Diese Angaben erscheinen später auf der exportierten Rechnung. Sie können diesen Schritt überspringen, wenn Sie nur eine Kalkulation durchführen möchten.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Tätigkeitsart und Tabelle wählen</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Wählen Sie die passende Tabelle für Ihre Tätigkeit aus:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                      <li><strong>Tabelle A:</strong> Beratung, Gutachten, Außenprüfung</li>
                      <li><strong>Tabelle B:</strong> Buchführung, Jahresabschluss, EÜR</li>
                      <li><strong>Tabelle C:</strong> Steuererklärungen aller Art</li>
                      <li><strong>Tabelle D:</strong> Einsprüche, Klagen, Rechtsbehelfe</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Gegenstandswert eingeben</h3>
                    <p className="text-sm text-muted-foreground">
                      Tragen Sie den Gegenstandswert ein. Dieser bestimmt die Höhe der Gebühr. Bei Unsicherheit: Orientieren Sie sich an Jahresumsatz, Einkommen oder Bilanzsumme (je nach Tätigkeit).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Zehntelsatz festlegen</h3>
                    <p className="text-sm text-muted-foreground">
                      Wählen Sie einen Zehntelsatz zwischen 1/10 und 6/10. Standard ist die Mittelgebühr (3,5/10). Höhere Sätze bei komplexen, niedrigere bei einfachen Fällen.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Beschreibung hinzufügen (optional)</h3>
                    <p className="text-sm text-muted-foreground">
                      Fügen Sie eine detaillierte Beschreibung der erbrachten Leistung hinzu. Dies erhöht die Transparenz für Ihren Mandanten und hilft Ihnen bei der Dokumentation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Weitere Positionen hinzufügen</h3>
                    <p className="text-sm text-muted-foreground">
                      Klicken Sie auf "Position hinzufügen", um weitere Leistungen zur Abrechnung hinzuzufügen. Jede Position kann eine andere Tabelle, einen anderen Gegenstandswert und Zehntelsatz haben.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    7
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Auslagenpauschale aktivieren (optional)</h3>
                    <p className="text-sm text-muted-foreground">
                      Entscheiden Sie, ob Sie die Auslagenpauschale nach § 16 StBVV (max. 20 €) berechnen möchten. Diese deckt Porto, Telefon und ähnliche Kommunikationskosten ab.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    8
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Gesamtsumme prüfen</h3>
                    <p className="text-sm text-muted-foreground">
                      Der Rechner zeigt automatisch die Gesamtsumme inklusive Umsatzsteuer an. Überprüfen Sie alle Positionen auf Richtigkeit, bevor Sie exportieren.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                PDF-Rechnung erstellen - Schritt für Schritt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Der PDF-Export erstellt eine professionelle, druckfertige Rechnung mit allen notwendigen Angaben gemäß § 14 UStG.
              </p>

              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Vorbereitung
                  </h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Stellen Sie sicher, dass alle Positionen korrekt eingegeben sind</li>
                    <li>Prüfen Sie die Mandantendaten auf Vollständigkeit</li>
                    <li>Kontrollieren Sie die Gesamtsumme</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export durchführen
                  </h4>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-4">
                    <li>Klicken Sie auf den Button "PDF exportieren"</li>
                    <li>Der Rechner generiert automatisch eine formatierte PDF-Datei</li>
                    <li>Die Datei wird in Ihren Download-Ordner gespeichert</li>
                    <li>Öffnen Sie die PDF zur Kontrolle</li>
                  </ol>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <h4 className="font-semibold">Was enthält die PDF-Rechnung?</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Ihre Kanzleidaten (Name, Anschrift, Kontakt)</li>
                    <li>Mandantendaten</li>
                    <li>Rechnungsnummer und Datum</li>
                    <li>Detaillierte Auflistung aller Positionen mit Tabelle, Gegenstandswert, Zehntelsatz</li>
                    <li>Auslagenpauschale (falls aktiviert)</li>
                    <li>Zwischensumme netto</li>
                    <li>Umsatzsteuer 19 %</li>
                    <li>Brutto-Gesamtbetrag</li>
                    <li>Ihre Bankverbindung und Zahlungsziel</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="text-sm font-semibold">Tipp für die Praxis:</p>
                  <p className="text-sm text-muted-foreground">
                    Speichern Sie die PDF-Rechnung systematisch in Ihrer Mandantenverwaltung ab. Empfohlene Benennung: "JJJJMMTT_Mandantenname_Rechnungsnummer.pdf"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Excel-Export für die Buchhaltung
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Der Excel-Export eignet sich besonders für die Weiterverarbeitung in Buchhaltungssystemen oder für eigene Auswertungen.
              </p>

              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Vorteile des Excel-Exports</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Einfache Weiterverarbeitung und Anpassung</li>
                    <li>Import in Buchhaltungssoftware möglich</li>
                    <li>Eigene Berechnungen und Auswertungen durchführbar</li>
                    <li>Archivierung in digitalen Ablagesystemen</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Durchführung</h4>
                  <ol className="list-decimal list-inside text-sm space-y-1 ml-4">
                    <li>Klicken Sie auf "Excel exportieren"</li>
                    <li>Eine .xlsx-Datei wird generiert und heruntergeladen</li>
                    <li>Öffnen Sie die Datei in Excel, LibreOffice oder Google Sheets</li>
                    <li>Die Datei enthält alle Positionen in tabellarischer Form</li>
                  </ol>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Struktur der Excel-Datei</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Die Excel-Datei enthält folgende Spalten:
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    <li>Position / Laufende Nummer</li>
                    <li>Beschreibung der Leistung</li>
                    <li>Tabelle (A, B, C oder D)</li>
                    <li>Gegenstandswert</li>
                    <li>Zehntelsatz</li>
                    <li>Gebühr netto</li>
                    <li>Auslagenpauschale</li>
                    <li>Umsatzsteuer</li>
                    <li>Betrag brutto</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <p className="text-sm font-semibold">Workflow-Tipp:</p>
                  <p className="text-sm text-muted-foreground">
                    Nutzen Sie den Excel-Export als Grundlage für Ihre interne Honorarstatistik. Sie können so leicht auswerten, welche Tätigkeiten am häufigsten vorkommen und welche Gegenstandswerte typisch sind.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Praxisbeispiele
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Beispiel 1: Einkommensteuererklärung für Arbeitnehmer</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Situation:</strong> Erstellung einer Einkommensteuererklärung für einen Arbeitnehmer mit Einkünften aus nichtselbständiger Arbeit.</p>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-semibold mb-1">Eingaben im Rechner:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Tabelle: C (Steuererklärungen)</li>
                        <li>Gegenstandswert: 65.000 € (zu versteuerndes Einkommen)</li>
                        <li>Zehntelsatz: 3/10 (Standardfall ohne Besonderheiten)</li>
                        <li>Beschreibung: "Einkommensteuererklärung 2024"</li>
                        <li>Auslagenpauschale: Ja (20 €)</li>
                      </ul>
                    </div>
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-semibold">Ergebnis:</p>
                      <p>Gebühr netto: 257,10 € + Auslagenpauschale 20 € = 277,10 €</p>
                      <p>+ 19 % USt: 52,65 €</p>
                      <p><strong>Gesamt: 329,75 €</strong></p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Beispiel 2: Jahresabschluss GmbH mit Steuererklärungen</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Situation:</strong> Erstellung Jahresabschluss, Körperschaftsteuer- und Gewerbesteuererklärung für eine GmbH.</p>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-semibold mb-1">Position 1 - Jahresabschluss:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Tabelle: B</li>
                        <li>Gegenstandswert: 800.000 € (10/10 der Bilanzsumme)</li>
                        <li>Zehntelsatz: 4/10 (mittlerer Schwierigkeitsgrad)</li>
                      </ul>
                      <p className="font-semibold mb-1 mt-2">Position 2 - Körperschaftsteuererklärung:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Tabelle: C</li>
                        <li>Gegenstandswert: 120.000 € (zu versteuerndes Einkommen)</li>
                        <li>Zehntelsatz: 3,5/10</li>
                      </ul>
                      <p className="font-semibold mb-1 mt-2">Position 3 - Gewerbesteuererklärung:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Tabelle: C</li>
                        <li>Gegenstandswert: 120.000 € (Gewerbeertrag)</li>
                        <li>Zehntelsatz: 3/10 (Synergieeffekt)</li>
                      </ul>
                    </div>
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-semibold">Ergebnis:</p>
                      <p>Position 1: 1.808 €</p>
                      <p>Position 2: 704 €</p>
                      <p>Position 3: 540 €</p>
                      <p>+ Auslagenpauschale: 20 €</p>
                      <p>Netto gesamt: 3.072 €</p>
                      <p>+ 19 % USt: 583,68 €</p>
                      <p><strong>Gesamt: 3.655,68 €</strong></p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Beispiel 3: Einspruch gegen Steuerbescheid</h4>
                  <div className="text-sm space-y-2">
                    <p><strong>Situation:</strong> Einspruch gegen einen Einkommensteuerbescheid, Streitwert 8.500 €.</p>
                    <div className="bg-muted p-3 rounded">
                      <p className="font-semibold mb-1">Eingaben im Rechner:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Tabelle: D (Rechtsbehelfe)</li>
                        <li>Gegenstandswert: 8.500 € (umstrittener Steuerbetrag)</li>
                        <li>Zehntelsatz: 5/10 (überdurchschnittlicher Aufwand)</li>
                        <li>Beschreibung: "Einspruch gegen ESt-Bescheid 2023"</li>
                      </ul>
                    </div>
                    <div className="bg-primary/10 p-3 rounded">
                      <p className="font-semibold">Ergebnis:</p>
                      <p>Gebühr netto: 443 €</p>
                      <p>+ 19 % USt: 84,17 €</p>
                      <p><strong>Gesamt: 527,17 €</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices und Tipps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">1. Dokumentation der Gebührenbemessung</h4>
                  <p className="text-sm text-muted-foreground">
                    Notieren Sie sich kurz, warum Sie einen bestimmten Zehntelsatz gewählt haben. Bei Rückfragen können Sie so die Gebühr begründen.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">2. Regelmäßige Aktualisierung</h4>
                  <p className="text-sm text-muted-foreground">
                    Überprüfen Sie regelmäßig, ob Sie die aktuelle Version des Rechners nutzen. Gebührentabellen können sich ändern.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">3. Transparente Kommunikation</h4>
                  <p className="text-sm text-muted-foreground">
                    Informieren Sie Ihre Mandanten vorab über die voraussichtlichen Kosten. Dies vermeidet Überraschungen und Honorarstreitigkeiten.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">4. Vergütungsvereinbarungen schriftlich treffen</h4>
                  <p className="text-sm text-muted-foreground">
                    Wenn Sie von der StBVV abweichen möchten, treffen Sie <strong>vor Beginn der Tätigkeit</strong> eine schriftliche Vereinbarung.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">5. Synergieeffekte nutzen</h4>
                  <p className="text-sm text-muted-foreground">
                    Bei mehreren Steuererklärungen für denselben Mandanten können Sie niedrigere Zehntelsätze für die weiteren Erklärungen ansetzen.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold mb-1">6. Zeitnahe Rechnungsstellung</h4>
                  <p className="text-sm text-muted-foreground">
                    Stellen Sie Rechnungen möglichst innerhalb von 4 Wochen nach Leistungserbringung. Dies wirkt professionell und verbessert Ihre Liquidität.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Video-Tutorials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Auf unserem YouTube-Kanal <a href="https://youtube.com/@finanzgefluester" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">@finanzgefluester</a> finden Sie ausführliche Video-Anleitungen zur Nutzung des STBVV Rechners.
              </p>
              <p className="text-sm text-muted-foreground">
                Die Videos zeigen Schritt für Schritt, wie Sie den Rechner optimal nutzen, typische Fehler vermeiden und professionelle Rechnungen erstellen.
              </p>
              <div className="flex justify-center mt-4">
                <a href="https://youtube.com/@finanzgefluester" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <Play className="mr-2 h-4 w-4" />
                    Zum YouTube-Kanal
                  </Button>
                </a>
              </div>
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

export default Anleitungen;
