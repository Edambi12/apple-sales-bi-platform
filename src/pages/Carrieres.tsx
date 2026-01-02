import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Briefcase, Clock, ArrowRight, Users, Heart, Zap } from "lucide-react";

const teams = ["Toutes", "Engineering", "Design", "Retail", "Marketing", "Support"];
const countries = ["Tous", "France", "Belgique", "Suisse", "Canada"];

const jobs = [
  {
    id: 1,
    title: "Senior iOS Developer",
    team: "Engineering",
    location: "Paris, France",
    type: "CDI",
    description:
      "Rejoignez notre équipe mobile pour développer les fonctionnalités de demain sur nos applications iOS.",
  },
  {
    id: 2,
    title: "Product Designer",
    team: "Design",
    location: "Lyon, France",
    type: "CDI",
    description:
      "Concevez des expériences utilisateur exceptionnelles pour nos produits numériques.",
  },
  {
    id: 3,
    title: "Store Manager",
    team: "Retail",
    location: "Bruxelles, Belgique",
    type: "CDI",
    description:
      "Pilotez l'équipe de vente et garantissez une expérience client premium en boutique.",
  },
  {
    id: 4,
    title: "Data Analyst",
    team: "Engineering",
    location: "Genève, Suisse",
    type: "CDI",
    description:
      "Analysez les données business pour guider les décisions stratégiques de l'entreprise.",
  },
  {
    id: 5,
    title: "Marketing Manager",
    team: "Marketing",
    location: "Montréal, Canada",
    type: "CDI",
    description:
      "Développez et exécutez les stratégies marketing pour le marché nord-américain.",
  },
  {
    id: 6,
    title: "Customer Support Specialist",
    team: "Support",
    location: "Paris, France",
    type: "CDD",
    description:
      "Accompagnez nos clients dans la résolution de leurs problèmes techniques.",
  },
];

const values = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Travaillez sur des projets qui façonnent l'avenir de la technologie.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Rejoignez une équipe diverse et passionnée par l'excellence.",
  },
  {
    icon: Heart,
    title: "Bien-être",
    description: "Profitez d'avantages et d'un environnement de travail épanouissant.",
  },
];

const Carrieres = () => {
  const [selectedTeam, setSelectedTeam] = useState("Toutes");
  const [selectedCountry, setSelectedCountry] = useState("Tous");

  const filteredJobs = jobs.filter((job) => {
    const matchesTeam = selectedTeam === "Toutes" || job.team === selectedTeam;
    const matchesCountry =
      selectedCountry === "Tous" || job.location.includes(selectedCountry);
    return matchesTeam && matchesCountry;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-secondary/50 to-background">
        <div className="container-wide text-center">
          <h1 className="text-display mb-6">Rejoignez-nous</h1>
          <p className="text-body-large max-w-2xl mx-auto">
            Faites partie d'une équipe qui repousse les limites de l'innovation
            et crée des produits qui transforment le quotidien de millions de personnes.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-b border-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-12 z-30 bg-background/95 backdrop-blur-md">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <h2 className="text-title">
              {filteredJobs.length} offre{filteredJobs.length > 1 ? "s" : ""} disponible
              {filteredJobs.length > 1 ? "s" : ""}
            </h2>
            <div className="flex gap-4">
              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team} value={team}>
                      {team}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Dialog key={job.id}>
                <DialogTrigger asChild>
                  <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all hover-lift">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.team}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <Button variant="hero" size="sm">
                        Voir l'offre
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{job.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                        {job.team}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                        {job.location}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-secondary text-sm">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>

                    <div className="border-t border-border pt-6">
                      <h4 className="font-semibold mb-4">Postuler</h4>
                      <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input placeholder="Prénom" />
                          <Input placeholder="Nom" />
                        </div>
                        <Input type="email" placeholder="Email" />
                        <Input type="tel" placeholder="Téléphone" />
                        <Textarea placeholder="Lettre de motivation" rows={4} />
                        <Input type="file" />
                        <Button variant="hero" className="w-full">
                          Envoyer ma candidature
                        </Button>
                      </form>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucune offre disponible pour ces critères.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Carrieres;
