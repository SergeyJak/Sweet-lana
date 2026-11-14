import { BUSINESS } from '@/lib/business'

// Current public content. The messages/ dictionaries are reserved for reusable sections.
export const HOME_COPY = {
  ru: {
    nav: ['Главная', 'О специалисте', 'Кабинеты', 'Галерея', 'Контакты'],
    eyebrow: 'Добро пожаловать',
    heading: BUSINESS.name,
    subtitle: 'Красота начинается с деталей.',
    intro: 'Два кабинета в Риге. Выберите удобное место и посмотрите услуги, которые проводятся именно там.',
    discover: 'Выбрать кабинет',
    about: 'О нас', aboutText: `${BUSINESS.name} — косметолог с 10-летним опытом и медицинским образованием. Рига, Иманта.`,
    services: 'Услуги', servicesText: '3D-чистка лица, ваксинг, шугаринг, IPL Lumecca, Morpheus8, Ultraformer MPT, биоревитализация и липолитики. Цены уточняйте при записи.',
    gallery: 'Галерея', galleryText: 'Фото результатов до и после скоро появятся здесь.', galleryLink: 'Открыть галерею', choose: 'Посмотреть услуги и адрес', cabinetsTitle: 'Два кабинета · Два направления', cabinetsIntro: 'Выберите кабинет, чтобы увидеть только его услуги, адрес и запись.', imantaTitle: 'Иманта', imantaDetail: 'Уход за кожей, подготовка к аппаратным процедурам, инъекции, пилинги и ваксинг', centerTitle: 'Центр', centerDetail: 'Аппаратная косметология', centerAddress: 'Адрес уточняется',
    contact: 'Контакты', contactText: `Два кабинета: Иманта и Центр. Телефон и WhatsApp: ${BUSINESS.phoneDisplay}. При записи укажите нужный кабинет.`,
    soon: 'Скоро', footer: 'Косметология · Рига',
    reviewsTitle: 'Отзывы клиентов в Google', reviewsLink: 'Читать отзывы в Google Maps', reviewsNote: 'Рейтинг кабинета в Иманте. Данные проверены 14.11.2026.', menu: 'Меню', booking: 'Написать в Instagram', mapNote: `${BUSINESS.streetAddress}, Рига, Иманта.`, mapTitle: 'Как нас найти', call: 'Позвонить',
  },
  lv: {
    nav: ['Sākums', 'Par speciālistu', 'Kabineti', 'Galerija', 'Kontakti'],
    eyebrow: 'Laipni lūdzam', heading: BUSINESS.name, subtitle: 'Skaistums sākas detaļās.',
    intro: 'Divi kabineti Rīgā. Izvēlieties vietu un apskatiet tieši tur pieejamos pakalpojumus.',
    discover: 'Izvēlēties kabinetu', about: 'Par mums', aboutText: `${BUSINESS.name} — kosmetoloģe ar 10 gadu pieredzi un medicīnisko izglītību. Rīga, Imanta.`,
    services: 'Pakalpojumi', servicesText: '3D sejas tīrīšana, vaksācija, šugarings, IPL Lumecca, Morpheus8, Ultraformer MPT, biorevitalizācija un lipolītiķi. Cenas precizējiet, piesakoties.',
    gallery: 'Galerija', galleryText: 'Rezultātu fotogrāfijas pirms un pēc drīzumā būs šeit.', galleryLink: 'Atvērt galeriju', choose: 'Pakalpojumi un adrese', cabinetsTitle: 'Divi kabineti · Divi virzieni', cabinetsIntro: 'Izvēlieties kabinetu, lai redzētu pakalpojumus, adresi un pierakstu.', imantaTitle: 'Imanta', imantaDetail: 'Ādas kopšana, sagatavošana aparātu procedūrām, injekcijas, pīlingi un vaksācija', centerTitle: 'Centrs', centerDetail: 'Aparātu kosmetoloģija', centerAddress: 'Adrese tiks precizēta',
    contact: 'Kontakti', contactText: `Divi kabineti: Imanta un Centrs. Tālrunis un WhatsApp: ${BUSINESS.phoneDisplay}. Pierakstoties norādiet kabinetu.`,
    soon: 'Drīzumā', footer: 'Kosmetoloģija · Rīga', reviewsTitle: 'Klientu atsauksmes Google', reviewsLink: 'Lasīt atsauksmes Google Maps', reviewsNote: 'Imantas kabineta vērtējums. Pārbaudīts 14.11.2026.', menu: 'Izvēlne', booking: 'Rakstīt Instagram', mapNote: `${BUSINESS.streetAddress}, Rīga, Imanta.`, mapTitle: 'Kā mūs atrast', call: 'Zvanīt',
  },
  en: {
    nav: ['Home', 'About', 'Locations', 'Gallery', 'Contact'],
    eyebrow: 'Welcome', heading: BUSINESS.name, subtitle: 'Beauty begins with the details.',
    intro: 'Two studios in Riga. Choose a location to see the treatments available there.',
    discover: 'Choose a location', about: 'About us', aboutText: `${BUSINESS.name} — cosmetologist with 10 years of experience and a medical education. Imanta, Riga.`,
    services: 'Services', servicesText: '3D facial cleansing, waxing, sugaring, IPL Lumecca, Morpheus8, Ultraformer MPT, biorevitalization and lipolytics. Ask for prices when booking.',
    gallery: 'Gallery', galleryText: 'Real before-and-after results will appear here soon.', galleryLink: 'View gallery', choose: 'View treatments and address', cabinetsTitle: 'Two studios · Two specialties', cabinetsIntro: 'Choose a studio to see only its treatments, address and booking details.', imantaTitle: 'Imanta', imantaDetail: 'Skincare, preparation for device treatments, injections, peels and waxing', centerTitle: 'City Centre', centerDetail: 'Device-based cosmetology', centerAddress: 'Address to be confirmed',
    contact: 'Contact', contactText: `Two studios: Imanta and City Centre. Phone and WhatsApp: ${BUSINESS.phoneDisplay}. Please specify your preferred location.`,
    soon: 'Coming soon', footer: 'Cosmetology · Riga', reviewsTitle: 'Google customer reviews', reviewsLink: 'Read reviews on Google Maps', reviewsNote: 'Rating for the Imanta studio. Verified on 14 Nov 2026.', menu: 'Menu', booking: 'Message on Instagram', mapNote: `${BUSINESS.streetAddress}, Riga, Imanta.`, mapTitle: 'Find us', call: 'Call',
  },
} as const

