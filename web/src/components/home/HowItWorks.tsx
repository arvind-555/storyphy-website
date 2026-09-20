import { Section, SectionHeading } from "@/components/ui/Section";
import { howItWorks } from "@/content/home";

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="lavender">
      <SectionHeading eyebrow={howItWorks.eyebrow} title={howItWorks.title} body={howItWorks.body} />
      <ol className="grid gap-6 md:grid-cols-4">
        {howItWorks.steps.map((s, i) => (
          <li key={s.title} className="rounded-3xl bg-white p-6 text-center shadow-sm">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-2xl text-white" aria-hidden>
              {s.icon}
            </span>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-brand-teal">Step {i + 1}</p>
            <h3 className="mt-1 font-display text-xl">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mx-auto mt-10 max-w-xl rounded-2xl bg-brand-gold-soft px-5 py-4 text-center font-bold text-ink">
        {howItWorks.promise}
      </p>
    </Section>
  );
}
