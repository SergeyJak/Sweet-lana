import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import DevicePhoto from '@/components/DevicePhoto'
import { BUSINESS, buildWhatsAppUrl } from '@/lib/business'
import { CABINET_COPY } from '@/content/site'
import { DEVICE_UI, DEVICES, MORPHEUS_BURST_DEEP, getDevice, isDeviceSlug } from '@/content/devices'
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
    <div className="relative min-h-screen bg-[#f5f0e9] text-[#3d302b]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-[100lvh] w-full sveta-center-wallpaper" />
      <SiteHeader locale={locale} path={`/cabinet/center/device/${slug}`} />
      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-40 pt-10 sm:px-8 md:pt-16">
        <Link href={`/${locale}/cabinet/center#services`} className="inline-flex min-h-12 items-center text-sm font-semibold text-[#955b49] hover:underline">← {ui.back}</Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <figure className="w-full overflow-hidden rounded-[2rem] border border-[#d9c6b4] bg-[#fffaf3] shadow-[0_12px_40px_rgba(91,61,45,0.09)]">
            <DevicePhoto
              slug={device.slug}
              name={slug === 'morpheus8' ? MORPHEUS_BURST_DEEP[locale].productAlt : device.name}
              src={slug === 'morpheus8' ? '/devices/morpheus8-svetlana-product.webp' : undefined}
            />
          </figure>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#a06a53]">Liderm Clinic · {device.tech[locale]}</p>
            <h1 className="font-serif text-[clamp(2.6rem,7vw,4.4rem)] leading-tight !text-[#241e20]">{device.name}</h1>
            <p className="mt-5 text-base leading-8 text-[#594a41]">{info.summary}</p>
            {slug === 'morpheus8' && (
              <figure className="mt-6 overflow-hidden rounded-[1.6rem] border border-[#d9c6b4] bg-[#fffaf3] p-3 shadow-[0_10px_28px_rgba(91,61,45,0.06)]">
                <img src="/devices/morpheus8-svetlana-treatment.webp" alt={MORPHEUS_BURST_DEEP[locale].treatmentAlt} width={590} height={668} loading="lazy" decoding="async" className="mx-auto max-h-[300px] w-full rounded-xl object-contain" />
              </figure>
            )}
            <section className="mt-7 rounded-[1.6rem] border border-[#d9c6b4] bg-[#fffaf3]/95 p-6 shadow-[0_10px_28px_rgba(91,61,45,0.06)]">
              <h2 className="font-serif text-2xl !text-[#241e20] sm:text-3xl">{ui.concerns}</h2>
              <ul className="mt-5 space-y-3">
                {info.benefits.map(point => (
                  <li key={point} className="flex items-start gap-3 text-base leading-6 text-[#594a41]"><span aria-hidden="true" className="text-[#b37a65]">✦</span><span>{point}</span></li>
                ))}
              </ul>
            </section>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <section className="rounded-[1.4rem] border border-[#e3d4c5] bg-[#fff8f0]/95 p-5">
                <h2 className="font-serif text-2xl !text-[#241e20]">{ui.how}</h2>
                <p className="mt-3 text-sm leading-7 text-[#594a41]">{info.how}</p>
              </section>
              <section className="rounded-[1.4rem] border border-[#e3d4c5] bg-[#fff8f0]/95 p-5">
                <h2 className="font-serif text-2xl !text-[#241e20]">{ui.suitable}</h2>
                <p className="mt-3 text-sm leading-7 text-[#594a41]">{info.suitable}</p>
              </section>
            </div>
            {slug === 'morpheus8' && (
              <section className="mt-7 rounded-[1.6rem] border border-[#d9c6b4] bg-[#fffaf3]/95 p-6 shadow-[0_10px_28px_rgba(91,61,45,0.06)]">
                <h2 className="font-serif text-2xl !text-[#3d302b] sm:text-3xl">{MORPHEUS_BURST_DEEP[locale].title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#594a41]">{MORPHEUS_BURST_DEEP[locale].description}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(['needles','depth','profile','modes'] as const).map(key => (
                    <li key={key} className="rounded-xl border border-[#e3d4c5] bg-white/75 px-4 py-3 text-sm font-semibold text-[#674c3f]">{MORPHEUS_BURST_DEEP[locale][key]}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-6 text-[#826e60]">{MORPHEUS_BURST_DEEP[locale].note}</p>
              </section>
            )}
            <p className="mt-6 text-sm leading-6 text-[#826e60]">{ui.disclaimer}</p>
          </div>
        </div>
        <section className="mt-12">
          <h2 className="font-serif text-3xl !text-[#241e20]">{ui.listTitle}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {DEVICES.filter(item => item.slug !== slug).map(item => <Link key={item.slug} href={`/${locale}/cabinet/center/device/${item.slug}`} className="rounded-full border border-[#d9c4b1] bg-[#fffaf3]/95 px-5 py-3 text-sm font-semibold text-[#795344] hover:bg-[#f1e3d5]">{item.name} ↗</Link>)}
          </div>
        </section>
      </main>
      <nav aria-label="WhatsApp and Instagram" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-[#dac9b8] bg-[#fffaf4]/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur md:inset-x-auto md:bottom-6 md:right-6 md:flex md:flex-col md:rounded-2xl md:border">
        <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#241e20] px-6 py-3 text-center text-sm font-semibold text-white">WhatsApp</a>
        <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#c9a994] bg-[#f1dfd1] px-6 py-3 text-center text-sm font-semibold text-[#553b30]">Instagram</a>
      </nav>
    </div>
  )
}
