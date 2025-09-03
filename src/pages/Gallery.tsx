import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const artworks = {
  paintings: [
    {
      id: 1,
      title: "Convergence",
      year: "2024",
      medium: "Oil on Canvas",
      dimensions: "48\" × 36\"",
      image: artwork1,
      description: "An exploration of color harmony and emotional depth through abstract forms. This piece represents the convergence of different life experiences into a single moment of clarity and understanding."
    },
    {
      id: 2,
      title: "Whispered Landscapes",
      year: "2023",
      medium: "Acrylic on Canvas",
      dimensions: "60\" × 40\"",
      image: artwork2,
      description: "Capturing the subtle conversations between light and shadow in nature. This painting invites viewers to listen to the quiet stories that landscapes tell when we take time to truly observe."
    },
    {
      id: 3,
      title: "Urban Rhythms",
      year: "2024",
      medium: "Mixed Media",
      dimensions: "36\" × 48\"",
      image: artwork3,
      description: "The pulse and energy of city life translated into geometric abstraction. Each layer represents a different aspect of urban existence, from the rush of daily commutes to quiet moments of reflection."
    }
  ],
  sculpture: [
    {
      id: 4,
      title: "Metamorphosis",
      year: "2023",
      medium: "Bronze and Steel",
      dimensions: "72\" × 24\" × 18\"",
      image: artwork1,
      description: "A sculptural exploration of transformation and growth. The interplay between bronze and steel represents the balance between tradition and modernity in contemporary life."
    },
    {
      id: 5,
      title: "Fragmented Unity",
      year: "2022",
      medium: "Marble and Wood",
      dimensions: "48\" × 48\" × 36\"",
      image: artwork2,
      description: "This piece examines how individual fragments can come together to form a cohesive whole, much like communities and relationships in our interconnected world."
    }
  ],
  streetart: [
    {
      id: 6,
      title: "Urban Canvas",
      year: "2024",
      medium: "Spray Paint and Stencil",
      dimensions: "12' × 8'",
      image: artwork3,
      description: "A large-scale mural that transforms an urban wall into a vibrant narrative about community, hope, and artistic expression in public spaces."
    },
    {
      id: 7,
      title: "City Voices",
      year: "2023",
      medium: "Mixed Media Street Art",
      dimensions: "8' × 20'",
      image: artwork1,
      description: "An interactive street art installation that incorporates elements of the surrounding architecture to create a dialogue between the artwork and its environment."
    }
  ]
};

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks.paintings[0] | null>(null);

  const renderArtworkGrid = (category: keyof typeof artworks) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks[category].map((artwork, index) => (
        <Card 
          key={artwork.id}
          className="group overflow-hidden border-0 shadow-card hover-lift cursor-pointer bg-card"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => setSelectedArtwork(artwork)}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <h3 className="font-display text-lg font-medium text-primary mb-2">
              {artwork.title}
            </h3>
            <div className="font-body text-sm text-muted-foreground">
              <p>{artwork.year} • {artwork.medium}</p>
              <p className="mt-1">{artwork.dimensions}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen bg-surface">
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
          <Tabs defaultValue="paintings" className="w-full">
            <TabsList className="sticky top-0 z-40 grid w-full grid-cols-3 mb-12 bg-card shadow-card">
              <TabsTrigger value="paintings" className="font-body text-base">Paintings</TabsTrigger>
              <TabsTrigger value="sculpture" className="font-body text-base">Sculpture</TabsTrigger>
              <TabsTrigger value="streetart" className="font-body text-base">Street Art</TabsTrigger>
            </TabsList>
            
            <TabsContent value="paintings">
              {renderArtworkGrid('paintings')}
            </TabsContent>
            
            <TabsContent value="sculpture">
              {renderArtworkGrid('sculpture')}
            </TabsContent>
            
            <TabsContent value="streetart">
              {renderArtworkGrid('streetart')}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Artwork Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-primary/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="max-w-5xl mx-auto glass rounded-lg p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedArtwork(null)}
                className="rounded-full w-10 h-10 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
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
    </main>
  );
};

export default Gallery;