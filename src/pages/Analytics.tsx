import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, BarChart3, TrendingUp, Headphones, Settings } from "lucide-react";

const Analytics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [embedUrl, setEmbedUrl] = useState("COLLE_ICI_TON_URL_EMBED_POWERBI");
  const [showSettings, setShowSettings] = useState(false);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === "BI-DEMO") {
      setIsAuthenticated(true);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem("powerbi-embed-url", embedUrl);
    setShowSettings(false);
  };

  // Load saved URL on mount
  useState(() => {
    const savedUrl = localStorage.getItem("powerbi-embed-url");
    if (savedUrl) {
      setEmbedUrl(savedUrl);
    }
  });

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center justify-center">
          <div className="container-narrow text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <Lock className="w-10 h-10 text-primary" />
            </div>

            <h1 className="text-headline mb-4">Portail Analytics</h1>
            <p className="text-body-large mb-10">
              Accédez aux tableaux de bord Business Intelligence avec votre code
              d'accès.
            </p>

            <form
              onSubmit={handleAccessSubmit}
              className="max-w-sm mx-auto space-y-4"
            >
              <Input
                type="text"
                placeholder="Code d'accès (ex: BI-DEMO)"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                className="text-center text-lg h-14"
              />
              <Button variant="hero" size="lg" type="submit" className="w-full">
                Accéder au portail
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-8">
              Code de démonstration : BI-DEMO
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-headline mb-2">Portail Analytics</h1>
              <p className="text-muted-foreground">
                Tableaux de bord Business Intelligence
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="mt-6 p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold mb-4">Paramètres Power BI</h3>
              <div className="flex gap-4">
                <Input
                  placeholder="URL d'embed Power BI"
                  value={embedUrl}
                  onChange={(e) => setEmbedUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSaveSettings}>Enregistrer</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Collez l'URL d'intégration de votre rapport Power BI ici.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Dashboard Tabs */}
      <section className="py-8">
        <div className="container-wide">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="distribution" className="gap-2">
                <TrendingUp className="w-4 h-4" />
                Distribution
              </TabsTrigger>
              <TabsTrigger value="sav" className="gap-2">
                <Headphones className="w-4 h-4" />
                SAV
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <PowerBIEmbed url={embedUrl} title="Vue d'ensemble" />
            </TabsContent>

            <TabsContent value="distribution" className="mt-0">
              <PowerBIEmbed url={embedUrl} title="Distribution" />
            </TabsContent>

            <TabsContent value="sav" className="mt-0">
              <PowerBIEmbed url={embedUrl} title="Service Après-Vente" />
            </TabsContent>
          </Tabs>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-secondary/50 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">
              ⚠️ Rapport BI de démonstration — Dataset fictif
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

function PowerBIEmbed({ url, title }: { url: string; title: string }) {
  const isValidUrl = url.startsWith("http");

  if (!isValidUrl) {
    return (
      <div className="w-full h-[80vh] bg-secondary/30 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground max-w-md">
            Configurez l'URL d'embed Power BI dans les paramètres pour afficher
            le rapport.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] rounded-2xl overflow-hidden border border-border">
      <iframe
        src={url}
        title={title}
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
}

export default Analytics;
