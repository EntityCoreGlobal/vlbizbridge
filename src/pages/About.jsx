import { IconBadge } from "../components/Icon.jsx";
import { CtaBand, PageHero, usePageMeta, Value } from "../components/common.jsx";

const AUDIENCES = [
  { icon: "star", tone: "", title: "First-time founders", text: "Understand your options before you register your first business." },
  { icon: "rocket", tone: "gold", title: "Startups", text: "Set up a structure that fits your plans and stay compliant as you grow." },
  { icon: "store", tone: "navy", title: "Small businesses", text: "Keep registrations, filings and books in order without the stress." },
  { icon: "briefcase", tone: "", title: "Professionals", text: "Get help with tax returns and formalising freelance or consulting work." },
];

export default function About() {
  usePageMeta(
    "About Us | VL Bizbridge Business Consultancy",
    "Learn about VL Bizbridge and our approach to helping founders and small businesses with registrations, tax filing, trademarks and accounting in plain language."
  );

  return (
    <>
      <PageHero eyebrow="About us" title="Helping businesses take the next step with confidence">
        VL Bizbridge is a business consultancy that helps individuals, startups and small businesses handle
        registrations, tax filings, trademarks and accounting.
      </PageHero>

      <section className="section" aria-labelledby="story-title">
        <div className="container split">
          <div>
            {/* EDIT: Replace this note and the placeholder paragraphs below with your own story. */}
            <p className="placeholder-note">
              <strong>Placeholder copy:</strong> replace the text in this section with VL Bizbridge’s own story, team
              details and any credentials you would like to share.
            </p>
            <span className="eyebrow">Our story</span>
            <h2 id="story-title">Who we are</h2>
            <p>
              [Introduce VL Bizbridge here — for example, why the consultancy was started, who leads it and the kinds of
              clients you enjoy working with.]
            </p>
            <p>
              [Add a sentence or two about your team and the expertise they bring. Only include qualifications,
              memberships or experience that you can verify.]
            </p>
            <p>
              Whatever stage you are at, our aim is the same: to make business paperwork easier to understand and less
              stressful to complete.
            </p>
          </div>
          <div>
            <span className="eyebrow">Our approach</span>
            <h2>How we work with you</h2>
            <div className="values">
              <Value icon="chat" title="Clear explanations">
                We explain your options in everyday language so you can make informed decisions.
              </Value>
              <Value icon="compass" tone="gold" title="Practical guidance">
                We focus on what you actually need to do next, and what documents will help.
              </Value>
              <Value icon="shield" tone="navy" title="Honest expectations">
                We are upfront that approvals and timelines rest with the authorities, and we keep you informed along
                the way.
              </Value>
              <Value icon="lock" title="Care with your information">
                Your documents and details are handled carefully and used only for your work.
              </Value>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft" aria-labelledby="who-title">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Who we help</span>
            <h2 id="who-title">Built for people building businesses</h2>
          </div>
          <div className="grid grid-4">
            {AUDIENCES.map((a) => (
              <div className="card" key={a.title}>
                <IconBadge name={a.icon} tone={a.tone} />
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Let’s talk about your business"
        text="Tell us what you are working on. We will listen, explain your options and suggest a clear next step."
        primary={{ to: "/contact", label: "Talk to an Expert" }}
        secondary={{ to: "/services", label: "Explore Services" }}
      />
    </>
  );
}
