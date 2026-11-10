import { Section, Panel, Callout } from "../Section";
import { ExternalLink } from "../ExternalLink";
import { docUrl } from "@/config/links";
import { PREPARATION_STEPS } from "@/data/caseStudy";

const M_SAMPLE = `let
    Source = Csv.Document(
        File.Contents("…\\sales.csv"),
        [Delimiter=",", Columns=5, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"En-têtes promus" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Type modifié" = Table.TransformColumnTypes(#"En-têtes promus", {
        {"sale_id", type text}, {"sale_date", type date},
        {"store_id", type text}, {"product_id", type text},
        {"quantity", Int64.Type}})
in
    #"Type modifié"`;

export function DataPreparation() {
  return (
    <Section
      id="preparation"
      eyebrow="04 · Data preparation"
      title="A light ETL workflow inside Power BI Desktop"
      lead="Power Query shapes and types each file before it is loaded into the model, so the accurate term is ETL. Business logic is then added in the model with relationships and DAX."
      tone="muted"
    >
      <ol className="grid gap-4 md:grid-cols-5">
        {PREPARATION_STEPS.map((s, i) => (
          <li key={s.step}>
            <Panel className="h-full p-5">
              <p className="text-xs font-semibold text-primary tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-semibold">{s.step}</h3>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">{s.tool}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
            </Panel>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="font-semibold mb-1">Power Query (M) — sales table</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Extracted from the project's .pbix file. The other four queries follow the same pattern.
          </p>
          <pre
            tabIndex={0}
            className="overflow-x-auto rounded-xl bg-foreground p-4 text-[12px] leading-relaxed text-background"
          >
            <code>{M_SAMPLE}</code>
          </pre>
        </Panel>
        <div className="space-y-4">
          <Callout title="Why ETL and not ELT">
            The typed tables — not the raw text — are what reach the model: the
            transformation runs in Power Query before the load. There is no
            staging database where raw data lands first, so ELT would overstate
            the architecture.
          </Callout>
          <Callout title="Joins are model relationships">
            No tables are merged in Power Query. The five tables stay separate
            and are joined at query time through model relationships on their
            key columns.
          </Callout>
          <Callout title="Tooling scope">
            Power BI Desktop only: Power Query for preparation, DAX for
            calculations. No SQL database, Python script or external ETL platform
            was used.
          </Callout>
          <p className="text-sm">
            <ExternalLink href={docUrl("docs/methodology.md")}>Full methodology</ExternalLink>
          </p>
        </div>
      </div>
    </Section>
  );
}
