# SPEC — HRS Arkansas (hrsar.com)

Locked blueprint. Supersedes the former Astro-site SPEC. Phase 1 baseline established by the static-site repo swap (2026-11-21).

## Goal

Replace the published Astro site with the `hrs-demo-website` design, personalized with real HRS assets + real reviews + trusted-by marquee. Live at hrsar.com (client controls DNS CNAME — no repo-side domain change; `cname` is null and stays null).

## Stack

Pure static HTML/CSS/JS, no build step. Served by GitHub Pages from the `gh-pages` branch (`build_type: deployment`, source `/`).

## Pages

- `index.html` — home
- `about.html` — about
- `services.html` — services
- `contact.html` — contact
- `404.html` — not found

## Design direction

- Modern. Palette: fiery red primary (heating), cool blue secondary (cooling), leaf green tasteful accent.
- Real HRS logo in header (icon), footer (full-body), and favicon. Header icon PNG is trimmed to the mark (no internal padding) — keep it that way.
- Hero keeps the demo layout; right column is the booking card only (full-body hero logo removed on client revision, 2026-11-22).
- No utility bar (removed site-wide on client revision, 2026-11-22). Header must stay one line at 1024px: phone `white-space: nowrap`, `nav-close` + in-nav CTA are mobile-only.
- Backgrounds / WhatsApp photos used sparingly.

## Home

- 3 real reviews (Jim T, Travis Cassell, Sabrina Langston) in the existing quote grid; quotes shortened to similar length with leading/trailing ellipses (client-selected excerpts, no clamp/expand mechanism).
- "Trusted by" marquee of all 9 client logos — pause on hover + honor `prefers-reduced-motion`.

## Contact

- Phone `(501) 381-7751` only. The demo's mobile number `(501) 613-4331` must be removed (verified at swap: the demo source already uses `(501) 381-7751` exclusively; keep it that way).
- Form = `mailto:` prefill to `selimhan.dagtas@gmail.com`, driven by a single config constant so a GoHighLevel form can be swapped in later.

## Phases

- **Phase 1** (this card): repo swap + Pages deploy config (infra) + home/contact pattern (designer).
- **Phase 2** (only after human sign-off): about/services/404 treatment + full QA. Do not start before sign-off.

## QA

- All 5 pages render.
- No asset 404s.
- No squished images (the demo's "Why HRS" section has a squished image to fix).
- Responsive mobile/desktop.
- Live URL verified.

## Asset layout (post-swap)

- `assets/hrs/` — real HRS logos, 3 backgrounds + background-logo, 3 WhatsApp photos (20 files). Vaulted copy: `/mnt/data/projects/hrsar-asset-vault/hrs-assets/`.
- `assets/logos/` — 9 client logos (accurex, circle-k, granite-mountain, hungry-joes, mcdonalds, mcgeorge, st-judes, ta-truck-stops, west-little-rock-hospital). Vaulted copy: `/mnt/data/projects/hrsar-asset-vault/client-logos/`.
- `assets/img/` — demo's own placeholder imagery (to be superseded by real assets per design direction).

## Deploy notes

- `gh-pages` branch = mirror of `main` (plain push, no force-push; history preserved).
- Pages source: `build_type=deployment`, `source.branch=gh-pages`, `source.path=/` (switched from the old Astro `build_type: workflow` on 2026-11-21).
- `.nojekyll` present at repo root (disables Jekyll processing on Pages).
