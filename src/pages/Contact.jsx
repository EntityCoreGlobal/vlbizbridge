import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import Icon from "../components/Icon.jsx";
import { ConfigLink, ConfigText } from "../components/ConfigValue.jsx";
import { Notice, PageHero, usePageMeta } from "../components/common.jsx";
import config, { isFilled } from "../config.js";
import { SERVICE_OPTIONS } from "../data/services.js";

const EMPTY = { name: "", phone: "", email: "", service: "", message: "", consent: false, website: "" };

const RULES = {
  name: (v) => (v.trim().length >= 2 ? "" : "Please enter the customer name."),
  phone: (v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 10 && d.length <= 15 ? "" : "Please enter a valid phone number (at least 10 digits).";
  },
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address, like name@example.com.",
  service: (v) => (v ? "" : "Please choose the service you are interested in."),
  consent: (v) => (v ? "" : "Please confirm you are happy for us to contact you."),
};
const FIELD_ORDER = ["name", "phone", "email", "service", "consent"];

function Field({ id, label, required, hint, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {required && <span className="req" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && <span className="hint" id={`${id}-hint`}>{hint}</span>}
      <span className="field-error" id={`${id}-error`} aria-live="polite">
        {error}
      </span>
    </div>
  );
}

function EnquiryForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type, text }
  const [sending, setSending] = useState(false);
  const statusRef = useRef(null);
  const formRef = useRef(null);

  // Pre-select a service from ?service=... (used by the "Enquire Now" buttons)
  useEffect(() => {
    const preset = params.get("service");
    if (preset && SERVICE_OPTIONS.some((o) => o.value === preset)) {
      setValues((v) => ({ ...v, service: preset }));
    }
  }, [params]);

  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);

  const validate = (name, value) => {
    const msg = RULES[name] ? RULES[name](value) : "";
    setErrors((e) => ({ ...e, [name]: msg }));
    return msg;
  };

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    const v = type === "checkbox" ? checked : value;
    setValues((prev) => ({ ...prev, [name]: v }));
    // Re-validate live once a field has shown an error, and immediately for selects/checkboxes.
    if (errors[name] || type === "checkbox" || e.target.tagName === "SELECT") validate(name, v);
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    if (RULES[name] && e.target.type !== "checkbox") validate(name, value);
  };

  const invalidProps = (name) => ({
    "aria-invalid": errors[name] ? "true" : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (values.website) return; // honeypot: ignore bots

    const newErrors = {};
    FIELD_ORDER.forEach((n) => (newErrors[n] = RULES[n](values[n])));
    setErrors(newErrors);
    const firstInvalid = FIELD_ORDER.find((n) => newErrors[n]);
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    const serviceLabel = SERVICE_OPTIONS.find((o) => o.value === values.service)?.label || values.service;
    const data = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      service: serviceLabel,
      message: values.message.trim(),
    };

    if (isFilled(config.formEndpoint)) {
      setSending(true);
      try {
        const res = await fetch(config.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setValues(EMPTY);
        setErrors({});
        setStatus({
          type: "success",
          text: `Thank you, ${data.name}. We have received your enquiry and will get back to you soon.`,
        });
      } catch {
        setStatus({
          type: "error",
          text: isFilled(config.email)
            ? `Sorry, your enquiry could not be sent just now. Please try again, or email us at ${config.email.trim()}.`
            : "Sorry, your enquiry could not be sent just now. Please try again, or contact us by phone or email.",
        });
      } finally {
        setSending(false);
      }
      return;
    }

    if (isFilled(config.email)) {
      const body =
        `Customer name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n` +
        `Service of interest: ${data.service}\n\n${data.message}`;
      window.location.href =
        `mailto:${config.email.trim()}?subject=${encodeURIComponent(`Website enquiry: ${data.service}`)}` +
        `&body=${encodeURIComponent(body)}`;
      setStatus({ type: "success", text: "Your email app should now open with your enquiry filled in. Just press send." });
      return;
    }

    console.warn("VL Bizbridge: set formEndpoint or email in src/config.js so enquiries can be delivered.");
    setStatus({
      type: "info",
      text: "Thanks for your interest. Our online form is being set up — please reach us using the contact details on this page in the meantime.",
    });
  };

  const hasErrors = FIELD_ORDER.some((n) => errors[n]);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      {hasErrors && (
        <div className="form-status error" role="alert" style={{ marginTop: 0, marginBottom: "1.25rem" }}>
          Please check the highlighted fields and try again.
        </div>
      )}
      <div className="form-grid">
        <Field id="name" label="Customer name" required error={errors.name}>
          <input
            id="name" name="name" type="text" autoComplete="name" required
            value={values.name} onChange={onChange} onBlur={onBlur}
            aria-describedby="name-error" {...invalidProps("name")}
          />
        </Field>
        <Field id="phone" label="Phone number" required hint="Include country code if outside India." error={errors.phone}>
          <input
            id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required
            value={values.phone} onChange={onChange} onBlur={onBlur}
            aria-describedby="phone-hint phone-error" {...invalidProps("phone")}
          />
        </Field>
        <Field id="email" label="Email address" required error={errors.email}>
          <input
            id="email" name="email" type="email" autoComplete="email" required
            value={values.email} onChange={onChange} onBlur={onBlur}
            aria-describedby="email-error" {...invalidProps("email")}
          />
        </Field>
        <Field id="service" label="Service of interest" required error={errors.service}>
          <select
            id="service" name="service" required
            value={values.service} onChange={onChange}
            aria-describedby="service-error" {...invalidProps("service")}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <div className="field full">
          <label htmlFor="message">Message</label>
          <textarea
            id="message" name="message" rows={5}
            value={values.message} onChange={onChange} aria-describedby="message-hint"
          />
          <span className="hint" id="message-hint">Briefly describe your requirement or question (optional).</span>
        </div>
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
        </div>
        <div className="field full">
          <label className="consent" htmlFor="consent">
            <input
              id="consent" name="consent" type="checkbox" required
              checked={values.consent} onChange={onChange}
              aria-describedby="consent-error" {...invalidProps("consent")}
            />
            <span>I agree to be contacted by VL Bizbridge about my enquiry.</span>
          </label>
          <span className="field-error" id="consent-error" aria-live="polite">{errors.consent}</span>
        </div>
        <div className="full">
          <button className="btn btn-primary btn-block" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send Enquiry"}
          </button>
        </div>
      </div>
      {status && (
        <div ref={statusRef} className={`form-status ${status.type}`} role="status" tabIndex={-1}>
          {status.text}
        </div>
      )}
    </form>
  );
}

