import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import LandlordCta from "@/components/LandlordCta";

export const metadata: Metadata = {
  title: "Services | Ninety Nine Property Consultants",
  description:
    "Full-service rental property management and land sales in Kampala: tenant sourcing, rent collection, owner reporting, inspections, maintenance, lease administration, arrears support, and verified land for sale.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="What We Do"
        title="Rental management & verified land sales"
        description="Specialising in rental property management and the sale of verified land — every function a landlord needs, handled by one accountable team, plus vetted plots with clear title ready for transfer. Tap any service below for the detail."
      />
      <Services />
      <LandlordCta />
    </main>
  );
}
