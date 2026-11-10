import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Hide the trailing arrow icon (e.g. inside buttons that bring their own). */
  bare?: boolean;
}

/** External link that opens in a new tab safely and announces it. */
export function ExternalLink({ href, children, className, bare }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        !bare &&
          "inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className,
      )}
    >
      {children}
      {!bare && <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
