import { FileText } from "lucide-react";
import { Section, Panel } from "../Section";
import { ExternalLink } from "../ExternalLink";
import { LINKS, PROJECT, docUrl } from "@/config/links";
import { LIMITATIONS } from "@/data/caseStudy";

const DOCS = [
  { title: "Business understanding", path: "docs/business-understanding.md" },
  { title: "Data understanding", path: "docs/data-understanding.md" },
  { title: "Methodology (ETL)", path: "docs/methodology.md" },
  { title: "Data model", path: "docs/data-model.md" },
  { title: "KPI definitions", path: "docs/kpi-definitions.md" },
  { title: "Architecture", path: "docs/architecture.md" },
  { title: "Data quality", path: "docs/data-quality.md" },
  { title: "Limitations", path: "docs/limitations.md" },
  { title: "DAX measures", path: "powerbi/measures.dax" },
  { title: "Power BI review and roadmap", path: "powerbi/improvement-report.md" },
];

const TOOLS = [
  { name: "Power BI Desktop", use: "Model, report pages, publishing" },
  { name: "Power Query (M)", use: "CSV import, headers, data types" },
  { name: "DAX", use: "Measures and calculated columns" },
  { name: "React · TypeScript · Tailwind", use: "This case-study web application" },
];

export function ProjectDocumentation() {
  return (
    <Section
      id="docs"
      eyebrow="09 · Project documentation"
      title="Method, tools, limits and references"
      lead="The repository documents every step so the work can be reviewed and reproduced."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel>
          <h3 className="font-semibold mb-4">Technical documentation</h3>
          <ul className="space-y-2.5 text-sm">
            {DOCS.map((d) => (
              <li key={d.path} className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <ExternalLink href={docUrl(d.path)}>{d.title}</ExternalLink>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <h3 className="font-semibold mb-4">Tools</h3>
          <dl className="space-y-3 text-sm">
            {TOOLS.map((t) => (
              <div key={t.name}>
                <dt className="font-medium">{t.name}</dt>
                <dd className="text-muted-foreground">{t.use}</dd>
              </div>
            ))}
          </dl>
          <h3 className="font-semibold mt-7 mb-3">References</h3>
          <ul className="space-y-2 text-sm">
            <li><ExternalLink href={LINKS.kaggleDataset}>Kaggle dataset</ExternalLink></li>
            <li><ExternalLink href={LINKS.powerBiReport}>Published Power BI report</ExternalLink></li>
            <li><ExternalLink href={LINKS.github}>GitHub repository</ExternalLink></li>
          </ul>
        </Panel>

        <Panel>
          <h3 className="font-semibold mb-4">Dataset limitations</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {LIMITATIONS.map((l) => (
              <li key={l} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {l}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <p className="mt-10 rounded-xl border border-border bg-secondary/40 px-5 py-4 text-sm text-muted-foreground">
        <strong className="font-semibold text-foreground">Disclaimer. </strong>
        {PROJECT.disclaimer} Apple and its product names are trademarks of Apple
        Inc., used here only to describe the content of the dataset.
      </p>
    </Section>
  );
}
