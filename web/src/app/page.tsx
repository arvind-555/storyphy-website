import { Hero } from "@/components/home/Hero";
import { ProductVideo } from "@/components/home/ProductVideo";
import { Collections } from "@/components/home/Collections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyReading } from "@/components/home/WhyReading";
import { LookInside } from "@/components/home/LookInside";
import { ParentStories } from "@/components/home/ParentStories";
import { Gifting } from "@/components/home/Gifting";
import { SchoolsBand } from "@/components/home/SchoolsBand";
import { Safety } from "@/components/home/Safety";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductVideo />
      <Collections />
      <HowItWorks />
      <WhyReading />
      <LookInside />
      <ParentStories />
      <Gifting />
      <SchoolsBand />
      <Safety />
      <Faq />
      <FinalCta />
    </>
  );
}
