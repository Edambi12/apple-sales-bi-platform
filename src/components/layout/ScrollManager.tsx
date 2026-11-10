import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the hash target after navigation (e.g. "/#kpis"), or back to the
 * top of the page when the route changes without a hash.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Wait one frame so lazily rendered sections exist before scrolling.
    const frame = window.requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
