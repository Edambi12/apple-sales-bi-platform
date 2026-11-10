import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LINKS } from "@/config/links";
import { BrandMark } from "./BrandMark";

const CASE_STUDY_LINKS = [
  { label: "Summary", href: "/#summary" },
  { label: "Data", href: "/#data" },
  { label: "Preparation", href: "/#preparation" },
  { label: "Model", href: "/#model" },
  { label: "KPIs", href: "/#kpis" },
  { label: "Insights", href: "/#insights" },
  { label: "Docs", href: "/#docs" },
] as const;

/** Retail demo pages: fictional products, stores, support and checkout. */
const STORE_LINKS = [
  { label: "Produits", href: "/produits" },
  { label: "Boutiques", href: "/boutiques" },
  { label: "Support", href: "/support" },
  { label: "Panier", href: "/panier" },
] as const;

const STORE_PATHS = STORE_LINKS.map((l) => l.href);

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const inStore = STORE_PATHS.some((p) => location.pathname.startsWith(p));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/50"
            : "bg-background/90 backdrop-blur-xl",
        )}
      >
        <nav aria-label="Main" className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-12 gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-sm hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <BrandMark />
              <span className="text-sm font-semibold tracking-tight whitespace-nowrap">
                Retail Sales Analytics
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-6">
              {CASE_STUDY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "nav-link py-2",
                      location.pathname === "/" && `/${location.hash}` === item.href && "nav-active",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      "nav-link flex items-center gap-1 py-2 after:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
                      inStore && "nav-active",
                    )}
                  >
                    Retail demo
                    <ChevronDown className="h-3 w-3" aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      Fictional sample pages (in French)
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {STORE_LINKS.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link to={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>

            <div className="flex items-center gap-1.5">
              {inStore && (
                <Link
                  to="/panier"
                  aria-label="Panier"
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
              <Button asChild size="sm" className="hidden sm:inline-flex h-8">
                <Link to="/analytics">
                  <BarChart3 aria-hidden="true" />
                  Live dashboard
                </Link>
              </Button>
              <button
                type="button"
                className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Menu className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-background pt-14 lg:hidden overflow-y-auto animate-fade-in"
        >
          <nav aria-label="Mobile" className="p-6 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                Case study
              </p>
              <ul className="space-y-1">
                {CASE_STUDY_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-xl font-semibold hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link to="/analytics">
                  <BarChart3 aria-hidden="true" />
                  Live dashboard
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={LINKS.powerBiReport} target="_blank" rel="noopener noreferrer">
                  Open in Power BI
                </a>
              </Button>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Retail demo (fictional, in French)
              </p>
              <ul className="grid grid-cols-2 gap-x-4">
                {STORE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="block py-2 text-base text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
