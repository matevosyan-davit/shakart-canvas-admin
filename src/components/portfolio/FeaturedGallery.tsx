import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedField } from "@/utils/multiLanguageHelpers";
import { Button } from "@/components/ui/button";
import ArtworkDialog from "@/components/ArtworkDialog";

interface ArtworkImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Artwork {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  category: string;
  is_sold: boolean;
  width_cm: number | null;
  height_cm: number | null;
  depth_cm: number | null;
  display_order: number;
  created_at: string;
  year_painted: number | null;
  artwork_images: ArtworkImage[];
}

const FeaturedGallery = () => {
  const { t, currentLanguage } = useLanguage();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchFeaturedArtworks();
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    const intervalId = setInterval(() => {
      carouselApi.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [carouselApi]);

  const fetchFeaturedArtworks = async () => {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select(`
          *,
          artwork_images (
            id,
            image_url,
            display_order
          )
        `)
        .order('display_order', { ascending: true })
        .limit(6);

      if (error) throw error;
      
      // Sort images by display_order for each artwork
      const sortedArtworks = data?.map(artwork => ({
        ...artwork,
        artwork_images: artwork.artwork_images.sort((a: ArtworkImage, b: ArtworkImage) => a.display_order - b.display_order)
      })) || [];
      
      setArtworks(sortedArtworks);
    } catch (error) {
      console.error('Error fetching featured artworks:', error);
    }
  };

  return (
    <section className="py-40 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-32 animate-slide-up">
          <div className="w-24 h-px bg-accent mx-auto mb-12 opacity-50" />
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-primary mb-16 tracking-tighter leading-tight">
            {t('gallery.featuredWorks')}
          </h2>
          <div className="max-w-2xl mx-auto px-4">
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-foreground/60 leading-loose tracking-wide">
              {t('gallery.featuredDescription')}
            </p>
          </div>
        </div>
        
        {artworks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('gallery.noFeaturedArtworks')}</p>
          </div>
        ) : (
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {artworks.map((artwork, index) => (
                <CarouselItem key={artwork.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div
                    className="group cursor-pointer animate-fade-in h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {
                      setSelectedArtwork(artwork);
                      setDialogOpen(true);
                    }}
                  >
                    <div className="relative mb-6 overflow-hidden">
                      <div className="aspect-[4/5] overflow-hidden relative">
                        <img
                          src={artwork.artwork_images[0]?.image_url || '/placeholder.svg'}
                          alt={getTranslatedField(artwork, 'title', currentLanguage)}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                        />
                        {artwork.is_sold && (
                          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 font-body text-xs uppercase tracking-widest">
                            {t('gallery.sold')}
                          </div>
                        )}
                        <div className="absolute inset-0 border border-transparent group-hover:border-accent/30 transition-all duration-500" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-center space-y-1">
                        <h3 className="font-display text-xl md:text-2xl text-primary tracking-tight">
                          {getTranslatedField(artwork, 'title', currentLanguage)}
                        </h3>
                        <div className="font-body text-xs text-muted-foreground uppercase tracking-[0.2em]">
                          {artwork.year_painted || new Date(artwork.created_at).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16 h-10 w-10 border border-accent/20 hover:border-accent/40 hover:bg-transparent" />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16 h-10 w-10 border border-accent/20 hover:border-accent/40 hover:bg-transparent" />
          </Carousel>
        )}
        
        <div className="text-center mt-40">
          <div className="h-px w-24 bg-accent mx-auto mb-16 opacity-50" />
          <Link
            to="/gallery"
            className="group relative inline-flex items-center gap-2 font-body text-sm uppercase tracking-[0.25em] text-primary hover:text-accent transition-colors duration-500"
          >
            <span className="relative z-10">{t('gallery.viewCompleteGallery')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </Link>
        </div>

        <ArtworkDialog
          artwork={selectedArtwork}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </section>
  );
};

export default FeaturedGallery;