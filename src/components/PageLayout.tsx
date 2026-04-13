/**
 * PageLayout - Gemeinsames Layout für alle Unterseiten
 * Enthält Header-Navigation, Footer und Container
 * @module components/PageLayout
 */

import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Helmet } from "react-helmet";

import { BASE_URL } from "@/constants";

const navLinks = [
  { href: '/ueber-den-rechner', label: 'Über den Rechner' },
  { href: '/gebuhrenordnung', label: 'Gebührenordnung' },
  { href: '/faq', label: 'FAQ' },
  { href: '/rechtliche-grundlagen', label: 'Rechtliche Grundlagen' },
  { href: '/anleitungen', label: 'Anleitungen' },
  { href: '/blog', label: 'Blog' },
];

const legalLinks = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];

interface PageLayoutProps {
  children: React.ReactNode;
  /** Max width class, defaults to max-w-4xl */
  maxWidth?: string;
  /** If true, suppress automatic canonical tag (e.g. for 404 page) */
  noCanonical?: boolean;
}

export function PageLayout({ children, maxWidth = "max-w-4xl", noCanonical = false }: PageLayoutProps) {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!noCanonical && (
        <Helmet>
          <link rel="canonical" href={`${BASE_URL}${location.pathname}`} />
        </Helmet>
      )}

      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className={`container mx-auto px-4 ${maxWidth} flex items-center justify-between h-14`}>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zum Rechner
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-8 ${maxWidth} flex-1`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground border-t border-border/50 pt-6">
              <div>© {currentYear} Finanzgeflüster GmbH. Alle Rechte vorbehalten.</div>
              <div className="flex gap-6">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
