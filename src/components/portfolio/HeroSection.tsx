import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with refined overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background/70 backdrop-blur-[2px]" />
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-primary mb-10 leading-[0.95] tracking-tight">
          {t('hero.title')}
        </h1>

        <div className="max-w-2xl mx-auto mb-14">
          <div className="h-px w-16 bg-accent mx-auto mb-8" />
          <p className="font-serif text-xl md:text-2xl text-foreground/80 leading-relaxed">
            {t('hero.description')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Button
            variant="ghost"
            size="lg"
            className="group font-body text-xs uppercase tracking-[0.2em] border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 transition-all duration-300 rounded-none"
            asChild
          >
            <Link to="/gallery">
              <span>{t('hero.explore')}</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary px-10 py-6 transition-all duration-300 rounded-none border-2 border-transparent hover:border-primary/20"
            asChild
          >
            <Link to="/about">{t('hero.about')}</Link>
          </Button>
        </div>
      </div>

      {/* Refined Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-float opacity-60">
        <div className="flex flex-col items-center gap-3">
          <span className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
          <ArrowDown className="w-3 h-3 text-muted-foreground/70" />
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
    </section>
  );
};

export default HeroSection;