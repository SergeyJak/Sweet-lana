import type { Locale } from '@/lib/i18n'

/**
 * Change only the URL's leading locale segment.
 * Keep the page, nested slug, query parameters and section anchor intact.
 */
export function languageSwitchHref(
  pathname: string,
  target: Locale,
  search = '',
  hash = ''
): string {
  const suffix = pathname.replace(/^\/(?:ru|lv|en)(?=\/|$)/, '')
  const route = suffix === '' || suffix === '/' ? '' : suffix.startsWith('/') ? suffix : `/${suffix}`
  return `/${target}${route}${search}${hash}`
}
