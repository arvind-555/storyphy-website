import { Section, SectionHeading } from "@/components/ui/Section";
import { VideoSlot } from "@/components/media/VideoSlot";
import { productVideo } from "@/content/home";

export function ProductVideo() {
  return (
    <Section id="see-it" tone="white">
      <SectionHeading eyebrow={productVideo.eyebrow} title={productVideo.title} body={productVideo.body} />
      <div className="mx-auto max-w-3xl">
        <VideoSlot id="VID-02" label="30-60s unboxing, flip-through and child reaction, captions on" title="Watch the book come to life" />
      </div>
    </Section>
  );
}
