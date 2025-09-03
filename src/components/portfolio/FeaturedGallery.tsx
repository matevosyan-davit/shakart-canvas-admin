import { useState } from "react";
import { Card } from "@/components/ui/card";
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
    image: artwork1,
    description: "An exploration of color harmony and emotional depth through abstract forms."
  },
  {
    id: 2,
    title: "Whispered Landscapes",
    year: "2023",
    medium: "Acrylic on Canvas",
    dimensions: "60\" × 40\"",
    image: artwork2,
    description: "Capturing the subtle conversations between light and shadow in nature."
  },
  {
    id: 3,
    title: "Urban Rhythms",
    year: "2024",
    medium: "Mixed Media",
    dimensions: "36\" × 48\"",
    image: artwork3,
    description: "The pulse and energy of city life translated into geometric abstraction."
  }
];

const FeaturedGallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);

  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary mb-6">
            Featured Works
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of recent paintings that showcase my artistic journey and evolving vision.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <Card 
              key={artwork.id}
              className="group overflow-hidden border-0 shadow-card hover-lift cursor-pointer bg-card"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedArtwork(artwork)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-medium text-primary mb-2">
                  {artwork.title}
                </h3>
                <div className="font-body text-sm text-muted-foreground space-y-1">
                  <p>{artwork.year} • {artwork.medium}</p>
                  <p>{artwork.dimensions}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="font-body text-accent hover:text-accent/80 font-medium transition-colors duration-300">
            View Complete Gallery →
          </button>
        </div>
      </div>
      
      {/* Modal would go here for selected artwork */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-primary/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="max-w-4xl mx-auto glass rounded-lg p-8" onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
                className="w-full rounded-lg shadow-elegant"
              />
              <div>
                <h3 className="font-display text-3xl font-semibold text-primary mb-4">
                  {selectedArtwork.title}
                </h3>
                <div className="font-body text-muted-foreground mb-6 space-y-2">
                  <p className="text-lg">{selectedArtwork.year} • {selectedArtwork.medium}</p>
                  <p>{selectedArtwork.dimensions}</p>
                </div>
                <p className="font-body text-foreground leading-relaxed">
                  {selectedArtwork.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedGallery;