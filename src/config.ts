// Single source of truth for site-wide values.
// Change clients (phone, form target, GA4) HERE only — see README.md.
export const site = {
  name: 'HRS HVAC & Refrigeration Service',
  shortName: 'HRS',
  tagline: 'Commercial HVAC & Refrigeration — Serving All of Arkansas',
  phone: '(501) 381-7751',
  phoneHref: 'tel:+15013817751',
  email: 'selimhan.dagtas@gmail.com',
  mapsUrl: 'https://maps.app.goo.gl/5kG57BRumTnVDidX8',
  // Formspree endpoint (https://formspree.io/f/xxxx) — set by INFRA card once created.
  formUrl: '',
  // GA4 measurement ID — intentionally BLANK. Snippet renders nothing until set.
  ga4: '',
  serviceArea: [
    'Little Rock',
    'North Little Rock',
    'Sherwood',
    'Benton',
    'Maumelle',
    'Bryant',
    'Jacksonville',
  ],
} as const;
