import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { getGallery } from '@/lib/gallery'
import { getGalleryCategories } from '@/lib/gallery-categories'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const copy = {
  ru: { title: 'Галерея', caption: 'Результаты до и после', empty: 'Первые фотографии работ Ланы появятся здесь. Пока галерея пуста.', home: 'На главную', before: 'До', after: 'После' },
  lv: { title: 'Galerija', caption: 'Rezultāti pirms un pēc', empty: 'Lanas darbu fotogrāfijas drīzumā būs šeit. Pagaidām galerija ir tukša.', home: 'Uz sākumu', before: 'Pirms', after: 'Pēc' },
  en: { title: 'Gallery', caption: 'Before & after results', empty: "Lana's real work will appear here soon. The gallery is currently empty.", home: 'Back home', before: 'Before', after: 'After' },
} as const

export default async function Gallery({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params
  if (!isValidLocale(requested)) notFound()
  const locale = requested as Locale
  const c = copy[locale]

  // A new, independent database is required. Never import old customer images.
  const configured = Boolean(process.env.MONGODB_URI && process.env.MONGODB_DB === 'sweet_lana_prod')
  const [items, categories] = configured
    ? await Promise.all([getGallery(), getGalleryCategories().catch(() => [])])
    : [[], []]

  return (
    <div className="relative min-h-screen bg-white text-[#241e20]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[url('/background.jpeg')] bg-cover bg-center opacity-35" />
      <header className="relative z-10 border-b border-[#f0dce4] bg-white/90 px-5 py-5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <a href={`/${locale}`} className="font-serif text-2xl text-[#241e20]">Lana Sweet Perfect.</a>
          <div className="flex items-center gap-3">
            {(['ru','lv','en'] as const).map(lang => <a href={`/${lang}/gallery`} key={lang} aria-current={lang === locale ? 'page' : undefined} className={`rounded-full px-3 py-2 text-xs font-semibold ${lang === locale ? 'bg-[#241e20] text-white' : 'bg-white/80 text-[#241e20]'}`}>{lang.toUpperCase()}</a>)}
            <a href={`/${locale}`} className="rounded-full border border-[#e7cbd5] px-4 py-2 text-sm">{c.home}</a>
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-7xl px-5 py-12 pb-36 md:px-10 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a05e78]">{c.caption}</p>
        <h1 className="mt-3 font-serif text-5xl md:text-7xl">{c.title}</h1>
        {items.length === 0 ? (
          <div className="mt-10 grid items-center gap-8 rounded-[2rem] border border-[#f0dce4] bg-white/90 p-6 backdrop-blur-sm md:grid-cols-2 md:p-10">
            <div className="max-w-lg">
              <p className="text-lg leading-8 text-[#4f4148]">{c.empty}</p>
              <p className="mt-5 text-sm text-[#9b627b]">{c.before} / {c.after}</p>
            </div>
            <div className="mx-auto w-full max-w-sm"><BeforeAfterSlider beforeLabel={c.before} afterLabel={c.after} emptyLabel={c.empty} /></div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.filter(item => item.before?.url && item.after?.url).map(item => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-[#f0dce4] bg-white/90 shadow-sm">
                <BeforeAfterSlider beforeImage={item.before.url} afterImage={item.after.url} beforeLabel={c.before} afterLabel={c.after} />
                <p className="p-5 font-serif text-xl">{item.text?.[locale]?.title || categories.find(cat => cat.id === item.categoryId)?.name?.[locale] || c.title}</p>
              </article>
            ))}
          </div>
        )}
      </main>
      <nav aria-label="WhatsApp and Instagram" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-[#e7cbd5] bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:flex md:flex-col md:rounded-2xl md:border">
        <a href="https://wa.me/37126830682" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
        <a href="https://www.instagram.com/lanasweetperfect/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d9a3b7] bg-[#fceef4] px-6 py-3 text-center text-sm font-semibold text-[#241e20]">Instagram</a>
      </nav>
    </div>
  )
}
