'use client'

import { useState } from 'react'
import { Flag } from './primitives'
import { InterviewGrid } from './charts'
import { QUOTES } from './data'
import { ACCENT_DARK } from './tokens'

// The research turn is a three-stage progressive reveal: the result, the interviews that broke the
// explanation, and the insight that replaced it.
export function ResearchTurn() {
  const [stage, setStage] = useState(0)
  return (
    <div>
      <div className="flex gap-2 mb-10">
        {['It worked', 'The interviews', 'The insight'].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStage(i)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              i === stage ? 'text-black' : i < stage ? 'text-neutral-300' : 'text-neutral-500'
            }`}
            style={i === stage ? { background: ACCENT_DARK } : { background: 'rgba(255,255,255,0.08)' }}
          >
            {i + 1} · {label}
          </button>
        ))}
      </div>

      {stage === 0 && (
        <div>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">The pricing wedge worked.</h2>
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-3xl">
            {[
              ['5% → 10%', 'acceptance, concierge → product-assisted', null],
              ['~$100M', 'recovered TPV, manual stages', 'Recollection; counterfactual method to validate'],
              ['~$2M', 'net margin after discount cost', 'Net of discount per Nick; method to validate'],
            ].map(([v, l, note]) => (
              <div key={l as string}>
                <p className="font-black text-3xl md:text-5xl" style={{ color: ACCENT_DARK }}>
                  {v}
                </p>
                <p className="mt-2 text-sm text-neutral-400">
                  {l}
                  {note && <Flag kind="assumption" note={note as string} />}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-lg text-neutral-300 max-w-2xl">
            Enough to earn the automation investment. Scale was coming.
          </p>
          <button
            type="button"
            onClick={() => setStage(1)}
            className="mt-8 px-6 py-3 rounded-full font-bold text-sm text-black"
            style={{ background: ACCENT_DARK }}
          >
            Then we talked to twenty merchants →
          </button>
        </div>
      )}

      {stage === 1 && (
        <div>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            Twenty interviews broke our explanation.
          </h2>
          <p className="mt-4 text-neutral-400 max-w-2xl">
            We assumed merchants were diverting volume over price. Explore what they actually said:
          </p>
          <div className="text-black rounded-2xl bg-white p-8 mt-8">
            <InterviewGrid />
          </div>
          <button
            type="button"
            onClick={() => setStage(2)}
            className="mt-8 px-6 py-3 rounded-full font-bold text-sm text-black"
            style={{ background: ACCENT_DARK }}
          >
            So what was the offer actually doing? →
          </button>
        </div>
      )}

      {stage === 2 && (
        <div>
          <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
            They didn&apos;t want a discount. They wanted <span style={{ color: ACCENT_DARK }}>recognition</span>.
          </h2>
          <blockquote
            className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-8 text-2xl md:text-3xl leading-snug font-bold text-white max-w-3xl"
            style={{ borderLeft: `5px solid ${ACCENT_DARK}` }}
          >
            {QUOTES[0]}
          </blockquote>
          <div
            className="mt-10 rounded-2xl p-7 max-w-3xl"
            style={{ background: 'rgba(143,188,255,0.08)', border: '1px solid rgba(143,188,255,0.25)' }}
          >
            <p className="font-bold uppercase tracking-wide text-[11px] mb-3" style={{ color: ACCENT_DARK }}>
              The new product question
            </p>
            <p className="text-lg md:text-xl font-bold leading-snug text-white">
              How might we help merchants understand where they stand, recognize the value they&apos;ve built, and
              receive benefits their businesses actually need?
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
