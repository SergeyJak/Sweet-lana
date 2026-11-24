import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, expect, it, vi } from 'vitest'
import { BUSINESS } from '@/lib/business'
import Home from '@/app/[locale]/page'
import CabinetPage from '@/app/[locale]/cabinet/[slug]/page'
import Gallery from '@/app/[locale]/gallery/page'

vi.mock('@/lib/business', async (original) => {
  const actual = await original<typeof import('@/lib/business')>()
  return {
    ...actual,
    BUSINESS: { ...actual.BUSINESS, phoneE164: '+37120000000', phoneDisplay: '+371 20000000', instagram: 'https://instagram.com/test-studio/' },
  }
})
const storage = vi.hoisted(() => ({ gallery: vi.fn(async () => []), categories: vi.fn(async () => []) }))
vi.mock('@/lib/gallery', () => ({ getGallery: storage.gallery }))
vi.mock('@/lib/gallery-categories', () => ({ getGalleryCategories: storage.categories }))

afterEach(() => vi.unstubAllEnvs())

it.each(['lv', 'ru', 'en'] as const)('renders %s home using shared contacts and localized destinations', async (locale) => {
  const html = renderToStaticMarkup(await Home({ params: Promise.resolve({ locale }) }))
  expect(html).toContain('Lana Sweet Perfect')
  expect(html).toContain(`href="tel:${BUSINESS.phoneE164}"`)
  expect(html).toContain(`href="${BUSINESS.instagram}"`)
  expect(html).toContain(`href="/${locale}/cabinet/imanta"`)
  expect(html).toContain(`href="/${locale}/cabinet/center"`)
  expect(html).toContain(`href="/${locale}/cabinet/imanta#gallery"`)
  expect(html).toContain(`href="/${locale}/cabinet/center#gallery"`)
})

it.each(['imanta', 'center'] as const)('renders %s cabinet with shared contacts and location-specific booking text', async (slug) => {
  const html = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale: 'en', slug }) }))
  expect(html).toContain(`href="tel:${BUSINESS.phoneE164}"`)
  expect(html).toContain(`href="${BUSINESS.instagram}"`)
  expect(html).toContain(slug === 'imanta' ? 'Imanta%20studio' : 'City%20Centre%20studio')
})

it.each(['lv', 'ru', 'en'] as const)('shows a readable Sweet Perfect room photo inside the first card for %s', async (locale) => {
  const home = renderToStaticMarkup(await Home({ params: Promise.resolve({ locale }) }))
  expect(home).toContain('sweet-perfect-room.webp')
  expect(home).toContain('blur-[2px]')
  expect(home).toContain('sweet-perfect-logo.webp')
  expect(home).toContain('rgba(255,250,253,0.68)')
})

it.each(['lv', 'ru', 'en'] as const)('shows the Sweet Perfect studio photo as an unblurred hero on the Imanta location page in %s', async (locale) => {
  const html = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale, slug: 'imanta' }) }))
  expect(html).toContain('sweet-perfect-vanity-gray-pink.webp')
  expect(html).toContain('max-w-[250px] sm:max-w-[320px] lg:max-w-[370px]')
  expect(html).toContain('rounded-[2rem]')
  expect(html).not.toContain('liderm-clinic-reception.webp')
  expect(html).not.toContain('blur-[2px]')
})

it('uses the real Liderm reception photo inside the home card and as a clear clinic portrait', async () => {
  const home = renderToStaticMarkup(await Home({ params: Promise.resolve({ locale: 'en' }) }))
  expect(home).toContain('liderm-clinic-reception.webp')
  expect(home).toContain('liderm-logo.webp')
  expect(home).not.toContain('Liderm Clinic')
  expect(home).toContain('blur-[2px]')

  const center = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale: 'en', slug: 'center' }) }))
  expect(center).toContain('liderm-clinic-reception.webp')
  expect(center).toContain('Reception area at Liderm')
  expect(center).not.toContain('Liderm Clinic')
  expect(center).toContain('max-w-[250px] sm:max-w-[320px] lg:max-w-[370px]')

  const imanta = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale: 'en', slug: 'imanta' }) }))
  expect(imanta).not.toContain('liderm-clinic-reception.webp')
})

