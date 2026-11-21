# VL Bizbridge — Website

Marketing website for **VL Bizbridge**, a business consultancy that helps individuals, startups and small businesses with company registrations, tax filing, trademark registration and accounting.

| | |
|---|---|
| **Live site** | https://www.vlbizbridge.com |
| **Repository** | https://github.com/EntityCoreGlobal/vlbizbridge |
| **Stack** | React 19 · React Router 7 · Vite 6 · plain CSS |
| **Hosting** | AWS Amplify Hosting (us-east-1) · Route 53 DNS · ACM certificate |
| **Enquiry form** | API Gateway → Lambda → Amazon SES → `support@vlbizbridge.com` (AWS CDK, `infrastructure/`) |
| **Email** | `support@vlbizbridge.com` — GoDaddy Professional Email (DNS records in Route 53) |
| **Deploys** | Website: automatic on every push to `main` · Form backend: `cdk deploy` |

---

## Contents

1. [What the site includes](#1-what-the-site-includes)
2. [Tech stack](#2-tech-stack)
3. [Getting started locally](#3-getting-started-locally)
4. [Project structure](#4-project-structure)
5. [Updating business details](#5-updating-business-details-srcconfigjs)
6. [Editing content](#6-editing-content)
7. [How the site works](#7-how-the-site-works)
8. [Design system](#8-design-system)
9. [Accessibility](#9-accessibility)
10. [SEO](#10-seo)
11. [Hosting and infrastructure](#11-hosting-and-infrastructure)
12. [Deploying changes](#12-deploying-changes)
13. [DNS management](#13-dns-management)
14. [Troubleshooting](#14-troubleshooting)
15. [Outstanding items](#15-outstanding-items)
16. [Content guidelines](#16-content-guidelines)
17. [Enquiry form backend](#17-enquiry-form-backend-infrastructure)
18. [Email (support@vlbizbridge.com)](#18-email-supportvlbizbridgecom)

---

## 1. What the site includes

| Route | Page | Purpose |
|---|---|---|
| `/` | Home | Headline, introduction, "Talk to an Expert" call to action, summary of all eight services, approach, CTA band |
| `/services` | Services | One detailed section per service: description, who it may suit, how we help, and an "Enquire Now" / "Get Assistance" button |
| `/about` | About Us | Consultancy approach, who we help. Contains **placeholder story copy** to be replaced |
| `/how-it-works` | How It Works | Three-step process (share requirement → guidance and document checklist → assistance through the process) |
| `/faqs` | FAQs | General questions on choosing a service, documents and getting started, with a "not legal or tax advice" notice |
| `/contact` | Contact | Enquiry form (name, phone, email, service of interest, message) plus contact details |
| any other path | Not found | Friendly 404 page with links home and to contact |

**Services covered:** Private Limited Company registration · LLP registration · OPC registration · Sole Proprietorship registration assistance · GST registration and filing · Income Tax Return (ITR) filing · Trademark registration · Accounting and bookkeeping.

**Site-wide:** sticky header with a mobile menu, "Talk to an Expert" button on every page, footer with quick links, service links and contact details, a legal disclaimer, and an optional floating WhatsApp button.

---

## 2. Tech stack

| Package | Version | Role |
|---|---|---|
| `react`, `react-dom` | 19.x | UI |
| `react-router` | 7.x | Client-side routing (`BrowserRouter`) |
| `vite` | 6.x | Dev server and production build |
| `@vitejs/plugin-react` | 4.x | JSX / Fast Refresh |

There are no UI libraries, CSS frameworks or runtime dependencies beyond React and React Router. Styling is a single hand-written CSS file. Fonts (Inter and Plus Jakarta Sans) load from Google Fonts, with system-font fallbacks.

**Requirements:** Node.js 20 or newer (developed on Node 24) and npm.

---

## 3. Getting started locally

```bash
git clone https://github.com/EntityCoreGlobal/vlbizbridge.git
cd vlbizbridge
npm install
npm run dev        # http://localhost:5173 — hot reload while editing
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally to check it before pushing |

---

## 4. Project structure

```
vlbizbridge/
├── amplify.yml              Amplify build settings (npm ci → npm run build → publish dist/)
├── infrastructure/          AWS CDK app for the enquiry-form backend (see §17)
├── index.html               HTML shell; default <title>/meta tags, font links
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── _redirects           SPA fallback for Netlify (unused on Amplify; harmless)
└── src/
    ├── main.jsx             Router and route table
    ├── config.js            ★ Business details: phone, email, address, hours, WhatsApp, form endpoint
    ├── styles.css           All styles and design tokens
    ├── data/
    │   └── services.js      ★ All service content (single source of truth)
    ├── components/
    │   ├── Layout.jsx       Skip link, header, <main>, footer, WhatsApp button; scroll and focus on navigation
    │   ├── Header.jsx       Logo, nav (NAV_ITEMS), mobile menu toggle, header CTA
    │   ├── Footer.jsx       Links, services, contact details, disclaimer
    │   ├── Brand.jsx        Logo mark and wordmark
    │   ├── Icon.jsx         Inline SVG icon set (<Icon name="..."/>, <IconBadge/>)
    │   ├── ConfigValue.jsx  Renders a config value, or a highlighted placeholder if empty
    │   ├── WhatsAppButton.jsx  Floating button; renders only when a number is configured
    │   └── common.jsx       usePageMeta, PageHero, CtaBand, CheckList, Notice, ArrowLink, Value
    └── pages/
        ├── Home.jsx
        ├── Services.jsx
        ├── About.jsx
        ├── HowItWorks.jsx
        ├── Faqs.jsx
        ├── Contact.jsx      Enquiry form: validation and submission
        └── NotFound.jsx
```

★ = the files most likely to need editing.

---

## 5. Updating business details (`src/config.js`)

All contact details live in one file and appear automatically in the footer and on the Contact page. A value left as `""` shows a highlighted placeholder such as `[Phone number]`.

```js
const config = {
  phone: "",                            // "+91 98765 43210" → shown as a tap-to-call link
  email: "support@vlbizbridge.com",     // shown as a mailto link (footer, Contact, FAQs, CTA bands)
  address: "",                          // use \n for line breaks
  hours: "",                            // "Mon–Sat, 10:00 am – 6:30 pm"
  whatsappNumber: "",                   // digits only, with country code: "919876543210"
  whatsappMessage: "Hello VL Bizbridge, I would like some assistance with ",
  formEndpoint: "https://wwblj3kwj6.execute-api.us-east-1.amazonaws.com/contact", // §17
};
```

- **Email** appears in the footer, on the Contact page, in the FAQs ("How do I get started?", "How can I contact support?", "How do I share documents?") and as a "Prefer email? Write to …" line in every "Talk to an Expert" CTA band.

- **WhatsApp:** the floating button stays hidden until `whatsappNumber` contains at least 8 digits. It opens `wa.me` with the pre-filled message.
- After editing, commit and push to `main`. The live site updates in about 2–3 minutes.

---

## 6. Editing content

### 6.1 Services — `src/data/services.js`
Each service is one object. The Home cards, the Services page sections, the footer links and the contact form's dropdown are all generated from this list, so editing it updates every place at once.

| Field | Used for |
|---|---|
| `id` | URL anchor (`/services#gst`) and form pre-selection (`/contact?service=gst`). **Avoid changing it**, because existing links depend on it |
| `group` | Which heading it appears under: `registration`, `tax`, `brand` |
| `icon`, `tone` | Icon name from `Icon.jsx`; badge colour (`""` teal, `"gold"`, `"navy"`) |
| `title` / `cardTitle` / `formLabel` | Full heading / short card title / dropdown label |
| `summary` | One-line text on Home cards |
| `description`, `suits[]`, `help[]` | Services page section body |
| `cta`, `note` | Button label ("Enquire Now" / "Get Assistance") and the small caveat beside it |

To **add a service**, add an object to `SERVICES` and a short label to `SHORT_NAMES` (used by the jump links).

### 6.2 Other page copy
Edit the JSX directly in `src/pages/`:
- **About Us** (`About.jsx`): replace the bracketed placeholder paragraphs under "Who we are", then delete the dashed "Placeholder copy" note.
- **FAQs** (`Faqs.jsx`): questions live in the `FAQ_GROUPS` array; answers are JSX, so links and lists are allowed.
- **How It Works** (`HowItWorks.jsx`): `STEPS` and `PREPARE` arrays.

### 6.3 Navigation
`NAV_ITEMS` in `components/Header.jsx` drives both the header menu and the footer "Quick links". A new page also needs a `<Route>` in `src/main.jsx`.

---

## 7. How the site works

### 7.1 Routing
- `BrowserRouter` gives clean URLs (`/services`, not `/#/services`).
- On navigation, `Layout.jsx` scrolls to the top and moves keyboard focus to `<main>`. If the URL has a hash (e.g. `/services#trademark`), it scrolls to that section, and scrolls again once web fonts finish loading so the position stays correct.
- The host must serve `index.html` for any path without a file extension. On Amplify this is a rewrite rule (see §11.3).

### 7.2 Pre-selecting a service on the contact form
`/contact?service=<id>` pre-selects the dropdown. Valid IDs: `private-limited`, `llp`, `opc`, `proprietorship`, `gst`, `itr`, `trademark`, `accounting`, `not-sure`. Every "Enquire Now" button on the Services page uses this.

### 7.3 Enquiry form (`pages/Contact.jsx`)
**Validation** (client-side, with messages shown under each field):

| Field | Rule |
|---|---|
| Name | Required, at least 2 characters |
| Phone | Required, 10–15 digits (spaces, `+`, `-` allowed) |
| Email | Required, valid format |
| Service | Required |
| Message | Optional |
| Consent checkbox | Required |

A hidden "honeypot" field silently discards bot submissions.

**Delivery** depends on `config.js`, checked in this order:

1. **`formEndpoint` set (current state)** → sends a `POST` with a JSON body to the backend in §17, which emails the enquiry to `support@vlbizbridge.com`:
   ```json
   { "name": "...", "phone": "...", "email": "...", "service": "GST registration & filing", "message": "..." }
   ```
   A 2xx response shows a thank-you message and clears the form. Anything else shows an error asking the visitor to try again or email `support@vlbizbridge.com`.
2. **No endpoint, but `email` set** → opens the visitor's email app with the enquiry pre-filled.
3. **Neither set** → shows "Our online form is being set up…". No enquiry is delivered.

### 7.4 Page titles and descriptions
Each page calls `usePageMeta(title, description)`, which updates `document.title`, `meta[name=description]` and the Open Graph title and description when the route loads. `index.html` holds the Home page defaults for crawlers that don't run JavaScript.

---

## 8. Design system

Defined as CSS custom properties at the top of `src/styles.css`:

| Token | Value | Use |
|---|---|---|
| `--navy-800` | `#10243f` | Headings, hero panels, CTA bands |
| `--navy-900` | `#0b1a30` | Footer |
| `--teal-700` | `#0b6b63` | Primary buttons, links, accents |
| `--gold-500` | `#c99a2e` | Secondary CTAs, highlights, focus ring |
| `--ink` / `--ink-soft` | `#1b2533` / `#4a5668` | Body text / secondary text |
| `--bg-soft` | `#f5f7fa` | Alternating section background |

- **Type:** Plus Jakarta Sans (headings), Inter (body), with fluid heading sizes via `clamp()`.
- **Layout:** mobile-first; breakpoints at 640px, 860–960px (desktop nav appears at 960px) and 1000px; max content width 1160px.
- **Reusable classes:** `.btn` + `.btn-primary | -gold | -outline | -light`, `.card`, `.service`, `.step`, `.cta-band`, `.notice`, `.check-list`, `.placeholder`.
- **Icons:** inline SVG line icons in `Icon.jsx`. Add one by adding a path to the `PATHS` map.

---

## 9. Accessibility

- "Skip to main content" link; semantic landmarks (`header`, `nav`, `main`, `footer`).
- Visible gold focus ring on every interactive element (`:focus-visible`).
- Mobile menu button exposes `aria-expanded` / `aria-controls` and closes with **Escape** (focus returns to the button).
- Current page marked with `aria-current="page"` (via `NavLink`).
- Repeated links such as "Learn more" and "Enquire Now" include visually hidden text naming the service, so screen readers announce them distinctly.
- Form: every input has a `<label>`; errors are linked with `aria-describedby`, flagged with `aria-invalid` and announced via `aria-live`; focus moves to the first invalid field on submit.
- FAQs use native `<details>/<summary>`, so they work with keyboard and screen readers without extra JavaScript.
- Decorative icons are `aria-hidden`; animations are disabled under `prefers-reduced-motion`.

---

## 10. SEO

- Unique `<title>` and meta description per route (§7.4), plus Open Graph tags.
- One canonical host: the bare domain 301-redirects to `www`, and HTTP redirects to HTTPS.
- **Limitation:** this is a client-rendered single-page app, so per-page titles are applied by JavaScript. Google renders JavaScript and indexes these, but some social previews and simpler crawlers will see the Home page defaults. If richer link previews or SEO become a priority, add pre-rendering (e.g. a Vite pre-render plugin) or move to a static-export framework.
- Not yet added: `sitemap.xml`, `robots.txt`, `og:image`, `og:url`/canonical link tags.

---

## 11. Hosting and infrastructure

Mirrors the EntityCore Global (`company-portal`) setup: Amplify Hosting connected to GitHub, DNS in Route 53, and a separately requested ACM certificate.

```
Visitor ──► vlbizbridge.com / www.vlbizbridge.com
              │  DNS: Route 53 (nameservers set at GoDaddy)
              ▼
        Amplify-managed CloudFront (d24snndjj51fme.cloudfront.net)
              │  TLS: ACM certificate (us-east-1)
              │  Rules: apex → www (301), SPA rewrite → /index.html
              ▼
        Amplify app "vlbizbridge", branch main
              ▲
              │  builds automatically on push
        GitHub: EntityCoreGlobal/vlbizbridge (main)
```

### 11.1 Resource reference

| Resource | Identifier |
|---|---|
| AWS account | `974268348686` |
| Amplify app | `vlbizbridge` — app ID `d1g20vxn9j9w65`, region **us-east-1** |
| Amplify default URL | https://main.d1g20vxn9j9w65.amplifyapp.com |
| Production branch | `main` (stage `PRODUCTION`, auto-build on) |
| Route 53 hosted zone | `vlbizbridge.com` — zone ID `Z0740231WEOT7OX76NWT` |
| Form backend stack | CloudFormation `VlBizbridgeContactApiStack` (us-east-1) — endpoint `https://wwblj3kwj6.execute-api.us-east-1.amazonaws.com/contact` |
| SES identity | `vlbizbridge.com` (domain, Easy DKIM, us-east-1) — verified |
| Nameservers (set at GoDaddy) | `ns-719.awsdns-25.net`, `ns-134.awsdns-16.com`, `ns-1662.awsdns-15.co.uk`, `ns-1364.awsdns-42.org` |
| ACM certificate | `arn:aws:acm:us-east-1:974268348686:certificate/20f05434-810e-47b1-9195-f4fa1728f299` — covers `vlbizbridge.com` + `www.vlbizbridge.com`, DNS-validated, auto-renews |
| Domain registrar | GoDaddy (registration only; DNS is in Route 53) |

> The EntityCore app lives in **ap-south-1**; this one is in **us-east-1**. Both are served through the global CloudFront network, so visitor performance is the same. Remember the region when looking for the app in the console.

### 11.2 Build settings (`amplify.yml`)
```yaml
preBuild: npm ci
build:    npm run build
artifacts: dist/**
cache:     node_modules
```

### 11.3 Amplify rewrites and redirects
Order matters, because rules are evaluated top to bottom:

| # | Source | Target | Type |
|---|---|---|---|
| 1 | `https://vlbizbridge.com` | `https://www.vlbizbridge.com` | 301 (permanent redirect) |
| 2 | `</^[^.]+$\|\.(?!(css\|gif\|ico\|jpg\|jpeg\|js\|png\|txt\|svg\|woff\|woff2\|ttf\|map\|json\|webp\|xml)$)([^.]+$)/>` | `/index.html` | 200 (rewrite) |

Rule 2 sends every page path to the React app while letting real files (JS, CSS, images) through. **Do not replace it with EntityCore's `/<*>` → `404-200` rule.** That rule suits a static export but returns 404 for `/services` in this app.

### 11.4 Custom domain
Configured in Amplify → Hosting → Custom domains with a **custom SSL certificate** (the ACM certificate above), not "Amplify managed". EntityCore hit an Amplify bug with managed certificates, so this setup avoids it. Amplify created the apex `A` (alias) and `www` `CNAME` records in the Route 53 zone automatically.

### 11.5 Approximate monthly cost
| Item | Cost |
|---|---|
| Route 53 hosted zone | ~$0.50 |
| Amplify build minutes + hosting/traffic | Typically cents to ~$1 at this site's size |
| ACM certificate | Free |
| Form backend (API Gateway + Lambda + SES) | Effectively free at enquiry-form volumes (all within free tiers / fractions of a cent per enquiry) |

---

## 12. Deploying changes

1. Make and test changes locally (`npm run dev`, then `npm run build && npm run preview`).
2. Commit and push to `main`:
   ```bash
   git add -A
   git commit -m "Describe the change"
   git push
   ```
3. Amplify builds automatically (about 2–3 minutes). Watch it in **Amplify Console (us-east-1) → vlbizbridge → main**, or from the CLI:
   ```bash
   aws amplify list-jobs --region us-east-1 --app-id d1g20vxn9j9w65 --branch-name main --max-items 3
   ```
4. Hard-refresh https://www.vlbizbridge.com to see the change.

**Rolling back:** in the Amplify console, open the branch, select an earlier successful build and choose **Redeploy this version**. Alternatively, `git revert` the bad commit and push.

**GitHub access:** pushes use the **EntityCoreGlobal** GitHub account. Its token is stored in Windows Credential Manager scoped to this repository only. If a push fails with 403, the token has expired or lost its **Contents: Read and write** permission. Generate a new fine-grained token with that permission and enter it at the next `git push` prompt.

---

## 13. DNS management

- **All DNS records are managed in Route 53** (hosted zone `vlbizbridge.com`), **not in GoDaddy.** GoDaddy only holds the domain registration and the nameserver setting.
- Before switching DNS, the GoDaddy zone contained only the parking-page `A` records and a `www` CNAME. There were no email records, so nothing needed migrating.
- **Do not delete** the two `_…acm-validations.aws` CNAME records (certificate renewal), the email records, or the three `…_domainkey` → `dkim.amazonses.com` CNAMEs (form emails). See §18 for the full email record list.
- **Provider setup wizards** (GoDaddy email, Google, Microsoft, etc.) will tell you to add records "at your DNS host". That host is **Route 53**, not GoDaddy.
- **Domain renewal** is handled at GoDaddy. Keep auto-renew on so the domain doesn't lapse.

---

## 14. Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| `/services` (or any page) shows 404 on refresh | SPA rewrite rule missing or changed. Restore rule 2 in §11.3 |
| Site shows old content after a push | Build failed or still running. Check the Amplify job log; then hard-refresh |
| Build fails at `npm ci` | `package-lock.json` out of sync. Run `npm install` locally, commit the lock file, push |
| Form shows "could not be sent" | Check the Lambda logs (§17.4); common causes are SES identity no longer verified or API throttling |
| Enquiries not arriving in the inbox | Check spam; confirm the SES DKIM CNAMEs and email MX records are still in Route 53 (§18) |
| WhatsApp button not visible | `whatsappNumber` empty or fewer than 8 digits |
| Certificate or HTTPS error | ACM validation CNAMEs removed from Route 53, or nameservers changed at GoDaddy. Restore them |
| `git push` returns 403 | GitHub token expired or read-only. See §12 |

---

## 15. Outstanding items

- [x] ~~Connect the enquiry form to a backend~~: done (§17).
- [x] ~~Support email~~: `support@vlbizbridge.com` live (§18).
- [ ] **Fill in `src/config.js`:** phone, address, business hours, WhatsApp number.
- [ ] Optional: request **SES production access** (needed only if the form should ever email the *visitor*, e.g. an auto-reply; see §17.3).
- [ ] **Replace the About Us placeholder story** and remove the placeholder note.
- [ ] Optional SEO: `sitemap.xml`, `robots.txt`, `og:image`, canonical tags (§10).
- [ ] Optional: Amplify build notifications (email on failed builds).

---

## 16. Content guidelines

The site was written to stay accurate and compliant. Keep these rules when editing copy:

- **Do not** promise guaranteed approvals, fixed completion times, or specific legal or tax outcomes. Approvals rest with government authorities, and the copy says so.
- **Do not** add testimonials, client counts, years of experience, certifications, registrations or pricing unless they are real and verifiable.
- Keep FAQ answers general, and keep the "not legal or tax advice" notices.
- Use plain language aimed at founders and first-time business owners.
- Keep calls to action consistent: **Talk to an Expert**, **Explore Services**, **Enquire Now** / **Get Assistance**.

---

## 17. Enquiry form backend (`infrastructure/`)

An AWS CDK (TypeScript) app modelled on EntityCore's `ContactApiStack`.

```
Browser (Contact page) ──POST /contact──► API Gateway HTTP API (CORS: site origins only, throttled)
                                             │
                                             ▼
                                   Lambda "ContactHandler" (Node 20, arm64)
                                   validates input, honeypot check
                                             │  ses:SendEmail (only as vlbizbridge.com)
                                             ▼
                                   Amazon SES ──► support@vlbizbridge.com
                                   From: VL Bizbridge Website <no-reply@vlbizbridge.com>
                                   Reply-To: the visitor's email address
```

### 17.1 Files
```
infrastructure/
├── bin/app.ts                          Stack config: SES domain, recipient, allowed origins
├── lib/contact-api-stack.ts            HTTP API, Lambda, IAM, log group, throttling
└── lambda/contact-handler/index.ts     Validation + SES email
```

### 17.2 Behaviour
- **Validation (server-side):** name ≥ 2 characters, phone 10–15 digits, valid email, service required; length limits on every field; line breaks stripped from header-bound values. Invalid input → `400` with per-field errors.
- **Honeypot:** a filled `website` field returns `200` without sending anything.
- **Email:** subject `New enquiry: <service> — <name>`, plain-text body with all fields and the IST timestamp. **Reply-To is the visitor**, so pressing Reply in the support inbox answers them directly.
- **CORS:** only `https://www.vlbizbridge.com`, `https://vlbizbridge.com`, the Amplify default URL and `localhost:5173/4173` (local dev).
- **Throttling:** 5 requests/second, burst 10.
- **Logs:** CloudWatch, kept for 30 days.

### 17.3 SES notes
- `vlbizbridge.com` is a verified SES domain identity in **us-east-1**, using Easy DKIM (3 CNAMEs in Route 53). DKIM alignment lets these emails pass the domain's strict DMARC policy (`p=reject`).
- The account is in the **SES sandbox**. That's fine here, because mail only goes *to* our own verified domain. Sending to arbitrary addresses (e.g. an auto-reply to the visitor) would require requesting production access in the SES console.

### 17.4 Operating it
```bash
cd infrastructure
npm install
npx cdk diff        # preview changes
npx cdk deploy      # deploy (account 974268348686, us-east-1; uses your AWS CLI credentials)
```
- **Change the recipient or allowed origins:** edit `bin/app.ts` and redeploy. If the endpoint URL ever changes, update `formEndpoint` in `src/config.js` and push.
- **Logs:** CloudWatch → Log groups → `VlBizbridgeContactApiStack-ContactHandlerLogs…`.
- **Test from the command line:**
  ```bash
  curl -X POST https://wwblj3kwj6.execute-api.us-east-1.amazonaws.com/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","phone":"+91 90000 00000","email":"you@example.com","service":"GST registration & filing","message":"Test"}'
  ```

---

## 18. Email (`support@vlbizbridge.com`)

Mailbox: **GoDaddy Professional Email** (`support@vlbizbridge.com`), managed in the GoDaddy dashboard. Because DNS is in Route 53, its records were added there:

| Type | Name | Value | Purpose |
|---|---|---|---|
| MX | `@` | `0 smtp.secureserver.net`, `10 mailstore1.secureserver.net` | Incoming mail |
| TXT | `@` | `T8211789` | GoDaddy ownership verification |
| TXT | `@` | `v=spf1 include:secureserver.net -all` | SPF |
| TXT | `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc_rua@onsecureserver.net; adkim=r; aspf=r;` | DMARC |
| CNAME | `secureserver1._domainkey`, `secureserver2._domainkey` | `s1/s2.dkim.vlbizbridge_com.8fd.onsecureserver.net` | GoDaddy DKIM |
| CNAME | `email` | `email.secureserver.net` | Webmail shortcut |
| SRV | `_autodiscover._tcp` | `100 1 443 autodiscover.secureserver.net` | Outlook/mail-app autoconfiguration |
| CNAME ×3 | `<token>._domainkey` | `<token>.dkim.amazonses.com` | SES DKIM for website form emails |

Route 53 stores the two `@` TXT values in a single record set. That's normal.
