import SiteHeader from '@/components/SiteHeader'
import type { Metadata } from 'next'
import { getHreflangAlternates, getOpenGraphLocale, isValidLocale } from '@/lib/i18n'

const seo = {
  ru: { title: 'Светлана Петрова — косметолог в Риге | Lana Sweet Perfect', description: 'Косметолог Светлана Петрова, Рига: уход за кожей в Иманте, пилинги, инъекции и аппаратная косметология в клинике Liderm. Два адреса и запись.' },
  lv: { title: 'Svetlana Petrova — kosmetoloģe Rīgā | Lana Sweet Perfect', description: 'Kosmetoloģe Svetlana Petrova Rīgā: sejas kopšana Imantā, pīlingi un aparātu kosmetoloģija Liderm klīnikā. Divas atrašanās vietas.' },
  en: { title: 'Svetlana Petrova — cosmetologist in Riga | Lana Sweet Perfect', description: 'Meet cosmetologist Svetlana Petrova in Riga. Skincare in Imanta and advanced aesthetic treatments at Liderm clinic. Two locations.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requested } = await params
  const locale = isValidLocale(requested) ? requested : 'lv'
  const page = seo[locale]
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${locale}`, languages: getHreflangAlternates() },
    openGraph: { title: page.title, description: page.description, url: `/${locale}`, siteName: BUSINESS.name, locale: getOpenGraphLocale(locale), type: 'website' },
    robots: { index: true, follow: true },
  }
}

import GoogleReviews from '@/components/GoogleReviews'
import CreamCarousel from '@/components/CreamCarousel'
import type { Locale } from '@/lib/i18n'
import { HOME_COPY } from '@/content/site'
import { BUSINESS, buildWhatsAppUrl } from '@/lib/business'


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params
  const locale: Locale = requested === 'ru' || requested === 'en' ? requested : 'lv'
  const c = HOME_COPY[locale]
  return (
    <div className="relative min-h-screen bg-white text-[#241e20]">
      {/* Stable large viewport height prevents background resizing when mobile browser chrome changes. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 h-[100lvh] w-full overflow-hidden [transform:translateZ(0)]">
        <div className="absolute -inset-2 bg-[url('/background.jpeg')] bg-cover bg-[position:57%_center] bg-no-repeat blur-[3px] md:bg-center" />
        <div className="absolute inset-0 bg-white/30 md:bg-white/20" />
      </div>
      <SiteHeader locale={locale} />

      <main className="relative z-10">
        <section id="home" className="relative border-b border-[#f0dce4]/70">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-9 sm:px-8 md:min-h-[660px] md:grid-cols-[1.02fr_0.98fr] md:gap-12 md:px-12 md:py-20">
            <div className="order-2 max-w-xl md:order-1">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#925d71]">{c.eyebrow}</p>
              <h1 className="font-serif text-[clamp(2.8rem,7vw,5.6rem)] font-medium leading-[1.06] tracking-[-0.04em] !text-[#241e20]">{c.heroName}</h1>
              <p className="mt-5 max-w-lg text-sm font-semibold leading-6 text-[#8b596d] sm:text-base">{c.heroRole}</p>
              <p className="mt-5 max-w-lg text-base leading-8 text-[#40353b]">{c.heroBlurb}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cabinets" className="inline-flex items-center rounded-full bg-[#241e20] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#7e5267]">{c.discover} <span aria-hidden="true" className="ml-2">↓</span></a>
                <a href="#about" className="inline-flex items-center rounded-full border border-[#dcbac9] bg-white/90 px-7 py-4 text-sm font-semibold text-[#241e20] transition hover:bg-[#fbeef3]">{c.about} <span aria-hidden="true" className="ml-2">↗</span></a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="mx-auto w-full max-w-[250px] sm:max-w-[320px] lg:max-w-[370px]">
                <img src="/svetlana-portrait.png" alt={c.heroName} width="1024" height="1536" fetchPriority="high" decoding="async" className="block h-auto w-full rounded-[2rem] border border-white/90 shadow-[0_18px_55px_rgba(69,40,53,0.12)]" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-heading" className="relative mx-auto max-w-7xl px-5 pt-10 md:px-10 md:pt-16">
          <div className="grid items-center gap-6 rounded-[2rem] border border-[#efdee5] bg-white/90 p-7 backdrop-blur-sm md:grid-cols-[0.3fr_0.7fr] md:p-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b627b]">{BUSINESS.name}</p>
              <h2 id="about-heading" className="font-serif text-4xl !text-[#241e20] md:text-5xl">{c.about}</h2>
            </div>
            <p className="max-w-3xl whitespace-pre-line text-base leading-8 text-[#4f4148]">{c.aboutText}</p>
          </div>
        </section>

        <section aria-labelledby="qualifications-heading" className="relative mx-auto max-w-7xl px-5 pt-6 md:px-10 md:pt-8">
          <a href={`/${locale}/certificates`} className="group flex min-w-0 items-center overflow-hidden rounded-[1.75rem] border border-[#ead6de] bg-white/95 shadow-[0_10px_35px_rgba(63,37,48,0.06)] transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="relative h-40 w-[38%] max-w-[210px] shrink-0 overflow-hidden bg-[#f8edf0] sm:h-44 sm:w-[32%]">
              <img src="/certificates-cover.png" alt="" width="420" height="210" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-3 p-4 sm:p-8">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#9b627b]">{locale === 'ru' ? 'Квалификация специалиста' : locale === 'lv' ? 'Speciālistes kvalifikācija' : 'Professional qualifications'}</p>
                <h2 id="qualifications-heading" className="font-serif text-[clamp(1.15rem,3.5vw,2.25rem)] leading-tight !text-[#241e20]">{locale === 'ru' ? 'Дипломы и сертификаты' : locale === 'lv' ? 'Diplomi un sertifikāti' : 'Diplomas & certificates'}</h2>
                <p className="mt-2 hidden text-sm leading-6 text-[#5c4e55] sm:block">{locale === 'ru' ? 'Образование, обучение и профессиональное развитие Светланы.' : locale === 'lv' ? 'Svetlanas izglītība, apmācības un profesionālā pilnveide.' : 'Svetlana’s education, training and professional development.'}</p>
                <p className="mt-3 text-xs font-semibold text-[#8c536b] sm:text-sm">{locale === 'ru' ? 'Посмотреть документы' : locale === 'lv' ? 'Apskatīt dokumentus' : 'View documents'} ↗</p>
              </div>
            </div>
          </a>
        </section>

        <section id="cabinets" aria-labelledby="cabinets-title" className="relative mx-auto max-w-7xl px-5 pt-12 pb-8 md:px-10 md:pt-20">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#a05e78]">{BUSINESS.name}</p>
            <h2 id="cabinets-title" className="font-serif text-4xl !text-[#241e20] sm:text-5xl md:text-6xl">{c.cabinetsTitle}</h2>
            <p className="mt-4 text-base leading-7 text-[#4f4148]">{c.cabinetsIntro}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <a href={`/${locale}/cabinet/imanta`} className="group flex min-h-72 flex-col justify-between rounded-[2rem] border border-[#ebd3dd] bg-white/95 p-7 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.25em] text-[#a05e78]">01</span><span className="rounded-full bg-[#faedf2] px-4 py-2 text-xs font-semibold text-[#8e526d]">{c.imantaArea} · {BUSINESS.streetAddress}</span></div>
              <div className="mt-10">
                <div className="flex items-center gap-4 sm:gap-6">
                  <img src="/sweet-perfect-logo.webp" alt="Sweet Perfect Cosmetology" width="300" height="300" loading="lazy" decoding="async" className="h-24 w-24 shrink-0 rounded-full border border-[#f0dce4] bg-white object-contain sm:h-28 sm:w-28" />
                  <h3 className="font-serif text-4xl !text-[#241e20] sm:text-5xl">{c.imantaTitle}</h3>
                </div>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#4f4148]">{c.imantaDetail}</p>
                <p className="mt-7 text-sm font-semibold text-[#8e526d]">{c.choose} ↗</p>
              </div>
            </a>
            <a href={`/${locale}/cabinet/center`} className="group flex min-h-72 flex-col justify-between rounded-[2rem] border border-[#ebd3dd] bg-[#fff7fa]/95 p-7 shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-10">
              <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.25em] text-[#a05e78]">02</span><span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#8e526d]">{c.centerArea} · {c.centerAddress}</span></div>
              <div className="mt-10">
                <h3 className="font-serif text-5xl !text-[#241e20]">{c.centerTitle}</h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#4f4148]">{c.centerDetail}</p>
                <p className="mt-7 text-sm font-semibold text-[#8e526d]">{c.choose} ↗</p>
              </div>
            </a>
          </div>
        </section>

        <CreamCarousel locale={locale} />
        <section id="contact" className="relative mx-auto max-w-7xl px-5 py-10 md:px-10 md:py-16">
          <div className="rounded-[2rem] border border-[#f0dce4] bg-white/90 p-7 backdrop-blur-sm md:p-11">
            <h2 className="font-serif text-4xl !text-[#241e20] md:text-5xl">{c.contact}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4f4148]">{c.contactText}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${BUSINESS.phoneE164}`} className="rounded-full border border-[#e7cbd5] bg-white/85 px-5 py-3 text-sm font-semibold text-[#241e20]">{BUSINESS.phoneDisplay}</a>
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-5 py-3 text-sm font-semibold text-white">WhatsApp ↗</a>
              <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#e7cbd5] bg-white/85 px-5 py-3 text-sm font-semibold text-[#241e20]">Instagram ↗</a>
            </div>
          </div>
        </section>
        <GoogleReviews locale={locale} />



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
