'use client'

import { useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    title: "Theme Playground",
    type: "Tool",
    href: "/theme-playground.html",
    external: true,
    description: "Live color and typography explorer. Pick a palette, preview the full design system, export CSS tokens.",
  },
  {
    title: "Living Presentation",
    type: "Skill",
    href: "/projects/living-prototype",
    external: false,
    description: "Raw narrative → interactive web presentation. No slides, no constraints.",
  },
  {
    title: "AI Skills & Automations",
    type: "PM Workflow",
    href: "/projects/ai-skills-automations",
    external: false,
    description: "Five automations and seven domain-encoded skills that run my PM workflow at work.",
  },
  {
    title: "DrugX",
    type: "Case Study",
    href: "/projects/compliant-market",
    external: false,
    description: "Dark-pattern teardown of a drug-pharma onboarding flow. What compliance often gets wrong.",
  },
  {
    title: "Backseat Driver",
    type: "In progress",
    href: "/projects/backseat-driver",
    external: false,
    description: "Car-maintenance advisor that works for the owner, not the shop.",
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
          {expanded ? 'Show less ↑' : 'Show more'}
        </button>
      </div>
    </section>
  )
}
