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

const App = () => (
  <TooltipProvider>
    <Toaster />
    <ErrorBoundary>
      <BrowserRouter>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieBanner />
      </BrowserRouter>
    </ErrorBoundary>
  </TooltipProvider>
);

export default App;
