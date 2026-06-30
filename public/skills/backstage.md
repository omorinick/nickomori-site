---
name: backstage
description: >-
  Adds a "Backstage" overlay to an interactive prototype — a peeking side panel that
  explains what the backend is doing behind the UI during a demo. Hovering an element shows
  where its data comes from, what's computed, and a live/mock/tbd status; clicking logs an
  event card narrating the API/service calls. Use this whenever someone is building, refining,
  or about to demo a prototype, mockup, or clickable demo and wants to explain, narrate, or
  annotate the backend / full-stack / data-flow behind it — even if they don't say "backstage"
  or "overlay." Triggers include: "explain where this data comes from in my demo," "show the
  backend behind this prototype," "annotate which APIs feed this screen," "make a demo that
  walks through the data flow," "where is this pulling from," or wanting to flag what's real
  vs. mocked vs. not-yet-sourced in a prototype. Works in React, Vue, Svelte, or plain HTML.
---

# Backstage — backend-explainer overlay for prototypes

## What this is

Backstage turns any clickable prototype into a self-explaining demo. A small tab peeks on the
right edge; clicking it slides open a dark panel. It has two parts:

- **Inspector (top third):** hover or click any annotated element and it shows what that
  element is, **where its data comes from** (API / DB / service / computed / mock), **what's
  computed**, a sample **request/response**, a **presenter note** to say aloud, and any **open
  questions**. Each element carries a `live` / `mock` / `tbd` status.
- **Event log (bottom two-thirds):** every click appends a card narrating the backend —
  *"User clicked Verify → POST /kyc/verify → cached in session."* Newest on top.

It is **off by default**, so the prototype looks clean until the presenter pulls the curtain
back. The whole point is to make the backend story — including the parts that *aren't built
yet* — visible and speakable during a demo.

## Why it works the way it does

The value isn't a pretty panel; it's a clean separation between the prototype and a
**declarative layer of annotations**. You tag elements and describe their backend once, in one
file, and a generic overlay reads those annotations. That's what makes it drop into any
prototype with almost no per-project plumbing — and what lets a presenter honestly say "this
number is live, this one is mocked, and for this one we still need to find the source."

## Workflow

Follow these steps when adding Backstage to a prototype.

### 1. Detect the stack and pick the implementation

Look at the prototype. Two reference implementations ship with this skill:

- **React/TypeScript/Tailwind** → `Backstage.tsx` + `types.ts` + `annotations.example.ts`.
  Use for React prototypes (incl. Vite). For plain JS-React without TS, strip the types.
- **Framework-agnostic vanilla JS** → `backstage.js`. A single self-contained file
  (no dependencies, injects its own styles). Use for plain HTML prototypes, or for Vue/
  Svelte/Angular where you just want a drop-in script.

These are **references to adapt, not sacred files**. Match the prototype's conventions
(styling system, file layout, TS vs JS). If the prototype uses a component library or a
different design language, restyle the panel to fit — keep the *structure* (peek tab →
inspector over event log) and the *annotation schema*, change the rest freely.

### 2. Identify what to annotate

Walk the prototype and pick the elements a presenter would actually point at: balances,
metrics, status badges, table rows, tabs with counts, primary buttons, form fields, menus.
**Aim for the 6–12 elements that carry the demo**, not every div. For a *flow* (e.g. onboarding,
checkout, verification), annotate the journey: where inputs come from, where prefilled data is
pulled, where the submit is sent, and what the response drives.

Tag each with a `data-backstage="<id>"` attribute (or the framework-equivalent prop).

### 3. Author the annotations (hybrid: pre-fill, then flag the unknowns)

For each tagged element, add an entry to the annotations file. **Pre-fill your best guess** of
the backend from whatever the code and context tell you. The annotation schema has these fields:

- `label`, `status` (`live` | `mock` | `tbd`)
- `sources[]` — each `{ name, type, ref }` where `type` is `api`/`db`/`svc`/`calc`/`mock` and
  `ref` is an endpoint, table, or computation
