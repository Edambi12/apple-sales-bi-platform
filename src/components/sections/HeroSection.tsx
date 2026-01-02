import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Nouveauté 2024
            </span>
          </div>

          {/* Title */}
          <h1 className="text-display animate-fade-up delay-100">
            L'innovation
            <br />
            <span className="text-primary">à votre service</span>
          </h1>

          {/* Subtitle */}
          <p className="text-body-large max-w-2xl mx-auto animate-fade-up delay-200">
            Découvrez une nouvelle génération de produits conçus pour
            transformer votre quotidien. Performance, élégance et innovation
            réunies.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
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
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-xl mx-auto animate-fade-up delay-400">
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
