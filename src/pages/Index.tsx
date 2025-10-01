import HeroSection from "@/components/portfolio/HeroSection";
import FeaturedGallery from "@/components/portfolio/FeaturedGallery";
import AboutSection from "@/components/portfolio/AboutSection";
import ExhibitionsSection from "@/components/portfolio/ExhibitionsSection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedGallery />
      <AboutSection />
      <ExhibitionsSection />
      <ContactSection />
    </main>
  );
};

export default Index;