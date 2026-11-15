import { afterEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_SITE_URL } from '@/lib/business'
import { getHreflangAlternates } from '@/lib/i18n'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { metadata } from '@/app/[locale]/layout'

afterEach(() => vi.unstubAllEnvs())

describe('organic search visibility', () => {
  it('uses the canonical public domain by default', () => {
    expect(DEFAULT_SITE_URL).toBe('https://lanasweet.heysmart.lv')
  })
  it('generates localized alternatives with an explicit base URL', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://example.com/')
    expect(getHreflangAlternates('/gallery')).toEqual({
      lv: 'https://example.com/lv/gallery', ru: 'https://example.com/ru/gallery',
      en: 'https://example.com/en/gallery', 'x-default': 'https://example.com/lv/gallery',
    })
  })
  it('allows public crawling while blocking administrative paths', () => {
    const config = robots()
    expect(config.rules).toEqual([{
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/api/'],
    }])
    expect(config.sitemap).toBe('https://lanasweet.heysmart.lv/sitemap.xml')
    expect(metadata.robots).toEqual({ index: true, follow: true })
  })
  it('includes home and both studios in all languages, without unfinished gallery URLs', () => {
    const urls = sitemap().map(item => item.url)
    expect(urls).toHaveLength(9)
    for (const locale of ['lv', 'ru', 'en']) {
      expect(urls).toContain(`https://lanasweet.heysmart.lv/${locale}`)
      expect(urls).toContain(`https://lanasweet.heysmart.lv/${locale}/cabinet/imanta`)
      expect(urls).toContain(`https://lanasweet.heysmart.lv/${locale}/cabinet/center`)
    }
    expect(urls.join(' ')).not.toContain('/gallery')
    expect(sitemap()[0]?.alternates?.languages?.['x-default']).toBe('https://lanasweet.heysmart.lv/lv')
  })
})
