import config from "../config.js";
import Icon from "./Icon.jsx";

/** Floating WhatsApp button — renders only once a number is set in config.js. */
export default function WhatsAppButton() {
  const digits = (config.whatsappNumber || "").replace(/\D/g, "");
  if (digits.length < 8) return null;
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(config.whatsappMessage || "")}`;
  return (
    <a
      className="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with VL Bizbridge on WhatsApp (opens in a new tab)"
    >
      <Icon name="whatsapp" />
      <span className="label">WhatsApp us</span>
    </a>
  );
}
