import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-narrow relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Explorez les données
        </div>

        {/* Title */}
        <h2 className="text-headline mb-6">
          Découvrez notre portail
          <br />
          <span className="text-primary">Analytics</span>
        </h2>

        {/* Description */}
        <p className="text-body-large max-w-xl mx-auto mb-10">
          Accédez à des tableaux de bord interactifs pour visualiser les
          performances de l'entreprise en temps réel.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="xl" asChild>
            <Link to="/analytics">
              Accéder au portail BI
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="hero-outline" size="xl" asChild>
            <Link to="/entreprise">En savoir plus</Link>
          </Button>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Dashboards Power BI
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Données en temps réel
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            Rapports personnalisés
          </span>
        </div>
      </div>
    </section>
  );
}
