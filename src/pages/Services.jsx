import { Link } from "react-router";
import { IconBadge } from "../components/Icon.jsx";
import { CheckList, CtaBand, PageHero, usePageMeta } from "../components/common.jsx";
import { formatPrice, SERVICE_GROUPS, SERVICES, SHORT_NAMES } from "../data/services.js";

function ServiceSection({ service: s }) {
  const titleId = `${s.id}-title`;
  return (
    <article className="service" id={s.id} aria-labelledby={titleId}>
      <div className="service-head">
        <IconBadge name={s.icon} tone={s.tone} />
        <div>
          <h2 id={titleId}>{s.title}</h2>
          <p>{s.description}</p>
        </div>
      </div>
      <div className="service-body">
        <div>
          <h3>May suit</h3>
          <CheckList items={s.suits} />
        </div>
        <div>
          <h3>How we can help</h3>
          <CheckList items={s.help} />
        </div>
      </div>
      <div className="service-cta">
        {s.price != null && (
          <div className="price">
            <span className="price-label">Professional fee</span>
            <strong className="price-amount">{formatPrice(s.price)}</strong>
            <span className="price-note">{s.priceNote}</span>
          </div>
        )}
        <Link className="btn btn-primary" to={`/contact?service=${s.id}`}>
          {s.cta}
          <span className="visually-hidden"> for {s.cardTitle}</span>
        </Link>
        <small>{s.note}</small>
      </div>
    </article>
  );
}

export default function Services() {
  usePageMeta(
    "Services | VL Bizbridge – Company, LLP, OPC, GST, ITR, Trademark & Accounting",
    "Explore VL Bizbridge services: Private Limited, LLP, OPC, partnership firm and proprietorship registration, GST registration and filing, ITR filing, trademark registration and bookkeeping."
  );

  return (
    <>
      <PageHero eyebrow="Our services" title="Assistance for registering and running your business">
        Find the service that fits where you are today. Each section explains what it is, who it may suit, and how we
        can help. If you are unsure, we are happy to talk it through.
      </PageHero>

      <section className="section section-soft" aria-label="Service details">
        <div className="container">
          <nav className="service-jump" aria-label="Jump to a service">
            {SERVICES.map((s) => (
              <Link key={s.id} to={`#${s.id}`}>
                {SHORT_NAMES[s.id]}
              </Link>
            ))}
          </nav>

          {SERVICE_GROUPS.map((g) => (
            <div key={g.id}>
              <h2 className="service-group-title">{g.title}</h2>
              {SERVICES.filter((s) => s.group === g.id).map((s) => (
                <ServiceSection key={s.id} service={s} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Need help choosing the right service?"
        text="Share your situation and we will help you understand which option may fit, and what the next step looks like."
        primary={{ to: "/contact", label: "Talk to an Expert" }}
      />
    </>
  );
}
