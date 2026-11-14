import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

type Locale = 'ru' | 'lv' | 'en'
type Slug = 'imanta' | 'center'

const cabinets = {
  ru: {
    home: 'На главную', locations: 'Наши кабинеты', services: 'Услуги', booking: 'Записаться в этот кабинет',
    instagram: 'Instagram', call: 'Позвонить', address: 'Адрес', map: 'Карта', prices: 'Цены уточняйте при записи.',
    imanta: {
      title: 'Кабинет в Иманте', subtitle: 'Уходовые и эстетические процедуры',
      description: 'Подготовка к аппаратным процедурам, уход за кожей, инъекции красоты, пилинги и ваксинг.',
      services: ['Подготовка к аппаратным процедурам', 'Уходовые процедуры', 'Инъекции красоты', 'Пилинги', 'Ваксинг'],
      address: 'Dammes iela 46A, Рига, Иманта',
      whatsapp: 'Здравствуйте! Хочу записаться на процедуру в кабинете Иманта.',
    },
    center: {
      title: 'Кабинет в Центре', subtitle: 'Аппаратная косметология',
      description: 'Кабинет для аппаратных косметологических процедур. Подробный перечень процедур уточняется.',
      services: ['Аппаратная косметология'],
      address: 'Рига, Центр. Точный адрес уточняется.',
      whatsapp: 'Здравствуйте! Хочу записаться на аппаратную процедуру в кабинете Центр.',
    },
  },
  lv: {
    home: 'Uz sākumu', locations: 'Mūsu kabineti', services: 'Pakalpojumi', booking: 'Pierakstīties šajā kabinetā',
    instagram: 'Instagram', call: 'Zvanīt', address: 'Adrese', map: 'Karte', prices: 'Cenas precizējiet, piesakoties.',
    imanta: {
      title: 'Kabinets Imantā', subtitle: 'Kopjošās un estētiskās procedūras',
      description: 'Sagatavošana aparatūras procedūrām, ādas kopšana, skaistuma injekcijas, pīlingi un vaksācija.',
      services: ['Sagatavošana aparatūras procedūrām', 'Kopjošās procedūras', 'Skaistuma injekcijas', 'Pīlingi', 'Vaksācija'],
      address: 'Dammes iela 46A, Rīga, Imanta',
      whatsapp: 'Labdien! Vēlos pierakstīties procedūrai Imantas kabinetā.',
    },
    center: {
      title: 'Kabinets Centrā', subtitle: 'Aparātu kosmetoloģija',
      description: 'Kabinets aparatūras kosmetoloģijas procedūrām. Precīzs procedūru saraksts tiek precizēts.',
      services: ['Aparātu kosmetoloģija'],
      address: 'Rīga, Centrs. Precīza adrese vēl tiks precizēta.',
      whatsapp: 'Labdien! Vēlos pierakstīties aparatūras procedūrai Centra kabinetā.',
    },
  },
  en: {
    home: 'Back home', locations: 'Our locations', services: 'Treatments', booking: 'Book at this location',
    instagram: 'Instagram', call: 'Call', address: 'Address', map: 'Map', prices: 'Please ask for prices when booking.',
    imanta: {
      title: 'Imanta studio', subtitle: 'Skincare and aesthetic treatments',
      description: 'Preparation for device-based treatments, skincare, aesthetic injections, peels and waxing.',
      services: ['Preparation for device-based treatments', 'Skincare treatments', 'Aesthetic injections', 'Peels', 'Waxing'],
      address: 'Dammes iela 46A, Riga, Imanta',
      whatsapp: 'Hello! I would like to book an appointment at the Imanta studio.',
    },
    center: {
      title: 'City Centre studio', subtitle: 'Device-based aesthetic treatments',
      description: 'A studio for device-based cosmetology. The detailed treatment list is being confirmed.',
      services: ['Device-based cosmetology'],
      address: 'Riga, City Centre. Exact address to be confirmed.',
      whatsapp: 'Hello! I would like to book a device-based treatment at the City Centre studio.',
    },
  },
} as const