export const CABINET_COPY = {
  ru: {
    home: 'На главную', locations: 'Наши кабинеты', services: 'Услуги', booking: 'Записаться в этот кабинет',
    instagram: 'Instagram', call: 'Позвонить', address: 'Адрес', map: 'Карта', prices: 'Цены уточняйте при записи.',
    imanta: {
      title: 'Кабинет в Иманте', subtitle: 'Уходовые и эстетические процедуры',
      description: 'Подготовка к аппаратным процедурам, уход за кожей, инъекции красоты, пилинги и ваксинг.',
      services: ['Подготовка к аппаратным процедурам', 'Уходовые процедуры', 'Инъекции красоты', 'Пилинги', 'Ваксинг'],
      address: `${BUSINESS.streetAddress}, Рига, Иманта`,
      whatsapp: 'Здравствуйте! Хочу записаться на процедуру в кабинете Иманта.',
    },
    center: {
      title: 'Кабинет в Центре', subtitle: 'Аппаратная косметология',
      description: 'Кабинет для аппаратных косметологических процедур. Подробный перечень процедур уточняется.',
      services: ['Аппаратная косметология'],
      address: 'Рига, Центр. Точный адрес уточняется.',
      whatsapp: 'Здравствуйте! Хочу записаться на аппаратную процедуру в кабинете Центр.',
    },
  },
  lv: {
    home: 'Uz sākumu', locations: 'Mūsu kabineti', services: 'Pakalpojumi', booking: 'Pierakstīties šajā kabinetā',
    instagram: 'Instagram', call: 'Zvanīt', address: 'Adrese', map: 'Karte', prices: 'Cenas precizējiet, piesakoties.',
    imanta: {
      title: 'Kabinets Imantā', subtitle: 'Kopjošās un estētiskās procedūras',
      description: 'Sagatavošana aparatūras procedūrām, ādas kopšana, skaistuma injekcijas, pīlingi un vaksācija.',
      services: ['Sagatavošana aparatūras procedūrām', 'Kopjošās procedūras', 'Skaistuma injekcijas', 'Pīlingi', 'Vaksācija'],
      address: `${BUSINESS.streetAddress}, Rīga, Imanta`,
      whatsapp: 'Labdien! Vēlos pierakstīties procedūrai Imantas kabinetā.',
    },
    center: {
      title: 'Kabinets Centrā', subtitle: 'Aparātu kosmetoloģija',
      description: 'Kabinets aparatūras kosmetoloģijas procedūrām. Precīzs procedūru saraksts tiek precizēts.',
      services: ['Aparātu kosmetoloģija'],
      address: 'Rīga, Centrs. Precīza adrese vēl tiks precizēta.',
      whatsapp: 'Labdien! Vēlos pierakstīties aparatūras procedūrai Centra kabinetā.',
    },
  },
  en: {
    home: 'Back home', locations: 'Our locations', services: 'Treatments', booking: 'Book at this location',
    instagram: 'Instagram', call: 'Call', address: 'Address', map: 'Map', prices: 'Please ask for prices when booking.',
    imanta: {
      title: 'Imanta studio', subtitle: 'Skincare and aesthetic treatments',
      description: 'Preparation for device-based treatments, skincare, aesthetic injections, peels and waxing.',
      services: ['Preparation for device-based treatments', 'Skincare treatments', 'Aesthetic injections', 'Peels', 'Waxing'],
      address: `${BUSINESS.streetAddress}, Riga, Imanta`,
      whatsapp: 'Hello! I would like to book an appointment at the Imanta studio.',
    },
    center: {
      title: 'City Centre studio', subtitle: 'Device-based aesthetic treatments',
      description: 'A studio for device-based cosmetology. The detailed treatment list is being confirmed.',
      services: ['Device-based cosmetology'],
      address: 'Riga, City Centre. Exact address to be confirmed.',
      whatsapp: 'Hello! I would like to book a device-based treatment at the City Centre studio.',
    },
  },
} as const

