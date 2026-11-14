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
    <div className="sweet-gallery relative min-h-screen bg-white text-[#241e20]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-[url('/background.jpeg')] bg-cover bg-center opacity-20" />
      <header className="relative z-10 border-b border-[#f0dce4] bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a href={`/${locale}`} className="max-w-full whitespace-nowrap font-serif text-xl font-semibold tracking-tight text-[#241e20] sm:text-2xl">Lana Sweet Perfect.</a>
          <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
            {(['ru','lv','en'] as const).map(lang => <a href={`/${lang}/gallery`} key={lang} aria-current={lang === locale ? 'page' : undefined} className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold sm:h-10 sm:w-10 ${lang === locale ? 'bg-[#241e20] text-white' : 'bg-white/80 text-[#241e20]'}`}>{lang.toUpperCase()}</a>)}
            <a href={`/${locale}`} className="ml-auto shrink-0 rounded-full border border-[#e7cbd5] px-3 py-2 text-xs font-semibold text-[#241e20] sm:px-4 sm:text-sm">{c.home}</a>
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-36 pt-9 sm:px-6 md:px-10 md:pt-14">
        <p className="text-xs font-semibold uppercase leading-6 tracking-[0.18em] text-[#93516d] sm:tracking-[0.25em]">{c.caption}</p>
        <h1 className="mt-2 font-serif text-5xl leading-tight !text-[#241e20] sm:text-6xl md:text-7xl">{c.title}</h1>
        {items.length === 0 ? (
          <div className="mt-7 grid items-center gap-6 rounded-[1.5rem] border border-[#f0dce4] bg-white/95 p-5 backdrop-blur-sm sm:p-7 md:mt-10 md:grid-cols-2 md:rounded-[2rem] md:p-10">
            <div className="max-w-lg">
              <p className="text-base leading-7 text-[#4f4148] sm:text-lg sm:leading-8">{c.empty}</p>
              <p className="mt-3 text-sm font-semibold text-[#9b627b]">{c.before} / {c.after}</p>
            </div>
            <div className="mx-auto w-full max-w-[280px] sm:max-w-sm"><BeforeAfterSlider beforeLabel={c.before} afterLabel={c.after} emptyLabel={locale === "ru" ? "Фото скоро" : locale === "lv" ? "Foto drīzumā" : "Photos coming soon"} /></div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.filter(item => item.before?.url && item.after?.url).map(item => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-[#f0dce4] bg-white/90 shadow-sm">
                <BeforeAfterSlider beforeImage={item.before.url} afterImage={item.after.url} beforeLabel={c.before} afterLabel={c.after} />
                <p className="p-5 font-serif text-xl !text-[#241e20]">{item.text?.[locale]?.title || categories.find(cat => cat.id === item.categoryId)?.name?.[locale] || c.title}</p>
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
