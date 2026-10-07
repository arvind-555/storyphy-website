export function VideoSlot({
  id,
  label,
  title,
  src,
  poster,
  captionsSrc,
  className = "",
}: {
  id: string;
  label: string;
  title: string;
  src?: string;
  poster?: string;
  captionsSrc?: string;
  className?: string;
}) {
  if (src) {
    return (
      <video
        className={`aspect-video w-full rounded-3xl bg-ink ${className}`.trim()}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        aria-label={title}
      >
        {captionsSrc && <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />}
      </video>
    );
  }
  return (
    <div
      data-slot={id}
      className={`flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-brand-purple/40 bg-gradient-to-br from-brand-purple to-brand-teal p-6 text-center text-white ${className}`.trim()}
    >
      <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-brand-purple">
        ▶
      </span>
      <span className="font-display text-xl">{title}</span>
      <span className="text-xs tracking-widest text-white/80">
        {id} · {label}
      </span>
    </div>
  );
}
