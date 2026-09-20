import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { hero } from "@/content/home";
import { orderHref } from "@/config/site";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-purple-soft to-brand-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 inline-block rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold text-brand-purple">
            {hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-6xl">
            Every child deserves to be the <span className="text-brand-purple">hero</span> of their own{" "}
            <span className="text-brand-teal">story</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={orderHref} size="lg">{hero.primaryCta}</Button>
            <Button href="#see-it" variant="secondary" size="lg">{hero.secondaryCta}</Button>
          </div>
          <p className="mt-4 text-sm">
            <Link href="/schools" className="font-bold text-brand-teal underline-offset-4 hover:underline">
              {hero.schoolsLink}
            </Link>
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm font-bold text-ink-soft">
            {hero.trust.map((t) => (
              <li key={t.text} className="flex items-center gap-2">
                <span aria-hidden>{t.icon}</span>
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <ImageSlot
          id="IMG-01"
          label="Fanned book covers with a joyful child on a brand-colour burst"
          alt="Personalized Storyphy storybooks fanned out beside a happy child"
          aspect="aspect-square"
          priority
        />
      </div>
    </section>
  );
}
