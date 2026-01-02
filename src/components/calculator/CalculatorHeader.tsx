/**
 * CalculatorHeader - Header mit Titel und Aktionen
 * @module components/calculator/CalculatorHeader
 */

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Keyboard, Settings as SettingsIcon } from "lucide-react";

interface CalculatorHeaderProps {
  onShowKeyboardShortcuts: () => void;
}

export function CalculatorHeader({ onShowKeyboardShortcuts }: CalculatorHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4 gap-2 flex-wrap">
        <Calculator className="w-8 h-8 text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-900">STBVV-Rechner</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShowKeyboardShortcuts}
            className="text-gray-600 hover:text-blue-600"
            title="Tastenkombinationen"
            aria-label="Tastenkombinationen anzeigen"
          >
            <Keyboard className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="text-gray-600 hover:text-blue-600"
            title="Kanzlei-Einstellungen"
            aria-label="Kanzlei-Einstellungen öffnen"
          >
            <SettingsIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto text-xl">
        Gesetzeskonforme Steuerberatervergütung nach StBVV 2025 mit automatischer PDF-Erstellung.
        (Hinweis: Berechnung erfolgt nach gesetzlichen Mittelwerten)
      </p>
      <div className="mt-3 flex justify-center">
        <Link
          to="/gebuhrenordnung"
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 transition-colors cursor-pointer"
        >
          StBVV Stand: 01.07.2025
        </Link>
      </div>
    </div>
  );
}
