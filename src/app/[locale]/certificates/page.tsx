import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import CertificateGallery from '@/components/CertificateGallery'
import { CERTIFICATES } from '@/content/certificates'
import { BUSINESS } from '@/lib/business'
import { getHreflangAlternates, getOpenGraphLocale, isValidLocale, type Locale } from '@/lib/i18n'

const copy = {
  ru: { title: 'Дипломы и сертификаты', overline: 'Образование и квалификация', intro: 'Образование, профессиональное обучение и повышение квалификации Светланы Петровой.', empty: 'Документы готовятся к публикации. Фотографии дипломов и сертификатов появятся здесь после проверки.', home: 'На главную', back: 'Вернуться к Светлане' },
  lv: { title: 'Diplomi un sertifikāti', overline: 'Izglītība un kvalifikācija', intro: 'Svetlanas Petrovas izglītība, profesionālā apmācība un kvalifikācijas pilnveide.', empty: 'Dokumenti tiek sagatavoti publicēšanai. Pēc pārbaudes šeit būs pieejami diplomu un sertifikātu attēli.', home: 'Uz sākumu', back: 'Atpakaļ pie Svetlanas' },
  en: { title: 'Diplomas & certificates', overline: 'Education and qualifications', intro: 'Svetlana Petrova’s education, professional training and continuing development.', empty: 'Documents are being prepared. Verified photographs of real diplomas and certificates will be published here.', home: 'Home', back: 'Back to Svetlana' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: requested } = await params
  if (!isValidLocale(requested)) return { robots: { index: false, follow: false } }
  const locale = requested as Locale
  return {
    title: `${copy[locale].title} | Svetlana Petrova | ${BUSINESS.name}`,
    description: copy[locale].intro,
    alternates: { canonical: `/${locale}/certificates`, languages: getHreflangAlternates('/certificates') },
    openGraph: { title: copy[locale].title, description: copy[locale].intro, url: `/${locale}/certificates`, locale: getOpenGraphLocale(locale), siteName: BUSINESS.name },
    // Empty placeholders should not enter Google; switch only after genuine certificates are published.
    robots: { index: CERTIFICATES.length > 0, follow: true },
  }
}

export default async function CertificatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params
  if (!isValidLocale(requested)) notFound()
  const locale = requested as Locale
  const t = copy[locale]

  return (
    <div className="relative min-h-screen bg-[#fffafc] text-[#241e20]">
      <div aria-hidden="true" className="pointer-events-none fixed -inset-2 z-0 bg-[url('/background.jpeg')] bg-cover bg-center opacity-[0.13] blur-[3px]" />
      <SiteHeader locale={locale} path="/certificates" />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-28 pt-10 md:px-10 md:pt-16">
        <a href={`/${locale}#about`} className="inline-flex items-center gap-2 text-sm font-semibold text-[#88556a] hover:underline">← {t.back}</a>
        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#efd9e2] bg-white/95 shadow-sm">
          <div className="flex justify-center bg-gradient-to-r from-[#f8ecef] via-white to-[#f6e9ed]"><img src="/certificates-cover.webp" alt="" width="280" height="140" className="block h-auto w-full max-w-[560px] object-cover" /></div>
          <div className="p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b627b]">{t.overline}</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight !text-[#241e20] sm:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#574952]">{t.intro}</p>
          </div>
        </div>
        <section className="mt-9 rounded-[2rem] border border-[#efd9e2] bg-white/95 p-6 sm:p-10">
          {CERTIFICATES.length ? <CertificateGallery certificates={CERTIFICATES} locale={locale} /> :
            <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
              <p className="max-w-lg text-base leading-7 text-[#665760]">{t.empty}</p>
              <a href={`/${locale}`} className="mt-2 rounded-full border border-[#e7cbd5] px-5 py-3 text-sm font-semibold text-[#241e20]">{t.home} ↗</a>
            </div>}
        </section>
      </main>
    </div>
  )
}
