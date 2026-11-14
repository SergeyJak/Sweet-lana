import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Sweet-lana',
  description: 'Sweet-lana. A new website is taking shape.',
  robots: { index: false, follow: false },
}
export default async function LocaleLayout({ children, params }: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  return <main>{children}</main>
}
