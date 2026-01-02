import { Layout } from "@/components/layout/Layout";
import { BarChart3 } from "lucide-react";

const Analytics = () => {
  const embedUrl = "https://app.powerbi.com/view?r=eyJrIjoiNjNjZTE3ZmUtNzAzNC00ODA3LWJkMGMtYWQ4MTNlYTUzNGE1IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9";

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-secondary/30">
        <div className="container-wide">
          <h1 className="text-headline mb-2">Portail Analytics</h1>
          <p className="text-muted-foreground">
            Tableaux de bord Business Intelligence
          </p>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-8">
        <div className="container-wide">
          <PowerBIEmbed url={embedUrl} title="Projet APPLE" />

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
            URL Power BI non configurée.
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
