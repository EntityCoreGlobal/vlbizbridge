# VL Bizbridge website

A React single-page site built with **Vite**, **React 19** and **React Router 7**.

## Run it

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  config.js            ← business details (edit this first)
  data/services.js     ← all service content (cards, Services page, form options, footer)
  styles.css           ← all styles (navy / teal / gold palette)
  main.jsx             ← routes
  components/          ← Header, Footer, Layout, Icon, WhatsAppButton, shared UI
  pages/               ← Home, Services, About, HowItWorks, Faqs, Contact, NotFound
public/
  favicon.svg
  _redirects           ← SPA fallback for Netlify
```

Routes: `/`, `/services`, `/about`, `/how-it-works`, `/faqs`, `/contact`.
Each page sets its own `<title>` and meta description via `usePageMeta()`.

## Before going live — edit `src/config.js`

- `phone`, `email`, `address`, `hours` — replace the `[Phone number]`-style placeholders on every page.
- `whatsappNumber` — digits only with country code (e.g. `919876543210`). The floating WhatsApp button stays **hidden** until set.
- `formEndpoint` — where enquiries are sent (Formspree, Getform, or your own server accepting a JSON POST of `name, phone, email, service, message`).
  - If empty but `email` is set, the form opens the visitor's email app with the enquiry pre-filled.
  - If both are empty, the form shows a polite "being set up" message.

Also replace the placeholder story on the **About** page (`src/pages/About.jsx`, marked with a dashed gold note). Only include credentials you can verify.

## Linking to the form with a service pre-selected

`/contact?service=<id>`. IDs: `private-limited`, `llp`, `opc`, `proprietorship`, `gst`, `itr`, `trademark`, `accounting`, `not-sure`.

## Deploying (AWS Amplify — same setup as EntityCore)

- **Hosting:** AWS Amplify Hosting app `vlbizbridge` (`d1g20vxn9j9w65`) in **us-east-1**, connected to `EntityCoreGlobal/vlbizbridge` on GitHub. Every push to `main` builds and deploys automatically using `amplify.yml`.
- **SPA routing:** Amplify rewrite rule (regex matching any path without a file extension) → `/index.html` with status `200`, so `/services`, `/contact` etc. work on refresh. (EntityCore's `404-200` rule is not enough here, because this is a client-routed React app rather than a static export.)
- **Domain:** `www.vlbizbridge.com` is canonical; `vlbizbridge.com` redirects to it with a 301 (Amplify redirect rule).
- **DNS:** Route 53 hosted zone for `vlbizbridge.com`. The domain is still registered at GoDaddy, with its nameservers pointed at Route 53. Make DNS changes in Route 53, not GoDaddy.
- **TLS:** ACM certificate in **us-east-1** covering both names, attached to Amplify as a custom certificate (avoids the Amplify-managed-certificate bug hit on EntityCore).

To publish changes: commit and push to `main`, then watch the build in Amplify Console → vlbizbridge → main.

Other static hosts also work (upload `dist/`); they must serve `index.html` for unknown paths (`public/_redirects` covers Netlify).

## SEO note

The site renders in the browser, so titles and descriptions are set with JavaScript. Google handles this well. If you later need fully pre-rendered HTML for every page, a framework such as Next.js or a Vite pre-render plugin can be added.
