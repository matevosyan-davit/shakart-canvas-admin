import { useLanguage } from "@/contexts/LanguageContext";
import artistPortrait from "@/assets/artist-portrait.jpg";

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-8">
              {t('about.title')}
            </h2>
            <div className="font-body text-lg text-foreground leading-relaxed space-y-6">
              <p>
                {t('about.bio')}
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-2xl font-medium text-primary mb-3">{t('about.education')}</h3>
                <div className="font-body text-muted-foreground space-y-2">
                  <p>{t('about.education.degree')}</p>
                  <p>{t('about.education.school')}</p>
                  <p>{t('about.education.year')}</p>
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-medium text-primary mb-3">{t('about.recognition')}</h3>
                <div className="font-body text-muted-foreground space-y-2">
                  <p>{t('about.recognition.award')}</p>
                  <p>{t('about.recognition.year')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in order-first lg:order-last">
            <div className="relative">
              <img
                src={artistPortrait}
                alt={t('about.title')}
                className="w-full rounded-lg shadow-elegant"
              />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full opacity-20 animate-float" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;