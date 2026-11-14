type Locale = 'ru' | 'lv' | 'en'

const copy = {
  ru: {
    title: 'Что говорят клиенты',
    description: 'Фрагменты реальных отзывов из Google о кабинете в Иманте. Публикуем без имён авторов, поскольку их не удалось проверить.',
    location: 'Иманта · Google Maps',
    source: 'Фрагмент отзыва',
    all: 'Карточка в Google Maps',
  },
  lv: {
    title: 'Ko saka klienti',
    description: 'Īsi fragmenti no Google atsauksmēm par Imantas kabinetu. Autoru vārdus nenorādām, jo tos nevarējām pārbaudīt.',
    location: 'Imanta · Google Maps',
    source: 'Atsauksmes fragments',
    all: 'Profils Google Maps',
  },
  en: {
    title: 'What clients say',
    description: 'Short excerpts from actual Google reviews for the Imanta studio. Names are omitted because attribution could not be verified.',
    location: 'Imanta · Google Maps',
    source: 'Review excerpt',
    all: 'Google Maps listing',
  },
} as const

// Excerpts surfaced by the Google business listing. Do not invent names,
// review dates, or full review text. Preserve the original language.
const excerpts = [
  { quote: 'ļoti laipna un zinoša kosmetoloģe', lang: 'LV' },
  { quote: 'Уже 7 лет доверяю Светлане', lang: 'RU' },
  { quote: 'Vienmēr pajautās, kā jūs jūtaties pēc procedūrām.', lang: 'LV' },
  { quote: 'Уютный кабинет', lang: 'RU' },
  { quote: 'Результат просто потрясающий', lang: 'RU' },
]

const placeUrl = 'https://www.google.com/maps/place/?q=place_id:ChIJS-9SPebF7kYR7-LRQgp4ifY'

export default function GoogleReviews({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <section id="reviews" aria-labelledby="google-reviews-heading" className="relative z-10 mx-auto max-w-7xl px-5 pb-12 md:px-10 md:pb-20">
      <div className="rounded-[2rem] border border-[#f0dce4] bg-white/95 p-6 shadow-sm backdrop-blur-sm sm:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#a05e78]">{t.location}</p>
            <h2 id="google-reviews-heading" className="font-serif text-4xl !text-[#241e20] sm:text-5xl">{t.title}</h2>
            <p className="mt-4 text-sm leading-6 text-[#594c53]">{t.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-[#fff4f8] px-5 py-3">
            <span className="text-3xl font-bold text-[#241e20]">5,0</span>
            <span className="text-[#ad6987]" aria-label="5 stars">★★★★★</span>
            <span className="text-xs text-[#61535a]">30 Google</span>
          </div>
        </div>
        <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {excerpts.map((item, index) => (
            <figure key={index} className="flex min-h-52 w-[min(82vw,320px)] shrink-0 snap-start flex-col justify-between rounded-2xl border border-[#efd9e3] bg-[#fff9fb] p-6 sm:w-auto">
              <div>
                <span aria-hidden="true" className="font-serif text-4xl leading-none text-[#b8849a]">“</span>
                <blockquote className="mt-2 text-lg font-medium leading-7 text-[#30262b]">{item.quote}</blockquote>
              </div>
              <figcaption className="mt-6 flex justify-between gap-3 text-xs text-[#7b5b69]">
                <span>{t.source} · {item.lang}</span>
                <span aria-label="5 stars" className="text-[#ad6987]">★★★★★</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <a href={placeUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-full border border-[#dfbdcd] px-5 py-3 text-sm font-medium text-[#33232b] hover:bg-[#fbeef3]">{t.all} ↗</a>
      </div>
    </section>
  )
}
