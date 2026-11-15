import type { MetadataRoute } from 'next'
import { BUSINESS } from '@/lib/business'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login', '/api/'],
    }],
    sitemap: `${BUSINESS.siteUrl.replace(/\/$/, '')}/sitemap.xml`,
    host: BUSINESS.siteUrl.replace(/\/$/, ''),
  }
}
