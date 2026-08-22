import PageHero from "@/components/PageHero";
import LandSearchFilter from "@/components/LandSearchFilter";
import LandlordCta from "@/components/LandlordCta";
import FadeIn from "@/components/FadeIn";

export default function LandPage() {
  return (
    <main>
      <PageHero
        eyebrow="Land for Sale"
        title="Buy land across Kampala & beyond"
        description="Browse our curated land plots — residential, commercial, and agricultural. Every plot is vetted by Ninety Nine Property Consultants with clear title and ready for transfer."
      />

      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <LandSearchFilter />

          <FadeIn delay={200}>
            <div className="mt-16 text-center">
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-ink-faint)" }}
              >
                Looking for something specific?{" "}
                <a
                  href="https://wa.me/256785175160?text=Hello%20Ninety%20Nine%20Property%20Consultants%2C%20I%27m%20looking%20for%20a%20specific%20piece%20of%20land."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 transition-colors hover:opacity-80"
                  style={{ color: "var(--color-accent)" }}
                >
                  Contact us on WhatsApp
                </a>{" "}
                and we&apos;ll help you find the right plot.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <LandlordCta />
    </main>
  );
}