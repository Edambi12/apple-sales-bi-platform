import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    email: "",
  });

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

  /**
   * Asks the server-side function to email the order confirmation. The browser
   * holds no email credential or shared secret: the function validates the
   * request itself. Returns whether a confirmation email was sent.
   */
  const sendOrderConfirmationEmail = async (newOrderNumber: string, paymentData: {
    cardName?: string;
    addressLine1?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }): Promise<boolean> => {
    const customerEmail = shippingInfo.email.trim();
    if (!EMAIL_PATTERN.test(customerEmail)) return false;

    try {
      const customerName = shippingInfo.firstName && shippingInfo.lastName
        ? `${shippingInfo.firstName} ${shippingInfo.lastName}`
        : paymentData.cardName || "Client";

      // Loaded on demand so the cart still renders when Supabase is not configured.
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.functions.invoke("send-order-confirmation", {
        body: {
          orderNumber: newOrderNumber,
          customerName,
          customerEmail,
          total,
          items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress: {
            address: shippingInfo.address || paymentData.addressLine1 || "",
            city: shippingInfo.city || paymentData.city || "",
            postalCode: shippingInfo.postalCode || paymentData.postalCode || "",
            country: shippingInfo.country || paymentData.country || "",
          },
        },
      });

      if (error) {
        console.error("Order confirmation email could not be sent");
        return false;
      }
      return true;
    } catch (err) {
      console.error("Order confirmation email could not be sent");
      return false;
    }
  };

  if (cart.length === 0 && step !== 4) {
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
          {step <= 3 && (
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
          )}

          <div className="grid lg:grid-cols-3 gap-12 [&>*]:min-w-0">
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
                    <Input 
                      placeholder="Prénom" 
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                    <Input 
                      placeholder="Nom" 
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <Input 
                    placeholder="Email" 
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Input 
                    placeholder="Adresse" 
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input 
                      placeholder="Code postal" 
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, postalCode: e.target.value }))}
                    />
                    <Input 
                      placeholder="Ville" 
                      className="md:col-span-2" 
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <Input 
                    placeholder="Pays" 
                    value={shippingInfo.country}
                    onChange={(e) => setShippingInfo(prev => ({ ...prev, country: e.target.value }))}
                  />
                </div>
              )}

              {step === 3 && (
                <PaymentForm
                  isProcessing={isProcessing}
                  onSubmit={async (data) => {
                    setIsProcessing(true);
                    
                    // Simulate payment processing
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    const newOrderNumber = `CMD-${Date.now().toString(36).toUpperCase()}`;
                    setOrderNumber(newOrderNumber);
                    
                    // Send confirmation email (only when a valid address was provided)
                    const emailSent = await sendOrderConfirmationEmail(newOrderNumber, data);
                    
                    setIsProcessing(false);
                    setStep(4);
                    
                    toast({
                      title: "Paiement accepté",
                      description: emailSent
                        ? "Votre commande a été confirmée. Un email de confirmation a été envoyé."
                        : "Votre commande a été confirmée. Aucun email de confirmation n'a été envoyé.",
                    });
                  }}
                />
              )}

              {step === 4 && (
                <OrderConfirmation orderNumber={orderNumber} total={total} />
              )}
            </div>

            {/* Order Summary */}
            {step <= 3 && (
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
                    {step < 3 && (
                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={() => setStep(step + 1)}
                      >
                        Continuer
                        <ArrowRight className="w-4 h-4" />
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
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Panier;