export const GALLERY_COPY = {
  ru: { title: 'Галерея', caption: 'Результаты до и после', empty: 'Первые фотографии работ Ланы появятся здесь. Пока галерея пуста.', home: 'На главную', before: 'До', after: 'После' },
  lv: { title: 'Galerija', caption: 'Rezultāti pirms un pēc', empty: 'Lanas darbu fotogrāfijas drīzumā būs šeit. Pagaidām galerija ir tukša.', home: 'Uz sākumu', before: 'Pirms', after: 'Pēc' },
  en: { title: 'Gallery', caption: 'Before & after results', empty: "Lana's real work will appear here soon. The gallery is currently empty.", home: 'Back home', before: 'Before', after: 'After' },
} as const

export const GOOGLE_REVIEW_COPY = {
  ru: {
    title: 'Что говорят клиенты',
    description: 'Отзывы о кабинете в Иманте. Пока показываем доступные фрагменты без имён и дат авторов.',
    location: 'Иманта · Google Maps',
    source: 'Отзыв Google · фрагмент',
    all: 'Открыть карточку в Google Maps',
  },
  lv: {
    title: 'Ko saka klienti',
    description: 'Atsauksmes par Imantas kabinetu. Pagaidām redzami pieejamie fragmenti bez autoru vārdiem un datumiem.',
    location: 'Imanta · Google Maps',
    source: 'Google atsauksme · fragments',
    all: 'Atvērt Google Maps profilu',
  },
  en: {
    title: 'What clients say',
    description: 'Reviews of the Imanta studio. Available excerpts are shown without unverified author names or dates.',
    location: 'Imanta · Google Maps',
    source: 'Google review · excerpt',
    all: 'Open Google Maps listing',
  },
} as const

// Excerpts surfaced by the Google business listing. Do not invent names,
// review dates, or full review text. Preserve the original language.
export const GOOGLE_REVIEW_EXCERPTS = [
  { quote: 'ļoti laipna un zinoša kosmetoloģe', lang: 'LV' },
  { quote: 'Уже 7 лет доверяю Светлане', lang: 'RU' },
  { quote: 'Vienmēr pajautās, kā jūs jūtaties pēc procedūrām.', lang: 'LV' },
  { quote: 'Уютный кабинет', lang: 'RU' },
  { quote: 'Результат просто потрясающий', lang: 'RU' },
  { quote: 'Izskaidro ādas problēmas un kā tās risināt', lang: 'LV' },
  { quote: 'iesaka piemērotākās kopšanas procedūras', lang: 'LV' },
  { quote: 'Lieliska speciāliste ar personalizētu pieeju', lang: 'LV' },
  { quote: 'профессионально и аккуратно провел процедуру, все объяснил, ответил на мои вопросы', lang: 'RU' },
  { quote: 'Рядом бесплатная парковка', lang: 'RU' },
]

