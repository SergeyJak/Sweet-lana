import { describe, expect, it } from 'vitest'
import { languageSwitchHref } from '@/lib/locale-route'

describe('language switcher', () => {
  it('keeps the selected apparatus when changing languages', () => {
    expect(languageSwitchHref('/ru/cabinet/center/device/sylfirm-x', 'lv'))
      .toBe('/lv/cabinet/center/device/sylfirm-x')
    expect(languageSwitchHref('/lv/cabinet/center/device/ultraformer-mpt', 'en'))
      .toBe('/en/cabinet/center/device/ultraformer-mpt')
  })

  it('keeps the selected cabinet and anchored section', () => {
    expect(languageSwitchHref('/ru/cabinet/center', 'lv', '', '#services'))
      .toBe('/lv/cabinet/center#services')
    expect(languageSwitchHref('/en/cabinet/imanta', 'ru', '', '#gallery'))
      .toBe('/ru/cabinet/imanta#gallery')
  })

  it('keeps other pages, search parameters and fragments', () => {
    expect(languageSwitchHref('/en/certificates', 'lv', '?view=all', '#diplomas'))
      .toBe('/lv/certificates?view=all#diplomas')
    expect(languageSwitchHref('/lv/gallery', 'ru'))
      .toBe('/ru/gallery')
  })

  it('changes the homepage language without duplicating a locale', () => {
    expect(languageSwitchHref('/ru', 'en')).toBe('/en')
    expect(languageSwitchHref('/lv/', 'ru', '', '#about')).toBe('/ru#about')
  })
})
