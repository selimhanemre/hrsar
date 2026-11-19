# SPEC — HRS HVAC & Refrigeration Service Website

Status: LOCKED (agreed with client owner via interview, 2026-11-18)
Change note 2026-11-19: form backend re-scoped — Formspree DROPPED. Forms
(estimate + /reviews feedback) are native Astro POSTs to the config-driven
endpoint `site.formUrl` (src/config.ts), a blank placeholder for now; the
backend is intentionally non-functional until the client supplies the
endpoint. Email delivery out of QA scope until then. Also corrected the
Routes header count (11 → 12).
Project folder: /mnt/data/projects/hrsar

## Goal
Replace the existing HiBu site (https://hrsar.com/) with a modern, personal,
custom-feeling static marketing site for HRS HVAC & Refrigeration Service —
family-owned since 2017, serving all of Arkansas. Live at hrsar.com.

## Client facts
- Business: HRS HVAC & REFRIGERATION SERVICE (Little Rock, AR; state-wide service)
- Phone (primary CTA): (501) 381-7751 — tel: links everywhere
- Hours: Mon–Fri 8:00 AM – 4:30 PM; Closed Sat–Sun; 24/7 emergency service (incl. holidays)
- Credentials: Licensed, Insured, Bonded · Manufacturer Certified · 24/7 emergency · Free estimates · Warranties · Fully stocked trucks
- Google listing (5.0★, verified live 2026-11-18): https://maps.app.goo.gl/5kG57BRumTnVDidX8
- Form destination: client will supply the backend endpoint later — config-driven via `site.formUrl` (blank placeholder for now)
- Old site (asset + copy source): https://hrsar.com/ (HiBu, CDN: le-cdn.hibuwebsites.com/5c18325ef6f0423aa8533ec69aa4dc75/)

## Stack
- Astro (static output) + Tailwind CSS
- Private GitHub repo: `hrsar` (owner: our org)
- Hosting: GitHub Pages (deploy branch from GitHub Actions CI on push to main)
- DNS: client controls hrsar.com; at cutover hand over CNAME records
  (root → GitHub Pages CNAME mechanism; www → <owner>.github.io)

## Routes (12)
1. /                       Home
2. /services               Services hub
3. /services/hvac-installation
4. /services/preventative-maintenance
5. /services/repairs-emergency        (24/7 angle, urgent CTA)
6. /services/system-upgrades-retrofits
7. /services/commercial-kitchen-exhaust
8. /services/commercial-refrigeration
9. /about                  Family-owned story, trucks, certifications
10. /projects               Gallery (old-site photos + truck photos)
11. /contact                Free estimate form (native Astro → site.formUrl)
12. /reviews                "Leave a review" star funnel (see Review flow)

## Review flow (/reviews)
Branded page (logo, on-brand colors, "How was your experience with HRS?"):
- Interactive 5-star widget (hover + selected states).
- 4–5★ selected → thank-you card + big "Leave us a review on Google" button
  opening https://maps.app.goo.gl/5kG57BRumTnVDidX8 in a NEW tab (Google has
  no stable deep link to the review textbox; place page's "Write a review"
  is one tap away).
- 1–3★ selected → feedback form: optional name + required textarea
  ("Tell us what went wrong"), POSTs natively (Astro) to the config-driven
  endpoint `site.formUrl` with hidden field form_type=feedback (separable from
  estimate requests); success state: "thanks — we'll reach out to make it
  right".
- Linked from: home reviews section CTA, contact page, footer.

## Design direction
- Personal + modern, custom (NOT a template look). Client explicitly said
  assets "might hinder readability" — use only what serves readability.
- Hero: client background image (pick best of Background v1/v2/v3) + standing
  figure/truck photo; strong headline, dual CTA (Call now / Free estimate).
- Palette: derived from logo (inspect /mnt/data/projects/hrsar/assets logos).
- Logo: client PNG for header/footer; Logo_HRS_Icon.ico as favicon.
- Typography: one modern sans (e.g. Inter/Manrope) — avoid the old site's Poppins.

## Home page sections (order)
1. Hero (headline, subhead, dual CTA, standing figure photo)
2. Trusted-by strip (see below)
3. Why HRS (bullets: 24/7, free estimates, licensed/insured/bonded, manufacturer
   certified, fully stocked trucks, warranties, family-owned since 2017)
