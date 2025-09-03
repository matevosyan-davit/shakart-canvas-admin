import HeroSection from "@/components/portfolio/HeroSection";
import FeaturedGallery from "@/components/portfolio/FeaturedGallery";
import AboutSection from "@/components/portfolio/AboutSection";
import ExhibitionsSection from "@/components/portfolio/ExhibitionsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedGallery />
        <AboutSection />
        <ExhibitionsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;