import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
    <div 
      className={`absolute ${className}`}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    />
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large shapes */}
        <FloatingShape 
          className="top-[10%] left-[5%] w-32 h-32 border-2 border-primary/20 rounded-full"
          delay={0}
          duration={25}
        />
        <FloatingShape 
          className="top-[20%] right-[10%] w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rotate-45"
          delay={2}
          duration={20}
        />
        <FloatingShape 
          className="bottom-[30%] left-[8%] w-16 h-16 border border-accent/30 rotate-12"
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
        
        {/* Hexagons using clip-path */}
        <div 
          className="absolute top-[45%] left-[12%] w-12 h-12 bg-primary/10"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            animation: 'float 23s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute bottom-[35%] right-[20%] w-8 h-8 border border-accent/30"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            animation: 'float 21s ease-in-out infinite',
            animationDelay: '3s'
          }}
        />
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-wide relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo with animation */}
          <div className="flex justify-center animate-scale-in">
            <img 
              src={logo} 
              alt="APPLE Demo" 
              className="h-20 md:h-28 w-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            />
          </div>

          {/* Badge */}
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Nouveauté 2024
            </span>
          </div>

          {/* Title */}
          <h1 className="text-display animate-fade-up" style={{ animationDelay: "300ms" }}>
            L'innovation
            <br />
            <span className="text-primary">à votre service</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "400ms" }}>
            Découvrez une nouvelle génération de produits conçus pour
            transformer votre quotidien. Performance, élégance et innovation
            réunies.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "500ms" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/produits">
                Découvrir
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/boutiques">Voir les boutiques</Link>
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "600ms" }}>
            <div className="text-center">
              <div className="text-3xl font-semibold">50+</div>
              <div className="text-sm text-muted-foreground">Produits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold">120</div>
              <div className="text-sm text-muted-foreground">Boutiques</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-semibold">2M+</div>
              <div className="text-sm text-muted-foreground">Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-foreground/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
