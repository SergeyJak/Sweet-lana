import GoogleReviews from '@/components/GoogleReviews'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import type { Locale } from '@/lib/i18n'
import { HOME_COPY } from '@/content/site'
import { BUSINESS, buildWhatsAppUrl } from '@/lib/business'

const ids = ['home', 'about', 'cabinets', 'gallery', 'contact'] as const

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params
  const locale: Locale = requested === 'ru' || requested === 'en' ? requested : 'lv'
  const c = HOME_COPY[locale]
  const panels = [
    { id: 'about', title: c.about, text: c.aboutText, number: '01' },
    { id: 'gallery', title: c.gallery, text: c.galleryText, number: '02' },
    { id: 'contact', title: c.contact, text: c.contactText, number: '03' },
  ]
  return (
    <div className="relative min-h-screen bg-white text-[#241e20]">
      {/* Stable large viewport height prevents background resizing when mobile browser chrome changes. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 h-[100lvh] w-full overflow-hidden [transform:translateZ(0)]">
        <div className="absolute inset-0 bg-[url('/background.jpeg')] bg-cover bg-[position:57%_center] bg-no-repeat md:bg-center" />
        <div className="absolute inset-0 bg-white/30 md:bg-white/20" />
      </div>
      <header className="sticky top-0 z-50 border-b border-[#f0dce4] bg-white/95 backdrop-blur-md">
        <div className="relative mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 md:px-10">
          <a href="#home" className="min-w-0 shrink-0 whitespace-nowrap font-serif text-[clamp(1.4rem,5vw,2rem)] font-semibold tracking-tight text-[#241e20]">{BUSINESS.name}<span className="text-[#d9a3b7]">.</span></a>
          <nav aria-label={c.menu} className="hidden items-center gap-7 lg:flex">
            {ids.map((id, i) => <a key={id} href={id === 'gallery' ? `/${locale}/gallery` : `#${id}`} className="text-xs font-semibold uppercase tracking-[0.12em] text-[#635657] transition hover:text-[#bc8075]">{c.nav[i]}</a>)}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <nav aria-label="Language" className="flex items-center gap-0.5 text-[11px] font-semibold tracking-wide sm:gap-1 sm:text-xs">
              {(['ru', 'lv', 'en'] as const).map((lang) => <a key={lang} href={`/${lang}`} aria-current={lang === locale ? 'page' : undefined} className={`flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10 ${lang === locale ? 'bg-[#241e20] text-white' : 'text-[#736767] hover:bg-[#fbeef3]'}`}>{lang.toUpperCase()}</a>)}
            </nav>
            <details className="group lg:hidden">
              <summary aria-label={c.menu} className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-[#e7cbd5] text-lg text-[#241e20] [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="group-open:hidden">☰</span><span aria-hidden="true" className="hidden group-open:inline">×</span>
              </summary>
              <nav aria-label={c.menu} className="absolute left-0 right-0 top-full flex flex-col border-b border-[#f0dce4] bg-white px-4 py-3 shadow-xl sm:left-auto sm:right-4 sm:w-72 sm:rounded-b-2xl">
                {ids.map((id, i) => <a key={id} href={id === 'gallery' ? `/${locale}/gallery` : `#${id}`} className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#fbeef3]">{c.nav[i]}</a>)}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="home" className="relative border-b border-[#f0dce4]/70">
          <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-6 py-28 md:px-12">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#a05e78]">{c.eyebrow}</p>
            <h1 className="mb-7 max-w-5xl font-serif text-[clamp(3.1rem,12vw,10rem)] font-medium leading-[0.85] tracking-[-0.055em] text-[#241e20]">{BUSINESS.name}<span className="text-[#d9a3b7]">.</span></h1>
            <p className="mb-5 max-w-2xl font-serif text-3xl italic text-[#7b5265] md:text-5xl">{c.subtitle}</p>
            <p className="mb-10 max-w-lg text-base leading-8 text-[#3f3539]">{c.intro}</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#241e20] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#7e5267]">{c.booking} <span aria-hidden="true">↗</span></a>
              <a href="#cabinets" className="inline-flex w-fit items-center gap-3 rounded-full border border-[#e7cbd5] bg-white/80 px-7 py-4 text-sm font-semibold text-[#241e20] transition hover:bg-[#fbeef3]">{c.discover} <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <section id="cabinets" aria-labelledby="cabinets-title" className="relative mx-auto max-w-7xl px-5 pt-12 pb-8 md:px-10 md:pt-20">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#a05e78]">{BUSINESS.name}</p>
            <h2 id="cabinets-title" className="font-serif text-4xl !text-[#241e20] sm:text-5xl md:text-6xl">{c.cabinetsTitle}</h2>
            <p className="mt-4 text-base leading-7 text-[#4f4148]">{c.cabinetsIntro}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <a href={`/${locale}/cabinet/imanta`} className="group flex min-h-72 flex-col justify-between rounded-[2rem] border border-[#ebd3dd] bg-white/95 p-7 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.25em] text-[#a05e78]">01</span><span className="rounded-full bg-[#faedf2] px-4 py-2 text-xs font-semibold text-[#8e526d]">{BUSINESS.streetAddress}</span></div>
              <div className="mt-10">
                <h3 className="font-serif text-5xl !text-[#241e20]">{c.imantaTitle}</h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#4f4148]">{c.imantaDetail}</p>
                <p className="mt-7 text-sm font-semibold text-[#8e526d]">{c.choose} ↗</p>
              </div>
            </a>
            <a href={`/${locale}/cabinet/center`} className="group flex min-h-72 flex-col justify-between rounded-[2rem] border border-[#ebd3dd] bg-[#fff7fa]/95 p-7 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.25em] text-[#a05e78]">02</span><span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#8e526d]">{c.centerAddress}</span></div>
              <div className="mt-10">
                <h3 className="font-serif text-5xl !text-[#241e20]">{c.centerTitle}</h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#4f4148]">{c.centerDetail}</p>
                <p className="mt-7 text-sm font-semibold text-[#8e526d]">{c.choose} ↗</p>
              </div>
            </a>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-5 py-10 md:grid-cols-3 md:px-10 md:py-16">
          {panels.map((panel) => (
            <article key={panel.id} id={panel.id} className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[2rem] border border-[#f0dce4] bg-white/85 backdrop-blur-sm p-8 shadow-[0_8px_35px_rgba(55,43,43,0.035)] md:p-11">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[0.3em] text-[#c5829e]">{panel.number} / 03</span>
                <span className="rounded-full bg-[#fceef4] px-4 py-2 text-xs text-[#9b627b]">{c.soon}</span>
              </div>
              <div>
                <h2 className="mb-5 font-serif text-5xl font-medium text-[#241e20] md:text-6xl">{panel.title}</h2>
                <p className="max-w-md text-base leading-7 text-[#4f4148]">{panel.text}</p>
                {panel.id === 'gallery' && <a href={`/${locale}/gallery`} className="mt-6 inline-flex rounded-full bg-[#241e20] px-5 py-3 text-sm font-semibold text-white hover:bg-[#7e5267]">{c.galleryLink} ↗</a>}
                {panel.id === 'contact' && <div className="mt-5 flex flex-wrap gap-3"><a href={`tel:${BUSINESS.phoneE164}`} className="inline-flex rounded-full border border-[#e7cbd5] bg-white/85 px-5 py-3 text-sm font-semibold text-[#241e20]">{BUSINESS.phoneDisplay}</a><a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full border border-[#e7cbd5] bg-white/85 px-5 py-3 text-sm font-semibold text-[#241e20]">WhatsApp ↗</a></div>}
                {panel.id === 'contact' && <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-[#241e20] px-5 py-3 text-sm font-semibold text-white hover:bg-[#7e5267]">{c.booking} ↗</a>}
              </div>
            </article>
          ))}
        </section>
        <GoogleReviews locale={locale} />

        <section aria-labelledby="before-after-heading" className="relative mx-auto max-w-7xl px-5 pb-10 md:px-10">
          <div className="grid items-center gap-8 rounded-[2rem] border border-[#f0dce4] bg-white/90 p-6 backdrop-blur-sm md:grid-cols-2 md:p-10">
            <div className="max-w-lg">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#a05e78]">{BUSINESS.name}</p>
              <h2 id="before-after-heading" className="font-serif text-4xl text-[#241e20] md:text-5xl">{c.gallery}</h2>
              <p className="mt-5 text-base leading-7 text-[#4f4148]">{c.galleryText}</p>
              <a href={`/${locale}/gallery`} className="mt-7 inline-flex rounded-full bg-[#241e20] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7e5267]">{c.galleryLink} ↗</a>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <BeforeAfterSlider beforeLabel={locale === 'ru' ? 'До' : locale === 'lv' ? 'Pirms' : 'Before'} afterLabel={locale === 'ru' ? 'После' : locale === 'lv' ? 'Pēc' : 'After'} emptyLabel={c.galleryText} />
            </div>
          </div>
        </section>

      </main>
      <nav aria-label="WhatsApp and Instagram" className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e7cbd5] bg-white/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_35px_rgba(35,20,27,0.12)] backdrop-blur-md md:inset-x-auto md:bottom-7 md:right-7 md:flex md:flex-col md:gap-3 md:rounded-2xl md:border md:p-3">
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-col">
          <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#241e20] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7e5267]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 1 0 20.5 3.5ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2.1-.4 0-.5L8.8 7c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.1 4.6 1.2.5 1.7.6 2.3.7.7.1 1.4 0 1.9-.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z"/></svg>
            WhatsApp
          </a>
          <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d9a3b7] bg-[#fceef4] px-5 text-sm font-semibold text-[#241e20] transition hover:bg-[#f4dce6]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7Zm0 2h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Zm10.5 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>
            Instagram
          </a>
        </div>
      </nav>
      <footer className="relative z-10 border-t border-[#f0dce4] bg-white/85 px-5 py-4 pb-24 backdrop-blur-sm md:px-10 md:py-5 md:pb-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-2 text-xs text-[#786b69] sm:text-sm">
          <span className="font-serif text-lg text-[#241e20]">{BUSINESS.name}.</span>
          <span className="hidden sm:inline">{c.footer}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
