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

it('uses the real Liderm reception photo inside the home card and as a clear clinic portrait', async () => {
  const home = renderToStaticMarkup(await Home({ params: Promise.resolve({ locale: 'en' }) }))
  expect(home).toContain('liderm-clinic-reception.jpg')
  expect(home).toContain('blur-[2px]')

  const center = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale: 'en', slug: 'center' }) }))
  expect(center).toContain('liderm-clinic-reception.jpg')
  expect(center).toContain('Reception area at Liderm Clinic')
  expect(center).toContain('max-w-[250px] sm:max-w-[320px] lg:max-w-[370px]')

  const imanta = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale: 'en', slug: 'imanta' }) }))
  expect(imanta).not.toContain('liderm-clinic-reception.jpg')
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

it.each(['lv', 'ru', 'en'] as const)('shows the confirmed Hanzas 18 address and map for the centre in %s', async (locale) => {
  const html = renderToStaticMarkup(await CabinetPage({ params: Promise.resolve({ locale, slug: 'center' }) }))
  expect(html).toContain('Hanzas iela 18')
  expect(html).toContain('Hanzas%20iela%2018')
  expect(html).not.toMatch(/address to be confirmed|adrese vēl tiks precizēta|адрес уточняется/i)
  const home = renderToStaticMarkup(await Home({ params: Promise.resolve({ locale }) }))
  expect(home).toContain('Hanzas iela 18')
})