- `calc` — plain-English: what's computed or aggregated
- `io: { request, response }` — sample payloads
- `presenter` — one line to say aloud during the demo
- `openQuestions[]` — unresolved backend questions
- optional `action` (log-card title) and `narration` (log-card backend story)

**The critical discipline:** never invent an endpoint and present it as real. If you can't
confirm a source from the code, set `status: "tbd"`, write the `ref` as `"TBD — <what's
unknown>"`, leave the `io` strings as `// TBD`, and add an `openQuestions` entry. The `tbd`
cards render in a distinct color and become the "here's what we still need to figure out"
moments in the demo. Honest gaps are a feature, not a failure.

### 4. Wire it in

**Vanilla JS:**
```html
<script src="backstage.js"></script>
<script>
  Backstage.init({
    balance: {
      label: "Available Balance",
      status: "live",
      sources: [{ name: "Wallet Ledger", type: "svc", ref: "GET /v1/wallet/balance" }],
      calc: "Settled funds minus pending holds.",
      io: { request: "GET /v1/wallet/balance", response: '{ "available": 882701 }' },
      presenter: "Real-time balance — already nets out reserves.",
    }
  }, { defaultOpen: false, blockClicks: false });
</script>
```
Then tag elements: `<div data-backstage="balance">$8,827.01</div>`

**React:**
```tsx
import { Backstage } from './Backstage'
import { annotations } from './annotations'

// At app root:
<Backstage annotations={annotations} />

// On elements:
<div data-backstage="balance">{balance}</div>
```

Keep annotations in their own file regardless of stack — `annotations.ts`/`annotations.js`.
Even though the vanilla engine accepts an inline object, a dedicated file keeps the one thing
the user edits in one obvious place.

### 5. Report the TBDs

When done, tell the user which elements you marked `tbd` and what open questions you logged, so
they know exactly what backend detail to confirm. This is the handoff that makes the tool
useful rather than decorative.

---

## Status system

| status | meaning | when to use |
|---|---|---|
| `live` | source confirmed, wired or wireable | you can point to the real endpoint/table |
| `mock` | stubbed, but the real source is known | data is faked for the demo but you know where it'll come from |
| `tbd` | source not identified yet | you're guessing — say so, and add an open question |

When in doubt, prefer `tbd`. A demo full of confident-but-fake "live" endpoints falls apart the
moment an engineer in the room asks a pointed question.

---

## Authoring tips

- **Write `presenter` as a spoken sentence**, not documentation. Something you'd actually say.
- **Use `openQuestions` to drive the room** — they're the open decisions, surfaced live.
- **Be honest with `status`** — `live` only when the source is confirmed; default to `tbd`
  when unsure.
- **Don't block navigation.** In a real prototype, clicking an annotated element should still
  do its normal thing *and* log the event, so the demo keeps flowing. (Use `blockClicks: true`
  only for dead-link demos.)
- **Annotate the demo path, not the DOM.** 6–12 elements that carry the story. Not every div.

---

## Optional extensions

- **Default open:** React `<Backstage annotations={a} defaultOpen />`; vanilla
  `Backstage.init(a, { defaultOpen: true })`.
- **Dead-link demos:** vanilla `Backstage.init(a, { blockClicks: true })`.
- **Keyboard toggle:** add a hotkey (e.g. `⌘.`) that flips the open state.
- **Page-load events:** call the log on mount to show "on load, these APIs fire."
- **Restyling:** the panel is intentionally dark and neutral. To match a brand, change the
  colors/spacing but keep the structure (peek tab → inspector over event log) and the schema.

---

## Files included with this skill

- `backstage.js` — self-contained vanilla JS engine, no dependencies
- `Backstage.tsx` — React/TS/Tailwind overlay component
- `types.ts` — TypeScript annotation schema
- `annotations.example.ts` — worked example (merchant dashboard)
