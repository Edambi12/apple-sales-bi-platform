import { cn } from "@/lib/utils";

/** Original project mark (three rising bars) — deliberately not Apple's logo. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5 text-primary", className)}>
      <rect x="3" y="12" width="4.5" height="9" rx="1.5" fill="currentColor" opacity="0.45" />
      <rect x="9.75" y="7" width="4.5" height="14" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="16.5" y="3" width="4.5" height="18" rx="1.5" fill="currentColor" />
    </svg>
  );
}
