import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import LandlordCta from "@/components/LandlordCta";

export const metadata: Metadata = {
  title: "Services | Platinum Rentals",
  description:
    "Full-service rental property management in Kampala: tenant sourcing, rent collection, owner reporting, inspections, maintenance, lease administration, arrears support, and short-let management.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="What We Do"
        title="Full-service management, end to end"
        description="Every function a landlord needs, handled by one accountable team — from placing a tenant to collecting rent, to reporting back to you every month. Tap any service below for the detail."
      />
      <Services />
      <LandlordCta />
    </main>
  );
}
