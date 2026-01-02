import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

function FloatingShape({ 
  className, 
  delay = 0, 
  duration = 20 
}: { 
  className: string; 
  delay?: number; 
  duration?: number;
}) {
  return (
    <motion.div 
      className={`absolute ${className}`}
      animate={{
        y: [0, -20, -10, -25, 0],
        rotate: [0, 5, -3, 3, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function MorphingBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Morphing Blobs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MorphingBlob 
          className="top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/5 blur-3xl"
          delay={0}
        />
        <MorphingBlob 
          className="bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-accent/10 to-primary/5 blur-3xl"
          delay={2}
        />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large shapes */}
        <FloatingShape 
          className="top-[10%] left-[5%] w-32 h-32 border-2 border-primary/20 rounded-full"
          delay={0}
          duration={25}
        />
        <FloatingShape 
          className="top-[20%] right-[10%] w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rotate-45 rounded-lg"
          delay={2}
          duration={20}
        />
        <FloatingShape 
          className="bottom-[30%] left-[8%] w-16 h-16 border border-accent/30 rotate-12 rounded-md"
          delay={4}
          duration={22}
        />
        <FloatingShape 
          className="top-[40%] right-[5%] w-20 h-20 border-2 border-primary/15 rounded-full"
          delay={1}
          duration={28}
        />
        <FloatingShape 
          className="bottom-[20%] right-[15%] w-28 h-28 bg-gradient-to-tr from-accent/5 to-primary/10 rounded-3xl rotate-45"
          delay={3}
          duration={24}
        />
        
        {/* Small particles */}
        <FloatingShape 
          className="top-[15%] left-[20%] w-4 h-4 bg-primary/30 rounded-full blur-[1px]"
          delay={0}
          duration={15}
        />
        <FloatingShape 
          className="top-[60%] left-[15%] w-3 h-3 bg-accent/40 rounded-full"
          delay={2}
          duration={18}
        />
        <FloatingShape 
          className="top-[25%] right-[25%] w-5 h-5 bg-primary/20 rotate-45"
          delay={1}
          duration={16}
        />
        <FloatingShape 
          className="bottom-[40%] right-[8%] w-4 h-4 bg-accent/30 rounded-full blur-[1px]"
          delay={3}
          duration={20}
        />
        <FloatingShape 
          className="top-[70%] left-[30%] w-3 h-3 border border-primary/40 rotate-45"
          delay={4}
          duration={17}
        />
        <FloatingShape 
          className="top-[35%] left-[40%] w-2 h-2 bg-primary/50 rounded-full"
          delay={1.5}
          duration={14}
        />
        <FloatingShape 
          className="bottom-[25%] left-[45%] w-6 h-6 border border-accent/25 rounded-full"
          delay={2.5}
          duration={22}
        />
        <FloatingShape 
          className="top-[50%] right-[30%] w-4 h-4 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full"
          delay={0.5}
          duration={19}
        />
        
        {/* Hexagons */}
        <motion.div 
          className="absolute top-[45%] left-[12%] w-12 h-12 bg-primary/10"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          animate={{
            y: [0, -15, -8, -20, 0],
            rotate: [0, 10, -5, 8, 0],
          }}
          transition={{
            duration: 23,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-[35%] right-[20%] w-8 h-8 border border-accent/30"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          }}
          animate={{
            y: [0, -12, -6, -18, 0],
            rotate: [0, -8, 5, -5, 0],
          }}
          transition={{
            duration: 21,
            delay: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-wide relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo with animation */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img 
              src={logo} 
              alt="APPLE Demo" 
              className="h-20 md:h-28 w-auto drop-shadow-lg"
            />
          </motion.div>

          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Nouveauté 2024
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            L'innovation
            <br />
            <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer">
              à votre service
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-body-large max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Découvrez une nouvelle génération de produits conçus pour
            transformer votre quotidien. Performance, élégance et innovation
            réunies.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero" size="xl" asChild className="group">
                <Link to="/produits">
                  Découvrir
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/boutiques">Voir les boutiques</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div 
            className="grid grid-cols-3 gap-8 pt-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { value: "50+", label: "Produits" },
              { value: "120", label: "Boutiques" },
              { value: "2M+", label: "Clients" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center group cursor-default"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2 cursor-pointer hover:border-primary/50 transition-colors duration-300"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-foreground/40 rounded-full"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}