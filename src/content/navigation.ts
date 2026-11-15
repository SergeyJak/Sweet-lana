import type { Locale } from '@/lib/i18n'

export const NAVIGATION_COPY = {
  ru: {
    menu: 'Меню', navigation: 'Навигация по сайту', language: 'Язык сайта',
    home: 'Главная', about: 'О Светлане', locations: 'Кабинеты и результаты',
    imanta: 'Иманта', center: 'Клиника Liderm · Центр',
    treatments: 'Услуги и адрес', results: 'Результаты до и после',
    skincare: 'Косметика', reviews: 'Отзывы', contact: 'Контакты',
  },
  lv: {
    menu: 'Izvēlne', navigation: 'Vietnes navigācija', language: 'Vietnes valoda',
    home: 'Sākums', about: 'Par Svetlanu', locations: 'Kabineti un rezultāti',
    imanta: 'Imanta', center: 'Liderm klīnika · Centrs',
    treatments: 'Pakalpojumi un adrese', results: 'Rezultāti pirms un pēc',
    skincare: 'Kosmētika', reviews: 'Atsauksmes', contact: 'Kontakti',
  },
  en: {
    menu: 'Menu', navigation: 'Site navigation', language: 'Site language',
    home: 'Home', about: 'About Svetlana', locations: 'Locations & results',
    imanta: 'Imanta', center: 'Liderm Clinic · Centre',
    treatments: 'Treatments & address', results: 'Before & after results',
    skincare: 'Skincare', reviews: 'Reviews', contact: 'Contact',
  },
} satisfies Record<Locale, Record<string, string>>
