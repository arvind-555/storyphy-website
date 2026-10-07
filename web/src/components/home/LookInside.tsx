import { Section, SectionHeading } from "@/components/ui/Section";
import { ImageSlot } from "@/components/media/ImageSlot";
import { VideoSlot } from "@/components/media/VideoSlot";
import { lookInside } from "@/content/home";

export function LookInside() {
  return (
    <Section id="look-inside" tone="white">
      <SectionHeading eyebrow={lookInside.eyebrow} title={lookInside.title} body={lookInside.body} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lookInside.slotIds.map((id, i) => (
          <ImageSlot
            key={id}
            id={id}
            label={`Sample book spread ${i + 1}`}
            alt={`Sample book spread ${i + 1}`}
            aspect="aspect-[4/3]"
          />
        ))}
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {lookInside.specs.map((s) => (
          <li key={s.label} className="flex items-center gap-3 rounded-2xl bg-brand-purple-soft px-4 py-3 text-sm font-bold">
            <span aria-hidden className="text-xl">{s.icon}</span>
            {s.label}
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-10 max-w-3xl">
        <VideoSlot id="VID-03" label="Paper, binding and size-in-hand close-ups" title="Feel the quality" />
      </div>
    </Section>
  );
}