4. Services (6 cards → service pages)
5. Reviews (see below) + CTA to /reviews ("Share your experience")
6. Recent projects (photo strip → /projects)
7. Service area (state-wide, key cities: Little Rock, North Little Rock,
   Sherwood, Benton, Maumelle, Bryant, Jacksonville)
8. Final CTA band (phone + form)

## Trusted-by (9 logos — source from official sites; uniform muted/grayscale style, equal height)
- Accurex (kitchen ventilation — HRS is Accurex-certified)
- West Little Rock ("West LR") Hospital
- St. Jude's (hospital)
- McDonald's
- Hungry Joe's
- McGeorge Construction
- Granite Mountain Quarries
- Travel Centers of America (TA Truck Stops)
- Circle K
Fallback: if a clean logo can't be legally/practically sourced, render the name
as styled text in the same strip style. Flag any substitutions to the client.

## Reviews section
- Google rating line: "5.0 ★ on Google" with link to
  https://maps.app.goo.gl/5kG57BRumTnVDidX8 (rating verified live; review TEXT
  is not publicly accessible via bots — Yelp 403, Maps limited view).
- 4 sample five-star reviews (local names, AR towns, specific services) as
  clearly-marked placeholders in code (data file) so the client can swap in
  real reviews. Do NOT present samples as real Google reviews.

## Copy
Rewritten in a warmer, tighter, modern voice (not the old site's copy verbatim).
Keep all factual claims (since 2017, family-owned, 24/7, free estimates,
warranties, credentials). No invented awards/reviews/certifications.

## Assets
- Client folder: /mnt/data/projects/hrsar/assets (20 files, 77MB raw — do NOT
  ship raw)
- WhatsApp images = service truck photos (gallery + about)
- Collect from old HiBu CDN: hero-home, hero-hvac-installation,
  hero-preventative-hvac-maintenance, hero-repair-and-emergency,
  hero-system-upgrades-and-retrofits, hero-commercial-kitchen-exhaust,
  hero-commercial-refrigeration, content-home-01, video poster
- Optimization: heroes → WebP ≤500KB @1920w; gallery → ≤200KB; logos PNG;
  favicon ico. Total image payload per page < 1MB.

## Form
Formspree is DROPPED (2026-11-19). The form (estimate + /reviews feedback) is
built natively in Astro and POSTs to a config-driven endpoint `site.formUrl`
in src/config.ts. The endpoint is a placeholder (blank) for now — the backend
is intentionally NON-FUNCTIONAL; the client will supply it later. Fields:
name, phone, service needed (select of 6), message. Honeypot + Turnstile
optional. Success/failure states required. Email delivery is explicitly out of
QA scope until the client endpoint exists.

## SEO / Analytics
- LocalBusiness (HVACBusiness) JSON-LD on all pages: name, phone, geo, hours,
  areaServed Arkansas, sameAs Google listing.
- Per-page <title>/meta description/OG tags; sitemap.xml; robots.txt.
- GA4: config-driven snippet — `site.ga4` in astro.config (or config file) is
  BLANK for now; when blank, NO script tag renders. Client will supply the
  measurement ID later; enabling = one config value + redeploy.

## QA acceptance criteria (all must pass before cutover)
1. `npm run build` clean, no warnings treated as blocking
2. Lighthouse mobile ≥90 on Home: Performance, SEO, Accessibility, Best Practices
3. All 12 routes return 200 on the live Pages URL with correct content
4. Form validates and shows a proper success state on submit
5. Review funnel: 4–5★ shows Google button with correct Maps URL (target=_blank);
   1–3★ shows feedback form; review funnel feedback form shows success state
   (email delivery explicitly out of scope until the client endpoint exists)
6. Hero image ≤500KB; page image payload <1MB
7. tel: links open dialer; favicon renders; mobile responsive at 375/768/1280
8. GA4 script absent from HTML while config is blank
9. Live at hrsar.com after client DNS cutover (verify both root + www)

## Launch checklist
- [ ] QA green on Pages preview
- [ ] Client approves visual direction
- [ ] DNS: A/CNAME per GitHub Pages for hrsar.com + www
- [ ] Verify live (8 checks above) on hrsar.com
- [ ] Old HiBu site decommission (client decision)
