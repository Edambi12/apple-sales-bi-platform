import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ORDER_EMAIL_SECRET = Deno.env.get("ORDER_EMAIL_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-order-secret",
};

// Zod schema for input validation
const orderItemSchema = z.object({
  name: z.string().min(1).max(200),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const shippingAddressSchema = z.object({
  address: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  postalCode: z.string().min(1).max(20),
  country: z.string().min(1).max(100),
});

const orderConfirmationSchema = z.object({
  orderNumber: z.string().regex(/^CMD-[A-Z0-9]+$/, "Format de numéro de commande invalide"),
  customerName: z.string().min(1).max(100),
  customerEmail: z.string().email("Email invalide"),
  total: z.number().positive(),
  items: z.array(orderItemSchema).min(1, "Au moins un article requis"),
  shippingAddress: shippingAddressSchema,
});

// HTML escape function to prevent XSS
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail(to: string[], subject: string, html: string) {
  console.log(`Sending email to: ${to.join(", ")}`);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Boutique <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Email send error:", error);
    throw new Error(`Failed to send email: ${error}`);
  }

  const result = await res.json();
  console.log("Email sent successfully:", result);
  return result;
}

Deno.serve(async (req: Request): Promise<Response> => {
  console.log("Received request to send order confirmation email");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate shared secret for authentication
    const requestSecret = req.headers.get("x-order-secret");
    if (!ORDER_EMAIL_SECRET || requestSecret !== ORDER_EMAIL_SECRET) {
      console.error("Invalid or missing order secret");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Parse and validate input with Zod
    const rawData = await req.json();
    const validationResult = orderConfirmationSchema.safeParse(rawData);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          error: "Données invalides", 
          details: validationResult.error.errors.map(e => e.message) 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const {
      orderNumber,
      customerName,
      customerEmail,
      total,
      items,
      shippingAddress,
    } = validationResult.data;

    console.log(`Processing order confirmation for order: ${orderNumber}`);

    // Escape all user inputs for HTML
    const safeCustomerName = escapeHtml(customerName);
    const safeOrderNumber = escapeHtml(orderNumber);
    const safeAddress = escapeHtml(shippingAddress.address);
    const safeCity = escapeHtml(shippingAddress.city);
    const safePostalCode = escapeHtml(shippingAddress.postalCode);
    const safeCountry = escapeHtml(shippingAddress.country);

    // Generate items HTML with escaped content
    const itemsHtml = items
      .map(
        (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee;">${escapeHtml(item.name)}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${(item.price * item.quantity).toLocaleString("fr-FR")} €</td>
        </tr>
      `
      )
      .join("");

    // Email HTML template for customer
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de commande</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Commande Confirmée ✓</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Merci pour votre achat, ${safeCustomerName}!</p>
            </div>
            
            <div style="background: #ffffff; padding: 40px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <p style="margin: 0; color: #666; font-size: 14px;">Numéro de commande</p>
                <p style="margin: 5px 0 0 0; color: #333; font-size: 20px; font-weight: bold; font-family: monospace;">${safeOrderNumber}</p>
              </div>

              <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">Articles commandés</h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                  <tr style="background: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Article</th>
                    <th style="padding: 12px; text-align: center; font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Qté</th>
                    <th style="padding: 12px; text-align: right; font-weight: 600; color: #666; font-size: 12px; text-transform: uppercase;">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 16px;">Total</td>
                    <td style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">${total.toLocaleString("fr-FR")} €</td>
                  </tr>
                </tfoot>
              </table>

              <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">Adresse de livraison</h2>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <p style="margin: 0; color: #333; line-height: 1.6;">
                  ${safeCustomerName}<br>
                  ${safeAddress}<br>
                  ${safePostalCode} ${safeCity}<br>
                  ${safeCountry}
                </p>
              </div>

              <div style="text-align: center; padding: 20px 0; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin: 0;">
                  Vous recevrez un email de suivi dès que votre commande sera expédiée.
                </p>
              </div>
            </div>

            <div style="text-align: center; padding: 30px 20px;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                © 2024 Votre Boutique. Tous droits réservés.<br>
                Ceci est un email automatique, merci de ne pas répondre.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Admin notification email with escaped content
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #333; margin: 0 0 20px 0;">🎉 Nouvelle Commande!</h1>
            
            <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #2e7d32; font-weight: bold;">Commande #${safeOrderNumber}</p>
            </div>

            <h3 style="color: #666; margin: 20px 0 10px 0;">Client</h3>
            <p style="margin: 0; color: #333;">
              <strong>${safeCustomerName}</strong><br>
              ${escapeHtml(customerEmail)}
            </p>

            <h3 style="color: #666; margin: 20px 0 10px 0;">Articles</h3>
            <ul style="margin: 0; padding-left: 20px; color: #333;">
              ${items.map((item) => `<li>${escapeHtml(item.name)} x${item.quantity} - ${(item.price * item.quantity).toLocaleString("fr-FR")} €</li>`).join("")}
            </ul>

            <h3 style="color: #666; margin: 20px 0 10px 0;">Livraison</h3>
            <p style="margin: 0; color: #333;">
              ${safeAddress}<br>
              ${safePostalCode} ${safeCity}<br>
              ${safeCountry}
            </p>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: #667eea;">
                Total: ${total.toLocaleString("fr-FR")} €
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email to customer
    console.log("Sending confirmation email to customer...");
    const customerEmailResult = await sendEmail(
      [customerEmail],
      `Confirmation de commande #${safeOrderNumber}`,
      customerEmailHtml
    );

    // Send notification to admin
    console.log("Sending notification email to admin...");
    const adminEmailResult = await sendEmail(
      ["edamketata8@gmail.com"],
      `🛒 Nouvelle commande #${safeOrderNumber}`,
      adminEmailHtml
    );

    return new Response(
      JSON.stringify({
        success: true,
        customerEmail: customerEmailResult,
        adminEmail: adminEmailResult,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-order-confirmation function:", errorMessage);
    return new Response(
      JSON.stringify({ error: "Une erreur s'est produite" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
