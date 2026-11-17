export default function DevicePhoto({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-b from-white to-[#fcf4f7] p-6 sm:p-9 lg:aspect-square">
      <img
        src={`/devices/${slug}.webp`}
        alt={name}
        width={680}
        height={680}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-contain"
      />
    </div>
  )
}
