import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { PageLayout } from "@/components/PageLayout";
import { blogArticles } from "@/data/blogArticles";

const Blog = () => {
  return (
    <PageLayout maxWidth="max-w-6xl">
      <Helmet>
        <title>Blog - Aktuelles zur Steuerberatervergütung und StBVV | Finanzgeflüster</title>
        <meta name="description" content="Aktuelle Artikel, Tipps und Neuigkeiten zur Steuerberatervergütungsverordnung (StBVV), Honorarkalkulation und Kanzleimanagement für Steuerberater." />
        <meta name="keywords" content="StBVV Blog, Steuerberater News, Honorarberatung, Kanzleimanagement, StBVV 2025" />
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Blog & Aktuelles</h1>
          <p className="text-xl text-muted-foreground">
            Expertenwissen, Praxis-Tipps und aktuelle Entwicklungen rund um die Steuerberatervergütung
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogArticles.map((article) => (
            <Link key={article.id} to={`/blog/${article.slug}`} className="group">
              <Card className="flex flex-col hover:shadow-lg transition-shadow h-full">
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
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{article.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {article.readTime} Lesezeit
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm">
                    Artikel lesen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
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
      </div>
    </PageLayout>
  );
};

export default Blog;
