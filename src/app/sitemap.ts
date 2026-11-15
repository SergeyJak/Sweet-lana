import type { MetadataRoute } from 'next'
import { BUSINESS } from '@/lib/business'
import { LOCALES } from '@/lib/i18n'

const base = BUSINESS.siteUrl.replace(/\/$/, '')
const paths = ['', '/cabinet/imanta', '/cabinet/center'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap(path =>
    LOCALES.map(locale => ({
      url: `${base}/${locale}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path ? 0.8 : 1,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map(lang => [lang, `${base}/${lang}${path}`])),
          'x-default': `${base}/lv${path}`,
        },
      },
    }))
  )
}
