import type { RankedValue } from "@/data/caseStudy";

interface BarListProps {
  /** Accessible name describing what the chart shows. */
  label: string;
  data: RankedValue[];
  formatValue: (value: number) => string;
  /** Show each row's share of total next to the value when available. */
  showShare?: boolean;
  /** Labels of rows to draw in a lighter tone (e.g. a partial period). */
  muted?: string[];
}

/**
 * Ranked horizontal bar list. One hue encodes one measure; every row carries
 * its label and value as text, so the chart never relies on colour alone and
 * reads correctly with a screen reader.
 */
export function BarList({ label, data, formatValue, showShare, muted = [] }: BarListProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <ul aria-label={label} className="space-y-2.5">
      {data.map((row) => {
        const width = `${Math.max((row.value / max) * 100, 1.5)}%`;
        const isMuted = muted.includes(row.label);
        return (
          <li
            key={row.label}
            className="group grid grid-cols-[minmax(5.5rem,9.5rem)_1fr_auto] items-center gap-3 text-sm"
          >
            <span className="truncate text-foreground" title={row.label}>
              {row.label}
            </span>
            <span className="h-3.5 rounded-r bg-muted/70" aria-hidden="true">
              <span
                className={
                  "block h-full rounded-r transition-opacity duration-200 group-hover:opacity-80 " +
                  (isMuted
                    ? "bg-primary/40 [background-image:repeating-linear-gradient(135deg,transparent_0_4px,hsl(var(--background)/0.55)_4px_6px)]"
                    : "bg-primary")
                }
                style={{ width }}
              />
            </span>
            <span className="tabular-nums text-right text-foreground font-medium whitespace-nowrap">
              {formatValue(row.value)}
              {showShare && row.share !== undefined && (
                <span className="ml-2 font-normal text-muted-foreground">
                  {(row.share * 100).toFixed(1)}%
                </span>
              )}
            </span>
            {row.note && (
              <span className="col-start-2 col-span-2 -mt-1.5 text-xs text-muted-foreground">
                {row.note}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
