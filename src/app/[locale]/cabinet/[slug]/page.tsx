import SiteHeader from '@/components/SiteHeader'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

import { isValidLocale, type Locale } from '@/lib/i18n'
import { CABINET_COPY } from '@/content/site'
import { BUSINESS, buildWhatsAppUrl } from '@/lib/business'
type Slug = 'imanta' | 'center'

function isSlug(value: string): value is Slug {
  return value === 'imanta' || value === 'center'
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale) || !isSlug(slug)) return { robots: { index: false, follow: false } }
  return {
    title: `${CABINET_COPY[locale][slug].title} | ${BUSINESS.name}`,
    description: CABINET_COPY[locale][slug].description,
    robots: { index: false, follow: false },
  }
}

export default async function CabinetPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug: slugParam } = await params
  if (!isValidLocale(localeParam) || !isSlug(slugParam)) notFound()
  const locale = localeParam as Locale
  const slug = slugParam as Slug
  const t = CABINET_COPY[locale]
  const office = t[slug]
  const whatsapp = buildWhatsAppUrl(office.whatsapp)
  return (
    <div className="relative min-h-screen bg-white text-[#241e20]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[url('/background.jpeg')] bg-cover bg-center opacity-20" />
      <SiteHeader locale={locale} path={`/cabinet/${slug}`} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-40 pt-12 sm:px-8 md:pt-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#93516d]">{t.locations} · {slug === 'imanta' ? '01' : '02'}</p>
        <h1 className="max-w-3xl [overflow-wrap:anywhere] font-serif text-[clamp(2rem,7vw,3rem)] leading-tight !text-[#241e20] sm:text-7xl">{office.title}</h1>
        <p className="mt-4 max-w-3xl font-serif text-2xl italic text-[#8a5e72] sm:text-3xl">{office.subtitle}</p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#4f4148]">{office.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-4 text-sm font-semibold text-white">{t.booking} ↗</a>
          <a href={`tel:${BUSINESS.phoneE164}`} className="rounded-full border border-[#e7cbd5] bg-white/90 px-6 py-4 text-sm font-semibold text-[#241e20]">{BUSINESS.phoneDisplay}</a>
        </div>
        <a href="#gallery" className="mt-6 inline-flex min-h-12 items-center rounded-full border border-[#e7cbd5] bg-white/90 px-5 py-3 text-sm font-semibold text-[#40353b]">
          {locale === 'ru' ? 'Результаты до и после' : locale === 'lv' ? 'Rezultāti pirms un pēc' : 'Before & after results'} ↓
        </a>
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          <section className="rounded-[2rem] border border-[#f0dce4] bg-white/90 p-7 backdrop-blur-sm md:p-10">
            <h2 className="font-serif text-4xl !text-[#241e20]">{t.services}</h2>
            <ul className="mt-7 space-y-4">
              {office.services.map(service => <li key={service} className="flex items-start gap-3 border-b border-[#f0dce4] pb-4 text-base text-[#4f4148]"><span className="text-[#be839a]">✦</span>{service}</li>)}
            </ul>
            <p className="mt-5 text-sm text-[#7b6770]">{t.prices}</p>
          </section>
          <section className="rounded-[2rem] border border-[#f0dce4] bg-white/90 p-7 backdrop-blur-sm md:p-10">
            <h2 className="font-serif text-4xl !text-[#241e20]">{t.address}</h2>
            <p className="mt-5 text-lg leading-8 text-[#4f4148]">{office.address}</p>
            <iframe title={t.map} className="mt-6 h-72 w-full rounded-xl border border-[#f0dce4]" src={slug === 'imanta' ? BUSINESS.googleMapsEmbed : BUSINESS.centerGoogleMapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </section>
        </div>
        <section id="gallery" aria-labelledby="cabinet-gallery-heading" className="mt-10 rounded-[2rem] border border-[#f0dce4] bg-white/90 p-6 backdrop-blur-sm md:p-10">
          <div className="grid items-center gap-7 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#a05e78]">{office.title}</p>
              <h2 id="cabinet-gallery-heading" className="font-serif text-4xl !text-[#241e20]">{locale === 'ru' ? 'Результаты до и после' : locale === 'lv' ? 'Rezultāti pirms un pēc' : 'Before & after results'}</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-[#4f4148]">{locale === 'ru' ? 'Здесь появятся реальные фотографии результатов процедур именно этого кабинета.' : locale === 'lv' ? 'Šeit būs redzami īsti šī kabineta procedūru rezultātu fotoattēli.' : 'Real before-and-after photos from treatments at this location will appear here.'}</p>
            </div>
            <div className="mx-auto w-full max-w-[320px]">
              <BeforeAfterSlider beforeLabel={locale === 'ru' ? 'До' : locale === 'lv' ? 'Pirms' : 'Before'} afterLabel={locale === 'ru' ? 'После' : locale === 'lv' ? 'Pēc' : 'After'} emptyLabel={locale === 'ru' ? 'Фото скоро' : locale === 'lv' ? 'Foto drīzumā' : 'Photos coming soon'} />
            </div>
          </div>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${locale}/cabinet/${slug === 'imanta' ? 'center' : 'imanta'}`} className="rounded-full border border-[#e7cbd5] bg-white/90 px-6 py-3 text-sm font-semibold text-[#241e20]">{slug === 'imanta' ? t.center.title : t.imanta.title} ↗</Link>
        </div>
      </main>
      <nav aria-label="WhatsApp and Instagram" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-[#e7cbd5] bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:flex md:flex-col md:rounded-2xl md:border">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
        <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d9a3b7] bg-[#fceef4] px-6 py-3 text-center text-sm font-semibold text-[#241e20]">Instagram</a>
      </nav>
    </div>
  )
}
