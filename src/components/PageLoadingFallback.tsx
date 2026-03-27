import { Loader2 } from "lucide-react";

export function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground">Seite wird geladen…</p>
      </div>
    </div>
  );
}
