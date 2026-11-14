import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { isValidLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Lana Sweet Perfect | Косметология, Рига, Иманта',
  description: 'Lana Sweet Perfect — cosmetology in Riga, Imanta. 10 years of experience. Phone +371 26830682, Instagram @lanasweetperfect.',
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
