import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <motion.div 
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-3xl">🔍</span>
        </div>
        <p className="text-lg text-muted-foreground">
          Aucun produit trouvé.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Essayez de modifier vos critères de recherche.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08
          }
        }
      }}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  );
}