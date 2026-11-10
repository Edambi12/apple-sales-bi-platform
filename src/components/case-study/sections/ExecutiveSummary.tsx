import { Section, Panel } from "../Section";
import { TOTALS, formatCompact, formatInteger, formatPercent } from "@/data/caseStudy";

const STATS = [
  { value: formatInteger(TOTALS.salesRows), label: "Sales records", sub: "Every sale_id is unique" },
  { value: formatInteger(TOTALS.unitsSold), label: "Units sold", sub: "Sum of quantity" },
  { value: formatCompact(TOTALS.salesValue), label: "Estimated sales value", sub: "Dataset units — no currency stated" },
  { value: String(TOTALS.products), label: "Products", sub: `Across ${TOTALS.categories} categories` },
  { value: String(TOTALS.stores), label: "Stores", sub: `${TOTALS.cities} cities, ${TOTALS.countries} countries` },
  { value: formatInteger(TOTALS.claims), label: "Warranty claims", sub: `${formatPercent(TOTALS.completedClaimShare, 1)} completed` },
];

const OBJECTIVES = [
  "Turn five raw CSV files into one consistent analytical model.",
  "Define clear, reproducible KPIs for sales and after-sales activity.",
  "Compare performance across categories, countries, cities and stores.",
  "Report honestly on what the data can and cannot support.",
];

export function ExecutiveSummary() {
  return (
    <Section
      id="summary"
      eyebrow="01 · Executive summary"
      title="The project at a glance"
      lead="A Power BI Desktop project covering almost five years of retail sales lines and one year of warranty claims, from data preparation to a published report."
    >
      <dl className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((s) => (
          <Panel key={s.label} className="p-5 md:p-6">
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight tabular-nums">
              {s.value}
            </dd>
            <dd className="mt-1 text-xs text-muted-foreground">{s.sub}</dd>
          </Panel>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="font-semibold mb-3">Project objectives</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {OBJECTIVES.map((o) => (
              <li key={o} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h3 className="font-semibold mb-3">Analytical scope</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Sales period</dt>
              <dd className="font-medium text-right">{TOTALS.salesPeriod}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Warranty claim period</dt>
              <dd className="font-medium text-right">{TOTALS.claimsPeriod}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Tooling</dt>
              <dd className="font-medium text-right">Power BI Desktop · Power Query · DAX</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Report pages</dt>
              <dd className="font-medium text-right">Overview · Distribution · SAV (after-sales)</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </Section>
  );
}
