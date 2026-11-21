/* =========================================================
   VL Bizbridge — SITE SETTINGS
   ---------------------------------------------------------
   Edit these values to update contact details on every page.
   Leave a value as "" to keep showing the placeholder text.
   ========================================================= */
const config = {
  // Business tagline
  tagline: "Bridging idea to business",

  // e.g. "+91 98765 43210"
  phone: "+91 97783 49123",

  // Support mailbox (GoDaddy Professional Email) — shown on the site
  email: "support@vlbizbridge.com",

  // Office address (use \n for a line break)
  address: "Laxman Nagar, Housing Board Colony\nBerhampur, Odisha 760002",

  // e.g. "Mon–Sat, 10:00 am – 6:30 pm"
  hours: "",

  // WhatsApp number in international format, DIGITS ONLY (e.g. "919876543210").
  // The floating WhatsApp button stays hidden until this is filled in.
  whatsappNumber: "",

  // Pre-filled WhatsApp message
  whatsappMessage: "Hello VL Bizbridge, I would like some assistance with ",

  // Enquiry form backend: API Gateway → Lambda → Amazon SES, which emails
  // support@vlbizbridge.com (see infrastructure/). Accepts a JSON POST of
  // { name, phone, email, service, message, website }.
  // If emptied and `email` is set, the form opens the visitor's email app instead.
  formEndpoint: "https://wwblj3kwj6.execute-api.us-east-1.amazonaws.com/contact",
};

export default config;

export const isFilled = (v) => typeof v === "string" && v.trim() !== "";
