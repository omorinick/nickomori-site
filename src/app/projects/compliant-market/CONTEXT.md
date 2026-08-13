# DrugX — Project Context

## How to use this file

Read this file at the start of every session. Update it at the end of every session — decisions made, things built, things changed. If a decision from an earlier session gets reversed, overwrite it here. Do not preserve old decisions for historical record — this file should always reflect the current state, not the history. History lives in git.

---

## What this is

Satirical project: a StockX replica for drugs. The joke is that it looks indistinguishable from a real marketplace on the surface — deadpan StockX aesthetic, real drug names, real market-like data — with the comedy buried in the content (verification copy, accordion text, fine print, historical data labels).

**Goal:** Demonstrate product taste and design ability. Intended as a portfolio piece on nickomori.com, potentially shareable on LinkedIn. It should look polished enough to make someone do a double-take before they realize what it is.

---

## Route & entry point

- **URL:** `/projects/compliant-market`
- **Card on:** `/projects` (labeled "Constructive Distractions" section)
- **Card text:** "DrugX" with a "Satire" badge, description: "A peer-to-peer marketplace for pharmaceutical assets. Third-party verified. No questions asked."

---

## What's built (v2)

### Header (`DrugXHeader.tsx`)
- Sticky full-width header styled like StockX
- Logo: "Drug" white + "X" green (#00bb29)
- Circled question-mark next to the logo with an "About" tooltip. Opens a polished pitch modal that explains the fictional marketplace thesis across leftover inventory, verification, unusual provenance, and neighbor-priced medicine; ends with a Mystery Box postscript and an explicit satire/safety disclosure.
- Wide search bar: "Search for substance, brand, etc." (non-functional, visual only)
- Search and account actions collapse on small screens so the logo, About control, and pill-ID action remain usable.
- Right nav: Help · Sell · Affiliate · Login · Sign Up
- Sub-nav with active underline: **Pills** | Injections | Powders | Collectibles | Mystery Box
- All nav items are non-functional (visual only)

### Back-bar scroll reveal (`DrugXPageShell.tsx`)
- "← Back to Constructive Distractions" bar sits above the header in the DOM
- On mount, auto-scrolls to 44px (height of the bar) so the DrugX header appears to be the top of the page
- Scrolling up past zero reveals the back bar — works especially well on iOS elastic scroll
- On desktop, user reaches it by scrolling to the very top

### Product page (`CompliantMarketClient.tsx`)
Hero drug: **Adderall XR 30mg**

**Left column (image):**
- Light product-photo container with the 3D rotating pill (see PillScene below)
- Pill color changes with the selected dosage; variant name and SKU update with it
- Functional favorite toggle and native share / copy-link action
- "Verified by DrugX" badge opens the verification dialog
- CSS capsule fallback displays while WebGL loads

**Right column (purchase details):**
- Product name, dosage, release type, color, per-dosage SKU, and "Open box" condition
- "Xpress Dose" fulfillment treatment with no stale calendar date
- Dosage dropdown (10mg / 20mg / 30mg) updates pill color, variant, SKU, ask, offer, and last sale
- Three-cell market summary: Lowest Ask, Highest Offer, and Last Sale
- Make Offer, Buy Now, and Sell Now open accessible satirical transaction dialogs rather than acting as dead controls
- 30-day volume and price-history anchor
- Three accordion sections:
  - Return Policy
  - Buyer Promise
  - Our Process / Lab Verified

**Price history chart:**
- Recharts LineChart, green line, dark card container
- Four timeframes: 1W / 1M / 3M / 1Y — all functional with real hardcoded data
- 1Y view has a note: "September spike attributed to back-to-school demand. Market self-corrected by November." — this is an intentional easter egg
- Anchor id="price-chart" for the "View Market Data" link

**Historical Data section:**
- 6-stat grid matching StockX's "Historical Data" layout
- Stats: Price Range 12M, Price Range 3M, Volatility (24%), Number of Sales (3,847), Price Premium (189% vs. Pharmacy MSRP), Avg Sale Price 3M
- "vs. Pharmacy MSRP" label on Price Premium is an easter egg

**Recent Sales:**
- Responsive sales ledger showing fictional price, dosage, provenance, condition, and recency
- Includes deadpan source labels such as "Estate cleanout," "Coat pocket," and "Medicine cabinet"

**How DrugX works:**
- Three-step marketplace explanation: list unused supply, independent third-party verification, and transparent fair-market access
- This section carries the concept's serious product pitch; satire is deliberately restrained so the underlying problems and value proposition feel credible
- Replaces the old generic information cards and non-functional Learn More links

**Related Products:**
- 5 cards: Xanax 2mg, Oxycodone 10mg, Ambien 10mg, Claritin 10mg (the OTC inclusion is an intentional joke), and Semaglutide 1mg
- Capsule listings use the original rotating Three.js pill treatment
- Semaglutide uses a dedicated procedural Three.js prefilled injection pen with a pearl barrel, branded cap, dose dial/window, transparent cartridge collar, and manufactured metal details
- Responsive scroll-snap rail on mobile and five-column grid on desktop
- Selecting a product gives fictional regulatory-review feedback; no additional product routes exist

**DrugX Labs:**
- Header ID action opens an accessible shadcn dialog with a fictional pill-upload surface
- Explicitly states that no analysis occurs and DrugX is not an identification service

**Fine print:**
- Clear satire and safety disclosure: all products, prices, verification claims, and transactions are fictional; do not buy, sell, share, or take unidentified medication

### 3D pill (`PillScene.tsx`)
- React Three Fiber + Three.js `CapsuleGeometry`
- Two-tone via vertex colors baked into the geometry (so colors rotate WITH the pill, not as a screen-space mask)
- Current color: blue (#3b6fd4 / #6b9fe8)
- `MeshPhysicalMaterial` with clearcoat=1 for pharmaceutical gloss
- Auto-rotates on Y axis at 0.65 rad/sec, subtle Y-axis float
- Honors `prefers-reduced-motion` by holding the pill in a static product pose
- Loaded via `dynamic(() => import('./PillScene'), { ssr: false })` — Three.js is client-only
- White container background makes it look like a product photo

### Data (`src/data/projects/compliant-market.ts`)
All data is hardcoded. Types exported:
- `PRODUCT` — dosage options, visual details, SKUs, prices/bid/ask/lastSale per dosage, price history per timeframe
- `RELATED_LISTINGS` — 5 related drugs
- `HISTORICAL_STATS` — 6 stat cards
- `RECENT_SALES` — fictional market activity ledger
- `MODALS` — verification + buyerProtection modal copy

### Scoped visual system (`globals.css`)
- `.drugx-theme` provides cooler black/graphite surfaces, neutral borders, and DrugX green without changing the warm editorial tokens used by the rest of nickomori.com
- DrugX dialogs carry the scoped theme through their portals

---

## Key decisions made

| Decision | Choice | Reason |
|---|---|---|
| Brand name | DrugX | Renames "Compliant Market"; URL stays `/projects/compliant-market` |
| Satire style | Deadpan, easter eggs in content | "Looks real" is the primary effect; jokes reward exploration |
| Drug names | Real names (Adderall, Xanax, etc.) | Recognition is the joke |
| 3D pill | React Three Fiber + CapsuleGeometry | Proper WebGL quality without needing a model file |
| Pill color | Dosage-specific two-tone palette | Makes the dosage control visible in the product image and keeps variant copy consistent |
| Chart library | Recharts | Real interactivity, looks authentic |
| Images | 3D pill for hero and related capsules; custom 3D injection pen for Semaglutide | Motion and product detail are part of the project's premium marketplace illusion |
| Back navigation | Overscroll reveal above sticky header | Clever UX, doesn't break the StockX immersion |
| All data | Hardcoded | No backend warranted for a satirical POC |

---

## Known issues / gotchas

- **Related products have no detail routes.** Selection currently provides an in-world status message. If individual product pages are added later, wire the cards to those routes.
- **The 3D pill fallback covers loading, not a hard WebGL failure.** A true runtime failure boundary would still be needed for browsers that cannot initialize WebGL.
- **The scroll-reveal back bar** is less obvious on desktop (you have to scroll to the very top). On iOS it feels natural via elastic bounce. Could add a subtle visual hint if this becomes confusing.
- **`CapsuleGeometry`** is Y-axis aligned by default. The mesh is rotated `[0, 0, Math.PI/2]` to lay horizontal. The vertex color split is at y=0 in geometry space, which becomes the center of the horizontal pill. This is intentional.

---

## What's next (v2 ideas, discussed but not built)

- **Marketplace homepage** — grid of listings (Adderall, Xanax, Oxycodone, etc.) with trending indicators, search that works, category filtering
- **Pill identification tool** — the CTA button is already present. Could hook up an open-source pill ID API or ML model. Nick flagged this as v2.
- **Seller affiliate program page** — its own page, purely satirical copy
- **Actual pill images** — Nick could swap the 3D pill for real product photography. The component accepts image props cleanly; the container is already sized for it.
- **Individual pages for related products** — each related card could link to its own detail page. Data structure supports it; just needs routes.
- **Shareability** — add OG meta tags if this ever gets posted publicly
