import config, { isFilled } from "../config.js";

const PLACEHOLDERS = {
  phone: "[Phone number]",
  email: "[Email address]",
  address: "[Office address]",
  hours: "[Business hours]",
};

/** Shows a value from config.js, or a highlighted placeholder if it is empty. */
export function ConfigText({ field }) {
  const value = config[field];
  if (!isFilled(value)) return <span className="placeholder">{PLACEHOLDERS[field]}</span>;
  const lines = value.split("\n");
  return (
    <span>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </span>
  );
}

/** Phone/email rendered as a tel:/mailto: link when configured, otherwise plain placeholder text. */
export function ConfigLink({ field }) {
  const value = config[field];
  if (!isFilled(value)) return <ConfigText field={field} />;
  const href = field === "phone" ? `tel:${value.replace(/[^\d+]/g, "")}` : `mailto:${value.trim()}`;
  return <a href={href}>{value}</a>;
}
