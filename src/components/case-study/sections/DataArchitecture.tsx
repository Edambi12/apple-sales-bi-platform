import { Section, Panel, Callout } from "../Section";
import { ExternalLink } from "../ExternalLink";
import { DataModelDiagram } from "../DataModelDiagram";
import { docUrl } from "@/config/links";
import { RELATIONSHIPS } from "@/data/caseStudy";

const PIPELINE = [
  { label: "Kaggle", detail: "5 CSV files" },
  { label: "Power Query", detail: "Headers + data types" },
  { label: "Import model", detail: "5 tables, 4 relationships" },
  { label: "DAX", detail: "Columns + measures" },
  { label: "Report", detail: "3 pages, published" },
  { label: "Web app", detail: "This case study" },
];

export function DataArchitecture() {
  return (
    <Section
      id="model"
      eyebrow="05 · Data architecture"
      title="A snowflake-style model around one sales fact table"
      lead="Sales is the fact table. Stores and products filter it directly; category sits one step further out, behind products. Warranty hangs off sales through sale_id."
    >
      <ol
        aria-label="Solution architecture, from source to delivery"
        className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {PIPELINE.map((p, i) => (
          <li key={p.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-[11px] font-semibold text-primary tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="font-semibold text-sm">{p.label}</p>
            <p className="text-xs text-muted-foreground">{p.detail}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <DataModelDiagram />
        </Panel>
        <div className="lg:col-span-2 space-y-4">
          <Callout title="Not a classical star schema">
            In a pure star, every dimension joins the fact table directly. Here
            category is normalised out of products, which makes the product
            branch a snowflake. Warranty is a second, claim-level table attached
            to the fact rather than a dimension.
          </Callout>
          <Callout title="No dedicated date table">
            Time analysis relies on Power BI's automatic date tables and on year
            and month columns calculated on sales. A shared calendar table is the
            first recommended improvement.
          </Callout>
          <p className="text-sm">
            <ExternalLink href={docUrl("docs/data-model.md")}>Data model documentation</ExternalLink>
          </p>
        </div>
      </div>

      <Panel className="mt-6 p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <caption className="sr-only">Model relationships, cardinality and filter direction</caption>
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">From (one side)</th>
                <th scope="col" className="px-5 py-3 font-semibold">To</th>
                <th scope="col" className="px-5 py-3 font-semibold">Cardinality</th>
                <th scope="col" className="px-5 py-3 font-semibold">Filter direction</th>
                <th scope="col" className="px-5 py-3 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RELATIONSHIPS.map((r) => (
                <tr key={r.from}>
                  <th scope="row" className="px-5 py-3.5 text-left font-mono text-[13px] font-medium">{r.from}</th>
                  <td className="px-5 py-3.5 font-mono text-[13px]">{r.to}</td>
                  <td className="px-5 py-3.5">{r.cardinality}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.filter}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </Section>
  );
}
