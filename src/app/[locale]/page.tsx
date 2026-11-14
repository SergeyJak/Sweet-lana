const copy = {
  ru: { heading: 'Скоро открытие', detail: 'Мы готовим для вас новый сайт.' },
  lv: { heading: 'Drīzumā', detail: 'Mēs gatavojam jaunu mājaslapu.' },
  en: { heading: 'Coming soon', detail: 'A new website is on its way.' },
}
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = copy[locale as keyof typeof copy] || copy.en
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#fffaf5] px-6 text-center text-[#372b2b]">
      <p className="mb-6 text-sm uppercase tracking-[0.3em]">Sweet-lana</p>
      <h1 className="mb-6 font-serif text-5xl font-semibold md:text-7xl">{content.heading}</h1>
      <p className="text-lg text-[#756969]">{content.detail}</p>
    </section>
  )
}
