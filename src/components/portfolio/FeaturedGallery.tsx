import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

const FeaturedGallery = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

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
    <section className="gallery-spacing bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="font-display text-5xl md:text-6xl text-primary mb-8 tracking-gallery">
            Featured Works
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-serif text-xl text-muted-foreground leading-relaxed italic">
              A curated selection of recent paintings that showcase my artistic journey and evolving vision, 
              each piece telling its own story through color, texture, and emotion.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {artworks.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No featured artworks yet. Add some through the admin panel!</p>
            </div>
          ) : (
            artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className="group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.3}s` }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="artwork-frame hover-lift mb-6">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={artwork.artwork_images[0]?.image_url || '/placeholder.svg'}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-102"
                    />
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="font-display text-2xl text-primary tracking-gallery">
                    {artwork.title}
                  </h3>
                  <div className="font-body text-sm text-muted-foreground uppercase tracking-wider space-y-1">
                    <p>{new Date(artwork.created_at).getFullYear()} • {artwork.category}</p>
                    <p>${artwork.price?.toFixed(2) || 'Price on request'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="text-center mt-20">
          <Link 
            to="/gallery"
            className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary border-b border-transparent hover:border-primary transition-all duration-500 pb-1"
          >
            View Complete Gallery
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
              <div className="flex-1 bg-black/20 flex items-center justify-center p-8">
                <img
                  src={selectedArtwork.artwork_images[0]?.image_url || '/placeholder.svg'}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              {/* Content Section - Right Side */}
              <div className="w-96 bg-card/95 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-primary mb-3 tracking-gallery">
                        {selectedArtwork.title}
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
    </section>
  );
};

export default FeaturedGallery;