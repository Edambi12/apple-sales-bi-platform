import { ArrowRight, BarChart3, Database, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LINKS, PROJECT } from "@/config/links";
import { TOTALS, formatCompact } from "@/data/caseStudy";

const HEADLINE_STATS = [
  { value: formatCompact(TOTALS.salesRows), label: "sales records" },
  { value: formatCompact(TOTALS.unitsSold), label: "units sold" },
  { value: String(TOTALS.stores), label: `stores in ${TOTALS.countries} countries` },
  { value: formatCompact(TOTALS.claims), label: "warranty claims" },
];

export function CaseStudyHero() {
  const reduceMotion = useReducedMotion();
  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="container-wide relative py-20 md:py-28 text-center">
        <motion.p
          {...fade(0)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          Business Intelligence portfolio project · Power BI
        </motion.p>

        <motion.h1
          id="hero-heading"
          {...fade(0.08)}
          className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance"
        >
          Apple Retail Sales <span className="text-gradient">Analytics</span>
        </motion.h1>

        <motion.p
          {...fade(0.16)}
          className="mt-5 text-lg md:text-xl text-foreground/80 font-medium"
        >
          {PROJECT.subtitle}
        </motion.p>

        <motion.p
          {...fade(0.22)}
          className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Five related CSV files turned into an interactive analytical model:
          sales, product, geography, store and warranty performance — prepared
          with Power Query, modelled and measured with DAX, delivered as a
          published Power BI report.
        </motion.p>

        <motion.div
          {...fade(0.3)}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <a href={LINKS.powerBiReport} target="_blank" rel="noopener noreferrer">
              <BarChart3 aria-hidden="true" />
              Open the live Power BI dashboard
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={LINKS.kaggleDataset} target="_blank" rel="noopener noreferrer">
              <Database aria-hidden="true" />
              Dataset source on Kaggle
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Button>
        </motion.div>

        <motion.div
          {...fade(0.36)}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
        >
          <Link
            to="/#summary"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline underline-offset-4"
          >
            Read the case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" aria-hidden="true" /> Source and documentation
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </motion.div>

        <motion.dl
          {...fade(0.44)}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-border bg-border"
        >
          {HEADLINE_STATS.map((s) => (
            <div key={s.label} className="bg-background px-4 py-6">
              <dd className="text-3xl md:text-4xl font-semibold tracking-tight tabular-nums">
                {s.value}
              </dd>
              <dt className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </motion.dl>

        <p className="mx-auto mt-6 max-w-2xl text-xs text-muted-foreground">
          {PROJECT.disclaimer}
        </p>
      </div>
    </section>
  );
}
