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

## What's built (v1)

### Header (`DrugXHeader.tsx`)
- Sticky full-width header styled like StockX
- Logo: "Drug" white + "X" green (#00bb29)
- Wide search bar: "Search for substance, brand, etc." (non-functional, visual only)
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
- White rounded container, h-[480px]
- 3D rotating pill (see PillScene below)
- Heart + share icon overlay buttons (visual only)
- "✓ Verified Authentic · What's this?" badge — opens verification modal
- Carousel dots (visual only, 3 dots)

**Right column (purchase details):**
- Product name, variant, SKU
- QuickPack available badge with lightning bolt (visual only)
- Dosage dropdown (10mg / 20mg / 30mg) — functional, updates price/bid/ask/last sale
- Buy box: "Buy Now for $[ask]" + "⚡ 1,247 Sold in Last 30 Days!"
- "$[ask] Includes DrugX Service Fee ?" — ? opens buyer protection modal
- Make Offer + Buy Now buttons (visual only)
- "Pay over time with Venmo or Cash App or Crypto"
- Last Sale price + "View Market Data →" (anchor link to chart)
- "Sell Now for $[bid] or Ask for More →"
- Three accordion sections:
  - Return Policy (easter egg: deadpan return policy copy)
  - Buyer Promise (easter egg: "Not valid in states with recreational laws. Or the other states.")
  - Our Process — shows "Condition: Lab Verified" (easter egg: "We cannot provide further details at this time.")

**Price history chart:**
- Recharts LineChart, green line, dark card container
- Four timeframes: 1W / 1M / 3M / 1Y — all functional with real hardcoded data
- 1Y view has a note: "September spike attributed to back-to-school demand. Market self-corrected by November." — this is an intentional easter egg
- Anchor id="price-chart" for the "View Market Data" link

**Historical Data section:**
- 6-stat grid matching StockX's "Historical Data" layout
- Stats: Price Range 12M, Price Range 3M, Volatility (24%), Number of Sales (3,847), Price Premium (189% vs. Pharmacy MSRP), Avg Sale Price 3M
- "vs. Pharmacy MSRP" label on Price Premium is an easter egg

**Info cards:**
- Our Process: "We cannot provide further details at this time."
- Buyer Promise: "Terms apply. Most states excluded."
- Start Selling ASAP: "No background check required."

**Related Products:**
- 5 cards: Xanax 2mg, Oxycodone 10mg, Ambien 10mg, Claritin 10mg (the OTC inclusion is intentional joke), Adderall XR 10mg
- Cards use CSS 2D capsule placeholders (not 3D — appropriate for thumbnail size)
- Non-functional (no detail pages yet)

**Pill ID CTA banner:**
- "Found a pill you can't identify? Upload it. We'll tell you what it's worth."
- Button is disabled with "Coming Soon · DrugX Labs™" label
- Placeholder for a future feature (v2)

**Fine print:**
- "DrugX is a satirical project. All prices are fictional. No actual transactions occur."
- Intentionally faded (20% opacity)

### 3D pill (`PillScene.tsx`)
- React Three Fiber + Three.js `CapsuleGeometry`
- Two-tone via vertex colors baked into the geometry (so colors rotate WITH the pill, not as a screen-space mask)
- Current color: blue (#3b6fd4 / #6b9fe8)
- `MeshPhysicalMaterial` with clearcoat=1 for pharmaceutical gloss
- Auto-rotates on Y axis at 0.65 rad/sec, subtle Y-axis float
- Loaded via `dynamic(() => import('./PillScene'), { ssr: false })` — Three.js is client-only
- White container background makes it look like a product photo

### Data (`src/data/projects/compliant-market.ts`)
All data is hardcoded. Types exported:
- `PRODUCT` — dosage options, prices/bid/ask/lastSale per dosage, price history per timeframe
- `RELATED_LISTINGS` — 5 related drugs
- `HISTORICAL_STATS` — 6 stat cards
- `INFO_CARDS` — 3 bottom cards
- `MODALS` — verification + buyerProtection modal copy

---

## Key decisions made

| Decision | Choice | Reason |
|---|---|---|
| Brand name | DrugX | Renames "Compliant Market"; URL stays `/projects/compliant-market` |
| Satire style | Deadpan, easter eggs in content | "Looks real" is the primary effect; jokes reward exploration |
| Drug names | Real names (Adderall, Xanax, etc.) | Recognition is the joke |
| 3D pill | React Three Fiber + CapsuleGeometry | Proper WebGL quality without needing a model file |
| Pill color | Blue (#3b6fd4 / #6b9fe8) | Changed from orange; can be swapped easily |
| Chart library | Recharts | Real interactivity, looks authentic |
| Images | 3D pill for hero; CSS capsules for thumbnails | 3D adds wow factor; thumbnails don't need it |
| Back navigation | Overscroll reveal above sticky header | Clever UX, doesn't break the StockX immersion |
| All data | Hardcoded | No backend warranted for a satirical POC |

---

## Known issues / gotchas

- **Related product cards are not clickable.** They render but link nowhere. If you add individual product pages later, you'll need to add routes and wire up `href` on the cards.
- **The 3D pill has no fallback** if WebGL is unavailable. The container shows white until the canvas loads, then the pill appears. Acceptable for a portfolio project.
- **The scroll-reveal back bar** is less obvious on desktop (you have to scroll to the very top). On iOS it feels natural via elastic bounce. Could add a subtle visual hint if this becomes confusing.
- **Pill color is hardcoded** as blue in the `PillScene` call site. The `PillScene` component accepts `color1`/`color2` props so it's easy to change per product.
- **`CapsuleGeometry`** is Y-axis aligned by default. The mesh is rotated `[0, 0, Math.PI/2]` to lay horizontal. The vertex color split is at y=0 in geometry space, which becomes the center of the horizontal pill. This is intentional.

---

## What's next (v2 ideas, discussed but not built)

- **Marketplace homepage** — grid of listings (Adderall, Xanax, Oxycodone, etc.) with trending indicators, search that works, category filtering
- **Pill identification tool** — the CTA button is already present. Could hook up an open-source pill ID API or ML model. Nick flagged this as v2.
- **Seller affiliate program page** — its own page, purely satirical copy
- **Actual pill images** — Nick could swap the 3D pill for real product photography. The component accepts image props cleanly; the container is already sized for it.
- **Individual pages for related products** — each related card could link to its own detail page. Data structure supports it; just needs routes.
- **Shareability** — add OG meta tags if this ever gets posted publicly
