import { useLanguage } from "@/contexts/LanguageContext";

const Media = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl mb-6 text-primary tracking-tight">
            {t('media.title')}
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Media coverage feature coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Media;
