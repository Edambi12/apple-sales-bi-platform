import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, Grid3X3, List, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "Tous",
  "Smartphones",
  "Ordinateurs",
  "Tablettes",
  "Accessoires",
];

const products = [
  {
    id: 1,
    name: "Smartphone Pro Max",
    category: "Smartphones",
    price: 1299,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    badge: "Nouveau",
    year: 2024,
  },
  {
    id: 2,
    name: "Smartphone Pro",
    category: "Smartphones",
    price: 1099,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    badge: null,
    year: 2024,
  },
  {
    id: 3,
    name: "Laptop Pro 16\"",
    category: "Ordinateurs",
    price: 2499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    badge: "Populaire",
    year: 2024,
  },
  {
    id: 4,
    name: "Laptop Air 15\"",
    category: "Ordinateurs",
    price: 1499,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    badge: null,
    year: 2023,
  },
  {
    id: 5,
    name: "Tablet Pro 12.9\"",
    category: "Tablettes",
    price: 1199,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    badge: "Nouveau",
    year: 2024,
  },
  {
    id: 6,
    name: "Tablet 10.9\"",
    category: "Tablettes",
    price: 599,
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&q=80",
    badge: null,
    year: 2023,
  },
  {
    id: 7,
    name: "Écouteurs Pro",
    category: "Accessoires",
    price: 299,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    badge: null,
    year: 2024,
  },
  {
    id: 8,
    name: "Montre Series 9",
    category: "Accessoires",
    price: 449,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    badge: "Populaire",
    year: 2024,
  },
];

const Produits = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("nouveaute");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Tous" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "prix-asc") return a.price - b.price;
      if (sortBy === "prix-desc") return b.price - a.price;
      if (sortBy === "nouveaute") return b.year - a.year;
      return 0;
    });

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide text-center">
          <h1 className="text-display mb-6">Nos produits</h1>
          <p className="text-body-large max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits innovants conçus pour
            vous accompagner au quotidien.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-12 z-30 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex gap-2 items-center">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nouveaute">Nouveauté</SelectItem>
                  <SelectItem value="prix-asc">Prix croissant</SelectItem>
                  <SelectItem value="prix-desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div
            className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/produits/${product.id}`}
                className={`group block bg-card rounded-2xl overflow-hidden hover-lift transition-all ${
                  viewMode === "list" ? "flex items-center gap-6 p-4" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden bg-secondary/50 ${
                    viewMode === "list" ? "w-32 h-32 rounded-xl" : "aspect-square"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className={viewMode === "list" ? "flex-1" : "p-5"}>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-semibold">
                      {product.price.toLocaleString("fr-FR")} €
                    </span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm">
                      Voir <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Aucun produit trouvé.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Produits;
