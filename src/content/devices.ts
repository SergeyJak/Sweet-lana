import type { Locale } from '@/lib/i18n'

// Reference photos of the equipment models from publicly accessible catalogues.
// Replace with clinic-owned or manufacturer-licensed images when available.
export const DEVICES = [
  {
    "slug": "morpheus8",
    "name": "Morpheus8",
    "image": "https://www.revuclinic.lt/wp-content/uploads/2023/08/morpheus8-Revu-Clinic.png",
    "source": "https://www.revuclinic.lt/shop/morpheus8-procedura/",
    "tech": {
      "ru": "Микроигольчатый RF",
      "lv": "Mikroadatu RF",
      "en": "RF microneedling"
    },
    "text": {
      "ru": {
        "summary": "Микроигольчатая RF-методика для улучшения плотности и текстуры кожи. Контролируемое радиочастотное воздействие помогает запускать процессы ремоделирования тканей.",
        "benefits": [
          "Снижение упругости кожи",
          "Мелкие морщины и неровный рельеф",
          "Расширенные поры",
          "Следы постакне и неровности"
        ],
        "how": "Тонкие иглы доставляют радиочастотную энергию на заданную глубину кожи. Протокол и глубину воздействия специалист подбирает индивидуально.",
        "suitable": "Когда хочется улучшить качество кожи и её плотность без хирургического вмешательства."
      },
      "lv": {
        "summary": "Mikroadatu RF procedūra ādas tvirtuma un tekstūras uzlabošanai. Kontrolēta radiofrekvences iedarbība veicina audu remodelāciju.",
        "benefits": [
          "Ādas tvirtuma zudums",
          "Smalkas krunciņas un nevienmērīgs reljefs",
          "Paplašinātas poras",
          "Pēcaknes pēdas un ādas nelīdzenumi"
        ],
        "how": "Smalkas adatiņas nogādā radiofrekvences enerģiju noteiktā ādas dziļumā. Procedūras parametrus speciālists izvēlas individuāli.",
        "suitable": "Ja vēlaties uzlabot ādas kvalitāti un tvirtumu bez ķirurģiskas iejaukšanās."
      },
      "en": {
        "summary": "RF microneedling designed to improve skin firmness and texture. Controlled radiofrequency energy supports tissue remodelling.",
        "benefits": [
          "Loss of skin firmness",
          "Fine lines and uneven texture",
          "Enlarged pores",
          "Post-acne marks and uneven skin surface"
        ],
        "how": "Fine needles deliver radiofrequency energy to selected depths. Treatment parameters are tailored to the individual.",
        "suitable": "For people seeking improved skin quality and firmness without surgery."
      }
    }
  },
  {
    "slug": "sylfirm-x",
    "name": "Sylfirm X",
    "image": "https://bwclinic.ru/assets/cache-images/uploaded/1744808147-ab4z7f.d6c2cf9e.png",
    "source": "https://skinclinic-yamamoto.com/sylfirm.html",
    "tech": {
      "ru": "Двухрежимный микроигольчатый RF",
      "lv": "Divu režīmu mikroadatu RF",
      "en": "Dual-mode RF microneedling"
    },
    "text": {
      "ru": {
        "summary": "Микроигольчатая RF-система с двумя режимами работы для решения задач, связанных с текстурой, покраснением и пигментацией кожи.",
        "benefits": [
          "Морщины и потеря тонуса",
          "Расширенные поры и рубцы постакне",
          "Пигментные пятна и мелазма",
          "Розацеа, купероз и диффузное покраснение"
        ],
        "how": "Непрерывный и импульсный RF-режимы позволяют адаптировать воздействие под особенности кожи и выбранную задачу.",
        "suitable": "Если одновременно беспокоят текстура кожи, покраснение или пигментация."
      },
      "lv": {
        "summary": "Mikroadatu RF sistēma ar diviem darbības režīmiem ādas tekstūras, apsārtuma un pigmentācijas problēmu mazināšanai.",
        "benefits": [
          "Krunciņas un tonusa zudums",
          "Paplašinātas poras un pēcaknes rētas",
          "Pigmentācijas plankumi un melasma",
          "Rozācija, kuperoze un difūzs apsārtums"
        ],
        "how": "Nepārtrauktas un impulsu RF iedarbības režīmi ļauj procedūru pielāgot ādas stāvoklim un vajadzībām.",
        "suitable": "Ja ir vairākas ādas problēmas, piemēram, apsārtums, pigmentācija un nevienmērīga tekstūra."
      },
      "en": {
        "summary": "Dual-mode RF microneedling for concerns involving skin texture, redness and pigmentation.",
        "benefits": [
          "Wrinkles and reduced firmness",
          "Enlarged pores and acne scarring",
          "Pigmentation and melasma",
          "Rosacea, visible capillaries and diffuse redness"
        ],
        "how": "Continuous and pulsed RF modes allow the practitioner to adapt the treatment to the skin and concern.",
        "suitable": "For a combination of texture, redness and pigmentation concerns."
      }
    }
  },
  {
    "slug": "lumecca-peak-515",
    "name": "LUMECCA Peak 515",
    "image": "https://premamedspa.com/storage/2025/04/product-lumecca-peak-ipl.png",
    "source": "https://miyahara-lc.jp/beauty/treatment/lumecca/",
    "tech": {
      "ru": "Интенсивный импульсный свет (IPL)",
      "lv": "Intensīvi pulsējošā gaisma (IPL)",
      "en": "Intense pulsed light (IPL)"
    },
    "text": {
      "ru": {
        "summary": "IPL-процедура для коррекции видимых пигментных и поверхностных сосудистых изменений кожи. Помогает сделать тон более ровным.",
        "benefits": [
          "Пигментные и солнечные пятна",
          "Веснушки и неоднородный тон",
          "Поверхностные сосуды и купероз",
          "Покраснение, связанное с розацеа"
        ],
        "how": "Световые импульсы воздействуют на пигмент и гемоглобин в поверхностных структурах кожи. Параметры выбирают с учётом фототипа.",
        "suitable": "При пигментации или покраснении, если специалист подтвердит, что IPL подходит вашему типу кожи."
      },
      "lv": {
        "summary": "IPL procedūra redzamu pigmentācijas plankumu un virspusēju asinsvadu izmaiņu mazināšanai. Palīdz panākt vienmērīgāku ādas toni.",
        "benefits": [
          "Pigmentācijas un saules plankumi",
          "Vasaras raibumi un nevienmērīgs ādas tonis",
          "Virspusēji asinsvadi un kuperoze",
          "Ar rozāciju saistīts apsārtums"
        ],
        "how": "Gaismas impulsi iedarbojas uz pigmentu un hemoglobīnu virspusējos ādas audos. Parametrus pielāgo ādas fototipam.",
        "suitable": "Ja traucē pigmentācija vai apsārtums un speciālists apstiprina IPL piemērotību."
      },
      "en": {
        "summary": "IPL treatment targeting visible pigmentation and superficial vascular changes, helping skin appear more even-toned.",
        "benefits": [
          "Sun spots and pigmentation",
          "Freckles and uneven skin tone",
          "Superficial vessels and visible capillaries",
          "Redness associated with rosacea"
        ],
        "how": "Light pulses target pigment and haemoglobin in superficial skin structures. Settings depend on skin phototype.",
        "suitable": "For pigmentation or redness when the practitioner confirms IPL suitability for your skin."
      }
    }
  },
  {
    "slug": "venus-legacy",
    "name": "Venus Legacy",
    "image": "https://img.medicalexpo.com/images_me/photo-g/86413-17126582.jpg",
    "source": "https://www.medicalexpo.es/prod/venus-concept/product-86413-698121.html",
    "tech": {
      "ru": "Неинвазивный RF и магнитные импульсы",
      "lv": "Neinvazīva RF un magnētiskie impulsi",
      "en": "Non-invasive RF and magnetic pulses"
    },
    "text": {
      "ru": {
        "summary": "Неинвазивная аппаратная методика для улучшения внешнего вида кожи лица и тела, её упругости и контуров.",
        "benefits": [
          "Потеря упругости кожи",
          "Мимические и возрастные морщины",
          "Видимые проявления целлюлита",
          "Неровность контуров тела"
        ],
        "how": "Многополярная радиочастотная энергия и импульсные магнитные поля обеспечивают контролируемое прогревание тканей.",
        "suitable": "Если интересует неинвазивный уход за кожей лица или тела."
      },
      "lv": {
        "summary": "Neinvazīva aparātprocedūra sejas un ķermeņa ādas izskata, tvirtuma un kontūru uzlabošanai.",
        "benefits": [
          "Ādas tvirtuma zudums",
          "Sejas krunciņas",
          "Redzamas celulīta pazīmes",
          "Nevienmērīgas ķermeņa kontūras"
        ],
        "how": "Multipolārā radiofrekvences enerģija un impulsu magnētiskie lauki nodrošina kontrolētu audu sildīšanu.",
        "suitable": "Ja vēlaties neinvazīvu procedūru sejas vai ķermeņa ādas izskatam."
      },
      "en": {
        "summary": "A non-invasive technology for improving the appearance, firmness and contours of facial and body skin.",
        "benefits": [
          "Loss of skin firmness",
          "Facial wrinkles",
          "Visible cellulite",
          "Uneven body contours"
        ],
        "how": "Multipolar radiofrequency energy and pulsed magnetic fields provide controlled tissue heating.",
        "suitable": "For people looking for a non-invasive face or body treatment."
      }
    }
  },
  {
    "slug": "ultraformer-mpt",
    "name": "Ultraformer MPT",
    "image": "https://images.squarespace-cdn.com/content/v1/608cbaaec491ae1e2f4b8ab7/e45ba436-88e3-44d1-a400-a88b56c62539/cryomed-aesthetics-ultraformer-mpt-ezgif.com-webp-to-jpg-converter.jpg?format=1500w",
    "source": "https://esthergazituaga.com/content/32-ultraformer-mpt-madrid",
    "tech": {
      "ru": "Сфокусированный ультразвук (HIFU)",
      "lv": "Fokusēta ultraskaņa (HIFU)",
      "en": "Focused ultrasound (HIFU)"
    },
    "text": {
      "ru": {
        "summary": "HIFU-методика для нехирургического лифтинга и улучшения плотности кожи. Направлена на ремоделирование коллагена.",
        "benefits": [
          "Снижение упругости и обвисание кожи",
          "Изменение овала лица",
          "Мелкие морщины",
          "Недостаточно выраженный контур нижней трети лица"
        ],
        "how": "Сфокусированные ультразвуковые импульсы воздействуют на выбранные глубины тканей без нарушения поверхности кожи.",
        "suitable": "Если нужна оценка возможности безоперационного лифтинга лица."
      },
      "lv": {
        "summary": "HIFU metode neķirurģiskam liftingam un ādas tvirtuma uzlabošanai, stimulējot kolagēna remodelāciju.",
        "benefits": [
          "Ādas atslābums un tvirtuma zudums",
          "Sejas ovāla izmaiņas",
          "Smalkas krunciņas",
          "Mazāk izteikta sejas apakšdaļas kontūra"
        ],
        "how": "Fokusētas ultraskaņas impulsi iedarbojas noteiktā audu dziļumā, nebojājot ādas virsmu.",
        "suitable": "Ja apsverat neķirurģisku sejas liftingu un vēlaties izvērtēt tā piemērotību."
      },
      "en": {
        "summary": "HIFU technology for non-surgical lifting and firmer-looking skin through collagen remodelling.",
        "benefits": [
          "Sagging or less firm skin",
          "Changes to facial contours",
          "Fine lines",
          "Reduced definition around the lower face"
        ],
        "how": "Focused ultrasound pulses target selected tissue depths without breaking the skin surface.",
        "suitable": "For people exploring non-surgical facial lifting after professional assessment."
      }
    }
  },
  {
    "slug": "dermalux-tri-wave",
    "name": "Dermalux Tri-Wave",
    "image": "https://images.squarespace-cdn.com/content/v1/67465262dee86455c1d9a90b/90a4d1c0-99aa-4051-b3ea-5399f43263ea/Tri-Wave-MD.jpeg",
    "source": "https://www.dermaluxled.com.au/blog/which-dermalux-led-system-is-suitable-for-your-business-1",
    "tech": {
      "ru": "LED-светотерапия",
      "lv": "LED gaismas terapija",
      "en": "LED light therapy"
    },
    "text": {
      "ru": {
        "summary": "Светодиодная терапия с синим, красным и ближним инфракрасным светом для деликатного воздействия на кожу.",
        "benefits": [
          "Воспалительные элементы акне",
          "Покраснение и неоднородный вид кожи",
          "Отдельные поверхностные пигментные изменения",
          "Поддержка восстановления и комфорта кожи"
        ],
        "how": "Сочетание различных длин волн позволяет выбирать световые протоколы в зависимости от состояния кожи.",
        "suitable": "Если нужен неинвазивный световой уход, в том числе в дополнение к другим процедурам."
      },
      "lv": {
        "summary": "LED gaismas terapija ar zilo, sarkano un tuvo infrasarkano gaismu maigai iedarbībai uz ādu.",
        "benefits": [
          "Iekaisīga akne",
          "Apsārtums un nevienmērīgs ādas izskats",
          "Atsevišķas virspusējas pigmentācijas izmaiņas",
          "Ādas komforta un atjaunošanās atbalsts"
        ],
        "how": "Dažādi gaismas viļņu garumi ļauj pielāgot procedūru konkrētām ādas vajadzībām.",
        "suitable": "Ja vēlaties neinvazīvu gaismas terapiju, arī kā papildinājumu citām procedūrām."
      },
      "en": {
        "summary": "LED therapy using blue, red and near-infrared light for a gentle, non-invasive skin treatment.",
        "benefits": [
          "Inflammatory acne",
          "Redness and uneven-looking skin",
          "Selected superficial pigmentation concerns",
          "Support for skin comfort and recovery"
        ],
        "how": "Different wavelengths allow the practitioner to select a protocol based on the condition of the skin.",
        "suitable": "For people considering non-invasive light therapy, including alongside other treatments."
      }
    }
  }
] as const

