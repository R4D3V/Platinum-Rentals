import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/HowItWorks";
import LandlordCta from "@/components/LandlordCta";

export const metadata: Metadata = {
  title: "How It Works | Ninety Nine Property Consultants",
  description:
    "Two documented paths — how landlords hand their property to Ninety Nine Property Consultants for management, and how buyers acquire verified land with clear title.",
};

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How It Works"
        title="Clear steps for landlords — and for land buyers"
        description="Two documented sequences, not open-ended arrangements. Here's exactly what happens when you hand over your property for management — or when you buy verified land through us."
      />
      <HowItWorks />
      <LandlordCta />
    </main>
  );
}
