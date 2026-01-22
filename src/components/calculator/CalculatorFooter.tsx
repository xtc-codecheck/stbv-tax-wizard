/**
 * CalculatorFooter - Footer mit Navigation und Legal Links
 * @module components/calculator/CalculatorFooter
 */

import { Link } from "react-router-dom";

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

export function CalculatorFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 py-8 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Navigation Links */}
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

          {/* Legal Links & Copyright */}
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
  );
}
