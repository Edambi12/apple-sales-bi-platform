import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Smartphone Pro Max",
    price: 1299,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&q=80",
  },
  {
    id: 7,
    name: "Écouteurs Pro",
    price: 299,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80",
  },
];

const Panier = () => {
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [step, setStep] = useState(1);

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-headline mb-4">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-8">
              Découvrez nos produits et ajoutez-les à votre panier.
            </p>
            <Button variant="hero" asChild>
              <Link to="/produits">
                Voir les produits
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <h1 className="text-headline mb-8">Votre panier</h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-12 max-w-md">
            {["Panier", "Livraison", "Paiement"].map((label, index) => (
              <div key={label} className="flex-1 flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step > index
                      ? "bg-primary text-primary-foreground"
                      : step === index + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm ${
                    step >= index + 1 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {index < 2 && (
                  <div className="flex-1 h-px bg-border ml-2" />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {step === 1 &&
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-4 rounded-2xl bg-card border border-border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-lg font-semibold mt-1">{item.price} €</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold">
                        {item.price * item.quantity} €
                      </span>
                    </div>
                  </div>
                ))}

              {step === 2 && (
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                  <h2 className="text-title mb-4">Adresse de livraison</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Prénom" />
                    <Input placeholder="Nom" />
                  </div>
                  <Input placeholder="Adresse" />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input placeholder="Code postal" />
                    <Input placeholder="Ville" className="md:col-span-2" />
                  </div>
                  <Input placeholder="Pays" />
                </div>
              )}

              {step === 3 && (
                <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
                  <h2 className="text-title mb-4">Paiement</h2>
                  <Input placeholder="Numéro de carte" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/AA" />
                    <Input placeholder="CVV" />
                  </div>
                  <Input placeholder="Nom sur la carte" />
                  <p className="text-xs text-muted-foreground">
                    Mode démo — Aucun paiement réel n'est effectué
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-semibold text-lg mb-4">Récapitulatif</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{subtotal.toLocaleString("fr-FR")} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span>
                      {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{total.toLocaleString("fr-FR")} €</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {step < 3 ? (
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => setStep(step + 1)}
                    >
                      Continuer
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => {
                        setCart([]);
                        setStep(1);
                      }}
                    >
                      Confirmer la commande
                    </Button>
                  )}
                  {step > 1 && (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => setStep(step - 1)}
                    >
                      Retour
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Panier;
