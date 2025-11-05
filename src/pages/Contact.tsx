import { Card } from "@/components/ui/card";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Hero Header */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-7xl font-bold text-primary mb-8 animate-slide-up">
            {t('contact.title')}
          </h1>
          <p className="font-body text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            {t('contact.hero.description')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <Card className="p-10 bg-card shadow-card border-0 animate-fade-in">
              <h2 className="font-display text-3xl font-semibold text-primary mb-8">{t('contact.info')}</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-lg font-medium text-muted-foreground mb-2">{t('contact.emailLabel')}</p>
                    <a
                      href="mailto:shant101094@gmail.com"
                      className="font-body text-xl text-foreground hover:text-accent transition-colors font-medium"
                    >
                      shant101094@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <p className="font-body text-lg font-medium text-muted-foreground mb-2">{t('contact.phone')}</p>
                    <a
                      href="tel:+37491996999"
                      className="font-body text-xl text-foreground hover:text-accent transition-colors font-medium"
                    >
                      +374 91 99 69 99
                    </a>
                  </div>
                </div>
                
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-10 bg-card shadow-card border-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-display text-3xl font-semibold text-primary mb-8">{t('contact.social')}</h2>
              
              <div className="space-y-6">
                <a
                  href="https://www.facebook.com/shantkarapetyan.shakart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-6 bg-surface hover:bg-primary/10 rounded-lg transition-all duration-300 hover-lift group"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Facebook className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-body text-lg font-medium text-foreground group-hover:text-primary transition-colors">Facebook</p>
                    <p className="font-body text-muted-foreground">Shakart</p>
                  </div>
                </a>
                
                <a
                  href="https://www.instagram.com/shakart_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-6 bg-surface hover:bg-primary/10 rounded-lg transition-all duration-300 hover-lift group"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Instagram className="w-8 h-8 text-accent group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-body text-lg font-medium text-foreground group-hover:text-primary transition-colors">Instagram</p>
                    <p className="font-body text-muted-foreground">@shakart_</p>
                  </div>
                </a>
              </div>
              
              <p className="font-body text-muted-foreground mt-8 leading-relaxed">
                {t('contact.socialDescription')}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;