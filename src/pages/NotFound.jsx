import { Link } from "react-router";
import { usePageMeta } from "../components/common.jsx";

export default function NotFound() {
  usePageMeta("Page not found | VL Bizbridge", "The page you were looking for could not be found.");
  return (
    <section className="section">
      <div className="container center">
        <span className="eyebrow">404</span>
        <h1>We couldn’t find that page</h1>
        <p className="muted">The link may be out of date, or the page may have moved.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link className="btn btn-primary" to="/">Go to Home</Link>
          <Link className="btn btn-outline" to="/contact">Talk to an Expert</Link>
        </div>
      </div>
    </section>
  );
}
