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

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
  onSelect: (artwork: Artwork) => void;
}

import { useLanguage } from '@/contexts/LanguageContext';

const ArtworkCard = ({ artwork, index, onSelect }: ArtworkCardProps) => {
  const { t } = useLanguage();

  return (
    <div
      className="group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.3}s` }}
      onClick={() => onSelect(artwork)}
    >
      <div className="artwork-frame hover-lift mb-6">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={artwork.artwork_images[0]?.image_url || '/placeholder.svg'}
            alt={artwork.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-102"
          />
          {artwork.is_sold && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wider shadow-lg">
              {t('gallery.sold')}
            </div>
          )}
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
  );
};

export default ArtworkCard;