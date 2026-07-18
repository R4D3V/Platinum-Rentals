import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import HowItWorks from "@/components/HowItWorks";
import LandlordCta from "@/components/LandlordCta";

export const metadata: Metadata = {
  title: "How It Works | Platinum Rentals",
  description:
    "From property review to ongoing management — the four-step process landlords go through when they hand their property to Platinum Rentals.",
};

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        eyebrow="How It Works"
        title="Four steps from handover to hands-off"
        description="A real, documented sequence — not an open-ended arrangement. Here's exactly what happens from the first site visit to your first monthly statement."
      />
      <HowItWorks />
      <LandlordCta />
    </main>
  );
}
