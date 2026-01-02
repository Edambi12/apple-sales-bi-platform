import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Palette, Battery } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Smartphone Pro Max",
    tagline: "Le summum de la technologie mobile",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    features: [
      { icon: Zap, label: "Puce A18 Bionic" },
      { icon: Palette, label: "Écran ProMotion" },
      { icon: Battery, label: "48h d'autonomie" },
    ],
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    id: 2,
    name: "Laptop Pro",
    tagline: "Puissance et portabilité redéfinies",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    features: [
      { icon: Zap, label: "Puce M4 Pro" },
      { icon: Palette, label: "Écran Liquid Retina XDR" },
      { icon: Battery, label: "22h d'autonomie" },
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    name: "Tablet Pro",
    tagline: "La créativité sans limites",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    features: [
      { icon: Zap, label: "Puce M2" },
      { icon: Palette, label: "Écran Ultra Retina XDR" },
      { icon: Battery, label: "10h d'autonomie" },
    ],
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];

export function ProductHighlights() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-headline mb-4">Nos produits phares</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Découvrez notre sélection de produits innovants, conçus pour
            répondre à vos besoins les plus exigeants.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-3xl overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative p-8">
                {/* Image */}
                <div className="aspect-square mb-8 rounded-2xl overflow-hidden bg-secondary/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-title mb-2">{product.name}</h3>
                    <p className="text-muted-foreground">{product.tagline}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 py-4">
                    {product.features.map((feature) => (
                      <div
                        key={feature.label}
                        className="flex items-center gap-3 text-sm"
                      >
                        <feature.icon className="w-4 h-4 text-primary" />
                        <span>{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="hero" size="sm" className="flex-1" asChild>
                      <Link to={`/produits/${product.id}`}>
                        En savoir plus
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="subtle" size="sm" asChild>
                      <Link to="/produits/comparer">Comparer</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Button variant="link" size="lg" asChild>
            <Link to="/produits" className="link-arrow text-lg">
              Voir tous les produits
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
