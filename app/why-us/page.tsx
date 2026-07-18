import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import AreasWeServe from "@/components/AreasWeServe";
import LandlordCta from "@/components/LandlordCta";

export const metadata: Metadata = {
  title: "Why Us | Platinum Rentals",
  description:
    "Why Kampala landlords choose Platinum Rentals over informal caretaker management: ring-fenced funds, transparent statements, performance-based fees, and diaspora-friendly reporting.",
};

export default function WhyUsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Why Landlords Choose Us"
        title="A dedicated team, not a caretaker"
        description="Platinum Rentals exists because most Ugandan landlords are still forced to choose between managing property themselves or trusting an informal caretaker with little accountability. Here's what the professional option actually looks like."
      />
      <AreasWeServe />
      <WhyChooseUs />
      <LandlordCta />
    </main>
  );
}
