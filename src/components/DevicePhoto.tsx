'use client'

import { useState } from 'react'

const backups: Record<string, string[]> = {
  'morpheus8': [
    'https://www.revuclinic.lt/wp-content/uploads/2023/08/morpheus8-Revu-Clinic.png',
  ],
  'sylfirm-x': [
    'https://images.squarespace-cdn.com/content/v1/691635e48c3867312e609512/f7220b9b-bdea-4643-b407-adf47cdd5f44/Screenshot%2B2025-11-25%2Bat%2B12.45.58%E2%80%AFPM.png',
  ],
  'lumecca-peak-515': [
    'https://image.clinic.beauty.hotpepper.jp/public-image/H000720370/53c12492-e9de-4d9e-adfb-9cd6536fb731.jpg?h=400&impolicy=clinic01&w=710',
  ],
  'venus-legacy': [
    'https://img.medicalexpo.es/images_me/photo-g/86413-17149401.jpg',
  ],
  'ultraformer-mpt': [
    'https://naissclinic.com/img/RWD_img/ultraformerMPT/en/contentImg1.webp',
  ],
  'dermalux-tri-wave': [
    'https://images.squarespace-cdn.com/content/v1/67465262dee86455c1d9a90b/90a4d1c0-99aa-4051-b3ea-5399f43263ea/Tri-Wave-MD.jpeg',
  ],
}

const proxy = (url: string) => 'https://wsrv.nl/?url=' + encodeURIComponent(url) + '&w=900&output=webp'

export default function DevicePhoto({ slug, name, src }: { slug: string; name: string; src: string }) {
  const candidates = [src, proxy(src), ...(backups[slug] || []).flatMap(url => [url, proxy(url)])]
  const [index, setIndex] = useState(0)
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-b from-white to-[#fcf4f7] p-6 sm:p-9 lg:aspect-square">
      {index < candidates.length ? (
        <img
          key={candidates[index]}
          src={candidates[index]}
          alt={name}
          width={900}
          height={900}
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-contain"
          onError={() => setIndex(current => current + 1)}
        />
      ) : (
        <div role="img" aria-label={name} className="flex h-full w-full items-center justify-center rounded-2xl border border-[#f0dce4] bg-white text-center font-serif text-2xl text-[#87566c]">{name}</div>
      )}
    </div>
  )
}
