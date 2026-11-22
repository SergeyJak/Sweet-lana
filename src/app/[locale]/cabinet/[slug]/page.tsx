import SiteHeader from '@/components/SiteHeader'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { getHreflangAlternates, getOpenGraphLocale, isValidLocale, type Locale } from '@/lib/i18n'
import { CABINET_COPY } from '@/content/site'
import { BUSINESS, buildWhatsAppUrl } from '@/lib/business'
import { DEVICES } from '@/content/devices'
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
    alternates: {
      canonical: `/${locale}/cabinet/${slug}`,
      languages: getHreflangAlternates(`/cabinet/${slug}`),
    },
    openGraph: {
      title: `${CABINET_COPY[locale][slug].title} | ${BUSINESS.name}`,
      description: CABINET_COPY[locale][slug].description,
      url: `/${locale}/cabinet/${slug}`,
      locale: getOpenGraphLocale(locale),
      siteName: BUSINESS.name,
      type: 'website',
    },
    robots: { index: true, follow: true },
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
  const isCenter = slug === 'center'
  return (
    <div className={`relative min-h-screen ${isCenter ? "bg-[#f5f0e9] text-[#3d302b]" : "bg-white text-[#241e20]"}`}>
      <div aria-hidden="true" className={isCenter ? "pointer-events-none fixed inset-0 z-0 h-[100lvh] w-full sveta-center-wallpaper" : "pointer-events-none fixed -inset-2 bg-[url('/background.jpeg')] bg-cover bg-center opacity-20 blur-[3px]"} />
      <SiteHeader locale={locale} path={`/cabinet/${slug}`} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-40 pt-12 sm:px-8 md:pt-20">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_0.85fr] md:gap-12">
          <div>
        <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.25em] ${isCenter ? "text-[#955b49]" : "text-[#93516d]"}`}>{t.locations} · {slug === 'imanta' ? '01' : '02'}</p>
        <div className="flex flex-wrap items-center gap-5 sm:gap-7">
          {slug === 'imanta' && (
            <img src="/sweet-perfect-logo.webp" alt="Sweet Perfect Cosmetology" width="300" height="300" decoding="async" className="h-28 w-28 shrink-0 rounded-full border border-[#f0dce4] bg-white object-contain sm:h-36 sm:w-36" />
          )}
          <h1 className="max-w-3xl [overflow-wrap:anywhere] font-serif text-[clamp(2rem,7vw,3rem)] leading-tight !text-[#241e20] sm:text-7xl">{office.title}</h1>
        </div>
        <p className={`mt-4 max-w-3xl font-serif text-2xl italic sm:text-3xl ${isCenter ? "text-[#985e4e]" : "text-[#8a5e72]"}`}>{office.subtitle}</p>
        <p className={`mt-6 max-w-2xl text-base leading-8 ${isCenter ? "text-[#594a41]" : "text-[#4f4148]"}`}>{office.description}</p>
        <a href="#gallery" className={`mt-6 inline-flex min-h-12 items-center rounded-full border px-5 py-3 text-sm font-semibold ${isCenter ? "border-[#d9c4b1] bg-[#fffaf3]/95 text-[#795344] hover:bg-[#f1e3d5]" : "border-[#e7cbd5] bg-white/90 text-[#40353b]"}`}>
          {locale === 'ru' ? 'Результаты до и после' : locale === 'lv' ? 'Rezultāti pirms un pēc' : 'Before & after results'} ↓
        </a>
          </div>
          <div className="mx-auto w-full max-w-[250px] sm:max-w-[320px] lg:max-w-[370px]">
            <Image
              src={isCenter ? '/liderm-clinic-reception.jpg' : '/sweet-perfect-interior.png'}
              alt={isCenter
                ? (locale === 'ru' ? 'Ресепшен Liderm, Hanzas iela 18, Рига' : locale === 'lv' ? 'Liderm reģistratūra, Hanzas iela 18, Rīga' : 'Reception area at Liderm, Hanzas iela 18, Riga')
                : (locale === 'ru' ? 'Интерьер кабинета Sweet Perfect, Dammes iela 46A, Рига' : locale === 'lv' ? 'Sweet Perfect kabineta interjers, Dammes iela 46A, Rīga' : 'Sweet Perfect studio interior, Dammes iela 46A, Riga')}
              width={isCenter ? 880 : 1122}
              height={isCenter ? 1564 : 1402}
              sizes="(min-width: 1024px) 370px, (min-width: 640px) 320px, 250px"
              priority
              className="block h-auto w-full rounded-[2rem] border border-white/90 shadow-[0_18px_55px_rgba(69,40,53,0.12)]"
            />
          </div>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          <section id="services" className={`scroll-mt-28 rounded-[2rem] border p-7 backdrop-blur-sm md:p-10 ${isCenter ? "border-[#d9c6b4] bg-[#fffaf3]/95 shadow-[0_14px_36px_rgba(91,61,45,0.07)]" : "border-[#f0dce4] bg-white/90"}`}>
            <h2 className="font-serif text-4xl !text-[#241e20]">{t.services}</h2>
            {slug === 'center' ? (
              <ul className="mt-6 space-y-1">
                {DEVICES.map(device => (
                  <li key={device.slug} className={isCenter ? "border-b border-[#e3d6c9] last:border-0" : "border-b border-[#f0dce4] last:border-0"}>
                    <Link href={`/${locale}/cabinet/center/device/${device.slug}`}
                      className="group flex min-h-16 items-center justify-between gap-3 rounded-lg py-3 text-base text-[#514238] transition hover:bg-[#f2e7da] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9c6751]">
                      <span className="flex min-w-0 items-center gap-3"><span aria-hidden="true" className="shrink-0 text-[#b37a65]">✦</span><span className="font-medium group-hover:text-[#955b49]">{device.name}</span></span>
                      <span aria-hidden="true" className="shrink-0 text-lg text-[#a46b56] transition group-hover:translate-x-1">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-7 space-y-4">
                {office.services.map(service => <li key={service} className="flex items-start gap-3 border-b border-[#f0dce4] pb-4 text-base text-[#4f4148]"><span className="text-[#be839a]">✦</span>{service}</li>)}
              </ul>
            )}
            <p className={`mt-5 text-sm ${isCenter ? "text-[#826e60]" : "text-[#7b6770]"}`}>{t.prices}</p>
          </section>
          <section className={`rounded-[2rem] border p-7 backdrop-blur-sm md:p-10 ${isCenter ? "border-[#d9c6b4] bg-[#fffaf3]/95 shadow-[0_14px_36px_rgba(91,61,45,0.07)]" : "border-[#f0dce4] bg-white/90"}`}>
            <h2 className="font-serif text-4xl !text-[#241e20]">{t.address}</h2>
            <p className={`mt-5 text-lg leading-8 ${isCenter ? "text-[#594a41]" : "text-[#4f4148]"}`}>{office.address}</p>
            <iframe title={t.map} className={`mt-6 h-72 w-full rounded-xl border ${isCenter ? "border-[#d9c6b4]" : "border-[#f0dce4]"}`} src={slug === 'imanta' ? BUSINESS.googleMapsEmbed : BUSINESS.centerGoogleMapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            {slug === 'imanta' && (
              <a href={BUSINESS.googleMapsDirections} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-12 items-center rounded-full border border-[#e7cbd5] bg-white/95 px-5 py-3 text-sm font-semibold text-[#8e526d] transition hover:bg-[#f9edf2]">
                {locale === 'ru' ? 'Sweet Perfect в Google Картах' : locale === 'lv' ? 'Sweet Perfect Google kartēs' : 'Sweet Perfect on Google Maps'} <span aria-hidden="true" className="ml-2">↗</span>
              </a>
            )}
          </section>
        </div>
        <section id="gallery" aria-labelledby="cabinet-gallery-heading" className={`mt-10 rounded-[2rem] border p-6 backdrop-blur-sm md:p-10 ${isCenter ? "border-[#d9c6b4] bg-[#fffaf3]/95 shadow-[0_14px_36px_rgba(91,61,45,0.07)]" : "border-[#f0dce4] bg-white/90"}`}>
          <div className="grid items-center gap-7 md:grid-cols-2">
            <div>
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${isCenter ? "text-[#a06a53]" : "text-[#a05e78]"}`}>{office.title}</p>
              <h2 id="cabinet-gallery-heading" className="font-serif text-4xl !text-[#241e20]">{locale === 'ru' ? 'Результаты до и после' : locale === 'lv' ? 'Rezultāti pirms un pēc' : 'Before & after results'}</h2>
              <p className={`mt-4 max-w-lg text-base leading-7 ${isCenter ? "text-[#594a41]" : "text-[#4f4148]"}`}>{locale === 'ru' ? 'Здесь появятся реальные фотографии результатов процедур именно этого кабинета.' : locale === 'lv' ? 'Šeit būs redzami īsti šī kabineta procedūru rezultātu fotoattēli.' : 'Real before-and-after photos from treatments at this location will appear here.'}</p>
            </div>
            <div className="mx-auto w-full max-w-[320px]">
              <BeforeAfterSlider beforeLabel={locale === 'ru' ? 'До' : locale === 'lv' ? 'Pirms' : 'Before'} afterLabel={locale === 'ru' ? 'После' : locale === 'lv' ? 'Pēc' : 'After'} emptyLabel={locale === 'ru' ? 'Фото скоро' : locale === 'lv' ? 'Foto drīzumā' : 'Photos coming soon'} />
            </div>
          </div>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${locale}/cabinet/${slug === 'imanta' ? 'center' : 'imanta'}`} className={`rounded-full border px-6 py-3 text-sm font-semibold ${isCenter ? "border-[#d9c4b1] bg-[#fffaf3] text-[#5d4336]" : "border-[#e7cbd5] bg-white/90 text-[#241e20]"}`}>{slug === 'imanta' ? t.center.title : t.imanta.title} ↗</Link>
        </div>
      </main>
      <nav aria-label="WhatsApp and Instagram" className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:flex md:flex-col md:rounded-2xl md:border ${isCenter ? "border-[#dac9b8] bg-[#fffaf4]/95" : "border-[#e7cbd5] bg-white/95"}`}>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
        <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className={`rounded-full border px-6 py-3 text-center text-sm font-semibold ${isCenter ? "border-[#c9a994] bg-[#f1dfd1] text-[#553b30]" : "border-[#d9a3b7] bg-[#fceef4] text-[#241e20]"}`}>Instagram</a>
      </nav>
    </div>
  )
}
