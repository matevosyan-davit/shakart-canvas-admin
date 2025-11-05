import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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

interface ArtworkDialogProps {
  artwork: Artwork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ArtworkDialog = ({ artwork, open, onOpenChange }: ArtworkDialogProps) => {
  const { t, currentLanguage } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [descriptionHeight, setDescriptionHeight] = useState(30);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  // Reset image index when artwork changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setDescriptionHeight(30);
  }, [artwork?.id]);

  if (!artwork) return null;

  const nextImage = () => {
    if (artwork.artwork_images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === artwork.artwork_images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (artwork.artwork_images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? artwork.artwork_images.length - 1 : prev - 1
      );
    }
  };

  const handleImageTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleImageTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = Math.abs(touchStartY.current - touchEndY);

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  const handleDescriptionTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleDescriptionTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const windowHeight = window.innerHeight;
    const newHeight = ((windowHeight - currentY) / windowHeight) * 100;
    const constrainedHeight = Math.max(15, Math.min(85, newHeight));
    setDescriptionHeight(constrainedHeight);
  };

  const handleDescriptionTouchEnd = () => {
    setIsDragging(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-0">
        {/* Mobile Layout */}
        <div className="lg:hidden fixed inset-0 bg-black">
          {/* Close Button */}
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-50 text-white hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Image Section */}
          <div
            className="absolute top-0 left-0 right-0 bg-black flex items-center justify-center"
            style={{ height: `${100 - descriptionHeight}vh` }}
            onTouchStart={handleImageTouchStart}
            onTouchEnd={handleImageTouchEnd}
          >
            <img
              src={artwork.artwork_images[currentImageIndex]?.image_url || '/placeholder.svg'}
              alt={getTranslatedField(artwork, 'title', currentLanguage)}
              className="max-w-full max-h-full object-contain px-4"
            />

            {artwork.artwork_images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                {currentImageIndex + 1} / {artwork.artwork_images.length}
              </div>
            )}
          </div>

          {/* Description Panel */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl overflow-hidden"
            style={{ height: `${descriptionHeight}vh` }}
          >
            <div
              className="w-full py-4 flex justify-center cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleDescriptionTouchStart}
              onTouchMove={handleDescriptionTouchMove}
              onTouchEnd={handleDescriptionTouchEnd}
            >
              <div className="w-12 h-1 bg-muted-foreground/40 rounded-full"></div>
            </div>

            <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: `calc(${descriptionHeight}vh - 48px)` }}>
              <div className="space-y-4">
                <div>
                  <h1 className="font-display text-2xl font-semibold text-primary mb-2">
                    {getTranslatedField(artwork, 'title', currentLanguage)}
                  </h1>
                  <div className="font-body text-muted-foreground space-y-1">
                    <p className="text-base capitalize">{artwork.category}</p>
                    <p className="text-sm">
                      {new Date(artwork.created_at).getFullYear()}
                    </p>
                  </div>
                </div>

                <div className="w-16 h-px bg-accent"></div>

                {getTranslatedField(artwork, 'description', currentLanguage) && (
                  <p className="font-body text-base text-foreground leading-relaxed">
                    {getTranslatedField(artwork, 'description', currentLanguage)}
                  </p>
                )}

                {(artwork.width_cm || artwork.height_cm || artwork.depth_cm) && (
                  <div className="pt-3 border-t border-border/10">
                    <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      {t('gallery.dimensions')}
                    </p>
                    <p className="font-body text-base text-foreground">
                      {artwork.width_cm && `${artwork.width_cm} ${t('gallery.cm')}`}
                      {artwork.width_cm && artwork.height_cm && ' × '}
                      {artwork.height_cm && `${artwork.height_cm} ${t('gallery.cm')}`}
                      {artwork.depth_cm && ` × ${artwork.depth_cm} ${t('gallery.cm')}`}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-border/20">
                  {artwork.is_sold ? (
                    <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wider">
                      {t('gallery.sold')}
                    </div>
                  ) : (
                    <div className="font-display text-2xl text-primary font-semibold">
                      ${artwork.price?.toFixed(2) || t('gallery.priceOnRequest')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex min-h-screen">
          <div className="w-full h-screen flex items-center justify-center p-4">
            <div className="w-[90vw] h-[90vh] max-w-6xl glass rounded-lg overflow-hidden flex">
              {/* Image Section */}
              <div className="flex-1 bg-black/20 flex items-center justify-center relative">
                <img
                  src={artwork.artwork_images[currentImageIndex]?.image_url || '/placeholder.svg'}
                  alt={getTranslatedField(artwork, 'title', currentLanguage)}
                  className="w-full h-full object-contain p-8"
                />

                {artwork.artwork_images.length > 1 && (
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
                      {currentImageIndex + 1} / {artwork.artwork_images.length}
                    </div>
                  </>
                )}

                <Button
                  onClick={() => onOpenChange(false)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 left-4 text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content Section */}
              <div className="w-96 bg-card/95 backdrop-blur-sm overflow-y-auto">
                <div className="p-8 flex flex-col min-h-full">
                  <div className="flex-1 space-y-6">
                    <div>
                      <h1 className="font-display text-2xl font-semibold text-primary mb-3">
                        {getTranslatedField(artwork, 'title', currentLanguage)}
                      </h1>
                      <div className="font-body text-muted-foreground space-y-1">
                        <p className="text-base capitalize">{artwork.category}</p>
                        <p className="text-sm">
                          {new Date(artwork.created_at).getFullYear()}
                        </p>
                      </div>
                    </div>

                    <div className="w-16 h-px bg-accent"></div>

                    {getTranslatedField(artwork, 'description', currentLanguage) && (
                      <p className="font-body text-base text-foreground leading-relaxed">
                        {getTranslatedField(artwork, 'description', currentLanguage)}
                      </p>
                    )}

                    {(artwork.width_cm || artwork.height_cm || artwork.depth_cm) && (
                      <div className="pt-4 border-t border-border/10">
                        <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">
                          {t('gallery.dimensions')}
                        </p>
                        <p className="font-body text-base text-foreground">
                          {artwork.width_cm && `${artwork.width_cm} ${t('gallery.cm')}`}
                          {artwork.width_cm && artwork.height_cm && ' × '}
                          {artwork.height_cm && `${artwork.height_cm} ${t('gallery.cm')}`}
                          {artwork.depth_cm && ` × ${artwork.depth_cm} ${t('gallery.cm')}`}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/20">
                    {artwork.is_sold ? (
                      <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wider">
                        {t('gallery.sold')}
                      </div>
                    ) : (
                      <div className="font-display text-2xl text-primary font-semibold">
                        ${artwork.price?.toFixed(2) || t('gallery.priceOnRequest')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtworkDialog;
