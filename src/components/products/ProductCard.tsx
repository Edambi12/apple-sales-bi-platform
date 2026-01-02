import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link 
      to={`/produits/${product.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:shadow-xl hover:border-primary/20 hover:-translate-y-2">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">
              Nouveau
            </Badge>
          )}
          {product.isBestseller && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Bestseller
            </Badge>
          )}
          {discount && (
            <Badge variant="destructive">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category */}
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            {product.category === "phones" && "Téléphones"}
            {product.category === "laptops" && "Ordinateurs"}
            {product.category === "tablets" && "Tablettes"}
            {product.category === "audio" && "Audio"}
            {product.category === "wearables" && "Montres"}
            {product.category === "accessories" && "Accessoires"}
          </p>

          {/* Name */}
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) 
                      ? "fill-primary text-primary" 
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
              {product.colors.slice(0, 4).map((color) => (
                <div 
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-border/50"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-xl font-bold text-foreground">
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
            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-primary' : 'bg-destructive'}`} />
            <span className="text-xs text-muted-foreground">
              {product.inStock ? "En stock" : "Rupture de stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
