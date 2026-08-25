import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturedLands from "@/components/FeaturedLands";
import ServicesShowcase from "@/components/ServicesShowcase";
import CompanyGallery from "@/components/CompanyGallery";

import WhyChooseHome from "@/components/WhyChooseHome";
import LandlordCta from "@/components/LandlordCta";
import ExploreAreasHome from "@/components/ExploreAreasHome";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";

export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <FeaturedProperties />
      <FeaturedLands />
      <ServicesShowcase />
      <CompanyGallery />
      <WhyChooseHome />
      <LandlordCta />
      <ExploreAreasHome />
      <Stats />
      <Testimonials />
      <FinalCta />
    </main>
  );
}
