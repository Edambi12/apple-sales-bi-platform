import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  tone?: "default" | "muted";
  className?: string;
}

/** Standard case-study section: anchor target, eyebrow, heading and lead. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = "default",
  className,
}: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-16 py-16 md:py-24",
        tone === "muted" && "bg-secondary/40",
        className,
      )}
    >
      <div className="container-wide [&_.grid>*]:min-w-0">
        <header className="max-w-3xl mb-10 md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-balance"
          >
            {title}
          </h2>
          {lead && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {lead}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

interface PanelProps {
  children: ReactNode;
  className?: string;
}

/** Neutral card surface used across the case study. */
export function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/70 bg-card p-6 md:p-7 shadow-[var(--shadow-sm)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CalloutProps {
  title: string;
  children: ReactNode;
  className?: string;
}

/** Highlighted note for caveats and methodology remarks. */
export function Callout({ title, children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-xl border-l-4 border-primary bg-secondary/60 px-5 py-4 text-sm leading-relaxed",
        className,
      )}
    >
      <p className="font-semibold text-foreground mb-1">{title}</p>
      <div className="text-muted-foreground">{children}</div>
    </aside>
  );
}
