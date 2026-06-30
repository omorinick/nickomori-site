---
name: brand-standards
description: >
  Encodes your organization's brand system — type rules, color palette, accessibility requirements,
  and medium-specific patterns. Use when creating decks, emails, social posts, or any branded asset.
  This is a template — populate with your organization's actual brand specs before use.
---

# Brand Standards Skill

Encodes your brand system so every asset — deck, email, social post, header — follows the right
rules without looking up the style guide each time. Includes what to do and what to avoid.

**This is a template.** Replace all placeholder values with your organization's actual brand specs.
The best source: your brand guidelines PDF or the design team's Figma file.

No MCPs required. This skill operates entirely from the knowledge below.

---

## Typography

### Fonts
```
Use case              | Font                    | Weight          | Notes
----------------------|-------------------------|----------------|--------
Display / headline    | [Your display font]     | [Black / Bold] | [e.g., "Black only, never Bold"]
Body / paragraph      | [Your body font]        | [Regular]      | [fallback: Inter, system-ui]
Captions / labels     | [Your caption font]     | [Medium]       | [notes]
Code / monospace      | [Your mono font]        | [Regular]      | [fallback: JetBrains Mono, monospace]
```

### Type scale
```
Element        | Size      | Weight    | Tracking        | Notes
---------------|-----------|-----------|----------------|------
Display        | [size]    | [weight]  | [-0.04em]      | [usage]
H1             | [size]    | [weight]  | [-0.02em]      | [usage]
H2             | [size]    | [weight]  | [normal]       | [usage]
Body           | [size]    | [weight]  | [normal]       | [usage]
Caption        | [size]    | [weight]  | [+0.01em]      | [usage]
```

### Rules
- [Add your specific type rules — e.g., "Never use Bold for headlines; use Black"]
- [e.g., "H1 tracking must be tight (-0.02em or tighter) at display sizes"]
- [e.g., "Body text is always Regular weight, never Medium"]

---

## Color Palette

### Primary colors
```
Name           | Hex       | Usage                          | Proportion guideline
---------------|-----------|--------------------------------|--------------------
[Color name]   | #XXXXXX   | [Primary text / backgrounds]   | [~44% of composition]
[Color name]   | #XXXXXX   | [Secondary text / surfaces]    | [~44% of composition]
[Accent 1]     | #XXXXXX   | [Highlight / CTA]              | [~4%]
[Accent 2]     | #XXXXXX   | [Secondary highlight]          | [~4%]
[Accent 3]     | #XXXXXX   | [Tertiary / use sparingly]     | [~4%]
```

### Accessibility
For each color combination that appears in your assets, document whether it passes WCAG:

```
Foreground    | Background   | Contrast ratio | WCAG AA (4.5:1) | WCAG AAA (7:1)
--------------|-------------|----------------|-----------------|---------------
[Color A]     | [Color B]   | [X.X:1]        | ✓ Pass / ✗ Fail | ✓ Pass / ✗ Fail
[add combos]
```

**Critical:** Always check the accent colors against white before using them for text. Some brand
blues and greens that look fine at large sizes fail WCAG AA as body text on white.

### What NOT to do
- [e.g., "Never mix two accent colors in the same composition"]
- [e.g., "Never use [Accent 3] for text on white — fails WCAG AA"]
- [e.g., "Never use [Color] as a background with white text — fails at small sizes"]

---

## Medium-Specific Patterns

### Presentations / decks
```
Element              | Rule
---------------------|------
Slide background     | [e.g., "White (#FFFFFF) for content slides, Black for emphasis slides"]
Headline             | [font, size, weight, color]
Body text            | [font, size, weight, color]
Accent usage         | [e.g., "One accent per slide maximum, used to highlight the one thing that matters"]
Logo placement       | [e.g., "Bottom right, 48px height, never on accent backgrounds"]
```

### Email
```
Element              | Rule
---------------------|------
Subject line         | [length limit, style]
Header               | [background, logo, height]
Body                 | [font, size, line height, max-width]
CTA button           | [color, label style, padding]
Footer               | [required elements]
```

### Social posts
```
Platform      | Image size  | Safe zone   | Text rules           | Logo rules
--------------|-------------|------------|---------------------|------------
LinkedIn      | [size]      | [margins]   | [max chars in image] | [placement]
[Others]
```

---

## Validation Checklist

Before finalizing any branded asset:

- [ ] Font weights match the Typography table — no improvised weights
- [ ] Colors are from the palette — no off-brand approximations
- [ ] Proportions roughly match the guideline (~44%/~44%/~4%/~4%/~4%)
- [ ] Accent colors checked against WCAG for contrast — especially on white
- [ ] Only one accent color per composition (unless guidelines say otherwise)
- [ ] Logo placement follows medium-specific rules
- [ ] Text size meets minimum accessibility requirements (14px body minimum for print/screen)

---

## Instructions

When helping create a branded asset:
1. Ask what medium it's for (deck / email / social / web)
2. Apply the medium-specific pattern from above
3. Flag any choices that violate the rules before finalizing
4. Run the validation checklist on the output before handing it over

When asked "what color should I use for X?":
1. Look up the use case in the Medium-Specific Patterns
2. Check the Accessibility table for the specific combination
3. State clearly whether the combination passes or fails WCAG
4. Never say "just use [color]" without checking accessibility
