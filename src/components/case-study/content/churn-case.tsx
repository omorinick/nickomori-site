'use client'

import { useState } from 'react'

// Ported from src/data/artifacts/churn-decline-case.html (the original single-file
// living-prototype artifact) into real TSX so CommentLayer can anchor pins to
// [data-slide-id] sections. Brand kept as PayPal deep blue/black, matching the
// source artifact's own brand — same precedent as DrugX's isolated dark treatment,
// since this is presenting external past work, not a nickomori.com site page.

const CHURN = [
  { label: '1', value: 17.3 },
  { label: '2', value: 7.0 },
  { label: '3', value: 3.0 },
  { label: '4', value: 1.3 },
  { label: '5', value: 0.8 },
  { label: '6', value: 0.4 },
  { label: '7', value: 0.0 },
]

const DRIVERS = [
  { name: 'Tech Issues', amt: '$271.9M', note: 'Integration friction, breakage, failed flows — the experience stops working.' },
  { name: 'Pricing', amt: '$262.8M', note: 'Rate sensitivity and value gaps. The lever behind Save Offers.' },
  { name: 'Risk', amt: '$126.9M', note: 'Holds and reserves felt as punishment. The case for the Reserves rework.' },
]

const BUILDING_BLOCKS = [
  { title: 'Save Offers', status: 'Launched', detail: 'Proactive pricing interventions for at-risk merchants (P7 Growers, P11 Decliners). Live today; measuring retention impact.' },
  { title: 'Risk / Reserves', status: 'In progress', detail: 'Reframing "holds" as "reserves" in language and UX. Directly addresses the $126.9M of risk-driven contraction — the difference between feeling punished and feeling protected.' },
  { title: 'Cross-Sell Surface', status: 'Building case', detail: 'A dedicated path from one product to two — the most direct lever on the 17.3% → 7.0% drop. Business case in progress with Marketing.' },
  { title: 'Critical Notifications', status: 'Planned', detail: 'Rationalize 1000+ notification types into a governed system. Signal over noise — the right message at the right moment, then out of the way.' },
]

