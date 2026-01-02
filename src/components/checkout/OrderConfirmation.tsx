import { CheckCircle2, Package, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
}

export const OrderConfirmation = ({ orderNumber, total }: OrderConfirmationProps) => {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-headline mb-3">Commande confirmée !</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Merci pour votre achat. Vous recevrez un email de confirmation avec les détails de votre commande.
        </p>

        <div className="inline-flex flex-col gap-2 p-6 rounded-2xl bg-card border border-border mb-8">
          <div className="flex items-center justify-between gap-8 text-sm">
            <span className="text-muted-foreground">Numéro de commande</span>
            <span className="font-mono font-semibold">{orderNumber}</span>
          </div>
          <div className="flex items-center justify-between gap-8 text-sm">
            <span className="text-muted-foreground">Total payé</span>
            <span className="font-semibold">{total.toLocaleString("fr-FR")} €</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Télécharger la facture
          </Button>
          <Button variant="hero" asChild>
            <Link to="/produits" className="gap-2">
              <Package className="w-4 h-4" />
              Continuer les achats
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
