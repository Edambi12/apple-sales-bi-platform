import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const tags = ["Tous", "Produits", "Retail", "SAV", "Data"];

const articles = [
  {
    id: 1,
    title: "Lancement de la nouvelle génération de smartphones",
    excerpt:
      "Découvrez les innovations majeures de notre nouveau smartphone phare, avec une puce révolutionnaire et un appareil photo amélioré.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
    date: "15 décembre 2024",
    tag: "Produits",
    featured: true,
  },
  {
    id: 2,
    title: "Ouverture de 10 nouvelles boutiques en Europe",
    excerpt:
      "APPLE Demo poursuit son expansion avec l'ouverture de nouveaux espaces de vente en France, Allemagne et Italie.",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    date: "10 décembre 2024",
    tag: "Retail",
    featured: true,
  },
  {
    id: 3,
    title: "Nouveau programme de recyclage",
    excerpt:
      "Notre engagement pour l'environnement se renforce avec un programme de recyclage étendu pour tous nos produits.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    date: "5 décembre 2024",
    tag: "SAV",
    featured: false,
  },
  {
    id: 4,
    title: "Rapport annuel de performance",
    excerpt:
      "Les résultats de l'année confirment une croissance solide avec une augmentation de 12% du chiffre d'affaires.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    date: "1 décembre 2024",
    tag: "Data",
    featured: false,
  },
  {
    id: 5,
    title: "Innovation dans le service client",
    excerpt:
      "Découvrez notre nouvelle plateforme de support avec intelligence artificielle pour des réponses plus rapides.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    date: "28 novembre 2024",
    tag: "SAV",
    featured: false,
  },
  {
    id: 6,
    title: "Partenariat stratégique annoncé",
    excerpt:
      "APPLE Demo s'associe à des leaders technologiques pour développer de nouvelles solutions innovantes.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    date: "20 novembre 2024",
    tag: "Produits",
    featured: false,
  },
];

const Newsroom = () => {
  const [selectedTag, setSelectedTag] = useState("Tous");

  const filteredArticles = articles.filter(
    (article) => selectedTag === "Tous" || article.tag === selectedTag
  );

  const featuredArticles = filteredArticles.filter((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide text-center">
          <h1 className="text-display mb-6">Newsroom</h1>
          <p className="text-body-large max-w-2xl mx-auto">
            Toute l'actualité d'APPLE Demo : lancements produits, annonces
            corporate et dernières innovations.
          </p>
        </div>
      </section>

      {/* Tags Filter */}
      <section className="py-6 border-b border-border">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="section-padding">
          <div className="container-wide">
            <h2 className="text-title mb-8">À la une</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/newsroom/${article.id}`}
                  className="group block rounded-2xl overflow-hidden bg-card hover-lift"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {article.tag}
                      </span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <h2 className="text-title mb-8">Toutes les actualités</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Link
                key={article.id}
                to={`/newsroom/${article.id}`}
                className="group block rounded-2xl overflow-hidden bg-background hover-lift"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                      {article.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucun article trouvé pour cette catégorie.
              </p>
            </div>
          )}

          {/* View All */}
          <div className="text-center mt-12">
            <Button variant="hero-outline" size="lg" asChild>
              <Link to="/newsroom/communiques">
                Voir les communiqués de presse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Newsroom;
