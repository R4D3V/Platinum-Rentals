# Ninety Nine Property Consultants — Website

A Next.js 16 + Tailwind CSS 4.3 marketing site for Ninety Nine Property Consultants, a Kampala property
consultancy specialising in rental management and the sale of land. Built in a neumorphic style: soft, embossed surfaces, raised buttons,
pressed input fields, and raised icon chips — all on one warm-neutral base with the brand's
red (`#BE1D2C`, sampled from the logo) as the single accent.

## Stack

- **Next.js 16.2.1** (App Router, multi-page)
- **React 19**
- **Tailwind CSS 4.3** (CSS-first config via `@theme` in `src/app/globals.css` — no `tailwind.config.js` needed)
- **lucide-react** for icons
- Fonts: **Manrope** (display/headings) + **Inter** (body), both loaded via `next/font/google`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero with a WhatsApp-connected quick-enquiry form, trust bar, links out to the four pages below |
| `/services` | Grid of all 10 services, each linking to its own detail page |
| `/services/[slug]` | Full detail per service: overview, what's included, ideal-for, FAQs, related services |
| `/why-us` | Six reasons landlords choose Ninety Nine Property Consultants + an "Informal Caretaker vs. Ninety Nine" comparison table |
| `/how-it-works` | The 4-step onboarding process, each step with its own icon and illustration panel |
| `/areas` | Per-neighbourhood detail cards + an embedded coverage map |
| `/contact` | Contact info, embedded office map, and a WhatsApp-connected enquiry form |

Every form on the site (`Hero` on the homepage and the `Contact` page form) submits via
`src/lib/whatsapp.ts` — it builds a `wa.me` deep link from the form fields and opens it in a
new tab, so enquiries land directly in WhatsApp (+256 785 175160) instead of a backend inbox.
Clicking "Get in Touch" from a service detail page pre-fills the contact form's message with
that service's name via a `?service=` query param.

## Project structure

```
src/
  app/
    layout.tsx            — fonts, metadata, renders shared Header + Footer around every page
    page.tsx                — Home
    globals.css              — design tokens + neumorphic utility classes
    icon.png                  — favicon (cropped from the logo mark)
    services/page.tsx          — services list
    services/[slug]/page.tsx    — service detail (statically generated for all 10 slugs)
    why-us/page.tsx
    how-it-works/page.tsx
    areas/page.tsx
    contact/page.tsx
  components/
    Header.tsx        — sticky neumorphic nav (now links to real routes)
    Hero.tsx           — homepage headline + WhatsApp quick-enquiry card
    TrustBar.tsx        — 4 key-fact chips
    HomeExplore.tsx      — homepage teaser cards linking to the 4 detail pages
    Services.tsx          — full service grid, used on /services
    WhyChooseUs.tsx        — reasons + comparison table, used on /why-us
    HowItWorks.tsx          — 4-step process with icons + illustrations, used on /how-it-works
    AreasWeServe.tsx         — neighbourhood cards + map, used on /areas
    Contact.tsx               — contact card + map + WhatsApp form, used on /contact
    IconPanel.tsx              — reusable illustrative icon panel (stand-in for photography)
    PageHero.tsx                — shared interior-page header banner
    LandlordCta.tsx
    Footer.tsx
  lib/
    services.ts        — data for all 10 services (title, icon, overview, included, FAQs...)
    whatsapp.ts          — builds wa.me links; submitFormToWhatsApp() wires any <form> to it
public/
  logo.png            — full logo, transparent background
  logo-solid.png        — full logo, white background
  icon-mark.png          — cropped house/bar-chart mark only
```

## Design tokens

All defined in `src/app/globals.css` under `@theme`:

| Token | Value | Use |
|---|---|---|
| `--color-surface` | `#eceef1` | Base neumorphic surface |
| `--color-shadow-light` / `--color-shadow-dark` | `#ffffff` / `#c3c9d4` | Dual-shadow pairs for raised/pressed surfaces |
| `--color-ink` | `#17181b` | Primary text |
| `--color-accent` | `#be1d2c` | Brand red, sampled directly from the logo |

Neumorphic utility classes (`.surface-raised`, `.surface-pressed`, `.btn-neu`,
`.btn-neu-accent`, `.input-neu`, `.icon-chip`) live in the same file under `@layer components`
so every card, button, and field shares one consistent shadow system.

## Maps

The coverage map (`/areas`) and office map (`/contact`) use a key-less Google Maps embed
(`https://www.google.com/maps?q=...&output=embed`). This works out of the box with no API key,
but for production reliability consider switching to the official
[Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started) with a key.

## WhatsApp number

Set in one place: `WHATSAPP_NUMBER` in `src/lib/whatsapp.ts` (currently `256785175160`,
i.e. +256 785 175160). Change it there and every form on the site updates.

## Content source

Copy is adapted directly from the supplied company profile (services, values, coverage
area, process, and contact details), expanded with additional detail for the dedicated
service/why-us/how-it-works/areas pages. Update `src/lib/services.ts` and the relevant
`src/components/*.tsx` files to edit copy.

