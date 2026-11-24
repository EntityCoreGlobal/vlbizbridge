import { Link } from "react-router";
import Icon, { IconBadge } from "../components/Icon.jsx";
import { ArrowLink, CtaBand, usePageMeta, Value } from "../components/common.jsx";
import { formatPrice, SERVICES } from "../data/services.js";

const HERO_POINTS = [
  "Guidance in simple, jargon-free language",
  "A clear document checklist for your requirement",
  "Support from first question to filing",
];

const HERO_STEPS = [
  ["Share your requirement", "Tell us what you are planning or what you need help with."],
  ["Get guidance & a checklist", "We explain your options and the documents usually needed."],
  ["Get assisted through the process", "We help you prepare, file and keep track of next steps."],
];

export default function Home() {
  usePageMeta(
    "VL Bizbridge | Company Registration, GST, ITR, Trademark & Accounting Help",
    "VL Bizbridge helps founders, startups and small businesses with company and LLP registration, GST, income tax filing, trademark registration and bookkeeping, explained in plain language."
  );

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Business registration &amp; compliance assistance</span>
            <h1 id="hero-title">
              Start, register and run your business <span className="accent">with clarity.</span>
            </h1>
            <p className="hero-lead">
              VL Bizbridge helps individuals, startups and small businesses with company registration, GST, income tax
              filing, trademarks and accounting — explained in plain language, one step at a time.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" to="/contact">
                Talk to an Expert <Icon name="arrow" />
              </Link>
              <Link className="btn btn-outline" to="/services">
                Explore Services
              </Link>
            </div>
            <ul className="hero-points">
              {HERO_POINTS.map((p) => (
                <li key={p}>
                  <Icon name="check" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <aside className="hero-card" aria-labelledby="hero-card-title">
            <h2 id="hero-card-title">Getting started is simple</h2>
            <ol className="hero-steps">
              {HERO_STEPS.map(([title, text]) => (
                <li key={title}>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </li>
              ))}
            </ol>
            <Link className="btn btn-gold btn-block" to="/how-it-works">
              See How It Works
            </Link>
          </aside>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">What we help with</span>
            <h2 id="services-title">Services for every stage of your business</h2>
            <p>
              Whether you are registering your first business or keeping an established one compliant, we can help you
              understand what is involved and get it done.
            </p>
          </div>

          <div className="grid grid-4">
            {SERVICES.map((s) => (
              <article className="card" key={s.id}>
                <IconBadge name={s.icon} tone={s.tone} />
                <h3>{s.cardTitle}</h3>
                <p>{s.summary}</p>
                {s.price != null && (
                  <p className="card-price">
                    <strong>{formatPrice(s.price)}</strong> <span>{s.priceNote}</span>
                  </p>
                )}
                <ArrowLink to={`/services#${s.id}`} srText={`about ${s.cardTitle}`}>
                  Learn more
                </ArrowLink>
              </article>
            ))}
          </div>

          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link className="btn btn-outline" to="/services">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="container split">
          <div>
            <span className="eyebrow">Our approach</span>
            <h2 id="why-title">A bridge between your business idea and the paperwork</h2>
            <p className="muted">
              Registrations and filings can feel confusing when you are doing them for the first time. Our role is to
              explain your options clearly, tell you what is usually required, and help you move through each step with
              fewer surprises.
            </p>
            <ArrowLink to="/about">More about VL Bizbridge</ArrowLink>
          </div>
          <div className="values">
            <Value icon="chat" title="Plain-language guidance">
              We explain what each option means for you, without unnecessary jargon.
            </Value>
            <Value icon="clipboard" tone="gold" title="Clear checklists">
              Know which documents and details are usually needed before you begin.
            </Value>
            <Value icon="clock" tone="navy" title="Ongoing support">
              From first registration to recurring filings, help is a message away.
            </Value>
          </div>
        </div>
      </section>

      <CtaBand
        soft
        title="Not sure which service you need?"
        text="Tell us a little about your plans. We will help you understand your options and suggest a sensible next step."
        primary={{ to: "/contact", label: "Talk to an Expert" }}
        secondary={{ to: "/faqs", label: "Read FAQs" }}
      />
    </>
  );
}
