import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/media/ImageSlot";
import { collections } from "@/content/home";
import { orderMessage, whatsappLink } from "@/config/site";

export function Collections() {
  return (
    <Section id="collections" tone="cream">
      <SectionHeading
        eyebrow="Our books"
        title="Pick the story they'll love"
        body="Every book is personalized with your child's name and photo."
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <li key={c.slug} className="flex flex-col rounded-3xl border border-line bg-white p-4 shadow-sm">
            <ImageSlot
              id={c.imageId}
              label={`${c.title} cover`}
              alt={`${c.title} storybook cover`}
              aspect="aspect-[4/5]"
            />
            <div className="mt-4 flex flex-1 flex-col">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">{c.ages}</p>
              <h3 className="mt-1 font-display text-2xl">{c.title}</h3>
              <p className="mt-2 flex-1 text-ink-soft">{c.hook}</p>
              {c.comingSoon ? (
                <Button
                  href={whatsappLink("Hi Storyphy! Please notify me when new collections launch.")}
                  variant="secondary"
                  className="mt-4"
                >
                  Notify me
                </Button>
              ) : (
                <>
                  <p className="mt-3 text-sm font-bold text-ink">From {c.price}</p>
                  <Button href={whatsappLink(orderMessage(c.title))} className="mt-3">
                    Order this book
                  </Button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
