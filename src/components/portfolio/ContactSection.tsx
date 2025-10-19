import { Mail, Phone, Instagram, Facebook } from "lucide-react";
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
              href="mailto:shant101094@gmail.com"
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
                    shant101094@gmail.com
                  </p>
                </div>
              </div>
            </a>

            <a
              href="tel:+37491996999"
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
                    +374 91 99 69 99
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/shakart_/?hl=en"
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
                    @shakart_
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/shantkarapetyan.shakart"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 border border-border/50 bg-card hover:border-accent/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex flex-col items-start gap-4">
                <div className="w-14 h-14 border-2 border-accent/20 rounded-full flex items-center justify-center group-hover:border-accent/40 transition-colors duration-300">
                  <Facebook className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                    Facebook
                  </span>
                  <p className="font-body text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                    Shakart
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