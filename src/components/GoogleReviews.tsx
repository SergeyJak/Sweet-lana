type Locale = 'ru' | 'lv' | 'en'

const copy = {
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
const excerpts = [
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

const placeUrl = 'https://www.google.com/maps/search/?api=1&query=Sweet%20Perfect%20Kosmetologs%20Vaksacija&query_place_id=ChIJS-9SPebF7kYR7-LRQgp4ifY'

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
        <div className="mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {excerpts.map((item, index) => (
            <figure key={index} className="flex min-h-44 w-[min(82vw,310px)] shrink-0 snap-start flex-col rounded-2xl border border-[#e9e3e5] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:w-auto">
              <div className="flex items-center gap-3">
                <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f0f2] text-lg font-bold text-[#4285f4]">G</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#30262b]">Google Maps</p>
                  <p className="text-xs text-[#786f73]">{t.source} · {item.lang}</p>
                </div>
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-7 text-[#30262b]">{item.quote}</blockquote>
            </figure>
          ))}
        </div>
        <a href={placeUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-full border border-[#dfbdcd] px-5 py-3 text-sm font-medium text-[#33232b] hover:bg-[#fbeef3]">{t.all} ↗</a>
      </div>
    </section>
  )
}
