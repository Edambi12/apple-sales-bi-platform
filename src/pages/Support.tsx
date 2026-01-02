import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  FileText,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const faqItems = [
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Connectez-vous à votre espace client et accédez à la section 'Mes commandes'. Vous y trouverez le statut de chaque commande ainsi que le suivi de livraison.",
  },
  {
    question: "Quelle est la politique de retour ?",
    answer:
      "Vous disposez de 14 jours après réception pour retourner un produit. Le produit doit être dans son état d'origine avec tous ses accessoires.",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "Notre équipe est disponible par téléphone au 0800 123 456, par email à support@appledemo.com, ou via le chat en ligne de 9h à 19h.",
  },
  {
    question: "Comment fonctionne la garantie ?",
    answer:
      "Tous nos produits bénéficient d'une garantie de 2 ans. Pour les réparations, rendez-vous en boutique ou déposez une demande de SAV en ligne.",
  },
  {
    question: "Puis-je échanger un produit ?",
    answer:
      "Oui, vous pouvez échanger un produit dans les 30 jours suivant l'achat, sous réserve de disponibilité du nouveau produit souhaité.",
  },
];

const categories = [
  { icon: Smartphone, label: "Smartphones", href: "/support/smartphones" },
  { icon: Laptop, label: "Ordinateurs", href: "/support/ordinateurs" },
  { icon: Tablet, label: "Tablettes", href: "/support/tablettes" },
  { icon: Headphones, label: "Accessoires", href: "/support/accessoires" },
];

const claimStatuses: Record<string, { status: string; icon: any; color: string }> = {
  "CLM-001": { status: "En cours de traitement", icon: Clock, color: "text-yellow-500" },
  "CLM-002": { status: "Complété", icon: CheckCircle, color: "text-green-500" },
  "CLM-003": { status: "En attente", icon: AlertCircle, color: "text-orange-500" },
  "CLM-004": { status: "Rejeté", icon: XCircle, color: "text-red-500" },
};

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [claimId, setClaimId] = useState("");
  const [claimResult, setClaimResult] = useState<{
    status: string;
    icon: any;
    color: string;
  } | null>(null);

  const handleClaimSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = claimStatuses[claimId.toUpperCase()];
    setClaimResult(result || null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary/30">
        <div className="container-narrow text-center">
          <h1 className="text-display mb-6">Comment pouvons-nous vous aider ?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans l'aide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.label}
                to={category.href}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card hover:bg-secondary/50 transition-colors hover-lift"
              >
                <category.icon className="w-8 h-8 text-primary" />
                <span className="font-medium">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* FAQ */}
            <div className="lg:col-span-2">
              <h2 className="text-title mb-6">Questions fréquentes</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left font-medium">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Quick Links */}
              <div className="mt-12 grid sm:grid-cols-2 gap-4">
                <Link
                  to="/support/guides"
                  className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Guides & Tutoriels</h3>
                    <p className="text-sm text-muted-foreground">
                      Apprenez à utiliser vos produits
                    </p>
                  </div>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <MessageCircle className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Nous contacter</h3>
                    <p className="text-sm text-muted-foreground">
                      Parlez à un conseiller
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Claim Tracking */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4">Suivi de réclamation</h3>
                <form onSubmit={handleClaimSearch} className="space-y-4">
                  <Input
                    placeholder="N° de réclamation (ex: CLM-001)"
                    value={claimId}
                    onChange={(e) => setClaimId(e.target.value)}
                  />
                  <Button type="submit" className="w-full">
                    Rechercher
                  </Button>
                </form>
                {claimResult && (
                  <div className="mt-4 p-4 rounded-xl bg-secondary/50 flex items-center gap-3">
                    <claimResult.icon className={`w-5 h-5 ${claimResult.color}`} />
                    <span className="font-medium">{claimResult.status}</span>
                  </div>
                )}
                {claimId && !claimResult && (
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    Réclamation non trouvée
                  </p>
                )}
              </div>

              {/* SAV Form */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-semibold mb-4">Créer un ticket SAV</h3>
                <form className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type de produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphone">Smartphone</SelectItem>
                      <SelectItem value="laptop">Ordinateur</SelectItem>
                      <SelectItem value="tablet">Tablette</SelectItem>
                      <SelectItem value="accessory">Accessoire</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Numéro de série" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pays" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="be">Belgique</SelectItem>
                      <SelectItem value="ch">Suisse</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea placeholder="Description du problème" rows={4} />
                  <Button variant="hero" className="w-full">
                    Envoyer
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
