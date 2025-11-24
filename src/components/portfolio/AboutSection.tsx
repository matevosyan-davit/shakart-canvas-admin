import { useLanguage } from "@/contexts/LanguageContext";
import artistPortrait from "@/assets/481053385_1186855636132457_1785870235778242130_n copy.jpg";

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-40 px-4 sm:px-6 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-28 animate-slide-up">
          <div className="w-24 h-px bg-accent mx-auto mb-12 opacity-50" />
        </div>

        <div className="grid lg:grid-cols-5 gap-20 lg:gap-24 items-start">
          <div className="lg:col-span-2 animate-fade-in order-first" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="relative overflow-hidden">
                <img
                  src={artistPortrait}
                  alt={t('about.title')}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 animate-slide-up space-y-16">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-primary tracking-tighter leading-tight">
              {t('about.title')}
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-foreground/70 leading-loose tracking-wide">
                {t('about.bio.short')}
              </p>
            </div>

            <div className="mt-20 space-y-10">
              <div className="border-l border-accent/30 pl-6">
                <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3 block">
                  {t('about.education')}
                </span>
                <div className="font-body text-foreground/70 space-y-1 leading-relaxed">
                  <p className="text-base">{t('about.education.degree')}</p>
                  <p className="text-sm text-muted-foreground">{t('about.education.school')}</p>
                  <p className="text-xs text-muted-foreground">{t('about.education.year')}</p>
                </div>
              </div>

              <div className="border-l border-accent/30 pl-6">
                <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3 block">
                  {t('about.recognition')}
                </span>
                <div className="font-body text-foreground/70 space-y-1 leading-relaxed">
                  <p className="text-base">{t('about.recognition.award')}</p>
                  <p className="text-xs text-muted-foreground">{t('about.recognition.year')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;