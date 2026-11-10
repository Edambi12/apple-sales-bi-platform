import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollManager } from "@/components/layout/ScrollManager";
import { RouteErrorBoundary } from "@/components/layout/RouteErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Secondary pages are split out so the case study loads fast and a problem in
// one page stays contained. Produits, Boutiques, Support and Panier form the
// retail demo (fictional sample content, in French).
const Analytics = lazy(() => import("./pages/Analytics"));
const Produits = lazy(() => import("./pages/Produits"));
const Boutiques = lazy(() => import("./pages/Boutiques"));
const Support = lazy(() => import("./pages/Support"));
const Panier = lazy(() => import("./pages/Panier"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div role="status" className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
    Loading…
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        <RouteErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/produits" element={<Produits />} />
              <Route path="/produits/:id" element={<Produits />} />
              <Route path="/boutiques" element={<Boutiques />} />
              <Route path="/support" element={<Support />} />
              <Route path="/panier" element={<Panier />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
