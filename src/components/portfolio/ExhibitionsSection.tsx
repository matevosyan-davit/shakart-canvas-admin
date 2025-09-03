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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitions.map((exhibition, index) => (
            <Card 
              key={exhibition.id}
              className="p-6 border-0 shadow-card hover-lift bg-card animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Carousel */}
              {exhibition.exhibition_images.length > 0 ? (
                <Carousel className="w-full mb-4 relative">
                  <CarouselContent>
                    {exhibition.exhibition_images.map((image) => (
                      <CarouselItem key={image.id}>
                        <div className="aspect-square overflow-hidden rounded-lg">
                          <img
                            src={image.image_url}
                            alt={`${exhibition.title} - Exhibition Image`}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {exhibition.exhibition_images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                    </>
                  )}
                </Carousel>
              ) : (
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">No Images Available</p>
                </div>
              )}

              {/* Exhibition Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-1 line-clamp-1">
                    {getLocalizedText(exhibition, 'title', currentLanguage)}
                  </h3>
                  {exhibition.theme && (
                    <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full mb-2">
                      {getLocalizedText(exhibition, 'theme', currentLanguage)}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="font-body text-primary font-medium">
                    {getLocalizedText(exhibition, 'location', currentLanguage)}
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    {new Date(exhibition.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                {exhibition.description && (
                  <p className="font-body text-muted-foreground text-sm line-clamp-2">
                    {getLocalizedText(exhibition, 'description', currentLanguage)}
                  </p>
                )}

                <Link 
                  to="/exhibitions"
                  className="block mt-4"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/exhibitions">
            <Button className="mb-4">{t('exhibitions.viewAll')}</Button>
          </Link>
          <p className="font-body text-muted-foreground">
            For exhibition inquiries and collaboration opportunities, please{" "}
            <Link to="/contact" className="text-accent hover:text-accent/80 font-medium transition-colors duration-300">
              get in touch
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;