function Spine({
  id,
  kicker,
  dark,
  className = '',
  children,
}: {
  id: string
  kicker?: string
  dark?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      data-slide-id={id}
      className={`relative min-h-[70vh] flex flex-col justify-center px-6 md:px-20 py-20 ${dark ? 'bg-black text-white' : 'bg-white text-black'} ${className}`}
    >
      <div className="max-w-5xl mx-auto w-full">
        {kicker && (
          <p className={`font-semibold tracking-[0.18em] uppercase text-xs mb-6 ${dark ? 'text-sky-300' : 'text-[#002991]'}`}>
            {kicker}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

export default function ChurnCaseContent() {
  const [leverIndex, setLeverIndex] = useState(0)
  const [openBlock, setOpenBlock] = useState<number | null>(null)
  const point = CHURN[leverIndex]

  return (
    <main className="font-sans">
      <Spine id="hero" kicker="Churn & Decline · Merchant Experience Platform">
        <h1 className="font-black tracking-tight leading-[0.95] text-5xl md:text-7xl">
          Most merchant churn<br />is ours to prevent.
        </h1>
        <p className="mt-8 text-xl md:text-2xl max-w-2xl text-neutral-700">
          And the fastest way to prevent it isn&apos;t a save play — it&apos;s product depth. Here&apos;s the case.
        </p>
      </Spine>

      <Spine id="situation" kicker="Situation">
        <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-3xl">
          Hawk is the screen behind every SMB login.
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-neutral-700">
          It&apos;s where small and mid-size merchants check in, manage money, and decide whether PayPal is still
          working for them. Which makes it the place we keep them — or lose them.
        </p>
      </Spine>

      <Spine id="complication" kicker="Complication" dark>
        <h2 className="font-extrabold tracking-tight text-2xl md:text-4xl max-w-3xl mb-12">
          About a quarter of the SMB portfolio is walking out the door.
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <p className="font-black text-5xl md:text-6xl">
              ~25<span className="text-sky-300">%</span>
            </p>
            <p className="mt-3 text-neutral-300 text-base">of the SMB portfolio churning</p>
          </div>
          <div>
            <p className="font-black text-5xl md:text-6xl">
              $30<span className="text-sky-300">B</span>
            </p>
            <p className="mt-3 text-neutral-300 text-base">in TPV at risk</p>
          </div>
          <div>
            <p className="font-black text-5xl md:text-6xl">
              ~94<span className="text-sky-300">%</span>
            </p>
            <p className="mt-3 text-neutral-300 text-base">of it is controllable — not inevitable</p>
          </div>
        </div>
      </Spine>

      <Spine id="drivers" kicker="Detour · the controllable drivers">
        <h2 className="font-extrabold tracking-tight text-2xl md:text-4xl max-w-3xl mb-10">
          Three drivers carry most of the loss.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {DRIVERS.map((d) => (
            <div key={d.name} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
              <p className="font-black text-4xl text-[#002991]">{d.amt}</p>
              <h3 className="font-bold text-xl mt-4">{d.name}</h3>
              <p className="mt-3 text-neutral-600 text-sm leading-relaxed">{d.note}</p>
            </div>
          ))}
        </div>
      </Spine>

      <Spine id="question" kicker="Question">
        <h2 className="font-black tracking-tight text-3xl md:text-6xl max-w-4xl">
          If most of it is controllable, where&apos;s the <span className="text-[#002991]">highest-leverage</span>{' '}
          place to act?
        </h2>
      </Spine>

      <Spine id="answer" kicker="The answer · product depth">
        <h2 className="font-extrabold tracking-tight text-2xl md:text-4xl max-w-3xl">
          Give a merchant a second product, and churn falls off a cliff.
        </h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm text-neutral-500 mb-4">Annual churn rate by number of products</p>
            <div className="flex items-end gap-3 h-48">
              {CHURN.map((d, i) => (
                <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span
                    className="text-xs font-bold mb-1.5"
                    style={{ color: i === 1 ? '#002991' : '#737373' }}
                  >
                    {d.value}%
                  </span>
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${(d.value / 18) * 100}%`,
                      background: i === 1 ? '#002991' : '#cbd5e1',
                      transition: 'height 0.6s ease',
                    }}
                  />
                  <span className="text-[11px] mt-2 text-neutral-500">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-lg text-neutral-700 mb-4">Drag the lever. The first cross-sell is almost the entire win.</p>
            <div className="rounded-2xl p-6 text-white" style={{ background: '#002991' }}>
              <div className="flex justify-between text-xs text-blue-100 mb-2">
                <span>1 product</span>
                <span>7 products</span>
              </div>
              <input
                type="range"
                min={0}
                max={CHURN.length - 1}
                step={1}
                value={leverIndex}
                onChange={(e) => setLeverIndex(Number(e.target.value))}
                className="w-full accent-white"
              />
              <div className="mt-6 flex items-end gap-3">
                <p className="font-black text-5xl">
                  {point.value}
                  <span className="text-xl align-top">%</span>
                </p>
                <p className="text-blue-100 mb-2 text-sm">
                  churn at <strong className="text-white">{point.label}</strong> product{point.label === '1' ? '' : 's'}
                </p>
              </div>
            </div>
            <p className="mt-4 text-neutral-600 text-sm leading-relaxed">
              1 → 2 products takes churn from <strong>17.3%</strong> to <strong>7.0%</strong>. Across the book, 2+
              product merchants churn <strong>~60% less</strong> — and every product after the second barely moves
              the needle.
            </p>
          </div>
        </div>
      </Spine>

      <Spine id="strategy" kicker="So this is the work">
        <h2 className="font-extrabold tracking-tight text-3xl md:text-5xl max-w-4xl">
          Turn Hawk from static components into a surface that earns the next product.
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-neutral-700">
          Dynamic Content Surfaces: governed, personalized content delivery. The discipline is the{' '}
          <strong className="text-[#002991]">85 / 15 principle</strong> — 85% helping merchants monitor and manage,
          15% cross-sell <em>earned</em> through utility, never forced.
        </p>
      </Spine>

      <Spine id="building-blocks" kicker="The building blocks">
        <h2 className="font-extrabold tracking-tight text-2xl md:text-4xl mb-2">Four moves, one direction.</h2>
        <p className="text-neutral-500 mb-8">Click any move to see more.</p>
        <div className="grid md:grid-cols-2 gap-5">
          {BUILDING_BLOCKS.map((b, i) => (
            <div key={b.title} className="border border-neutral-200 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenBlock(openBlock === i ? null : i)}
                className="w-full text-left p-6 hover:border-[#002991] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{b.title}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-[#002991]">
                    {b.status}
                  </span>
                </div>
              </button>
              {openBlock === i && (
                <div className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed">{b.detail}</div>
              )}
            </div>
          ))}
        </div>
      </Spine>

      <Spine id="ask" kicker="The ask">
        <h2 className="font-black tracking-tight text-3xl md:text-6xl max-w-4xl">
          Back product depth as the retention strategy.
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-2xl text-neutral-700">
          Fund the cross-sell surface as the next building block — the most direct lever on the 17.3% → 7.0% you
          just watched move.
        </p>
      </Spine>
    </main>
  )
}
