import { useEffect } from "react";
import { Link } from "react-router";
import Icon from "./Icon.jsx";
import { ConfigLink } from "./ConfigValue.jsx";
import config, { isFilled } from "../config.js";

const SITE = "VL Bizbridge";

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Sets the page <title> and meta description for each route. */
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
  }, [title, description]);
}

export { SITE };

export function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, primary, secondary, soft = false }) {
  return (
    <section className={`section${soft ? " section-soft" : ""}`} aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2 id="cta-title">{title}</h2>
            <p>{text}</p>
            {isFilled(config.email) && (
              <p className="cta-email">
                <Icon name="mail" />
                <span>
                  Prefer email? Write to <ConfigLink field="email" />
                </span>
              </p>
            )}
          </div>
          <div className="btn-row">
            <Link className="btn btn-gold" to={primary.to}>
              {primary.label}
            </Link>
            {secondary && (
              <Link className="btn btn-light" to={secondary.to}>
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, style }) {
  return (
    <ul className="check-list" style={style}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Notice({ children, style }) {
  return (
    <div className="notice" role="note" style={style}>
      <Icon name="info" />
      <p className="mb-0">{children}</p>
    </div>
  );
}

export function ArrowLink({ to, children, srText }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      {srText && <span className="visually-hidden"> {srText}</span>}
      <Icon name="arrow" />
    </Link>
  );
}

export function Value({ icon, tone, title, children }) {
  return (
    <div className="value">
      <div className={`icon-badge ${tone || ""}`.trim()} aria-hidden="true">
        <Icon name={icon} />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </div>
  );
}
