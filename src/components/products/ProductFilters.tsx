import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid3X3, Smartphone, Laptop, Tablet, Headphones, Watch, Cable } from "lucide-react";

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Grid3X3: <Grid3X3 className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Laptop: <Laptop className="w-4 h-4" />,
  Tablet: <Tablet className="w-4 h-4" />,
  Headphones: <Headphones className="w-4 h-4" />,
  Watch: <Watch className="w-4 h-4" />,
  Cable: <Cable className="w-4 h-4" />,
};

export function ProductFilters({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Rechercher un produit..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-secondary/50 border-border/50 focus:bg-background transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`gap-2 transition-all duration-300 ${
              selectedCategory === category.id 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                : "hover:bg-secondary hover:border-primary/30"
            }`}
          >
            {iconMap[category.icon]}
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
