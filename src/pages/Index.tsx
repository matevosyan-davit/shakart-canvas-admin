import HeroSection from "@/components/portfolio/HeroSection";
import FeaturedGallery from "@/components/portfolio/FeaturedGallery";
import AboutSection from "@/components/portfolio/AboutSection";
import ExhibitionsSection from "@/components/portfolio/ExhibitionsSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedGallery />
      <AboutSection />
      <ExhibitionsSection />
    </main>
  );
};

export default Index;