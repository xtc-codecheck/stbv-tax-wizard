import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const blogArticles = [
  {
    id: 1,
    slug: "stbvv-2025-neuerungen",
    title: "StBVV 2025: Die wichtigsten Neuerungen im Überblick",
    excerpt: "Die Steuerberatervergütungsverordnung wurde 2025 grundlegend überarbeitet. Erfahren Sie, welche Änderungen für Ihre Kanzlei relevant sind und wie Sie davon profitieren können.",
    date: "2025-01-15",
    readTime: "8 Min.",
    category: "Aktuelles"
  },
  {
    id: 2,
    slug: "gebuhren-richtig-kalkulieren",
    title: "Gebühren richtig kalkulieren: 7 häufige Fehler vermeiden",
    excerpt: "Viele Steuerberater verschenken Honorar durch falsche Kalkulation. Wir zeigen Ihnen die sieben häufigsten Fehler und wie Sie diese vermeiden können.",
    date: "2025-01-08",
    readTime: "6 Min.",
    category: "Praxis-Tipps"
  },
  {
    id: 3,
    slug: "digitalisierung-honorarberatung",
    title: "Digitalisierung in der Honorarberatung: Chancen und Herausforderungen",
    excerpt: "Wie verändert die Digitalisierung die Honorarberatung? Welche Tools helfen bei der effizienten Abrechnung? Ein Blick in die Zukunft der Steuerberatung.",
    date: "2024-12-20",
    readTime: "10 Min.",
    category: "Digitalisierung"
  },
  {
    id: 4,
    slug: "mandantengesprach-honorar",
    title: "Das Mandantengespräch über Honorare: So kommunizieren Sie richtig",
    excerpt: "Honorargespräche sind oft unangenehm. Mit der richtigen Kommunikationsstrategie schaffen Sie Transparenz und vermeiden Konflikte mit Ihren Mandanten.",
    date: "2024-12-10",
    readTime: "7 Min.",
    category: "Kommunikation"
  },
  {
    id: 5,
    slug: "zeitgebühr-vs-wertgebühr",
    title: "Zeitgebühr vs. Wertgebühr: Welches Modell passt zu Ihrer Kanzlei?",
    excerpt: "Die Wahl zwischen Zeitgebühr und Wertgebühr hat große Auswirkungen auf Ihre Rentabilität. Wir vergleichen beide Modelle und zeigen, wann welches Modell sinnvoll ist.",
    date: "2024-11-28",
    readTime: "9 Min.",
    category: "Strategie"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog - Aktuelles zur Steuerberatervergütung und StBVV | Finanzgeflüster</title>
        <meta name="description" content="Aktuelle Artikel, Tipps und Neuigkeiten zur Steuerberatervergütungsverordnung (StBVV), Honorarkalkulation und Kanzleimanagement für Steuerberater." />
        <meta name="keywords" content="StBVV Blog, Steuerberater News, Honorarberatung, Kanzleimanagement, StBVV 2025" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Rechner
          </Button>
        </Link>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Blog & Aktuelles</h1>
            <p className="text-xl text-muted-foreground">
              Expertenwissen, Praxis-Tipps und aktuelle Entwicklungen rund um die Steuerberatervergütung
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogArticles.map((article) => (
              <Card key={article.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(article.date).toLocaleDateString('de-DE', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {article.readTime} Lesezeit
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  <Button variant="link" className="p-0 h-auto font-semibold">
                    Artikel lesen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="py-8">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Bleiben Sie auf dem Laufenden</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Verpassen Sie keine Updates zur StBVV und erhalten Sie regelmäßig Praxis-Tipps für Ihre Kanzlei. 
                  Folgen Sie uns auf YouTube für ausführliche Videos und Tutorials.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="https://youtube.com/@finanzgefluester" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="gap-2">
                      YouTube Kanal besuchen
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8">
            <Link to="/">
              <Button size="lg" variant="outline">
                Zum STBVV Rechner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
