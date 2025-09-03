import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden canvas-texture">
      {/* Background Image with refined overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto gallery-spacing animate-fade-in" style={{ marginTop: "4rem", animationDelay: "0.3s" }}>
        <h1 className="font-display text-7xl md:text-9xl text-primary mb-8 tracking-gallery leading-none">
          Shakart
        </h1>
        <div className="max-w-2xl mx-auto mb-12">
          <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed italic">
            Contemporary painter exploring the intersection of emotion and abstraction through the language of color and form
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            variant="ghost" 
            size="lg"
            className="font-body text-sm uppercase tracking-widest border border-primary/30 hover:border-primary hover:bg-primary/5 px-12 py-4 transition-all duration-500"
            asChild
          >
            <Link to="/gallery">Explore Gallery</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="lg"
            className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary px-8 py-4 transition-all duration-500"
            asChild
          >
            <Link to="/about">About the Artist</Link>
          </Button>
        </div>
      </div>
      
      {/* Refined Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground/30 to-transparent mb-4"></div>
        <ArrowDown className="w-4 h-4 text-muted-foreground/60" />
      </div>
    </section>
  );
};

export default HeroSection;