import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductDetail } from "@/components/products/ProductDetail";
import { products, getProductsByCategory, searchProducts, getProductById } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

const Produits = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("nouveaute");

  // If viewing a specific product
  const selectedProduct = id ? getProductById(id) : null;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = selectedCategory === "all" 
      ? products 
      : getProductsByCategory(selectedCategory);

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === "prix-asc") return a.price - b.price;
      if (sortBy === "prix-desc") return b.price - a.price;
      if (sortBy === "nouveaute") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Show product detail page
  if (selectedProduct) {
    return <ProductDetail product={selectedProduct} />;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container-wide relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {products.length} produits disponibles
          </span>
          <h1 className="text-display mb-6 animate-fade-up">
            Nos <span className="text-primary">produits</span>
          </h1>
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "100ms" }}>
            Découvrez notre gamme complète de produits innovants conçus pour
            transformer votre quotidien.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-12 z-30 bg-background/95 backdrop-blur-md border-b border-border py-6">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''}
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-44 bg-secondary/50 border-border/50">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nouveaute">Nouveautés</SelectItem>
                  <SelectItem value="prix-asc">Prix croissant</SelectItem>
                  <SelectItem value="prix-desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Meilleures notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <ProductGrid products={filteredProducts} />
        </div>
      </section>
    </Layout>
  );
};

export default Produits;