function isLocale(value: string): value is Locale {
  return value === 'ru' || value === 'lv' || value === 'en'
}
function isSlug(value: string): value is Slug {
  return value === 'imanta' || value === 'center'
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale) || !isSlug(slug)) return { robots: { index: false, follow: false } }
  return {
    title: `${cabinets[locale][slug].title} | Lana Sweet Perfect`,
    description: cabinets[locale][slug].description,
    robots: { index: false, follow: false },
  }
}

export default async function CabinetPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug: slugParam } = await params
  if (!isLocale(localeParam) || !isSlug(slugParam)) notFound()
  const locale = localeParam as Locale
  const slug = slugParam as Slug
  const t = cabinets[locale]
  const office = t[slug]
  const whatsapp = `https://wa.me/37126830682?text=${encodeURIComponent(office.whatsapp)}`
  return (
    <div className="relative min-h-screen bg-white text-[#241e20]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[url('/background.jpeg')] bg-cover bg-center opacity-20" />
      <header className="relative z-10 border-b border-[#f0dce4] bg-white/95 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href={`/${locale}`} className="font-serif text-xl font-semibold text-[#241e20] sm:text-2xl">Lana Sweet Perfect.</Link>
          <nav aria-label="Language" className="flex items-center gap-2">
            {(['ru','lv','en'] as const).map(lang => <Link key={lang} href={`/${lang}/cabinet/${slug}`} aria-current={locale === lang ? 'page' : undefined} className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${locale === lang ? 'bg-[#241e20] text-white' : 'bg-white/90 text-[#241e20]'}`}>{lang.toUpperCase()}</Link>)}
            <Link href={`/${locale}#cabinets`} className="ml-1 rounded-full border border-[#e7cbd5] px-3 py-2 text-xs font-semibold text-[#241e20] sm:text-sm">{t.home}</Link>
          </nav>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-40 pt-12 sm:px-8 md:pt-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#93516d]">{t.locations} · {slug === 'imanta' ? '01' : '02'}</p>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight !text-[#241e20] sm:text-7xl">{office.title}</h1>
        <p className="mt-4 max-w-3xl font-serif text-2xl italic text-[#8a5e72] sm:text-3xl">{office.subtitle}</p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-[#4f4148]">{office.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-4 text-sm font-semibold text-white">{t.booking} ↗</a>
          <a href="tel:+37126830682" className="rounded-full border border-[#e7cbd5] bg-white/90 px-6 py-4 text-sm font-semibold text-[#241e20]">+371 26830682</a>
        </div>
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
            {slug === 'imanta' ? (
              <iframe title={t.map} className="mt-6 h-72 w-full rounded-xl border border-[#f0dce4]" src="https://www.google.com/maps?q=Dammes%20iela%2046A%2C%20Riga%2C%20Latvia&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            ) : (
              <div className="mt-6 flex h-44 items-center justify-center rounded-xl border border-dashed border-[#e7cbd5] bg-[#fff8fb] px-6 text-center text-sm text-[#7b6770]">{office.address}</div>
            )}
          </section>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${locale}/cabinet/${slug === 'imanta' ? 'center' : 'imanta'}`} className="rounded-full border border-[#e7cbd5] bg-white/90 px-6 py-3 text-sm font-semibold text-[#241e20]">{slug === 'imanta' ? t.center.title : t.imanta.title} ↗</Link>
          <Link href={`/${locale}/gallery`} className="rounded-full border border-[#e7cbd5] bg-white/90 px-6 py-3 text-sm font-semibold text-[#241e20]">{locale === 'ru' ? 'Галерея' : locale === 'lv' ? 'Galerija' : 'Gallery'} ↗</Link>
        </div>
      </main>
      <nav aria-label="WhatsApp and Instagram" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-[#e7cbd5] bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:flex md:flex-col md:rounded-2xl md:border">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
        <a href="https://www.instagram.com/lanasweetperfect/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d9a3b7] bg-[#fceef4] px-6 py-3 text-center text-sm font-semibold text-[#241e20]">Instagram</a>
      </nav>
    </div>
  )
}
