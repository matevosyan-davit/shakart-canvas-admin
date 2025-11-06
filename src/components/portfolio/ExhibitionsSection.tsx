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
    <section className="py-40 px-4 sm:px-6 bg-surface relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 animate-slide-up">
          <div className="w-24 h-px bg-accent mx-auto mb-12 opacity-50" />
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-primary mb-16 tracking-tighter leading-tight">
            {t('exhibitions.title')}
          </h2>
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-2xl mx-auto leading-loose tracking-wide px-4">
            {t('exhibitions.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {exhibitions.map((exhibition, index) => (
            <Link
              key={exhibition.id}
              to="/exhibitions"
              className="block"
            >
              <Card
                className="group border-none bg-transparent hover:bg-card/30 transition-all duration-500 overflow-hidden animate-slide-up cursor-pointer h-full"
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
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
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
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display text-xl text-primary mb-2 line-clamp-2 tracking-tight group-hover:text-accent transition-colors duration-300">
                      {getLocalizedText(exhibition, 'title', currentLanguage)}
                    </h3>
                  </div>

                  <div className="space-y-1">
                    <p className="font-body text-foreground/70 text-sm">
                      {getLocalizedText(exhibition, 'location', currentLanguage)}
                    </p>
                    <p className="font-body text-muted-foreground text-xs uppercase tracking-[0.2em]">
                      {new Date(exhibition.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </p>
                  </div>

                  {exhibition.description && (
                    <p className="font-serif text-sm text-foreground/60 line-clamp-2 leading-relaxed">
                      {getLocalizedText(exhibition, 'description', currentLanguage)}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-32">
          <div className="h-px w-24 bg-accent mx-auto mb-16 opacity-50" />
          <Link
            to="/exhibitions"
            className="group relative inline-block font-body text-sm uppercase tracking-[0.25em] text-primary hover:text-accent transition-colors duration-500"
          >
            <span className="relative z-10">{t('exhibitions.viewAll')}</span>
            <div className="absolute bottom-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;