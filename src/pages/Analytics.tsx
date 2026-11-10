import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PowerBIEmbed } from "@/components/case-study/PowerBIEmbed";
import { ExternalLink } from "@/components/case-study/ExternalLink";
import { LINKS, PROJECT } from "@/config/links";

const Analytics = () => {
  return (
    <Layout>
      <section className="bg-secondary/40 py-10 md:py-14">
        <div className="container-wide">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back to the case study
          </Link>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
            Live Power BI dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The published report for {PROJECT.title}: three pages covering the
            overview, the geographical distribution and after-sales (SAV).
          </p>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container-wide">
          <PowerBIEmbed />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border p-5 text-sm text-muted-foreground leading-relaxed">
              <h2 className="font-semibold text-foreground mb-1.5">Reading the figures</h2>
              Sales value ("CA") is list price × quantity in dataset units — the
              source states no currency. The 2024 growth card compares a partial
              year with full 2023; on a like-for-like basis (1 Jan – 12 Nov) the
              change is +0.77%. See the{" "}
              <Link to="/#kpis" className="font-medium text-primary hover:underline underline-offset-4">
                KPI definitions
              </Link>
              .
            </div>
            <div className="rounded-xl border border-border p-5 text-sm text-muted-foreground leading-relaxed">
              <h2 className="font-semibold text-foreground mb-1.5">About the data</h2>
              {PROJECT.disclaimer}{" "}
              <ExternalLink href={LINKS.kaggleDataset}>Dataset source on Kaggle</ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Analytics;
