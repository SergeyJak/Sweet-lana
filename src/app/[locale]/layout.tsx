import { BUSINESS } from '@/lib/business'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'

// Public page metadata is defined by each page to avoid duplicated titles and URLs.
export const metadata: Metadata = {
  title: BUSINESS.name,
  robots: { index: true, follow: true },
}

export default async function LocaleLayout({ children, params }: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  return <main>{children}</main>
}
