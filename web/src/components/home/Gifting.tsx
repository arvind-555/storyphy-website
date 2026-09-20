import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { occasions } from "@/content/home";
import { whatsappLink } from "@/config/site";

export function Gifting() {
  return (
    <Section id="gifts" tone="cream">
      <SectionHeading eyebrow={occasions.eyebrow} title={occasions.title} body={occasions.body} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {occasions.items.map((o) => (
          <li key={o.title} className="rounded-3xl border border-line bg-white p-5 text-center">
            <span aria-hidden className="text-3xl">{o.icon}</span>
            <h3 className="mt-2 font-display text-lg">{o.title}</h3>
            <p className="mt-1 text-sm text-ink-soft">{o.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-sm text-ink-soft">{occasions.note}</p>
      <div className="mt-4 text-center">
        <Button href={whatsappLink("Hi Storyphy! I'd like to order a book as a gift.")} variant="secondary">
          Order as a gift
        </Button>
      </div>
    </Section>
  );
}
