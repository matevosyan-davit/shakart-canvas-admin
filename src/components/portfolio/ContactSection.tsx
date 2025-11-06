import { Mail, Phone, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-40 px-4 sm:px-6 bg-surface relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-28 animate-slide-up">
          <div className="w-24 h-px bg-accent mx-auto mb-12 opacity-50" />
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-primary mb-16 tracking-tighter leading-tight">
            {t('contact.title')}
          </h2>
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-loose tracking-wide px-4">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <a
              href="mailto:shant101094@gmail.com"
              className="group relative p-8 bg-transparent hover:bg-card/30 transition-all duration-500"
            >
              <div className="flex flex-col items-start gap-4">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                    {t('contact.email')}
                  </span>
                  <p className="font-body text-base text-foreground group-hover:text-accent transition-colors duration-300">
                    shant101094@gmail.com
                  </p>
                </div>
              </div>
            </a>

            <a
              href="tel:+37491996999"
              className="group relative p-8 bg-transparent hover:bg-card/30 transition-all duration-500"
            >
              <div className="flex flex-col items-start gap-4">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                    {t('contact.phone')}
                  </span>
                  <p className="font-body text-base text-foreground group-hover:text-accent transition-colors duration-300">
                    +374 91 99 66 99
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://www.instagram.com/shakart_/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 bg-transparent hover:bg-card/30 transition-all duration-500"
            >
              <div className="flex flex-col items-start gap-4">
                <Instagram className="w-5 h-5 text-accent" />
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                    Instagram
                  </span>
                  <p className="font-body text-base text-foreground group-hover:text-accent transition-colors duration-300">
                    @shakart_
                  </p>
                </div>
              </div>
            </a>

            <a
              href="https://www.facebook.com/shantkarapetyan.shakart"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 bg-transparent hover:bg-card/30 transition-all duration-500"
            >
              <div className="flex flex-col items-start gap-4">
                <Facebook className="w-5 h-5 text-accent" />
                <div>
                  <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
                    Facebook
                  </span>
                  <p className="font-body text-base text-foreground group-hover:text-accent transition-colors duration-300">
                    Shakart
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;