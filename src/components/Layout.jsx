import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import WhatsAppButton from "./WhatsAppButton.jsx";

/** Handles scroll position and focus when the route changes. */
function useRouteFocus(mainRef) {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (hash) {
      // Wait for the new page to render, then jump to the section.
      const jump = () => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target) return;
        target.scrollIntoView();
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      requestAnimationFrame(jump);
      // Web fonts can shift the layout after first paint; re-align once they are ready.
      document.fonts?.ready.then(() => requestAnimationFrame(jump));
    } else {
      window.scrollTo(0, 0);
      // Move focus to the main content for keyboard and screen-reader users (not on first load).
      if (!firstRender.current) mainRef.current?.focus({ preventScroll: true });
    }
    firstRender.current = false;
  }, [pathname, hash, mainRef]);
}

export default function Layout() {
  const mainRef = useRef(null);
  useRouteFocus(mainRef);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} style={{ outline: "none" }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
