'use client'

import { useEffect, useState } from 'react'
import type { Certificate, CertificateCategory } from '@/content/certificates'
import type { Locale } from '@/lib/i18n'

const categories: CertificateCategory[] = ['education', 'cosmetology', 'equipment', 'training']
const labels = {
  ru: { all: 'Все', education: 'Образование', cosmetology: 'Косметология', equipment: 'Аппаратные методики', training: 'Повышение квалификации', close: 'Закрыть', enlarged: 'Увеличенный документ' },
  lv: { all: 'Visi', education: 'Izglītība', cosmetology: 'Kosmetoloģija', equipment: 'Aparātu procedūras', training: 'Profesionālā pilnveide', close: 'Aizvērt', enlarged: 'Palielināts dokuments' },
  en: { all: 'All', education: 'Education', cosmetology: 'Cosmetology', equipment: 'Device-based treatments', training: 'Further training', close: 'Close', enlarged: 'Enlarged document' },
} as const

export default function CertificateGallery({ certificates, locale }: { certificates: Certificate[]; locale: Locale }) {
  const [category, setCategory] = useState<'all' | CertificateCategory>('all')
  const [selected, setSelected] = useState<Certificate | null>(null)
  const copy = labels[locale]
  const filtered = category === 'all' ? certificates : certificates.filter(item => item.category === category)

  useEffect(() => {
    if (!selected) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <>
      <div role="group" aria-label={copy.all} className="flex flex-wrap gap-2">
        {(['all', ...categories] as const).map(key => (
          <button key={key} type="button" aria-pressed={category === key} onClick={() => setCategory(key)}
            className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition ${category === key ? 'border-[#35262d] bg-[#35262d] text-white' : 'border-[#e9d1da] bg-white text-[#4b3942] hover:bg-[#f8edf2]'}`}>
            {copy[key]}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(item => (
          <button type="button" key={item.id} onClick={() => setSelected(item)}
            className="overflow-hidden rounded-[1.5rem] border border-[#efdae3] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <img src={item.image} alt={item.title[locale]} loading="lazy" className="aspect-[3/4] w-full bg-[#faf5f6] object-contain p-4" />
            <div className="border-t border-[#f0dce4] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9b627b]">{copy[item.category]}</p>
              <h2 className="mt-2 font-serif text-xl !text-[#241e20]">{item.title[locale]}</h2>
              {item.institution && <p className="mt-2 text-sm text-[#63545d]">{item.institution}</p>}
              {item.year && <p className="mt-1 text-xs text-[#806c77]">{item.year}</p>}
            </div>
          </button>
        ))}
      </div>
      {selected && (
        <div role="presentation" onClick={() => setSelected(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8">
          <div role="dialog" aria-modal="true" aria-label={copy.enlarged} onClick={event => event.stopPropagation()} className="flex max-h-full w-full max-w-4xl flex-col items-end gap-3">
            <button type="button" onClick={() => setSelected(null)} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#241e20]">{copy.close} ×</button>
            <img src={selected.image} alt={selected.title[locale]} className="min-h-0 max-h-[80vh] w-full object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
