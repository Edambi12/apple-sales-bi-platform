import { Section, Panel, Callout } from "../Section";
import { ExternalLink } from "../ExternalLink";
import { LINKS, docUrl } from "@/config/links";
import { DATA_QUALITY_CHECKS, SOURCE_TABLES, formatInteger } from "@/data/caseStudy";

export function DataUnderstanding() {
  return (
    <Section
      id="data"
      eyebrow="03 · Data understanding"
      title="Five source tables, profiled before use"
      lead={
        <>
          The data comes from the{" "}
          <ExternalLink href={LINKS.kaggleDataset}>Apple Retail Sales dataset on Kaggle</ExternalLink>
          . Each file was profiled for keys, completeness and consistency before modelling.
        </>
      }
    >
      <Panel className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <caption className="sr-only">Source files, row counts, keys and role in the model</caption>
            <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-semibold">Source file</th>
                <th scope="col" className="px-5 py-3 font-semibold text-right">Rows</th>
                <th scope="col" className="px-5 py-3 font-semibold">Primary key</th>
                <th scope="col" className="px-5 py-3 font-semibold">Foreign keys</th>
                <th scope="col" className="px-5 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SOURCE_TABLES.map((t) => (
                <tr key={t.file}>
                  <th scope="row" className="px-5 py-3.5 text-left font-mono text-[13px] font-medium">{t.file}</th>
                  <td className="px-5 py-3.5 text-right tabular-nums">{formatInteger(t.rows)}</td>
                  <td className="px-5 py-3.5 font-mono text-[13px]">{t.primaryKey}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {t.foreignKeys.length ? t.foreignKeys.join(", ") : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <Panel className="lg:col-span-3">
          <h3 className="font-semibold mb-4">Data quality checks</h3>
          <dl className="divide-y divide-border text-sm">
            {DATA_QUALITY_CHECKS.map((c) => (
              <div key={c.check} className="flex items-start justify-between gap-4 py-2.5">
                <dt className="text-muted-foreground">{c.check}</dt>
                <dd className="font-medium tabular-nums whitespace-nowrap">{c.result}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm">
            <ExternalLink href={docUrl("docs/data-quality.md")}>Full data quality report</ExternalLink>
          </p>
        </Panel>
        <div className="lg:col-span-2 space-y-4">
          <Callout title="Structurally clean, semantically imperfect">
            Keys and types are sound, but some dates contradict each other: 9% of
            claims are dated before the sale they refer to. These rows are kept
            and disclosed rather than silently removed.
          </Callout>
          <Callout title="Very likely synthetic data">
            Quantities are spread almost evenly from 1 to 10, and 47% of sales
            predate the listed launch date of the product sold. Findings describe
            this dataset only — not Apple's real business.
          </Callout>
        </div>
      </div>
    </Section>
  );
}
