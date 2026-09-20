import { Section, SectionHeading } from "@/components/ui/Section";
import { safety } from "@/content/home";

export function Safety() {
  return (
    <Section id="safety" tone="white">
      <SectionHeading eyebrow={safety.eyebrow} title={safety.title} body={safety.body} />
      <ul className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
        {safety.points.map((p) => (
          <li key={p} className="flex gap-3 rounded-2xl bg-brand-teal-soft p-4 text-sm">
            <span aria-hidden>🔒</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
