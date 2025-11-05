import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedField } from "@/utils/multiLanguageHelpers";
import ArtworkDialog from "@/components/ArtworkDialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);

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
    setDialogOpen(true);
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
      {/* Header */}
      <section className="py-8 px-6">
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
      <section className="py-8 px-6 pb-24">
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

      <ArtworkDialog
        artwork={selectedArtwork}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </main>
  );
};

export default Gallery;