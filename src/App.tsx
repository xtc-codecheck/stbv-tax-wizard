import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { CookieBanner, getConsentStatus, enforceConsent } from "./components/CookieBanner";
import { PageLoadingFallback } from "./components/PageLoadingFallback";
import Index from "./pages/Index";

// Enforce AdSense consent on app start (for returning visitors)
enforceConsent(getConsentStatus());

// Lazy-loaded pages
const Settings = React.lazy(() => import("./pages/Settings"));
const InstallApp = React.lazy(() => import("./pages/InstallApp"));
const Impressum = React.lazy(() => import("./pages/Impressum"));
const Datenschutz = React.lazy(() => import("./pages/Datenschutz"));
const UeberDenRechner = React.lazy(() => import("./pages/UeberDenRechner"));
const Gebuhrenordnung = React.lazy(() => import("./pages/Gebuhrenordnung"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const RechtlicheGrundlagen = React.lazy(() => import("./pages/RechtlicheGrundlagen"));
const Anleitungen = React.lazy(() => import("./pages/Anleitungen"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogArticle = React.lazy(() => import("./pages/BlogArticle"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const StbvvTabelle = React.lazy(() => import("./pages/StbvvTabelle"));
const KostenLanding = React.lazy(() => import("./pages/KostenLanding"));
const Vergleich = React.lazy(() => import("./pages/Vergleich"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <ErrorBoundary>
      <BrowserRouter>
        <ErrorBoundary>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            {import.meta.env.DEV && (
              <Route path="/dashboard" element={<Dashboard />} />
            )}
            <Route path="/install" element={<InstallApp />} />
            <Route path="/ueber-den-rechner" element={<UeberDenRechner />} />
            <Route path="/gebuhrenordnung" element={<Gebuhrenordnung />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/rechtliche-grundlagen" element={<RechtlicheGrundlagen />} />
            <Route path="/anleitungen" element={<Anleitungen />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/stbvv-tabelle-a" element={<StbvvTabelle letter="A" />} />
            <Route path="/stbvv-tabelle-b" element={<StbvvTabelle letter="B" />} />
            <Route path="/stbvv-tabelle-c" element={<StbvvTabelle letter="C" />} />
            <Route path="/stbvv-tabelle-d" element={<StbvvTabelle letter="D" />} />
            <Route path="/steuerberaterkosten" element={<KostenLanding path="/steuerberaterkosten" />} />
            <Route path="/jahresabschluss-kosten" element={<KostenLanding path="/jahresabschluss-kosten" />} />
            <Route
              path="/einkommensteuererklaerung-kosten"
              element={<KostenLanding path="/einkommensteuererklaerung-kosten" />}
            />
            <Route path="/euer-kosten" element={<KostenLanding path="/euer-kosten" />} />
            <Route path="/zeitgebuehr" element={<KostenLanding path="/zeitgebuehr" />} />
            {[
              '/steuerberatungskosten-absetzen',
              '/buchhaltung-kosten',
              '/lohnbuchhaltung-kosten',
              '/erstberatung-kosten',
              '/steuerberaterverguetungsverordnung',
            ].map((p) => (
              <Route key={p} path={p} element={<KostenLanding path={p} />} />
            ))}
            <Route path="/vergleich" element={<Vergleich />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </ErrorBoundary>
        <CookieBanner />
      </BrowserRouter>
    </ErrorBoundary>
  </TooltipProvider>
);

export default App;
