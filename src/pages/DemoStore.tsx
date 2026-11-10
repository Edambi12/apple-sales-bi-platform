import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { CTASection } from "@/components/sections/CTASection";

/**
 * Original Lovable storefront demo (formerly the home page). Its content is
 * fictional UI sample data and is unrelated to the Kaggle dataset analysed in
 * the case study.
 */
const DemoStore = () => {
  return (
    <Layout>
      <p className="bg-foreground px-6 py-2 text-center text-xs text-background">
        Démo d'interface — boutique fictive. Produits, prix et avis sont des
        exemples, sans lien avec le jeu de données analysé ni avec Apple Inc.
      </p>
      <HeroSection />
      <ProductHighlights />
      <FeaturedProductsSection />
      <ValueProposition />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </Layout>
  );
};

export default DemoStore;
