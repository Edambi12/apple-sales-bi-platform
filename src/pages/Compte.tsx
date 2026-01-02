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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Package,
  Headphones,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "15 décembre 2024",
    status: "Livré",
    total: 1299,
    items: ["Smartphone Pro Max"],
  },
  {
    id: "ORD-2024-002",
    date: "10 décembre 2024",
    status: "En cours",
    total: 299,
    items: ["Écouteurs Pro"],
  },
  {
    id: "ORD-2024-003",
    date: "1 décembre 2024",
    status: "Livré",
    total: 449,
    items: ["Montre Series 9"],
  },
];

const mockTickets = [
  {
    id: "TKT-001",
    date: "12 décembre 2024",
    subject: "Problème écran Smartphone Pro",
    status: "En cours",
  },
  {
    id: "TKT-002",
    date: "5 novembre 2024",
    subject: "Demande de remboursement",
    status: "Résolu",
  },
];

const Compte = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - any credentials work
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center">
          <div className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-headline mb-2">Connexion</h1>
              <p className="text-muted-foreground">
                Accédez à votre espace client
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="hero" className="w-full" type="submit">
                Se connecter
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Mode démo — Entrez n'importe quel email et mot de passe
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-headline">Mon compte</h1>
              <p className="text-muted-foreground">Bienvenue, {email}</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsLoggedIn(false)}
              className="text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full max-w-lg grid-cols-4">
              <TabsTrigger value="profile" className="gap-2">
                <User className="w-4 h-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <Package className="w-4 h-4" />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="support" className="gap-2">
                <Headphones className="w-4 h-4" />
                SAV
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                Préférences
              </TabsTrigger>
            </TabsList>

            {/* Profile */}
            <TabsContent value="profile">
              <div className="max-w-xl p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-title mb-6">Informations personnelles</h2>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Prénom" defaultValue="Jean" />
                    <Input placeholder="Nom" defaultValue="Dupont" />
                  </div>
                  <Input type="email" defaultValue={email} />
                  <Input type="tel" placeholder="Téléphone" />
                  <Input placeholder="Adresse" />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input placeholder="Code postal" />
                    <Input placeholder="Ville" className="md:col-span-2" />
                  </div>
                  <Button variant="hero">Enregistrer</Button>
                </form>
              </div>
            </TabsContent>

            {/* Orders */}
            <TabsContent value="orders">
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{order.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            order.status === "Livré"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.date} • {order.items.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{order.total} €</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Support */}
            <TabsContent value="support">
              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-6 rounded-2xl bg-card border border-border flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{ticket.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            ticket.status === "Résolu"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {ticket.date} • {ticket.subject}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <div className="max-w-xl p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-title mb-6">Préférences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Langue</label>
                    <Select defaultValue="fr">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Pays</label>
                    <Select defaultValue="fr">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="be">Belgique</SelectItem>
                        <SelectItem value="ch">Suisse</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="hero">Enregistrer</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Compte;
