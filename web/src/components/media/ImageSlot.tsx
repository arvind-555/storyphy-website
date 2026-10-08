import Image from "next/image";

export function ImageSlot({
  id,
  label,
  alt,
  src,
  aspect = "aspect-[4/3]",
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  id: string;
  label: string;
  alt: string;
  src?: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-3xl ${aspect} ${className}`.trim()}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      data-slot={id}
      className={`flex flex-col items-center justify-center gap-1 rounded-3xl border-2 border-dashed border-brand-purple/40 bg-gradient-to-br from-brand-purple-soft to-brand-teal-soft p-4 text-center ${aspect} ${className}`.trim()}
    >
      <span className="text-xs font-bold tracking-widest text-brand-purple">{id}</span>
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  );
}
