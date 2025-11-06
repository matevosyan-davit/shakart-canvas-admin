import HeroSection from "@/components/portfolio/HeroSection";
import FeaturedGallery from "@/components/portfolio/FeaturedGallery";
import AboutSection from "@/components/portfolio/AboutSection";
import ContactSection from "@/components/portfolio/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedGallery />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default Index;