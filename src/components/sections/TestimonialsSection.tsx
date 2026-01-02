import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { FadeInView } from "@/components/layout/PageTransition";

const testimonials = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Designer UX",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    content: "Une expérience d'achat exceptionnelle. Les produits sont d'une qualité remarquable et le service client est irréprochable. Je recommande vivement !",
    rating: 5,
    product: "MacBook Pro 16\"",
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Développeur Senior",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "La performance de l'iPhone 15 Pro dépasse toutes mes attentes. L'écosystème est parfaitement intégré et le support technique est excellent.",
    rating: 5,
    product: "iPhone 15 Pro",
  },
  {
    id: 3,
    name: "Sophie Bernard",
    role: "Directrice Marketing",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "L'Apple Watch a transformé ma routine quotidienne. Le suivi de santé est précis et l'intégration avec mes autres appareils est seamless.",
    rating: 5,
    product: "Apple Watch Ultra 2",
  },
  {
    id: 4,
    name: "Lucas Moreau",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "L'iPad Pro est devenu mon outil de travail principal. La puissance de la puce M2 et l'écran Liquid Retina sont tout simplement extraordinaires.",
    rating: 5,
    product: "iPad Pro 12,9\"",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-card border border-border/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-colored">
        {/* Quote Icon */}
        <div className="absolute -top-4 -left-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <Quote className="w-5 h-5 text-primary-foreground" />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star 
              key={i} 
              className="w-4 h-4 fill-primary text-primary transition-transform duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            />
          ))}
        </div>

        {/* Content */}
        <p className="text-foreground/90 leading-relaxed mb-6 text-sm">
          "{testimonial.content}"
        </p>

        {/* Product Badge */}
        <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-6">
          {testimonial.product}
        </span>

        {/* Author */}
        <div className="flex items-center gap-4">
          <motion.img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          />
          <div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        {/* Header */}
        <FadeInView className="text-center mb-16">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 fill-primary" />
            +2000 avis clients
          </motion.span>
          <h2 className="text-headline mb-4">
            Ce que nos <span className="text-primary">clients</span> disent
          </h2>
          <p className="text-body-large max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits et pourquoi ils nous font confiance.
          </p>
        </FadeInView>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div 
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">4.9</span>
            </div>
            <span className="text-sm">Note moyenne</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-sm">
            <span className="font-semibold text-foreground">98%</span> de clients satisfaits
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-sm">
            <span className="font-semibold text-foreground">24h</span> délai de réponse SAV
          </div>
        </motion.div>
      </div>
    </section>
  );
}