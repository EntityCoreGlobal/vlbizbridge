import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Brand from "./Brand.jsx";
import Icon from "./Icon.jsx";

export const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

const DESKTOP_QUERY = "(min-width: 960px)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  // Close the mobile menu on navigation or when switching to desktop.
  useEffect(() => setOpen(false), [pathname, isDesktop]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav id="site-nav" className="site-nav" aria-label="Main" hidden={!open && !isDesktop}>
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link className="btn btn-primary btn-sm nav-cta" to="/contact">
            Talk to an Expert
          </Link>
        </nav>
      </div>
    </header>
  );
}
