import type { ReactNode } from "react";

type Tone = "cream" | "lavender" | "white" | "purple" | "teal";

const tones: Record<Tone, string> = {
  cream: "bg-brand-cream text-ink",
  lavender: "bg-brand-purple-soft text-ink",
  white: "bg-white text-ink",
  purple: "bg-brand-purple text-white",
  teal: "bg-brand-teal text-white",
};

export function Section({
  id,
  tone = "cream",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${tones[tone]} scroll-mt-20`}>
      <div className={`mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 ${className}`.trim()}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = true,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
  onDark?: boolean;
}) {
  const align = center ? "text-center mx-auto" : "";
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${align}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-xs font-bold uppercase tracking-widest ${
            onDark ? "text-brand-gold" : "text-brand-teal"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl leading-tight md:text-4xl">{title}</h2>
      {body && (
        <p className={`mt-3 text-base md:text-lg ${onDark ? "text-white/85" : "text-ink-soft"}`}>
          {body}
        </p>
      )}
    </div>
  );
}
