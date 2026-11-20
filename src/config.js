/* =========================================================
   VL Bizbridge — SITE SETTINGS
   ---------------------------------------------------------
   Edit these values to update contact details on every page.
   Leave a value as "" to keep showing the placeholder text.
   ========================================================= */
const config = {
  // e.g. "+91 98765 43210"
  phone: "",

  // e.g. "hello@yourdomain.com"
  email: "",

  // Office address (use \n for a line break)
  address: "",

  // e.g. "Mon–Sat, 10:00 am – 6:30 pm"
  hours: "",

  // WhatsApp number in international format, DIGITS ONLY (e.g. "919876543210").
  // The floating WhatsApp button stays hidden until this is filled in.
  whatsappNumber: "",

  // Pre-filled WhatsApp message
  whatsappMessage: "Hello VL Bizbridge, I would like some assistance with ",

  // Where enquiries are sent: a form-handling endpoint (Formspree, Getform,
  // or your own server) that accepts a JSON POST of
  // { name, phone, email, service, message }.
  // If empty and `email` is set, the form opens the visitor's email app instead.
  formEndpoint: "",
};

export default config;

export const isFilled = (v) => typeof v === "string" && v.trim() !== "";
