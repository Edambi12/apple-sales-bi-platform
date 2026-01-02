import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ValueProposition } from "@/components/sections/ValueProposition";
import { KPISection } from "@/components/sections/KPISection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProductHighlights />
      <ValueProposition />
      <KPISection />
      <CTASection />
    </Layout>
  );
};

export default Index;
