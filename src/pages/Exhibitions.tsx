import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedField } from "@/utils/multiLanguageHelpers";

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

const Exhibitions = () => {
  const { t, currentLanguage } = useLanguage();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

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
          ),
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

      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6 animate-slide-up">
            {t('exhibitions.page.title')}
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t('exhibitions.page.description')}
          </p>
        </div>
      </section>

      {/* Exhibitions List */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t('exhibitions.loadingExhibitions')}</p>
            </div>
          ) : exhibitions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t('exhibitions.noExhibitions')}</p>
            </div>
          ) : (
            exhibitions.map((exhibition, index) => (
              <Card 
                key={exhibition.id} 
                className="p-8 bg-card shadow-card animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Exhibition Info */}
                  <div>
                    <div className="mb-6">
                      <h2 className="font-display text-3xl font-semibold text-primary mb-2">
                        {getTranslatedField(exhibition, 'title', currentLanguage)}
                      </h2>
                      <p className="font-body text-accent text-lg font-medium">
                        {getTranslatedField(exhibition, 'location', currentLanguage)} • {new Date(exhibition.date).getFullYear()}
                      </p>
                      {exhibition.theme && (
                        <p className="font-body text-muted-foreground italic mt-1">
                          {t('exhibitions.theme')}: {getTranslatedField(exhibition, 'theme', currentLanguage)}
                        </p>
                      )}
                    </div>
                    
                    {exhibition.description && (
                      <p className="font-body text-foreground leading-relaxed mb-6">
                        {getTranslatedField(exhibition, 'description', currentLanguage)}
                      </p>
                    )}
                  </div>
                  
                   {/* Exhibition Images */}
                   {exhibition.exhibition_images.length > 0 && (
                     <div>
                       <h3 className="font-display text-lg font-medium text-primary mb-4">{t('exhibitions.exhibitionHighlights')}</h3>
                       <Carousel className="w-full relative">
                         <CarouselContent>
                           {exhibition.exhibition_images.map((image, idx) => (
                             <CarouselItem key={image.id}>
                               <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                                 <img
                                   src={image.image_url}
                                   alt={`${exhibition.title} - Image ${idx + 1}`}
                                   className="w-full h-full object-cover shadow-card hover-lift transition-transform duration-300"
                                 />
                               </div>
                             </CarouselItem>
                           ))}
                         </CarouselContent>
                         {exhibition.exhibition_images.length > 1 && (
                           <>
                             <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                             <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
                           </>
                         )}
                       </Carousel>
                     </div>
                   )}
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-card shadow-card">
            <h2 className="font-display text-2xl font-medium text-primary mb-4">
              {t('exhibitions.inquiries')}
            </h2>
            <p className="font-body text-muted-foreground mb-6">
              {t('exhibitions.inquiriesText')}
            </p>
            <Link to="/contact">
              <Button className="font-body">
                {t('exhibitions.getInTouch')}
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Exhibitions;