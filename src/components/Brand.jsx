import { Link } from "react-router";

/**
 * VL Biz Bridge logo: a "VL" monogram (gold V joined to the L, with a teal
 * bridge-curve beneath) plus the wordmark. The L uses currentColor so it is
 * navy on light backgrounds and white in the footer.
 */
export function LogoMark({ className = "brand-logo" }) {
  return (
    <svg className={className} viewBox="0 0 56 44" aria-hidden="true" focusable="false">
      {/* V */}
      <path d="M3 5h9.2l8.3 22.6L28.8 5H38L25.3 37h-9.6z" fill="var(--gold-500)" />
      {/* L — shares the V's right arm, so the letters read as one mark */}
      <path d="M31.5 5h8v24.5H53V37H31.5z" fill="currentColor" />
      {/* bridge curve */}
      <path d="M2 42c14-7.5 37-7.5 52 0" fill="none" stroke="var(--logo-curve, var(--teal-600))" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="VL Biz Bridge home">
      <LogoMark />
      <span className="brand-name" aria-hidden="true">
        VL <span>Biz Bridge</span>
      </span>
    </Link>
  );
}
