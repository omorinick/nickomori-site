'use client'

import { useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    title: "Theme Playground",
    type: "Tool",
    href: "/theme-playground.html",
    external: true,
    description: "A live color and typography explorer — swap palettes, pick fonts, preview the full design system, and export CSS tokens. Built for committing to a rebrand with confidence.",
  },
  {
    title: "Living Presentation",
    type: "Skill",
    href: "/projects/living-prototype",
    external: false,
    description: "A skill for turning raw content into interactive web presentations — animated data, live demos, and interactive exploration, without the constraints of slides.",
  },
  {
    title: "AI Skills & Automations",
    type: "PM Workflow",
    href: "/projects/ai-skills-automations",
    external: false,
    description: "A working library of automated workflows and domain-encoded AI skills — built at work to solve real operational problems.",
  },
  {
    title: "DrugX",
    type: "Satire",
    href: "/projects/compliant-market",
    external: false,
    description: "A peer-to-peer marketplace for pharmaceutical assets. Third-party verified. No questions asked.",
  },
  {
    title: "Assumption Mapper",
    type: "AI Tool",
    href: "/projects/pm-toolkit",
    external: false,
    description: "Describe a product idea or feature. Get a structured assumption map — swim lanes, assumptions across all five Teresa Torres dimensions, and a priority matrix — in seconds.",
  },
  {
    title: "Backseat Driver",
    type: "In progress",
    href: "/projects/backseat-driver",
    external: false,
    description: "A car-maintenance advisor that works for the owner, not the shop — know what your car needs, what it should cost, and whether that upsell is real.",
  },
]

const PREVIEW = 5

export function ProjectsSection() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? projects : projects.slice(0, PREVIEW)
  const hidden = projects.length - PREVIEW

  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <h2 className="font-heading text-3xl font-bold text-foreground tracking-tight mb-2">
        Constructive Distractions
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Projects built to think, not just to ship.
      </p>
      <div className="border-t border-border">
        {visible.map(({ title, type, href, external, description }) =>
          external ? (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-border py-5 hover:opacity-70 transition-opacity"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-0.5">
                  <span className="font-heading text-lg font-bold text-foreground">{title}</span>
                  <span className="text-xs font-medium text-primary flex-shrink-0">{type}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{description}</p>
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">↗</span>
            </a>
          ) : (
            <Link
              key={title}
              href={href}
              className="group flex items-center gap-4 border-b border-border py-5 hover:opacity-70 transition-opacity"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-0.5">
                  <span className="font-heading text-lg font-bold text-foreground">{title}</span>
                  <span className="text-xs font-medium text-primary flex-shrink-0">{type}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-snug">{description}</p>
              </div>
              <span className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">→</span>
            </Link>
          )
        )}
      </div>
      <div className="mt-5">
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? 'Show less ↑' : 'Show more ↓'}
        </button>
      </div>
    </section>
  )
}
