import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { schoolsBand } from "@/content/home";

export function SchoolsBand() {
  return (
    <Section id="for-schools" tone="purple">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">{schoolsBand.eyebrow}</p>
          <h2 className="font-display text-3xl leading-tight md:text-4xl">{schoolsBand.title}</h2>
          <ul className="mt-5 space-y-2 text-white/90">
            {schoolsBand.bullets.map((b) => (
              <li key={b} className="flex gap-2"><span aria-hidden>✓</span>{b}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/schools/quote" variant="onDark" size="lg">{schoolsBand.primaryCta}</Button>
            <Button href="/schools#sample-kit" variant="onDark" size="lg">{schoolsBand.secondaryCta}</Button>
          </div>
        </div>
        <ImageSlot id="IMG-37" label="Classroom of children with their books" alt="Children in a classroom holding their personalized books" aspect="aspect-[4/3]" />
      </div>
    </Section>
  );
}
