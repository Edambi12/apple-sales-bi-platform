import { Section } from "../Section";
import { PowerBIEmbed } from "../PowerBIEmbed";

const PAGES = [
  {
    name: "Overview",
    detail: "Sales value, units sold, claims per sale, completed claim share, value by country and by category.",
  },
  {
    name: "Distribution",
    detail: "Store count, year-over-year card, value by country and city, annual trend, store slicer.",
  },
  {
    name: "SAV (after-sales)",
    detail: "Claim count, claims by status, by category and claim level by country.",
  },
];

export function DashboardSection() {
  return (
    <Section
      id="dashboard"
      eyebrow="08 · Interactive dashboard"
      title="The published Power BI report"
      lead="The real report, hosted on the Power BI service. Use the buttons on its left edge to move between the three pages."
      tone="muted"
    >
      <PowerBIEmbed deferred />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {PAGES.map((p) => (
          <li key={p.name} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
