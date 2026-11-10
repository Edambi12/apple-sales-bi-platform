import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  Wrench,
  Package,
  GraduationCap,
  Search, type LucideIcon
} from "lucide-react";

const stores = [
  {
    id: 1,
    name: "APPLE Demo Champs-Élysées",
    city: "Paris",
    country: "France",
    address: "114 Avenue des Champs-Élysées, 75008 Paris",
    phone: "+33 1 44 43 42 00",
    hours: "10h00 - 20h00",
    services: ["SAV", "Pickup", "Ateliers"],
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
  },
  {
    id: 2,
    name: "APPLE Demo Opéra",
    city: "Paris",
    country: "France",
    address: "12 Place de l'Opéra, 75009 Paris",
    phone: "+33 1 44 43 43 00",
    hours: "10h00 - 19h30",
    services: ["SAV", "Pickup"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
  },
  {
    id: 3,
    name: "APPLE Demo Lyon",
    city: "Lyon",
    country: "France",
    address: "34 Rue de la République, 69002 Lyon",
    phone: "+33 4 72 10 20 30",
    hours: "10h00 - 19h00",
    services: ["SAV", "Ateliers"],
    image: "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=600&q=80",
  },
  {
    id: 4,
    name: "APPLE Demo Bruxelles",
    city: "Bruxelles",
    country: "Belgique",
    address: "Avenue Louise 125, 1050 Bruxelles",
    phone: "+32 2 123 45 67",
    hours: "10h00 - 19h00",
    services: ["SAV", "Pickup", "Ateliers"],
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80",
  },
  {
    id: 5,
    name: "APPLE Demo Genève",
    city: "Genève",
    country: "Suisse",
    address: "Rue du Rhône 48, 1204 Genève",
    phone: "+41 22 123 45 67",
    hours: "09h30 - 19h00",
    services: ["SAV", "Pickup"],
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&q=80",
  },
  {
    id: 6,
    name: "APPLE Demo Montréal",
    city: "Montréal",
    country: "Canada",
    address: "1321 Rue Sainte-Catherine O, Montréal",
    phone: "+1 514 123 4567",
    hours: "10h00 - 21h00",
    services: ["SAV", "Pickup", "Ateliers"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
  },
];

const countries = ["Tous", "France", "Belgique", "Suisse", "Canada"];
const cities = ["Toutes", "Paris", "Lyon", "Bruxelles", "Genève", "Montréal"];

const serviceIcons: Record<string, LucideIcon> = {
  SAV: Wrench,
  Pickup: Package,
  Ateliers: GraduationCap,
};

const Boutiques = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Tous");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry =
      selectedCountry === "Tous" || store.country === selectedCountry;
    const matchesCity =
      selectedCity === "Toutes" || store.city === selectedCity;
    return matchesSearch && matchesCountry && matchesCity;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide text-center">
          <h1 className="text-display mb-6">Nos boutiques</h1>
          <p className="text-body-large max-w-2xl mx-auto">
            Découvrez nos espaces dédiés à l'expérience client, où nos experts
            vous accueillent pour vous conseiller.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-12 z-30 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une boutique..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 [&>*]:min-w-0">
            {/* Map Placeholder */}
            <div className="relative h-[500px] lg:h-auto lg:sticky lg:top-32 rounded-2xl overflow-hidden bg-secondary/30">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Carte interactive des boutiques
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {filteredStores.length} boutique(s) trouvée(s)
                  </p>
                </div>
              </div>
              {/* Store markers would go here with a real map */}
            </div>

            {/* Store List */}
            <div className="space-y-6">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                    selectedStore === store.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedStore(store.id)}
                >
                  <div className="flex gap-6">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {store.address}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {store.hours}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {store.phone}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-4">
                        {store.services.map((service) => {
                          const Icon = serviceIcons[service];
                          return (
                            <span
                              key={service}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-xs"
                            >
                              <Icon className="w-3 h-3" />
                              {service}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {selectedStore === store.id && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button variant="hero" className="w-full">
                        <Calendar className="w-4 h-4" />
                        Prendre rendez-vous
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {filteredStores.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Aucune boutique trouvée pour ces critères.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Boutiques;
