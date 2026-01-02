import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-border/30 shadow-sm"
            : "bg-background/90 backdrop-blur-xl"
        )}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-70 transition-all duration-300 group"
            >
              <img 
                src={logo} 
                alt="APPLE Demo" 
                className="h-5 w-auto transition-transform duration-300 group-hover:scale-110" 
              />
              <span className="text-lg font-semibold tracking-tight hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground group-hover:from-primary group-hover:to-accent transition-all duration-300">
                Demo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  className="relative"
                  onMouseEnter={() =>
                    item.megaMenu && setActiveMegaMenu(item.label)
                  }
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "nav-link flex items-center gap-1 py-2",
                      location.pathname.startsWith(item.href) && "nav-active text-primary"
                    )}
                  >
                    {item.label}
                    {item.megaMenu && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-300",
                          activeMegaMenu === item.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-secondary rounded-full transition-colors duration-300"
              >
                <Search className="w-4 h-4" />
              </motion.button>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/panier"
                  className="p-2 hover:bg-secondary rounded-full transition-colors duration-300 relative block"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">
                    2
                  </span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/compte"
                  className="p-2 hover:bg-secondary rounded-full transition-colors duration-300 block"
                >
                  <User className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 hover:bg-secondary rounded-full transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border/50 shadow-lg"
              onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div className="max-w-[1200px] mx-auto px-6 py-8">
                <div className="grid grid-cols-4 gap-8">
                  {navItems
                    .find((item) => item.label === activeMegaMenu)
                    ?.megaMenu?.map((category, catIndex) => (
                      <motion.div 
                        key={category.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: catIndex * 0.05 }}
                      >
                        <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                          {category.title}
                        </h3>
                        <ul className="space-y-3">
                          {category.items.map((subItem, subIndex) => (
                            <motion.li 
                              key={subItem.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: catIndex * 0.05 + subIndex * 0.03 }}
                            >
                              <Link
                                to={subItem.href}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                              >
                                <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3" />
                                {subItem.label}
                              </Link>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-14 lg:hidden overflow-y-auto"
          >
            <motion.div 
              className="p-6 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.15 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "text-2xl font-semibold block py-2 transition-colors duration-300",
                      location.pathname.startsWith(item.href) 
                        ? "text-primary" 
                        : "text-foreground hover:text-primary"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.megaMenu && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-primary/20">
                      {item.megaMenu.map((category) => (
                        <div key={category.title} className="mb-4">
                          <span className="text-sm text-primary uppercase tracking-wider font-medium">
                            {category.title}
                          </span>
                          <div className="mt-2 space-y-2">
                            {category.items.map((subItem) => (
                              <Link
                                key={subItem.label}
                                to={subItem.href}
                                className="block text-lg text-foreground/70 hover:text-foreground transition-colors duration-300"
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
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}