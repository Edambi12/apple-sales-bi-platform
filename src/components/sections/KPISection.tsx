import { TrendingUp, Package, ThumbsUp, CheckCircle } from "lucide-react";

const kpis = [
  {
    icon: TrendingUp,
    value: "2.4B€",
    label: "Chiffre d'affaires",
    change: "+12%",
    positive: true,
  },
  {
    icon: Package,
    value: "15M",
    label: "Unités vendues",
    change: "+8%",
    positive: true,
  },
  {
    icon: ThumbsUp,
    value: "0.3%",
    label: "Taux de réclamation",
    change: "-15%",
    positive: true,
  },
  {
    icon: CheckCircle,
    value: "98%",
    label: "SAV clôturé",
    change: "+5%",
    positive: true,
  },
];

export function KPISection() {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-headline mb-4">Nos chiffres clés</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Des résultats qui témoignent de notre engagement envers l'excellence
            et la satisfaction client.
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, index) => (
            <div
              key={kpi.label}
              className="text-center p-8 rounded-2xl bg-background/5 backdrop-blur-sm border border-background/10 hover:bg-background/10 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center mx-auto mb-6">
                <kpi.icon className="w-6 h-6" />
              </div>

              {/* Value */}
              <div className="text-4xl md:text-5xl font-semibold mb-2">
                {kpi.value}
              </div>

              {/* Label */}
              <div className="text-sm opacity-70 mb-3">{kpi.label}</div>

              {/* Change */}
              <div
                className={`inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full ${
                  kpi.positive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {kpi.change} vs. année précédente
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs opacity-50 mt-12">
          * Données de démonstration — Dataset fictif
        </p>
      </div>
    </section>
  );
}
