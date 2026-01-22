/**
 * CalculatorHeader - Header mit Titel, Theme Toggle und Aktionen
 * @module components/calculator/CalculatorHeader
 */

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Keyboard, Settings as SettingsIcon, Command, BarChart3, Wand2, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePWAInstall } from "@/hooks/usePWAInstall";

interface CalculatorHeaderProps {
  onShowKeyboardShortcuts: () => void;
  onOpenCommandPalette?: () => void;
  onStartWizard?: () => void;
}

export function CalculatorHeader({ onShowKeyboardShortcuts, onOpenCommandPalette, onStartWizard }: CalculatorHeaderProps) {
  const navigate = useNavigate();
  const { canInstall, promptInstall } = usePWAInstall();

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4 gap-2 flex-wrap">
        <Calculator className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold text-foreground">STBVV-Rechner</h1>
        <div className="flex gap-1">
          {onOpenCommandPalette && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-2 text-muted-foreground"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="text-xs">Suche</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </Button>
          )}
          {onStartWizard && (
            <Button
              variant="outline"
              size="sm"
              onClick={onStartWizard}
              className="gap-2 text-primary border-primary/30 hover:bg-primary/10"
            >
              <Wand2 className="w-4 h-4" />
              <span className="hidden md:inline">Wizard</span>
            </Button>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowKeyboardShortcuts}
            className="text-muted-foreground hover:text-primary"
            title="Tastenkombinationen"
            aria-label="Tastenkombinationen anzeigen"
          >
            <Keyboard className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-muted-foreground hover:text-primary"
            title="Analyse-Dashboard"
            aria-label="Dashboard öffnen"
          >
            <BarChart3 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="text-muted-foreground hover:text-primary"
            title="Kanzlei-Einstellungen"
            aria-label="Kanzlei-Einstellungen öffnen"
          >
            <SettingsIcon className="w-5 h-5" />
          </Button>
          {canInstall && (
            <Button
              variant="outline"
              size="sm"
              onClick={promptInstall}
              className="gap-2 bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
              title="App installieren"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Installieren</span>
            </Button>
          )}
        </div>
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto text-xl">
        Gesetzeskonforme Steuerberatervergütung nach StBVV 2025 mit automatischer PDF-Erstellung.
        (Hinweis: Berechnung erfolgt nach gesetzlichen Mittelwerten)
      </p>
      <div className="mt-3 flex justify-center">
        <Link
          to="/gebuhrenordnung"
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
        >
          StBVV Stand: 01.07.2025
        </Link>
      </div>
    </div>
  );
}
