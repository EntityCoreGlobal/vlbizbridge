import { Link } from "react-router";
import { ConfigLink } from "../components/ConfigValue.jsx";
import { CtaBand, Notice, PageHero, usePageMeta } from "../components/common.jsx";

const FAQ_GROUPS = [
  {
    title: "Choosing a service",
    items: [
      {
        q: "How do I choose between a Private Limited Company, LLP, OPC and sole proprietorship?",
        a: (
          <>
            <p>
              It depends on things like how many people own the business, whether you plan to raise investment, how
              much compliance you are comfortable with, and how you want liability handled. In general terms:
            </p>
            <ul>
              <li><strong>Private Limited Company</strong> — often chosen by startups with multiple founders or plans to raise funding.</li>
              <li><strong>LLP</strong> — often chosen by partners and professional firms wanting limited liability with a simpler structure.</li>
              <li><strong>OPC</strong> — a company structure for a single founder.</li>
              <li><strong>Sole proprietorship</strong> — the simplest setup for one person, but without a separate legal identity.</li>
            </ul>
            <p>We can talk through your plans and explain the trade-offs before you decide.</p>
          </>
        ),
      },
      {
        q: "Do I need GST registration?",
        a: (
          <p>
            Whether GST registration is required depends on factors such as your turnover, the type of goods or
            services you supply, where you sell and whether you sell online. Some businesses also choose to register
            voluntarily. Share a few details about your business and we can help you understand what may apply.
          </p>
        ),
      },
      {
        q: "Should I register a trademark before launching my brand?",
        a: (
          <p>
            Many business owners prefer to apply early, as it can help reduce the risk of conflicts later. A
            preliminary search before you invest heavily in a name or logo can also be useful. Keep in mind that
            registration is decided by the trademark registry and cannot be guaranteed.
          </p>
        ),
      },
      {
        q: "Can you help if I am not sure which service I need?",
        a: (
          <p>
            Yes. Simply describe what you are trying to do and choose “Not sure — need guidance” in the{" "}
            <Link to="/contact?service=not-sure">enquiry form</Link>. We will help you work out which services are
            relevant.
          </p>
        ),
      },
    ],
  },
  {
    title: "Documents",
    items: [
      {
        q: "What documents are usually needed to register a company or LLP?",
        a: (
          <p>
            Typically you will need identity and address proofs for each director or partner, passport-size
            photographs, and proof of the registered office address (such as a utility bill and, if rented, a
            no-objection letter from the owner). The exact list can vary, so we share a checklist specific to your
            requirement.
          </p>
        ),
      },
      {
        q: "What should I keep ready for income tax return filing?",
        a: (
          <p>
            Commonly needed items include your PAN, income details (such as salary certificates or business records),
            bank statements, and records of any investments or deductions you plan to claim. We will let you know what
            is relevant for your situation.
          </p>
        ),
      },
      {
        q: "How do I share documents with you?",
        a: (
          <p>
            Once we have discussed your requirement, we will let you know how to share your documents securely. Please
            avoid sending sensitive documents through the website enquiry form, or to <ConfigLink field="email" />{" "}
            before we have agreed how to share them.
          </p>
        ),
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        q: "How do I get started?",
        a: (
          <p>
            Fill in the <Link to="/contact">enquiry form</Link> or email us at <ConfigLink field="email" />. Tell us
            what you need and we will get back to you to understand your requirement and explain the next steps.
          </p>
        ),
      },
      {
        q: "How can I contact support?",
        a: (
          <p>
            Email <ConfigLink field="email" /> with your question or the service you are interested in, or use the{" "}
            <Link to="/contact">enquiry form</Link>. Please do not send sensitive documents or ID numbers until we have
            discussed your requirement and agreed how to share them.
          </p>
        ),
      },
      {
        q: "How long does a registration take?",
        a: (
          <p>
            Timelines depend on the type of registration, the completeness of your documents, and processing by the
            relevant authorities. Because these factors are outside anyone’s full control, we do not promise fixed
            completion times — but we will share realistic expectations and keep you updated.
          </p>
        ),
      },
      {
        q: "How much will it cost?",
        a: (
          <p>
            Costs depend on the service, the scope of work and any government fees involved. Contact us with your
            requirement and we will explain the fees clearly before any work begins.
          </p>
        ),
      },
      {
        q: "Can you help with ongoing compliance after registration?",
        a: (
          <p>
            Yes. Alongside registrations, we offer GST filing, income tax return filing and accounting and bookkeeping
            assistance to help you stay organised over time.
          </p>
        ),
      },
    ],
  },
];

export default function Faqs() {
  usePageMeta(
    "FAQs | VL Bizbridge – Business Registration & Tax Filing Questions",
    "Answers to common questions about choosing a business structure, documents usually required for registration and tax filing, and how to get started with VL Bizbridge."
  );

  return (
    <>
      <PageHero eyebrow="FAQs" title="Frequently asked questions">
        General answers to questions we hear often. For guidance on your specific situation, please get in touch.
      </PageHero>

      <section className="section" aria-label="Questions and answers">
        <div className="container" style={{ maxWidth: 860 }}>
          <Notice style={{ marginBottom: "2.5rem" }}>
            These answers are general information only and are not legal or tax advice. Rules can change, and the right
            choice depends on your circumstances.
          </Notice>

          {FAQ_GROUPS.map((group) => (
            <div className="faq-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <details className="faq" key={item.q}>
                  <summary>{item.q}</summary>
                  <div className="faq-body">{item.a}</div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        soft
        title="Still have a question?"
        text="We are happy to help. Send us your question and we will get back to you."
        primary={{ to: "/contact", label: "Ask an Expert" }}
      />
    </>
  );
}
