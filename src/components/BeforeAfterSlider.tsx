'use client'

import { useRef, useState } from 'react'

type Props = {
  beforeImage?: string
  afterImage?: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}: Props) {
  const [position, setPosition] = useState(50)
  const frame = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const hasImages = Boolean(beforeImage && afterImage)

  const update = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect()
    if (!rect?.width) return
    setPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div
      ref={frame}
      className={`relative aspect-[4/5] w-full select-none overflow-hidden rounded-2xl border border-[#edd4df] bg-[#f8e7ed] touch-pan-y ${className}`}
      onPointerDown={e => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        update(e.clientX)
      }}
      onPointerMove={e => { if (dragging.current) update(e.clientX) }}
      onPointerUp={e => { dragging.current = false; if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId) }}
      onPointerCancel={() => { dragging.current = false }}
    >
      {hasImages ? (
        <>
          <img src={afterImage} alt={afterLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <img src={beforeImage} alt={beforeLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-[#fff7fa] via-[#f4e1e9] to-[#e2b9c9]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#fdf4f8] via-[#ead1dc] to-[#d5a9bd]" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 text-center">
            <span className="rounded-2xl bg-white/80 px-5 py-4 text-sm font-medium text-[#715965] shadow-sm backdrop-blur-sm">
              {beforeLabel} / {afterLabel} · Фото скоро
            </span>
          </div>
        </>
      )}
      <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#241e20]">{beforeLabel}</span>
      <span className="pointer-events-none absolute right-4 top-4 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#241e20]">{afterLabel}</span>
      <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-md" style={{ left: `${position}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#9f6d82] text-xl font-bold text-white shadow-lg" aria-hidden="true">↔</span>
      </div>
      <input
        aria-label={`${beforeLabel} / ${afterLabel}`}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={e => setPosition(Number(e.target.value))}
        className="absolute bottom-2 left-1/2 z-20 h-5 w-2/3 -translate-x-1/2 cursor-ew-resize opacity-0 focus-visible:opacity-100"
      />
    </div>
  )
}
