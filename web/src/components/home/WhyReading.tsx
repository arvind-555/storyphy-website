import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageSlot } from "@/components/media/ImageSlot";
import { whyReading } from "@/content/home";

export function WhyReading() {
  return (
    <Section id="why-reading" tone="cream">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <ImageSlot
          id="IMG-13"
          label="A delighted child spotting their own name in a storybook"
          alt="A child delighted to find their own name in a storybook"
          aspect="aspect-[4/5]"
        />
        <div>
          <SectionHeading center={false} eyebrow={whyReading.eyebrow} title={whyReading.title} body={whyReading.body} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {whyReading.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-white p-4">
                <span aria-hidden className="text-2xl">{item.icon}</span>
                <h3 className="mt-1 font-bold">{item.title}</h3>
                <p className="text-sm text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
