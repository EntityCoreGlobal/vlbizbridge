import { Link } from "react-router";
import Brand from "./Brand.jsx";
import { NAV_ITEMS } from "./Header.jsx";
import { ConfigLink, ConfigText } from "./ConfigValue.jsx";
import { SERVICES } from "../data/services.js";
import config, { isFilled } from "../config.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p>
              Business registration, tax filing, trademark and accounting assistance for individuals, startups and
              small businesses.
            </p>
            <Link className="btn btn-gold btn-sm" to="/contact">
              Enquire Now
            </Link>
          </div>
          <div>
            <h2>Quick links</h2>
            <ul className="footer-links">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Services</h2>
            <ul className="footer-links">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`}>{s.cardTitle}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Get in touch</h2>
            <ul className="footer-links">
              <li><ConfigLink field="phone" /></li>
              <li><ConfigLink field="email" /></li>
              <li><ConfigText field="address" /></li>
              <li><ConfigText field="hours" /></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Information on this website is general in nature and is not legal, tax or financial advice. Requirements,
            timelines and outcomes depend on your circumstances and on the relevant authorities.
          </p>
          <p>
            &copy; {new Date().getFullYear()} Venture Links Biz Bridge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
