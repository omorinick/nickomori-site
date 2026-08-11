---
name: living-prototype
description: >
  Turn raw content, data, or a rough narrative into a living, interactive prototype that tells a
  story — instead of a static slide deck or Word doc. Use this whenever the user is preparing a
  leadership or executive presentation, a product narrative, a business case, a strategy readout, a
  vision pitch, or any time they say "deck," "presentation," "slides," "tell the story," "walk them
  through," "pitch," "readout," or want to communicate data or a vision to leadership — even if they
  don't explicitly ask for a "prototype" — or they say "feedback," "comments," "leave notes," "review
  this," or want stakeholders to annotate a deck directly. This skill picks the right narrative
  structure AND the right spatial layout (vertical scroll, horizontal sequence, interactive
  explorable, or a spine-and-ribs mix), then renders either a single-file React + Tailwind prototype
  the user can open and present, or — when people need to leave inline feedback — an interactive
  build with Figma-style comment pins, hosted as a link with its own passphrase. Prefer this over
  static formats when the goal is to communicate a story or make a case to leadership, not to produce
  a formal filed document.
---

# Living Prototype

A presentation's job is to move an audience from where they are to where you need them. The medium —
slides, a doc, a video, an interactive page — is just the vehicle. PowerPoint forces every story into
the same vehicle (a horizontal sequence of static rectangles) whether or not that fits. This skill
drops that constraint: it picks the vehicle that fits the story, then builds it as a single, living,
interactive prototype.

The core move is to **separate two layers that people usually collapse together:**

1. **Narrative** — *what* you say and in *what order*. Medium-independent. (Section 2)
2. **Spatial grammar** — *how* it's laid out and experienced. The newly-unconstrained part. (Section 3)

Get the narrative right first, then choose the spatial grammar that serves it. Most weak
presentations fail because they pick the layout (slides) before they know the story.

This skill is tuned for: **executive and leadership presentations**, built in **React + Tailwind**,
following **your organization's brand**. Keep that audience in mind — leaders are time-poor,
skeptical, and want the point up front.

---

## The process

Work through these six steps in order. Don't skip the intake — guessing the audience or the ask is
the most expensive mistake you can make.

### 1. Intake — get the things you can't guess

Before building anything, confirm these. Ask the user directly if any are unclear; don't invent them.

