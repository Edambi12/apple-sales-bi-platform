import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navItems = [
  {
    label: "Produits",
    href: "/produits",
    megaMenu: [
      {
        title: "Smartphones",
        items: [
          { label: "Pro Max", href: "/produits/pro-max" },
          { label: "Pro", href: "/produits/pro" },
          { label: "Standard", href: "/produits/standard" },
        ],
      },
      {
        title: "Ordinateurs",
        items: [
          { label: "Laptop Pro", href: "/produits/laptop-pro" },
          { label: "Laptop Air", href: "/produits/laptop-air" },
          { label: "Desktop", href: "/produits/desktop" },
        ],
      },
      {
        title: "Tablettes",
        items: [
          { label: "Tablet Pro", href: "/produits/tablet-pro" },
          { label: "Tablet", href: "/produits/tablet" },
          { label: "Tablet Mini", href: "/produits/tablet-mini" },
        ],
      },
      {
        title: "Accessoires",
        items: [
          { label: "Écouteurs", href: "/produits/ecouteurs" },
          { label: "Montres", href: "/produits/montres" },
          { label: "Chargeurs", href: "/produits/chargeurs" },
        ],
      },
    ],
  },
  { label: "Boutiques", href: "/boutiques" },
  { label: "Support", href: "/support" },
  { label: "Entreprise", href: "/entreprise" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Analytics", href: "/analytics" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
  }, [location]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
            : "bg-background/95 backdrop-blur-md"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <img src={logo} alt="APPLE Demo" className="h-5 w-auto" />
              <span className="text-lg font-semibold tracking-tight hidden sm:inline">Demo</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.megaMenu && setActiveMegaMenu(item.label)
                  }
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "nav-link flex items-center gap-1",
                      location.pathname.startsWith(item.href) && "nav-active"
                    )}
                  >
                    {item.label}
                    {item.megaMenu && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          activeMegaMenu === item.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-accent rounded-full transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <Link
                to="/panier"
                className="p-2 hover:bg-accent rounded-full transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
              </Link>
              <Link
                to="/compte"
                className="p-2 hover:bg-accent rounded-full transition-colors"
              >
                <User className="w-4 h-4" />
              </Link>
              <button
                className="lg:hidden p-2 hover:bg-accent rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {activeMegaMenu && (
          <div
            className="absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-down"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-[1200px] mx-auto px-6 py-8">
              <div className="grid grid-cols-4 gap-8">
                {navItems
                  .find((item) => item.label === activeMegaMenu)
                  ?.megaMenu?.map((category) => (
                    <div key={category.title}>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        {category.title}
                      </h3>
                      <ul className="space-y-3">
                        {category.items.map((subItem) => (
                          <li key={subItem.label}>
                            <Link
                              to={subItem.href}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-12 lg:hidden animate-fade-in">
          <div className="p-6 space-y-6">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className="text-2xl font-semibold block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.megaMenu && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.megaMenu.map((category) => (
                      <div key={category.title} className="mb-4">
                        <span className="text-sm text-muted-foreground uppercase tracking-wider">
                          {category.title}
                        </span>
                        <div className="mt-2 space-y-2">
                          {category.items.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              className="block text-lg text-foreground/80"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
