import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/schools/QuoteForm";
import { quotePage } from "@/content/schools";

export const metadata: Metadata = {
  title: "Get a school quote - Storyphy",
};

export default function QuotePage() {
  return (
    <Section tone="lavender">
      <SectionHeading title={quotePage.title} body={quotePage.body} />
      <QuoteForm />
    </Section>
  );
}
