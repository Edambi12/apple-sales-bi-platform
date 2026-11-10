import { Section, Panel, Callout } from "../Section";
import { ExternalLink } from "../ExternalLink";
import { docUrl } from "@/config/links";
import { KPIS, type KpiDefinition } from "@/data/caseStudy";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<KpiDefinition["status"], string> = {
  "In report": "bg-primary/10 text-primary",
  Documented: "bg-muted text-muted-foreground",
  "Corrected definition": "bg-foreground text-background",
};

export function KpiAnalysis() {
  return (
    <Section
      id="kpis"
      eyebrow="06 · KPI analysis"
      title="Seven KPIs, each with an explicit formula"
      lead="Every indicator states its numerator, its denominator and what it does not mean. Results are computed on the full dataset, with no slicer applied."
      tone="muted"
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {KPIS.map((k) => (
          <li key={k.name}>
            <Panel className="h-full">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold">{k.name}</h3>
                <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium", STATUS_STYLE[k.status])}>
                  {k.status}
                </span>
              </div>
              <p className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight tabular-nums">
                {k.result}
              </p>
              <pre
                tabIndex={0}
                className="mt-4 overflow-x-auto rounded-lg bg-secondary/70 px-3 py-2 text-[12px] leading-relaxed"
              >
                <code>{k.formula}</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{k.note}</p>
            </Panel>
          </li>
        ))}
        <li>
          <Callout title="What is deliberately not measured" className="h-full">
            <ul className="mt-1 list-disc space-y-1 pl-4">
              <li>Revenue in a currency, profit or margin — the data has no currency, cost or discount fields.</li>
              <li>Repair-processing time — there is no repair completion date.</li>
              <li>Time from sale to claim as a service metric — some claims predate their sale.</li>
            </ul>
            <p className="mt-3">
              <ExternalLink href={docUrl("docs/kpi-definitions.md")}>KPI definitions</ExternalLink>
              {" · "}
              <ExternalLink href={docUrl("powerbi/measures.dax")}>DAX measures</ExternalLink>
            </p>
          </Callout>
        </li>
      </ul>
    </Section>
  );
}
