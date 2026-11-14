type Locale = 'ru' | 'lv' | 'en'
const copy = {
  ru: {
    nav: ['Главная', 'О нас', 'Услуги', 'Галерея', 'Контакты'],
    eyebrow: 'Добро пожаловать',
    heading: 'Sweet-lana',
    subtitle: 'Красота начинается с деталей.',
    intro: 'Мы готовим новый сайт. Скоро здесь появятся услуги, фотографии и вся необходимая информация.',
    discover: 'Посмотреть разделы',
    about: 'О нас', aboutText: 'Здесь появится история Sweet-lana и информация о мастере.',
    services: 'Услуги', servicesText: 'Описание услуг и цены добавим после согласования.',
    gallery: 'Галерея', galleryText: 'Скоро здесь будут фотографии работ.',
    contact: 'Контакты', contactText: 'Контактные данные и способы записи появятся здесь.',
    soon: 'Скоро', footer: 'Сайт находится в разработке.',
    menu: 'Меню',
  },
  lv: {
    nav: ['Sākums', 'Par mums', 'Pakalpojumi', 'Galerija', 'Kontakti'],
    eyebrow: 'Laipni lūdzam', heading: 'Sweet-lana', subtitle: 'Skaistums sākas detaļās.',
    intro: 'Mēs gatavojam jaunu mājaslapu. Drīzumā šeit būs pakalpojumi, fotogrāfijas un informācija.',
    discover: 'Apskatīt sadaļas', about: 'Par mums', aboutText: 'Šeit būs Sweet-lana stāsts un informācija par speciālistu.',
    services: 'Pakalpojumi', servicesText: 'Pakalpojumu aprakstus un cenas pievienosim pēc apstiprināšanas.',
    gallery: 'Galerija', galleryText: 'Drīzumā šeit būs darbu fotogrāfijas.',
    contact: 'Kontakti', contactText: 'Šeit būs kontaktinformācija un pieraksta iespējas.',
    soon: 'Drīzumā', footer: 'Mājaslapa tiek izstrādāta.', menu: 'Izvēlne',
  },
  en: {
    nav: ['Home', 'About', 'Services', 'Gallery', 'Contact'],
    eyebrow: 'Welcome', heading: 'Sweet-lana', subtitle: 'Beauty begins with the details.',
    intro: 'Our new website is taking shape. Services, photographs and essential information will be added soon.',
    discover: 'Explore the site', about: 'About us', aboutText: 'The Sweet-lana story and specialist introduction will appear here.',
    services: 'Services', servicesText: 'Service descriptions and prices will be added once confirmed.',
    gallery: 'Gallery', galleryText: 'Photos of our work are coming soon.',
    contact: 'Contact', contactText: 'Contact details and booking options will appear here.',
    soon: 'Coming soon', footer: 'Website under construction.', menu: 'Menu',
  },
} as const
const ids = ['home', 'about', 'services', 'gallery', 'contact'] as const

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params
  const locale: Locale = requested === 'ru' || requested === 'en' ? requested : 'lv'
  const c = copy[locale]
  const panels = [
    { id: 'about', title: c.about, text: c.aboutText, number: '01' },
    { id: 'services', title: c.services, text: c.servicesText, number: '02' },
    { id: 'gallery', title: c.gallery, text: c.galleryText, number: '03' },
    { id: 'contact', title: c.contact, text: c.contactText, number: '04' },
  ]
  return (
    <div className="relative min-h-screen bg-white text-[#241e20]">
      {/* Stable large viewport height prevents background resizing when mobile browser chrome changes. */}
      <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 h-[100lvh] w-full overflow-hidden [transform:translateZ(0)]">
        <div className="absolute inset-0 bg-[url('/background.jpeg')] bg-cover bg-[position:57%_center] bg-no-repeat md:bg-center" />
        <div className="absolute inset-0 bg-white/25 md:bg-white/15" />
      </div>
      <header className="sticky top-0 z-50 border-b border-[#f0dce4] bg-white/95 backdrop-blur-md">
        <div className="relative mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 md:px-10">
          <a href="#home" className="min-w-0 shrink-0 whitespace-nowrap font-serif text-[clamp(1.4rem,5vw,2rem)] font-semibold tracking-tight text-[#241e20]">Sweet-lana<span className="text-[#d9a3b7]">.</span></a>
          <nav aria-label={c.menu} className="hidden items-center gap-7 lg:flex">
            {ids.map((id, i) => <a key={id} href={`#${id}`} className="text-xs font-semibold uppercase tracking-[0.12em] text-[#635657] transition hover:text-[#bc8075]">{c.nav[i]}</a>)}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <nav aria-label="Language" className="flex items-center gap-0.5 text-[11px] font-semibold tracking-wide sm:gap-1 sm:text-xs">
              {(['ru', 'lv', 'en'] as const).map((lang) => <a key={lang} href={`/${lang}`} aria-current={lang === locale ? 'page' : undefined} className={`flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10 ${lang === locale ? 'bg-[#241e20] text-white' : 'text-[#736767] hover:bg-[#fbeef3]'}`}>{lang.toUpperCase()}</a>)}
            </nav>
            <details className="group lg:hidden">
              <summary aria-label={c.menu} className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-[#e7cbd5] text-lg text-[#241e20] [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="group-open:hidden">☰</span><span aria-hidden="true" className="hidden group-open:inline">×</span>
              </summary>
              <nav aria-label={c.menu} className="absolute left-0 right-0 top-full flex flex-col border-b border-[#f0dce4] bg-white px-4 py-3 shadow-xl sm:left-auto sm:right-4 sm:w-72 sm:rounded-b-2xl">
                {ids.map((id, i) => <a key={id} href={`#${id}`} className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-[#fbeef3]">{c.nav[i]}</a>)}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="home" className="relative border-b border-[#f0dce4]/70">
          <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-6 py-28 md:px-12">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-[#a05e78]">{c.eyebrow}</p>
            <h1 className="mb-7 max-w-5xl font-serif text-[clamp(3.1rem,12vw,10rem)] font-medium leading-[0.85] tracking-[-0.055em] text-[#241e20]">Sweet-lana<span className="text-[#d9a3b7]">.</span></h1>
            <p className="mb-5 max-w-2xl font-serif text-3xl italic text-[#7b5265] md:text-5xl">{c.subtitle}</p>
            <p className="mb-10 max-w-lg text-base leading-8 text-[#3f3539]">{c.intro}</p>
            <a href="#about" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#241e20] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#7e5267]">{c.discover} <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
          {panels.map((panel) => (
            <article key={panel.id} id={panel.id} className="group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-[2rem] border border-[#f0dce4] bg-white/85 backdrop-blur-sm p-8 shadow-[0_8px_35px_rgba(55,43,43,0.035)] md:p-11">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-[0.3em] text-[#c5829e]">{panel.number} / 04</span>
                <span className="rounded-full bg-[#fceef4] px-4 py-2 text-xs text-[#9b627b]">{c.soon}</span>
              </div>
              <div>
                <h2 className="mb-5 font-serif text-5xl font-medium text-[#241e20] md:text-6xl">{panel.title}</h2>
                <p className="max-w-md text-base leading-7 text-[#4f4148]">{panel.text}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <footer className="relative z-10 border-t border-[#f0dce4] bg-white/80 px-6 py-10 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#786b69] md:flex-row">
          <span className="font-serif text-2xl text-[#241e20]">Sweet-lana.</span>
          <span>{c.footer}</span>
          <span>© {new Date().getFullYear()} Sweet-lana</span>
        </div>
      </footer>
    </div>
  )
}
