import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import DevicePhoto from '@/components/DevicePhoto'
import { BUSINESS, buildWhatsAppUrl } from '@/lib/business'
import { CABINET_COPY } from '@/content/site'
import { DEVICE_UI, DEVICES, getDevice, isDeviceSlug } from '@/content/devices'
import { getHreflangAlternates, getOpenGraphLocale, isValidLocale, type Locale } from '@/lib/i18n'

type Params = { locale: string; device: string }
export function generateStaticParams() {
  return (['lv','ru','en'] as const).flatMap(locale => DEVICES.map(({slug}) => ({locale, device:slug})))
}
export async function generateMetadata({params}: {params:Promise<Params>}): Promise<Metadata> {
  const {locale, device} = await params
  if(!isValidLocale(locale) || !isDeviceSlug(device)) return {robots:{index:false,follow:false}}
  const data = getDevice(device)
  const title = `${data.name} | ${CABINET_COPY[locale].center.title} | Svetlana Petrova`
  const description = data.text[locale].summary
  const path = `/cabinet/center/device/${device}`
  return {
    title, description,
    alternates: {canonical:`/${locale}${path}`, languages:getHreflangAlternates(path)},
    openGraph: {title,description,locale:getOpenGraphLocale(locale),url:`/${locale}${path}`,siteName:BUSINESS.name,type:'website'},
    robots:{index:true,follow:true}
  }
}

export default async function DeviceDetailPage({params}: {params:Promise<Params>}) {
  const {locale: requested,device:slug}= await params
  if (!isValidLocale(requested) || !isDeviceSlug(slug)) notFound()
  const locale: Locale=requested
  const device=getDevice(slug)
  const info=device.text[locale]
  const ui=DEVICE_UI[locale]
  const message=locale==='lv'
     ? `Labdien! Vēlos konsultāciju par ${device.name} procedūru Liderm Clinic (Hanzas iela 18).`
     : locale==='ru'
     ? `Здравствуйте! Хочу проконсультироваться по процедуре ${device.name} в Liderm Clinic (Hanzas iela 18).`
     : `Hello! I would like to ask about the ${device.name} treatment at Liderm Clinic (Hanzas iela 18).`

  return (
    <div className="relative min-h-screen bg-white text-[#241e20]">
      <div aria-hidden="true" className="pointer-events-none fixed -inset-2 z-0 bg-[url('/background.jpeg')] bg-cover bg-center opacity-20 blur-[3px]" />
      <SiteHeader locale={locale} path={`/cabinet/center/device/${slug}`} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-40 pt-10 sm:px-8 md:pt-16">
        <Link href={`/${locale}/cabinet/center#services`} className="inline-flex min-h-12 items-center text-sm font-semibold text-[#87566c] hover:underline">← {ui.back}</Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <figure className="overflow-hidden rounded-[2rem] border border-[#ead9df] bg-white shadow-[0_12px_40px_rgba(60,39,49,0.08)]">
            <DevicePhoto slug={device.slug} name={device.name} />
          </figure>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b627b]">Liderm Clinic · {device.tech[locale]}</p>
            <h1 className="font-serif text-[clamp(2.6rem,7vw,4.4rem)] leading-tight !text-[#241e20]">{device.name}</h1>
            <p className="mt-5 text-base leading-8 text-[#4f4148]">{info.summary}</p>
            <section className="mt-7 rounded-[1.6rem] border border-[#f0dce4] bg-white/90 p-6">
              <h2 className="font-serif text-2xl !text-[#241e20] sm:text-3xl">{ui.concerns}</h2>
              <ul className="mt-5 space-y-3">
                {info.benefits.map(point => (
                  <li key={point} className="flex items-start gap-3 text-base leading-6 text-[#4c3e45]"><span aria-hidden="true" className="text-[#ba8198]">✦</span><span>{point}</span></li>
                ))}
              </ul>
            </section>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[1.4rem] bg-[#fff8fa]/95 p-5">
                <h2 className="font-serif text-2xl !text-[#241e20]">{ui.how}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4f4148]">{info.how}</p>
              </section>
              <section className="rounded-[1.4rem] bg-[#fff8fa]/95 p-5">
                <h2 className="font-serif text-2xl !text-[#241e20]">{ui.suitable}</h2>
                <p className="mt-3 text-sm leading-7 text-[#4f4148]">{info.suitable}</p>
              </section>
            </div>
            <p className="mt-6 text-sm leading-6 text-[#77636e]">{ui.disclaimer}</p>
            <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-14 items-center justify-center rounded-full bg-[#241e20] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#7e5267]">{ui.book} ↗</a>
          </div>
        </div>
        <section className="mt-12">
          <h2 className="font-serif text-3xl !text-[#241e20]">{ui.listTitle}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {DEVICES.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/${locale}/cabinet/center/device/${item.slug}`} className="rounded-full border border-[#e7cbd5] bg-white/90 px-5 py-3 text-sm font-semibold text-[#573f4b] hover:bg-[#fcecf3]">{item.name} ↗</Link>)}
          </div>
        </section>
      </main>
      <nav aria-label="WhatsApp and Instagram" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-[#e7cbd5] bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:flex md:flex-col md:rounded-2xl md:border">
        <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
        <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#d9a3b7] bg-[#fceef4] px-6 py-3 text-center text-sm font-semibold text-[#241e20]">Instagram</a>
      </nav>
    </div>
  )
}
