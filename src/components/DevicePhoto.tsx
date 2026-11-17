type Props = {
  slug: string
  name: string
  src?: string
}

export default function DevicePhoto({ slug, name, src }: Props) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#fffaf3]">
      <img
        src={src ?? `/devices/${slug}.webp`}
        alt={name}
        width={680}
        height={850}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 block h-full w-full object-contain object-center p-5 sm:p-8"
      />
    </div>
  )
}
