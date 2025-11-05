import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslatedField } from "@/utils/multiLanguageHelpers";
import { isYouTubeUrl } from "@/utils/videoEmbedHelpers";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { ExhibitionGallery } from "@/components/ExhibitionGallery";
import { ArticlePreview } from "@/components/ArticlePreview";

interface ExhibitionImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface ExhibitionMedia {
  id: string;
  title: string;
  media_name: string;
  embed_link: string;
  display_order: number;
}

interface Exhibition {
  id: string;
  title: string;
  date: string;
  location: string;
  theme: string | null;
  description: string | null;
  created_at: string;
  exhibition_images: ExhibitionImage[];
  exhibition_media: ExhibitionMedia[];
}

const Exhibitions = () => {
  const { t, currentLanguage } = useLanguage();
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const { data, error } = await supabase
        .from('exhibitions')
        .select(`
          *,
          exhibition_images (
            id,
            image_url,
            display_order
          ),
          exhibition_media (
            id,
            title,
            media_name,
            embed_link,
            display_order
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      
      const sortedExhibitions = data?.map(exhibition => ({
        ...exhibition,
        exhibition_images: exhibition.exhibition_images.sort((a: ExhibitionImage, b: ExhibitionImage) => a.display_order - b.display_order),
        exhibition_media: exhibition.exhibition_media.sort((a: ExhibitionMedia, b: ExhibitionMedia) => a.display_order - b.display_order)
      })) || [];
      
      setExhibitions(sortedExhibitions);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Header */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6 animate-slide-up">
            {t('exhibitions.page.title')}
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t('exhibitions.page.description')}
          </p>
        </div>
      </section>

      {/* Exhibitions List */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t('exhibitions.loadingExhibitions')}</p>
            </div>
          ) : exhibitions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">{t('exhibitions.noExhibitions')}</p>
            </div>
          ) : (
            exhibitions.map((exhibition, index) => (
              <Card
                key={exhibition.id}
                className="overflow-hidden bg-card shadow-card animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Exhibition Header */}
                <div className="border-b border-border/50 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mb-3">
                        {getTranslatedField(exhibition, 'title', currentLanguage)}
                      </h2>
                      {exhibition.theme && (
                        <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent-foreground text-sm font-medium rounded-full mb-4">
                          {getTranslatedField(exhibition, 'theme', currentLanguage)}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span className="font-body text-sm">
                            {new Date(exhibition.date).toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'hy-AM', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-body text-sm">
                            {getTranslatedField(exhibition, 'location', currentLanguage)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {exhibition.description && (
                    <p className="font-body text-foreground/80 leading-relaxed mt-4 text-base">
                      {getTranslatedField(exhibition, 'description', currentLanguage)}
                    </p>
                  )}
                </div>

                {/* Exhibition Images Gallery */}
                {exhibition.exhibition_images.length > 0 && (
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-xl font-medium text-primary mb-4">
                      {t('exhibitions.exhibitionHighlights')}
                    </h3>
                    <ExhibitionGallery
                      images={exhibition.exhibition_images}
                      exhibitionTitle={getTranslatedField(exhibition, 'title', currentLanguage)}
                    />
                  </div>
                )}

                {/* Media Coverage */}
                {exhibition.exhibition_media.length > 0 && (
                  <div className="p-6 md:p-8 bg-muted/20">
                    <h3 className="font-display text-xl font-medium text-primary mb-4">
                      {t('exhibitions.mediaCoverage')}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {exhibition.exhibition_media.map((media) => (
                        <div key={media.id}>
                          {isYouTubeUrl(media.embed_link) ? (
                            <Card className="overflow-hidden">
                              <div className="p-4 border-b border-border/50">
                                <h4 className="font-medium text-foreground mb-1">{media.title}</h4>
                                <p className="text-sm text-muted-foreground">{media.media_name}</p>
                              </div>
                              <YouTubeEmbed
                                url={media.embed_link}
                                title={media.title}
                              />
                            </Card>
                          ) : (
                            <ArticlePreview
                              url={media.embed_link}
                              title={media.title}
                              mediaName={media.media_name}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Exhibitions;