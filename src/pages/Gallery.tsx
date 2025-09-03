import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  created_at: string;
  artwork_images: ArtworkImage[];
}

const Gallery = () => {
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
        .order('created_at', { ascending: false });

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

  const getArtworksByCategory = (category: string) => {
    return artworks.filter(artwork => artwork.category === category);
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

  const renderArtworkGrid = (category: string) => {
    const categoryArtworks = getArtworksByCategory(category);
    
    if (categoryArtworks.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artworks in this category yet.</p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryArtworks.map((artwork, index) => (
          <Card 
            key={artwork.id}
            className="group overflow-hidden border-0 shadow-card hover-lift cursor-pointer bg-card"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleArtworkClick(artwork)}
          >
            <div className="aspect-square overflow-hidden relative">
              <Carousel opts={{ loop: true }} className="h-full">
                <CarouselContent>
                  {(artwork.artwork_images.length ? artwork.artwork_images : [{ id: 'placeholder', image_url: '/placeholder.svg', display_order: 0 } as any]).map((img) => (
                    <CarouselItem key={img.id}>
                      <img
                        src={img.image_url}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {artwork.artwork_images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
                  </>
                )}
              </Carousel>
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-medium text-primary mb-2">
                {artwork.title}
              </h3>
              <div className="font-body text-sm text-muted-foreground">
                <p>${artwork.price?.toFixed(2) || 'Price on request'}</p>
                <p className="mt-1 capitalize">{artwork.category}</p>
                {artwork.artwork_images.length > 1 && (
                  <p className="text-xs text-accent mt-1">
                    +{artwork.artwork_images.length - 1} more images
                  </p>
                )}
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
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6 animate-slide-up">
            Gallery
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Explore my artistic journey through paintings, sculptures, and street art. 
            Each piece tells a story of emotion, technique, and creative expression.
          </p>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading artworks...</p>
            </div>
          ) : (
            <Tabs defaultValue="painting" className="w-full">
              <TabsList className="sticky top-0 z-40 grid w-full grid-cols-3 mb-12 bg-card shadow-card">
                <TabsTrigger value="painting" className="font-body text-base">Paintings</TabsTrigger>
                <TabsTrigger value="sculpture" className="font-body text-base">Sculpture</TabsTrigger>
                <TabsTrigger value="streetart" className="font-body text-base">Street Art</TabsTrigger>
              </TabsList>
              
              <TabsContent value="painting">
                {renderArtworkGrid('painting')}
              </TabsContent>
              
              <TabsContent value="sculpture">
                {renderArtworkGrid('sculpture')}
              </TabsContent>
              
              <TabsContent value="streetart">
                {renderArtworkGrid('streetart')}
              </TabsContent>
            </Tabs>
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
              <div className="flex-1 bg-black/20 flex items-center justify-center p-8 relative">
                <img
                  src={selectedArtwork.artwork_images[currentImageIndex]?.image_url || '/placeholder.svg'}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Image Navigation */}
                {selectedArtwork.artwork_images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedArtwork.artwork_images.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Content Section - Right Side */}
              <div className="w-96 bg-card/95 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-semibold text-primary mb-3">
                        {selectedArtwork.title}
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
                    {selectedArtwork.description || 'No description available.'}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-border/20">
                  <div className="font-display text-2xl text-primary font-semibold">
                    ${selectedArtwork.price?.toFixed(2) || 'Price on request'}
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