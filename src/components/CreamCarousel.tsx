'use client'

import { useEffect, useRef, useState } from 'react'

type Locale = 'ru' | 'lv' | 'en'

const copy = {
  ru: { title: 'Косметика для домашнего ухода', detail: 'Скоро здесь появятся кремы и средства, которые рекомендует Светлана.', badge: 'Скоро в продаже', choices: ['Увлажнение', 'Питание кожи', 'Ежедневный уход'], hint: 'Листайте, чтобы увидеть будущие категории' },
  lv: { title: 'Kosmētika mājas kopšanai', detail: 'Drīzumā šeit būs pieejami Svetlanas ieteiktie krēmi un kopšanas līdzekļi.', badge: 'Drīzumā pārdošanā', choices: ['Mitrināšana', 'Ādas barošana', 'Ikdienas kopšana'], hint: 'Pāršķiriet, lai apskatītu plānotās kategorijas' },
  en: { title: 'Skincare products', detail: 'Creams and skincare selected by Svetlana will appear here soon.', badge: 'Coming soon', choices: ['Hydration', 'Nourishment', 'Daily skincare'], hint: 'Swipe through planned categories' },
} as const

export default function CreamCarousel({ locale }: { locale: Locale }) {
  const c = copy[locale]
  const track = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = track.current
    if (!el || paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let previous = 0
    const move = (time: number) => {
      if (previous) {
        el.scrollLeft += Math.min(time - previous, 60) * 0.025
        const half = el.scrollWidth / 2
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half
      }
      previous = time
      frame = requestAnimationFrame(move)
    }
    frame = requestAnimationFrame(move)
    return () => cancelAnimationFrame(frame)
  }, [paused])

  return (
    <section id="skincare" aria-labelledby="skincare-carousel-heading" className="relative z-10 overflow-hidden py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#a05e78]">Lana Sweet Perfect</p>
        <h2 id="skincare-carousel-heading" className="font-serif text-4xl !text-[#241e20] md:text-6xl">{c.title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#51444b]">{c.detail}</p>
      </div>
      <div ref={track} aria-label={c.title} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} className="mt-8 overflow-x-auto overscroll-x-contain px-5 pb-4 md:px-10" style={{ scrollbarWidth: 'none' }}>
        <div className="flex w-max gap-4 md:gap-6">
          {[...c.choices, ...c.choices].map((name, i) => (
            <div key={i} className="relative flex h-64 w-56 shrink-0 flex-col justify-between overflow-hidden rounded-[1.8rem] border border-[#ead0db] bg-gradient-to-br from-[#fffafc] via-[#f8ecf1] to-[#eacfdc] p-6 shadow-[0_12px_28px_rgba(75,34,50,0.06)] md:h-72 md:w-72">
              <span className="relative w-fit rounded-full bg-white/75 px-3 py-2 text-[11px] font-semibold text-[#8a5970]">{c.badge}</span>
              <div aria-hidden="true" className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border border-white/70 bg-white/55 shadow-[0_12px_24px_rgba(67,34,48,0.08)]">
                <div className="h-16 w-20 rounded-xl border border-[#e5c8d4] bg-gradient-to-b from-white to-[#f4e4ea]">
                  <div className="mx-auto mt-5 h-1 w-9 rounded-full bg-[#c49aae]" />
                  <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#e0c2ce]" />
                </div>
              </div>
              <h3 className="relative font-serif text-2xl !text-[#241e20]">{name}</h3>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto max-w-7xl px-5 text-xs text-[#7e6e75] md:px-10">{c.hint}</p>
    </section>
  )
}
