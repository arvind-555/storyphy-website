import { Section, SectionHeading } from "@/components/ui/Section";
import { faq } from "@/content/home";

type FaqContent = {
  eyebrow: string;
  title: string;
  items: readonly { q: string; a: string }[];
};

export function Faq({ content = faq, id = "faq" }: { content?: FaqContent; id?: string }) {
  return (
    <Section id={id} tone="cream">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} />
      <div className="mx-auto max-w-3xl space-y-3">
        {content.items.map((item) => (
          <details key={item.q} className="group rounded-2xl border border-line bg-white p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
              {item.q}
              <span aria-hidden className="text-brand-purple transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-3 text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
