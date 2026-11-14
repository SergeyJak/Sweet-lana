'use client'

import { useRef, useState } from 'react'

type Locale = 'ru' | 'lv' | 'en'
const content = {
  ru: { title: 'Наши процедуры', hint: 'Листайте, чтобы посмотреть направления', items: ['3D-чистка лица', 'IPL Lumecca', 'Morpheus8', 'Ultraformer MPT', 'Биоревитализация', 'Ваксинг и шугаринг', 'Липолитики'] },
  lv: { title: 'Mūsu procedūras', hint: 'Pāršķiriet, lai apskatītu procedūras', items: ['3D sejas tīrīšana', 'IPL Lumecca', 'Morpheus8', 'Ultraformer MPT', 'Biorevitalizācija', 'Vaksācija un šugarings', 'Lipolītiķi'] },
  en: { title: 'Our treatments', hint: 'Swipe to explore treatments', items: ['3D facial cleansing', 'IPL Lumecca', 'Morpheus8', 'Ultraformer MPT', 'Biorevitalization', 'Waxing and sugaring', 'Lipolytics'] },
} as const

export default function ProcedureCarousel({ locale }: { locale: Locale }) {
  const c = content[locale]
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const track = useRef<HTMLDivElement>(null)
  const start = useRef<{ x: number; scroll: number } | null>(null)
  return (
    <section aria-labelledby="procedure-carousel-title" className="relative z-10 overflow-hidden py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#a05e78]">Lana Sweet Perfect</p>
        <h2 id="procedure-carousel-title" className="font-serif text-4xl text-[#241e20] md:text-6xl">{c.title}</h2>
        <p className="mt-3 text-sm text-[#55444c]">{c.hint}</p>
      </div>
      <div
        ref={track}
        aria-label={c.title}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setDragging(false); start.current = null }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onPointerDown={e => { if (e.pointerType !== 'mouse') return; start.current = { x: e.clientX, scroll: track.current?.scrollLeft || 0 }; setDragging(true); setPaused(true) }}
        onPointerMove={e => { if (!start.current || !track.current) return; track.current.scrollLeft = start.current.scroll + start.current.x - e.clientX }}
        onPointerUp={() => { start.current = null; setDragging(false) }}
        onPointerCancel={() => { start.current = null; setDragging(false) }}
        className={`mt-8 overflow-x-auto overscroll-x-contain px-5 pb-4 md:px-10 ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex w-max gap-4 md:gap-6">
          {[...c.items, ...c.items].map((name, i) => (
            <div key={i} className="relative flex h-64 w-56 shrink-0 flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[#ead0db] bg-gradient-to-br from-[#fff7fa] via-[#f5e4eb] to-[#e8c9d7] p-6 shadow-[0_12px_28px_rgba(75,34,50,0.08)] md:h-80 md:w-72">
              <div aria-hidden="true" className="absolute -right-16 -top-14 h-52 w-52 rounded-full border-[26px] border-white/35" />
              <div aria-hidden="true" className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-white/30 blur-xl" />
              <span className="relative text-xs font-semibold tracking-[0.3em] text-[#a26b83]">{String((i % c.items.length) + 1).padStart(2, '0')}</span>
              <h3 className="relative max-w-[13rem] font-serif text-3xl leading-tight text-[#241e20] md:text-4xl">{name}</h3>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          section :global(.carousel-auto) { animation: none; }
        }
      `}</style>
    </section>
  )
}
