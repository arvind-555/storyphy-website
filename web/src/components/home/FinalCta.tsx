import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { finalCta } from "@/content/home";
import { orderHref, whatsappLink } from "@/config/site";

export function FinalCta() {
  return (
    <Section id="start" tone="teal" className="text-center">
      <h2 className="font-display text-3xl md:text-5xl">{finalCta.title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-lg text-white/90">{finalCta.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={orderHref} variant="onDark" size="lg">{finalCta.primaryCta}</Button>
        <Button href={whatsappLink()} variant="onDark" size="lg">{finalCta.secondaryCta}</Button>
      </div>
    </Section>
  );
}
