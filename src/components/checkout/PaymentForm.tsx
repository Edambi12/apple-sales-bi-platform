import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, AlertCircle, Lock, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Le numéro de carte doit contenir 16 chiffres")
    .max(19, "Numéro de carte invalide")
    .regex(/^[\d\s]+$/, "Le numéro de carte ne doit contenir que des chiffres"),
  expiryDate: z
    .string()
    .min(5, "Date d'expiration requise")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format invalide (MM/AA)"),
  cvv: z
    .string()
    .min(3, "Le code de sécurité doit contenir 3 chiffres")
    .max(4, "Le code de sécurité doit contenir 3-4 chiffres")
    .regex(/^\d+$/, "Le code de sécurité ne doit contenir que des chiffres"),
  cardName: z
    .string()
    .min(2, "Veuillez indiquer votre nom complet")
    .max(100, "Nom trop long"),
  country: z.string().min(1, "Veuillez sélectionner un pays"),
  addressLine1: z
    .string()
    .min(5, "Ce champ est incomplet")
    .max(200, "Adresse trop longue"),
  addressLine2: z.string().optional(),
  postalCode: z
    .string()
    .min(4, "Votre code postal n'est pas valide")
    .max(10, "Code postal invalide"),
  city: z
    .string()
    .min(2, "Ce champ est incomplet")
    .max(100, "Nom de ville trop long"),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  isProcessing?: boolean;
}

const countries = [
  "France",
  "Belgique",
  "Suisse",
  "Canada",
  "Tunisie",
  "Maroc",
  "Algérie",
  "Luxembourg",
  "Monaco",
];

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");
  const groups = digits.match(/.{1,4}/g);
  return groups ? groups.join(" ").substr(0, 19) : "";
};

const formatExpiryDate = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
};

export const PaymentForm = ({ onSubmit, isProcessing = false }: PaymentFormProps) => {
  const [cardType, setCardType] = useState<"visa" | "mastercard" | "unknown">("unknown");

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      country: "",
      addressLine1: "",
      addressLine2: "",
      postalCode: "",
      city: "",
    },
    mode: "onBlur",
  });

  const detectCardType = (number: string) => {
    const digits = number.replace(/\s/g, "");
    if (digits.startsWith("4")) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) {
      setCardType("mastercard");
    } else {
      setCardType("unknown");
    }
  };

  const handleSubmit = (data: PaymentFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Mode de paiement */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-5">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <h2 className="text-title">Mode de paiement</h2>
          </div>

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de carte</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        field.onChange(formatted);
                        detectCardType(formatted);
                      }}
                      className={form.formState.errors.cardNumber ? "border-destructive" : ""}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {cardType === "visa" && (
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">VISA</span>
                      )}
                      {cardType === "mastercard" && (
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">MC</span>
                      )}
                      {form.formState.errors.cardNumber && (
                        <AlertCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="MM/AA"
                      maxLength={5}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        field.onChange(formatted);
                      }}
                      className={form.formState.errors.expiryDate ? "border-destructive" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code de sécurité</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="password"
                        placeholder="CVV"
                        maxLength={4}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        className={form.formState.errors.cvv ? "border-destructive" : ""}
                      />
                      {form.formState.errors.cvv && (
                        <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-destructive" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Adresse de facturation */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-5">
          <h2 className="text-title">Adresse de facturation</h2>

          <FormField
            control={form.control}
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Jean Dupont"
                    className={form.formState.errors.cardName ? "border-destructive" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays ou région</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={form.formState.errors.country ? "border-destructive" : ""}>
                      <SelectValue placeholder="Sélectionnez un pays" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse - Ligne 1</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="123 Rue Example"
                    className={form.formState.errors.addressLine1 ? "border-destructive" : ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse - Ligne 2 (optionnel)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Appartement, étage, etc." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="75001"
                      className={form.formState.errors.postalCode ? "border-destructive" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Paris"
                      className={form.formState.errors.city ? "border-destructive" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Security notice */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <Lock className="w-5 h-5 text-primary flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Paiement sécurisé</p>
            <p className="text-muted-foreground">
              Vos informations sont cryptées et protégées (Mode démo)
            </p>
          </div>
          <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
        </div>

        <Button
          type="submit"
          variant="hero"
          className="w-full"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Traitement en cours...
            </span>
          ) : (
            "Confirmer le paiement"
          )}
        </Button>
      </form>
    </Form>
  );
};
