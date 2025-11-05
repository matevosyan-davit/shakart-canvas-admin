import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [descriptionHeight, setDescriptionHeight] = useState(30); // percentage from bottom
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

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
    setDescriptionHeight(30);
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

  // Handle horizontal swipe for image navigation
  const handleImageTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleImageTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = Math.abs(touchStartY.current - touchEndY);

    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  // Handle vertical swipe for description panel
  const handleDescriptionTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleDescriptionTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const windowHeight = window.innerHeight;
    const newHeight = ((windowHeight - currentY) / windowHeight) * 100;

    // Constrain between 15% and 85%
    const constrainedHeight = Math.max(15, Math.min(85, newHeight));
    setDescriptionHeight(constrainedHeight);
  };

  const handleDescriptionTouchEnd = () => {
    setIsDragging(false);
    // Snap to nearest position
    if (descriptionHeight < 25) {
      setDescriptionHeight(15);
    } else if (descriptionHeight < 50) {
      setDescriptionHeight(30);
    } else if (descriptionHeight < 70) {
      setDescriptionHeight(60);
    } else {
      setDescriptionHeight(85);
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

      {/* Artwork Modal - Mobile First Approach */}
      {selectedArtwork && (
        <>
          {/* MOBILE LAYOUT - Default (no media query prefix) */}
          <div className="lg:hidden fixed inset-0 bg-black z-50 w-full h-full overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2.5 rounded-full transition-colors z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section - Top portion */}
            <div
              ref={imageContainerRef}
              className="absolute top-0 left-0 right-0 bg-black flex items-center justify-center"
              style={{ height: `${100 - descriptionHeight}vh` }}
              onTouchStart={handleImageTouchStart}
              onTouchEnd={handleImageTouchEnd}
            >
              <img
                src={selectedArtwork.artwork_images[currentImageIndex]?.image_url || '/placeholder.svg'}
                alt={selectedArtwork.title}
                className="max-w-full max-h-full object-contain px-4"
              />

              {/* Image counter */}
              {selectedArtwork.artwork_images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  {currentImageIndex + 1} / {selectedArtwork.artwork_images.length}
                </div>
              )}
            </div>

            {/* Description Panel - Bottom portion */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl overflow-hidden"
              style={{ height: `${descriptionHeight}vh` }}
            >
              {/* Drag Handle */}
              <div
                className="w-full py-4 flex justify-center active:cursor-grabbing select-none"
                onTouchStart={handleDescriptionTouchStart}
                onTouchMove={handleDescriptionTouchMove}
                onTouchEnd={handleDescriptionTouchEnd}
              >
                <div className="w-12 h-1 bg-muted-foreground/40 rounded-full"></div>
              </div>

              {/* Scrollable Content */}
              <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: `calc(${descriptionHeight}vh - 48px)` }}>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-primary mb-2">
                      {getTranslatedField(selectedArtwork, 'title', currentLanguage)}
                    </h3>
                    <div className="font-body text-muted-foreground space-y-1">
                      <p className="text-base capitalize">{selectedArtwork.category}</p>
                      <p className="text-sm">
                        {new Date(selectedArtwork.created_at).getFullYear()}
                      </p>
                    </div>
                  </div>

                  <div className="w-16 h-px bg-accent"></div>

                  {getTranslatedField(selectedArtwork, 'description', currentLanguage) && (
                    <p className="font-body text-base text-foreground leading-relaxed">
                      {getTranslatedField(selectedArtwork, 'description', currentLanguage)}
                    </p>
                  )}

                  {(selectedArtwork.width_cm || selectedArtwork.height_cm || selectedArtwork.depth_cm) && (
                    <div className="pt-3 border-t border-border/10">
                      <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        {t('gallery.dimensions')}
                      </p>
                      <p className="font-body text-base text-foreground">
                        {selectedArtwork.width_cm && `${selectedArtwork.width_cm} ${t('gallery.cm')}`}
                        {selectedArtwork.width_cm && selectedArtwork.height_cm && ' × '}
                        {selectedArtwork.height_cm && `${selectedArtwork.height_cm} ${t('gallery.cm')}`}
                        {selectedArtwork.depth_cm && ` × ${selectedArtwork.depth_cm} ${t('gallery.cm')}`}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border/20">
                    {selectedArtwork.is_sold ? (
                      <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wider">
                        {t('gallery.sold')}
                      </div>
                    ) : (
                      <div className="font-display text-2xl text-primary font-semibold">
                        ${selectedArtwork.price?.toFixed(2) || t('gallery.priceOnRequest')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP LAYOUT - Only on large screens */}
          <div className="hidden lg:block fixed inset-0 bg-black z-50">
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="w-[90vw] h-[90vh] max-w-6xl glass rounded-lg overflow-hidden flex">
                {/* Image Section - Left */}
                <div className="flex-1 bg-black/20 flex items-center justify-center relative">
                  <img
                    src={selectedArtwork.artwork_images[currentImageIndex]?.image_url || '/placeholder.svg'}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-contain p-8"
                  />

                  {/* Image Navigation Buttons */}
                  {selectedArtwork.artwork_images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                        {currentImageIndex + 1} / {selectedArtwork.artwork_images.length}
                      </div>
                    </>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content Section - Right */}
                <div className="w-96 bg-card/95 backdrop-blur-sm overflow-y-auto">
                  <div className="p-8 flex flex-col min-h-full">
                    <div className="flex-1 space-y-6">
                      <div>
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

                      <div className="w-16 h-px bg-accent"></div>

                      {getTranslatedField(selectedArtwork, 'description', currentLanguage) && (
                        <p className="font-body text-base text-foreground leading-relaxed">
                          {getTranslatedField(selectedArtwork, 'description', currentLanguage)}
                        </p>
                      )}

                      {(selectedArtwork.width_cm || selectedArtwork.height_cm || selectedArtwork.depth_cm) && (
                        <div className="pt-4 border-t border-border/10">
                          <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                            {t('gallery.dimensions')}
                          </p>
                          <p className="font-body text-base text-foreground">
                            {selectedArtwork.width_cm && `${selectedArtwork.width_cm} ${t('gallery.cm')}`}
                            {selectedArtwork.width_cm && selectedArtwork.height_cm && ' × '}
                            {selectedArtwork.height_cm && `${selectedArtwork.height_cm} ${t('gallery.cm')}`}
                            {selectedArtwork.depth_cm && ` × ${selectedArtwork.depth_cm} ${t('gallery.cm')}`}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-border/20">
                      {selectedArtwork.is_sold ? (
                        <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wider">
                          {t('gallery.sold')}
                        </div>
                      ) : (
                        <div className="font-display text-2xl text-primary font-semibold">
                          ${selectedArtwork.price?.toFixed(2) || t('gallery.priceOnRequest')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Gallery;