import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ExhibitionImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface ExhibitionGalleryProps {
  images: ExhibitionImage[];
  exhibitionTitle: string;
}

export const ExhibitionGallery = ({ images, exhibitionTitle }: ExhibitionGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const displayImages = showAll ? images : images.slice(0, 5);
  const remainingCount = images.length - 5;

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    if (!isMobile) {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : 'aspect-square'
              }`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.image_url}
                alt={`${exhibitionTitle} - Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              {!showAll && index === 4 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-3xl font-bold mb-1">+{remainingCount}</p>
                    <p className="text-sm">More Photos</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {images.length > 5 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `View All ${images.length} Photos`}
          </Button>
        )}
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black md:bg-black/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </Button>

          {isMobile ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 overflow-hidden">
                <Carousel className="w-full h-full" opts={{ startIndex: selectedImage }}>
                  <CarouselContent className="h-full">
                    {images.map((image, idx) => (
                      <CarouselItem key={image.id} className="h-full flex items-center justify-center">
                        <img
                          src={image.image_url}
                          alt={`${exhibitionTitle} - Image ${idx + 1}`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2 text-white border-white/50" />
                      <CarouselNext className="right-2 text-white border-white/50" />
                    </>
                  )}
                </Carousel>
              </div>
              <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-3 text-center border-t border-white/10">
                <p className="text-sm font-medium">
                  {selectedImage + 1} / {images.length}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {selectedImage > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
              )}

              <div className="relative w-full h-full flex items-center justify-center p-8">
                <img
                  src={images[selectedImage].image_url}
                  alt={`${exhibitionTitle} - Image ${selectedImage + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </div>

              {selectedImage < images.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
