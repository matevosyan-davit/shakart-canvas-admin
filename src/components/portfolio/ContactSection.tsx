import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 animate-slide-up">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">Let's Connect</span>
          <div className="h-px w-16 bg-accent mx-auto my-8" />
          <h2 className="font-display text-5xl md:text-7xl text-primary mb-10 tracking-tight leading-tight">
            {t('contact.title')}
          </h2>
          <p className="font-serif text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <a
              href="mailto:hello@shakart.com"
              className="group relative p-8 border border-border/50 bg-card hover:border-accent/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 border-2 border-accent/20 rounded-full flex items-center justify-center group-hover:border-accent/40 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                    {t('contact.email')}
                  </span>
                  <p className="font-body text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    hello@shakart.com
                  </p>
                </div>
              </div>
            </a>

            <a
              href="tel:+15551234567"
              className="group relative p-8 border border-border/50 bg-card hover:border-accent/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 border-2 border-accent/20 rounded-full flex items-center justify-center group-hover:border-accent/40 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                    {t('contact.phone')}
                  </span>
                  <p className="font-body text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </a>

            <div className="group relative p-8 border border-border/50 bg-card">
              <div className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 border-2 border-accent/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                    {t('contact.location')}
                  </span>
                  <p className="font-body text-lg text-foreground">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://instagram.com/shakart_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 border border-border/50 bg-card hover:border-accent/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 border-2 border-accent/20 rounded-full flex items-center justify-center group-hover:border-accent/40 transition-colors duration-300">
                  <Instagram className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                    Instagram
                  </span>
                  <p className="font-body text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    @shakart_studio
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative bottom element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
};

export default ContactSection;