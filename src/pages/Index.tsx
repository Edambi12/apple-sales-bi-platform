import { Layout } from "@/components/layout/Layout";
import { CaseStudyHero } from "@/components/case-study/sections/CaseStudyHero";
import { ExecutiveSummary } from "@/components/case-study/sections/ExecutiveSummary";
import { BusinessUnderstanding } from "@/components/case-study/sections/BusinessUnderstanding";
import { DataUnderstanding } from "@/components/case-study/sections/DataUnderstanding";
import { DataPreparation } from "@/components/case-study/sections/DataPreparation";
import { DataArchitecture } from "@/components/case-study/sections/DataArchitecture";
import { KpiAnalysis } from "@/components/case-study/sections/KpiAnalysis";
import { BusinessInsights } from "@/components/case-study/sections/BusinessInsights";
import { DashboardSection } from "@/components/case-study/sections/DashboardSection";
import { ProjectDocumentation } from "@/components/case-study/sections/ProjectDocumentation";

/** Home page: the Business Intelligence case study, top to bottom. */
const Index = () => {
  return (
    <Layout>
      <CaseStudyHero />
      <ExecutiveSummary />
      <BusinessUnderstanding />
      <DataUnderstanding />
      <DataPreparation />
      <DataArchitecture />
      <KpiAnalysis />
      <BusinessInsights />
      <DashboardSection />
      <ProjectDocumentation />
    </Layout>
  );
};

export default Index;
