import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/unnamed.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - More visible bohemian style */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/35 to-background/85" />
      </div>

      {/* Content - Minimalistic & Bohemian */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 py-20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="space-y-12">
          <div className="w-20 h-px bg-accent mx-auto opacity-60" />

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary mb-6 leading-[0.85] tracking-tighter">
            {t('hero.title')}
          </h1>

          <div className="w-20 h-px bg-accent mx-auto opacity-60" />

          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center pt-8">
            <Link
              to="/gallery"
              className="group relative font-body text-sm uppercase tracking-[0.25em] text-primary hover:text-accent transition-colors duration-500"
            >
              <span className="relative z-10">{t('hero.explore')}</span>
              <div className="absolute bottom-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>

            <div className="hidden sm:block w-px h-8 bg-border/30" />

            <Link
              to="/about"
              className="group relative font-body text-sm uppercase tracking-[0.25em] text-primary hover:text-accent transition-colors duration-500"
            >
              <span className="relative z-10">{t('hero.about')}</span>
              <div className="absolute bottom-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-float opacity-50">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;