import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhyChooseUs from "@/components/WhyChooseUs";
import AreasWeServe from "@/components/AreasWeServe";
import LandlordCta from "@/components/LandlordCta";

export const metadata: Metadata = {
  title: "Why Us | Ninety Nine Property Consultants",
  description:
    "Why landlords and land buyers choose Ninety Nine Property Consultants: ring-fenced funds, transparent statements, performance-based fees, title-verified land, and diaspora-friendly reporting.",
};

export default function WhyUsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Why Choose Ninety Nine"
        title="A dedicated team, not a caretaker — and land you can trust"
        description="Ninety Nine Property Consultants exists because most Ugandan landlords are still forced to choose between managing property themselves or trusting an informal caretaker with little accountability — and because too many land deals fall apart on an unclear title. Here's what the professional option actually looks like."
      />
      <AreasWeServe />
      <WhyChooseUs />
      <LandlordCta />
    </main>
  );
}
