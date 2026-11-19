# HRS Design System — Logo, Palette, Theme, Hero

Derived from actual pixel/vector analysis of the client assets in `assets/`
(logos rendered from the EPS/PDF vectors at 300dpi, not eyeballed).
Palette hexes below are the dominant quantized colors measured in the files.

---

## 1. LOGO ANALYSIS

### `Logo_HRS_2024-01.png` (icon, 3300×2550, white bg) — **the icon**
A single emblem built as a **heating/cooling mark**:
- **Left: orange-red flame** (deep red core `#C82828` → vermilion `#E85828`) = heating.
- **Upper right: blue element** (muted teal-blue `#1B8AB2`) = air/cooling.
- **Base: green band** (forest `#167A33` → lime `#98B535`) = refrigeration/eco.
- Small bright-red accent flecks (`#F01430`).
Simple, bold, flat shapes. This is the **primary icon** — it works alone at any
size. `Logo_HRS_2024-01_50 smaller.png` is just this at 50%: the client already
cut a header-size version, which tells us the icon is the intended header asset.

### `Logo_HRS_2024_Full-Body.png` (1176×2850, transparent) — **the full lockup**
Portrait lockup, two zones:
- **Left: the large emblem** — orange flame top, bright-azure blue base bottom
  (blues `#30B0F0` + `#1090D0`), same icon enlarged.
- **Right: stacked wordmark block** — a small icon on top, then the **"HRS"
  wordmark in bright azure blue** (`#1090D0`/`#30B0F0`) with **charcoal
  `#303030`** subtext ("HVAC & REFRIGERATION SERVICE" + tagline).

**Verdict**
- **Primary wordmark:** the blue "HRS" in the full-body lockup.
- **Primary icon:** the flame/snowflake/eco emblem (`Logo_HRS_2024-01`).
- **Best in a 40–64px header: the icon** (`Logo_HRS_2024-01_50 smaller.png`).
  The full-body lockup is multi-line with small subtext — it collapses to mush
  at header size. Use the icon in the header + footer; reserve the full lockup
  for the /about page and the /reviews branded page. Favicon:
  `Logo_HRS_Icon.ico` (per SPEC).

---

## 2. EXACT BRAND COLORS

Measured from the vector render (full-body EPS) and the icon PNG:

| Color | Hex | Role |
|---|---|---|
| **HRS Blue** (bright azure) | `#129BE0` | **Primary.** Wordmark blue, buttons, links, key accents. (Measured range `#30B0F0`↔`#1090D0`; `#129BE0` is the midpoint.) |
| **Sky** | `#38B6F2` | Primary-light — hovers, tints, icon's light-blue face. |
| **Deep Blue** | `#0C6FA8` | Primary-dark — pressed states, dark-band text, footer accents. |
| **Icon Blue** (muted teal) | `#1B8AB2` | Secondary surface color (the icon's blue element); use sparingly, don't mix into the UI blue. |
| **Flame Orange** | `#F2652E` | **Accent / CTA color.** The flame. Save for the #1 action (Call now) and small heat highlights. |
| **Ember Red** | `#D22B3A` | Flame core — micro-accent only (badges, emergency dot). Never large fills. |
| **Pine Green** | `#2F8A3C` | The icon's base band — tertiary accent, "eco/refrigeration" tag, maintenance service chips. |
| **Ink** | `#2B2B2B` | Headings/body dark text (measured `#303030`). |
| **Cool Paper** | `#F5F8FA` | Page background — white with the faintest blue cast (ties to the azure). |

Rule of thumb: **blue does 80% of the work, orange does 15%, green+red 5%.**
The client's blue is a *bright azure* — do **not** drift it navy (that's what
makes it read "HVAC company" and keeps it personal, not corporate-bank).

---

## 3. TAILWIND V4 THEME

Paste-ready `@theme` block (Tailwind v4 CSS-first):

```css
@theme {
  /* Type — modern + personal, NOT Poppins/Inter-everything */
  --font-display: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;

  /* Brand blue (measured from logo: #30B0F0 / #1090D0) */
  --color-brand-50:  #EFF8FE;
  --color-brand-100: #D8EEFC;
  --color-brand-200: #B5E0F9;
  --color-brand-300: #86CDF5;
  --color-brand-400: #4FB6F0;
  --color-brand-500: #129BE0;   /* primary — the wordmark blue */
  --color-brand-600: #0E82C4;
  --color-brand-700: #0C6FA8;   /* primary-dark */
  --color-brand-800: #0B527B;
  --color-brand-900: #0B3D59;
  --color-brand-950: #072436;   /* hero overlay / dark bands */

  /* Accent — the flame */
  --color-accent-400: #FF8A52;
  --color-accent-500: #F2652E;  /* CTA orange */
  --color-accent-600: #D84E1E;
  --color-ember-500: #D22B3A;   /* emergency red, micro-accent */

  /* Pine — icon base, refrigeration/eco tag */
  --color-pine-500: #2F8A3C;
  --color-pine-700: #1E5C28;

  /* Neutral scale — cool slate cast, matches azure */
  --color-neutral-50:  #F5F8FA;
  --color-neutral-100: #E9EEF2;
  --color-neutral-200: #D5DFE7;
  --color-neutral-300: #B2C2CE;
  --color-neutral-400: #8AA0B0;
  --color-neutral-500: #64809A;
  --color-neutral-600: #4A637B;
  --color-neutral-700: #3A4F63;
  --color-neutral-800: #2B3A49;
  --color-neutral-900: #22303D;
  --color-neutral-950: #131D27;

  /* Ink — text darks */
  --color-ink: #2B2B2B;
}
```

Google Fonts import (put in `<head>` or CSS):
`https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap`

