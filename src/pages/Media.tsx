import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Play } from "lucide-react";

interface MediaItem {
  id: string;
  title: string;
  media_name: string;
  embed_link: string;
  type: string;
  created_at: string;
}

const Media = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const extractEmbedUrl = (embedLink: string): string => {
    // If it's already a URL, return it
    if (embedLink.startsWith('http')) {
      return embedLink;
    }
    
    // If it's iframe HTML, extract the src URL
    const srcMatch = embedLink.match(/src="([^"]+)"/);
    if (srcMatch && srcMatch[1]) {
      return srcMatch[1];
    }
    
    // Fallback to the original link
    return embedLink;
  };

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface pt-24">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-primary mb-6 animate-slide-up">
            Media & Interviews
          </h1>
          <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Interviews and media coverage exploring my artistic journey 
            and contributions to contemporary art.
          </p>
        </div>
      </section>

      {/* Media Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading media...</p>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No media content available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {media.map((mediaItem, index) => (
                <Card 
                  key={mediaItem.id}
                  className="overflow-hidden bg-card shadow-card hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    {/* Video Embed */}
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <iframe
                        src={extractEmbedUrl(mediaItem.embed_link)}
                        title={mediaItem.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <Play className="w-6 h-6 text-accent" />
                        <span className="font-body text-sm text-muted-foreground">Interview</span>
                      </div>
                      
                      <h2 className="font-display text-2xl font-medium text-primary mb-4">
                        {mediaItem.title}
                      </h2>
                      
                      <div className="space-y-2 mb-6">
                        <p className="font-body text-muted-foreground">
                          <strong>Media:</strong> {mediaItem.media_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Media;