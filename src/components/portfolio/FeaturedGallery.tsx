import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedField } from "@/utils/multiLanguageHelpers";

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
  created_at: string;
  artwork_images: ArtworkImage[];
}

const FeaturedGallery = () => {
  const { t, currentLanguage } = useLanguage();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchFeaturedArtworks();
  }, []);

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
        .order('created_at', { ascending: false })
        .limit(3);

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
    <section className="py-32 px-6 bg-surface relative">
      {/* Decorative side elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 animate-slide-up">
          <div className="mb-6">
            <span className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">Curated Collection</span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl text-primary mb-10 tracking-tight leading-tight">
            {t('gallery.featuredWorks')}
          </h2>
          <div className="h-px w-24 bg-accent mx-auto mb-10" />
          <div className="max-w-2xl mx-auto">
            <p className="font-serif text-lg md:text-xl text-foreground/70 leading-relaxed">
              {t('gallery.featuredDescription')}
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {artworks.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">{t('gallery.noFeaturedArtworks')}</p>
            </div>
          ) : (
            artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
                onClick={() => { setSelectedArtwork(artwork); setCurrentImageIndex(0); }}
              >
                <div className="relative mb-8 overflow-hidden bg-card">
                  <div className="aspect-[4/5] overflow-hidden relative border border-border/50">
                    <img
                      src={artwork.artwork_images[0]?.image_url || '/placeholder.svg'}
                      alt={getTranslatedField(artwork, 'title', currentLanguage)}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95"
                    />
                    {artwork.is_sold && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wider shadow-lg">
                        {t('gallery.sold')}
                      </div>
                    )}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/20 transition-all duration-500" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-display text-2xl md:text-3xl text-primary tracking-tight">
                      {getTranslatedField(artwork, 'title', currentLanguage)}
                    </h3>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-[0.15em]">
                      <span>{new Date(artwork.created_at).getFullYear()}</span>
                      <span className="mx-2">•</span>
                      <span>{artwork.category}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-body text-sm text-foreground/80">
                      ${artwork.price?.toFixed(2) || t('gallery.priceOnRequest')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-24">
          <div className="h-px w-16 bg-accent/50 mx-auto mb-8" />
          <Link
            to="/gallery"
            className="inline-block font-body text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all duration-300 group"
          >
            <span className="border-b-2 border-transparent group-hover:border-primary pb-1 transition-all duration-300">
              {t('gallery.viewCompleteGallery')}
            </span>
          </Link>
        </div>
      </div>
      
      {/* Refined Gallery Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="w-[90vw] h-[90vh] gallery-glass rounded-lg overflow-hidden animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-full">
              {/* Image Section - Left Side */}
              <div className="flex-1 bg-black/20 flex items-center justify-center p-8 relative group">
                <img
                  src={selectedArtwork.artwork_images[currentImageIndex]?.image_url || '/placeholder.svg'}
                  alt={getTranslatedField(selectedArtwork, 'title', currentLanguage)}
                  className="max-w-full max-h-full object-contain"
                />
                {selectedArtwork.artwork_images.length > 1 && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === 0 ? selectedArtwork.artwork_images.length - 1 : prev - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => prev === selectedArtwork.artwork_images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/30 text-white px-2 py-0.5 rounded text-xs">
                      {currentImageIndex + 1} / {selectedArtwork.artwork_images.length}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content Section - Right Side */}
              <div className="w-96 bg-card/95 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-primary mb-3 tracking-gallery">
                        {getTranslatedField(selectedArtwork, 'title', currentLanguage)}
                      </h3>
                      <div className="font-body text-muted-foreground space-y-1 text-sm uppercase tracking-wider">
                        <p>{new Date(selectedArtwork.created_at).getFullYear()} • {selectedArtwork.category}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedArtwork(null)}
                      className="text-muted-foreground hover:text-primary transition-colors p-2"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="w-16 h-px bg-accent"></div>
                  
                  <p className="font-serif text-base text-foreground leading-relaxed">
                    {getTranslatedField(selectedArtwork, 'description', currentLanguage) || t('gallery.noDescription')}
                  </p>

                  {(selectedArtwork.width_cm || selectedArtwork.height_cm || selectedArtwork.depth_cm) && (
                    <div className="mt-4 pt-4 border-t border-border/10">
                      <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        {t('gallery.dimensions')}
                      </p>
                      <p className="font-body text-sm text-foreground">
                        {selectedArtwork.width_cm && `${selectedArtwork.width_cm} cm`}
                        {selectedArtwork.width_cm && selectedArtwork.height_cm && ' × '}
                        {selectedArtwork.height_cm && `${selectedArtwork.height_cm} cm`}
                        {selectedArtwork.depth_cm && ` × ${selectedArtwork.depth_cm} cm`}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-border/20">
                  <div className="font-display text-2xl text-primary font-semibold">
                    ${selectedArtwork.price?.toFixed(2) || t('gallery.priceOnRequest')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedGallery;