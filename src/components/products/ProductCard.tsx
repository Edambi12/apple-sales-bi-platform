import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <Link 
        to={`/produits/${product.id}`}
        className="group block"
      >
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 ease-out hover:shadow-colored hover:border-primary/30 hover:-translate-y-3">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground shadow-sm animate-pulse-soft">
                Nouveau
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground shadow-sm">
                Bestseller
              </Badge>
            )}
            {discount && (
              <Badge variant="destructive" className="shadow-sm">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Quick view button */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg">
              <ArrowUpRight className="w-4 h-4 text-foreground" />
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/50 to-muted/30">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Bottom gradient for content readability */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/10 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Category */}
            <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-accent">
              {product.category === "phones" && "Téléphones"}
              {product.category === "laptops" && "Ordinateurs"}
              {product.category === "tablets" && "Tablettes"}
              {product.category === "audio" && "Audio"}
              {product.category === "wearables" && "Montres"}
              {product.category === "accessories" && "Accessoires"}
            </p>

            {/* Name */}
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>

            {/* Short description */}
            <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 group-hover:text-foreground/70 transition-colors duration-300">
              {product.shortDescription}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      i < Math.floor(product.rating) 
                        ? "fill-primary text-primary group-hover:fill-accent group-hover:text-accent" 
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Colors */}
            {product.colors.length > 1 && (
              <div className="flex items-center gap-1.5 mt-3">
                {product.colors.slice(0, 4).map((color, colorIndex) => (
                  <div 
                    key={color.name}
                    className="w-4 h-4 rounded-full border-2 border-background shadow-sm ring-1 ring-border/50 transition-transform duration-300 hover:scale-125"
                    style={{ 
                      backgroundColor: color.hex,
                      transitionDelay: `${colorIndex * 50}ms`
                    }}
                    title={color.name}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-muted-foreground ml-1">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {product.price.toLocaleString('fr-FR')} €
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString('fr-FR')} €
                </span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-1.5 mt-3">
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${product.inStock ? 'bg-primary animate-pulse' : 'bg-destructive'}`} />
              <span className="text-xs text-muted-foreground">
                {product.inStock ? "En stock" : "Rupture de stock"}
              </span>
            </div>
          </div>

          {/* Bottom accent line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </Link>
    </motion.div>
  );
}