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
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    // Fetch preview images for non-video URLs
    media.forEach(async (mediaItem) => {
      const url = extractEmbedUrl(mediaItem.embed_link);
      if (!isVideoUrl(url) && !previewImages[mediaItem.id]) {
        try {
          const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`);
          const data = await response.json();
          if (data.status === 'success' && data.data.screenshot?.url) {
            setPreviewImages(prev => ({
              ...prev,
              [mediaItem.id]: data.data.screenshot.url
            }));
          }
        } catch (error) {
          console.error('Failed to fetch preview for:', url);
        }
      }
    });
  }, [media, previewImages]);

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

  const convertToEmbedUrl = (url: string): string => {
    // Handle YouTube URLs
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // If it's already an embed URL, return as is
    if (url.includes('/embed/')) {
      return url;
    }
    
    // For other URLs, return as is (we'll handle them differently in the display)
    return url;
  };

  const isVideoUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be') || 
           url.includes('vimeo.com') || url.includes('/embed/');
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
                    {/* Media Content */}
                    {isVideoUrl(extractEmbedUrl(mediaItem.embed_link)) ? (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <iframe
                          src={convertToEmbedUrl(extractEmbedUrl(mediaItem.embed_link))}
                          title={mediaItem.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        {previewImages[mediaItem.id] ? (
                          <div className="relative w-full h-full group">
                            <img 
                              src={previewImages[mediaItem.id]} 
                              alt={`Preview of ${mediaItem.title}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <a
                                href={extractEmbedUrl(mediaItem.embed_link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                              >
                                Read Article
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center border-2 border-dashed border-border h-full">
                            <div className="text-center p-6">
                              <div className="mb-4">
                                <div className="w-16 h-16 mx-auto bg-muted-foreground/10 rounded-lg flex items-center justify-center">
                                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                              </div>
                              <h3 className="font-medium text-foreground mb-2">Article Link</h3>
                              <p className="text-sm text-muted-foreground mb-4">Loading preview...</p>
                              <a
                                href={extractEmbedUrl(mediaItem.embed_link)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                              >
                                Read Article
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
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