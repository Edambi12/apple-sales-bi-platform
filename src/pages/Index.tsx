import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { KPISection } from "@/components/sections/KPISection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductHighlights />
      <FeaturedProductsSection />
      <ValueProposition />
      <TestimonialsSection />
      <KPISection />
      <NewsletterSection />
      <CTASection />
    </Layout>
  );
};

export default Index;