- **The ask.** What single decision, belief, or action do you want from this audience? ("Approve the
  cross-sell surface," "agree churn is the #1 priority," "fund the notification rework.") Everything
  serves this. If you can't name it in one sentence, the presentation has no job yet.
- **The audience and the mode.** Who's in the room, what do they already believe, and how will they
  consume this — **presented live** (you're narrating, they watch) or **read async** (sent as a link,
  they self-navigate)? This single distinction drives most of the layout choice.
- **Feedback.** Does anyone need to leave inline comments — an external stakeholder reviewing on
  their own time, a team annotating before a live readout? This is a separate axis from the one
  above and decides the *render* format (step 5): a portable file, or an interactive review build.
  Default to the portable file unless this comes up.
- **The raw material and constraints.** The data, the narrative beats, screens to show, hard numbers,
  time limit, and any brand/format constraints.

### 2. Shape — pick the narrative structure

Pick ONE structure based on the ask. Default to **SCQA** for leadership.

- **Persuade leadership to act / approve / fund → SCQA (Minto Pyramid).** Situation → Complication →
  Question → Answer. For execs, *lead with the answer*, then support it. This is the default.
- **Sell a vision or a change ("from here to there") → Duarte Sparkline.** Oscillate between
  what-is and what-could-be, building tension, ending on the new normal. Use for vision/strategy.
- **Explain how something works → guided walkthrough / 3-act.** Setup → demonstration → payoff.

Then name the **throughline**: the one sentence the audience should repeat afterward. Write it down.
Every section must earn its place against it. If a section doesn't move the throughline, cut it.

### 3. Layout — pick the spatial grammar

Now choose how it's experienced. Use this decision logic:

| If the situation is… | Use | Why |
|---|---|---|
| Presented live, tight time, one idea at a time | **Horizontal sequence** | Discrete beats you control; big type; feels like slides but cleaner |
| Sent to read async, data-rich, "make a complex thing simple" | **Vertical scrollytelling** | Reader controls pace; progressive disclosure; numbers reveal as they scroll |
| You need them to *believe* a model, tradeoff, or number | **Interactive explorable** | Let them poke the assumptions — belief beats assertion |
| Demonstrating an actual product experience | **Demo / embedded UI** | Show the real thing, don't describe it |
| A narrative spine with optional deep-dives | **Spine-and-ribs** (default for rich exec stories) | Vertical scroll carries the story; horizontal/expandable "ribs" hold detail and exploration |

**Spine-and-ribs** is the answer to "sometimes vertical, sometimes horizontal — probably both." The
vertical scroll is the narrative spine (your SCQA arc). At specific moments it branches into a
horizontal rib (scroll through the three churn drivers) or an interactive rib (a slider showing a
lever's effect), then returns to the spine. Main road, side streets. Use it when one story has both a
clear arc *and* sections that reward exploration.

**Format-fit, per element:** static for scanning, motion for showing change or process, interactive
for exploration. Don't animate what should be glanced at; don't make static what the audience should
play with.

### 4. Propose — bring a point of view, ask only the real choices

Don't hand the user a blank canvas, and don't bury them in open questions. Act like a senior
presentation designer: bring a recommendation, and ask only about the few choices where their taste
actually changes the outcome.

Write a short **treatment** — one short paragraph — naming, per section, the narrative beat and the
pattern you'd use (by name, from the pattern library). Then surface **2–3 real choices** as concrete
either/or decisions, not open questions. For example:

> Here's how I'd tell this: vertical spine, SCQA. The retention data as an *animated chart* that draws
> the cliff, the three drivers as a *horizontal carousel*, the cross-sell lever as a *parameter slider*,
> and the initiatives as *click-to-expand cards*. Two calls for you: (1) slider showing 1→2 only, or
> the full 1→7 cliff? (2) initiatives — expand in place, or slide in a right-hand panel?

Skip this step only when the user has explicitly said "just build it."

### 5. Render — build the prototype

Two output formats. Default to the portable file — reach for the interactive build only when intake
step 1 surfaced a real need for inline feedback.

**Portable file (default).** Build a **single self-contained HTML file** using React + Tailwind via
CDN, styled with your brand's design tokens. The file should open on double-click with no build step
and no dependencies.

**Interactive review build (when inline comments matter).** Trade portability for that: build the
deck as a real page in the nickomori.com Next.js app instead of a single HTML file, with a
Figma-style comment layer wired in. The comment layer is already built and fully reusable — this is
a wiring job, not new engineering, and it's the same pattern regardless of what the deck is about:

1. Register the deck: add `{ slug, title }` to `src/data/case-studies/registry.ts`.
2. Build the content as a real client component at `src/components/case-study/content/<slug>.tsx` —
   plain TSX, not a string of HTML. Use the narrative structure and spatial grammar you already chose
   (SCQA, spine-and-ribs, etc.), styled with this site's design tokens or the deck's own brand (see
   `churn-case.tsx` for a precedent that keeps an external brand's colors instead of the site's —
   same reasoning as DrugX's isolated visual treatment elsewhere on this site). Wrap each top-level
   narrative beat in `<section data-slide-id="unique-id">` — that's the only contract the comment
   layer needs; it's how pins anchor to content and survive reflow/resize.
3. Register the content component in the `CASE_STUDY_CONTENT` map in
   `src/components/case-study/content/index.tsx`.
4. Set a passphrase: add `CASE_STUDY_PASSWORD_<SLUG_UPPER_SNAKE>` to `.env.local` for local testing,
   and the same variable name in Vercel's dashboard (Production, plus Preview if needed) before it'll
   work once deployed.

`src/app/case-studies/[slug]/page.tsx` already dispatches to your content component and mounts the
comment layer once the above four steps are done — nothing else to wire.

What you get for free from `<CommentLayer />` — don't rebuild any of this:

- Click-to-place floating comment pins, anchored per-section, position holds through resize.
- Hover-to-expand from an initials avatar to the full comment; a custom cursor and a "Click anywhere
  to comment" banner while placing one.
- Threaded replies (one level deep), with a reply-count badge on the pin.
- Anyone viewing can edit or delete any comment — there's no account system, so per-person ownership
  isn't tracked; that's intentional given the review audience, not an oversight.
- A "Show all comments" panel (hover the toggle to reveal it) listing every thread; clicking one
  scrolls to and opens it, panel stays open, selected thread highlighted. A count badge on the toggle
  shows total comment volume without opening anything.
- A one-time name prompt, persisted per browser and shared across every deck built this way, with an
  "Edit name" option in the same hover menu.
- A brief first-session bounce on the toggle so a first-time visitor notices it; stops on hover.
- Live updates via ~3s polling — no refresh needed, works for a live workshop as well as async review.

**How to brand it:** At the top of the file, set Tailwind config colors matching your brand. Use a
mostly-monochrome palette with one accent color used sparingly (~4–10% of each composition). The
accent points at the one thing that matters per section. Include your brand font as the first entry in
the font-family stack; Inter as the fallback.

**For interaction patterns,** use the pattern library (pattern-gallery.html). Copy the named pattern
you proposed out of the gallery and set its knobs to fit the content. Changing a knob — e.g., swapping
a slider's data range — is never a rebuild.

Build principles, in priority order:

- **One idea per view.** A leader should never wonder what they're looking at. If a section makes two
  points, split it.
- **Lead with the answer.** For exec audiences, the throughline and the recommendation appear early —
  don't make them scroll to the bottom for the point.
- **Numbers earn their drama.** Big figures count up on reveal. One hero number per section, not a
  wall of stats.
- **Motion is meaning, not decoration.** Reveal-on-scroll signals "new beat." A bar growing shows
  change. Never animate just to animate.
- **Mostly monochrome, one accent.** Black on white, generous space. Accent is a highlighter, used to
  point at the one thing that matters in each view.

### 6. Self-check — before you hand it over

- [ ] Can a stranger state the throughline after one pass?
- [ ] Is the ask/recommendation visible early, not buried?
- [ ] One idea per view? Any view making two points gets split.
- [ ] Does every section move the throughline? Cut what doesn't.
- [ ] Spatial grammar actually serves the story (not novelty for its own sake)?
- [ ] Interaction patterns pulled from the library where one fit (not reinvented)?
- [ ] Brand: mostly mono, one accent used sparingly, big tight-tracked headings, accessible contrast
      (body ≥ 4.5:1)?
- [ ] Portable file opens and runs from a double-click; interactive build loads cleanly at
      `/case-studies/<slug>` behind its passphrase? Works at the size it'll be shown (projected vs.
      laptop)?
- [ ] Numbers are real and sourced — never invent figures. If a number is a placeholder, label it.

---

## Pattern library

Interaction patterns live in a curated storybook so you and the user share a vocabulary:

- **pattern-gallery.html** — patterns running live; also the source you copy from. Organized by
  intent: "reveal one thing," "show change or a relationship," "move through a set," "reveal more
  detail," "show the real thing."

Use it like this: map each section to an intent, pick the named pattern, copy it, set its knobs.
Keep the library small: add a pattern only when nothing fits the intent *and* the need is likely to
recur.

---

## Output and handoff

- **Portable file:** deliver as a single `.html` file, named for the story not the format
  (`churn-decline-case.html`, not `presentation.html`).
- **Interactive review build:** deliver as a link + passphrase (`/case-studies/<slug>`), not a file —
  there's nothing to hand over besides the URL and the password.
- If the user wants to take a portable file into their production stack, note that the same component
  structure drops into any React / TypeScript / Tailwind setup — the hooks and components port cleanly.
- Offer, but don't assume: a matching one-page leave-behind, a speaker-notes version, or a trimmed
  read-mode variant of the same story.

---

## What this skill is NOT for

- Formal documents that must be filed, version-controlled as Word, or legally reviewed → use a doc format.
- A deck that genuinely must be a `.pptx` (someone will edit it in PowerPoint, or it's going into a
  corporate template you don't control) → use the format they need.
- Spreadsheets / data models → use a spreadsheet.

If the goal is to *communicate and persuade*, this skill. If the goal is to *produce a specific filed
artifact in a specific tool*, use that tool.