it('does not contact storage when the public gallery is disabled even with a database URI', async () => {
  vi.stubEnv('ENABLE_PUBLIC_GALLERY', '')
  vi.stubEnv('MONGODB_URI', 'mongodb://unused.invalid')
  vi.stubEnv('MONGODB_DB', 'sweet_lana_prod')
  const html = renderToStaticMarkup(await Gallery({ params: Promise.resolve({ locale: 'en' }) }))
  expect(html).toContain('gallery is currently empty')
  expect(storage.gallery).not.toHaveBeenCalled()
  expect(storage.categories).not.toHaveBeenCalled()
})

it('enables database gallery independently of admin and supports an independent custom database name', async () => {
  vi.stubEnv('ENABLE_PUBLIC_GALLERY', 'true')
  vi.stubEnv('ENABLE_ADMIN', '')
  vi.stubEnv('MONGODB_URI', 'mongodb://unused.invalid')
  vi.stubEnv('MONGODB_DB', 'sweet_lana_staging')
  await Gallery({ params: Promise.resolve({ locale: 'en' }) })
  expect(storage.gallery).toHaveBeenCalledOnce()
  expect(storage.categories).toHaveBeenCalledOnce()
})

it.each(['lv', 'ru', 'en'] as const)('points the Imanta map to the Sweet Perfect business rather than just the street address in %s', async (locale) => {
  const html = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale, slug: 'imanta' }) }))
  const mapUrl = new URL(BUSINESS.googleMapsEmbed)
  expect(mapUrl.searchParams.get('q')).toBe('Sweet Perfect - Kosmetologs | Vaksācija, Dammes iela 46A, Rīga, Latvia')
  expect(html).toContain('Sweet%20Perfect%20-%20Kosmetologs%20%7C%20Vaks%C4%81cija')
  expect(html).toContain('query_place_id=ChIJS-9SPebF7kYR7-LRQgp4ifY')
  expect(BUSINESS.googleMapsDirections).toBe(BUSINESS.googleReviewsUrl)
})

it.each(['lv', 'ru', 'en'] as const)('shows the confirmed Hanzas 18 address and map for the centre in %s', async (locale) => {
  const html = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale, slug: 'center' }) }))
  expect(html).toContain('Hanzas iela 18')
  expect(html).toContain('Hanzas%20iela%2018')
  expect(html).not.toMatch(/address to be confirmed|adrese vēl tiks precizēta|адрес уточняется/i)
  const home = renderToStaticMarkup(await Home({ params: Promise.resolve({ locale }) }))
  expect(home).toContain('Hanzas iela 18')
})

it('prebuilds every localized public landing page without freezing the dynamic gallery', async () => {
  const home = await import('@/app/[locale]/page')
  const cabinet = await import('@/app/[locale]/cabinet/[slug]/page')
  const certificates = await import('@/app/[locale]/certificates/page')
  const gallery = await import('@/app/[locale]/gallery/page')
  const locales = ['lv', 'ru', 'en']
  expect(home.generateStaticParams()).toEqual(locales.map(locale => ({ locale })))
  expect(certificates.generateStaticParams()).toEqual(locales.map(locale => ({ locale })))
  expect(cabinet.generateStaticParams()).toEqual(locales.flatMap(locale => ['imanta', 'center'].map(slug => ({ locale, slug }))))
  expect(gallery.dynamic).toBe('force-dynamic')
})

it('serves prebuilt local image assets instead of invoking the runtime optimizer on landing pages', async () => {
  const home = renderToStaticMarkup(await Home({ params: Promise.resolve({ locale: 'en' }) }))
  const center = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale: 'en', slug: 'center' }) }))
  expect(home).toContain('/optimized/svetlana-portrait.webp')
  expect(home).toContain('/optimized/certificates-cover.webp')
  expect(home).toContain('/optimized/liderm-clinic-reception.webp')
  expect(center).toContain('/optimized/liderm-clinic-reception.webp')
  expect(home).not.toContain('/_next/image?')
  expect(center).not.toContain('/_next/image?')
})
