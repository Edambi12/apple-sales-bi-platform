import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = {
  "Acheter et découvrir": [
    { label: "Boutique", href: "/boutiques" },
    { label: "Smartphones", href: "/produits?category=smartphones" },
    { label: "Ordinateurs", href: "/produits?category=ordinateurs" },
    { label: "Tablettes", href: "/produits?category=tablettes" },
    { label: "Accessoires", href: "/produits?category=accessoires" },
  ],
  Services: [
    { label: "Support", href: "/support" },
    { label: "SAV", href: "/support/sav" },
    { label: "Garantie", href: "/support/garantie" },
    { label: "Réparation", href: "/support/reparation" },
  ],
  Entreprise: [
    { label: "À propos", href: "/entreprise" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Newsroom", href: "/newsroom" },
    { label: "Contact", href: "/contact" },
  ],
  "Valeurs APPLE Demo": [
    { label: "Engagement qualité", href: "/entreprise#qualite" },
    { label: "Innovation", href: "/entreprise#innovation" },
    { label: "Durabilité", href: "/entreprise#durabilite" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-foreground mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <img src={logo} alt="APPLE Demo" className="h-4 w-auto opacity-50" />
              Copyright © 2024 APPLE Demo. Tous droits réservés.
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Projet de démonstration — Aucune affiliation avec Apple Inc.
            </p>
            <div className="flex gap-4">
              <Link
                to="/confidentialite"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                to="/conditions"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Conditions d'utilisation
              </Link>
              <Link
                to="/mentions-legales"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
