import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  display_order: number;
  created_at: string;
  artwork_images: ArtworkImage[];
}

const Gallery = () => {
  const { t, currentLanguage } = useLanguage();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
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
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      // Sort images by display_order for each artwork
      const sortedArtworks = data?.map(artwork => ({
        ...artwork,
        artwork_images: artwork.artwork_images.sort((a: ArtworkImage, b: ArtworkImage) => a.display_order - b.display_order)
      })) || [];
      
      setArtworks(sortedArtworks);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedArtwork && selectedArtwork.artwork_images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === selectedArtwork.artwork_images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedArtwork && selectedArtwork.artwork_images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedArtwork.artwork_images.length - 1 : prev - 1
      );
    }
  };

  const renderArtworkGrid = () => {
    if (artworks.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('gallery.noArtworks')}</p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork, index) => (
          <Card
            key={artwork.id}
            className="group overflow-hidden border-0 shadow-card hover-lift cursor-pointer bg-card"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleArtworkClick(artwork)}
          >
            <div className="aspect-square overflow-hidden relative">
              <img
                src={artwork.artwork_images[0]?.image_url || '/placeholder.svg'}
                alt={getTranslatedField(artwork, 'title', currentLanguage)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {artwork.is_sold && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wider shadow-lg">
                  {t('gallery.sold')}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-medium text-primary mb-2">
                {getTranslatedField(artwork, 'title', currentLanguage)}
              </h3>
              <div className="font-body text-sm text-muted-foreground">
                <p>${artwork.price?.toFixed(2) || t('gallery.priceOnRequest')}</p>
                <p className="mt-1 capitalize">{artwork.category}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
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
            {t('gallery.page.title')}
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t('gallery.page.description')}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t('gallery.loadingArtworks')}</p>
            </div>
          ) : (
            renderArtworkGrid()
          )}
        </div>
      </section>

      {/* Artwork Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="w-[90vw] h-[90vh] glass rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-full">
            {/* Image Section - Left Side */}
            <div className="flex-1 bg-black/20 flex items-center justify-center p-8 relative group">
                <img
                  src={selectedArtwork.artwork_images[currentImageIndex]?.image_url || '/placeholder.svg'}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Image Navigation */}
                {selectedArtwork.artwork_images.length > 1 && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextImage}
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
                      <h3 className="font-display text-2xl font-semibold text-primary mb-3">
                        {getTranslatedField(selectedArtwork, 'title', currentLanguage)}
                      </h3>
                      <div className="font-body text-muted-foreground space-y-1">
                        <p className="text-base capitalize">{selectedArtwork.category}</p>
                        <p className="text-sm">
                          {new Date(selectedArtwork.created_at).getFullYear()}
                        </p>
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
                  
                  <p className="font-body text-foreground leading-relaxed">
                    {getTranslatedField(selectedArtwork, 'description', currentLanguage) || t('gallery.noDescription')}
                  </p>

                  {(selectedArtwork.width_cm || selectedArtwork.height_cm || selectedArtwork.depth_cm) && (
                    <div className="mt-4 pt-4 border-t border-border/10">
                      <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        {t('gallery.dimensions')}
                      </p>
                      <p className="font-body text-sm text-foreground">
                        {selectedArtwork.width_cm && `${selectedArtwork.width_cm} ${t('gallery.cm')}`}
                        {selectedArtwork.width_cm && selectedArtwork.height_cm && ' × '}
                        {selectedArtwork.height_cm && `${selectedArtwork.height_cm} ${t('gallery.cm')}`}
                        {selectedArtwork.depth_cm && ` × ${selectedArtwork.depth_cm} ${t('gallery.cm')}`}
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
    </main>
  );
};

export default Gallery;