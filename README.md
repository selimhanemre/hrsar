# HRS HVAC & Refrigeration Service — Website

Marketing site for HRS HVAC & Refrigeration Service (family-owned HVAC +
commercial refrigeration, Little Rock, AR — serving all of Arkansas since 2017).

- **Live (target):** https://hrsar.com/
- **Phone:** (501) 381-7751
- **Google listing (5.0★):** https://maps.app.goo.gl/5kG57BRumTnVDidX8
- **Full requirements:** see [SPEC.md](SPEC.md) — read it before changing anything structural.

## For humans
A static site built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com),
deployed to GitHub Pages on every push to `main` (GitHub Actions). No backend —
the free-estimate form is handled by Formspree.

### Quick start
```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/
npm run preview  # preview the build
```

### Key locations
| What | Where |
|---|---|
| Site config (name, phone, GA4 id, form URL) | `src/config.ts` |
| Page content (copy, services, reviews, trusted-by) | `src/content/` (data files) |
| Optimized images | `public/assets/` |
| Raw client-provided assets (do not edit) | `assets/` (repo root, git-ignored) |
| Reviews (sample placeholders) | `src/content/reviews.ts` |

## For agents working in this repo
1. **Read SPEC.md first.** It is the locked client agreement — routes, copy
   rules, acceptance criteria, launch checklist.
2. **Copy rules:** warm, personal, modern voice. Never invent awards,
   certifications, or reviews. The 4 reviews in `src/content/reviews.ts` are
   SAMPLES the client will swap for real ones — keep them in the data file only.
3. **Assets:** never commit raw files from `assets/` (77MB of source images).
   Optimized web versions go in `public/assets/` (heroes WebP ≤500KB, gallery
   ≤200KB).
4. **GA4:** `site.ga4` in config is intentionally BLANK until the client sends
   the measurement ID. The snippet must render nothing when blank.
5. **Forms:** Formspree → selimhan.dagtas@gmail.com (interim). Estimate form and
   the /reviews feedback form share the endpoint; feedback posts carry
   form_type=feedback. Change destinations only via `src/config.ts`.
6. **Trusted-by logos:** 9 brands, uniform muted style. If a logo is
   substituted with styled text, note it in the PR.
7. **Before cutover:** all QA gates in SPEC.md must pass (Lighthouse mobile
   ≥90, 12 routes, form + review-funnel tests, image budgets, DNS records for
   hrsar.com).

## Launch status
- [ ] QA green
- [ ] Client visual sign-off
- [ ] DNS cutover (A/CNAME for hrsar.com + www → GitHub Pages)
- [ ] Live verification