export type DeviceSlug = typeof DEVICES[number]['slug']
export type Device = typeof DEVICES[number]
export function isDeviceSlug(slug: string): slug is DeviceSlug {
  return DEVICES.some(device => device.slug === slug)
}
export function getDevice(slug: DeviceSlug) {
  return DEVICES.find(device => device.slug === slug)!
}
export const DEVICE_UI: Record<Locale, {concerns:string; how:string; suitable:string; book:string; back:string; seeMore:string; disclaimer:string; photo:string; listTitle:string;listIntro:string}> = {
  ru: {concerns:'Какие проблемы помогает решать',how:'Как работает',suitable:'Кому подойдёт',book:'Обсудить процедуру в WhatsApp',back:'Все аппараты Liderm Clinic',seeMore:'Подробнее о процедуре',disclaimer:'Эффект индивидуален. Подходящую процедуру и противопоказания специалист оценивает на консультации.',photo:'Иллюстративное фото модели аппарата',listTitle:'Аппаратные методики',listIntro:'Выберите аппарат, чтобы узнать, для каких задач его используют.'},
  lv: {concerns:'Kādas problēmas palīdz risināt',how:'Kā darbojas',suitable:'Kam piemērota',book:'Jautāt par procedūru WhatsApp',back:'Visas Liderm Clinic iekārtas',seeMore:'Vairāk par procedūru',disclaimer:'Rezultāti ir individuāli. Procedūras piemērotību un kontrindikācijas speciālists izvērtē konsultācijā.',photo:'Iekārtas modeļa ilustratīvs foto',listTitle:'Aparātu procedūras',listIntro:'Izvēlieties iekārtu, lai uzzinātu, kādām ādas vajadzībām to izmanto.'},
  en: {concerns:'What it may help with',how:'How it works',suitable:'Who it may suit',book:'Ask about this treatment on WhatsApp',back:'All Liderm Clinic devices',seeMore:'About this treatment',disclaimer:'Results vary. A practitioner will assess suitability and contraindications during a consultation.',photo:'Illustrative photo of the device model',listTitle:'Device-based treatments',listIntro:'Select a device to learn which concerns it may help address.'}
}
