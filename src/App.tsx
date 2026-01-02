import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Produits from "./pages/Produits";
import Boutiques from "./pages/Boutiques";
import Support from "./pages/Support";
import Entreprise from "./pages/Entreprise";
import Newsroom from "./pages/Newsroom";
import Carrieres from "./pages/Carrieres";
import Analytics from "./pages/Analytics";
import Compte from "./pages/Compte";
import Panier from "./pages/Panier";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/produits/:id" element={<Produits />} />
          <Route path="/boutiques" element={<Boutiques />} />
          <Route path="/support" element={<Support />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/newsroom" element={<Newsroom />} />
          <Route path="/carrieres" element={<Carrieres />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/compte" element={<Compte />} />
          <Route path="/panier" element={<Panier />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