- **Display = Sora** — geometric, slightly rounded, techy-but-warm; reads "modern
  trades company," not "fintech."
- **Body = Manrope** — very personal, highly readable, humanist. The pair shares
  the same DNA so they feel like one family (SPEC suggests Manrope; Sora gives
  the display personality it was missing).
- Use `font-display` for H1–H3, Manrope for everything else. Tight tracking
  (`-0.02em`) on display, normal on body.

---

## 4. HERO RECOMMENDATION

**Use `Background v2.jpg` (3000×1164) as the hero background.** It's not a
photo — it's the **brand emblem blown up into a wide banner**: orange flame on
the left ~40%, flat azure blue on the right ~55%, green band along the bottom,
red fleck bottom-left. That makes it a *perfect* hero backdrop: it IS the
brand, and it has a naturally quiet zone (the flat blue) to put text on.

(Do **not** use `.staging/oldsite/hero-home.jpg` — it's a 1920×1471
grayscale photo, no brand color, and reads "template." `Background Logo.jpg`
is the same icon-banner as v2 at the same dimensions; v2 is the pick per SPEC
"pick best of v1/v2/v3.")

**Layout (desktop ≥1024px)**
- Full-bleed background, `object-cover`, min-height ~85vh.
- **Text block sits in the right ~45%** (over the flat blue zone), left-aligned
  inside that zone, vertically centered. Never center text over the flame side.
- **Overlay: directional, not uniform** — a horizontal gradient that keeps the
  flame side alive and darkens the text side:
  `bg-gradient-to-l from-brand-950/90 via-brand-950/45 to-transparent`
  (i.e. 90% ink on the far right → 45% mid → 0% over the flame). The bright
  flame at left stays ~95% visible. This is the single move that makes it feel
  custom.
- **Mobile (<768px):** the banner's split goes off-canvas, so switch to a near-
  uniform `bg-brand-950/75` overlay, left-align text bottom-third, and let the
  orange show through at the top edge.

**Content (24/7 HVAC business)**
1. **Eyebrow chip:** small pill, flame orange text/border —
   "24/7 Emergency Service · Arkansas-wide" (this is the #1 differentiator —
   lead with it, don't bury it).
2. **H1 (Sora, brand-50, 44–64px):** personal + specific, e.g.
   *"Your family-owned HVAC crew in Little Rock — 24/7."*
3. **Subhead (Manrope, white/85, 18–20px):** one line — licensed, insured,
   bonded, free estimates, since 2017.
4. **Dual CTA, right below:**
   - Primary: **`tel:` button, flame orange `bg-accent-500`** → "Call (501) 381-7751"
     (orange on the blue side = maximum contrast + it's the only orange in the UI, so it pops).
   - Secondary: white outline → "Get a Free Estimate" → /contact.
5. **Trust chip row** (small, white/70 text, dot-separated): Licensed · Insured ·
   Bonded — Manufacturer Certified — Fully Stocked Trucks — Warranties.
6. **Personal touch (the "not a template" element):** the truck photo from
   `assets/WhatsApp Image…(4).jpeg` (1600×900) as a **rounded card overlapping
   the hero's bottom edge** (bottom-right on desktop, hidden ≤640px), with a
   one-line caption ("Out on a call in Sherwood — trucks stocked for common
   issues"). One real photo of their truck = the whole "personal" direction.

**Perf (SPEC QA gate):** convert to WebP @1920w, ≤500KB, `fetchpriority=high`,
plus a `background-color: #072436` (brand-950) behind it so LCP doesn't paint
white.

---

## 5. DO / DON'T — "Personal + Modern"

**DO**
- **Keep the azure bright.** `#129BE0`, not navy. The bright blue + orange flame
  is the whole personality; desaturating it to corporate navy kills the brand.
- **Let the icon-banner hero do the talking.** One big branded graphic + one
  real truck photo + short copy = custom. No generic stock "technician smiling"
  hero shots (that's the HiBu look they're replacing).
- **One real photo per section max.** Trucks, crew, installed units. The
  WhatsApp truck shots (dark parking-lot shots) are fine — moody, real,
  un-retouched.
- **Warm, first-person copy.** "We," "our trucks," "since 2017." 24/7 gets its
  own breathing room (badge, /services/repairs-emergency page).
- **Use the full-body lockup on /about and /reviews** — it's the "full
  introduction" of the brand; the icon in the header is the "handshake."
- **Round corners generously** (cards `rounded-2xl`, buttons `rounded-full`) —
  friendly, modern, trades-appropriate.
- **Sora for numbers** (phone, "5.0 ★", "since 2017") — it makes data feel
  branded.

**DON'T**
- **Don't drop the full-body lockup into the header.** Multi-line lockup at
  48px = unreadable mush. Icon only.
- **Don't make orange a surface color.** Orange is the flame: buttons, the
  emergency dot, 2–3 accents per screen. An orange section background reads
  "car dealership."
- **Don't add a third blue.** The muted icon-blue (`#1B8AB2`) exists *inside
  the logo only* — mixing it into the UI creates a muddy second palette.
- **Don't use uniform dark overlays on the hero** (flat `black/60` everywhere) —
  it buries the flame and makes the branded graphic look like a stock photo.
  Directional gradient only.
- **Don't use Poppins, Roboto, or Inter for display.** (Old site = Poppins;
  Inter-for-everything = template.) Sora + Manrope is the call.
- **Don't center everything.** Left-aligned text blocks, asymmetric hero,
  overlapping truck card. Centered hero + 3 identical cards = the look being
  replaced.
- **Don't put green in the UI system** except refrigeration/eco service chips —
  it's part of the icon's story, not a palette citizen.
- **Don't ship raw assets** (SPEC: heroes WebP ≤500KB, page payload <1MB).
