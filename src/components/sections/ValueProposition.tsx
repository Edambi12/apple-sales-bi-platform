import { Lightbulb, Heart, Shield, Headphones } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Une recherche et développement constante pour repousser les limites de la technologie et offrir des produits toujours plus performants.",
  },
  {
    icon: Heart,
    title: "Expérience client",
    description:
      "Un parcours client fluide et personnalisé, de la découverte à l'achat, en passant par le service après-vente.",
  },
  {
    icon: Shield,
    title: "Sécurité & Confidentialité",
    description:
      "La protection de vos données est notre priorité absolue. Des protocoles de sécurité de pointe pour une tranquillité d'esprit totale.",
  },
  {
    icon: Headphones,
    title: "SAV & Qualité de service",
    description:
      "Un support réactif et expert, disponible pour vous accompagner à chaque étape de votre expérience.",
  },
];

export function ValueProposition() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-headline mb-4">Notre valeur ajoutée</h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Ce qui nous distingue et fait de nous le partenaire idéal pour vos
            besoins technologiques.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group p-8 rounded-2xl bg-background hover:bg-card transition-all duration-300 hover-lift hover-glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <value.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
