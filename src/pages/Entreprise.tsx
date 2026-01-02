import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Users,
  Lightbulb,
  Shield,
  Leaf,
  Award,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "120+", label: "Boutiques dans le monde" },
  { value: "50+", label: "Pays couverts" },
  { value: "15K+", label: "Collaborateurs" },
  { value: "2M+", label: "Clients satisfaits" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Nous repoussons constamment les limites de la technologie pour créer des produits qui transforment le quotidien de nos utilisateurs.",
  },
  {
    icon: Shield,
    title: "Qualité",
    description:
      "Chaque produit est conçu et testé selon les standards les plus exigeants pour garantir une expérience utilisateur exceptionnelle.",
  },
  {
    icon: Leaf,
    title: "Durabilité",
    description:
      "Nous nous engageons pour un avenir plus vert avec des matériaux recyclés et une chaîne d'approvisionnement responsable.",
  },
  {
    icon: Users,
    title: "Inclusivité",
    description:
      "Nos produits sont conçus pour être accessibles à tous, quelles que soient leurs capacités ou leur situation.",
  },
];

const Entreprise = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-wide text-center">
          <h1 className="text-display mb-6">Notre vision</h1>
          <p className="text-body-large max-w-3xl mx-auto">
            Chez APPLE Demo, nous croyons que la technologie doit enrichir la
            vie des gens. Notre mission est de créer des produits innovants qui
            allient performance, design et respect de l'environnement.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-semibold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" id="innovation">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-headline mb-4">Nos valeurs</h2>
            <p className="text-body-large max-w-2xl mx-auto">
              Les principes qui guident chacune de nos décisions et façonnent
              notre culture d'entreprise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-2xl bg-card border border-border hover-lift"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-headline mb-6">Présence internationale</h2>
              <p className="text-lg opacity-80 mb-8">
                Avec plus de 120 boutiques réparties dans 50 pays, nous sommes
                présents là où nos clients ont besoin de nous. Notre réseau
                mondial nous permet d'offrir un service de proximité et une
                expérience cohérente partout dans le monde.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-background/10 text-background border-background/20 hover:bg-background/20"
                  asChild
                >
                  <Link to="/boutiques">
                    Trouver une boutique
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-background/10 flex items-center justify-center">
                <Globe className="w-32 h-32 opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="section-padding" id="qualite">
        <div className="container-narrow text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Award className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-headline mb-6">Notre engagement</h2>
          <p className="text-body-large mb-8">
            Nous nous engageons à fournir des produits de la plus haute qualité,
            un service client exceptionnel et une innovation responsable. Notre
            objectif est de créer une valeur durable pour nos clients, nos
            employés et notre planète.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/carrieres">
                Rejoignez-nous
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/newsroom">Actualités</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Entreprise;
