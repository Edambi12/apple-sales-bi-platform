import { useLocation } from "react-router-dom";

const RETAIL_DEMO_PATHS = ["/produits", "/boutiques", "/support", "/panier"];

/**
 * Banner shown on the retail demo pages. Their content is fictional sample
 * data: it does not come from the analysed dataset and no real order, payment
 * or warranty claim is processed.
 */
export function RetailDemoNotice() {
  const { pathname } = useLocation();
  if (!RETAIL_DEMO_PATHS.some((p) => pathname.startsWith(p))) return null;

  return (
    <p className="bg-foreground px-6 py-2 text-center text-xs text-background">
      Démo d'interface — contenu fictif. Produits, boutiques, prix et
      réclamations sont des exemples, sans lien avec le jeu de données analysé
      ni avec Apple Inc. Aucun paiement réel n'est effectué.
    </p>
  );
}
