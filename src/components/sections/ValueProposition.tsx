import { Lightbulb, Heart, Shield, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInView } from "@/components/layout/PageTransition";

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

function ValueCard({ value, index }: { value: typeof values[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3 } 
      }}
      className="group relative"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 rounded-3xl bg-background border border-border/50 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-colored h-full">
        {/* Icon */}
        <motion.div 
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-500"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <value.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
          {value.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {value.description}
        </p>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
      </div>
    </motion.div>
  );
}

export function ValueProposition() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/20 to-background" />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-wide relative z-10">
        {/* Section Header */}
        <FadeInView className="text-center mb-16">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Nos valeurs
          </motion.span>
          <h2 className="text-headline mb-4">
            Notre <span className="text-primary">valeur ajoutée</span>
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Ce qui nous distingue et fait de nous le partenaire idéal pour vos
            besoins technologiques.
          </p>
        </FadeInView>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}