import { Link } from "react-router-dom";
import { LINKS, PROJECT } from "@/config/links";
import { ExternalLink } from "@/components/case-study/ExternalLink";
import { BrandMark } from "./BrandMark";

const CASE_STUDY = [
  { label: "Executive summary", href: "/#summary" },
  { label: "Data understanding", href: "/#data" },
  { label: "Data model", href: "/#model" },
  { label: "KPI analysis", href: "/#kpis" },
  { label: "Business insights", href: "/#insights" },
];

const DEMO_STORE = [
  { label: "Products", href: "/produits" },
  { label: "Stores", href: "/boutiques" },
  { label: "Support and warranty", href: "/support" },
  { label: "Cart", href: "/panier" },
];

const linkClass = "text-sm text-muted-foreground hover:text-foreground transition-colors";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <BrandMark />
              <span className="text-sm font-semibold">{PROJECT.title}</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {PROJECT.subtitle}. A portfolio project by {PROJECT.author}.
            </p>
          </div>

          <nav aria-label="Case study">
            <h2 className="text-xs font-semibold text-foreground mb-4">Case study</h2>
            <ul className="space-y-2">
              {CASE_STUDY.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Project links">
            <h2 className="text-xs font-semibold text-foreground mb-4">Project links</h2>
            <ul className="space-y-2">
              <li><Link to="/analytics" className={linkClass}>Live dashboard</Link></li>
              <li><ExternalLink href={LINKS.powerBiReport} className="text-sm">Power BI report</ExternalLink></li>
              <li><ExternalLink href={LINKS.kaggleDataset} className="text-sm">Kaggle dataset</ExternalLink></li>
              <li><ExternalLink href={LINKS.github} className="text-sm">GitHub repository</ExternalLink></li>
            </ul>
          </nav>

          <nav aria-label="Retail demo">
            <h2 className="text-xs font-semibold text-foreground mb-4">Retail demo (fictional)</h2>
            <ul className="space-y-2">
              {DEMO_STORE.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-t border-border pt-6 text-xs text-muted-foreground leading-relaxed space-y-1">
          <p>{PROJECT.disclaimer}</p>
          <p>
            Apple and its product names are trademarks of Apple Inc. Sales value
            is a list-price × quantity proxy in dataset units, not revenue in any
            currency.
          </p>
        </div>
      </div>
    </footer>
  );
}
