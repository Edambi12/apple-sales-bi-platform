import { LineChart, Package, Globe2, Store, ShieldCheck, type LucideIcon } from "lucide-react";
import { Section, Panel } from "../Section";
import { BUSINESS_QUESTIONS } from "@/data/caseStudy";

const ICONS: LucideIcon[] = [LineChart, Package, Globe2, Store, ShieldCheck];

export function BusinessUnderstanding() {
  return (
    <Section
      id="business"
      eyebrow="02 · Business understanding"
      title="Five questions a retail team would ask"
      lead="The analysis is framed for retail leadership, sales managers and after-sales stakeholders. It supports exploration and prioritisation; it does not replace audited financial reporting."
      tone="muted"
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {BUSINESS_QUESTIONS.map((q, i) => {
          const Icon = ICONS[i];
          return (
            <li key={q.title}>
              <Panel className="h-full p-5">
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-semibold">{q.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{q.question}</p>
              </Panel>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
