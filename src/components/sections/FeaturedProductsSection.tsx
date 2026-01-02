import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInView } from "@/components/layout/PageTransition";

const featuredProducts = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    tagline: "Titane. Action.",
    description: "Le smartphone le plus avancé jamais créé.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=800&fit=crop",
    color: "from-primary/20 to-accent/20",
    price: "1 229 €",
  },
  {
    id: "macbook-pro-16",
    name: "MacBook Pro 16\"",
    tagline: "Puissance maximale.",
    description: "La puce M3 Pro pour des performances extraordinaires.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=800&fit=crop",
    color: "from-accent/20 to-primary/20",
    price: "2 999 €",
  },
  {
    id: "apple-watch-ultra",
    name: "Apple Watch Ultra 2",
    tagline: "Sans limites.",
    description: "La montre la plus robuste et performante.",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=800&fit=crop",
    color: "from-primary/20 to-accent/20",
    price: "899 €",
  },
];

function ProductShowcase({ product, index }: { product: typeof featuredProducts[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isReversed = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <motion.div 
        className={`space-y-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
        style={{ opacity }}
      >
        <motion.span 
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Sparkles className="w-4 h-4" />
          Nouveau
        </motion.span>
        
        <motion.h3 
          className="text-4xl lg:text-5xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {product.name}
        </motion.h3>
        
        <motion.p 
          className="text-2xl lg:text-3xl font-semibold text-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {product.tagline}
        </motion.p>
        
        <motion.p 
          className="text-lg text-muted-foreground max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {product.description}
        </motion.p>
        
        <motion.div 
          className="flex items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-3xl font-bold">{product.price}</span>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="hero" size="lg" asChild className="group">
              <Link to={`/produits/${product.id}`}>
                Découvrir
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div 
        className={`relative ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
        style={{ y, scale }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-3xl blur-3xl opacity-50`} />
        <motion.div 
          className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-secondary/30"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedProductsSection() {
  return (
    <section className="py-24 lg:py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container-wide relative z-10">
        {/* Header */}
        <FadeInView className="text-center mb-24">
          <h2 className="text-headline mb-4">
            Produits <span className="text-gradient bg-gradient-to-r from-primary to-accent">vedettes</span>
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de produits phares, conçus pour sublimer votre quotidien.
          </p>
        </FadeInView>

        {/* Products Showcase */}
        <div className="space-y-32 lg:space-y-48">
          {featuredProducts.map((product, index) => (
            <ProductShowcase key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}