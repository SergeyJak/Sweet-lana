'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import { usePathname } from 'next/navigation'
import { languageSwitchHref } from '@/lib/locale-route'
import { BUSINESS } from '@/lib/business'
import type { Locale } from '@/lib/i18n'
import { NAVIGATION_COPY } from '@/content/navigation'

type Props = {
  locale: Locale
  path?: string
}

export default function SiteHeader({ locale, path = '' }: Props) {
  const c = NAVIGATION_COPY[locale]
  const mobile = useRef<HTMLDetailsElement>(null)
  const desktop = useRef<HTMLDetailsElement>(null)
  const [hash, setHash] = useState('')
  const [search, setSearch] = useState('')
  const pathname = usePathname()
  const home = `/${locale}`
  const locations = [
    { slug: 'imanta', name: c.imanta },
    { slug: 'center', name: c.center },
  ] as const
  const sections = [
    { id: 'about', label: c.about },
    { id: 'skincare', label: c.skincare },
    { id: 'reviews', label: c.reviews },
    { id: 'contact', label: c.contact },
  ]

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash)
      setSearch(window.location.search)
    }
    const closeOutside = (event: PointerEvent) => {
      for (const ref of [mobile, desktop]) {
        if (ref.current?.open && !ref.current.contains(event.target as Node)) {
          ref.current.open = false
        }
      }
    }
    updateHash()
    window.addEventListener('hashchange', updateHash)
    document.addEventListener('pointerdown', closeOutside)
    return () => {
      window.removeEventListener('hashchange', updateHash)
      document.removeEventListener('pointerdown', closeOutside)
    }
  }, [])

  const closeAfterNavigation = (event: MouseEvent<HTMLDetailsElement>) => {
    if ((event.target as HTMLElement).closest('a')) event.currentTarget.open = false
  }
  const closeOnEscape = (event: KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key !== 'Escape' || !event.currentTarget.open) return
    event.preventDefault()
    event.currentTarget.open = false
    event.currentTarget.querySelector('summary')?.focus()
  }
  const languageLinks = (mobileLayout: boolean) => (
    <nav aria-label={c.language} className={`flex items-center gap-2 ${mobileLayout ? '' : 'hidden xl:flex'}`}>
      {(['ru', 'lv', 'en'] as const).map(lang => (
        <a key={lang} href={languageSwitchHref(pathname || `/${locale}${path}`, lang, search, hash)} lang={lang} hrefLang={lang}
          aria-current={lang === locale ? 'page' : undefined}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${lang === locale ? 'bg-[#241e20] text-white' : 'text-[#635657] hover:bg-[#fbeef3]'}`}>
          {lang.toUpperCase()}
        </a>
      ))}
    </nav>
  )
  const locationLinks = () => (
    <div className="grid gap-3">
      {locations.map(location => (
        <div key={location.slug} className="min-w-0 rounded-xl border border-[#efdee5] bg-[#fff8fb] p-3">
          <p className="px-2 pb-1 text-sm font-semibold text-[#8b596d]">{location.name}</p>
          <a href={`${home}/cabinet/${location.slug}`} className="flex min-h-12 items-center rounded-lg px-2 py-2 text-sm text-[#40353b] hover:bg-white">
            {c.treatments}
          </a>
          <a href={`${home}/cabinet/${location.slug}#gallery`}
            aria-label={`${location.name}: ${c.results}`}
            className="flex min-h-12 items-center rounded-lg px-2 py-2 text-sm font-semibold text-[#40353b] hover:bg-white">
            {c.results} <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </div>
      ))}
    </div>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[#f0dce4] bg-white/95 backdrop-blur-md">
      <div className="relative mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 xl:px-10">
        <a href={home} className="flex min-w-0 items-center whitespace-nowrap font-serif text-[clamp(1.3rem,5vw,1.8rem)] font-semibold tracking-tight text-[#241e20]">
          {BUSINESS.name}<span className="text-[#d9a3b7]">.</span>
        </a>
        <nav aria-label={c.navigation} className="hidden items-center gap-5 text-xs font-semibold text-[#635657] xl:flex">
          <a href={`${home}#about`} className="py-4 hover:text-[#8b596d]">{c.about}</a>
          <details ref={desktop} onClick={closeAfterNavigation} onKeyDown={closeOnEscape} className="group relative">
            <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
              {c.locations}<span aria-hidden="true" className="group-open:rotate-180">⌄</span>
            </summary>
            <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 rounded-2xl border border-[#efdee5] bg-white p-3 shadow-xl">
              {locationLinks()}
            </div>
          </details>
          {sections.slice(1).map(section => (
            <a key={section.id} href={`${home}#${section.id}`} className="py-4 hover:text-[#8b596d]">{section.label}</a>
          ))}
        </nav>
        {languageLinks(false)}
        <details ref={mobile} onClick={closeAfterNavigation} onKeyDown={closeOnEscape} className="group shrink-0 xl:hidden">
          <summary aria-label={c.menu} className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full border border-[#e7cbd5] text-xl text-[#241e20] [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="group-open:hidden">☰</span>
            <span aria-hidden="true" className="hidden group-open:inline">×</span>
          </summary>
          <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-10rem-env(safe-area-inset-bottom))] md:max-h-[calc(100dvh-15rem-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain border-b border-[#efdee5] bg-white px-4 pb-5 pt-3 shadow-xl sm:left-auto sm:right-6 sm:w-96 sm:rounded-b-2xl">
            <div className="mb-3 flex items-center justify-between gap-3 border-b border-[#efdee5] pb-3">
              <span className="text-xs font-semibold text-[#8b596d]">{c.language}</span>
              {languageLinks(true)}
            </div>
            <nav aria-label={c.navigation} className="grid gap-1">
              <a href={home} className="flex min-h-12 items-center rounded-lg px-3 text-sm font-medium text-[#40353b] hover:bg-[#fbeef3]">{c.home}</a>
              <a href={`${home}#about`} className="flex min-h-12 items-center rounded-lg px-3 text-sm font-medium text-[#40353b] hover:bg-[#fbeef3]">{c.about}</a>
              <div className="my-2">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[#8b596d]">{c.locations}</p>
                {locationLinks()}
              </div>
              {sections.slice(1).map(section => (
                <a key={section.id} href={`${home}#${section.id}`} className="flex min-h-12 items-center rounded-lg px-3 text-sm font-medium text-[#40353b] hover:bg-[#fbeef3]">{section.label}</a>
              ))}
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}
