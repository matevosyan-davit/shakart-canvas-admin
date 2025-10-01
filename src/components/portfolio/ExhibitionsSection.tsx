import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedText } from "@/utils/multiLanguage";

interface ExhibitionImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
  theme: string | null;
  description: string | null;
  created_at: string;
  exhibition_images: ExhibitionImage[];
}

const ExhibitionsSection = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const { data, error } = await supabase
        .from('exhibitions')
        .select(`
          *,
          exhibition_images (
            id,
            image_url,
            display_order
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      
      const sortedExhibitions = data?.map(exhibition => ({
        ...exhibition,
        exhibition_images: exhibition.exhibition_images.sort((a: ExhibitionImage, b: ExhibitionImage) => a.display_order - b.display_order)
      })) || [];
      
      setExhibitions(sortedExhibitions);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (exhibitions.length === 0) {
    return (
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-6">
              {t('exhibitions.title')}
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('exhibitions.subtitle')}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 bg-surface relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 animate-slide-up">
          <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">Past & Present</span>
          <div className="h-px w-16 bg-accent mx-auto my-8" />
          <h2 className="font-display text-5xl md:text-7xl text-primary mb-10 tracking-tight leading-tight">
            {t('exhibitions.title')}
          </h2>
          <p className="font-serif text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {t('exhibitions.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {exhibitions.map((exhibition, index) => (
            <Card
              key={exhibition.id}
              className="group border border-border/50 bg-card hover:border-accent/30 transition-all duration-500 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image Carousel */}
              {exhibition.exhibition_images.length > 0 ? (
                <Carousel className="w-full relative">
                  <CarouselContent>
                    {exhibition.exhibition_images.map((image) => (
                      <CarouselItem key={image.id}>
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={image.image_url}
                            alt={`${exhibition.title} - Exhibition Image`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {exhibition.exhibition_images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                </Carousel>
              ) : (
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">No Images Available</p>
                </div>
              )}

              {/* Exhibition Details */}
              <div className="p-8 space-y-6">
                {exhibition.theme && (
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent-foreground text-xs font-body uppercase tracking-wider">
                    {getLocalizedText(exhibition, 'theme', currentLanguage)}
                  </span>
                )}

                <div>
                  <h3 className="font-display text-2xl text-primary mb-3 line-clamp-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                    {getLocalizedText(exhibition, 'title', currentLanguage)}
                  </h3>
                  <div className="h-px w-12 bg-accent/30 mb-4" />
                </div>

                <div className="space-y-2">
                  <p className="font-body text-foreground/80 font-medium text-sm">
                    {getLocalizedText(exhibition, 'location', currentLanguage)}
                  </p>
                  <p className="font-body text-muted-foreground text-xs uppercase tracking-wider">
                    {new Date(exhibition.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {exhibition.description && (
                  <p className="font-serif text-sm text-foreground/70 line-clamp-3 leading-relaxed">
                    {getLocalizedText(exhibition, 'description', currentLanguage)}
                  </p>
                )}

                <Link
                  to="/exhibitions"
                  className="inline-block font-body text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary pb-1"
                >
                  View Details
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="h-px w-16 bg-accent/50 mx-auto mb-10" />
          <Link to="/exhibitions">
            <Button
              variant="ghost"
              className="font-body text-xs uppercase tracking-[0.2em] border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 transition-all duration-300 rounded-none mb-8"
            >
              {t('exhibitions.viewAll')}
            </Button>
          </Link>
          <p className="font-serif text-sm text-foreground/70 max-w-xl mx-auto leading-relaxed">
            For exhibition inquiries and collaboration opportunities, please{" "}
            <Link to="/contact" className="text-accent hover:text-primary font-medium transition-colors duration-300 border-b border-accent/30 hover:border-primary">
              get in touch
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;