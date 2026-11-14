import { expect, it, vi } from 'vitest'

// Synthetic fixtures: no previous business's client data.
vi.mock('@/content/testimonials.json', () => ({ default: [{
  id: 'example', featured: true,
  text: { lv: 'Piemērs', ru: 'Пример', en: 'Example' },
  topic: { lv: 'Tēma', ru: 'Тема', en: 'Topic' },
}] }))
vi.mock('@/content/testimonial-images.json', () => ({ default: {
  example: { src: '/example.webp', width: 600, height: 400 },
} }))
import { getTestimonials } from '@/lib/testimonials'

it.each([['lv', 'Piemērs', 'Tēma'], ['ru', 'Пример', 'Тема'], ['en', 'Example', 'Topic']] as const)(
  'maps the %s translation and associates the image by ID', (locale, text, topic) => {
    expect(getTestimonials(locale)).toEqual([{
      id: 'example', featured: true, text, topic,
      image: { src: '/example.webp', width: 600, height: 400 },
    }])
  }
)