const DETAILS = [
  { icon: "phone", tone: "", label: "Phone", content: <ConfigLink field="phone" /> },
  { icon: "mail", tone: "", label: "Email", content: <ConfigLink field="email" /> },
  { icon: "pin", tone: "gold", label: "Office address", content: <ConfigText field="address" /> },
  { icon: "clock", tone: "navy", label: "Business hours", content: <ConfigText field="hours" /> },
];

export default function Contact() {
  usePageMeta(
    "Contact Us | VL Bizbridge – Talk to an Expert",
    "Contact VL Bizbridge for help with company registration, LLP, OPC, GST, ITR filing, trademark registration or bookkeeping. Send an enquiry and we will get back to you."
  );

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to an expert">
        Tell us what you need help with. Fill in the form below and we will get back to you to discuss your
        requirement and next steps.
      </PageHero>

      <section className="section section-soft" aria-label="Enquiry form and contact details">
        <div className="container contact-grid">
          <div className="form-card">
            <h2 style={{ fontSize: "1.5rem" }}>Send an enquiry</h2>
            <p className="muted">
              Fields marked <span className="req" style={{ color: "#b3261e" }} aria-hidden="true">*</span>
              <span className="visually-hidden">with an asterisk</span> are required. Please do not include sensitive
              documents or ID numbers in this form.
            </p>
            <EnquiryForm />
          </div>

          <aside aria-labelledby="details-title">
            <h2 id="details-title" style={{ fontSize: "1.5rem" }}>Contact details</h2>
            <p className="muted">Prefer to reach us directly? Use any of the options below.</p>
            <ul className="contact-list">
              {DETAILS.map((d) => (
                <li className="contact-item" key={d.label}>
                  <div className={`icon-badge ${d.tone}`.trim()} aria-hidden="true">
                    <Icon name={d.icon} />
                  </div>
                  <div>
                    <strong>{d.label}</strong>
                    {d.content}
                  </div>
                </li>
              ))}
            </ul>
            <Notice style={{ marginTop: "2rem" }}>
              Your details are used only to respond to your enquiry. Information shared on this website is general and
              not legal or tax advice.
            </Notice>
          </aside>
        </div>
      </section>
    </>
  );
}
