import { expect, it } from 'vitest'
import records from '@/content/testimonials.json'
import images from '@/content/testimonial-images.json'
import { getTestimonials } from '@/lib/testimonials'

it('ships no private quotations or screenshots inherited from the old business', () => {
  expect(records).toEqual([])
  expect(Object.keys(images)).toEqual([])
  for (const locale of ['lv', 'ru', 'en'] as const) expect(getTestimonials(locale)).toEqual([])
})
