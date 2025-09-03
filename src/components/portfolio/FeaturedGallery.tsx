import { useState } from "react";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const artworks = [
  {
    id: 1,
    title: "Convergence",
    year: "2024",
    medium: "Oil on Canvas",
    dimensions: "48\" × 36\"",
    price: "$3,200",
    image: artwork1,
    description: "An exploration of color harmony and emotional depth through abstract forms."
  },
  {
    id: 2,
    title: "Whispered Landscapes",
    year: "2023",
    medium: "Acrylic on Canvas",
    dimensions: "60\" × 40\"",
    price: "$4,500",
    image: artwork2,
    description: "Capturing the subtle conversations between light and shadow in nature."
  },
  {
    id: 3,
    title: "Urban Rhythms",
    year: "2024",
    medium: "Mixed Media",
    dimensions: "36\" × 48\"",
    price: "$2,800",
    image: artwork3,
    description: "The pulse and energy of city life translated into geometric abstraction."
  }
];

const FeaturedGallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);

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
          {artworks.map((artwork, index) => (
            <div
              key={artwork.id}
              className="group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="artwork-frame hover-lift mb-6">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artwork.image}
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
                  <p>{artwork.year} • {artwork.medium}</p>
                  <p>{artwork.dimensions}</p>
                </div>
              </div>
            </div>
          ))}
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
          <div className="w-[80vw] h-[80vh] gallery-glass rounded-lg p-8 animate-fade-in overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="grid lg:grid-cols-2 gap-8 h-full">
              <div className="flex items-center justify-center">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="font-display text-3xl text-primary mb-4 tracking-gallery">
                    {selectedArtwork.title}
                  </h3>
                  <div className="font-body text-muted-foreground space-y-2 text-sm uppercase tracking-wider">
                    <p>{selectedArtwork.year} • {selectedArtwork.medium}</p>
                    <p>{selectedArtwork.dimensions}</p>
                  </div>
                </div>
                <div className="w-16 h-px bg-accent"></div>
                <p className="font-serif text-lg text-foreground leading-relaxed">
                  {selectedArtwork.description}
                </p>
                <div className="font-display text-2xl text-primary font-semibold">
                  {selectedArtwork.price}
                </div>
                <button 
                  onClick={() => setSelectedArtwork(null)}
                  className="font-body text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 self-start"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedGallery;