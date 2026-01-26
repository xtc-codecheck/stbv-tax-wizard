import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { CookieBanner } from "./components/CookieBanner";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import InstallApp from "./pages/InstallApp";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import UeberDenRechner from "./pages/UeberDenRechner";
import Gebuhrenordnung from "./pages/Gebuhrenordnung";
import FAQ from "./pages/FAQ";
import RechtlicheGrundlagen from "./pages/RechtlicheGrundlagen";
import Anleitungen from "./pages/Anleitungen";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import NotFound from "./pages/NotFound";

// Development-only imports
const Dashboard = import.meta.env.DEV 
  ? await import("./pages/Dashboard").then(m => m.default)
  : null;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            {/* Dashboard only available in development mode */}
            {import.meta.env.DEV && Dashboard && (
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
          <CookieBanner />
        </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
