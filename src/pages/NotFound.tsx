import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLayout } from "@/components/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout noCanonical>
      <Helmet>
        <title>Seite nicht gefunden – StBVV-Rechner</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-4xl">404</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">
            Die angeforderte Seite wurde nicht gefunden.
          </p>
          <p className="text-sm text-muted-foreground">
            Der Pfad <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code> existiert nicht.
          </p>
          <Link to="/">
            <Button className="mt-4">Zum StBVV-Rechner</Button>
          </Link>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default NotFound;
