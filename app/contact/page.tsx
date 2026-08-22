import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | Ninety Nine Property Consultants",
  description:
    "Get in touch with Ninety Nine Property Consultants — Kampala property management and land sales. Call, WhatsApp, or send an enquiry and we'll respond within one business day.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <main>
      <PageHero
        eyebrow="Get in Touch"
        title="Ready for the professional option?"
        description="Tell us about your property and we'll get back to you within one business day — by phone, email, or WhatsApp, whichever suits you."
      />
      <Contact prefillService={service} />
    </main>
  );
}
