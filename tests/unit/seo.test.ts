import { afterEach, describe, expect, it, vi } from 'vitest'
import { DEFAULT_SITE_URL } from '@/lib/business'
import { getHreflangAlternates } from '@/lib/i18n'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { metadata } from '@/app/[locale]/layout'

afterEach(() => vi.unstubAllEnvs())

describe('pre-launch search policy', () => {
  it('uses a local fallback until a new public domain is configured', () => {
    expect(DEFAULT_SITE_URL).toBe('http://localhost:3000')
  })
  it('can build localized alternatives using the new configured domain', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://example.com/')
    expect(getHreflangAlternates('/gallery')).toEqual({
      lv: 'https://example.com/lv/gallery', ru: 'https://example.com/ru/gallery',
      en: 'https://example.com/en/gallery', 'x-default': 'https://example.com/lv/gallery',
    })
  })
  it('keeps all pages out of search while content is being prepared', () => {
    expect(robots().rules).toEqual({ userAgent: '*', disallow: '/' })
    expect(sitemap()).toEqual([])
    expect(metadata.robots).toEqual({ index: false, follow: false })
  })
})
