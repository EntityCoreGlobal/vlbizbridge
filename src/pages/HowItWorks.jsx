import { IconBadge } from "../components/Icon.jsx";
import { CheckList, CtaBand, Notice, PageHero, usePageMeta } from "../components/common.jsx";

const STEPS = [
  {
    icon: "chatLines",
    tone: "",
    title: "Share your requirement",
    text: "Send us an enquiry, call or message us. Tell us what you are planning — for example, registering a company, filing a return or protecting a brand name.",
    points: ["A short description is enough to start", "Not sure what you need? Just describe your situation"],
  },
  {
    icon: "clipboard",
    tone: "gold",
    title: "Receive guidance & a document checklist",
    text: "We explain your options in plain language, answer your questions and share a checklist of the documents and details usually needed.",
    points: ["Understand the steps involved", "Know what to prepare before you begin"],
  },
  {
    icon: "shieldCheck",
    tone: "navy",
    title: "Get assistance through the process",
    text: "Once you are ready, we help prepare and file your applications or returns, and keep you updated on progress and any follow-ups.",
    points: ["Updates as your application progresses", "Support with queries from the authorities"],
  },
];

const PREPARE = [
  "The type of help you are looking for, if you know it",
  "Basic details of the people involved (founders, partners or directors)",
  "Your proposed business or brand name, if you have one",
  "Any registrations or filings you already have in place",
  "Questions or concerns you would like answered",
];

export default function HowItWorks() {
  usePageMeta(
    "How It Works | VL Bizbridge",
    "Getting help from VL Bizbridge takes three simple steps: share your requirement, receive guidance and a document checklist, and get assistance through the process."
  );

  return (
    <>
      <PageHero eyebrow="How it works" title="Three simple steps to get things moving">
        No confusing forms or jargon. Here is what working with VL Bizbridge looks like, from your first message
        onwards.
      </PageHero>

      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <h2 id="steps-title" className="visually-hidden">
            The process
          </h2>
          <ol className="steps">
            {STEPS.map((s) => (
              <li className="step" key={s.title}>
                <IconBadge name={s.icon} tone={s.tone} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <CheckList items={s.points} />
              </li>
            ))}
          </ol>

          <Notice style={{ marginTop: "2rem" }}>
            Processing times and approvals are decided by the relevant government authorities and depend on the
            documents and information provided. We will always share realistic expectations based on your situation.
          </Notice>
        </div>
      </section>

      <section className="section section-navy" aria-labelledby="prepare-title">
        <div className="container split">
          <div>
            <span className="eyebrow">Before you reach out</span>
            <h2 id="prepare-title">Helpful things to have ready</h2>
            <p>
              You do not need everything in place to get started, but having a few details handy can make the first
              conversation more useful.
            </p>
          </div>
          <CheckList items={PREPARE} />
        </div>
      </section>

      <CtaBand
        title="Ready for step one?"
        text="Share your requirement and we will get back to you with guidance and next steps."
        primary={{ to: "/contact", label: "Enquire Now" }}
        secondary={{ to: "/services", label: "Explore Services" }}
      />
    </>
  );
}
