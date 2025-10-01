import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-6">
            {t('contact.title')}
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h3 className="font-display text-2xl font-medium text-primary mb-6">
                {t('contact.info')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">{t('contact.email')}</p>
                    <p className="font-body text-muted-foreground">hello@shakart.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">{t('contact.phone')}</p>
                    <p className="font-body text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">{t('contact.location')}</p>
                    <p className="font-body text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-foreground">Instagram</p>
                    <p className="font-body text-muted-foreground">@shakart_studio</p>
                  </div>
                </div>
              </div>
            </div>
            
        
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;