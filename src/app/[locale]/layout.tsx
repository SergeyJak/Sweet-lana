import { BUSINESS } from '@/lib/business'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: `${BUSINESS.name} | Косметология, Рига, Иманта`,
  description: `${BUSINESS.name} — cosmetology in Riga, Imanta. 10 years of experience. Phone ${BUSINESS.phoneDisplay}.`,
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
