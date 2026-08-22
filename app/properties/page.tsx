import PageHero from "@/components/PageHero";
import PropertySearchFilter from "@/components/PropertySearchFilter";
import LandlordCta from "@/components/LandlordCta";
import FadeIn from "@/components/FadeIn";

export default function PropertiesPage() {
  return (
    <main>
      {/* <PageHero
        eyebrow="Properties"
        title="Available rental properties across Kampala"
        description="Browse our current listings. Each property is managed end-to-end by Ninety Nine Property Consultants — tenant sourcing, rent collection, inspections, and maintenance."
      /> */}

      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <PropertySearchFilter />

          <FadeIn delay={200}>
            <div className="mt-16 text-center">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-ink-faint)" }}
              >
                Looking for something specific?{" "}
                <a
                  href="https://wa.me/256785175160?text=Hello%20Ninety%20Nine%20Property%20Consultants%2C%20I%27m%20looking%20for%20a%20specific%20property."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: "var(--color-accent)" }}
                >
                  Contact us on WhatsApp
                </a>{" "}
                and we&apos;ll help you find the right fit.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <LandlordCta />
    </main>
  );
}
