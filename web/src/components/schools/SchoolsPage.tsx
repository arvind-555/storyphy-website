import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { VideoSlot } from "@/components/media/VideoSlot";
import { Faq } from "@/components/home/Faq";
import { whatsappLink } from "@/config/site";
import { mediaSrc } from "@/content/media";
import {
  foundingOffer,
  sampleKit,
  schoolsFaq,
  schoolsHero,
  schoolsOptions,
  schoolsProcess,
  schoolsSafety,
  schoolsWhy,
} from "@/content/schools";

export function SchoolsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-teal-soft to-brand-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-teal">{schoolsHero.eyebrow}</p>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">{schoolsHero.title}</h1>
            <p className="mt-5 max-w-lg text-lg text-ink-soft">{schoolsHero.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/schools/quote" size="lg">{schoolsHero.primaryCta}</Button>
              <Button href="#sample-kit" variant="secondary" size="lg">{schoolsHero.secondaryCta}</Button>
            </div>
          </div>
          <ImageSlot id="IMG-50" src={mediaSrc("IMG-50")} label="Teacher and children with their personalized books" alt="A teacher and children with their personalized books" aspect="aspect-[4/3]" priority />
        </div>
      </section>

      <Section tone="white">
        <SectionHeading eyebrow={schoolsWhy.eyebrow} title={schoolsWhy.title} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {schoolsWhy.items.map((i) => (
            <li key={i.title} className="rounded-3xl border border-line p-5 text-center">
              <span aria-hidden className="text-3xl">{i.icon}</span>
              <h3 className="mt-2 font-display text-lg">{i.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{i.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lavender">
        <SectionHeading eyebrow={schoolsProcess.eyebrow} title={schoolsProcess.title} />
        <ol className="grid gap-5 md:grid-cols-4">
          {schoolsProcess.steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white">
        <SectionHeading eyebrow={schoolsSafety.eyebrow} title={schoolsSafety.title} />
        <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {schoolsSafety.points.map((p) => (
            <li key={p} className="flex gap-3 rounded-2xl bg-brand-teal-soft p-4 text-sm">
              <span aria-hidden>🔒</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow={schoolsOptions.eyebrow} title={schoolsOptions.title} />
        <ul className="grid gap-5 md:grid-cols-3">
          {schoolsOptions.items.map((o) => (
            <li key={o.title} className="rounded-3xl border border-line bg-white p-6">
              <h3 className="font-display text-xl">{o.title}</h3>
              <p className="mt-2 text-ink-soft">{o.body}</p>
              <p className="mt-3 text-sm font-bold">From {o.price} per child</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="sample-kit" tone="lavender">
        <SectionHeading eyebrow={sampleKit.eyebrow} title={sampleKit.title} body={sampleKit.body} />
        <div className="grid items-center gap-6 md:grid-cols-2">
          <VideoSlot id="VID-08" label="School sample kit walkthrough" title="What's in the sample kit" />
          <div className="grid grid-cols-3 gap-3">
            <ImageSlot id="IMG-51" label="Sample kit contents" alt="Sample kit contents" aspect="aspect-square" />
            <ImageSlot id="IMG-52" label="Sample book in hand" alt="Sample book in hand" aspect="aspect-square" />
            <ImageSlot id="IMG-53" src={mediaSrc("IMG-53")} label="Consent form and info sheet" alt="Consent form and info sheet" aspect="aspect-square" />
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button href={whatsappLink(sampleKit.ctaMessage)} size="lg">{sampleKit.cta}</Button>
        </div>
      </Section>

      <Section tone="purple" className="text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-gold">{foundingOffer.eyebrow}</p>
        <h2 className="font-display text-3xl md:text-4xl">{foundingOffer.title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/90">{foundingOffer.body}</p>
        <div className="mt-6">
          <Button href={whatsappLink(foundingOffer.ctaMessage)} variant="onDark" size="lg">{foundingOffer.cta}</Button>
        </div>
      </Section>

      <Faq content={schoolsFaq} id="school-faq" />

      <Section tone="teal" className="text-center">
        <h2 className="font-display text-3xl md:text-4xl">Ready to give every child their book?</h2>
        <div className="mt-6">
          <Button href="/schools/quote" variant="onDark" size="lg">Get a school quote</Button>
        </div>
      </Section>
    </>
  );
}
