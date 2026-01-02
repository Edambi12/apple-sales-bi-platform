import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product, products } from "@/data/products";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Star, 
  Check, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    toast({
      title: "Ajouté au panier",
      description: `${product.name} (${selectedColor.name}) x${quantity} a été ajouté à votre panier.`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien du produit a été copié dans le presse-papiers.",
      });
    }
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="container-wide py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 animate-fade-in">
          <Link to="/produits" className="text-muted-foreground hover:text-foreground transition-colors">
            Produits
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        {/* Back button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/produits")}
          className="mb-6 gap-2 hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux produits
        </Button>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4 animate-fade-up">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/30 group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
                )}
                {product.isBestseller && (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">Bestseller</Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? "border-primary shadow-lg shadow-primary/20" 
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
            {/* Title & Rating */}
            <div>
              <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">{product.shortDescription}</p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? "fill-primary text-primary" 
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} avis)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold">
                {product.price.toLocaleString('fr-FR')} €
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString('fr-FR')} €
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <span className="font-medium">Couleur : {selectedColor.name}</span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name 
                        ? "border-primary ring-2 ring-primary/30 scale-110" 
                        : "border-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <span className="font-medium">Quantité</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-primary' : 'bg-destructive'}`} />
              <span className={product.inStock ? 'text-primary' : 'text-destructive'}>
                {product.inStock ? "En stock - Expédition sous 24h" : "Rupture de stock"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag className="w-5 h-5" />
                Ajouter au panier
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500 border-red-500/50" : ""}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="xl" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Livraison gratuite</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Garantie 2 ans</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Retour 30 jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div className="grid lg:grid-cols-2 gap-12 mt-20">
          {/* Description */}
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-2xl font-bold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h2 className="text-2xl font-bold">Caractéristiques</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-20 animate-fade-up">
          <h2 className="text-2xl font-bold mb-6">Spécifications techniques</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <span className="text-sm text-muted-foreground">{key}</span>
                <p className="font-medium mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 animate-fade-up">
            <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link 
                  key={relProduct.id}
                  to={`/produits/${relProduct.id}`}
                  className="group block rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square overflow-hidden bg-secondary/30">
                    <img 
                      src={relProduct.images[0]} 
                      alt={relProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {relProduct.name}
                    </h3>
                    <p className="text-lg font-bold mt-1">
                      {relProduct.price.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
