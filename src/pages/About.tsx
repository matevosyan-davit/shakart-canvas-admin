import { Card } from "@/components/ui/card";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import artistPortrait from "@/assets/481053385_1186855636132457_1785870235778242130_n copy.jpg";

const About = () => {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Hero Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6">
                {t('about.title')}
              </h1>
              <p className="font-body text-xl text-muted-foreground leading-relaxed mb-8">
                {t('about.subtitle')}
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={artistPortrait}
                alt={t('about.title')}
                className="w-full rounded-lg shadow-elegant hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8 bg-card shadow-card">
            <h2 className="font-display text-3xl font-medium text-primary mb-6">Artistic Journey</h2>
            <div className="font-body text-foreground space-y-4 leading-relaxed">
              <p>
                {t('about.bio')}
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card shadow-card">
              <h3 className="font-display text-xl font-medium text-primary mb-4">{t('about.education')}</h3>
              <div className="font-body text-muted-foreground space-y-2">
                <p>{t('about.education.degree')}</p>
                <p>{t('about.education.school')}</p>
                <p>{t('about.education.year')}</p>
              </div>
            </Card>

            <Card className="p-6 bg-card shadow-card">
              <h3 className="font-display text-xl font-medium text-primary mb-4">{t('about.recognition')}</h3>
              <div className="font-body text-muted-foreground space-y-2">
                <p>{t('about.recognition.award')}</p>
                <p>{t('about.recognition.year')}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information Section - Mobile Optimized */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-8 md:mb-12 text-center">
            {t('contact.title')}
          </h2>

          {/* Mobile: Single Column, Desktop: Two Columns */}
          <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">

            {/* Contact Details Card */}
            <Card className="p-6 md:p-10 bg-card shadow-card border-0">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6 md:mb-8">
                {t('contact.info')}
              </h3>

              <div className="space-y-6 md:space-y-8">
                {/* Email */}
                <a
                  href="mailto:shant101094@gmail.com"
                  className="flex items-start gap-4 md:gap-6 group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm md:text-lg font-medium text-muted-foreground mb-1 md:mb-2">
                      {t('contact.emailLabel')}
                    </p>
                    <p className="font-body text-base md:text-xl text-foreground group-hover:text-accent transition-colors font-medium break-all">
                      shant101094@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+37491996999"
                  className="flex items-start gap-4 md:gap-6 group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm md:text-lg font-medium text-muted-foreground mb-1 md:mb-2">
                      {t('contact.phone')}
                    </p>
                    <p className="font-body text-base md:text-xl text-foreground group-hover:text-accent transition-colors font-medium">
                      +374 91 99 66 99
                    </p>
                  </div>
                </a>
              </div>
            </Card>

            {/* Social Media Card */}
            <Card className="p-6 md:p-10 bg-card shadow-card border-0">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6 md:mb-8">
                {t('contact.social')}
              </h3>

              <div className="space-y-4 md:space-y-6">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/shantkarapetyan.shakart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-surface hover:bg-primary/10 rounded-lg transition-all duration-300 hover-lift group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Facebook className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      Facebook
                    </p>
                    <p className="font-body text-sm md:text-base text-muted-foreground truncate">
                      Shakart
                    </p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/shakart_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-surface hover:bg-primary/10 rounded-lg transition-all duration-300 hover-lift group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Instagram className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      Instagram
                    </p>
                    <p className="font-body text-sm md:text-base text-muted-foreground truncate">
                      @shakart_
                    </p>
                  </div>
                </a>
              </div>

              <p className="font-body text-sm md:text-base text-muted-foreground mt-6 md:mt-8 leading-relaxed">
                {t('contact.socialDescription')}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;