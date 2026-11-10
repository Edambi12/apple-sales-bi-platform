import { useEffect, useState } from "react";
import { BarChart3, ExternalLink as ExternalLinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LINKS } from "@/config/links";

interface PowerBIEmbedProps {
  title?: string;
  /** Load the report only after the visitor asks for it (keeps the page light). */
  deferred?: boolean;
}

const LOAD_HINT_DELAY_MS = 12_000;

/**
 * Embeds the published Power BI report. An iframe cannot report cross-origin
 * failures, so a direct link is always visible and a hint appears if loading
 * takes unusually long.
 */
export function PowerBIEmbed({
  title = "Apple Retail Sales Analytics — published Power BI report",
  deferred = false,
}: PowerBIEmbedProps) {
  const [requested, setRequested] = useState(!deferred);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!requested || loaded) return;
    const timer = window.setTimeout(() => setSlow(true), LOAD_HINT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [requested, loaded]);

  return (
    <div>
      <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden border border-border bg-secondary/30">
        {!requested ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <BarChart3 className="h-10 w-10 text-primary" aria-hidden="true" />
            <p className="max-w-sm text-sm text-muted-foreground">
              The interactive report is hosted on the Power BI service. Load it
              here or open it in a new tab.
            </p>
            <Button onClick={() => setRequested(true)}>Load interactive report</Button>
          </div>
        ) : (
          <>
            {!loaded && (
              <div
                role="status"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted-foreground"
              >
                <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden="true" />
                <p>Loading the Power BI report…</p>
                {slow && (
                  <p className="max-w-sm">
                    This is taking longer than expected. Your network may block
                    embedded content — use the direct link below.
                  </p>
                )}
              </div>
            )}
            <iframe
              src={LINKS.powerBiReport}
              title={title}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </>
        )}
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground max-w-xl">
          The report is in French, as originally built. Best viewed on a desktop
          screen; on a phone, open it in a new tab.
        </p>
        <Button asChild variant="outline" size="sm">
          <a href={LINKS.powerBiReport} target="_blank" rel="noopener noreferrer">
            Open report in a new tab
            <ExternalLinkIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
