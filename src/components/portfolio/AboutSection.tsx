import { useLanguage } from "@/contexts/LanguageContext";
import artistPortrait from "@/assets/artist-portrait.jpg";

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 animate-slide-up">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">About the Artist</span>
          <div className="h-px w-16 bg-accent mx-auto my-8" />
        </div>

        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20 items-center">
          <div className="lg:col-span-3 animate-slide-up">
            <h2 className="font-display text-4xl md:text-6xl text-primary mb-10 tracking-tight leading-tight">
              {t('about.title')}
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed mb-8">
                {t('about.bio')}
              </p>
            </div>

            <div className="mt-16 space-y-12">
              <div className="border-l-2 border-accent/30 pl-8">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                  {t('about.education')}
                </span>
                <div className="font-body text-foreground/70 space-y-2 leading-relaxed">
                  <p className="text-lg">{t('about.education.degree')}</p>
                  <p className="text-muted-foreground">{t('about.education.school')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.education.year')}</p>
                </div>
              </div>

              <div className="border-l-2 border-accent/30 pl-8">
                <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block">
                  {t('about.recognition')}
                </span>
                <div className="font-body text-foreground/70 space-y-2 leading-relaxed">
                  <p className="text-lg">{t('about.recognition.award')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.recognition.year')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 animate-fade-in order-first lg:order-last" style={{ animationDelay: "0.2s" }}>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden border border-border/50">
                <img
                  src={artistPortrait}
                  alt={t('about.title')}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-accent/30 rounded-full" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-accent/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;