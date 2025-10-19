import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import artistPortrait from "@/assets/481053385_1186855636132457_1785870235778242130_n copy.jpg";

const About = () => {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-surface p-6">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.backHome')}
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-6">
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
    </main>
  );
};

export default About;