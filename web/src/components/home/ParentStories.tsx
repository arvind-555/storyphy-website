import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageSlot } from "@/components/media/ImageSlot";
import { parentStories } from "@/content/home";

export function ParentStories() {
  return (
    <Section id="families" tone="lavender">
      <SectionHeading eyebrow={parentStories.eyebrow} title={parentStories.title} body={parentStories.body} />
      <ul className="grid gap-6 md:grid-cols-3">
        {parentStories.stories.map((s) => (
          <li key={s.name} className="rounded-3xl bg-white p-5 shadow-sm">
            <ImageSlot id={s.imageId} label="Real photo of the child with their book" alt="A child with their Storyphy book" aspect="aspect-[4/3]" />
            <blockquote className="mt-4 text-ink">{s.quote}</blockquote>
            <p className="mt-3 text-sm font-bold">{s.name}</p>
            <p className="text-xs text-ink-soft">{s.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
